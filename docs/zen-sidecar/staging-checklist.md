# Zen Sidecar — staging rollout checklist

Use after [PR #20](https://github.com/BASEDONG/basedong/pull/20) (or equivalent) is on the target environment.

## 1. Deploy Sidecar

- [ ] Compose overlay includes `docker-compose.zen-sidecar.yml` (service name **`zen-sidecar`**, port **8080** internal only)
- [ ] `SIDECAR_KEY` set to a **production** secret (not `basedong-sidecar-dev-credential`)
- [ ] `UPSTREAM=https://opencode.ai/zen/v1` (Anonymous Zen v1)
- [ ] Sidecar **not** published to host ports
- [ ] `GET /health` returns 200 from the private network

## 2. Configure New API Channel

| Field | Value |
|--------|--------|
| Type | OpenAI-compatible |
| Base URL | `http://zen-sidecar:8080` |
| Models | `auto` |
| Key | Same as Sidecar `SIDECAR_KEY` |
| Model mapping | `{}` (empty) |
| RetryTimes | `0` |

**Automated seed (local / staging Admin root credentials known):**

```bash
SIDECAR_CREDENTIAL="$SIDECAR_KEY" \
  BASEDONG_API_BASE=http://localhost:3000 \
  bash apps/zen-sidecar/scripts/seed-zen-channel.sh
```

Or configure manually in Admin UI:

- [ ] ModelPrice / billing configured for `auto` (seed sets `auto:0`)
- [ ] Channel enabled and routed for the intended token group

## 3. Automated verification (mock — CI or laptop)

```bash
bash apps/zen-sidecar/scripts/probe-blackbox.sh
cd apps/api && go test ./relay/helper/... -run Sidecar -count=1
```

- [ ] Black-box probe passes
- [ ] Sidecar upstream header unit tests pass

## 4. Live smoke (optional, manual)

Follow [live-smoke.md](./live-smoke.md):

- [ ] Sidecar direct `auto` chat completion succeeds
- [ ] Customer API Key → Relay → Sidecar → Zen succeeds
- [ ] Admin consume log shows **Actual Model** for `auto` requests

## 5. Product / docs

- [ ] Customer catalog exposes **`auto`** (not raw Free Pool ids)
- [ ] [Customer disclosure](./customer-auto-disclosure.md) visible in API docs / product copy
- [ ] Operators have [runbook](./runbook.md) access

## 6. Post-deploy monitoring

- [ ] Sidecar logs: request id, chosen model, retry count, upstream status
- [ ] Alert on sustained 503 (empty pool) or Sidecar unhealthy
- [ ] Document site egress IP for upstream quota discussions

## Rollback

1. Disable or deprioritize the Zen Sidecar Channel in Admin.
2. Stop `zen-sidecar` container (customers fail fast on `auto` rather than hitting Zen directly).
3. Keep last good Free Pool cache on disk/volume if Sidecar state is persisted (v1: in-memory only — restart triggers resync).
