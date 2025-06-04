'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { useConfig } from '@/hooks/config';
import { themes } from '@/constants/themes';

export function ThemeApplier() {
  const [{ cssVars, theme }, setConfig] = useConfig();
  const { resolvedTheme } = useTheme();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1) Captura o tema a partir da query string
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

    // 2) Captura o radius a partir da query string (em pixels)
    const radiusParam = searchParams.get('radius');
    if (radiusParam) {
      // Converte para string com "px"
      const radiusValue = `${radiusParam}px`;
      const currentLightRadius = cssVars.light.radius;
      const currentDarkRadius = cssVars.dark.radius;

      // Se for diferente do que já está no state, atualiza config
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

    // 3) Aplica as variáveis CSS no root (modo light ou dark)
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
