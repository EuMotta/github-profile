import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://styled-hub.vercel.app'),
  title: 'About',
  description: 'About project.',
  openGraph: {
    images: ['/ogimage.png'],
  },
};
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex-grow">{children}</main>;
}
