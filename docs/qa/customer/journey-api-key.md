# Journey: API Key create / list / reveal

**Daily:** required  
**Depends on:** Login session ([journey-login.md](./journey-login.md))

## Goal

**用户** can create an **API Key**, see it in the list, and reveal/copy the secret via Backend.

## Steps

### 1. Open API Key page

| | |
|--|--|
| **Action** | Open `$BASE_WEB/me/account/ak`. |
| **UI expect** | Copy explaining API Key + Relay; control **新建 API Key**; table/list area. |
| **Network** | `GET` path matching `/api/token/` (list) → 2xx. |

### 2. Create

| | |
|--|--|
| **Action** | Click **新建 API Key**. Complete any name/confirm UI the page shows. Submit create. |
| **UI expect** | Success feedback (e.g. **API Key 创建成功**); new row appears (name/mask/created time). |
| **Network** | `POST /api/token/` → 2xx / success. |

### 3. Reveal / copy

| | |
|--|--|
| **Action** | Use the row control that reveals or copies the key (e.g. **密钥(点击复制)** / copy control). |
| **UI expect** | Full key available to clipboard or shown once; copy success toast acceptable (**复制成功**). |
| **Network** | `GET` (or equivalent) path matching `/api/token/{id}/key` → 2xx; body includes `key` string. |

## Pass / fail

- **PASS:** Create + list + reveal/copy all succeed with matching Network.
- **FAIL:** Create/list/reveal errors with 2xx UI lying, or 4xx/5xx on token APIs for a normal 用户.
- **BLOCKED:** Session expired.

## Notes

- Product language is **API Key**, not Token, in UI copy.
- Do not paste secrets into git or permanent logs; run logs may say `key_len=N` only.
