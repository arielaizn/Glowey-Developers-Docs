# Lipsync

Synchronize audio to avatar/video faces for lifelike character animations.

## Generate Lipsync

**POST** `/api/lipsync/generate`

Submit an audio lipsync request. Returns a `taskId` for polling.

### Authentication

Bearer token required.

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `modelId` | string | Yes | Lipsync model: `sync-lipsync`, `sync-lipsync-v2`, `sync-lipsync-v2-pro`, `sync-lipsync-v3`, `veed-fabric`, `creatify-aurora`, `kling-avatar` |
| `audioUrl` | string | Yes | URL of audio file (MP3, WAV, M4A) |
| `videoUrl` | string | Yes | URL of video/image with face to animate |
| `variant` | string | No | Model variant (e.g., `lipsync-2-pro` for Sync v2 pro mode) |

### Response

```json
{
  "taskId": "task_lip789def"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `taskId` | string | Unique task ID for polling |

### Credit Cost

Fixed per model. See [../credits-and-pricing.md#lipsync](../credits-and-pricing.md#lipsync).

- Sync Lipsync v2: 40 credits
- Sync Lipsync v3: 80 credits
- Veed Fabric: 25 credits

### Errors

- `400` – Missing or invalid parameters
- `401` – Unauthorized
- `402` – Insufficient credits
- `429` – Rate limited
- `500` – Server error (credits refunded)
- `502` – AI provider error (credits refunded)

### Example Request

```bash
curl -X POST https://glowey.app/api/lipsync/generate \
  -H "Authorization: Bearer glow_sk_YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "modelId": "sync-lipsync-v2",
    "audioUrl": "https://example.com/audio.mp3",
    "videoUrl": "https://example.com/avatar.mp4"
  }'
```

### Example Response

```json
{
  "taskId": "task_lip789def"
}
```

---

## Check Lipsync Status

**GET** `/api/lipsync/status`

Poll for the result of a lipsync task.

### Authentication

Bearer token required.

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `taskId` | string | Yes | Task ID from generate response |
| `modelId` | string | Yes | The lipsync model used |

### Response (Pending)

```json
{
  "state": "pending",
  "taskId": "task_lip789def"
}
```

### Response (Success)

```json
{
  "state": "success",
  "taskId": "task_lip789def",
  "output": {
    "video_url": "https://storage.glowey.app/lipsync_xyz789.mp4"
  }
}
```

### Response (Failed)

```json
{
  "state": "fail",
  "taskId": "task_lip789def",
  "error": "Face not detected in video"
}
```

### Errors

- `400` – Missing `taskId` or `modelId`
- `401` – Unauthorized
- `429` – Rate limited
- `500` – Server error

### Example Request

```bash
curl "https://glowey.app/api/lipsync/status?taskId=task_lip789def&modelId=sync-lipsync-v2" \
  -H "Authorization: Bearer glow_sk_YOUR_TOKEN_HERE"
```

### Polling Strategy

1. Submit lipsync request → get `taskId`
2. Poll every 3–5 seconds
3. When `state` is `success` or `fail`, stop
4. Download result from `output.video_url`

### Typical Time to Completion

- Sync Lipsync v2: 10–20 seconds
- Sync Lipsync v3: 15–30 seconds
- Veed Fabric: 5–15 seconds

---

## Supported Models

| Model | Speed | Quality | Cost |
|-------|-------|---------|------|
| sync-lipsync | Fastest | Good | 30 credits |
| sync-lipsync-v2 | Fast | Better | 40 credits |
| sync-lipsync-v2-pro | Fast | Best | 60 credits |
| sync-lipsync-v3 | Medium | Excellent | 80 credits |
| veed-fabric | Very Fast | Good | 25 credits |
| creatify-aurora | Very Fast | Good | 25 credits |
| kling-avatar | Fast | Excellent | 30 credits |

---

## Tips

- **Audio Format:** MP3, WAV, or M4A. Duration: < 1 minute (most models)
- **Video Format:** MP4, MOV, or GIF. Size: < 50 MB
- **Face Quality:** Frontals work best. Side profiles or poor lighting may fail
- **Multiple Faces:** Models sync the largest/most prominent face
