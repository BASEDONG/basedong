# Journey: 用户 login → Console

**Daily:** required  
**Depends on:** `BASE_WEB`, `BASE_API`, `QA_USER_EMAIL`, `QA_USER_PASSWORD`  
**Produces:** authenticated Console session (cookie / stored access token as the app uses)

## Prerequisites

- Web and Backend reachable.
- Pre-provisioned **用户** credentials in env (do **not** use register for daily runs — see [appendix/register-manual-otp.md](../appendix/register-manual-otp.md)).

## Steps

### 1. Open login

| | |
|--|--|
| **Action** | Open `$BASE_WEB/login` (legacy `$BASE_WEB/zh/login` should redirect here). |
| **UI expect** | Login shell visible; title/copy around welcoming login; fields for **用户名或邮箱** and **密码**; primary **登录** control. |
| **Network** | Optional: `GET` status/config used by the page → 2xx. If Turnstile is disabled in this env, no Turnstile widget is required. |

### 2. Submit credentials

| | |
|--|--|
| **Action** | Enter `QA_USER_EMAIL` (username or email of the pre-provisioned 用户) into **用户名或邮箱**, `QA_USER_PASSWORD` into **密码**. Click **登录**. |
| **UI expect** | Leave the login page; land in Console (typically `$BASE_WEB/me/models` or another `/me/*` route). |
| **Network** | `POST` path matching `/api/user/login` → **2xx** and success payload including an access token (field name may be `access_token` or nested under `data` — assert success + token present). |

### 3. Console chrome

| | |
|--|--|
| **Action** | Confirm Console shell (sidebar/top bar) for a logged-in **用户**. |
| **UI expect** | `/me/*` URL; navigation for models / playground / account available. |
| **Network** | Often `GET /api/user/self` → 2xx shortly after entry (soft check; hard check in quota journey). |

## Pass / fail

- **PASS:** Login succeeds and Console `/me/*` is usable.
- **FAIL:** Valid credentials rejected, hang on login, or redirect loop without Console.
- **BLOCKED:** Web/API down, or Turnstile enabled without a solvable challenge in this environment.

## Notes

- Backend login accepts **username or email** in the same field. Register uses a separate username + email (see [appendix/register-manual-otp.md](../appendix/register-manual-otp.md)). `QA_USER_EMAIL` may be either identifier for the pre-provisioned account.
