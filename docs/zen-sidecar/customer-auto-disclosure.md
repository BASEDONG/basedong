# Model `auto` — customer disclosure

Use this copy for customer-facing documentation, Console help, and sales/support. Terms match the product glossary in [`apps/zen-sidecar/CONTEXT.md`](../../apps/zen-sidecar/CONTEXT.md).

## What is `auto`?

**`auto`** is a stable model name on the basedong API. Each request is served by the **Zen Sidecar**, which selects a live member of the current **Free Pool** — rotating free coding models from **Anonymous Zen** (OpenCode Zen’s anonymous free tier).

You do not need to track changing free model ids; call **`auto`** like any other model in `POST /v1/chat/completions`.

## Important limitations

### Third-party anonymous free tier

- Traffic for **`auto`** is routed through basedong’s private **Zen Sidecar** to **Anonymous Zen** upstream providers.
- This is **not** a dedicated private model or BYOK Zen balance.
- Availability and quality depend on third-party free-tier capacity and may change when the **Free Pool** updates.

### Possible use for model improvement

Providers on the anonymous free path **may use prompts and outputs to improve their models**, consistent with typical free-tier terms. Treat **`auto`** as **unsuitable for confidential, regulated, or secret data** (credentials, PII, trade secrets, unreleased code, etc.).

### Shared site limits

Free-tier rate limits apply to basedong’s **site egress IP** (one shared bucket in v1), **not** per-customer IP. Heavy `auto` usage can hit shared limits; retries and model rotation are handled inside the Sidecar where possible.

## What you should use instead

For production workloads with confidentiality or SLA requirements, use **paid models** and channels configured for your compliance needs — not **`auto`**.

## Technical notes (optional)

- Responses may include the **real upstream model id** in the JSON `model` field (for logging and support).
- Streaming is supported; the Sidecar does not silently switch models after stream body bytes have started.
- basedong **API Key** authenticates you to the Relay. It is **not** the Sidecar Credential and not a Zen key.

## See also

- Operator setup: [`runbook.md`](./runbook.md)
- API reference: `/docs/api` (chat completions)
