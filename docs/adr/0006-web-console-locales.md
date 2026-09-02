# Customer Web Console Locales

Customer Web (`apps/web`) ships **Console** (`/me/*`) in all **Target Locale Set** languages in one phase: `zh-CN`, `en`, `zh-TW`, `ja`, `fr`, `ru`, `vi`, `ko`, `de`, `es`, `pt-BR`, `ar`, `hi`, `id`. **Source Locale** and **Fallback Locale** stay `zh-CN`. Console routes remain **bare paths**; **Preferred Locale** (`bd_preferred_locale`) selects Console copy. Reuse `MarketingLanguageSwitcher` in Console but do not prefix Console URLs. Seven existing Marketing **Translated Locales** unchanged; seven new locales start as **Console Locale** (complete Console catalog, Marketing/Auth fallback to `zh-CN`) until **Graduation** adds Marketing + Auth catalogs and URL prefixes. Auth ships a **minimal catalog** for Console Locales (login/register critical strings) plus a “console-only language” hint so sign-in does not snap to Chinese. Arabic gets full Console RTL (layout, sidebar, forms). Docs (`zh` / `en` / `ja`) and Forms stay out of scope. Catalogs follow the Marketing pattern (TypeScript modules, Chinese source) with shared Console chrome in `console/shared/` and page-specific keys per module. Backend errors: localize static UI and client-thrown strings first; map high-frequency Backend `message` strings on the frontend (no stable error codes yet; no Backend change in this phase). Translations are **authored by Cursor agents into the repo** — no translation API, MT pipeline, or in-app translation SDK. A second agent review pass checks copy against `zh-CN` source; `ar` adds RTL layout smoke tests. CI adds `check:console-locales`. Supersedes ADR 0005’s deferral of Console i18n only; Marketing + Auth routing and catalog rules from ADR 0005 remain until Graduation per locale.

## Considered Options

- **Prefix Console URLs** (`/en/me/...`) — consistent with Marketing; rejected because ADR 0005 bare Console paths are entrenched (bookmarks, email links, OAuth return URLs) and cross-zone prefix dropping is already established.
- **Console-only language settings** (separate from Marketing switcher / storage) — rejected; users expect one language choice across the product surface.
- **Marketing sync for all 14 locales before Console** — rejected; Console retention is the primary goal; new locales ship as Console Locale first.
- **Commercial MT / translation API for catalogs** — rejected; same agent-in-repo model as ADR 0005, explicitly via Cursor agents.
- **Partial RTL for Arabic** (translated strings, LTR layout) — rejected; half RTL is worse for Arabic users than deferring; full RTL shipped in the same Console phase.

## Consequences

- Glossary: `apps/web/CONTEXT.md` (**Target Locale Set**, **Console Locale**, **Graduation**, Console catalog layout, updated **Preferred Locale**).
- `src/lib/locale.ts` and `src/lib/languages.ts` expand toward the Target set; `pt-BR` (not `pt`); unified `es`.
- Language switcher lists Target locales; Console Locales show a switcher hint; Marketing shows a persistent banner when a Console Locale is active.
- `npm run check:console-locales` validates Console catalog parity across Target locales (alongside existing `check:locales` for Marketing + Auth Translated Locales).
- ADR 0005 remains authoritative for Marketing + Auth Translated Locale mechanics; Graduation of each Console Locale is a follow-on increment, not automatic.
