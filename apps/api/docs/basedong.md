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

## Model catalog tags (Web contract)

Customer Marketing + Console model plaza read model metadata from `GET /api/pricing` (`tags` on each pricing row, from Admin **Models** metadata). Web does **not** invent modality/context from freeform English words like `Vision` or `image`.

管理员 must set **Catalog Control Tags** (canonical `bs*` tokens) via the Model edit drawer (**Modality** / **Context window** / **Multimodal**). Display strings are mapped only on Web. Freeform tags are not part of the contract — save keeps only control tokens.

### Required / preferred control tags

| Purpose | Token (write exactly; case-insensitive) | Customer effect |
|---------|----------------------------------------|-----------------|
| Modality — text / chat | `bsText` | Plaza type **文本** (default if no modality tag) |
| Modality — image generation | `bsImage` | Plaza type **图像** |
| Modality — video generation | `bsVideo` | Plaza type **视频** |
| Modality — audio generation | `bsAudio` | Plaza type **语音** |
| Context window | `bsCtx{n}` (n = thousands of tokens; any positive integer, e.g. `bsCtx127`, `bsCtx1000`) | Web formats as **127K** / **1M**; plaza filters use numeric thresholds (e.g. ≥128K) — not a closed write enum. |
| Capability — multimodal | `bsCapMultimodal` | Differentiating chip / filter (**多模态**). Understanding image and/or audio input — not generation modality. |

Rules:

- At most **one** modality control tag and **one** context control tag per model (Admin UI enforces this on save).
- Context is a **numeric** control tag: Admin enters thousands of tokens → `bsCtx{n}`; display symbols (`K`/`M`) are formatted on Web and need not be translated.
- **Multimodal** is a single optional differentiator. Reasoning / tools are assumed default and are **not** catalog tags.
- Prefer media over text if several modality tags somehow coexist (`bsImage` / `bsVideo` / `bsAudio` win over `bsText`).
- Control tags are **not** shown raw as customer chips; Web maps them to display labels / canonical keys.
- Do **not** store freeform marketing words (`轻量`, `旗舰`, `Reasoning`) in `tags`. Description is for prose.
- Legacy dual-read (migration only): old `bsCtx128k` / `bsCtx1m` and freeform `128K` / `1M` parse to the same numeric K; Admin save rewrites to `bsCtx{n}`. Former `Vision` / `Audio` / `bsCapVision` / `bsCapAudio` map to multimodal. Retired capability tokens are dropped on Admin save.
- `bsCapMultimodal` means **understanding** multimodal input — use `bsImage` / `bsAudio` for generation product type.

### Where to configure

Admin → **Models** (metadata) → edit model → **Modality** + **Context window** + **Multimodal**.

Web parsers: `apps/web/src/lib/backend/model-tags.ts`. Admin helpers: `apps/api/web/src/features/models/lib/model-utils.ts`.

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

Web calls control-plane with `NEXT_PUBLIC_API_BASE`. The short-lived **access** JWT lives in **memory only** (upstream new-api Admin UI pattern — not `sessionStorage`), sent as `Authorization: Bearer`. After reload, Web attempts `POST /api/user/auth/refresh` using the HttpOnly Refresh Cookie (`SameSite=Strict` on `/api/user/auth`). Silent restore needs Web and Backend on the **same site** (reverse proxy). Cross-origin SPAs should expect re-login when the access JWT expires (~15 minutes) unless a same-site proxy is used. Public optional-auth routes such as `GET /api/pricing` fall back to anonymous (no Bearer) when refresh cannot restore a session. `/api` applies CORS that reflects the request Origin so browser calls work.
