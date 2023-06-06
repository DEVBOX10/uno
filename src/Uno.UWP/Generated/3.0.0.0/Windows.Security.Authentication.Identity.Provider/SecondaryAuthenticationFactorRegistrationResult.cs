#pragma warning disable 108 // new keyword hiding
#pragma warning disable 114 // new keyword hiding
namespace Windows.Security.Authentication.Identity.Provider
{
	// This type is deprecated. Consider not implementing it.
	#if __ANDROID__ || __IOS__ || IS_UNIT_TESTS || __WASM__ || __SKIA__ || __NETSTD_REFERENCE__ || __MACOS__
	[global::Uno.NotImplemented]
	#endif
	public  partial class SecondaryAuthenticationFactorRegistrationResult 
	{
		#if __ANDROID__ || __IOS__ || IS_UNIT_TESTS || __WASM__ || __SKIA__ || __NETSTD_REFERENCE__ || __MACOS__
		[global::Uno.NotImplemented("__ANDROID__", "__IOS__", "IS_UNIT_TESTS", "__WASM__", "__SKIA__", "__NETSTD_REFERENCE__", "__MACOS__")]
		public  global::Windows.Security.Authentication.Identity.Provider.SecondaryAuthenticationFactorRegistration Registration
		{
			get
			{
				throw new global::System.NotImplementedException("The member SecondaryAuthenticationFactorRegistration SecondaryAuthenticationFactorRegistrationResult.Registration is not implemented. For more information, visit https://aka.platform.uno/notimplemented?m=SecondaryAuthenticationFactorRegistration%20SecondaryAuthenticationFactorRegistrationResult.Registration");
			}
		}
		#endif
		#if __ANDROID__ || __IOS__ || IS_UNIT_TESTS || __WASM__ || __SKIA__ || __NETSTD_REFERENCE__ || __MACOS__
		[global::Uno.NotImplemented("__ANDROID__", "__IOS__", "IS_UNIT_TESTS", "__WASM__", "__SKIA__", "__NETSTD_REFERENCE__", "__MACOS__")]
		public  global::Windows.Security.Authentication.Identity.Provider.SecondaryAuthenticationFactorRegistrationStatus Status
		{
			get
			{
				throw new global::System.NotImplementedException("The member SecondaryAuthenticationFactorRegistrationStatus SecondaryAuthenticationFactorRegistrationResult.Status is not implemented. For more information, visit https://aka.platform.uno/notimplemented?m=SecondaryAuthenticationFactorRegistrationStatus%20SecondaryAuthenticationFactorRegistrationResult.Status");
			}
		}
		#endif
		// Forced skipping of method Windows.Security.Authentication.Identity.Provider.SecondaryAuthenticationFactorRegistrationResult.Status.get
		// Forced skipping of method Windows.Security.Authentication.Identity.Provider.SecondaryAuthenticationFactorRegistrationResult.Registration.get
	}
}
