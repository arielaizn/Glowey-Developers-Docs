import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { GloweyLogo } from '@/components/GloweyLogo';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: <GloweyLogo />,
      }}
      links={[
        {
          type: 'main',
          text: 'Main Site',
          url: 'https://gloweyai.com',
          external: true,
        },
        {
          type: 'main',
          text: 'App',
          url: 'https://gloweyai.com/me/settings',
          external: true,
        },
        {
          type: 'main',
          text: 'GitHub',
          url: 'https://github.com/arielaizn/Glowey-Developers-Docs',
          external: true,
        },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
