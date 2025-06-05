'use client';

import { useTheme } from 'next-themes';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { FaSliders } from 'react-icons/fa6';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useConfig } from '@/hooks/config';

import { cn } from '@/lib/utils';

import { themes } from '@/constants/themes';

import { Button } from './ui/button';
import { Slider } from './ui/slider';

const ColorSelector: React.FC = () => {
  const [config, setConfig] = useConfig();
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme: mode } = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateTheme = (themeName: string) => {
    const selectedTheme = themes.find((theme) => theme.name === themeName);
    if (!selectedTheme) return;

    setConfig({
      ...config,
      theme: selectedTheme.name,
      cssVars: {
        ...selectedTheme.cssVars,
        light: { ...selectedTheme.cssVars.light },
        dark: { ...selectedTheme.cssVars.dark },
      },
    });

    const newParams = new URLSearchParams(searchParams);
    newParams.set('theme', themeName);
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme) => {
          const isActive = config.theme === theme.name;
          const primaryHsl =
            theme.cssVars?.[mode === 'dark' ? 'dark' : 'light']?.primary ?? '0 0% 50%';

          return mounted ? (
            <Card
              key={theme.name}
              onClick={() => updateTheme(theme.name)}
              className={cn(
                'cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md',
                isActive ? 'border-primary ring-2 ring-primary' : '',
              )}
            >
              <div
                className="h-24 w-full rounded-md"
                style={{
                  background: `linear-gradient(to right, hsl(${primaryHsl}), hsl(${primaryHsl} / 0.6))`,
                }}
              />
              <div className="p-2">
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-medium">{theme.label}</span>
                  <div
                    className={cn(
                      'h-4 w-4 rounded-full border-2',
                      isActive ? 'bg-[hsl(var(--primary))]' : 'bg-white',
                    )}
                    style={{ borderColor: `hsl(${primaryHsl})` }}
                  />
                </div>
                <div className="mt-2 flex space-x-1">
                  {['primary', 'secondary', 'accent', 'muted', 'destructive'].map((key) => (
                    <div
                      key={key}
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: `hsl(${
                          (
                            theme.cssVars?.[mode === 'dark' ? 'dark' : 'light'] as Record<
                              string,
                              string
                            >
                          )?.[key] ?? '0 0% 50%'
                        })`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </Card>
          ) : (
            <Skeleton className="h-32 w-full" key={theme.name} />
          );
        })}
      </div>
      <div className="mb-4">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <FaSliders className="text-primary" />
          Radius
        </h3>
        <Slider
          defaultValue={[parseInt(config.cssVars.light.radius || '0')]}
          max={50}
          step={1}
          onValueChange={(value) => {
            const radiusValue = `${value[0]}px`;

            setConfig({
              ...config,
              cssVars: {
                ...config.cssVars,
                light: { ...config.cssVars.light, radius: radiusValue },
                dark: { ...config.cssVars.dark, radius: radiusValue },
              },
            });

            const newParams = new URLSearchParams(searchParams);
            newParams.set('radius', `${value[0]}`);
            router.push(`?${newParams.toString()}`);
          }}
        />
      </div>

      <div className="space-y-4 rounded-lg border bg-muted p-4">
        <h3 className="text-lg font-medium">Preview</h3>
        <div className="flex flex-wrap gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
        <div className="flex gap-2">
          {['A', 'B', 'C', 'D'].map((char, i) => (
            <div
              key={i}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary"
            >
              {char}
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-2 w-32 rounded-full bg-primary/20">
            <div className="h-2 w-20 rounded-full bg-primary"></div>
          </div>
          <span className="text-xs">60%</span>
        </div>
      </div>
      {/*  <div className="mt-6 space-y-4">
        <Label className="font-medium">Custom Theme</Label>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {['Primary', 'Secondary', 'Background', 'Text'].map((label, i) => (
            <div key={i}>
              <Label className="mb-1 block text-sm font-medium">
                {label} Color
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  className="h-10 w-10 p-0"
                  defaultValue="#6366f1"
                />
                <Input type="text" defaultValue="#6366f1" />
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ColorSelector;
