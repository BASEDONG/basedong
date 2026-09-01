# Context Map

## Contexts

- [Web](./apps/web/CONTEXT.md) — customer-facing SaaS console UI (marketing, console, auth, docs, forms)
- [Backend](./docs/backend/CONTEXT.md) — glossary for the gateway; code lives in [`apps/api/`](./apps/api/) (new-api fork: Relay, control-plane API, Admin UI)
- [Zen Sidecar](./apps/zen-sidecar/CONTEXT.md) — private Zen free-pool adapter (catalog sync, `auto`, protocol split, retry); not a second New API

## Relationships

- **Web → Backend**: Web is the customer Console and Auth UI; Backend supplies login/session, 额度/词元 billing, API Keys, model catalog, and OpenAI-compatible Relay. Web does not embed the Admin UI.
- **Admin → Backend**: Operators use the stock new-api Admin UI (no 改皮) against the same Backend process under `apps/api`. Offline / private / enterprise packaging is out of scope for this Backend phase.
- **Backend → Zen Sidecar**: One Admin Channel (`BaseURL` → Sidecar, `Models` includes `auto`, Channel.Key = Sidecar Credential). Sidecar holds Anonymous Zen upstream identity; customers never reach the Sidecar. Operator runbook: [`docs/zen-sidecar/runbook.md`](./docs/zen-sidecar/runbook.md).

## Web zones

| Zone | URL prefix | Purpose |
|------|------------|---------|
| marketing | `/`, `/about`, `/partner`, … | Public marketing site |
| console | `/me/*` | Cloud control plane |
| auth | `/zh/login` | Account login |
| docs | `/docs/*` | API documentation (introduction only) |
| forms | `/share/base/form/*` | Feishu-style contact forms |
