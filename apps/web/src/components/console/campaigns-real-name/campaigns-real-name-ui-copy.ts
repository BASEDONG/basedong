import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";

export type CampaignsRealNameUiCopy = {
  pageTitle: string;
  heroCopy: { subtitle: string; deadline: string };
  stepCards: {
    left: { title: string; desc: string; status: string };
    right: { title: string; desc: string; cta: string; claimed: string };
  };
  rulesHeading: string;
  rulesHtml: string;
};

const zhCN: CampaignsRealNameUiCopy = {
  pageTitle: "认证专享礼",
  heroCopy: {
    subtitle: "完成有效实名认证，领取 16 元全平台通用代金券",
    deadline: "活动有效期至 2026 年 12 月 31 日",
  },
  stepCards: {
    left: {
      title: "完成实名认证",
      desc: "仅限首次使用该证件进行实名认证的用户参与",
      status: "✅ 已认证",
    },
    right: {
      title: "领取 16 元「认证奖励券」",
      desc: "全平台通用代金券，领取之日起 180 天内有效",
      cta: "领取代金券",
      claimed: "已领取",
    },
  },
  rulesHeading: "活动规则",
  rulesHtml: `
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
<p>本活动适用于<strong>八色鸫中文站</strong>（<a href="/me/models" target="_blank" rel="noreferrer">/me/models</a>）：</p>
<ul>
<li>注册后首次完成有效实名认证的用户（含新老用户）均可获得认证奖励。</li>
</ul>
<h4>四、代金券使用规则</h4>
<p>本次活动期间，「认证奖励券」作为平台代金券，遵循以下规则：</p>
<ul>
<li><strong>适用范围：</strong> 可在八色鸫中文站（<a href="/me/models" target="_blank" rel="noreferrer">/me/models</a>）全站通用，适用于平台所有模型的 API 调用、批量推理、微调训练等使用场景；</li>
<li><strong>有效期：</strong> 自领取之日起 180 天内有效，逾期自动失效；</li>
<li><strong>查看路径：</strong> 登录控制台 → 【账户】 → 【充值】 → 【我的代金券】，即可查看代金券详情及有效期。</li>
</ul>
<h5>特别说明</h5>
<ul>
<li>所有代金券仅限本人账户在八色鸫中文站（<a href="/me/models" target="_blank" rel="noreferrer">/me/models</a>）内使用，不得转让、转售、提现或折现；</li>
<li>代金券及相关奖励仅可用于平台产品与服务消费，不得用于任何形式的商业交易；</li>
<li>为确保活动公平，严禁奖励转卖、恶意注册、刷单等违规行为，平台有权取消违规账户的奖励资格，并追究相关责任；</li>
<li>在法律允许范围内，本活动的最终解释权归八色鸫所有。</li>
</ul>
<h4>五、常见问题解答（FAQ）</h4>
<h5>1. 为什么需要实名认证？</h5>
<p>为符合国内相关监管要求，八色鸫平台所有活动均要求用户完成实名认证后方可领取奖励或使用部分功能。</p>
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
`.trim(),
};

const en: CampaignsRealNameUiCopy = {
  pageTitle: "Verification reward",
  heroCopy: {
    subtitle:
      "Complete valid identity verification and claim a ¥16 platform-wide voucher",
    deadline: "Valid through December 31, 2026",
  },
  stepCards: {
    left: {
      title: "Complete identity verification",
      desc: "Only users verifying with this ID document for the first time are eligible",
      status: "✅ Verified",
    },
    right: {
      title: 'Claim your ¥16 "Verification reward voucher"',
      desc: "Platform-wide voucher, valid for 180 days from claim date",
      cta: "Claim voucher",
      claimed: "Claimed",
    },
  },
  rulesHeading: "Campaign rules",
  rulesHtml: `
<h4>1. Campaign period</h4>
<p>Now through December 31, 2026</p>
<h4>2. Campaign details</h4>
<p>All users (new and existing) who complete valid identity verification for the first time after registration receive one <strong>¥16 Verification reward voucher</strong>.</p>
<p>📢 <strong>Note:</strong></p>
<ul>
<li>The Verification reward voucher is a one-time reward—each user may claim it once.</li>
<li>Whether you verify for the first time during the campaign (individual or organization) or verified before the campaign, you may claim manually during the campaign period.</li>
<li>Changing verification subject or duplicate verification will not trigger another issuance.</li>
</ul>
<h4>3. Eligibility</h4>
<p>This campaign applies to the <strong>basedong Chinese site</strong> (<a href="/me/models" target="_blank" rel="noreferrer">/me/models</a>):</p>
<ul>
<li>Users who complete valid first-time identity verification after registration (new or existing) qualify for the verification reward.</li>
</ul>
<h4>4. Voucher usage rules</h4>
<p>During this campaign, Verification reward vouchers follow these rules:</p>
<ul>
<li><strong>Scope:</strong> Valid site-wide on the basedong Chinese site (<a href="/me/models" target="_blank" rel="noreferrer">/me/models</a>) for all models' API calls, batch inference, fine-tuning, and other services;</li>
<li><strong>Validity:</strong> 180 days from claim date; expires automatically after that;</li>
<li><strong>Where to view:</strong> Console → Account → Top-up → My vouchers.</li>
</ul>
<h5>Additional terms</h5>
<ul>
<li>Vouchers may only be used by the account holder on the basedong Chinese site (<a href="/me/models" target="_blank" rel="noreferrer">/me/models</a>); they cannot be transferred, resold, withdrawn, or exchanged for cash;</li>
<li>Vouchers and related rewards may only be used for platform products and services, not for commercial trading;</li>
<li>To ensure fairness, reselling rewards, fraudulent registration, order manipulation, and other violations are prohibited; basedong may revoke rewards and pursue liability;</li>
<li>Basedong reserves final interpretation of this campaign within applicable law.</li>
</ul>
<h4>5. FAQ</h4>
<h5>1. Why is identity verification required?</h5>
<p>To comply with applicable regulations, basedong requires identity verification before users can claim rewards or use certain features.</p>
<h5>2. When will my Verification reward voucher be available?</h5>
<p>After meeting the conditions, you must manually claim the voucher on the <strong>Verification reward page</strong>.
If you do not see the claim option, confirm your verification succeeded, or <a href="/share/base/form/shrcnDiK9EIkGN3sK0PepqN1Ppb?hide_subject_id=1&amp;hide_passport_id=1&amp;hide_phone=1&amp;hide_email=1" target="_blank" rel="noreferrer">contact support</a>.</p>
<h5>3. What is "duplicate verification"? Why is no reward issued?</h5>
<p>"Duplicate verification" means submitting identity verification again after a valid verification—by changing identity details, unbinding and rebinding, or reusing the same identity information.
To prevent abuse, duplicate verification does not trigger a new reward voucher.</p>
<h5>4. Voucher vs. balance usage order</h5>
<p>At checkout, the platform <strong>uses eligible vouchers first</strong> (earliest expiry first).
When voucher balance is insufficient or exhausted, account balance is used automatically.</p>
<h5>5. What does "platform-wide" mean for vouchers?</h5>
<p>Vouchers apply to products and services listed on the platform when you claim them.
Product availability may change; the usable scope is based on <strong>what is available on the day you claim</strong>.</p>
<h5>6. I am already registered—can I still get the Verification reward voucher?</h5>
<p>Yes.</p>
<ul>
<li><strong>Existing users not yet verified:</strong> Complete first-time verification during the campaign to claim one ¥16 Verification reward voucher;</li>
<li><strong>Existing verified users:</strong> Manually claim one ¥16 Verification reward voucher on the campaign page.</li>
</ul>
`.trim(),
};

const zhTW: CampaignsRealNameUiCopy = {
  ...zhCN,
  pageTitle: "認證專享禮",
  heroCopy: {
    subtitle: "完成有效實名認證，領取 16 元全平台通用代金券",
    deadline: "活動有效期至 2026 年 12 月 31 日",
  },
  stepCards: {
    left: {
      title: "完成實名認證",
      desc: "僅限首次使用該證件進行實名認證的用戶參與",
      status: "✅ 已認證",
    },
    right: {
      title: "領取 16 元「認證獎勵券」",
      desc: "全平台通用代金券，領取之日起 180 天內有效",
      cta: "領取代金券",
      claimed: "已領取",
    },
  },
  rulesHeading: "活動規則",
  rulesHtml: `
<h4>一、活動時間</h4>
<p>即日起至 2026 年 12 月 31 日</p>
<h4>二、活動內容</h4>
<p>所有用戶（含新註冊與既有用戶），在註冊後首次完成有效實名認證，即可獲得面值 <strong>¥16 的「認證獎勵券」</strong> 1 張。</p>
<p>📢 <strong>說明：</strong></p>
<ul>
<li>「認證獎勵券」為一次性獎勵，每位用戶僅可領取 1 次。</li>
<li>無論是首次完成實名認證（個人或機構）的用戶，還是已在活動前通過實名認證的用戶，均可在活動期間手動領取。</li>
<li>若發生更換認證主體或重複認證，將不再重複發放。</li>
</ul>
<h4>三、適用對象</h4>
<p>本活動適用於<strong>八色鸫中文站</strong>（<a href="/me/models" target="_blank" rel="noreferrer">/me/models</a>）：</p>
<ul>
<li>註冊後首次完成有效實名認證的用戶（含新老用戶）均可獲得認證獎勵。</li>
</ul>
<h4>四、代金券使用規則</h4>
<p>本次活動期間，「認證獎勵券」作為平台代金券，遵循以下規則：</p>
<ul>
<li><strong>適用範圍：</strong> 可在八色鸫中文站（<a href="/me/models" target="_blank" rel="noreferrer">/me/models</a>）全站通用，適用於平台所有模型的 API 呼叫、批量推理、微調訓練等使用場景；</li>
<li><strong>有效期：</strong> 自領取之日起 180 天內有效，逾期自動失效；</li>
<li><strong>查看路徑：</strong> 登入控制台 → 【帳戶】 → 【充值】 → 【我的代金券】，即可查看代金券詳情及有效期。</li>
</ul>
<h5>特別說明</h5>
<ul>
<li>所有代金券僅限本人帳戶在八色鸫中文站（<a href="/me/models" target="_blank" rel="noreferrer">/me/models</a>）內使用，不得轉讓、轉售、提現或折現；</li>
<li>代金券及相關獎勵僅可用於平台產品與服務消費，不得用於任何形式的商業交易；</li>
<li>為確保活動公平，嚴禁獎勵轉賣、惡意註冊、刷單等違規行為，平台有權取消違規帳戶的獎勵資格，並追究相關責任；</li>
<li>在法律允許範圍內，本活動的最終解釋權歸八色鸫所有。</li>
</ul>
<h4>五、常見問題解答（FAQ）</h4>
<h5>1. 為什麼需要實名認證？</h5>
<p>為符合國內相關監管要求，八色鸫平台所有活動均要求用戶完成實名認證後方可領取獎勵或使用部分功能。</p>
<h5>2. 我的「認證獎勵券」什麼時候到帳？</h5>
<p>用戶在完成相應條件後，需在<strong>認證專享禮頁面</strong>手動領取該「認證獎勵券」。
如長時間未看到領取通知，請確認您的實名認證是否已成功，或<a href="/share/base/form/shrcnDiK9EIkGN3sK0PepqN1Ppb?hide_subject_id=1&amp;hide_passport_id=1&amp;hide_phone=1&amp;hide_email=1" target="_blank" rel="noreferrer">聯繫平台客服協助處理</a>。</p>
<h5>3. 什麼是「重複認證」？為什麼不發放獎勵？</h5>
<p>「重複認證」指用戶在已完成有效實名認證後，透過修改實名資訊、解綁並重新綁定實名等方式再次提交實名認證的行為，或者同一身份資訊被用於二次認證的行為。
為防止濫用獎勵，重複認證不會觸發新的獎勵代金券發放。</p>
<h5>4. 代金券與充值金額使用的優先順序</h5>
<p>平台在結算時將<strong>優先消耗符合使用條件的代金券</strong>（按到期時間先到先用的原則）。
當可用代金券餘額不足或已用盡後，系統將自動使用帳戶中的充值金額進行支付。</p>
<h5>5. 代金券的「全平台通用」具體指什麼？</h5>
<p>代金券可用於您領取時平台展示的在售商品和服務。
請注意，平台商品及服務會隨時更新，代金券的可用範圍以<strong>領取當日平台實際可用內容</strong>為準。</p>
<h5>6. 我是已註冊用戶，還能獲得「認證獎勵券」嗎？</h5>
<p>可以。</p>
<ul>
<li><strong>未完成實名認證的既有用戶：</strong> 在活動期間完成首次認證即可領取面值 ¥16 的「認證獎勵券」 1 張；</li>
<li><strong>已完成實名認證的既有用戶：</strong> 可在活動頁面手動領取面值 ¥16 的「認證獎勵券」 1 張。</li>
</ul>
`.trim(),
};

type RealNameFromEn = Omit<Partial<CampaignsRealNameUiCopy>, "stepCards"> & {
  stepCards?: {
    left?: Partial<CampaignsRealNameUiCopy["stepCards"]["left"]>;
    right?: Partial<CampaignsRealNameUiCopy["stepCards"]["right"]>;
  };
};

function fromEn(partial: RealNameFromEn): CampaignsRealNameUiCopy {
  return {
    ...en,
    ...partial,
    heroCopy: { ...en.heroCopy, ...partial.heroCopy },
    stepCards: {
      left: { ...en.stepCards.left, ...partial.stepCards?.left },
      right: { ...en.stepCards.right, ...partial.stepCards?.right },
    },
  };
}

const ja = fromEn({
  pageTitle: "認証特典",
  heroCopy: {
    subtitle:
      "有効な本人確認を完了し、16元の全プラットフォーム共通クーポンを受け取る",
    deadline: "2026年12月31日まで有効",
  },
  stepCards: {
    left: { status: "✅ 確認済み" },
    right: { cta: "クーポンを受け取る", claimed: "受取済み" },
  },
  rulesHeading: "キャンペーン規則",
});

const fr = fromEn({
  pageTitle: "Récompense de vérification",
  heroCopy: {
    subtitle:
      "Complétez la vérification d'identité et recevez un bon de 16 ¥",
    deadline: "Valable jusqu'au 31 décembre 2026",
  },
  rulesHeading: "Règles de la campagne",
});

const ru = fromEn({
  pageTitle: "Награда за верификацию",
  heroCopy: {
    subtitle:
      "Пройдите верификацию личности и получите ваучер на ¥16 для всей платформы",
    deadline: "Действует до 31 декабря 2026 г.",
  },
  rulesHeading: "Правила акции",
});

const vi = fromEn({
  pageTitle: "Quà xác minh danh tính",
  heroCopy: {
    subtitle:
      "Hoàn tất xác minh danh tính hợp lệ và nhận voucher ¥16 toàn nền tảng",
    deadline: "Có hiệu lực đến 31/12/2026",
  },
  rulesHeading: "Quy tắc chương trình",
});

const ko = fromEn({
  pageTitle: "인증 전용 혜택",
  heroCopy: {
    subtitle:
      "유효한 본인 인증을 완료하고 ¥16 플랫폼 전체 바우처를 받으세요",
    deadline: "2026년 12월 31일까지 유효",
  },
  rulesHeading: "이벤트 규칙",
});

const de = fromEn({
  pageTitle: "Verifizierungsbonus",
  heroCopy: {
    subtitle:
      "Schließen Sie die Identitätsprüfung ab und erhalten Sie einen ¥16-Gutschein",
    deadline: "Gültig bis 31. Dezember 2026",
  },
  rulesHeading: "Aktionsregeln",
});

const es = fromEn({
  pageTitle: "Recompensa por verificación",
  heroCopy: {
    subtitle:
      "Completa la verificación de identidad y reclama un vale de ¥16",
    deadline: "Válido hasta el 31 de diciembre de 2026",
  },
  rulesHeading: "Reglas de la campaña",
});

const ptBR = fromEn({
  pageTitle: "Recompensa de verificação",
  heroCopy: {
    subtitle:
      "Conclua a verificação de identidade e resgate um voucher de ¥16",
    deadline: "Válido até 31 de dezembro de 2026",
  },
  rulesHeading: "Regras da campanha",
});

const ar = fromEn({
  pageTitle: "مكافأة التحقق",
  heroCopy: {
    subtitle: "أكمل التحقق من الهوية واحصل على قسيمة ¥16 لكامل المنصة",
    deadline: "ساري حتى 31 ديسمبر 2026",
  },
  rulesHeading: "قواعد الحملة",
});

const hi = fromEn({
  pageTitle: "सत्यापन पुरस्कार",
  heroCopy: {
    subtitle:
      "मान्य पहचान सत्यापन पूरा करें और ¥16 का प्लेटफ़ॉर्म-वाइड वाउचर प्राप्त करें",
    deadline: "31 दिसंबर 2026 तक मान्य",
  },
  rulesHeading: "अभियान नियम",
});

const id = fromEn({
  pageTitle: "Hadiah verifikasi",
  heroCopy: {
    subtitle:
      "Selesaikan verifikasi identitas valid dan klaim voucher ¥16 seluruh platform",
    deadline: "Berlaku hingga 31 Desember 2026",
  },
  rulesHeading: "Aturan kampanye",
});

const CAMPAIGNS_REAL_NAME_UI_COPY: Record<
  TargetLocale,
  CampaignsRealNameUiCopy
> = {
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

export function getCampaignsRealNameUiCopy(
  locale: string,
): CampaignsRealNameUiCopy {
  return pickTargetCatalog(locale, CAMPAIGNS_REAL_NAME_UI_COPY);
}
