# Rate Limiting

All API endpoints are rate-limited per token to ensure fair resource allocation.

## Default Limits

**60 requests per minute** per token (rolling 1-minute window).

| Metric | Value |
|--------|-------|
| Window | 1 minute |
| Limit | 60 requests |
| Scope | Per token |

The limit applies to **all** authenticated endpoints regardless of type (image, video, chat, etc.).

## When Rate-Limited

If you exceed the limit, the API returns:

```
HTTP 429 Too Many Requests
```

Response body:

```json
{
  "error": "rate_limited",
  "limit": 60,
  "window": "1m",
  "retryAfter": 45
}
```

## Retry Behavior

When rate-limited:

1. Read the `Retry-After` response header (seconds to wait)
2. Wait the specified duration
3. Retry the request

Headers included in 429 responses:

| Header | Value |
|--------|-------|
| `Retry-After` | Seconds until bucket rolls over (0–59) |
| `X-RateLimit-Limit` | 60 |
| `X-RateLimit-Remaining` | 0 |

## Best Practices

- Implement exponential backoff: retry with increasing delays
- Cache results when possible
- Batch multiple operations into fewer requests where feasible
- Monitor `Retry-After` headers to avoid unnecessary requests

## Custom Limits

Enterprise customers can request higher limits via email: [api@glowey.app](mailto:api@glowey.app)
