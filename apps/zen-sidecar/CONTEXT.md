# Zen Sidecar

Thin upstream adapter in front of OpenCode Zen’s anonymous free tier. New API keeps a single Channel pointed here; customers never talk to this container. Holds catalog sync, Free Pool membership, `auto` selection, protocol split, retry, and (later) egress — not users, 额度, or a model marketplace.

## Language

**Zen Sidecar**:
The private OpenAI-compatible adapter container that New API reaches as one Channel upstream. Not a second control plane.
_Avoid_: proxy (clashes with Backend Relay language), gateway (reserved for the whole Backend product), second New API

**Free Pool**:
The live set of Zen model ids eligible for `auto`: catalog candidates that match free rules and currently pass probe.
_Avoid_: hardcoded seven models, full Zen catalog, paid Zen directory

**auto**:
The stable customer-facing model name on the New API Channel. Sidecar maps each `auto` call onto one member of the current Free Pool.
_Avoid_: exposing raw free ids as the only product model (direct ids are ops/debug only)

**Sidecar Credential**:
The shared secret New API stores as Channel.Key and sends to the Sidecar. Never the upstream Zen credential.
_Avoid_: putting Zen keys or `public` in New API’s Channel.Key field as if they were interchangeable with Sidecar auth

**Anonymous Zen**:
Upstream auth mode using Zen’s public/anonymous free path (with client headers the free tier expects), quota typically per egress IP.
_Avoid_: calling this BYOK; conflating Sidecar Credential with upstream identity

**Catalog Sync**:
Periodic refresh from Zen’s models list (and related free/protocol metadata sources) that updates Free Pool candidates; on failure, last successful cache is kept.
_Avoid_: scraping Zen marketing HTML for prices as the sole source of truth

**Probe**:
A cheap live check that decides whether a free candidate stays in the Free Pool (same idea as community Zen free adapters’ auto-sync). Failure removes or demotes; recovery can re-admit.
_Avoid_: using probe alone against the full paid catalog to define “free”
