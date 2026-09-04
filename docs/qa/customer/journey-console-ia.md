# Customer journey: Console 交互对齐 (#59 / #68)

Single **product acceptance gate** for Console 交互对齐 ([ADR 0008](../../adr/0008-console-interaction-parity.md), parent [#59](https://github.com/BASEDONG/basedong/issues/59)). Engineering tickets #60–#67 may land as separate commits/PRs; **#59 is not done until this journey can PASS** against a real local Backend.

**Daily suite:** not required every day — run before declaring #59 complete, after Console parity PRs, or when Backend enablement flags change.

**Depends on:** Login session ([journey-login.md](./journey-login.md)); local Backend + Web.

## Environment

1. Backend: from monorepo root, `docker compose up -d --build api` → `BASE_API=http://localhost:3000` (see [`apps/api/docs/basedong.md`](../../../apps/api/docs/basedong.md)).
2. Web: `apps/web` with `NEXT_PUBLIC_API_BASE` → that API.
3. Sign in as a normal **用户** (`QA_USER_*` or manual account). Prefer an account that can exercise enabled gateways / check-in / OAuth only when those Backend flags are on; otherwise expect honest hide / empty / BLOCKED — not fake UI.

Outcome vocabulary: **PASS** / **FAIL** / **BLOCKED** / **SKIP** — same as [docs/qa/README.md](../README.md).

## Fixed IA + 下线页 (must stay true)

| Step | Action | Expect |
|------|--------|--------|
| IA-1 | After login, land on or open `/me/models` | **模型广场** is Console default landing |
| IA-2 | Inspect sidebar | Groups: **模型** / **在线体验** / **控制台** / **记录** / **个人**; under 在线体验 only **Chat**; no image/video/TTS product entries |
| IA-3 | Open `/me/bills` | Redirects to `/me/logs` |
| IA-4 | Open `/me/expensebill` | Redirects to `/me/wallet` |
| IA-5 | Open SiliconFlow-only routes (e.g. `/me/playground/image`, `/me/batches`, `/me/invoice` if linked) | Console **下线页** with CTA toward 模型广场 — not faked as upstream parity |

## 个人资料 (`/me/profile`) — #60 / #66

| Step | Action | Expect | Network (when enabled) |
|------|--------|--------|------------------------|
| P-1 | Open page | Header **账户概览**: 余额 / 累计用量 / 请求数 | `GET /api/user/self` |
| P-2 | Edit display name → save | Toast success; value persists after refresh | `PUT /api/user/self` |
| P-3 | Settings & preferences | Notify method + threshold / webhook / Bark / Gotify fields as applicable; save works | settings update on self |
| P-4 | Language preference | Change Preferred Locale; Console copy switches (Target Locale Set) | client-side locale — **not** Backend `language` |
| P-5 | Password | Change with current password | `PUT /api/user/self` (password fields) |
| P-6 | 2FA / Passkey / sessions | Setup/disable / register/remove / revoke others at journey parity | `/api/user/2fa/*`, `/api/user/passkey*`, `/api/user/sessions*` |
| P-7 | Access Token | Generate / regenerate; copy shown; regenerate invalidates prior | `GET /api/user/token` |
| P-8 | Check-in | **Visible only if** status `checkin_enabled`; otherwise absent | `GET/POST /api/user/checkin` |
| P-9 | Account bindings | Email / WeChat / Telegram / status-gated OAuth bind when enabled; custom unbind in linked-accounts | `/api/oauth/*`, `/api/user/oauth/bindings*` |
| P-10 | Delete account | Confirm username → account gone → redirected to login | `DELETE /api/user/self` — **SKIP** on shared QA accounts |

**PASS:** All enabled blocks operable; disabled capabilities hidden or honest empty — never fake success.  
**BLOCKED:** Provider/check-in not enabled in Backend (section correctly hidden).

## 钱包 (`/me/wallet`) — #61 / #67

| Step | Action | Expect | Network |
|------|--------|--------|---------|
| W-1 | Open page | Stats: 余额 / 历史消耗 / 请求次数 | `GET /api/user/self` |
| W-2 | Online 充值 | Every method from topup info appears (EPay / Stripe / Creem / Waffo / …); amount → confirm → pay redirect | `GET /api/user/topup/info`; amount/pay variants |
| W-3 | Return from pay tab | Focus/visibility refresh updates balance + history | `GET /api/user/self`, topup list |
| W-4 | Redeem | When `enable_redemption`; code credits 额度 | `POST` redeem path |
| W-5 | Order history | Search + pagination density | `GET /api/user/topup/self` |
| W-6 | Subscriptions | When plans or history exist: view plans, billing preference, purchase with allowed methods; **hidden** if none | `/api/subscription/plans`, `/self`, pay routes |
| W-7 | Affiliate | Invite link + pending/history/invites; transfer when pending > 0 and compliance confirmed | `GET /api/user/aff`, `POST /api/user/aff_transfer` |

**PASS:** Enabled gateways fully wired; disabled not shown; subscription/aff honest hide.  
**BLOCKED:** Payment compliance unconfirmed (expect no online methods / no transfer / empty plans) — not FAIL if UI matches truth.  
**Do not** assert real money credit in-browser; use HTTP probes for 入账 (below).

## 用量概览 (`/me/overview`) — #62

| Step | Action | Expect |
|------|--------|--------|
| O-1 | Open page | Self quota + `/api/data/self` / flow charts or ranks at operable density; filters work |
| O-2 | Empty Backend data | Honest empty — not a broken stub |

## API 密钥 (`/me/account/ak`) — #63

| Step | Action | Expect |
|------|--------|--------|
| K-1 | List / search / pagination | Rows from `/api/token/` |
| K-2 | Create (richer fields) | Success; row appears |
| K-3 | Rename / enable / disable / delete / batch | Upstream-comparable; reveal secret once |
| K-4 | Copy | Credentials labeled **API Key** (never Token) |

Also covered by [journey-api-key.md](./journey-api-key.md) for a shorter daily path.

## 记录 ×3 — #64

| Step | Action | Expect |
|------|--------|--------|
| L-1 | `/me/logs` | Filters + pagination; `/api/log/self` |
| L-2 | `/me/logs/drawing` | MJ self list or honest empty |
| L-3 | `/me/logs/tasks` | Task self list or honest empty |

## Chat 在线体验 (`/me/playground/chat`) — #65

| Step | Action | Expect |
|------|--------|--------|
| C-1 | Open page | Model + group selection |
| C-2 | Send a completion | Uses `/pg/chat/completions` session JWT — **not** a pasted API Key |
| C-3 | Usage | Bills against 用户 额度 when Channel exists |

Deep path: [journey-playground-chat.md](./journey-playground-chat.md). Image/TTS/Video remain 下线页 ([journey-playground-smoke.md](./journey-playground-smoke.md)).

## Chrome sanity

| Step | Action | Expect |
|------|--------|--------|
| CH-1 | Topbar 额度 | Matches `self` after wallet/profile refresh |
| CH-2 | Logout | Session cleared; login required for `/me/*` |
| CH-3 | Docs entry from Console chrome | Still reaches docs introduction |

## Optional Backend probes (reuse)

HTTP seams from `apps/api` — **complement** this UI gate; do not replace it:

| Probe | When to use |
|-------|-------------|
| `scripts/probe-status.sh` | Control plane up; status flags |
| `scripts/probe-auth.sh` | Register/login/self/token |
| `scripts/probe-epay.sh` | EPay notify → 额度 入账 (UI journey stops before real pay) |
| `scripts/probe-redeem.sh` | Compliance → create → redeem → quota↑ |
| `scripts/probe-playground.sh` | Playground session / completion seam |
| `scripts/probe-retail.sh` | Mock Channel + Relay deduct (compose seam overlay) |

Runbook: [`apps/api/docs/basedong.md`](../../../apps/api/docs/basedong.md). Related UI journeys: [journey-topup-epay.md](./journey-topup-epay.md), [journey-redeem.md](./journey-redeem.md).

## Locale / type gates

From `apps/web` after Console string changes:

```bash
npm run check:console-locales
npm run typecheck
```

Optionally `npm run check` for full Web gate before release.

**Record for this branch (`feat/web-console-polish`, 2026-09-04):** `check:console-locales` and `typecheck` passed after #60–#67 landings. Re-run before closing #59.

## Gate summary

**Run:** `feat/web-console-polish` · local Web `:3001` + API `:3000` · user `qaui` · 2026-09-04 (agent browser smoke).

| Area | Tickets | Result |
|------|---------|--------|
| Fixed IA + 下线页 | #40 keep | **PASS** — landing 模型广场; sidebar groups; `/me/bills`→logs, `/me/expensebill`→wallet; image/batches 下线页 |
| 个人资料 | #60 #66 | **PASS** (structure) — header/settings/language/password/AT/bindings/2FA/passkey/sessions/delete present; 签到 absent → **BLOCKED** (`checkin_enabled` off); mutations / delete **SKIP** on shared QA |
| 钱包 + subscription/aff | #61 #67 | **PASS** / **BLOCKED** — stats + history + aff link; no online pay (compliance); subscription hidden; redeem UI absent (`enable_redemption` off) → **BLOCKED** |
| 用量概览 | #62 | **PASS** — filters + honest empty |
| API 密钥 | #63 | **PASS** — list/search; create `gate-smoke-key` succeeded; **API Key** labeling |
| 记录 ×3 | #64 | **PASS** — filters + empty honest |
| Chat 在线体验 | #65 | **PASS** (open) — model/group/params; send completion **SKIP** (quota 0) |
| Chrome | — | **PASS** — topbar 额度; docs → `/docs/api`; logout → login and `/me` gated (cookie-only logout) |
| Locale/typecheck | — | **PASS** (earlier on branch) |
| Probes (as env allows) | — | **PASS** `probe-status` + `probe-auth`; redeem/epay/playground/retail **SKIP** (compliance / rate-limit / not needed for UI gate) |

**Follow-up found in smoke:** Console `logout()` sent Bearer/`X-Auth-Session` that could disagree with the refresh cookie SID; Backend then returned mismatch **without** `ClearRefreshCookie`, so `/api/user/auth/refresh` restored the session. Fixed: cookie-only `POST /api/user/auth/logout` in Web client.

Close **#68** when this document is the agreed gate and a human/agent run against local Backend fills the table without product FAIL. Close **#59** only after #68 PASSes.
