# Fork new-api as Backend (AGPL)

basedong’s customer Console stays in `apps/web`; the Backend is a separate repo **`basedong-api`**, forked from [QuantumNous/new-api](https://github.com/QuantumNous/new-api), providing Relay, control-plane API, and the **stock new-api Admin UI** (no brand skin). We start under **AGPL** (revisit commercial licensing when packaging/branding hardens) and **regularly merge upstream**. Web is前后端分离 and calls new-api’s HTTP APIs for auth, API Keys, 额度/充值, and model data — we do **not** replace the customer UI with new-api’s user console, and we do **not** reimplement capabilities new-api already has (payments via EPay/Stripe/etc., quota, relay). Capabilities the Console shows that new-api lacks (e.g. 发票) stay hidden / out of scope rather than being built in the fork.

## Considered Options

- **Greenfield Backend** — full control, no AGPL; months to recreate Relay/billing/admin.
- **Wrap / call a stock new-api deploy** — less code ownership; weak change control on gateway code.
- **Fork new-api; customer UI = basedong Web; Admin = upstream UI as-is (chosen)** — fastest path to a real gateway; AGPL/attribution obligations accepted for now; no Admin 改皮 so upstream merges stay cheaper.
- **Absorb fork into this monorepo** — rejected for now; Web (static) and gateway lifecycles differ — revisit after `basedong-api` stabilizes.

## Consequences

- Product language must keep **词元** (billed usage) distinct from upstream’s **Token** entity (**API Key** in basedong UI).
- Primary customers are domestic; compliance packaging (发票, 备案话术) is intentionally thin; overseas is later, mostly by enabling existing new-api gateways (e.g. Stripe) and Web i18n.
- Upstream sync is an ongoing cost; avoid deep forks of payment/relay core so merges stay cheap. Admin stays vanilla new-api UI.
