export const pageTitle = "推荐官计划";
export const navActiveKey = "inviter";

const BASE =
  "/assets/console/campaigns-inviter/images";

export const ASSET = {
  bannerBg: `${BASE}/inviter-banner-bg.webp`,
  bannerText: `${BASE}/inviter-banner-text-success.webp`,
  bannerImg: `${BASE}/inviter-banner-img.webp`,
  text1: `${BASE}/inviter-text-1.webp`,
  text2: `${BASE}/inviter-text-2.webp`,
  text3: `${BASE}/inviter-text-3.webp`,
  text4: `${BASE}/inviter-text-4.webp`,
  icon1: `${BASE}/inviter-icon-1.svg`,
  icon2: `${BASE}/inviter-icon-2.svg`,
  icon3: `${BASE}/inviter-icon-3.svg`,
  arrow: `${BASE}/inviter-arrow.svg`,
  cardBg: `${BASE}/inviter-card-bg.webp`,
  cardBgReverse: `${BASE}/inviter-card-bg-reverse.webp`,
  inviteQr: `${BASE}/invite-qr.png`,
} as const;

/** Demo invite identity (per-session on live site) */
export const DEMO_INVITE = {
  code: "yF5FmD6b",
  link: "/me/modelsi/yF5FmD6b",
} as const;

export const heroCopy = {
  headline: "邀请好友赢全平台通用代金券",
  deadline: "活动有效期至 2026 年 12 月 31 日",
} as const;

export const benefitCards = [
  {
    icon: ASSET.icon1,
    title: "金额更高",
    lines: ["邀请越多奖励越多", "(无限累计奖励)"] as const,
    multiLine: true,
  },
  {
    icon: ASSET.icon2,
    title: "适用范围更广",
    lines: ["全平台模型与服务均可使用"] as const,
    multiLine: false,
  },
  {
    icon: ASSET.icon3,
    title: "极速到账",
    lines: ["奖励发放自动、透明、可追踪"] as const,
    multiLine: false,
  },
] as const;

export const steps = [
  { num: "01", label: "成为推荐官", tone: "primary" as const },
  { num: "02", label: "邀请好友", tone: "primary" as const },
  { num: "03", label: "好友注册&认证", tone: "slate" as const },
  { num: "04", label: "赢取奖励", tone: "slate" as const },
] as const;

export const inviteOverview = {
  title: "活动概述：",
  leadBold: "已完成实名认证",
  leadRest:
    "的用户，可作为「硅基流动推荐官」通过个人专属邀请链接或邀请码 邀请新用户：",
  bullets: [
    "当被邀请人完成注册及实名认证后，邀请人可获得面值 ¥16 元 「推荐官奖励券」1 张；",
    "每成功邀请 1 名符合条件的新用户，即可获得 1 张代金券，邀请人数与奖励次数在活动有效期内不设上限；",
  ],
} as const;

export const recordsColumns = [
  "用户 ID",
  "注册时间",
  "认证状态",
  "是否有效认证",
] as const;

export const rulesHtml = `
<h4>一、活动时间</h4>
<p>即日起至 2026 年 12 月 31 日</p>
<h4>二、活动内容</h4>
<p>已完成实名认证的用户，可作为「推荐官」通过个人专属邀请链接或邀请码邀请新用户：</p>
<ul>
<li>当被邀请人完成注册及实名认证后，邀请人可获得面值 <strong>¥16 元「推荐官奖励券」</strong> 1 张；</li>
<li>每成功邀请 1 名符合条件的新用户，即可获得 1 张奖励代金券；</li>
<li>邀请人数与奖励次数在活动有效期内不设上限。</li>
</ul>
<p>📢 <strong>说明：</strong>
被邀请人须为首次完成实名认证的新用户（含机构用户）。如存在重复认证、虚假注册或其他违规行为，该邀请记录将被视为无效，且不予发放奖励。</p>
<h4>三、适用对象</h4>
<p>本活动适用于<strong>硅基流动中文站</strong>（<a href="/me/models">/me/models</a>）：</p>
<ul>
<li>已完成实名认证的用户，可通过个人专属邀请链接或邀请码邀请新用户注册；</li>
<li>仅实名认证用户的有效邀请可获得对应的推荐奖励。</li>
</ul>
<h4>四、代金券使用规则</h4>
<p>本次活动期间，「推荐官奖励券」作为平台代金券，均遵循以下规则：</p>
<ul>
<li><strong>适用范围：</strong> 可在硅基流动中文站（<a href="/me/models">/me/models</a>）全站通用，适用于平台所有模型的 API 调用、批量推理、微调训练等使用场景；</li>
<li><strong>有效期：</strong> 自发放之日起 180 天内有效，逾期自动失效；</li>
<li><strong>查看路径：</strong> 登录硅基流动中文站 → 【账户管理】 → 【余额充值】 → 【我的代金券】，即可查看代金券详情及有效期。</li>
</ul>
<h4>五、FAQ</h4>
<h5>1. 为什么本次活动需要实名认证？</h5>
<p>为符合国内相关监管要求，硅基流动平台所有活动均要求用户完成实名认证后方可领取奖励或使用部分功能。</p>
<h5>2. 我的「推荐官奖励券」什么时候到账？</h5>
<p>在完成相应条件后，系统会在 <strong>1～5 分钟</strong>内自动发放代金券至账户。
如长时间未到账，请确认被邀请人实名认证是否已成功，或<a href="/share/base/form/shrcnDiK9EIkGN3sK0PepqN1Ppb?hide_subject_id=1&amp;hide_passport_id=1&amp;hide_phone=1&amp;hide_email=1">联系平台客服核实处理</a>。</p>
<h5>3. 什么是“重复认证”？为什么不发放奖励？</h5>
<p>“重复认证“指用户在已完成有效实名认证后，通过修改实名信息、解绑并重新绑定实名等方式再次提交实名认证的行为，或者同一身份信息被用于二次认证的行为。
为防止滥用奖励，重复认证不会触发新的奖励代金券发放。</p>
<h5>4. 代金券与充值金额使用的优先顺序</h5>
<p>平台在结算时将<strong>优先消耗符合使用条件的代金券</strong>（按到期时间先到先用的原则）。
当可用代金券余额不足或已用尽后，系统将自动使用账户中的充值金额进行支付。</p>
<h5>5. 代金券的“全平台通用”具体指什么？</h5>
<p>代金券可用于您领取时平台展示的在售商品和服务。
请注意，平台商品及服务会随时更新，代金券的可用范围以<strong>领取当日平台实际可用内容</strong>为准。</p>
<h5>6. 我已是平台注册用户，原邀请链接 / 邀请码是否有效？</h5>
<p>原邀请链接 / 邀请码依旧有效。</p>
<ul>
<li><strong>已认证用户：</strong> 可使用原邀请链接进行邀请，本活动期间新增有效邀请，奖励将自动到账；</li>
<li><strong>未认证用户：</strong> 需完成实名认证后认领「推荐官」身份，方可获得邀请奖励资格。</li>
</ul>
`.trim();
