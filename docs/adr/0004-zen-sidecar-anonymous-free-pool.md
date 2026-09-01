# Zen Sidecar uses Anonymous Zen free pool behind one New API Channel

basedong exposes a stable model name `auto` through New API. Dirty upstream work (free-catalog sync, probe, protocol split, retry, client-header mimicry) lives in a private **Zen Sidecar** container — not a second control plane. Upstream identity for v1 is **Anonymous Zen** (`Bearer public` plus the client headers the free tier expects), not a basedong-owned Zen balance. Free membership is catalog ∩ (`*-free` ∨ allowlist) then probe; `auto` never silently includes paid Zen. Egress is a single site IP bucket; rotating proxies to beat limits is explicitly out of product scope. Customers are told that `auto` may feed third-party model improvement and is unfit for confidential data.

## Status

accepted

## Considered Options

- **BYOK Zen key as default** — stabler quotas, but forces billing/top-up ops and contradicts the chosen “no Zen balance in basedong” posture.
- **Put free-pool logic inside New API** — couples dirty UA/protocol/retry code to the AGPL fork and slows upstream merges.
- **Ship Sub2API (or similar) beside New API** — duplicates users/keys/billing; rejected. Sidecar sits at the CPA-like layer only.
- **Anonymous Zen + Sidecar (chosen)** — matches how community Zen free proxies work; New API stays one Channel; retry budget stays inside the Sidecar so VIP clients see success or one clear failure.

## Consequences

- Site-wide free-tier rate limits apply to the Sidecar egress IP, not per customer.
- PoC may run stock [opencode2api](https://github.com/jasonxu114514/opencode2api) under compose before a slimmed fork or greenfield replace; New API `BaseURL` should keep a stable service name.
- Glossary: [`apps/zen-sidecar/CONTEXT.md`](../../apps/zen-sidecar/CONTEXT.md).
