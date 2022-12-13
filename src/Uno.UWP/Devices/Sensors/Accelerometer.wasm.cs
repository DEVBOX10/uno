﻿#if __WASM__
using Uno;
using System;
using System.Collections.Generic;
using System.Text;
using Uno.Devices.Sensors.Helpers;

#if NET7_0_OR_GREATER
using System.Runtime.InteropServices.JavaScript;

using NativeMethods = __Windows.Devices.Sensors.Accelerometer.NativeMethods;
#endif

namespace Windows.Devices.Sensors
{
	public partial class Accelerometer
	{
		private const string JsType = "Windows.Devices.Sensors.Accelerometer";
		private const float Gravity = 9.81f;

		private ShakeDetector _shakeDetector;

		private DateTimeOffset _lastReading = DateTimeOffset.MinValue;

		private Accelerometer()
		{
		}

		public uint ReportInterval { get; set; }

		private static Accelerometer TryCreateInstance()
		{
#if NET7_0_OR_GREATER
			var initialized = NativeMethods.Initialize();
#else
			var command = $"{JsType}.initialize()";
			var initialized = bool.Parse(Uno.Foundation.WebAssemblyRuntime.InvokeJS(command));
#endif
			if (initialized)
			{
				return new Accelerometer();
			}
			return null;
		}

		private void StartReadingChanged() => AttachDeviceMotion();

		private void StopReadingChanged() => DetachDeviceMotion();

		private void StartShaken()
		{
			if (_shakeDetector == null)
			{
				_shakeDetector = new ShakeDetector(this);
			}
			AttachDeviceMotion();
		}

		private void StopShaken() => DetachDeviceMotion();


		private void AttachDeviceMotion()
		{
			//if both delegates are not null,
			//we have already started reading previously
			if (_shaken == null || _readingChanged == null)
			{
#if NET7_0_OR_GREATER
				NativeMethods.StartReading();
#else
				var command = $"{JsType}.startReading()";
				Uno.Foundation.WebAssemblyRuntime.InvokeJS(command);
#endif
			}
		}


		private void DetachDeviceMotion()
		{
			//we only stop when both are null
			if (_shaken == null && _readingChanged == null)
			{
#if NET7_0_OR_GREATER
				NativeMethods.StopReading();
#else
				var command = $"{JsType}.stopReading()";
				Uno.Foundation.WebAssemblyRuntime.InvokeJS(command);
#endif
			}
		}

		/// <summary>
		/// Handles readings from Accelerometer.
		/// Filters the readings if too frequent to match chosen ReportInterval.
		/// Uses value ReportInterval * 0.8 to make sure that reporting is
		/// still more frequent rather than less frequent than requested,
		/// which is in line with documentation
		/// </summary>
		/// <param name="x">Accelerometer X</param>
		/// <param name="y">Accelerometer Y</param>
		/// <param name="z">Accelerometer Z</param>
		/// <returns>0 - needed to bind method from WASM</returns>
#if NET7_0_OR_GREATER
		[JSExport]
#endif
		public static int DispatchReading(float x, float y, float z)
		{
			if ( _instance == null)
			{
				throw new InvalidOperationException("Accelerometer:DispatchReading can be called only after Accelerometer is initialized");
			}
			var now = DateTimeOffset.UtcNow;
			if ((now - _instance._lastReading).TotalMilliseconds >= _instance.ReportInterval * 0.8)
			{
				_instance._lastReading = now;
				_instance.OnReadingChanged(
					new AccelerometerReading(
						x / Gravity * -1,
						y / Gravity * -1,
						z / Gravity * -1,
						now));				
			}
			_instance._shakeDetector?.OnSensorChanged(x, y, z, DateTimeOffset.UtcNow);
			return 0;
		}
	}
}
#endif
