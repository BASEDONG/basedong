# Web

Customer-facing SaaS console. Evolved from AI website-cloner output (SiliconFlow multi-site clone).

## Zones

The frontend is split into five **zones** — each maps to a `src/components/{zone}/` directory and a Route Group in `src/app/`:

**Marketing**:
Public website pages cloned from `siliconflow.cn` — home, pricing, partner, news, etc.

**Console**:
Cloud control plane cloned from `cloud.siliconflow.cn` — model plaza, billing, playground, campaigns.

**Auth**:
Login/register for Backend 用户. Register uses separate **用户名** + **邮箱** (邮箱验证码 + 人机验证); login accepts username or email. Cloned from `account.siliconflow.cn`.

**Docs**:
Local docs shell under `/docs/api`. Body content is **vendored** from [QuantumNous/new-api-docs-v1](https://github.com/QuantumNous/new-api-docs-v1) AI 模型接口 MDX (+ OpenAPI JSON) via `npm run sync:docs` → `content/docs-api/{zh,en,ja}/`. Endpoint pages render with **fumadocs-openapi** (`createAPIPage`); shell/sidebar stay local. Sidebar mirrors the upstream folder/`meta.json` tree (nested subgroups). Management APIs are not synced and are stripped from root `meta.json` / index. Do not link out to docs.newapi.pro.

**Docs locales** (separate from Marketing `Translated Locale` set): `zh` (bare `/docs/api`), `en` (`/en/docs/api`), `ja` (`/ja/docs/api`). Helpers in `src/lib/docs-locale.ts`; UI chrome in `docs-ui-copy.ts`. Language switcher in the sidebar preserves the current endpoint slug across locales. OpenAPI JSON is shared under `content/docs-api/openapi/`. Parity gate: `npm run check:docs-locales` (manifest slug sets).

**Forms**:
Feishu form UIs for business inquiries and support tickets.

## Language

### Zones & routing

**Zone**:
A product area grouping related pages, components, and static assets under a single semantic name (`marketing`, `console`, etc.).
_Avoid_: site-key, site key, origin

**Clone output**:
The generated pages and components produced by the `/clone-website` workflow.
_Avoid_: demo, template

**APP_ROUTES**:
Canonical locale-agnostic URL paths for all cloned pages, defined in `src/lib/routes.ts`. Locale prefixes are applied outside these paths.
_Avoid_: CLONED_ROUTES (deprecated alias)

**resolveLocalHref**:
Function that rewrites known external SiliconFlow URLs to local `APP_ROUTES` paths.
_Avoid_: toLocalHref, link mapper

**Console**:
The customer control plane under `/me/*` (models, billing, playground, API Keys). Not the operator Admin UI.
_Avoid_: Admin, dashboard

**词元**:
Customer-facing name for billed model usage units. See Backend glossary; never use “Token” in UI copy when you mean 词元.
_Avoid_: Token, 令牌

**API Key**:
Customer credential shown in Console account settings. Created/managed via Backend; not named Token in basedong UI.
_Avoid_: Token, 令牌

### Locales

**Locale**:
A BCP-47 UI language code used in the customer Web (e.g. `zh-CN`, `en`, `zh-TW`). Not the Admin i18next codes (`zhCN`, `zhTW`).
_Avoid_: language (alone), lang, i18n code

**Source Locale**:
`zh-CN`. The authoritative copy language for Web catalogs; missing strings fall back here.
_Avoid_: default language, fallback language (use **Fallback Locale** for the runtime fallback target)

**Translated Locale**:
A Locale that has a complete catalog for the in-scope Zones and may appear as a URL prefix (`/en/...`). The Source Locale uses bare paths (`/`, `/login`) instead of a prefix.
_Avoid_: supported language, enabled locale

**Console Locale**:
*(Pre-Graduation only.)* A Locale in the **Target Locale Set** with a complete **Console** catalog but not yet complete Marketing + Auth catalogs. Appears in the language switcher; **Preferred Locale** persists; Marketing and Auth **Fallback Locale** until **Graduation**. Switcher shows a Console-only hint; Marketing shows a persistent banner when active. **Target end state:** empty — every Target Locale is a Translated Locale; remove banner, switcher hint, and `CONSOLE_LOCALES` registry.
_Avoid_: partial locale, beta language

**Graduation**:
When a **Console Locale** gains complete Marketing + Auth + shared chrome catalogs, it becomes a **Translated Locale** (URL prefixes, `check:locales` parity). Existing **Preferred Locale** values must keep working. **Planned:** all seven pending Console Locales graduate in one increment together with Marketing RTL for `ar`.
_Avoid_: locale promotion, full translation

**Target Locale Set**:
The customer Web languages we ship toward: `zh-CN`, `en`, `zh-TW`, `ja`, `fr`, `ru`, `vi`, `ko`, `de`, `es`, `pt-BR`, `ar`, `hi`, `id`. Portuguese is `pt-BR` (Brazil), not `pt`. Spanish is a single `es` catalog (Spain + LATAM). Arabic requires RTL layout in **Console and Marketing/Auth** (shared shell, forms, nav).
_Avoid_: supported languages list, locale roadmap

**Fallback Locale**:
Always the Source Locale (`zh-CN`). Used when a catalog key is missing for the active Locale.
_Avoid_: English fallback, best-effort locale

**Preferred Locale**:
The Locale the user last chose in the language switcher. Covers the **Target Locale Set**; persisted (`bd_preferred_locale` cookie / localStorage). Bare-path Marketing/Auth entry redirects to the prefixed URL when Preferred Locale is a **Translated Locale** (not Source). Console paths stay bare; copy follows Preferred Locale.
_Avoid_: selected language, display language

**Translated Locale set** (Marketing + Auth):
Target end state: every **Target Locale** is a **Translated Locale** — full Marketing (12 pages), Auth, and shared chrome catalogs; URL prefixes for all non-Source locales. **Launch set** (shipped today): `zh-CN` (Source; bare paths), `en`, `zh-TW`, `fr`, `ru`, `ja`, `vi`. **Pending Graduation**: `ko`, `de`, `es`, `pt-BR`, `ar`, `hi`, `id` (Console catalog complete; Marketing/Auth/chrome still **Fallback Locale** until graduated). `check:locales` must cover the full Translated set once graduated.
_Avoid_: supported languages, Admin locale list (different codes and product surface)

**Marketing Graduation scope**:
In scope for each **Translated Locale**: 12 Marketing page catalogs (`content-locales` or `*-ui-copy.ts`), Auth login/register catalog, shared chrome (`chrome-copy.ts`, `locale-ui-copy.ts`), page SEO metadata, and **illustration copy** (diagram labels inside enterprise scenario SVGs and any other marketing illustration with readable text). Out of scope: **Forms**, **Docs** (separate locale sets per ADR).
_Avoid_: whole-site i18n, Admin UI

**Catalog production**:
Marketing + Auth strings are **authored by agents into the repo** (Cursor agents reading `zh-CN` source). No commercial MT API, in-app translation SDK, or i18next-style key files on Web.
_Avoid_: translation plugin, auto-translate pipeline

### Catalog layout (Marketing + Auth)

Per-page copy lives under `src/components/{zone}/{page}/`:

- **`content-base.ts`** — IDs, icons, paths, numeric structure (not translated).
- **`content-locales/*.ts`** — one module per Translated Locale (`zh-cn.ts`, `en.ts`, …).
- **`content.ts`** — `getXxxContent(locale)` assembling base + strings via `pickCatalog` from `@/lib/pick-catalog`.
- **`*-ui-copy.ts`** (optional) — section titles / hero shell when the main catalog is large.

**Category filters** use Source-locale Chinese IDs as keys (e.g. `"全部"`, `"对话"`); `categoryLabels` maps keys to display labels per locale (same pattern as pricing/models).

**Illustration copy**:
Readable text in marketing diagrams (e.g. enterprise `ScenarioDesignSvgs`, scenario detail specs in page catalogs) is locale-specific catalog content, not baked into static asset files. Prefer React SVG components fed by catalogs; use per-locale static `.svg` duplicates only when an asset cannot be componentized (currently a small set under `public/assets/marketing/`).

**Backend-derived UI** (pricing table headers, model card description fallback) takes `locale` and reads from the nearest catalog or `src/lib/backend/catalog.ts` helpers — not from static JSON fixtures.

### Catalog layout (Console)

Per ADR 0006. Shared chrome (sidebar, topbar, toasts, common errors) in `console/shared/`; page-specific strings stay in each page module. Console routes stay bare (`/me/*`); **Preferred Locale** selects the catalog. Auth provides a **minimal catalog** (login/register critical strings) for **Console Locales** so language does not snap back to Chinese at sign-in.

### SEO metadata

- **`src/lib/marketing-page-metadata.ts`** — static page titles/descriptions for Marketing routes (+ helpers that delegate to page catalogs for pricing, reserved, user agreement).
- **`src/lib/auth-page-metadata.ts`** — login layout metadata.
- **`src/lib/static-page-metadata.ts`** — `staticPageMetadata()` builds Next `Metadata` at export time using Source Locale (`zh-CN`).
- **`src/lib/document-metadata.ts`** + **`DocumentMetadataSync`** — client-side `document.title`, meta description, and `<html lang>` from pathname locale (required because `output: "export"` cannot use `headers()` in `generateMetadata()`).
- **`ClientLocaleProvider`** — pathname-derived locale for Marketing/Auth (replaces server `headers()`/`cookies()` bootstrap).
- **`src/middleware.ts`** — rewrites prefixed URLs to bare App Router paths in **dev** (`/en/pricing/` → `/pricing/`). Requires `next.config.ts` to omit `output: "export"` while `NODE_ENV !== "production"`; otherwise middleware is disabled and prefixed URLs 404 in dev.
- **`scripts/expand-locale-static-export.mjs`** — post-`next build` step copies bare-path HTML into `/en/…`, `/ja/…`, etc., patches `<html lang>`, `<title>`, and meta description per locale (static hosts do not run middleware). Docs API routes at `/en/docs/api` and `/ja/docs/api` are emitted directly by Next build; per-page metadata comes from `generateMetadata` + client `DocsPageMetadataSync`.

Console metadata follows **Preferred Locale** (ADR 0006). Forms metadata stays Chinese until that Zone is translated. Docs API metadata is localized for `zh` / `en` / `ja` via `src/lib/docs-page-metadata.ts` (separate from **Target Locale Set**).

**Quality gate:** `npm run check` runs lint, typecheck, `check:locales`, `check:console-locales`, `check:docs-locales`, and production build. Console `react-hooks/set-state-in-effect` findings are warnings until those surfaces are refactored.
