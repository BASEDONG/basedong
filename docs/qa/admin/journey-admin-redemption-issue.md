# Journey: 管理员 issue 兑换码

**Daily:** required when customer redeem success needs a fresh code (else skip if `QA_REDEEM_CODE` set)  
**Depends on:** `BASE_API`, `QA_ADMIN_USER`, `QA_ADMIN_PASSWORD`  
**Produces:** one unused redemption **key** for [customer/journey-redeem.md](../customer/journey-redeem.md)

Admin is the **stock new-api Admin UI** on `BASE_API` (not Web Console). Sidebar titles: use **visible** English (or current i18n) names.

## Prerequisites

- Backend up; admin account can sign in (local first-run may use setup wizard — out of scope here if already provisioned).
- Tags: steps marked **`admin-api-ok`** may be done via Network/API when the UI path is hard to find; still no DB access.

## Steps

### 1. Open Admin and sign in

| | |
|--|--|
| **Action** | Open `$BASE_API/` (Admin SPA). Sign in with `QA_ADMIN_USER` / `QA_ADMIN_PASSWORD`. |
| **UI expect** | Authenticated Admin shell with sidebar. |
| **Network** | `POST /api/user/login` (or Admin’s login path) → 2xx + token. |

### 2. Payment compliance (`admin-api-ok` allowed)

Redemption create may require payment compliance confirmed.

| | |
|--|--|
| **Action** | Prefer Admin UI option if obviously labeled. Otherwise: `POST /api/option/payment_compliance` with body `{"confirmed":true}` and Admin Bearer token. |
| **UI expect** | If UI used: confirmation saved. |
| **Network** | `POST /api/option/payment_compliance` → success. Tag: **`admin-api-ok`**. |

### 3. Open Redemption Codes

| | |
|--|--|
| **Action** | Sidebar → **Redemption Codes** → `$BASE_API/redemption-codes` (legacy `/console/redemption` may redirect). |
| **UI expect** | List of codes; primary control to create. |
| **Network** | List fetch under `/api/redemption/` → 2xx. |

### 4. Create a code

| | |
|--|--|
| **Action** | Open create drawer/dialog. Fill name (e.g. `qa-ui`), quota amount per form, count `1`, expiry as “never” / 0 if offered. Submit. |
| **UI expect** | Success; new key(s) shown or listed as unused. **Copy the key** into the agent notes / `QA_REDEEM_CODE` for the customer journey. |
| **Network** | `POST /api/redemption/` → success; `data` is an array of key strings; take the first. |

## Pass / fail

- **PASS:** Compliance OK (or already confirmed) + create returns at least one key.
- **FAIL:** Authenticated admin cannot create when compliance is confirmed; or UI success without `POST /api/redemption/` success.
- **BLOCKED:** Admin credentials invalid; Backend down.

## Probe alignment

Mirrors the admin half of `probe-redeem.sh` (compliance → `POST /api/redemption/`), via UI (+ allowed `admin-api-ok` for compliance).
