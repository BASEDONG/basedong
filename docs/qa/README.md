# Black-box integration journeys (Web → Backend)

Cursor-agent-first checklists for end-to-end flows across customer **Web** (`apps/web`) and **Backend** (`apps/api`, including stock **Admin** UI). Humans may follow the same steps.

## Rules for the executor

1. **Do not** read application source or the database to decide pass/fail.
2. **Do** drive the browser UI by visible labels, roles, and URLs.
3. **Do** inspect Network for critical steps: HTTP method, path pattern, status, and key JSON fields (not full schema lock-in).
4. Prefer intent (“click **登录**”) over CSS selectors; UI copy may drift with clone/upstream updates.
5. Admin sidebar labels: use the **visible menu title** (e.g. **Redemption Codes**); upstream i18n may change wording.
6. Evidence: report pass/fail in the chat. On **failure only**, write a short run log (date, `BASE_WEB`/`BASE_API`, anonymized account, step ✅/❌, Network summary).

### Outcome vocabulary

| Result | Meaning |
|--------|---------|
| **PASS** | Steps and assertions met |
| **FAIL** | Product/integration defect under test |
| **BLOCKED** | Environment/upstream dependency missing (not counted as product FAIL) |
| **SKIP** | Explicit dependency missing (e.g. no `QA_REDEEM_CODE` and Admin journey not run) |

## Environment

1. Copy [`.env.qa.example`](./.env.qa.example) → `docs/qa/.env.qa.local` (gitignored) and fill values, **or** export the same variable names in the shell.
2. **Local compose (typical):**
   - Backend + Admin: `docker compose up -d --build api` from monorepo root → `BASE_API=http://localhost:3000`
   - Web: run `apps/web` dev/server → set `BASE_WEB` accordingly
   - Optional HTTP seams first: see [`apps/api/docs/basedong.md`](../../apps/api/docs/basedong.md) (`probe-status`, `probe-auth`, …). Not required before UI journeys.
3. **Remote:** set `BASE_WEB` / `BASE_API` to staging origins; inject `QA_USER_*` / `QA_ADMIN_*` (and optional `QA_REDEEM_CODE`).

Journey **steps and assertions are shared**; only the prerequisite section differs between local and remote.

## Glossary (product language)

| Term | Meaning |
|------|---------|
| **用户** | Customer account (Web login) |
| **管理员** | Operator using stock Admin UI on `BASE_API` |
| **Console** | Customer control plane under `/me/*` — not Admin |
| **额度** | Remaining usage budget; Network: `GET /api/user/self` → `quota`, `used_quota` |
| **API Key** | Relay credential; never call it Token in basedong UI copy |
| **兑换码** | Admin-issued code; customer redeems on `/me/expensebill` |

## Recommended daily suite order

Run in order when doing a full narrative pass:

1. [`customer/journey-login.md`](./customer/journey-login.md)
2. [`customer/journey-quota-visible.md`](./customer/journey-quota-visible.md)
3. [`customer/journey-api-key.md`](./customer/journey-api-key.md)
4. [`customer/journey-playground-chat.md`](./customer/journey-playground-chat.md)
5. [`customer/journey-playground-smoke.md`](./customer/journey-playground-smoke.md)
6. [`customer/journey-topup-epay.md`](./customer/journey-topup-epay.md)
7. [`admin/journey-admin-redemption-issue.md`](./admin/journey-admin-redemption-issue.md) *(optional if `QA_REDEEM_CODE` already set)*
8. [`customer/journey-redeem.md`](./customer/journey-redeem.md)

Single-file debug: honor each file’s **Depends on** edge; re-login if the session expired.

## Journey index

| File | Role | Daily | Depends on |
|------|------|-------|------------|
| [customer/journey-login.md](./customer/journey-login.md) | 用户 login → Console | Required | `QA_USER_*`, bases |
| [customer/journey-quota-visible.md](./customer/journey-quota-visible.md) | 额度 UI + `self` | Required | Login session |
| [customer/journey-api-key.md](./customer/journey-api-key.md) | API Key create/list/reveal | Required | Login session |
| [customer/journey-playground-chat.md](./customer/journey-playground-chat.md) | Chat Playground deep | Required | Login; Channel for model |
| [customer/journey-playground-smoke.md](./customer/journey-playground-smoke.md) | Image/TTS/Video pages | Required | Login |
| [customer/journey-topup-epay.md](./customer/journey-topup-epay.md) | 充值 to pay redirect | Required | Login; EPay configured or expect disabled UI |
| [admin/journey-admin-redemption-issue.md](./admin/journey-admin-redemption-issue.md) | 管理员 create 兑换码 | Required* | `QA_ADMIN_*` |
| [customer/journey-redeem.md](./customer/journey-redeem.md) | Redeem + invalid code | Required | Login; code from Admin journey or `QA_REDEEM_CODE` |
| [appendix/register-manual-otp.md](./appendix/register-manual-otp.md) | Register (OTP) | Appendix only | `manual-otp` — not in daily suite |

\* Skip Admin journey when redeem success uses a pre-injected `QA_REDEEM_CODE`.

## Alignment with HTTP probes

Daily UI journeys stand alone. For 充值 **入账** and redeem **额度↑** at the HTTP seam, see:

- `apps/api/scripts/probe-epay.sh` — signs notify; UI journey **stops before payment / does not assert credit**
- `apps/api/scripts/probe-redeem.sh` — compliance → create → redeem → quota↑

Runbook: [`apps/api/docs/basedong.md`](../../apps/api/docs/basedong.md).

## V1 non-goals

- Automated real email OTP registration
- Completing real EPay payment or asserting top-up credit in the browser journey
- Marketing-zone breadth
- Replacing HTTP probes as the only acceptance gate
