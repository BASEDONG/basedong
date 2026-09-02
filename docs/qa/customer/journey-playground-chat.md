# Journey: Playground chat (deep)

**Daily:** required  
**Depends on:** Login session; Backend **Channel** + model available for chat  
**Note:** Playground uses **session JWT** → `POST /pg/chat/completions` (not pasting an API Key).

## Goal

Send one chat completion in Console and observe billing-related signals when possible.

## Steps

### 1. Open chat Playground

| | |
|--|--|
| **Action** | Open `$BASE_WEB/me/playground/chat`. |
| **UI expect** | Chat workspace; model picker; composer placeholder **请输入提示词...**; send control (`aria-label` **send**). Banner may warn that 在线体验 incurs usage. |
| **Network** | Model list endpoints (e.g. user models / pricing) → 2xx when used. |

### 2. Select model

| | |
|--|--|
| **Action** | Choose an available model (not **暂无可用模型**). |
| **UI expect** | Selected model shown in config/banner. |
| **Network** | — |

If no models: **BLOCKED** (Channel/catalog), not product FAIL for empty ops config.

### 3. Record quota before

| | |
|--|--|
| **Action** | `GET /api/user/self` (reload or DevTools); note `quota` as `Q0`, `used_quota` as `U0`. |
| **UI expect** | Top bar **额度** matches `Q0` if shown. |
| **Network** | `GET /api/user/self` → 2xx. |

### 4. Send a short prompt

| | |
|--|--|
| **Action** | Type a short prompt; activate send (button or Enter). |
| **UI expect** | Assistant reply content appears in the thread (not only an error toast). |
| **Network** | `POST /pg/chat/completions` → **2xx**; JSON has `choices[0].message.content` string. |

Upstream/model 5xx or “no channel”: **FAIL** for this journey (chat is the V1 core path). Distinguish clearly in the report from smoke BLOCKED.

### 5. Quota / usage after (soft-hard)

| | |
|--|--|
| **Action** | Re-fetch `GET /api/user/self`. Optionally open bills/usage UI if present. |
| **UI expect** | If the env deducts 额度 synchronously, top bar updates; otherwise document “no visible change”. |
| **Network** | Prefer: `quota` decreased and/or `used_quota` increased vs `Q0`/`U0`, **or** a consume row via usage/log self API if the UI loads it. If billing is async and unchanged within ~30s, note **PASS with observation** only if step 4 succeeded — do not FAIL solely on delayed quota if Relay returned content (call out in report). |

## Pass / fail

- **PASS:** Completion content returned via `/pg/chat/completions`; auth worked without API Key paste.
- **FAIL:** Authenticated chat call fails for app/Relay reasons with models configured; or UI shows success while Network errored.
- **BLOCKED:** No selectable models / Channel not configured.
