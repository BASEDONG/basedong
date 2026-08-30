# Backend

OpenAI-compatible **Relay**, control-plane **API**, and operator **Admin** UI — AGPL fork of [new-api](https://github.com/QuantumNous/new-api) living at [`apps/api/`](../../apps/api/) in this monorepo (absorbed from the former `basedong-api` repo; see [ADR 0003](../adr/0003-absorb-basedong-api-into-monorepo.md)). Customer console stays in Web (`apps/web`). Operator notes (AGPL, upstream sync, `/api/status` probe): [`apps/api/docs/basedong.md`](../../apps/api/docs/basedong.md).

## Language

**词元**:
The billed unit of model usage (input/output token counts). This is what basedong sells as the primary retail product.
_Avoid_: Token (ambiguous — clashes with new-api's API credential entity), 令牌

**API Key**:
The credential a customer uses to call the Relay. In upstream new-api this entity is named Token; basedong customer language must not call it Token.
_Avoid_: Token, 令牌, AK (UI label only)

**额度**:
Account (and optionally per-key) remaining usage budget, denominated in internal credit that tracks 词元 consumption after pricing ratios.
_Avoid_: balance alone when you mean remaining usage budget; Token

**Relay**:
The request path that authenticates an API Key, selects an upstream Channel, converts formats, and deducts 额度.
_Avoid_: proxy (too vague), gateway (use only for the whole Backend product)

**Channel**:
An upstream provider connection (credentials + routing weight/priority + model mapping) operated by Admins — not visible as a customer Console concept.
_Avoid_: provider account, upstream key (implementation detail)

**用户**:
A customer account that can sign in, hold 额度, and create API Keys. Auth/register flows follow new-api's User/Session model, surfaced through Web.
_Avoid_: account (ambiguous), member

**管理员**:
An operator who uses the stock new-api Admin UI (no basedong brand skin) to manage Channels, users, 额度, and models — not the Web Console.
_Avoid_: root (role name only), operator (prefer 管理员 in product language)

**充值**:
Customer self-serve purchase of 额度 via Backend-built payment gateways (new-api: EPay for 支付宝/微信, Stripe/Creem/Waffo for cards/international) or redemption codes. No custom payment stack beyond enabling/configuring those gateways.
_Avoid_: 发票 (out of product scope), top-up as a separate product name in UI when 充值 is enough
