# Glowey Developer API

The Glowey API lets developers integrate AI-powered creative generation into their apps. Generate images, videos, audio, music, and more—each request deducts credits from the authenticated token owner's Glowey subscription.

## Quick Start

1. **Get a token:** Sign in at [glowey.app](https://glowey.app) → Settings → Developer API. Create a token and copy it immediately (never shown again).

2. **Make a request:**

   ```bash
   curl -X POST https://glowey.app/api/generate \
     -H "Authorization: Bearer glow_sk_YOUR_TOKEN_HERE" \
     -H "Content-Type: application/json" \
     -d '{
       "modelId": "flux-pro",
       "prompt": "a serene lake at sunset",
       "resolution": "1K"
     }'
   ```

3. **Poll for results:** Use the `taskId` returned above with the status endpoint (documented per feature).

## Key Concepts

- **Authentication:** Include `Authorization: Bearer glow_sk_YOUR_TOKEN_HERE` on every request.
- **Credits:** Each call costs credits (see [./docs/credits-and-pricing.md](./docs/credits-and-pricing.md)). Insufficient credits → 402 response.
- **Rate Limiting:** 60 requests per minute per token (env-configurable).
- **Async Tasks:** Image, video, lipsync, and music use taskId polling. Chat and audio tools are sync or streaming.

## Features

### Generation (Async)
- **[Images](./docs/endpoints/image.md)** – Text-to-image, image-to-image
- **[Videos](./docs/endpoints/video.md)** – Text-to-video, image-to-video
- **[Lipsync](./docs/endpoints/lipsync.md)** – Sync audio to avatars
- **[Music](./docs/endpoints/music.md)** – Suno music generation + post-processing tools

### Chat & LLM
- **[Chat](./docs/endpoints/chat.md)** – Multi-model LLM streaming with tool use (web search, image generation, memory)

### Audio
- **[Audio Tools](./docs/endpoints/audio-tools.md)** – Sound effects, voice cloning, transcription, TTS
- **[Suno Tools](./docs/endpoints/suno-tools.md)** – Music post-processing (lyrics, extend, stems, cover, etc.)

### Edit
- **[Image Edit](./docs/endpoints/edit.md)** – Enhance, remove background, inpaint, expand

## Guides

- [Authentication](./docs/authentication.md) – Bearer tokens, error codes
- [Rate Limiting](./docs/rate-limits.md) – Quotas and backoff
- [Error Responses](./docs/errors.md) – 401, 402, 429, 500
- [Credits & Pricing](./docs/credits-and-pricing.md) – Per-model cost tables

## Examples

- [Node.js / JavaScript](./docs/examples/nodejs.md)
- [Python](./docs/examples/python.md)
- [cURL](./docs/examples/curl.md)

## API Base

All endpoints are at `https://glowey.app/api/`

## Help

For issues, feature requests, or questions, [open an issue on GitHub](https://github.com/glowey/api).

---

**Status:** Production  
**Last Updated:** 2025-05-19
