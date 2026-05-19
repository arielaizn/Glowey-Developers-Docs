import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import './global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Glowey Developer Docs',
    template: '%s · Glowey Developer Docs',
  },
  description:
    'Official documentation for the Glowey Developer API — generate images, video, music, lipsync, audio and more with a single bearer token.',
  metadataBase: new URL('https://docs.gloweyai.com'),
  openGraph: {
    title: 'Glowey Developer Docs',
    description:
      'The all-in-one AI creative platform — Developer API reference, SuperGlow integration, and full quickstart guides.',
    type: 'website',
    siteName: 'Glowey Developer Docs',
  },
  twitter: { card: 'summary_large_image' },
  // app/favicon.ico, app/icon.png and app/apple-icon.png are auto-detected
  // by Next.js' file-based metadata convention — no need to declare them here.
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
