# Journey: 额度可见

**Daily:** required  
**Depends on:** Login session ([journey-login.md](./journey-login.md))

## Goal

Prove remaining **额度** is not a fake UI-only number: at least one Console surface shows it, and `GET /api/user/self` returns matching `quota` / `used_quota`.

## Steps

### 1. Capture Network baseline

| | |
|--|--|
| **Action** | With Console open, trigger or observe `GET` `/api/user/self` (reload `/me/models` or open `/me/expensebill` if needed). |
| **UI expect** | Page loads without auth error. |
| **Network** | `GET /api/user/self` → **2xx**; JSON includes numeric **`quota`** and **`used_quota`**. Record `quota` as `Q`. |

### 2. Top bar label (primary UI)

| | |
|--|--|
| **Action** | On a Console page with the cloud top bar (e.g. `/me/models`), read the quota text. |
| **UI expect** | Visible text like **`额度 {Q}`** (same integer as Network `quota`, formatting without thousands separators unless the UI adds them — compare numeric value). |
| **Network** | Same `self` response; no second source of truth required. |

### 3. 充值 page balance tab (secondary UI)

| | |
|--|--|
| **Action** | Open `$BASE_WEB/me/expensebill`. |
| **UI expect** | Page title/area **充值**; balance/额度 summary shows a number consistent with `Q` (tab may label 额度). |
| **Network** | May refetch `GET /api/user/self` and/or `GET /api/user/topup/info` → 2xx. |

## Pass / fail

- **PASS:** `quota`/`used_quota` present on `self`, and at least one UI surface shows the same `quota` value.
- **FAIL:** UI shows a number that contradicts `self.quota`, or `self` omits quota fields while claiming a balance.
- **BLOCKED:** Session expired (re-run login).
