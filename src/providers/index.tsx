'use client';

import { ThemeProvider } from 'next-themes';

import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai';

import { ChildrenProps } from '../../@Types/global';

const queryClient = new QueryClient();

const Providers = ({ children }: ChildrenProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <JotaiProvider>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </JotaiProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
};
export default Providers;
