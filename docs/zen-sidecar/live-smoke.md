# Zen Sidecar — live Anonymous Zen smoke

Manual check against **real** OpenCode Zen Anonymous free tier. Not suitable for CI (network, rate limits, catalog churn).

## When to run

- After first deploy of Sidecar to staging/production
- After Sidecar credential rotation
- After major Sidecar or upstream behavior changes
- **Not** required for every PR (use `probe-blackbox.sh` with mock Zen instead)

## Prerequisites

- Sidecar and New API on the same private Docker network (`zen-sidecar` DNS name)
- Outbound HTTPS from Sidecar to `https://opencode.ai/zen/v1`
- Sidecar env: default Anonymous Zen (`UPSTREAM=https://opencode.ai/zen/v1`); no mock overlay
- Channel configured per [runbook](./runbook.md) (`auto`, Sidecar Credential, `RetryTimes=0`)

## Stack (no mock)

From monorepo root:

```bash
docker compose \
  -f docker-compose.yml \
  -f docker-compose.zen-sidecar.yml \
  -p basedong-zen-live \
  up -d --build api zen-sidecar

bash apps/zen-sidecar/scripts/probe-spine.sh
```

Do **not** include `docker-compose.zen-mock.yml`.

## Sidecar direct (private network)

Replace `SIDECAR_KEY` with your Sidecar Credential:

```bash
export PROJECT=basedong-zen-live
export NETWORK="${PROJECT}_default"
export SIDECAR_KEY=your-sidecar-credential

docker run --rm --network "$NETWORK" curlimages/curl:8.12.1 \
  -sS -H "Authorization: Bearer $SIDECAR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto","messages":[{"role":"user","content":"ping"}],"max_tokens":16}' \
  "http://zen-sidecar:8080/v1/chat/completions" | head -c 500
```

**Expect:** HTTP 200, JSON with non-empty `choices[0].message.content`, `model` set to a real Free Pool id, response header `X-Basedong-Upstream-Model` matching JSON `model`.

## New API Channel path (E2E)

1. Seed Channel + ModelPrice (or configure manually in Admin):

```bash
SIDECAR_CREDENTIAL="$SIDECAR_KEY" \
  BASEDONG_API_BASE=http://localhost:3000 \
  bash apps/zen-sidecar/scripts/seed-zen-channel.sh
```

2. Create or use a test API Key with access to `auto`.
3. Call Relay:

```bash
curl -sS "http://localhost:3000/v1/chat/completions" \
  -H "Authorization: Bearer $CUSTOMER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto","messages":[{"role":"user","content":"ping"}],"max_tokens":16}'
```

4. Admin → Logs: consume row shows `model_name=auto` and **Actual Model** (via `other.upstream_model_name`) when Relay patch (#19) is deployed.

## Streaming (optional)

```bash
curl -sS -N "http://localhost:3000/v1/chat/completions" \
  -H "Authorization: Bearer $CUSTOMER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto","messages":[{"role":"user","content":"ping"}],"max_tokens":16,"stream":true}' \
  | head -20
```

Expect OpenAI SSE framing (`data: {...}`) and a single upstream model for the stream.

## Failure interpretation

| Result | Likely cause |
|--------|----------------|
| 401/403 to Sidecar | Wrong Sidecar Credential on Channel or env |
| 503 / empty pool | Catalog sync failed and cache empty; check Sidecar logs, `GET /health` |
| 429 from upstream | Site egress IP rate-limited; wait or retry later |
| 200 but `model=auto` in body | Sidecar misconfig; native `auto` should resolve to a concrete id |

## Safety

- Use **non-sensitive** prompts only (Anonymous Zen may train on content). See [customer disclosure](./customer-auto-disclosure.md).
- Tear down when done: `docker compose -p basedong-zen-live down -v`

## Related

- [staging-checklist.md](./staging-checklist.md)
- [runbook.md](./runbook.md)
- PoC black-box (mock): `bash apps/zen-sidecar/scripts/probe-blackbox.sh`
