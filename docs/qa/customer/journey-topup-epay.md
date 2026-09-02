# Journey: 充值 (EPay) — stop at payment redirect

**Daily:** required  
**Depends on:** Login session  
**Does not:** complete payment or assert 额度 increase (see `probe-epay.sh` for HTTP credit path)

## Goal

**用户** can open 充值, and when online top-up is enabled, `POST /api/user/pay` succeeds and the browser is handed a payment form / gateway URL.

## Steps

### 1. Open 充值

| | |
|--|--|
| **Action** | Open `$BASE_WEB/me/expensebill`. |
| **UI expect** | Page **充值**; sections for **在线充值** and/or messaging if disabled. |
| **Network** | `GET /api/user/topup/info` → 2xx. Note `enable_online_topup` / pay methods / compliance flags if present. |

### 2. Branch: online top-up disabled

| | |
|--|--|
| **Action** | If UI shows that 在线充值 is not opened (admin must confirm compliance + configure EPay), stop here. |
| **UI expect** | Clear disabled/empty state (copy may mention 支付合规 / 易支付). |
| **Network** | `topup/info` reflects disabled — **PASS** for “page + honest empty state”. Do not FAIL for missing merchant config. |

### 3. Branch: online top-up enabled — request pay

| | |
|--|--|
| **Action** | On **在线充值**, set **支付金额** / **支付方式** (e.g. 支付宝 / 微信 as offered). Accept agreement checkbox if required. Click **确认支付**. |
| **UI expect** | **跳转支付中…** or new window/tab / navigation toward the payment gateway; or a hidden form POST to the gateway URL. |
| **Network** | `POST /api/user/pay` with amount + payment method → **2xx** / success; response includes gateway `url` and params (or equivalent) used to submit the payment form. |

### 4. Stop — do not pay

| | |
|--|--|
| **Action** | Do **not** complete real payment. Do **not** assert `quota` increase. |
| **UI expect** | Gateway page or form hand-off is enough. |
| **Network** | No requirement to call `/api/user/epay/notify`. |

## Pass / fail

- **PASS:** (disabled) honest empty state after `topup/info`, **or** (enabled) `POST /api/user/pay` success + payment hand-off.
- **FAIL:** Enabled path: pay button errors with misconfigured client while `topup/info` claims enabled; or UI success without successful `/api/user/pay`.
- **BLOCKED:** Session expired.

## Probe alignment

| UI journey | `probe-epay.sh` |
|------------|-----------------|
| Stops at pay redirect | Continues with signed notify → 额度↑ |
| Needs real/configured EPay for hand-off | Can fake notify with `EpayKey` without live merchant |
