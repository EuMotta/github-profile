import type { Metadata } from 'next';

import Footer from '@/templates/footer';
import { Navbar1 } from '@/templates/navbar1';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Motta',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/M.svg',
    },
  ],
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar1 />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
