# Staging (Topology B) — invite-only beta

Invite-only staging for basedong: customer Web on Cloudflare Pages, Backend on an `api` subdomain. No production SLA. This is ops how-to, not a product ADR.

## Topology (locked)

| Host | Role |
|------|------|
| `https://app.example.com` | Customer Web (Cloudflare Pages → `apps/web` static `out/`) |
| `https://api.example.com` | Backend: control-plane `/api`, Relay `/v1`, Playground `/pg`, **stock Admin UI** at `/` |
| Docker network only | Optional `zen-sidecar:8080` — never publish host ports |

```text
Browser
  ├─ app.example.com  → Cloudflare Pages (Marketing / Auth / Console / Docs)
  └─ api.example.com  → Caddy → basedong-api :3000
                              ├─ postgres
                              ├─ redis
                              └─ zen-sidecar (optional, private)
```

Replace `example.com` with your staging domain. `app` and `api` must share the same registrable domain so Refresh Cookie stays **same-site**.

**Admin** is only on the `api` origin. Do not put customer Marketing and Admin on the same `/` path.

### Non-goals

- Topology A (same-origin Workers path proxy)
- Production SLA / public open registration without Turnstile + email OTP
- Live Cloudflare/VPS provisioning from this repo alone

## Session / cookie rules

Authoritative detail: [`apps/api/docs/authentication.md`](../../apps/api/docs/authentication.md). Product note: [`apps/api/docs/basedong.md`](../../apps/api/docs/basedong.md) (SPA session).

| Item | Staging value |
|------|----------------|
| Access JWT | ~15 minutes, **memory only**, `Authorization: Bearer` |
| Refresh Cookie | `new_api_refresh`, HttpOnly, `SameSite=Strict`, Path=`/api/user/auth` |
| `SESSION_COOKIE_SECURE` | **`true`** (HTTPS only; never `false` on the public internet) |
| `SESSION_COOKIE_TRUSTED_URL` | Exact HTTPS Web Origin, e.g. `https://app.example.com` (comma-separated if several) |
| Cross-site Web + API | Expect re-login every ~15 minutes — do not use unrelated `*.pages.dev` + `*.other-paas` pairs for beta UX |

`SESSION_COOKIE_TRUSTED_URL` is the refresh/logout Origin allowlist under Secure mode — not a CORS whitelist. CORS on `/api` already reflects the request Origin.

Do **not** set `FRONTEND_BASE_URL` on the API host: leave Admin SPA served at `api` `/`.

## Environment

Copy [`examples/env.staging.example`](./examples/env.staging.example) → a gitignored `.env.staging` (or host secret store). Example Caddy and compose overlay live under [`examples/`](./examples/).

### Backend (api container)

| Variable | Staging guidance |
|----------|------------------|
| `SQL_DSN` | Postgres DSN (do not expose DB to the public internet) |
| `REDIS_CONN_STRING` | Required for sane session/cache behavior |
| `SESSION_SECRET` | High-entropy random; shared across API nodes; rotating it invalidates all logins |
| `CRYPTO_SECRET` | High-entropy; required when using Redis; same value on all nodes sharing Redis |
| `SESSION_COOKIE_SECURE` | `true` |
| `SESSION_COOKIE_TRUSTED_URL` | `https://app.example.com` |
| `TRUSTED_PROXIES` | Proxy address/CIDR (e.g. `127.0.0.1/32` when Caddy is on the same host) |
| `TZ` | Operator preference (compose default often `Asia/Shanghai`) |

### Web (Cloudflare Pages **build** env)

| Variable | Staging guidance |
|----------|------------------|
| `NEXT_PUBLIC_API_BASE` | `https://api.example.com` (no trailing slash) |

Pages settings (also in [`apps/web/README.md`](../../apps/web/README.md)):

- Build command: `npm run build` (monorepo root or `apps/web`)
- Output directory: `apps/web/out`
- Node: 24+

### Admin system options (after first-run wizard)

| Option | Value |
|--------|--------|
| `ServerAddress` | `https://app.example.com` (EPay return → `/me/wallet`, customer-facing URLs) |
| `CustomCallbackAddress` | `https://api.example.com` (payment notify URL) |
| Email verification + Turnstile | Enable before open registration (ADR 0002) |
| SMTP / Turnstile keys | Required for register OTP + bot checks |
| EPay (optional) | Only if testing top-up; QA journeys need not assert real credit |
| Channel + catalog tags | Model plaza / Relay; `bs*` control tags per basedong Backend docs |
| Zen Sidecar Channel | Base URL `http://zen-sidecar:8080`, Models `auto`, Key = `SIDECAR_KEY`, RetryTimes `0` |

Sidecar rollout: [`docs/zen-sidecar/staging-checklist.md`](../zen-sidecar/staging-checklist.md). Customer disclosure: [`docs/zen-sidecar/customer-auto-disclosure.md`](../zen-sidecar/customer-auto-disclosure.md).

## Bring-up

### API host (VPS)

1. DNS: `api.example.com` → VPS; install Caddy using [`examples/Caddyfile.staging`](./examples/Caddyfile.staging).
2. From monorepo root, with secrets in `.env.staging`:

```bash
docker compose --env-file .env.staging \
  -f docker-compose.yml \
  -f docs/ops/examples/docker-compose.staging.yml \
  up -d --build api redis postgres
```

3. Optional Sidecar (private network): merge [`docker-compose.zen-sidecar.yml`](../../docker-compose.zen-sidecar.yml). That overlay ships a **dev** `SIDECAR_KEY`; before shared staging, change it (and the Admin Channel.Key) to a production secret — never leave `basedong-sidecar-dev-credential`.

```bash
docker compose --env-file .env.staging \
  -f docker-compose.yml \
  -f docs/ops/examples/docker-compose.staging.yml \
  -f docker-compose.zen-sidecar.yml \
  up -d --build api redis postgres zen-sidecar
```

4. Open `https://api.example.com` and complete the stock Admin setup wizard.

### Web (Cloudflare Pages)

1. Set build env `NEXT_PUBLIC_API_BASE=https://api.example.com`.
2. Deploy `apps/web/out`; attach custom domain `app.example.com`.

## Day-0 checklist (before invites)

- [ ] DNS + TLS for `app` and `api`
- [ ] Postgres volume + backup plan
- [ ] `SESSION_SECRET` / `CRYPTO_SECRET` set (not defaults)
- [ ] `SESSION_COOKIE_SECURE=true` and Trusted URL = Web Origin
- [ ] API + redis + postgres up; optional Sidecar without host ports
- [ ] Admin first-run wizard done
- [ ] SMTP + Turnstile configured; **registration closed** or invite/manual accounts only
- [ ] At least one Channel (paid/mock and/or Sidecar `auto`)
- [ ] Pages build published with correct `NEXT_PUBLIC_API_BASE`
- [ ] AGPL: link to complete corresponding source for network users

## Day-1 checklist (open invites)

- [ ] `GET https://api.example.com/api/status` → HTTP 200, JSON `"success": true`
- [ ] Login on `app` → hard refresh still signed in (refresh cookie path)
- [ ] Optional HTTP probes against staging API (`apps/api/docs/basedong.md`: `probe-status`, `probe-auth`, …)
- [ ] UI journeys: [`docs/qa/README.md`](../qa/README.md) with `BASE_WEB` / `BASE_API` pointing at staging
- [ ] Invite a small cohort; log: login, refresh, 额度, API Key, one real completion
- [ ] Only then consider open registration / EPay / `auto`

Console **交互对齐** (#59) gate: [`docs/qa/customer/journey-console-ia.md`](../qa/customer/journey-console-ia.md). Staging can proceed without closing #59; do not claim full parity until that journey PASSes.

## Smoke tests

```bash
# Control plane
curl -sS "https://api.example.com/api/status"

# After creating a customer API Key in Console:
curl -sS "https://api.example.com/v1/models" \
  -H "Authorization: Bearer sk-..."
```

Browser:

1. Sign in on `https://app.example.com`
2. DevTools → cookie on `api` host: `new_api_refresh`, Path `/api/user/auth`
3. Hard refresh → still in Console
4. Create API Key → Relay call as above
5. Optional: Admin redemption code → Web wallet redeem

## Failure quick reference

| Symptom | Check first |
|---------|-------------|
| Re-login every ~15 minutes | Cross-site origins; missing/wrong `SESSION_COOKIE_TRUSTED_URL` |
| refresh fails / 403 | `SESSION_COOKIE_SECURE=true`; Trusted URL exact HTTPS Origin (no path/wildcard) |
| Cookie present but not sent | Request must hit Path `/api/user/auth/*` on the API host |
| Payment return wrong host | `ServerAddress` (app) vs `CustomCallbackAddress` (api) |
| Admin opens as customer site | Accidental `FRONTEND_BASE_URL` or proxy sending `/` to Pages |
| `auto` sustained 503 | Sidecar health, Channel BaseURL/key, egress IP / free-pool limits |

## Beta expectations

- Invite-only or tightly gated registration; no SLA
- Some SiliconFlow-heritage Console routes are intentional **下线页**
- `auto` (if enabled) uses Anonymous Zen free pool — see customer disclosure; unfit for confidential data
- Backend is AGPL-3.0: offering as a network service requires providing complete corresponding source to users of that service
