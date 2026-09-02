# Journey: Playground smoke (image / TTS / video)

**Daily:** required  
**Depends on:** Login session ([journey-login.md](./journey-login.md))

## Goal

Confirm non-chat Playground routes load inside Console. **As of V1 writing**, image / TTS / video workspaces are **not wired** to basedong Relay; smoke asserts honest empty-state copy, not full generation.

When Relay is later connected, upgrade each section’s “generation” row from N/A to a real attempt; upstream failures → **BLOCKED** (not product FAIL).

## Shared setup

Stay logged in as the QA **用户**.

---

## A. Image — `/me/playground/image`

| Step | Action | UI expect | Network |
|------|--------|-----------|---------|
| A1 | Open `$BASE_WEB/me/playground/image` | Title/area **图像生成**; Console shell | Soft: session APIs 2xx |
| A2 | Read workspace messaging | Expect copy that 图像生成 **尚未接入** basedong Relay (or, if wired later, generation UI) | — |
| A3 | Generation attempt | **N/A** while “尚未接入” is shown → treat A1–A2 as smoke **PASS**. If wired: trigger one generate; success → PASS; no Channel/upstream 5xx → **BLOCKED** | Future: generation path 2xx or documented error |

## B. Text-to-speech — `/me/playground/text-to-speech`

| Step | Action | UI expect | Network |
|------|--------|-----------|---------|
| B1 | Open page | Console + TTS playground chrome | Soft 2xx |
| B2 | Read workspace messaging | Expect **尚未接入** basedong Relay (or real TTS UI if wired) | — |
| B3 | Generation | Same policy as A3 | Same as A3 |

## C. Video — `/me/playground/video`

| Step | Action | UI expect | Network |
|------|--------|-----------|---------|
| C1 | Open `$BASE_WEB/me/playground/video` | Title/area **视频生成** | Soft 2xx |
| C2 | Read workspace messaging | Expect **尚未接入** (or real video UI if wired) | — |
| C3 | Generation | Same policy as A3 | Same as A3 |

## Pass / fail

- **PASS:** All three routes render Console Playground chrome; current product shows 尚未接入 **or** (when wired) one successful generate per surface.
- **FAIL:** Route 404/500, blank shell, or claims success while broken navigation.
- **BLOCKED:** Only when generation is attempted against missing upstream/Channel after wiring — not for today’s 尚未接入 message.
