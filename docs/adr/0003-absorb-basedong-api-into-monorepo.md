# Absorb basedong-api into monorepo

Supersedes the “reject absorb for now” clause in [0001-fork-new-api-as-backend.md](./0001-fork-new-api-as-backend.md).

The Backend (AGPL fork of [QuantumNous/new-api](https://github.com/QuantumNous/new-api)) lives at **`apps/api/`** in this monorepo. Customer Console remains `apps/web`. The former standalone repo `BASEDONG/basedong-api` is archived after the subtree absorb. Deploy lifecycles stay separate (two processes, two images); source and product issues share one repo.

## Considered Options

- **Keep separate basedong-api repo** — clearer AGPL boundary; dual PR/CI cost for every control-plane change.
- **Re-fork new-api into monorepo from scratch** — discards basedong probes, compose.dev, and SPA session docs already on basedong-api.
- **Absorb existing basedong-api via git subtree into `apps/api/` (chosen)** — preserves history and basedong customizations; remotes: `origin` = monorepo, `upstream-new-api` = QuantumNous/new-api; weekly subtree merge into `apps/api/`.

## Consequences

- Operator notes and probes live under `apps/api/docs/basedong.md` and `apps/api/scripts/`.
- Root `docker compose up -d --build api` builds this fork (not `calciumion/new-api:latest`).
- Admin UI remains stock under `apps/api` (served by the api process); do not confuse with `apps/web`.
- AGPL still applies to `apps/api/` (`LICENSE` / `NOTICE` there); Web stays a separate package.
- Upstream sync uses `git subtree pull --prefix=apps/api upstream-new-api main` (or equivalent); prefer upstream for Relay/payment/auth cores.
