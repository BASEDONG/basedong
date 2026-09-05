# Basedong Web

Customer-facing SaaS console UI, evolved from SiliconFlow clone output.

## Zones

| Zone | Path | Routes |
|------|------|--------|
| `marketing` | `src/components/marketing/` | `/`, `/about`, `/partner`, `/news`, … |
| `console` | `src/components/console/` | `/me/*` |
| `auth` | `src/components/auth/` | `/zh/login` |
| `docs` | `src/components/docs/` | `/docs/userguide/introduction` |
| `forms` | `src/components/forms/` | `/share/base/form/*` |

Static assets live under `public/assets/{zone}/{page}/`.

## Routing

- App Router uses **Route Groups** (`(marketing)`, `(console)`, etc.) — groups do not appear in URLs.
- Canonical paths are defined in [`src/lib/routes.ts`](src/lib/routes.ts) as `APP_ROUTES`.
- External SiliconFlow URLs are rewritten to local paths via `resolveLocalHref()` (used by `NavAnchor`).

## Link localization

Navigation and CTAs use `resolveLocalHref` for known mappings:

- `siliconflow.cn/*` → marketing routes
- `cloud.siliconflow.cn/me/*` → `/me/*`
- `account.siliconflow.cn/zh/login` → `/zh/login`
- `api-docs.siliconflow.cn` → `/docs/userguide/introduction`
- Cloned Feishu forms → `/share/base/form/...`

**Still external** (not cloned):

- News / developer-talk article detail pages (`/news/{id}`, `/developer-talk/{id}`)
- API docs subpages beyond introduction
- Feishu forms: ecosystem (`shrcnFexyHcMNEntvR08shp8Tbd`), compute (`shrcnsVyHOdT78tTRfUQo2KtO7f`)
- Legal docs on `docs.siliconflow.cn`, social links, ICP filings

## Development

```bash
# from repo root
npm install
npm run dev          # http://localhost:3000
```

## Build (static export for Cloudflare Pages)

```bash
npm run build        # outputs to apps/web/out/
```

Cloudflare Pages settings:

- **Build command:** `npm run build` (from monorepo root) or `npm run build` inside `apps/web`
- **Output directory:** `apps/web/out`
- **Node version:** 24+

Optional: `wrangler.toml` and `public/_redirects` are included for trailing-slash redirects.

Invite-only staging with Backend on an `api` subdomain: [`docs/ops/staging.md`](../../docs/ops/staging.md).

## Docker

```bash
# Static nginx (production)
docker compose up web --build

# Next.js dev server with hot reload
docker compose up web-dev --build
```

Production image (`Dockerfile.static`) serves the `out/` directory via nginx.
