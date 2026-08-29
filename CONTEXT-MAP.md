# Context Map

## Contexts

- [Web](./apps/web/CONTEXT.md) — customer-facing SaaS console UI (marketing, console, auth, docs, forms)
- [Backend](./docs/backend/CONTEXT.md) — forked new-api in repo `basedong-api`: Relay, control-plane API, Admin UI (glossary kept here until that repo mirrors it)

## Relationships

- **Web → Backend**: Web is the customer Console and Auth UI; Backend supplies login/session, 额度/词元 billing, API Keys, model catalog, and OpenAI-compatible Relay. Web does not embed the Admin UI.
- **Admin → Backend**: Operators use the stock new-api Admin UI (no 改皮) against the same Backend. Offline / private / enterprise packaging is out of scope for this Backend phase.

## Web zones

| Zone | URL prefix | Purpose |
|------|------------|---------|
| marketing | `/`, `/about`, `/partner`, … | Public marketing site |
| console | `/me/*` | Cloud control plane |
| auth | `/zh/login` | Account login |
| docs | `/docs/*` | API documentation (introduction only) |
| forms | `/share/base/form/*` | Feishu-style contact forms |
