'use client';

import { useTheme } from 'next-themes';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useConfig } from '@/hooks/config';

import { themes } from '@/constants/themes';

export function ThemeApplier() {
  const [{ cssVars, theme }, setConfig] = useConfig();
  const { resolvedTheme } = useTheme();
  const searchParams = useSearchParams();

  useEffect(() => {
    const themeName = searchParams.get('theme');
    const selectedTheme = themes.find((t) => t.name === themeName);

    if (selectedTheme && themeName !== theme) {
      setConfig({
        theme: selectedTheme.name,
        cssVars: {
          ...selectedTheme.cssVars,
          light: { ...selectedTheme.cssVars.light },
          dark: { ...selectedTheme.cssVars.dark },
        },
      });
    }

    const radiusParam = searchParams.get('radius');
    if (radiusParam) {
      const radiusValue = `${radiusParam}px`;
      const currentLightRadius = cssVars.light.radius;
      const currentDarkRadius = cssVars.dark.radius;

      if (radiusValue !== currentLightRadius || radiusValue !== currentDarkRadius) {
        setConfig({
          theme,
          cssVars: {
            light: { ...cssVars.light, radius: radiusValue },
            dark: { ...cssVars.dark, radius: radiusValue },
          },
        });
      }
    }

    const mode = resolvedTheme === 'dark' ? 'dark' : 'light';
    const vars = cssVars[mode];
    if (vars) {
      Object.entries(vars).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, String(value));
      });
    }
  }, [cssVars, resolvedTheme, searchParams, theme, setConfig]);

  return null;
}
