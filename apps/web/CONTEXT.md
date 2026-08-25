# Web

Customer-facing SaaS console. Evolved from AI website-cloner output (SiliconFlow multi-site clone).

## Zones

The frontend is split into five **zones** — each maps to a `src/components/{zone}/` directory and a Route Group in `src/app/`:

**Marketing**:
Public website pages cloned from `siliconflow.cn` — home, pricing, partner, news, etc.

**Console**:
Cloud control plane cloned from `cloud.siliconflow.cn` — model plaza, billing, playground, campaigns.

**Auth**:
Login flows cloned from `account.siliconflow.cn`.

**Docs**:
API documentation shell cloned from `api-docs.siliconflow.cn` (introduction page only).

**Forms**:
Feishu form UIs for business inquiries and support tickets.

## Language

**Zone**:
A product area grouping related pages, components, and static assets under a single semantic name (`marketing`, `console`, etc.).
_Avoid_: site-key, site key, origin

**Clone output**:
The generated pages and components produced by the `/clone-website` workflow.
_Avoid_: demo, template

**APP_ROUTES**:
Canonical local URL paths for all cloned pages, defined in `src/lib/routes.ts`.
_Avoid_: CLONED_ROUTES (deprecated alias)

**resolveLocalHref**:
Function that rewrites known external SiliconFlow URLs to local `APP_ROUTES` paths.
_Avoid_: toLocalHref, link mapper
