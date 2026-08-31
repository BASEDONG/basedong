# Zen Sidecar

Thin upstream adapter in front of OpenCode Zen’s anonymous free tier. New API keeps a single Channel pointed here; customers never talk to this container.

## PoC spine (#10)

From repo root:

```bash
docker compose -f docker-compose.yml -f docker-compose.zen-sidecar.yml up -d api zen-sidecar
bash apps/zen-sidecar/scripts/probe-spine.sh
```

- **Service DNS (stable):** `zen-sidecar` → New API Channel `BaseURL` = `http://zen-sidecar:8080`
- **Sidecar Credential (Channel.Key):** `basedong-sidecar-dev-credential` (see `config.poc.json`)
- **Health:** `GET /healthz` on the PoC image (opencode2api; stands in for issue `/health`)
- **No host ports** on `zen-sidecar` — private compose network only

See ADR 0004 and parent issue #9.
