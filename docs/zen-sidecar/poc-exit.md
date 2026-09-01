# Zen Sidecar PoC — exit gates & implementation decision

Parent spec: [GitHub #9](https://github.com/BASEDONG/basedong/issues/9). ADR: [0004](../adr/0004-zen-sidecar-anonymous-free-pool.md).

## Exit gates (all green)

| Gate | Evidence | Probe / commit |
|------|----------|----------------|
| Successive `auto` calls show real upstream models varying within **Free Pool** | Sidecar picks from live pool; response `model` = upstream id | `probe-auto-nonstream.sh`, `probe-catalog-sync.sh` · #11, #15 |
| Forced 429/5xx → pre-body model switch or clear exhausted failure | Sidecar-internal rotation; New API `RetryTimes=0` | `probe-auto-retry.sh` · #13 `21d6a780` |
| **Responses-southbound** free model via northbound chat | `muse-spark-free` chat→responses→chat | `probe-responses-southbound.sh` · #14 `1b5a3108` |
| Bad/missing **Sidecar Credential** rejected | 401 on Sidecar; wrong Channel.Key fails | `probe-spine.sh`, `probe-auto-nonstream.sh` · #10 |
| Free-list change → **Free Pool** within one sync cycle | Mock catalog mutate + `POST /admin/sync` | `probe-catalog-sync.sh` · #15 `0096b2ed` |
| SSE `stream: true` on `auto` | `[DONE]`, single upstream in body | `probe-auto-stream.sh` · #12 |

Re-run full PoC stack (Git Bash, from repo root):

```bash
docker compose -f docker-compose.yml -f docker-compose.zen-sidecar.yml -p basedong-zen-spine up -d
bash apps/zen-sidecar/scripts/probe-spine.sh
bash apps/zen-sidecar/scripts/probe-auto-nonstream.sh
bash apps/zen-sidecar/scripts/probe-auto-stream.sh

docker compose -f docker-compose.yml -f docker-compose.zen-sidecar.yml \
  -f docker-compose.zen-retry.yml -f docker-compose.zen-responses.yml \
  -f docker-compose.zen-catalog.yml -p basedong-zen-spine up -d --pull never --no-build
bash apps/zen-sidecar/scripts/probe-auto-retry.sh
bash apps/zen-sidecar/scripts/probe-responses-southbound.sh
bash apps/zen-sidecar/scripts/probe-catalog-sync.sh
```

## Decision: greenfield thin Sidecar (not slim-fork opencode2api)

**Chosen path:** **Greenfield** — evolve the PoC Python Sidecar modules into the long-term implementation (#17), keeping the **same compose service name** `zen-sidecar` and Channel `BaseURL` `http://zen-sidecar:8080`.

**Not chosen:** Slim-fork of [opencode2api](https://github.com/jasonxu114514/opencode2api).

### Rationale

| Criterion | opencode2api slim-fork | Greenfield (PoC → prod Sidecar) |
|-----------|------------------------|----------------------------------|
| Scope fit | Full gateway + WebUI + key/proxy pools — most surface unused | Matches CPA-like thin adapter in ADR |
| **Free Pool** model rotation | Retries keys/proxies, not pool members (#13 finding) | Implemented in `auto-retry.py` / `catalog_pool.py` |
| **Catalog Sync + Probe** | Partial via models.dev; not our filter+probe contract | Explicit in `catalog_pool.py` (#15) |
| **Chat ↔ responses** split | Present but bundled with other concerns | Explicit conversion layer (#14) |
| AGPL / narrative | Heavy fork of upstream Go project | Small owned codebase beside `apps/api` |
| PoC spine | Used stock image for #10–#12 ✓ | Same HTTP contract; replace image behind stable DNS |

### Preserve for #17

- Compose service name: **`zen-sidecar`**
- Northbound: `POST /v1/chat/completions`, Sidecar Credential, `/health` (PoC: `/healthz`)
- Anonymous Zen southbound inside container only
- Black-box tests against mock Zen (existing probes + consolidation)

### Deprecate after #17

- PoC overlay compose files remain for regression until long-term Sidecar passes the same probes
- Stock `ghcr.io/jasonxu114514/opencode2api` as default `zen-sidecar` image

## Related docs

- Operator runbook: [`runbook.md`](./runbook.md)
- Customer disclosure: [`customer-auto-disclosure.md`](./customer-auto-disclosure.md)
- Sidecar README: [`../../apps/zen-sidecar/README.md`](../../apps/zen-sidecar/README.md)
