# Appendix: Register (`manual-otp`) — not in daily suite

**Daily:** no — documentation only for V1  
**Tag:** `manual-otp`  
**Depends on:** `BASE_WEB`, mailbox access for a human (or future mail API)

## Why appendix

Web **注册** collects **用户名**, **密码**, **邮箱**, and **邮箱验证码**. Cursor agents cannot receive email unaided. Daily identity uses pre-provisioned **用户** + [journey-login.md](../customer/journey-login.md).

HTTP `probe-auth.sh` registers with username/password while Backend email verification is off — **not** the same path as Web register.

## Documented steps (do not auto-run in V1 suite)

### 1. Open login / register mode

| | |
|--|--|
| **Action** | Open `$BASE_WEB/login`. Switch to **注册**. |
| **UI expect** | Fields: **用户名** (≤20), **密码** (8–20), **邮箱** (≤50), **邮箱验证码**, **获取验证码**; terms checkbox if shown; **注册** submit. |
| **Network** | Status/config GET → 2xx. Turnstile only if enabled (`turnstile_check` + site key). |

### 2. Request code (`manual-otp` gate)

| | |
|--|--|
| **Action** | Enter email; click **获取验证码**. **Human** reads mailbox and provides the code to the agent (or pastes into the field). |
| **UI expect** | **验证码已发送，请查收邮件** (or equivalent). |
| **Network** | `GET`/`POST` verification send path matching `/api/verification` → 2xx when SMTP configured. |

### 3. Submit register

| | |
|--|--|
| **Action** | Fill username + password + 邮箱 + 邮箱验证码 (+ Turnstile if shown). Accept terms. Click **注册**. |
| **UI expect** | Success then prompt to login (**注册成功，请登录**) or auto-login per product behavior. |
| **Network** | `POST /api/user/register` with distinct `username`, `email`, and `verification_code` → success. |

### 4. Follow-up

Continue with [journey-login.md](../customer/journey-login.md) using the new credentials if not already signed in (login accepts username or email).

## Pass / fail (when manually executed)

- **PASS:** Code send + register succeed; new **用户** can log in with username or email.
- **FAIL:** Valid OTP rejected; register succeeds without code when UI required it; username/email conflated in the request body.
- **BLOCKED:** SMTP/Turnstile/human OTP unavailable.

## V1 policy

CI / daily Cursor runs **must not** depend on this appendix.
