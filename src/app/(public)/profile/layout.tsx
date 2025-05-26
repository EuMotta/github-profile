import { Navbar1 } from '@/templates/navbar1';
import type { Metadata } from 'next';

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

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar1 />
      {children}
    </div>
  );
}
