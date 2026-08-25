# Context Map

## Contexts

- [Web](./apps/web/CONTEXT.md) — customer-facing SaaS console UI (marketing, console, auth, docs, forms)

## Relationships

- **Web → Backend** _(future)_: Web will call backend APIs for auth, billing, and model management. Current phase ships static clone output with mock data.

## Web zones

| Zone | URL prefix | Purpose |
|------|------------|---------|
| marketing | `/`, `/about`, `/partner`, … | Public marketing site |
| console | `/me/*` | Cloud control plane |
| auth | `/zh/login` | Account login |
| docs | `/docs/*` | API documentation (introduction only) |
| forms | `/share/base/form/*` | Feishu-style contact forms |
