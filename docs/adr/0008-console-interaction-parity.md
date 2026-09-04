# Console 交互对齐 (basedong skin, upstream user journeys)

Customer Console in `apps/web` keeps basedong navigation IA and visual page grammar, but **交互对齐** means full upstream new-api **user** console content: same sections, information density, and operation journeys against existing Backend self APIs. We do not curate away Backend-available user capabilities; in-page blocks follow status/self/topup configuration. Sidebar stays fixed basedong (模型广场 landing)—not upstream dynamic sidebar modules. Console language truth is **Preferred Locale** / Target Locale Set (broader than upstream), including the 个人资料 language block—not Backend `language`. Product acceptance is one full-parity gate; engineering may ship multiple PRs. Admin and SiliconFlow-only Console 下线页 stay out of scope. See `apps/web/CONTEXT.md` (**交互对齐**, 钱包, 个人资料).

## Considered Options

- **Port upstream user SPA as customer UI** — fastest journey parity; loses basedong brand, IA, and locale model; rejected.
- **Capability whitelist / thin MVP only** — smaller ship; rejected because Backend is largely unmodified and upstream user×Backend already works.
- **Full content/journey parity + basedong skin; fixed nav; Preferred Locale for language (chosen)** — preserves product IA and 14-locale Web while consuming the same self APIs upstream does.
- **Also copy upstream sidebar_modules UX** — nav parity with upstream; conflicts with 模型广场-first IA; rejected in favor of page-local Backend-driven blocks only.

## Consequences

- Parity work is measured against upstream user Profile/Wallet/Dashboard/Keys/Logs/Playground journeys and `apps/api` self routes—not against SiliconFlow clone density.
- Language preference UI must use Target Locale Set catalogs; do not shrink Console locales to upstream i18n lists.
- Incomplete slices (e.g. EPay-only wallet) are incomplete **交互对齐**, not an accepted end state, until the full user-console gate passes.
