# Glowey Developer API Docs

Documentation site for the [Glowey](https://glowey.app) Developer API — the all-in-one AI creative platform.

Built with [Fumadocs](https://fumadocs.vercel.app) on Next.js + Tailwind CSS v4.

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
```

## Deploy

Deploy on [Vercel](https://vercel.com) — no configuration needed. Framework is detected as Next.js automatically.

1. Import this repo into Vercel
2. Vercel auto-detects Next.js and runs `pnpm build`
3. Done

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Docs framework:** Fumadocs UI + fumadocs-mdx
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Package manager:** pnpm
- **Content:** MDX files in `content/docs/`

## Content Structure

```
content/docs/
├── index.mdx               # Introduction
├── authentication.mdx
├── rate-limits.mdx
├── errors.mdx
├── credits-and-pricing.mdx
├── endpoints/
│   ├── image.mdx
│   ├── video.mdx
│   ├── lipsync.mdx
│   ├── music.mdx
│   ├── chat.mdx
│   ├── audio-tools.mdx
│   ├── suno-tools.mdx
│   └── edit.mdx
└── examples/
    ├── nodejs.mdx
    ├── python.mdx
    └── curl.mdx
```

## API Base URL

All Glowey API endpoints are at `https://glowey.app/api/`.

Get a token at [glowey.app/me/settings](https://glowey.app/me/settings) → Developer API.

## Links

- [Glowey App](https://glowey.app)
- [API Settings](https://glowey.app/me/settings)
- [GitHub Issues](https://github.com/arielaizn/Glowey-Developers-Docs/issues)
