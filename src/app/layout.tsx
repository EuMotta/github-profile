import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Providers from '@/providers';
import { ThemeProvider } from '@/providers/theme-provider';
import { siteConfig } from '@/settings/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://styled-hub.vercel.app/'),
  title: {
    default: siteConfig.site.name,
    template: `%s | StyledHub`,
  },
  description: 'StyledHub - Veja seu github personalizado.',
  openGraph: {
    images: ['/ogimage.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
