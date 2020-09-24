﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.UI.Xaml;

namespace Uno.UI.Helpers.Xaml
{
	[EditorBrowsable(EditorBrowsableState.Never)]
	// This is normally called from code generated by the Xaml parser
	//
	// NOTE: This class' methods may be called often from generated code. It MUST NOT have static state or a static ctor as it impacts the size of the generated code of the call site of this method when using mono's AOT engine.
	public static class SetterHelper
	{
		public static Setter GetPropertySetterWithResourceValue(DependencyProperty dependencyProperty, object key, object context, object defaultValue)
		{
			return new Setter(dependencyProperty, ProvideSetterValue);

			object ProvideSetterValue()
			{
				if (ResourceResolver.ResolveResourceStatic(key, out var value, context))
				{
					return value;
				}

				return defaultValue;
			}
		}
	}
}