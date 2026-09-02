# Zen Sidecar â€” operator runbook

Operators attach **one New API Channel** to the private **Zen Sidecar** container. Customers call model **`auto`** with their **API Key** through the Relay; they never reach the Sidecar or Anonymous Zen directly.

Glossary: [`apps/zen-sidecar/CONTEXT.md`](../../apps/zen-sidecar/CONTEXT.md). Architecture: [ADR 0004](../adr/0004-zen-sidecar-anonymous-free-pool.md).

## Prerequisites

- New API (Backend) and Zen Sidecar on the **same private Docker network** (compose service name **`zen-sidecar`**).
- Sidecar has **no host ports** in PoC/prod v1 â€” only New API reaches it.
- Upstream mode v1: **Anonymous Zen** (`Bearer public` + expected client headers inside the Sidecar only). Zen keys are **not** stored in New API.

## Channel configuration (Admin)

Create or edit **one Channel** in the stock Admin UI:

| Field | Value |
|--------|--------|
| **Name** | e.g. `zen-sidecar-auto` |
| **Type** | OpenAI-compatible |
| **Base URL** | `http://zen-sidecar:8080` (stable compose DNS) |
| **Models** | `auto` (add specific Free Pool ids only for ops/debug) |
| **Key** | **Sidecar Credential** â€” shared secret the Sidecar validates. **Not** a Zen API key and not `public`. |
| **Model mapping** | `{}` / empty when Sidecar owns native `auto` (PoC overlays). PoC stock opencode2api may map `auto` â†’ a free id until long-term Sidecar (#17). |
| **Priority / weight** | As needed for routing; typically sole upstream for `auto`. |

PoC dev credential (compose only): `basedong-sidecar-dev-credential` â€” see `apps/zen-sidecar/config.poc.json`. **Rotate for production.**

### Sidecar Credential hygiene

- Generate a long random secret; store only in Channel.Key and Sidecar env/config.
- Never put Anonymous Zen `public` or operator Zen balance keys in Channel.Key.
- Never expose the Sidecar URL or credential to customers.

## RetryTimes (New API)

The Sidecar **owns retry and Free Pool model rotation**. For each Free Pool member it retries **429 / 5xx / transport errors** up to **`PER_MODEL_ATTEMPTS`** (default **20**), then moves to the next member. There is **no global attempt cap** beyond exhausting the candidate list (`len(pool) × PER_MODEL_ATTEMPTS` worst case). Non-429 `4xx` fails immediately without rotating.

| Setting | Guidance |
|---------|----------|
| **RetryTimes** (global option) | **`0`** (or at most **`1`**) for the Zen Sidecar Channel path |
| **PER_MODEL_ATTEMPTS** (Sidecar env) | Default **20**; mock retry overlay may use a smaller value for speed |
| Rationale | VIP clients should see **one success or one clear failure** from New API. Internal same-model retry + model rotation happens inside the Sidecar before the Relay returns. |
| Streaming | Sidecar rotates only **before any response body bytes**. No mid-stream model stitch. |

Do not rely on New API channel retry loops to simulate Free Pool rotation.

## Free Pool (Sidecar)

**Free Pool** = live Zen model ids eligible for **`auto`**:

1. **Catalog Sync** â€” fetch upstream `/v1/models` (or equivalent).
2. **Filter** â€” `catalog âˆ© (*-free âˆ¨ allowlist)` (e.g. allowlist `big-pickle`). Not a hardcoded fixed ops list.
3. **Probe** â€” cheap live check; drop dead candidates; re-admit on recovery.
4. **Cache** â€” if sync fails, keep the **last successful** pool; do not empty the pool.

Force sync (Sidecar with admin API): `POST /admin/sync` with `Authorization: Bearer <Sidecar Credential>`.

Health / pool snapshot (private): `GET /health` or `/healthz` on the Sidecar (`apps/zen-sidecar/sidecar.py`).

## Egress and quotas (v1)

| Topic | v1 behavior |
|--------|------------|
| **Egress** | **Single site IP** for Sidecar â†’ Zen traffic |
| **Quota bucket** | **Site-level** â€” Anonymous Zen free-tier limits apply to the Sidecar egress IP |
| **Not in scope** | Per-customer IP buckets, IP farms, or rotating proxies to beat upstream limits |

If the site IP is rate-limited, all `auto` customers share that bucket until the Sidecar rotates to another Free Pool member or returns a clear error.

## Verification (PoC probes)

From monorepo root (Git Bash on Windows):

```bash
# Spine + auto path
docker compose -f docker-compose.yml -f docker-compose.zen-sidecar.yml -p basedong-zen-spine up -d
bash apps/zen-sidecar/scripts/probe-spine.sh
bash apps/zen-sidecar/scripts/probe-auto-nonstream.sh
bash apps/zen-sidecar/scripts/probe-auto-stream.sh

# Overlays (mock Zen â€” deterministic)
bash apps/zen-sidecar/scripts/probe-auto-retry.sh          # #13
bash apps/zen-sidecar/scripts/probe-responses-southbound.sh # #14
bash apps/zen-sidecar/scripts/probe-catalog-sync.sh         # #15

# Full black-box contract (CI runs this)
bash apps/zen-sidecar/scripts/probe-blackbox.sh
```

## Staging rollout

Use [`staging-checklist.md`](./staging-checklist.md) after merge/deploy: Channel wiring, mock black-box probe, optional live smoke, customer disclosure.

## Live smoke (manual)

Real Anonymous Zen checks (not CI): [`live-smoke.md`](./live-smoke.md).

## Troubleshooting

| Symptom | Check |
|---------|--------|
| Relay 401 to Sidecar | Channel.Key matches Sidecar Credential |
| Relay 404 model `auto` | Channel.Models includes `auto`; ModelPrice includes `auto` |
| Always same upstream id | Free Pool size 1 or mapping bypasses Sidecar `auto` |
| Empty pool / 503 | Catalog sync + probe; confirm last cache retained on sync failure |
| Customer sees raw free ids only | Product should expose **`auto`**; direct ids are ops/debug |
| Consume log shows `auto` only | Relay reads `X-Basedong-Upstream-Model`; see [`upstream-model-logging.md`](./upstream-model-logging.md) |

## Related

- Sidecar README: [`apps/zen-sidecar/README.md`](../../apps/zen-sidecar/README.md)
- Backend operator notes: [`apps/api/docs/basedong.md`](../../apps/api/docs/basedong.md)
- Customer disclosure: [`customer-auto-disclosure.md`](./customer-auto-disclosure.md) (also in API docs)
- Upstream model in logs: [`upstream-model-logging.md`](./upstream-model-logging.md)
- Staging checklist: [`staging-checklist.md`](./staging-checklist.md)
- Live smoke: [`live-smoke.md`](./live-smoke.md)
