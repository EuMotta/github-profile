'use client';
import { useTheme } from 'next-themes';
import React from 'react';

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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { MdColorLens } from 'react-icons/md';
import ColorSelector from './color-selector';

const ColorSection: React.FC = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          <MdColorLens />
        </SheetTrigger>
        <SheetContent className="!max-w-2xl">
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
          <ColorSelector />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ColorSection;
