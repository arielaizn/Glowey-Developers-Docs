# Video Generation

Generate videos from text, images, or reference videos.

## Generate Video

**POST** `/api/video/generate`

Submit a video generation request. Returns a `taskId` for polling.

### Authentication

Bearer token required.

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `modelId` | string | Yes | Model ID (e.g., `seedance-2-fast`, `kling-3`, `veo-3`) |
| `prompt` | string | Conditional | Text description. Required unless using motion control |
| `duration` | number | No | Video length in seconds. Default: 5. Range: 4–15 depending on model |
| `resolution` | string | No | Quality: `480p`, `720p`, `1080p`, `4K`, or `pro` (Kling). Default: `720p` |
| `aspectRatio` | string | No | Aspect ratio: `1:1`, `16:9`, `9:16`. Default: `16:9` |
| `audioOn` | boolean | No | Include generated audio (some models). Default: false |
| `refImageUrl` | string | No | Single reference image URL |
| `refImageUrls` | string[] | No | Multiple reference images |
| `refVideoUrls` | string[] | No | Reference video URLs for style transfer |
| `refAudioUrls` | string[] | No | Reference audio URLs for music or voiceover |
| `motionVideoUrl` | string | No | Motion control video (for `kling-motion-control` only) |
| `firstFrameUrl` | string | No | Pin first frame (some models) |
| `lastFrameUrl` | string | No | Pin last frame (some models) |
| `characterOrientation` | string | No | Character direction hint |

### Response

```json
{
  "taskId": "task_xyz789abc",
  "strategy": "market"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `taskId` | string | Unique task ID for polling |
| `strategy` | string | Execution strategy (e.g., `market`) |

### Credit Cost

Varies by model, duration, and resolution. See [../credits-and-pricing.md#video-generation](../credits-and-pricing.md#video-generation).

Example: Seedance 2.0 Fast, 5s, 720p = (12 + 5×3) × 1.25 = 57 credits.

### Errors

- `400` – Missing `modelId` or required parameters
- `401` – Unauthorized
- `402` – Insufficient credits
- `429` – Rate limited
- `500` – Server error (credits refunded)
- `502` – AI provider error (credits refunded)

### Example Request

```bash
curl -X POST https://glowey.app/api/video/generate \
  -H "Authorization: Bearer glow_sk_YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "modelId": "seedance-2-fast",
    "prompt": "a robot dancing in a neon-lit city, cyberpunk aesthetic",
    "duration": 5,
    "resolution": "720p",
    "aspectRatio": "16:9"
  }'
```

### Example Response

```json
{
  "taskId": "task_h4i5j6k7",
  "strategy": "market"
}
```

---

## Check Video Status

**GET** `/api/video/status`

Poll for the result of a video generation task.

### Authentication

Bearer token required.

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `taskId` | string | Yes | Task ID from the generate response |
| `strategy` | string | No | Strategy used (default: `market`) |

### Response (Pending)

```json
{
  "state": "pending",
  "taskId": "task_h4i5j6k7"
}
```

### Response (Success)

```json
{
  "state": "success",
  "taskId": "task_h4i5j6k7",
  "output": {
    "video_url": "https://storage.glowey.app/video_xyz789.mp4",
    "cover_image_url": "https://storage.glowey.app/cover_xyz789.jpg"
  }
}
```

### Response (Failed)

```json
{
  "state": "fail",
  "taskId": "task_h4i5j6k7",
  "error": "Model timed out"
}
```

### Errors

- `400` – Missing `taskId`
- `401` – Unauthorized
- `429` – Rate limited
- `500` – Server error

### Example Request

```bash
curl "https://glowey.app/api/video/status?taskId=task_h4i5j6k7" \
  -H "Authorization: Bearer glow_sk_YOUR_TOKEN_HERE"
```

### Polling Strategy

1. Submit video request → get `taskId`
2. Poll every 5–10 seconds
3. When `state` is `success` or `fail`, stop
4. Download video from `output.video_url`

### Typical Time to Completion

- Seedance 2.0 Fast: 15–30 seconds
- Seedance 2.0: 30–60 seconds
- Kling 3.0: 20–40 seconds
- Veo 3.1: 30–90 seconds (longer due to quality)

---

## Supported Models

See [../credits-and-pricing.md#video-generation](../credits-and-pricing.md#video-generation) for complete list.

Popular models:
- `seedance-2-fast` – Fast, budget-friendly
- `seedance-2` – Higher quality
- `kling-3` – Excellent quality, motion control
- `veo-3` – Cinematic quality
- `kling-motion-control` – Motion-driven (requires `motionVideoUrl`)
