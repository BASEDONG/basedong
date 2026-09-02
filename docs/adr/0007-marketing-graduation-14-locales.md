# Marketing Graduation: 14 Target Locales

Customer Web **Marketing**, **Auth**, and shared **chrome** graduate from the launch **Translated Locale set** (7) to the full **Target Locale Set** (14) defined in ADR 0006. After Graduation, `TRANSLATED_LOCALES` equals `TARGET_LOCALES`, `CONSOLE_LOCALES` is empty, and Console Locale fallback machinery (banner, switcher hints, `marketingContentLocale` Console branch) is removed.

## Scope

- 12 Marketing catalog modules (`content-locales/`), `pricing-ui-copy`, `enterprise-ui-copy`, `gateway-ui-copy`, `chrome-copy`, SEO metadata (`marketing-page-metadata`, `auth-page-metadata`), illustration copy where embedded in React catalogs.
- Auth body copy already ships 14 locales; remove post-Graduation `consoleOnlyHint`.
- Arabic RTL applies to Marketing and Auth document shell, not Console-only.
- **Out of scope:** Forms, Docs, Admin i18next, Console URL prefixes.

## Considered Options

- **Staged locale rollout (one language at a time)** — lower risk; rejected in favor of single Graduation cutover aligned with parity gate expansion.
- **Keep Console Locale UX with partial catalogs** — rejected; empty `CONSOLE_LOCALES` removes dual-mode complexity.
- **Commercial MT for batch catalogs** — rejected; agent-authored TypeScript catalogs from `zh-CN` source (ADR 0005).

## Consequences

- Supersedes ADR 0006 staged Marketing fallback for the 7 pending locales; ADR 0006 Console i18n scope remains.
- `npm run check:locales` validates all 14 locales across Marketing catalogs.
- `PREFIXED_LOCALES` includes 13 prefixed paths (all Target Locales except Source `zh-CN`).
- Glossary updates in `apps/web/CONTEXT.md`.
