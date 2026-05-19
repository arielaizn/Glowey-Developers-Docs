# Image Generation

Generate images from text or image-to-image transformations.

## Generate Image

**POST** `/api/generate`

Submit a text-to-image or image-to-image request. Returns a `taskId` for polling.

### Authentication

Bearer token required.

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `modelId` | string | Yes | Model ID (e.g., `flux-pro`, `flux-dev`, `nano-banana-pro`) |
| `prompt` | string | Yes | Text description of the image |
| `resolution` | string | No | Output quality: `512`, `1K`, `2K`, `4K`. Default: `1K` |
| `aspectRatio` | string | No | Aspect ratio: `1:1`, `16:9`, `9:16`, `4:3`, `3:4`. Default: `1:1` |
| `refImageUrls` | string[] | No | Image URLs for image-to-image (will use the first if provided) |

### Response

```json
{
  "taskId": "task_abc123xyz",
  "strategy": "market"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `taskId` | string | Unique task ID for polling status |
| `strategy` | string | Strategy used (e.g., `market`) |

### Credit Cost

Depends on model and resolution. See [../credits-and-pricing.md](../credits-and-pricing.md).

Example: FLUX Pro @ 1K = 15 credits.

### Errors

- `400` – Missing or invalid parameters (no `modelId` or `prompt`)
- `401` – Unauthorized (invalid or missing token)
- `402` – Insufficient credits
- `429` – Rate limited
- `500` – Server error (credits refunded)
- `502` – AI provider error (credits refunded)

### Example Request

```bash
curl -X POST https://glowey.app/api/generate \
  -H "Authorization: Bearer glow_sk_YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "modelId": "flux-pro",
    "prompt": "a serene lake at sunset, mountains in background, golden hour lighting",
    "resolution": "2K",
    "aspectRatio": "16:9"
  }'
```

### Example Response

```json
{
  "taskId": "task_8f3e9a2b",
  "strategy": "market"
}
```

---

## Check Generation Status

**GET** `/api/generate/status`

Poll for the result of an image generation task.

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
  "taskId": "task_8f3e9a2b"
}
```

### Response (Success)

```json
{
  "state": "success",
  "taskId": "task_8f3e9a2b",
  "output": {
    "images": [
      {
        "url": "https://storage.glowey.app/...",
        "seed": 12345
      }
    ]
  }
}
```

### Response (Failed)

```json
{
  "state": "fail",
  "taskId": "task_8f3e9a2b",
  "error": "Model provider error"
}
```

If failed, any remaining credits are refunded.

### Errors

- `400` – Missing `taskId`
- `401` – Unauthorized
- `429` – Rate limited
- `500` – Server error

### Example Request

```bash
curl "https://glowey.app/api/generate/status?taskId=task_8f3e9a2b" \
  -H "Authorization: Bearer glow_sk_YOUR_TOKEN_HERE"
```

### Polling Strategy

1. Submit generation request → get `taskId`
2. Poll status endpoint every 2–5 seconds
3. When `state` is `success` or `fail`, stop polling
4. Access images from `output.images[].url`

### Typical Time to Completion

- FLUX Pro: 5–15 seconds
- FLUX Dev: 3–10 seconds
- FLUX Schnell: 2–5 seconds
- Nano Banana: 3–8 seconds

---

## Supported Models

See [../credits-and-pricing.md#image-generation](../credits-and-pricing.md#image-generation) for the complete list and pricing.

Popular models:
- `flux-pro` – High quality, slower
- `flux-dev` – Balanced quality/speed
- `flux-schnell` – Fast, good for real-time
- `nano-banana-pro` – Budget, fast
- `gpt-image-2-0` – Excellent detail
- `imagen4-ultra` – High quality
