'use client';
import { useTheme } from 'next-themes';
import React from 'react';
import { MdColorLens } from 'react-icons/md';

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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { useConfig } from '@/hooks/config';

import { cn } from '@/lib/utils';

import { themes } from '@/constants/themes';

import ColorSelector from './color-selector';
import { Button } from './ui/button';

const ColorSection: React.FC = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          <MdColorLens />
        </SheetTrigger>
        <SheetContent className="!max-w-2xl">
          <SheetHeader>
            <SheetTitle>Theme Selector</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <ColorSelector />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ColorSection;
