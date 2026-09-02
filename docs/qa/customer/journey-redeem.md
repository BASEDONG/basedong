# Journey: 兑换码 (customer redeem)

**Daily:** required  
**Depends on:** Login session; **unused** code from [admin/journey-admin-redemption-issue.md](../admin/journey-admin-redemption-issue.md) **or** `QA_REDEEM_CODE`

## Goal

1. Negative: invalid code fails clearly.  
2. Positive: valid code credits 额度 (`POST /api/user/topup` returns quota **delta**).

## Steps

### 1. Open 兑换中心

| | |
|--|--|
| **Action** | Open `$BASE_WEB/me/expensebill`. Use **兑换中心** / coupon tab if needed (`?tab=coupon` when applicable). |
| **UI expect** | **兑换码** input (**请输入管理员发放的兑换码**); **兑换** button. |
| **Network** | Soft: `self` / `topup/info` 2xx. |

### 2. Negative — invalid code

| | |
|--|--|
| **Action** | Enter a nonsense code (e.g. `invalid-qa-code-000`). Click **兑换**. |
| **UI expect** | Failure feedback (**兑换失败，请检查兑换码是否有效** or equivalent). No success toast with +额度. |
| **Network** | `POST /api/user/topup` with `{ "key": "…" }` → not a successful credit (4xx or success:false / error message). |

### 3. Positive — valid code

| | |
|--|--|
| **Action** | Note `quota` from `GET /api/user/self` as `Q0`. Enter `QA_REDEEM_CODE` or the code produced by the Admin journey. Click **兑换**. |
| **UI expect** | Success like **兑换成功，额度 +{N}**. |
| **Network** | `POST /api/user/topup` → success; **`data`** is numeric delta `N` (credited 额度, **not** new balance). Then `GET /api/user/self` → `quota` ≈ `Q0 + N`. |

If no code available: **SKIP** positive path; still run negative path.

## Pass / fail

- **PASS:** Invalid code rejected; valid code (when provided) credits `quota` by `N`.
- **FAIL:** Invalid code appears to succeed; or valid code succeeds in UI but `self.quota` unchanged / `data` missing.
- **SKIP:** Positive path only, when neither Admin output nor `QA_REDEEM_CODE` exists.
- **BLOCKED:** Session expired; or redemption disabled pending payment compliance (Admin must confirm — see Admin journey).

## Probe alignment

| UI journey | `probe-redeem.sh` |
|------------|-------------------|
| Uses Web 兑换中心 | HTTP-only register/login + admin create + redeem |
| Invalid code case | Also covers invalid / already-used |
| Needs injected or Admin-UI code | Creates code via `POST /api/redemption/` as root |
