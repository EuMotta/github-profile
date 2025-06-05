'use client';

import { useAtom } from 'jotai';

import { atomWithStorage } from 'jotai/utils';

import { Theme, CssVars, themes } from '@/constants/themes';

type Config = {
  theme: Theme['name'];
  cssVars: {
    light: Partial<CssVars['light']>;
    dark: Partial<CssVars['dark']>;
  };
};

const configAtom = atomWithStorage<Config>('config', {
  theme: 'zinc',
  cssVars: {
    light: themes.find((theme) => theme.name === 'zinc')?.cssVars.light as unknown as Partial<
      CssVars['light']
    >,
    dark: themes.find((theme) => theme.name === 'zinc')?.cssVars.dark as Partial<CssVars['dark']>,
  },
});

export function useConfig() {
  return useAtom(configAtom);
}
