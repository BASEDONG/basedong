# basedong-api (basedong Backend)

This repository is the basedong **Backend**: an AGPL fork of [QuantumNous/new-api](https://github.com/QuantumNous/new-api). Customer Console stays in the [basedong](https://github.com/BASEDONG/basedong) Web app; operators use the **stock Admin UI** here (no brand skin).

## Remotes

```text
origin    https://github.com/BASEDONG/basedong-api.git
upstream  https://github.com/QuantumNous/new-api.git
```

Confirm with `git remote -v`. If `upstream` is missing:

```bash
git remote add upstream https://github.com/QuantumNous/new-api.git
```

## License (AGPL)

- Licensed under **AGPL-3.0** (see `LICENSE`, `NOTICE`).
- Offering this software as a **network service** (SaaS) requires providing complete corresponding source to users of that service under AGPL.
- Upstream `NOTICE` attribution terms apply when shipping modified upstream UI. basedong keeps Admin **unskinned**; still retain LICENSE/NOTICE and do not strip attribution from Admin.
- Commercial licensing may be evaluated later; until then treat AGPL as binding.

## Upstream merge cadence

**Preferred:** merge `upstream/main` into `main` at least **weekly**, and **within 7 days** of any upstream security fix that affects Relay, auth, or payment webhooks.

```bash
git fetch upstream
git checkout main
git merge upstream/main
# resolve conflicts with minimal fork drift — prefer upstream for relay/payment/auth cores
git push origin main
```

Avoid deep forks of payment, Relay, and auth session code so merges stay cheap.

## Run locally

**Preferred for basedong (builds this fork’s source):**

```bash
docker compose -f docker-compose.dev.yml up -d --build
# Admin + API: http://localhost:3000  (container new-api-dev)
```

`docker compose up -d` (default `docker-compose.yml`) pulls `calciumion/new-api:latest` and does **not** verify this fork’s tree — use it only as a quick upstream smoke, not as basedong-api acceptance.

Control-plane probe (Backend HTTP seam):

```bash
./scripts/probe-status.sh http://localhost:3000
# Windows: powershell -File scripts/probe-status.ps1 http://localhost:3000
```

Expect HTTP 200 and JSON `"success": true` from `GET /api/status`.

Auth + API Key (register/login/self/token):

```bash
BASEDONG_API_BASE=http://localhost:3000 ./scripts/probe-auth.sh
```

Retail loop (mock Channel + Relay + 额度 deduct + negative paths). Use the seam overlay so the mock OpenAI upstream shares the Docker network and quota updates are synchronous:

```bash
docker compose -f docker-compose.dev.yml -f docker-compose.seam.yml up -d --build
BASEDONG_API_BASE=http://localhost:3000 MOCK_UPSTREAM=http://mock-openai:18080 ./scripts/probe-retail.sh
```

Redemption codes (compliance → Admin create → user redeem → 额度↑):

```bash
BASEDONG_API_BASE=http://localhost:3000 ./scripts/probe-redeem.sh
```

First Admin login uses upstream’s setup wizard on that same origin (stock Admin UI, no brand skin). Do not replace Admin with basedong Web.

## Relationship to basedong Web

| Surface | Owner |
|---------|--------|
| Customer Console / Auth UI | basedong `apps/web` |
| Relay `/v1/*`, control-plane `/api/*`, Admin UI | this repo |

Domain language for basedong product copy lives in basedong’s `docs/backend/CONTEXT.md` (词元, API Key, 额度, …). Upstream source may still say “Token” for API credentials — map that to **API Key** in customer UI.

### SPA session (issue #3)

Web calls control-plane with `NEXT_PUBLIC_API_BASE` and stores the short-lived **access** JWT in `sessionStorage` (`Authorization: Bearer`). Refresh cookies are `SameSite=Strict` on `/api/user/auth` — for silent refresh across reloads, serve Web and Backend on the **same site** (reverse proxy). Cross-origin SPAs should expect re-login when the access JWT expires (~15 minutes). `/api` applies CORS that reflects the request Origin so browser calls work.
