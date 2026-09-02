# Open email registration with 邮箱验证码 + 人机验证 (no domain allowlist)

We considered front-loading signup risk by allowlisting “mainstream” consumer mailbox domains (Gmail / iCloud / CN portals) so providers’ own KYC absorbs abuse. We **rejected** that: registration accepts **any** deliverable address (including disposable), and relies on Backend **邮箱验证码** (account created only after OTP succeeds) plus **人机验证** (Cloudflare Turnstile on register, send-code, and login). Domain and alias restriction flags stay **off**. This phase **wires Web only**; 管理员 enables `EmailVerificationEnabled` and `TurnstileCheckEnabled` in stock Admin — we do not reimplement those controls in basedong.

## Considered Options

- **Strict domain allowlist** — strong against throwaway inboxes; blocks corporate/custom domains and needs an ever-growing list; abandoned after product chose openness over mailbox-vendor gating.
- **Disposable blocklist only** — middle ground; deferred; can be added later without changing the “no allowlist” policy.
- **OTP + Turnstile, all domains (chosen)** — proves mailbox control and resists bots; matches existing basedong-api switches; Web must call `/api/verification` and pass `verification_code` / Turnstile tokens.

## Consequences

- Abuse from disposable mail is accepted until metrics justify a blocklist or tighter Admin options.
- Console remains gated on a signed-in **用户**; marketing stays public. There is no logged-in-but-unverified customer state.
- Glossary: see Backend **邮箱验证码** / **人机验证** / **用户** in `docs/backend/CONTEXT.md`.
