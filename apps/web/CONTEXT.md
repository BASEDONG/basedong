# Web

Customer-facing SaaS console. Evolved from AI website-cloner output (SiliconFlow multi-site clone).

## Zones

The frontend is split into five **zones** — each maps to a `src/components/{zone}/` directory and a Route Group in `src/app/`:

**Marketing**:
Public website pages cloned from `siliconflow.cn` — home, pricing, partner, news, etc.

**Console**:
Cloud control plane under `/me/*`. IA and page capabilities align with upstream new-api's **user** console (not Admin); visual skin stays basedong. Primary surfaces: 模型广场, 在线体验, 用量概览, API 密钥, 记录, 钱包, 个人资料. SiliconFlow-heritage extras that need large Backend work are Console 下线页.

**Auth**:
Login/register for Backend 用户. Register uses separate **用户名** + **邮箱** (邮箱验证码 + 人机验证); login accepts username or email. Cloned from `account.siliconflow.cn`. Access JWT is **memory-only** (upstream new-api pattern); cold start uses Refresh Cookie via `ensureAuthSession` when Web and Backend are same-site. See `apps/api/docs/basedong.md` (SPA session).

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
The customer control plane under `/me/*` (模型广场, 在线体验, 用量概览, API 密钥, 记录, 钱包, 个人资料). Not the operator Admin UI. Copy uses basedong synonyms; do not paste upstream new-api user-console labels verbatim.
_Avoid_: Admin, dashboard (as a name for the whole Console), 用户管理控制台 (ambiguous with Admin)

**词元**:
Customer-facing name for billed model usage units. See Backend glossary; never use “Token” in UI copy when you mean 词元.
_Avoid_: Token, 令牌

**API Key**:
Customer credential for Relay, managed in Console. Created/managed via Backend; not named Token in basedong UI.
_Avoid_: Token, 令牌

### Console surfaces

**模型广场**:
Console catalog of models offered to the 用户; basedong-specific product entry and default post-login landing. Distinct from Marketing pricing pages even when both read `/api/pricing`.
_Avoid_: model market, plaza alone when Marketing vs Console is unclear

**在线体验**:
Console session playground for trying models while signed in (Backend `/pg/…`, not pasting an API Key). Product surface is Chat; image/video/TTS shells are Console 下线页.
_Avoid_: Playground, 游乐场 as the Chinese UI label

**用量概览**:
Single Console page for the 用户's usage statistics (upstream user Dashboard capability; one page, not a separate “overview” plus “charts” pair).
_Avoid_: 数据看板, Dashboard as UI label, splitting 概览 and 数据看板 into two pages

**记录**:
Console nav group that contains 调用记录, 绘图记录, and 异步任务.
_Avoid_: 使用日志, Usage logs, 日志 as the group label

**调用记录**:
Console list of the 用户's consume / request rows (Backend `/api/log/self`). Replaces the SiliconFlow-era “账单” framing for the same data.
_Avoid_: 账单, 使用日志, bills

**绘图记录**:
Console list of the 用户's drawing-task rows (Backend MJ self logs).
_Avoid_: Drawing logs as UI label

**异步任务**:
Console list of the 用户's async task rows (Backend task self logs).
_Avoid_: Task logs as UI label, 任务记录 when 异步任务 is meant

**钱包**:
Console page for 额度 balance, 充值, redemption, and top-up history. 钱包 is the page; **充值** is the purchase action (see Backend glossary).
_Avoid_: expense bill, expensebill, naming the whole page only 充值 when it also holds history and balance

**个人资料**:
Console page for the 用户's profile and account settings at upstream user Profile capability parity (whatever self APIs Backend already exposes).
_Avoid_: Personal settings as UI label when 个人资料 is meant

**Console 下线页**:
A `/me/*` route omitted from the Console sidebar whose direct visit shows that basedong does not offer the capability (SiliconFlow-heritage gaps such as invoice/batches/campaigns, and retired multimodal 在线体验 shells). Not a silent fake of the old clone.
_Avoid_: leaving working-looking clone UI on these URLs, treating sidebar omission alone as enough

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
*(Historical — ADR 0006 staged phase.)* Previously a Locale with Console catalogs but not Marketing + Auth. **After ADR 0007 Graduation:** `CONSOLE_LOCALES` is empty; banner, switcher “console only” hints, and Marketing fallback-to-Source for those codes are removed. Term kept only for reading older ADRs.
_Avoid_: partial locale, beta language

**Graduation**:
*(Completed — ADR 0007.)* All Target Locales are **Translated Locales** for Marketing + Auth + shared chrome (URL prefixes, `check:locales` parity for 14). Marketing/Auth Arabic uses document `dir=rtl`. Existing **Preferred Locale** values continue to work.
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
Equals the **Target Locale Set** (ADR 0007): `zh-CN` (Source; bare paths), `en`, `zh-TW`, `ja`, `fr`, `ru`, `vi`, `ko`, `de`, `es`, `pt-BR`, `ar`, `hi`, `id`. Full Marketing (12 pages), Auth, shared chrome, and SEO metadata catalogs; URL prefixes for all non-Source locales. `check:locales` validates all 14.
_Avoid_: supported languages, Admin locale list (different codes and product surface)

**Marketing Graduation scope**:
In scope for each **Translated Locale**: 12 Marketing page catalogs (`content-locales` or `*-ui-copy.ts`), Auth login/register catalog, shared chrome (`chrome-copy.ts`), page SEO metadata, and **illustration copy** (diagram labels in enterprise `ScenarioDesignSvgs` / page catalogs). Out of scope: **Forms**, **Docs** (separate locale sets per ADR).
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

**Category filters** use Source-locale Chinese IDs as keys (e.g. `"全部"`, `"文本"`, `"图像"`); `categoryLabels` maps keys to display labels per locale (same pattern as pricing/models).

**Illustration copy**:
Readable product/diagram labels (enterprise `ScenarioDesignSvgs` + `scenarioDiagramSpecs` in page catalogs) are locale-specific catalog content. Prefer React SVG components fed by catalogs. Decorative Latin fragments in Storyset static assets under `public/assets/marketing/` (e.g. street signs, option letters) are not Source Locale copy and need not be duplicated per locale unless they become user-facing marketing strings.

**Backend-derived UI** (pricing table headers, model card description fallback) takes `locale` and reads from the nearest catalog or `src/lib/backend/catalog.ts` helpers — not from static JSON fixtures.

**Catalog Control Tag**:
Canonical Admin model `tags` tokens with a `bs` prefix that Web maps to UI and never shows raw as chips. Modality: `bsText` / `bsImage` / `bsVideo` / `bsAudio`. Context: `bsCtx{n}` (n = thousands of tokens; Web formats `127K` / `1M`). Differentiating capability: `bsCapMultimodal` only (reasoning/tools are defaults, not tags). No freeform catalog tags. Operator contract: [`apps/api/docs/basedong.md`](../api/docs/basedong.md) § Model catalog tags.

### Catalog layout (Console)

Per ADR 0006. Shared chrome (sidebar, topbar, toasts, common errors) in `console/shared/`; page-specific strings stay in each page module. Console routes stay bare (`/me/*`); **Preferred Locale** selects the catalog. Auth login/register catalogs cover the full **Target Locale Set** (same as Marketing after Graduation).

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
