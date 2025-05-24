'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

import { useConfig } from '@/hooks/config';

export function ThemeApplier() {
  const [{ cssVars }, _] = useConfig();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const mode = resolvedTheme === 'dark' ? 'dark' : 'light';
    const vars = cssVars[mode];
    if (vars) {
      Object.entries(vars).forEach(([key, value]) => {
        console.log(key, value);
        document.documentElement.style.setProperty(`--${key}`, String(value));
      });
    }
  }, [cssVars, resolvedTheme]);

  return null;
}
