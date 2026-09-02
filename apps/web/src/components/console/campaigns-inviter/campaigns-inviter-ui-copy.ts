import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";

export type CampaignsInviterUiCopy = {
  pageTitle: string;
  heroCopy: { headline: string; deadline: string };
  benefitCards: readonly {
    title: string;
    lines: readonly string[];
    multiLine: boolean;
  }[];
  steps: readonly {
    num: string;
    label: string;
    tone: "primary" | "slate";
  }[];
  inviteOverview: {
    title: string;
    leadBold: string;
    leadRest: string;
    bullets: readonly string[];
  };
  recordsColumns: readonly [string, string, string, string];
  recordsSummary: (count: number, amount: number) => string;
  recordsEmpty: string;
  validAuthTooltip: string;
  invitePanel: {
    inviteCode: string;
    inviteLink: string;
    downloadQr: string;
    copyCode: string;
    copyLink: string;
  };
  rulesHeading?: string;
  rulesHtml: string;
};

const zhCN: CampaignsInviterUiCopy = {
  pageTitle: "推荐官计划",
  heroCopy: {
    headline: "邀请好友赢全平台通用代金券",
    deadline: "活动有效期至 2026 年 12 月 31 日",
  },
  benefitCards: [
    {
      title: "金额更高",
      lines: ["邀请越多奖励越多", "(无限累计奖励)"],
      multiLine: true,
    },
    {
      title: "适用范围更广",
      lines: ["全平台模型与服务均可使用"],
      multiLine: false,
    },
    {
      title: "极速到账",
      lines: ["奖励发放自动、透明、可追踪"],
      multiLine: false,
    },
  ],
  steps: [
    { num: "01", label: "成为推荐官", tone: "primary" },
    { num: "02", label: "邀请好友", tone: "primary" },
    { num: "03", label: "好友注册&认证", tone: "slate" },
    { num: "04", label: "赢取奖励", tone: "slate" },
  ],
  inviteOverview: {
    title: "活动概述：",
    leadBold: "已完成实名认证",
    leadRest:
      "的用户，可作为「八色鸫推荐官」通过个人专属邀请链接或邀请码 邀请新用户：",
    bullets: [
      "当被邀请人完成注册及实名认证后，邀请人可获得面值 ¥16 元 「推荐官奖励券」1 张；",
      "每成功邀请 1 名符合条件的新用户，即可获得 1 张代金券，邀请人数与奖励次数在活动有效期内不设上限；",
    ],
  },
  recordsColumns: ["用户 ID", "注册时间", "认证状态", "是否有效认证"],
  recordsSummary: (count, amount) =>
    `累计已完成 ${count} 次有效推荐，共获得 ${amount} 元代金券`,
  recordsEmpty: "暂无数据",
  validAuthTooltip: "有效认证说明",
  invitePanel: {
    inviteCode: "邀请码",
    inviteLink: "邀请链接",
    downloadQr: "下载二维码",
    copyCode: "复制邀请码",
    copyLink: "复制邀请链接",
  },
  rulesHtml: `
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
<p>本活动适用于<strong>八色鸫中文站</strong>（<a href="/me/models">/me/models</a>）：</p>
<ul>
<li>已完成实名认证的用户，可通过个人专属邀请链接或邀请码邀请新用户注册；</li>
<li>仅实名认证用户的有效邀请可获得对应的推荐奖励。</li>
</ul>
<h4>四、代金券使用规则</h4>
<p>本次活动期间，「推荐官奖励券」作为平台代金券，均遵循以下规则：</p>
<ul>
<li><strong>适用范围：</strong> 可在八色鸫中文站（<a href="/me/models">/me/models</a>）全站通用，适用于平台所有模型的 API 调用、批量推理、微调训练等使用场景；</li>
<li><strong>有效期：</strong> 自发放之日起 180 天内有效，逾期自动失效；</li>
<li><strong>查看路径：</strong> 登录控制台 → 【账户】 → 【充值】 → 【我的代金券】，即可查看代金券详情及有效期。</li>
</ul>
<h4>五、FAQ</h4>
<h5>1. 为什么本次活动需要实名认证？</h5>
<p>为符合国内相关监管要求，八色鸫平台所有活动均要求用户完成实名认证后方可领取奖励或使用部分功能。</p>
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
`.trim(),
};

const en: CampaignsInviterUiCopy = {
  pageTitle: "Referral Ambassador Program",
  heroCopy: {
    headline: "Invite friends and earn platform-wide vouchers",
    deadline: "Valid through December 31, 2026",
  },
  benefitCards: [
    {
      title: "Higher rewards",
      lines: ["More invites, more rewards", "(Unlimited cumulative rewards)"],
      multiLine: true,
    },
    {
      title: "Broader coverage",
      lines: ["Usable across all platform models and services"],
      multiLine: false,
    },
    {
      title: "Fast payout",
      lines: ["Automatic, transparent, and traceable reward delivery"],
      multiLine: false,
    },
  ],
  steps: [
    { num: "01", label: "Become an ambassador", tone: "primary" },
    { num: "02", label: "Invite friends", tone: "primary" },
    { num: "03", label: "Friend registers & verifies", tone: "slate" },
    { num: "04", label: "Earn rewards", tone: "slate" },
  ],
  inviteOverview: {
    title: "Overview:",
    leadBold: "Users who have completed identity verification",
    leadRest:
      " can act as a basedong Referral Ambassador and invite new users via a personal invite link or code:",
    bullets: [
      "When an invitee completes registration and identity verification, the inviter receives one ¥16 Referral Ambassador voucher;",
      "Each eligible new user successfully invited earns one voucher. There is no cap on invites or rewards during the campaign period;",
    ],
  },
  recordsColumns: [
    "User ID",
    "Registered",
    "Verification status",
    "Valid verification",
  ],
  recordsSummary: (count, amount) =>
    `Completed ${count} valid referral${count === 1 ? "" : "s"}, earned ¥${amount} in vouchers`,
  recordsEmpty: "No data",
  validAuthTooltip: "Valid verification info",
  invitePanel: {
    inviteCode: "Invite code",
    inviteLink: "Invite link",
    downloadQr: "Download QR code",
    copyCode: "Copy invite code",
    copyLink: "Copy invite link",
  },
  rulesHtml: `
<h4>1. Campaign period</h4>
<p>Now through December 31, 2026</p>
<h4>2. Campaign details</h4>
<p>Users who have completed identity verification can act as a Referral Ambassador and invite new users via a personal invite link or code:</p>
<ul>
<li>When an invitee completes registration and identity verification, the inviter receives one <strong>¥16 Referral Ambassador voucher</strong>;</li>
<li>Each successful invite of an eligible new user earns one reward voucher;</li>
<li>There is no cap on invites or rewards during the campaign period.</li>
</ul>
<p>📢 <strong>Note:</strong>
Invitees must be new users completing identity verification for the first time (including organization accounts). Duplicate verification, fraudulent registration, or other violations will invalidate the referral record and no reward will be issued.</p>
<h4>3. Eligibility</h4>
<p>This campaign applies to the <strong>basedong Chinese site</strong> (<a href="/me/models">/me/models</a>):</p>
<ul>
<li>Verified users may invite new users to register via a personal invite link or code;</li>
<li>Only valid invites from verified users qualify for referral rewards.</li>
</ul>
<h4>4. Voucher usage rules</h4>
<p>During this campaign, Referral Ambassador vouchers follow these rules:</p>
<ul>
<li><strong>Scope:</strong> Valid site-wide on the basedong Chinese site (<a href="/me/models">/me/models</a>) for all models' API calls, batch inference, fine-tuning, and other services;</li>
<li><strong>Validity:</strong> 180 days from issuance; expires automatically after that;</li>
<li><strong>Where to view:</strong> Console → Account → Top-up → My vouchers.</li>
</ul>
<h4>5. FAQ</h4>
<h5>1. Why is identity verification required for this campaign?</h5>
<p>To comply with applicable regulations, basedong requires identity verification before users can claim rewards or use certain features.</p>
<h5>2. When will my Referral Ambassador voucher arrive?</h5>
<p>After the conditions are met, the system automatically issues the voucher within <strong>1–5 minutes</strong>.
If it has not arrived, confirm that the invitee's verification succeeded, or <a href="/share/base/form/shrcnDiK9EIkGN3sK0PepqN1Ppb?hide_subject_id=1&amp;hide_passport_id=1&amp;hide_phone=1&amp;hide_email=1">contact support</a>.</p>
<h5>3. What is "duplicate verification"? Why is no reward issued?</h5>
<p>"Duplicate verification" means submitting identity verification again after a valid verification—by changing identity details, unbinding and rebinding, or reusing the same identity information.
To prevent abuse, duplicate verification does not trigger a new reward voucher.</p>
<h5>4. Voucher vs. balance usage order</h5>
<p>At checkout, the platform <strong>uses eligible vouchers first</strong> (earliest expiry first).
When voucher balance is insufficient or exhausted, account balance is used automatically.</p>
<h5>5. What does "platform-wide" mean for vouchers?</h5>
<p>Vouchers apply to products and services listed on the platform when you receive them.
Product availability may change; the usable scope is based on <strong>what is available on the day you receive the voucher</strong>.</p>
<h5>6. I am already registered—is my original invite link or code still valid?</h5>
<p>Yes, your original invite link or code remains valid.</p>
<ul>
<li><strong>Verified users:</strong> Continue inviting with your existing link; new valid invites during this campaign earn rewards automatically;</li>
<li><strong>Unverified users:</strong> Complete identity verification and claim your Referral Ambassador status to qualify for rewards.</li>
</ul>
`.trim(),
};

const zhTW: CampaignsInviterUiCopy = {
  ...zhCN,
  pageTitle: "推薦官計畫",
  heroCopy: {
    headline: "邀請好友贏全平台通用代金券",
    deadline: "活動有效期至 2026 年 12 月 31 日",
  },
  benefitCards: [
    {
      title: "金額更高",
      lines: ["邀請越多獎勵越多", "(無限累計獎勵)"],
      multiLine: true,
    },
    {
      title: "適用範圍更廣",
      lines: ["全平台模型與服務均可使用"],
      multiLine: false,
    },
    {
      title: "極速到帳",
      lines: ["獎勵發放自動、透明、可追蹤"],
      multiLine: false,
    },
  ],
  steps: [
    { num: "01", label: "成為推薦官", tone: "primary" },
    { num: "02", label: "邀請好友", tone: "primary" },
    { num: "03", label: "好友註冊&認證", tone: "slate" },
    { num: "04", label: "贏取獎勵", tone: "slate" },
  ],
  inviteOverview: {
    title: "活動概述：",
    leadBold: "已完成實名認證",
    leadRest:
      "的用戶，可作為「八色鸫推薦官」透過個人專屬邀請連結或邀請碼 邀請新用戶：",
    bullets: [
      "當被邀請人完成註冊及實名認證後，邀請人可獲得面值 ¥16 元 「推薦官獎勵券」1 張；",
      "每成功邀請 1 名符合條件的新用戶，即可獲得 1 張代金券，邀請人數與獎勵次數在活動有效期內不設上限；",
    ],
  },
  recordsColumns: ["使用者 ID", "註冊時間", "認證狀態", "是否有效認證"],
  recordsSummary: (count, amount) =>
    `累計已完成 ${count} 次有效推薦，共獲得 ${amount} 元代金券`,
  recordsEmpty: "暫無資料",
  validAuthTooltip: "有效認證說明",
  invitePanel: {
    inviteCode: "邀請碼",
    inviteLink: "邀請連結",
    downloadQr: "下載二維碼",
    copyCode: "複製邀請碼",
    copyLink: "複製邀請連結",
  },
  rulesHtml: `
<h4>一、活動時間</h4>
<p>即日起至 2026 年 12 月 31 日</p>
<h4>二、活動內容</h4>
<p>已完成實名認證的用戶，可作為「推薦官」透過個人專屬邀請連結或邀請碼邀請新用戶：</p>
<ul>
<li>當被邀請人完成註冊及實名認證後，邀請人可獲得面值 <strong>¥16 元「推薦官獎勵券」</strong> 1 張；</li>
<li>每成功邀請 1 名符合條件的新用戶，即可獲得 1 張獎勵代金券；</li>
<li>邀請人數與獎勵次數在活動有效期內不設上限。</li>
</ul>
<p>📢 <strong>說明：</strong>
被邀請人須為首次完成實名認證的新用戶（含機構用戶）。如存在重複認證、虛假註冊或其他違規行為，該邀請記錄將被視為無效，且不予發放獎勵。</p>
<h4>三、適用對象</h4>
<p>本活動適用於<strong>八色鸫中文站</strong>（<a href="/me/models">/me/models</a>）：</p>
<ul>
<li>已完成實名認證的用戶，可透過個人專屬邀請連結或邀請碼邀請新用戶註冊；</li>
<li>僅實名認證用戶的有效邀請可獲得對應的推薦獎勵。</li>
</ul>
<h4>四、代金券使用規則</h4>
<p>本次活動期間，「推薦官獎勵券」作為平台代金券，均遵循以下規則：</p>
<ul>
<li><strong>適用範圍：</strong> 可在八色鸫中文站（<a href="/me/models">/me/models</a>）全站通用，適用於平台所有模型的 API 呼叫、批量推理、微調訓練等使用場景；</li>
<li><strong>有效期：</strong> 自發放之日起 180 天內有效，逾期自動失效；</li>
<li><strong>查看路徑：</strong> 登入控制台 → 【帳戶】 → 【充值】 → 【我的代金券】，即可查看代金券詳情及有效期。</li>
</ul>
<h4>五、FAQ</h4>
<h5>1. 為什麼本次活動需要實名認證？</h5>
<p>為符合國內相關監管要求，八色鸫平台所有活動均要求用戶完成實名認證後方可領取獎勵或使用部分功能。</p>
<h5>2. 我的「推薦官獎勵券」什麼時候到帳？</h5>
<p>在完成相應條件後，系統會在 <strong>1～5 分鐘</strong>內自動發放代金券至帳戶。
如長時間未到帳，請確認被邀請人實名認證是否已成功，或<a href="/share/base/form/shrcnDiK9EIkGN3sK0PepqN1Ppb?hide_subject_id=1&amp;hide_passport_id=1&amp;hide_phone=1&amp;hide_email=1">聯繫平台客服核實處理</a>。</p>
<h5>3. 什麼是「重複認證」？為什麼不發放獎勵？</h5>
<p>「重複認證」指用戶在已完成有效實名認證後，透過修改實名資訊、解綁並重新綁定實名等方式再次提交實名認證的行為，或者同一身份資訊被用於二次認證的行為。
為防止濫用獎勵，重複認證不會觸發新的獎勵代金券發放。</p>
<h5>4. 代金券與充值金額使用的優先順序</h5>
<p>平台在結算時將<strong>優先消耗符合使用條件的代金券</strong>（按到期時間先到先用的原則）。
當可用代金券餘額不足或已用盡後，系統將自動使用帳戶中的充值金額進行支付。</p>
<h5>5. 代金券的「全平台通用」具體指什麼？</h5>
<p>代金券可用於您領取時平台展示的在售商品和服務。
請注意，平台商品及服務會隨時更新，代金券的可用範圍以<strong>領取當日平台實際可用內容</strong>為準。</p>
<h5>6. 我已是平台註冊用戶，原邀請連結 / 邀請碼是否有效？</h5>
<p>原邀請連結 / 邀請碼依舊有效。</p>
<ul>
<li><strong>已認證用戶：</strong> 可使用原邀請連結進行邀請，本活動期間新增有效邀請，獎勵將自動到帳；</li>
<li><strong>未認證用戶：</strong> 需完成實名認證後認領「推薦官」身份，方可獲得邀請獎勵資格。</li>
</ul>
`.trim(),
};

function fromEn(
  partial: Partial<CampaignsInviterUiCopy>,
): CampaignsInviterUiCopy {
  return {
    ...en,
    ...partial,
    heroCopy: { ...en.heroCopy, ...partial.heroCopy },
    inviteOverview: { ...en.inviteOverview, ...partial.inviteOverview },
    invitePanel: { ...en.invitePanel, ...partial.invitePanel },
    benefitCards: partial.benefitCards ?? en.benefitCards,
    steps: partial.steps ?? en.steps,
    recordsColumns: partial.recordsColumns ?? en.recordsColumns,
    recordsSummary: partial.recordsSummary ?? en.recordsSummary,
  };
}

const ja = fromEn({
  pageTitle: "紹介アンバサダープログラム",
  heroCopy: {
    headline: "友達を招待して全プラットフォーム共通クーポンを獲得",
    deadline: "2026年12月31日まで有効",
  },
  recordsEmpty: "データなし",
});

const fr = fromEn({
  pageTitle: "Programme ambassadeur",
  heroCopy: {
    headline: "Invitez des amis et gagnez des bons plateforme",
    deadline: "Valable jusqu'au 31 décembre 2026",
  },
});

const ru = fromEn({
  pageTitle: "Программа реферальных амбассадоров",
  heroCopy: {
    headline: "Приглашайте друзей и получайте ваучеры платформы",
    deadline: "Действует до 31 декабря 2026 г.",
  },
});

const vi = fromEn({
  pageTitle: "Chương trình đại sứ giới thiệu",
  heroCopy: {
    headline: "Mời bạn bè nhận voucher dùng toàn nền tảng",
    deadline: "Có hiệu lực đến 31/12/2026",
  },
});

const ko = fromEn({
  pageTitle: "추천 앰배서더 프로그램",
  heroCopy: {
    headline: "친구를 초대하고 플랫폼 전체 바우처를 받으세요",
    deadline: "2026년 12월 31일까지 유효",
  },
});

const de = fromEn({
  pageTitle: "Empfehlungsbotschafter-Programm",
  heroCopy: {
    headline: "Freunde einladen und plattformweite Gutscheine gewinnen",
    deadline: "Gültig bis 31. Dezember 2026",
  },
});

const es = fromEn({
  pageTitle: "Programa de embajadores de referidos",
  heroCopy: {
    headline: "Invita amigos y gana vales para toda la plataforma",
    deadline: "Válido hasta el 31 de diciembre de 2026",
  },
});

const ptBR = fromEn({
  pageTitle: "Programa embaixador de indicações",
  heroCopy: {
    headline: "Convide amigos e ganhe vouchers para toda a plataforma",
    deadline: "Válido até 31 de dezembro de 2026",
  },
});

const ar = fromEn({
  pageTitle: "برنامج سفراء الإحالة",
  heroCopy: {
    headline: "ادعُ الأصدقاء واحصل على قسائم لكامل المنصة",
    deadline: "ساري حتى 31 ديسمبر 2026",
  },
});

const hi = fromEn({
  pageTitle: "रेफ़रल एंबेसेडर कार्यक्रम",
  heroCopy: {
    headline: "मित्रों को आमंत्रित करें और प्लेटफ़ॉर्म-वाइड वाउचर जीतें",
    deadline: "31 दिसंबर 2026 तक मान्य",
  },
});

const id = fromEn({
  pageTitle: "Program duta referral",
  heroCopy: {
    headline: "Undang teman dan dapatkan voucher seluruh platform",
    deadline: "Berlaku hingga 31 Desember 2026",
  },
});

const CAMPAIGNS_INVITER_UI_COPY: Record<TargetLocale, CampaignsInviterUiCopy> =
  {
    "zh-CN": zhCN,
    en,
    "zh-TW": zhTW,
    ja,
    fr,
    ru,
    vi,
    ko,
    de,
    es,
    "pt-BR": ptBR,
    ar,
    hi,
    id,
  };

export function getCampaignsInviterUiCopy(
  locale: string,
): CampaignsInviterUiCopy {
  return pickTargetCatalog(locale, CAMPAIGNS_INVITER_UI_COPY);
}
