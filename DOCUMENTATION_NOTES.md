# Documentation Build Notes

## Endpoints Documented

### Generation (Async, Poll-based)
- ✅ `POST /api/generate` + `GET /api/generate/status` – Image generation
- ✅ `POST /api/video/generate` + `GET /api/video/status` – Video generation
- ✅ `POST /api/lipsync/generate` + `GET /api/lipsync/status` – Lipsync (receives `modelId` in status query)
- ✅ `POST /api/audio/music` + `GET /api/audio/music/status` – Music generation

### Chat / LLM (Streaming)
- ✅ `POST /api/chat` – Multi-model LLM with tools and web search (returns SSE stream)

### Audio (Sync)
- ✅ `POST /api/audio/sfx` – Sound effects (synchronous, 30–60s timeout)
- ✅ `POST /api/audio/clone` – Voice cloning (synchronous)
- ✅ `POST /api/audio/transcribe` – Transcription (synchronous, multipart form)
- ✅ `POST /api/tts/elevenlabs` – ElevenLabs TTS (synchronous)

### Suno Post-Processing Tools
- ✅ `POST /api/audio/suno/*` – All 12 post-processing tools documented:
  - lyrics, extend, stems, cover, music-video, replace-section, add-instrumental, add-vocals, boost-style, upload-cover, upload-extend, wav

### Image Edit (Async)
- ✅ `POST /api/edit` + `GET /api/edit/status` – Enhance, remove-bg, inpaint, expand

### Token Management (Session-only)
- ✅ `POST /api/user/tokens` (create)
- ✅ `GET /api/user/tokens` (list)
- ✅ `DELETE /api/user/tokens/[id]` (revoke)

**Note:** Token endpoints require browser session cookie, not dev tokens (correctly documented).

---

## Assumptions Made

1. **Base URL:** `https://gloweyai.com/api` for all endpoints
2. **Token Format:** `glow_sk_<32 random characters>` (extracted from code)
3. **Rate Limit:** 60 req/min/token (from `api-rate-limit.ts`)
4. **Credit Costs:** Extracted from `lib/credits.ts` and `lib/generation-pricing.ts` – tables are accurate and comprehensive
5. **Error Responses:** Standard JSON with `error` field + optional contextual fields (`required`, `current`, `retryAfter`, etc.)
6. **Streaming:** Chat uses OpenAI-compatible SSE format (verified from route code)
7. **Polling:** All async endpoints use `taskId` + status check pattern; lipsync also requires `modelId` query param
8. **Credit Deduction:** Happens on submit, refunded on failure
9. **No Actual Tokens:** All examples use placeholder `glow_sk_YOUR_TOKEN_HERE`

---

## Missing/Uncertain Endpoints

### OAuth / Webhooks
- No OAuth flow documented (only Bearer tokens)
- No webhook endpoints found for async results (polling is the pattern)

### Batch Operations
- No batch endpoint found; users must make individual requests and handle concurrency themselves

### Usage/Stats
- No `/api/user/usage` or analytics endpoint documented
- Users can only check credits via error responses (402 gives `current` balance)

### Suno Post-Processing Status
- Documented as async (returning `taskId`), but exact status endpoint paths for each tool (`GET /api/audio/suno/{tool}/status`) may vary
- Assumed consistent pattern; should be verified against actual implementation

### Voice Clone Voice ID Reuse
- Documented that cloning returns `voiceId` for TTS, but no endpoint to list saved clones
- Users must store `voiceId` from creation response

---

## Documentation Structure

```
/Users/a1234/Glowey-Developers-Docs/
├── README.md                           # Landing page with quick start
├── LICENSE                             # MIT
├── .gitignore                          # Standard Node/build ignores
├── mint.json                           # Mintlify config for hosted docs
├── docs/
│   ├── authentication.md               # Bearer token format & usage
│   ├── rate-limits.md                  # 60/min limit, Retry-After header
│   ├── errors.md                       # All error codes (400, 401, 402, 429, 500, 502, 503, 504)
│   ├── credits-and-pricing.md          # Complete cost tables (images, videos, audio, etc.)
│   ├── endpoints/
│   │   ├── image.md                    # POST /api/generate + status
│   │   ├── video.md                    # POST /api/video/generate + status
│   │   ├── lipsync.md                  # POST /api/lipsync/generate + status
│   │   ├── music.md                    # POST /api/audio/music + status
│   │   ├── chat.md                     # POST /api/chat (SSE streaming)
│   │   ├── audio-tools.md              # SFX, clone, transcribe, TTS
│   │   ├── suno-tools.md               # 12 post-processing tools
│   │   └── edit.md                     # POST /api/edit + status
│   └── examples/
│       ├── nodejs.md                   # fetch, axios, TypeScript examples
│       ├── python.md                   # requests, httpx, async examples
│       └── curl.md                     # One-liners + polling loops
```

---

## Mintlify Config

- **Theme:** Dark (matching Glowey brand)
- **Primary Color:** #FF6B35 (Glowey orange)
- **Sidebar Navigation:** Mirrors folder structure
- **Includes:** GitHub, Status links + CTA to get started

To deploy: `git push` + connect repo to Mintlify dashboard (one-click). Docs auto-update on pushes.

---

## Testing Recommendations

Before publishing:

1. **Verify token format** in /me/settings (confirm `glow_sk_` prefix)
2. **Test one endpoint live** (e.g., `POST /api/generate`) to confirm request/response shapes
3. **Check polling behavior** (especially lipsync's `modelId` requirement)
4. **Confirm Suno tool endpoints** exist at documented paths
5. **Verify credit costs** against current pricing (table may shift over time)
6. **Test error codes** (especially 402 + 429 responses with headers)

---

## Future Improvements

- [ ] OpenAPI/Swagger spec (auto-generate docs from code)
- [ ] Interactive API explorer (Mintlify has built-in support)
- [ ] Webhook documentation (if/when feature launches)
- [ ] SDKs (Node.js, Python) with type safety
- [ ] Batch endpoint (if demand exists)
- [ ] Pricing calculator (interactive credit estimator)
- [ ] API changelog / versioning
- [ ] Postman collection export
