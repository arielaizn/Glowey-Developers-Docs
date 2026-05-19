import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import './global.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Allow user pinch-zoom for accessibility; never lock it down.
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#030407' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Glowey Docs — Developer API',
    template: '%s · Glowey Docs',
  },
  description:
    'Official documentation for the Glowey Developer API — generate images, video, music, lipsync, audio and more with a single bearer token.',
  metadataBase: new URL('https://docs.gloweyai.com'),
  applicationName: 'Glowey Docs',
  openGraph: {
    title: 'Glowey Docs — Developer API',
    description:
      'The all-in-one AI creative platform. Developer API reference, SuperGlow integration, and full quickstart guides.',
    type: 'website',
    siteName: 'Glowey Docs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glowey Docs — Developer API',
    description:
      'The all-in-one AI creative platform. Developer API reference, SuperGlow integration, and full quickstart guides.',
  },
  // app/icon.png and app/apple-icon.png are auto-detected by Next.js'
  // file-based metadata convention — no need to declare them here.
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
