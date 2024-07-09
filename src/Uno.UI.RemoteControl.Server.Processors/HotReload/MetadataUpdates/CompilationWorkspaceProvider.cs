﻿using System.Threading.Tasks;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.MSBuild;
using System.Linq;
using System.Threading;
using System;
using System.IO;
using System.Reflection;
using Uno.Extensions;
using Uno.UI.RemoteControl.Server.Processors.Helpers;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;

namespace Uno.UI.RemoteControl.Host.HotReload.MetadataUpdates
{
	internal static class CompilationWorkspaceProvider
	{
		private static string MSBuildBasePath = "";

		public static async Task<(Solution, WatchHotReloadService)> CreateWorkspaceAsync(
			string projectPath,
			IReporter reporter,
			string[] metadataUpdateCapabilities,
			Dictionary<string, string> properties,
			CancellationToken ct)
		{
			if (properties.TryGetValue("UnoEnCLogPath", out var EnCLogPath))
			{
				// Sets Roslyn's environment variable for troubleshooting HR, see:
				// https://github.com/dotnet/roslyn/blob/fc6e0c25277ff440ca7ded842ac60278ee6c9695/src/Features/Core/Portable/EditAndContinue/EditAndContinueService.cs#L72
				Environment.SetEnvironmentVariable("Microsoft_CodeAnalysis_EditAndContinue_LogDir", EnCLogPath);
			}

			var globalProperties = new Dictionary<string, string> {
				// Mark this compilation as hot-reload capable, so generators can act accordingly
				{ "IsHotReloadHost", "True" },
			};

			foreach (var property in properties)
			{
				// Don't set the runtime identifier since it propagates to libraries as well
				// which do not build using the RuntimeIdentifier being set. For instance, a head
				// building for `iossimulator` will fail if the RuntimeIdentifier is set globally its
				// dependent projects, causing the HR engine to search for pdb/dlls in
				// the bin/Debug/net8.0/iossimulator/*.dll path instead of its original path.
				if (!property.Key.Equals("RuntimeIdentifier", StringComparison.OrdinalIgnoreCase))
				{
					globalProperties.Add(property.Key, property.Value);
				}
			}

			MSBuildWorkspace workspace = null!;
			for (var i = 3; i > 0; i--)
			{
				try
				{
					workspace = MSBuildWorkspace.Create(globalProperties);

					workspace.WorkspaceFailed += (_sender, diag) =>
					{
						// In some cases, load failures may be incorrectly reported such as this one:
						// https://github.com/dotnet/roslyn/blob/fd45aeb5fbc97d09d4043cef9c9c5142f7638e5c/src/Workspaces/Core/MSBuild/MSBuild/MSBuildProjectLoader.Worker.cs#L245-L259
						// Since the text may be localized we cannot rely on it, so we never fail the project loading for now.
						reporter.Verbose($"MSBuildWorkspace {diag.Diagnostic}");
					};

					await workspace.OpenProjectAsync(projectPath, cancellationToken: ct);
					break;
				}
				catch (InvalidOperationException) when (i > 1)
				{
					// When we load the work space right after the app was started, it happens that it "app build" is not yet completed, preventing us to open the project.
					// We retry a few times to let the build complete.
					await Task.Delay(5_000, ct);
				}
			}
			var currentSolution = workspace.CurrentSolution;
			var hotReloadService = new WatchHotReloadService(workspace.Services, metadataUpdateCapabilities);
			await hotReloadService.StartSessionAsync(currentSolution, ct);

			// Read the documents to memory
			await Task.WhenAll(currentSolution.Projects.SelectMany(p => p.Documents.Concat(p.AdditionalDocuments)).Select(d => d.GetTextAsync(ct)));

			// Warm up the compilation. This would help make the deltas for first edit appear much more quickly
			foreach (var project in currentSolution.Projects)
			{
				await project.GetCompilationAsync(ct);
			}

			return (currentSolution, hotReloadService);
		}

		public static void InitializeRoslyn(string? workDir)
		{
			RegisterAssemblyLoader();

			MSBuildBasePath = BuildMSBuildPath(workDir);

			var version = GetDotnetVersion(workDir);
			if (version.Major != typeof(object).Assembly.GetName().Version?.Major)
			{
				if (typeof(CompilationWorkspaceProvider).Log().IsEnabled(LogLevel.Error))
				{
					typeof(CompilationWorkspaceProvider).Log().LogError($"Unable to start the Remote Control server because the application's TargetFramework version does not match the default runtime. Change the TargetFramework version to match net{version.Major}.0 in your project file.");
				}

				throw new InvalidOperationException("Project TargetFramework version mismatch");
			}

			Environment.SetEnvironmentVariable("MSBuildSDKsPath", Path.Combine(MSBuildBasePath, "Sdks"));

			var MSBuildExists = File.Exists(Path.Combine(MSBuildBasePath, "Microsoft.Build.dll"));

			if (!MSBuildExists)
			{
				throw new InvalidOperationException($"Invalid dotnet installation installation (Cannot find Microsoft.Build.dll in [{MSBuildBasePath}])");
			}
		}

		private static Version GetDotnetVersion(string? workDir)
		{
			var result = ProcessHelper.RunProcess("dotnet.exe", "--version", workDir);

			if (result.exitCode == 0)
			{
				var reader = new StringReader(result.output);

				if (Version.TryParse(reader.ReadLine()?.Split('-').FirstOrDefault(), out var version))
				{
					return version;
				}
			}

			throw new InvalidOperationException("Failed to read dotnet version");
		}

		private static string BuildMSBuildPath(string? workDir)
		{
			var result = ProcessHelper.RunProcess("dotnet.exe", "--info", workDir);

			if (result.exitCode == 0)
			{
				var reader = new StringReader(result.output);

				while (reader.ReadLine() is string line)
				{
					if (line.Contains("Base Path:"))
					{
						return line.Substring(line.IndexOf(':') + 1).Trim();
					}
				}

				throw new InvalidOperationException($"Unable to find dotnet SDK base path in:\n {result.output}");
			}

			throw new InvalidOperationException("Unable to find dotnet SDK base path");
		}

		private static void RegisterAssemblyLoader()
		{
			// Force assembly loader to consider siblings, when running in a separate appdomain.
			ResolveEventHandler localResolve = (s, e) =>
			{
				if (e.Name == "Mono.Runtime")
				{
					// Roslyn 2.0 and later checks for the presence of the Mono runtime
					// through this check.
					return null;
				}

				var assembly = new AssemblyName(e.Name);
				var basePath = Path.GetDirectoryName(new Uri(typeof(CompilationWorkspaceProvider).Assembly.Location).LocalPath) ?? "";

				Console.WriteLine($"Searching for [{assembly}] from [{basePath}]");

				// Ignore resource assemblies for now, we'll have to adjust this
				// when adding globalization.
				if (assembly.Name is not null && assembly.Name.EndsWith(".resources", StringComparison.Ordinal))
				{
					return null;
				}

				// Lookup for the highest version matching assembly in the current app domain.
				// There may be an existing one that already matches, even though the
				// fusion loader did not find an exact match.
				var loadedAsm = (
									from asm in AppDomain.CurrentDomain.GetAssemblies()
									where asm.GetName().Name == assembly.Name
									orderby asm.GetName().Version descending
									select asm
								).ToArray();

				if (loadedAsm.Length > 1)
				{
					var duplicates = loadedAsm
						.Skip(1)
						.Where(a => a.GetName().Version == loadedAsm[0].GetName().Version)
						.ToArray();

					if (duplicates.Length != 0)
					{
						Console.WriteLine($"Selecting first occurrence of assembly [{e.Name}] which can be found at [{duplicates.Select(d => d.Location).JoinBy("; ")}]");
					}

					return loadedAsm[0];
				}
				else if (loadedAsm.Length == 1)
				{
					return loadedAsm[0];
				}

				Assembly? LoadAssembly(string filePath)
				{
					if (File.Exists(filePath))
					{
						try
						{
							var output = Assembly.LoadFrom(filePath);

							Console.WriteLine($"Loaded [{output.GetName()}] from [{output.Location}]");

							return output;
						}
						catch (Exception ex)
						{
							Console.WriteLine($"Failed to load [{assembly}] from [{filePath}]", ex);
							return null;
						}
					}
					else
					{
						return null;
					}
				}

				var paths = new[] {
					Path.Combine(basePath, assembly.Name + ".dll"),
					Path.Combine(MSBuildBasePath, assembly.Name + ".dll"),
				};

				return paths
					.Select(LoadAssembly)
					.Where(p => p != null)
					.FirstOrDefault();
			};

			AppDomain.CurrentDomain.AssemblyResolve += localResolve;
			AppDomain.CurrentDomain.TypeResolve += localResolve;
		}

	}
}
