# Customer Web Locales (Marketing + Auth)

Customer Web (`apps/web`) ships real Locales for **Marketing** and **Auth** only. **Source Locale** is `zh-CN` (authoritative copy; bare URL paths). **Translated Locale set** at launch: `zh-CN`, `en`, `zh-TW`, `fr`, `ru`, `ja`, `vi` — all must have complete catalogs for those Zones before launch. Other switcher entries may be a persisted **Preferred Locale** but do not get URL prefixes; content **Fallback Locale** is always `zh-CN`, with an in-switcher “not translated yet” hint. When a Preferred Locale later becomes Translated, returning visits should land on its prefixed URLs. Console / Docs / Forms stay Chinese bare paths for now (cross-zone links drop the prefix). Catalogs are per-Locale TypeScript `content` modules (Chinese source), not Admin-style English i18next keys. Runtime routing and catalog loading are **hand-rolled** (no `next-intl` / `i18next` on Web). Locale-aware internal links go through one helper that extends the existing `resolveLocalHref` / link conventions. Translations are **produced by agents/LLMs into the repo**; no in-app or pipeline translation API/SDK. Agent output may merge with spot checks; fix forward after launch.

## Considered Options

- **next-intl (or similar) + English keys** — closer to App Router norms and Admin habits; rejected for this phase to avoid a second i18n conceptual model beside Admin i18next, and because scope is fixed content modules on the public surface only.
- **URL prefixes for every switcher language** — simpler mentally; rejected because untranslated prefixes create duplicate/thin URLs.
- **Commercial MT API for catalogs** — faster batch; rejected in favor of LLM/agent-authored checked-in copy.
- **Defer all Web i18n** (per ADR 0001 “overseas later”) — superseded for Marketing + Auth by this decision; Console/Docs i18n remains deferred.

## Consequences

- Glossary: `apps/web/CONTEXT.md` (**Locale**, **Source Locale**, **Translated Locale**, **Fallback Locale**, **Preferred Locale**, catalog layout, SEO metadata).
- `APP_ROUTES` stay locale-agnostic; prefixes apply outside those paths.
- Marketing + Auth routes use static `export const metadata` (Source Locale at build time, for `output: "export"`) plus client `DocumentMetadataSync` for translated titles/descriptions from pathname locale (`marketing-page-metadata.ts`, `auth-page-metadata.ts`, `document-metadata.ts`). Post-build `expand-locale-static-export.mjs` mirrors bare HTML under each prefixed Translated Locale path and injects locale-specific `<title>` / meta description for static hosting and crawlers.
- Expanding Translated Locales or translating Console/Docs is a new decision, not an assumption of this ADR.
