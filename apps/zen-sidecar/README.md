# Zen Sidecar

Thin upstream adapter in front of OpenCode Zen’s anonymous free tier. New API keeps a single Channel pointed here; customers never talk to this container.

## PoC spine (#10) + auto path (#11–#12)

From repo root:

```bash
docker compose -f docker-compose.yml -f docker-compose.zen-sidecar.yml up -d api zen-sidecar
bash apps/zen-sidecar/scripts/probe-spine.sh
bash apps/zen-sidecar/scripts/probe-auto-nonstream.sh
bash apps/zen-sidecar/scripts/probe-auto-stream.sh
```

- **Service DNS (stable):** `zen-sidecar` → New API Channel `BaseURL` = `http://zen-sidecar:8080`
- **Sidecar Credential (Channel.Key):** `basedong-sidecar-dev-credential` (see `config.poc.json`)
- **Customer model:** `auto` (PoC maps via Channel `model_mapping` to a Free Pool id such as `big-pickle` until native Sidecar `auto` in #17)
- **Health:** `GET /healthz` on the PoC image (opencode2api; stands in for issue `/health`)
- **No host ports** on `zen-sidecar` — private compose network only

## Retry / Free Pool rotation (#13)

Stock opencode2api retries keys/proxies, not Free Pool models. This overlay swaps in a thin Node Sidecar + mock Zen so rotation is deterministic:

```bash
docker compose -f docker-compose.yml -f docker-compose.zen-sidecar.yml \
  -f docker-compose.zen-retry.yml -p basedong-zen-spine up -d
bash apps/zen-sidecar/scripts/probe-auto-retry.sh
```

- `PICK_ORDER=fail-free,ok-free` — first member 429s; Sidecar rotates before answering
- New API `RetryTimes=0`; Channel sends literal `auto` (empty `model_mapping`)
- Stream: rotation only before any body bytes (no mid-stream stitch)
- PoC sources: `apps/zen-sidecar/poc/{mock_zen.py,auto-retry.py}`

See ADR 0004 and parent issue #9.
