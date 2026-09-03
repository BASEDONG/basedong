# Customer journey: Console IA (#40 / #50)

Prerequisites: local Backend (`docker compose up -d --build api`) and Web with `NEXT_PUBLIC_API_BASE` pointing at it. Sign in as a normal 用户.

## Smoke

| Step | Action | Expect |
|------|--------|--------|
| 1 | Open `/me/models` after login | 模型广场; default landing |
| 2 | Inspect sidebar | Groups: 模型 / 在线体验 / 控制台 / 记录 / 个人; Chat only under 在线体验; no image/video/TTS |
| 3 | Open `/me/overview` | 用量概览 loads self quota + `/api/data/self` (empty OK) |
| 4 | Open `/me/account/ak` | API 密钥 CRUD against Backend |
| 5 | Open `/me/logs` | 调用记录 from `/api/log/self` |
| 6 | Open `/me/logs/drawing` and `/me/logs/tasks` | Lists or honest empty from MJ/task self APIs |
| 7 | Open `/me/wallet` | 钱包: online 充值 + records; no voucher/package/auto tabs |
| 8 | Open `/me/profile` | 个人资料: view username, edit display name |
| 9 | Open `/me/playground/chat` | Chat 在线体验 (needs Channel) |
| 10 | Open `/me/bills` | Redirects to `/me/logs` |
| 11 | Open `/me/expensebill` | Redirects to `/me/wallet` |
| 12 | Open `/me/playground/image` and `/me/batches` | Console 下线页, CTA to 模型广场 |

## Optional Backend probes

Reuse from `apps/api`: `probe-auth`, `probe-playground`, `probe-epay`, `probe-redeem` as environment allows.

## Locale gate

From `apps/web`: `npm run check:console-locales` (and `npm run typecheck` after Console string changes).
