# basedong Backend (`apps/api`)

This directory is the basedong **Backend**: an AGPL fork of [QuantumNous/new-api](https://github.com/QuantumNous/new-api), absorbed into the [basedong](https://github.com/BASEDONG/basedong) monorepo under `apps/api/`. Customer Console stays in `apps/web`; operators use the **stock Admin UI** served by this process (no brand skin).

## Remotes (monorepo root)

```text
origin            https://github.com/BASEDONG/basedong.git
upstream-new-api  https://github.com/QuantumNous/new-api.git
# Code root for this Backend: apps/api/
```

Confirm with `git remote -v` from the monorepo root. If `upstream-new-api` is missing:

```bash
git remote add upstream-new-api https://github.com/QuantumNous/new-api.git
```

## License (AGPL)

- Licensed under **AGPL-3.0** (see `LICENSE`, `NOTICE` in this directory).
- Offering this software as a **network service** (SaaS) requires providing complete corresponding source to users of that service under AGPL.
- Upstream `NOTICE` attribution terms apply when shipping modified upstream UI. basedong keeps Admin **unskinned**; still retain LICENSE/NOTICE and do not strip attribution from Admin.
- Commercial licensing may be evaluated later; until then treat AGPL as binding.

## Upstream merge cadence

**Preferred:** merge `upstream-new-api/main` into `apps/api/` at least **weekly**, and **within 7 days** of any upstream security fix that affects Relay, auth, or payment webhooks.

From the monorepo root:

```bash
git fetch upstream-new-api
git subtree pull --prefix=apps/api upstream-new-api main
# resolve conflicts with minimal fork drift — prefer upstream for relay/payment/auth cores
git push origin HEAD
```

Avoid deep forks of payment, Relay, and auth session code so merges stay cheap.

## Run locally

**Preferred for basedong (builds this fork’s source).** From the monorepo root:

```bash
docker compose up -d --build api
# Admin + API: http://localhost:3000  (container basedong-api)
```

Or from this directory (legacy compose names `new-api`):

```bash
docker compose -f docker-compose.dev.yml up -d --build
```

`docker compose -f docker-compose.yml up` inside `apps/api` pulls `calciumion/new-api:latest` and does **not** verify this fork’s tree — use it only as a quick upstream smoke, not as basedong acceptance.

Control-plane probe (Backend HTTP seam), from this directory:

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

EPay 充值 (compliance → configure EPay options → `POST /api/user/pay` → signed notify → 额度↑). Without a live merchant the probe MD5-signs `/api/user/epay/notify` with the configured `EpayKey` (same credit path as a real gateway):

```bash
BASEDONG_API_BASE=http://localhost:3000 ./scripts/probe-epay.sh
```

Ops: set `ServerAddress` to the basedong Web origin (EPay return → `/me/wallet`) and `CustomCallbackAddress` to this API origin (notify URL). Enable payment compliance and fill `PayAddress` / `EpayId` / `EpayKey` / `PayMethods` in Admin options.

Playground (session JWT → `/pg/chat/completions`, same billing as Relay). Requires a Channel for the model; Web Console uses this path so SPA does not need to paste an API Key. Probe also asserts `/api/log/self` consume rows for Console 调用记录:

```bash
BASEDONG_API_BASE=http://localhost:3000 MOCK_UPSTREAM=http://mock-openai:18080 ./scripts/probe-playground.sh
```

First Admin login uses upstream’s setup wizard on that same origin (stock Admin UI, no brand skin). Do not replace Admin with basedong Web.

## Relationship to basedong Web

| Surface | Owner |
|---------|--------|
| Customer Console / Auth UI | monorepo `apps/web` |
| Relay `/v1/*`, control-plane `/api/*`, Admin UI | monorepo `apps/api` |

Domain language for basedong product copy lives in `docs/backend/CONTEXT.md` (词元, API Key, 额度, …). Upstream source may still say “Token” for API credentials — map that to **API Key** in customer UI.

Point the Web SPA at this Backend with `NEXT_PUBLIC_API_BASE=http://localhost:3000` (see root `docker-compose.yml` `web-dev`).

## Zen Sidecar Channel (`auto`)

When offering model **`auto`** backed by Anonymous Zen free pool, operators attach **one Channel** to the private Sidecar — not a second control plane. Full runbook: [`docs/zen-sidecar/runbook.md`](../../docs/zen-sidecar/runbook.md).

| Item | Guidance |
|------|----------|
| Base URL | `http://zen-sidecar:8080` (stable compose DNS) |
| Models | `auto` |
| Channel.Key | **Sidecar Credential** (never Zen `public` / BYOK key) |
| RetryTimes | **0** (or at most 1) — Sidecar owns Free Pool retry |
| Egress v1 | Single site IP; shared free-tier quota bucket |

Customer disclosure: [`docs/zen-sidecar/customer-auto-disclosure.md`](../../docs/zen-sidecar/customer-auto-disclosure.md) · Web docs `/docs/api/ai-model/auto`.

### SPA session

Web calls control-plane with `NEXT_PUBLIC_API_BASE` and stores the short-lived **access** JWT in `sessionStorage` (`Authorization: Bearer`). Refresh cookies are `SameSite=Strict` on `/api/user/auth` — for silent refresh across reloads, serve Web and Backend on the **same site** (reverse proxy). Cross-origin SPAs should expect re-login when the access JWT expires (~15 minutes). `/api` applies CORS that reflects the request Origin so browser calls work.
