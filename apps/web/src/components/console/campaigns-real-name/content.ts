export const pageTitle = "认证专享礼";
export const navActiveKey = "real-name";

const BASE =
  "/assets/console/campaigns-real-name/images";

export const ASSET = {
  bannerText: `${BASE}/auth-banner-text.webp`,
  bannerImg: `${BASE}/auth-banner-img.webp`,
  authIcon: `${BASE}/auth-icon.svg`,
  ticketIcon: `${BASE}/ticket-icon.svg`,
  cardBg: `${BASE}/inviter-card-bg.webp`,
} as const;

export const heroCopy = {
  subtitle: "完成有效实名认证，领取 16 元全平台通用代金券",
  deadline: "活动有效期至 2026 年 12 月 31 日",
} as const;

export const stepCards = {
  left: {
    title: "完成实名认证",
    desc: "仅限首次使用该证件进行实名认证的用户参与",
    status: "✅ 已认证",
    icon: ASSET.authIcon,
  },
  right: {
    title: "领取 16 元「认证奖励券」",
    desc: "全平台通用代金券，领取之日起 180 天内有效",
    cta: "领取代金券",
    claimed: "已领取",
    icon: ASSET.ticketIcon,
  },
} as const;

/** Verbatim HTML from live DOM (cloud.siliconflow.cn/me/campaigns/real-name) */
export const rulesHtml = `
<h4>一、活动时间</h4>
<p>即日起至 2026 年 12 月 31 日</p>
<h4>二、活动内容</h4>
<p>所有用户（含新注册与既有用户），在注册后首次完成有效实名认证，即可获得面值 <strong>¥16 的「认证奖励券」</strong> 1 张。</p>
<p>📢 <strong>说明：</strong></p>
<ul>
<li>「认证奖励券」为一次性奖励，每位用户仅可领取 1 次。</li>
<li>无论是首次完成实名认证（个人或机构）的用户，还是已在活动前通过实名认证的用户，均可在活动期间手动领取。</li>
<li>若发生更换认证主体或重复认证，将不再重复发放。</li>
</ul>
<h4>三、适用对象</h4>
<p>本活动适用于<strong>硅基流动中文站</strong>（<a href="/me/models" target="_blank" rel="noreferrer">/me/models</a>）：</p>
<ul>
<li>注册后首次完成有效实名认证的用户（含新老用户）均可获得认证奖励。</li>
</ul>
<h4>四、代金券使用规则</h4>
<p>本次活动期间，「认证奖励券」作为平台代金券，遵循以下规则：</p>
<ul>
<li><strong>适用范围：</strong> 可在硅基流动中文站（<a href="/me/models" target="_blank" rel="noreferrer">/me/models</a>）全站通用，适用于平台所有模型的 API 调用、批量推理、微调训练等使用场景；</li>
<li><strong>有效期：</strong> 自领取之日起 180 天内有效，逾期自动失效；</li>
<li><strong>查看路径：</strong> 登录硅基流动中文站 → 【账户管理】 → 【余额充值】 → 【我的代金券】，即可查看代金券详情及有效期。</li>
</ul>
<h5>特别说明</h5>
<ul>
<li>所有代金券仅限本人账户在硅基流动中文站（<a href="/me/models" target="_blank" rel="noreferrer">/me/models</a>）内使用，不得转让、转售、提现或折现；</li>
<li>代金券及相关奖励仅可用于平台产品与服务消费，不得用于任何形式的商业交易；</li>
<li>为确保活动公平，严禁奖励转卖、恶意注册、刷单等违规行为，平台有权取消违规账户的奖励资格，并追究相关责任；</li>
<li>在法律允许范围内，本活动的最终解释权归硅基流动所有。</li>
</ul>
<h4>五、常见问题解答（FAQ）</h4>
<h5>1. 为什么需要实名认证？</h5>
<p>为符合国内相关监管要求，硅基流动平台所有活动均要求用户完成实名认证后方可领取奖励或使用部分功能。</p>
<h5>2. 我的「认证奖励券」什么时候到账？</h5>
<p>用户在完成相应条件后，需在<strong>认证专享礼页面</strong>手动领取该「认证奖励券」。
如长时间未看到领取通知，请确认您的实名认证是否已成功，或<a href="/share/base/form/shrcnDiK9EIkGN3sK0PepqN1Ppb?hide_subject_id=1&amp;hide_passport_id=1&amp;hide_phone=1&amp;hide_email=1" target="_blank" rel="noreferrer">联系平台客服协助处理</a>。</p>
<h5>3. 什么是“重复认证”？为什么不发放奖励？</h5>
<p>“重复认证”指用户在已完成有效实名认证后，通过修改实名信息、解绑并重新绑定实名等方式再次提交实名认证的行为，或者同一身份信息被用于二次认证的行为。
为防止滥用奖励，重复认证不会触发新的奖励代金券发放。</p>
<h5>4. 代金券与充值金额使用的优先顺序</h5>
<p>平台在结算时将<strong>优先消耗符合使用条件的代金券</strong>（按到期时间先到先用的原则）。
当可用代金券余额不足或已用尽后，系统将自动使用账户中的充值金额进行支付。</p>
<h5>5. 代金券的“全平台通用”具体指什么？</h5>
<p>代金券可用于您领取时平台展示的在售商品和服务。
请注意，平台商品及服务会随时更新，代金券的可用范围以<strong>领取当日平台实际可用内容</strong>为准。</p>
<h5>6. 我是已注册用户，还能获得「认证奖励券」吗？</h5>
<p>可以。</p>
<ul>
<li><strong>未完成实名认证的既有用户：</strong> 在活动期间完成首次认证即可领取面值 ¥16 的「认证奖励券」 1 张；</li>
<li><strong>已完成实名认证的既有用户：</strong> 可在活动页面手动领取面值 ¥16 的「认证奖励券」 1 张。</li>
</ul>
`.trim();
