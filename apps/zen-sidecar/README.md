# Zen Sidecar

Thin upstream adapter in front of OpenCode Zen’s anonymous free tier. New API keeps a single Channel pointed here; customers never talk to this container.

**Implementation:** greenfield [`sidecar.py`](./sidecar.py) (#17) — Catalog Sync, Probe, `auto`, retry, chat↔responses conversion.

## Quick start

From repo root:

```bash
docker compose -f docker-compose.yml -f docker-compose.zen-sidecar.yml -p basedong-zen-spine up -d api zen-sidecar
bash apps/zen-sidecar/scripts/probe-spine.sh
bash apps/zen-sidecar/scripts/probe-auto-nonstream.sh
bash apps/zen-sidecar/scripts/probe-auto-stream.sh
```

Seed Channel + `ModelPrice` only (idempotent, no Relay traffic):

```bash
BASEDONG_API_BASE=http://localhost:3000 bash apps/zen-sidecar/scripts/seed-zen-channel.sh
```

Black-box contract (mock Zen, deterministic):

```bash
bash apps/zen-sidecar/scripts/probe-blackbox.sh
```

- **Service DNS (stable):** `zen-sidecar` → New API Channel `BaseURL` = `http://zen-sidecar:8080`
- **Sidecar Credential (Channel.Key):** `basedong-sidecar-dev-credential` (rotate in production)
- **Customer model:** `auto` — native Sidecar mapping; Channel `model_mapping` should be `{}`
- **Health:** `GET /health` or `/healthz`; private Free Pool snapshot in JSON
- **No host ports** on `zen-sidecar` — private compose network only
- **Upstream (default):** `https://opencode.ai/zen` (Sidecar appends `/v1/...`; Anonymous Zen inside Sidecar only)

## Mock overlays (regression)

```bash
docker compose -f docker-compose.yml -f docker-compose.zen-sidecar.yml \
  -f docker-compose.zen-mock.yml -f docker-compose.zen-retry.yml \
  -p basedong-zen-spine up -d --pull never --no-build
bash apps/zen-sidecar/scripts/probe-auto-retry.sh          # #13
bash apps/zen-sidecar/scripts/probe-responses-southbound.sh # #14 (+ zen-responses.yml)
bash apps/zen-sidecar/scripts/probe-catalog-sync.sh         # #15 (+ zen-catalog.yml)
```

Per-model retry (local mock, no Docker):

```bash
bash apps/zen-sidecar/scripts/check-per-model-retry.sh
```

Live `model=auto` capacity bench (Sidecar already up; outputs under `/tmp` + gitignored `scripts/bench-out/`):

```bash
bash apps/zen-sidecar/scripts/start-auto-bench.sh
BENCH_DIR=/tmp/zen-bench-auto bash apps/zen-sidecar/scripts/auto-bench-status.sh
bash apps/zen-sidecar/scripts/wait-auto-bench.sh
# or: python3 apps/zen-sidecar/scripts/bench-live-capacity.py
```

Legacy PoC reference: [`config.poc.json`](./config.poc.json) (opencode2api; superseded by `sidecar.py`).

## Operator & customer docs (#18)

- **Runbook:** [`docs/zen-sidecar/runbook.md`](../../docs/zen-sidecar/runbook.md)
- **Staging checklist:** [`docs/zen-sidecar/staging-checklist.md`](../../docs/zen-sidecar/staging-checklist.md)
- **Live smoke:** [`docs/zen-sidecar/live-smoke.md`](../../docs/zen-sidecar/live-smoke.md)
- **Customer disclosure:** [`docs/zen-sidecar/customer-auto-disclosure.md`](../../docs/zen-sidecar/customer-auto-disclosure.md) · [`/docs/api/ai-model/auto`](/docs/api/ai-model/auto)
- **PoC exit & decision:** [`docs/zen-sidecar/poc-exit.md`](../../docs/zen-sidecar/poc-exit.md)

See ADR 0004 and parent issue #9.
