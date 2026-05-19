import Link from 'next/link';
import { GloweyLogo } from '@/components/GloweyLogo';

const BRAND = '#00D4FF';
const BRAND_DARK = '#0099BB';
const BRAND_GRADIENT = `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`;

const quickLinks = [
  {
    title: 'Quickstart',
    description: 'Getting started in 60 seconds',
    href: '/docs',
  },
  {
    title: 'Authentication',
    description: 'Bearer token setup and security',
    href: '/docs/authentication',
  },
  {
    title: 'Endpoints',
    description: 'Full API reference',
    href: '/docs/endpoints/image',
  },
  {
    title: 'Examples',
    description: 'Node.js, Python, curl snippets',
    href: '/docs/examples/curl',
  },
];

const capabilities = [
  'Text-to-image and image-to-image generation (FLUX, GPT Image, Imagen, Ideogram)',
  'Text-to-video and image-to-video (Seedance, Kling, Veo, Wan)',
  'Lipsync — sync audio to avatars and video faces',
  'Music generation with Suno V4 and V5, plus post-processing (extend, stems, lyrics)',
  'Chat with leading LLMs — Claude, GPT, Gemini — with SSE streaming',
  'Audio tools — sound effects, voice cloning, transcription, TTS',
  'Suno post-processing — extend, stems, cover, music video, boost style',
  'Image editing — enhance, remove background, inpaint, expand',
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-fd-background text-fd-foreground">
      {/* Nav */}
      <nav
        style={{
          borderBottom: '1px solid var(--color-fd-border)',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <GloweyLogo />
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.875rem', color: 'var(--color-fd-muted-foreground)' }}>
          <a href="https://glowey.app" target="_blank" rel="noopener noreferrer" className="text-fd-muted-foreground hover:text-fd-foreground" style={{ transition: 'color 0.15s' }}>
            Main Site
          </a>
          <a href="https://glowey.app/me" target="_blank" rel="noopener noreferrer" className="text-fd-muted-foreground hover:text-fd-foreground" style={{ transition: 'color 0.15s' }}>
            App
          </a>
          <a
            href="https://github.com/arielaizn/Glowey-Developers-Docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fd-muted-foreground hover:text-fd-foreground"
            style={{ transition: 'color 0.15s' }}
          >
            GitHub
          </a>
          <Link
            href="/docs"
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: '#020304',
              background: BRAND_GRADIENT,
              textDecoration: 'none',
              transition: 'filter 0.15s, box-shadow 0.15s',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.35), inset 0 1px 0 rgba(255,255,255,0.22)',
            }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          position: 'relative',
          padding: '6rem 1.5rem',
          textAlign: 'center',
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0, 212, 255, 0.18) 0%, transparent 70%), radial-gradient(ellipse at 80% 30%, rgba(167, 139, 250, 0.10) 0%, transparent 60%)',
        }}
      >
        <div style={{ margin: '0 auto', maxWidth: '48rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              borderRadius: '9999px',
              border: '1px solid var(--color-fd-border)',
              padding: '0.375rem 1rem',
              fontSize: '0.875rem',
              color: 'var(--color-fd-muted-foreground)',
              marginBottom: '2rem',
            }}
          >
            <span style={{ display: 'inline-block', width: '0.5rem', height: '0.5rem', borderRadius: '9999px', backgroundColor: '#22c55e' }} />
            Production — v1
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: '1rem', lineHeight: 1.1 }}>
            Glowey{' '}
            <span style={{ color: BRAND }}>Developer API</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-fd-muted-foreground)', marginBottom: '2.5rem', maxWidth: '36rem', margin: '0 auto 2.5rem' }}>
            Your comprehensive guide to the all-in-one AI creative platform&apos;s API.
            Generate images, video, music, audio, and more with a single bearer token.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <Link
              href="/docs"
              style={{
                padding: '0.875rem 1.75rem',
                borderRadius: '9999px',
                fontWeight: 700,
                color: '#020304',
                background: BRAND_GRADIENT,
                textDecoration: 'none',
                transition: 'filter 0.15s, box-shadow 0.15s',
                boxShadow: '0 0 28px rgba(0, 212, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.22)',
              }}
            >
              Read the docs
            </Link>
            <Link
              href="/docs/examples/curl"
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                border: '1px solid var(--color-fd-border)',
                color: 'var(--color-fd-foreground)',
                textDecoration: 'none',
                transition: 'background-color 0.15s',
              }}
            >
              View examples
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links 2x2 grid */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: '64rem', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>Start building</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          {quickLinks.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--color-fd-border)',
                padding: '1.5rem',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'border-color 0.15s, background-color 0.15s',
              }}
              className="hover:bg-fd-accent"
            >
              <div>
                <div style={{ fontWeight: 600, color: 'var(--color-fd-foreground)', marginBottom: '0.25rem' }}>
                  {card.title}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-fd-muted-foreground)' }}>
                  {card.description}
                </div>
              </div>
              <svg
                style={{ marginLeft: 'auto', marginTop: '0.25rem', flexShrink: 0 }}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* What's in the API */}
      <section
        style={{
          padding: '4rem 1.5rem',
          maxWidth: '64rem',
          margin: '0 auto',
          borderTop: '1px solid var(--color-fd-border)',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>What&apos;s in the API?</h2>
        <p style={{ color: 'var(--color-fd-muted-foreground)', marginBottom: '2rem' }}>
          One bearer token unlocks all Glowey capabilities. Each request deducts credits from your subscription balance.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {capabilities.map((item) => (
            <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.875rem' }}>
              <span style={{ marginTop: '0.125rem', flexShrink: 0, color: BRAND }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l4 4 6-7" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Quick curl example */}
      <section
        style={{
          padding: '4rem 1.5rem',
          maxWidth: '64rem',
          margin: '0 auto',
          borderTop: '1px solid var(--color-fd-border)',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Get started in 60 seconds</h2>
        <p style={{ color: 'var(--color-fd-muted-foreground)', marginBottom: '1.5rem' }}>
          Grab a token from{' '}
          <a href="https://glowey.app/me/settings" style={{ textDecoration: 'underline', color: 'inherit', transition: 'color 0.15s' }}>
            glowey.app/me/settings
          </a>{' '}
          and run your first request:
        </p>
        <div style={{ borderRadius: '0.75rem', border: '1px solid var(--color-fd-border)', overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderBottom: '1px solid var(--color-fd-border)',
              backgroundColor: 'var(--color-fd-card)',
              fontSize: '0.75rem',
              color: 'var(--color-fd-muted-foreground)',
            }}
          >
            <span style={{ width: '0.75rem', height: '0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(239,68,68,0.6)', display: 'inline-block' }} />
            <span style={{ width: '0.75rem', height: '0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(234,179,8,0.6)', display: 'inline-block' }} />
            <span style={{ width: '0.75rem', height: '0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(34,197,94,0.6)', display: 'inline-block' }} />
            <span style={{ marginLeft: '0.5rem' }}>bash</span>
          </div>
          <pre style={{ padding: '1rem', fontSize: '0.875rem', overflowX: 'auto', backgroundColor: 'var(--color-fd-background)' }}>
            <code>{`curl -X POST https://glowey.app/api/generate \\
  -H "Authorization: Bearer glow_sk_YOUR_TOKEN_HERE" \\
  -H "Content-Type: application/json" \\
  -d '{
    "modelId": "flux-pro",
    "prompt": "a serene lake at sunset",
    "resolution": "1K"
  }'`}</code>
          </pre>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--color-fd-muted-foreground)' }}>
          Returns a <code style={{ padding: '0.125rem 0.25rem', borderRadius: '0.25rem', backgroundColor: 'var(--color-fd-muted)', fontSize: '0.75rem' }}>taskId</code>. Poll{' '}
          <code style={{ padding: '0.125rem 0.25rem', borderRadius: '0.25rem', backgroundColor: 'var(--color-fd-muted)', fontSize: '0.75rem' }}>GET /api/generate/status?taskId=...</code> every 2-5 seconds until{' '}
          <code style={{ padding: '0.125rem 0.25rem', borderRadius: '0.25rem', backgroundColor: 'var(--color-fd-muted)', fontSize: '0.75rem' }}>&quot;state&quot;: &quot;success&quot;</code>.
        </p>
      </section>

      {/* Need help */}
      <section
        style={{
          padding: '4rem 1.5rem',
          maxWidth: '64rem',
          margin: '0 auto',
          borderTop: '1px solid var(--color-fd-border)',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Need help?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <a
            href="https://github.com/arielaizn/Glowey-Developers-Docs/issues"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--color-fd-border)',
              padding: '1.25rem',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'border-color 0.15s, background-color 0.15s',
            }}
            className="hover:bg-fd-accent"
          >
            <div>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>GitHub Issues</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-fd-muted-foreground)' }}>Bug reports and feature requests</div>
            </div>
          </a>
          <a
            href="mailto:api@glowey.app"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--color-fd-border)',
              padding: '1.25rem',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'border-color 0.15s, background-color 0.15s',
            }}
            className="hover:bg-fd-accent"
          >
            <div>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Email Support</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-fd-muted-foreground)' }}>api@glowey.app</div>
            </div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--color-fd-border)',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: 'var(--color-fd-muted-foreground)',
        }}
      >
        <p>
          &copy; {new Date().getFullYear()} Glowey. Built with{' '}
          <a href="https://fumadocs.vercel.app" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit', transition: 'color 0.15s' }}>
            Fumadocs
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
