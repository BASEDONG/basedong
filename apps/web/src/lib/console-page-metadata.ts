import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";
import { APP_ROUTES } from "@/lib/routes";
import { getConsoleChromeCopy } from "@/components/console/shared/chrome-copy";
import { getApiKeysUiCopy } from "@/components/console/account-ak/account-ak-ui-copy";
import { getBillsUiCopy } from "@/components/console/bills/bills-ui-copy";
import { getExpenseBillUiCopy } from "@/components/console/expensebill/expensebill-ui-copy";
import { getInvoiceUiCopy } from "@/components/console/invoice/invoice-ui-copy";
import { getAuthUiCopy } from "@/components/console/account-authentication/account-authentication-ui-copy";
import { getModelsUiCopy } from "@/components/console/models/models-ui-copy";
import { getPlaygroundUiCopy } from "@/components/console/shared/playground-ui-copy";
import { getBatchesUiCopy } from "@/components/console/batches/batches-ui-copy";
import { getInvitationUiCopy } from "@/components/console/invitation/invitation-ui-copy";
import { getCampaignsInviterUiCopy } from "@/components/console/campaigns-inviter/campaigns-inviter-ui-copy";
import { getCampaignsRealNameUiCopy } from "@/components/console/campaigns-real-name/campaigns-real-name-ui-copy";
import { getDedicatedApplyUiCopy } from "@/components/console/dedicated-apply/dedicated-apply-ui-copy";

type PageMeta = { title: string; description: string };

const DESCRIPTIONS: Record<TargetLocale, string> = {
  "zh-CN": "在控制台浏览与筛选可用模型。",
  en: "Browse and filter available models in the Console.",
  "zh-TW": "在控制台瀏覽與篩選可用模型。",
  ja: "コンソールで利用可能なモデルを閲覧・絞り込みます。",
  fr: "Parcourez et filtrez les modèles disponibles dans la console.",
  ru: "Просматривайте и фильтруйте доступные модели в консоли.",
  vi: "Duyệt và lọc các mô hình có sẵn trong Console.",
  ko: "콘솔에서 사용 가능한 모델을 탐색하고 필터링하세요.",
  de: "Verfügbare Modelle in der Konsole durchsuchen und filtern.",
  es: "Explore y filtre los modelos disponibles en la consola.",
  "pt-BR": "Navegue e filtre os modelos disponíveis no console.",
  ar: "تصفّح نماذج لوحة التحكم وفلترها.",
  hi: "कंसोल में उपलब्ध मॉडल देखें और फ़िल्टर करें।",
  id: "Jelajahi dan filter model yang tersedia di Console.",
};

export function getConsoleModelsPageMetadata(locale: string): PageMeta {
  const copy = getModelsUiCopy(locale);
  const chrome = getConsoleChromeCopy(locale);
  const description = pickTargetCatalog(locale, DESCRIPTIONS);
  return {
    title: `${copy.pageTitle} · ${chrome.brandAlt}`,
    description,
  };
}

const AK_DESCRIPTIONS: Record<TargetLocale, string> = {
  "zh-CN": "创建与管理 API Key，用于访问 basedong Relay。",
  en: "Create and manage API Keys for accessing the basedong Relay.",
  "zh-TW": "建立與管理 API Key，用於存取 basedong Relay。",
  ja: "basedong Relay 用の API Key を作成・管理します。",
  fr: "Créez et gérez vos clés API pour accéder au Relay basedong.",
  ru: "Создание и управление API Keys для доступа к Relay basedong.",
  vi: "Tạo và quản lý API Key để truy cập Relay basedong.",
  ko: "basedong Relay 접근용 API Key를 생성하고 관리합니다.",
  de: "API Keys für den Zugriff auf das basedong Relay erstellen und verwalten.",
  es: "Cree y administre API Keys para acceder al Relay basedong.",
  "pt-BR": "Crie e gerencie API Keys para acessar o Relay basedong.",
  ar: "إنشاء وإدارة مفاتيح API للوصول إلى Relay basedong.",
  hi: "basedong Relay तक पहुँच के लिए API Keys बनाएँ और प्रबंधित करें।",
  id: "Buat dan kelola API Key untuk mengakses Relay basedong.",
};

const AUTH_DESCRIPTIONS: Record<TargetLocale, string> = {
  "zh-CN": "查看实名认证状态与账户身份信息。",
  en: "View identity verification status and account details.",
  "zh-TW": "查看實名認證狀態與帳戶身份資訊。",
  ja: "本人確認の状態とアカウント情報を確認します。",
  fr: "Consultez le statut de vérification d'identité et les informations du compte.",
  ru: "Просмотр статуса верификации личности и данных аккаунта.",
  vi: "Xem trạng thái xác minh danh tính và thông tin tài khoản.",
  ko: "본인 인증 상태 및 계정 정보를 확인합니다.",
  de: "Identitätsprüfungsstatus und Kontodaten anzeigen.",
  es: "Consulte el estado de verificación de identidad y los datos de la cuenta.",
  "pt-BR": "Veja o status de verificação de identidade e os dados da conta.",
  ar: "عرض حالة التحقق من الهوية وتفاصيل الحساب.",
  hi: "पहचान सत्यापन स्थिति और खाता विवरण देखें।",
  id: "Lihat status verifikasi identitas dan detail akun.",
};

export function getConsoleAccountAkPageMetadata(locale: string): PageMeta {
  const copy = getApiKeysUiCopy(locale);
  const chrome = getConsoleChromeCopy(locale);
  return {
    title: `${copy.pageTitle} · ${chrome.brandAlt}`,
    description: pickTargetCatalog(locale, AK_DESCRIPTIONS),
  };
}

export function getConsoleAccountAuthPageMetadata(locale: string): PageMeta {
  const copy = getAuthUiCopy(locale);
  const chrome = getConsoleChromeCopy(locale);
  return {
    title: `${copy.pageTitle} · ${chrome.brandAlt}`,
    description: pickTargetCatalog(locale, AUTH_DESCRIPTIONS),
  };
}

const BILLS_DESCRIPTIONS: Record<TargetLocale, string> = {
  "zh-CN": "查看用量明细与区间扣减额度。",
  en: "View usage detail and quota deductions for a date range.",
  "zh-TW": "查看用量明細與區間扣減額度。",
  ja: "利用明細と期間の枠差引を確認します。",
  fr: "Consultez le détail d'utilisation et les déductions de quota.",
  ru: "Просмотр детализации использования и списаний квоты.",
  vi: "Xem chi tiết sử dụng và khấu trừ hạn mức.",
  ko: "사용량 상세 및 기간별 한도 차감을 확인합니다.",
  de: "Nutzungsdetails und Kontingentabzüge im Zeitraum anzeigen.",
  es: "Consulte el detalle de uso y las deducciones de cuota.",
  "pt-BR": "Veja detalhes de uso e deduções de cota no período.",
  ar: "عرض تفاصيل الاستخدام وخصومات الحصة.",
  hi: "उपयोग विवरण और कोटा कटौती देखें।",
  id: "Lihat detail penggunaan dan pemotongan kuota.",
};

const EXPENSE_DESCRIPTIONS: Record<TargetLocale, string> = {
  "zh-CN": "在线充值、自动充值与代金券兑换。",
  en: "Online recharge, auto-recharge, and voucher redemption.",
  "zh-TW": "線上儲值、自動儲值與代金券兌換。",
  ja: "オンラインチャージ、自動チャージ、クーポン交換。",
  fr: "Recharge en ligne, recharge automatique et bons.",
  ru: "Онлайн-пополнение, автопополнение и купоны.",
  vi: "Nạp tiền trực tuyến, tự động và đổi voucher.",
  ko: "온라인 충전, 자동 충전 및 쿠폰 교환.",
  de: "Online-Aufladung, Auto-Aufladung und Gutscheine.",
  es: "Recarga en línea, automática y canje de cupones.",
  "pt-BR": "Recarga online, automática e resgate de vouchers.",
  ar: "شحن عبر الإنترنت، شحن تلقائي، واستبدال القسائم.",
  hi: "ऑनलाइन रिचार्ज, ऑटो-रिचार्ज और वाउचर रिडेम्प्शन।",
  id: "Isi ulang online, otomatis, dan penukaran voucher.",
};

const INVOICE_DESCRIPTIONS: Record<TargetLocale, string> = {
  "zh-CN": "申请与管理发票开具。",
  en: "Request and manage invoices.",
  "zh-TW": "申請與管理發票開立。",
  ja: "請求書の申請と管理。",
  fr: "Demander et gérer les factures.",
  ru: "Запрос и управление счетами.",
  vi: "Yêu cầu và quản lý hóa đơn.",
  ko: "세금계산서 신청 및 관리.",
  de: "Rechnungen anfordern und verwalten.",
  es: "Solicitar y gestionar facturas.",
  "pt-BR": "Solicitar e gerenciar notas fiscais.",
  ar: "طلب وإدارة الفواتير.",
  hi: "चालान का अनुरोध और प्रबंधन।",
  id: "Ajukan dan kelola faktur.",
};

export function getConsoleBillsPageMetadata(locale: string): PageMeta {
  const copy = getBillsUiCopy(locale);
  const chrome = getConsoleChromeCopy(locale);
  return {
    title: `${copy.pageTitle} · ${chrome.brandAlt}`,
    description: pickTargetCatalog(locale, BILLS_DESCRIPTIONS),
  };
}

export function getConsoleExpenseBillPageMetadata(locale: string): PageMeta {
  const copy = getExpenseBillUiCopy(locale);
  const chrome = getConsoleChromeCopy(locale);
  return {
    title: `${copy.pageTitle} · ${chrome.brandAlt}`,
    description: pickTargetCatalog(locale, EXPENSE_DESCRIPTIONS),
  };
}

export function getConsoleInvoicePageMetadata(locale: string): PageMeta {
  const copy = getInvoiceUiCopy(locale);
  const chrome = getConsoleChromeCopy(locale);
  return {
    title: `${copy.pageTitle} · ${chrome.brandAlt}`,
    description: pickTargetCatalog(locale, INVOICE_DESCRIPTIONS),
  };
}

const PLAYGROUND_DESCRIPTIONS: Record<
  "chat" | "image" | "video" | "tts",
  Record<TargetLocale, string>
> = {
  chat: {
    "zh-CN": "在控制台试用对话模型。",
    en: "Try chat models in the Console Playground.",
    "zh-TW": "在控制台試用對話模型。",
    ja: "コンソールでチャットモデルを試せます。",
    fr: "Essayez les modèles de chat dans la console.",
    ru: "Пробуйте чат-модели в консоли.",
    vi: "Thử mô hình chat trong Console.",
    ko: "콘솔에서 채팅 모델을 체험하세요.",
    de: "Chat-Modelle in der Konsole ausprobieren.",
    es: "Pruebe modelos de chat en la consola.",
    "pt-BR": "Experimente modelos de chat no console.",
    ar: "جرّب نماذج المحادثة في لوحة التحكم.",
    hi: "कंसोल में चैट मॉडल आज़माएँ।",
    id: "Coba model chat di Console.",
  },
  image: {
    "zh-CN": "在控制台试用图像生成模型。",
    en: "Try image generation models in the Console Playground.",
    "zh-TW": "在控制台試用圖像生成模型。",
    ja: "コンソールで画像生成モデルを試せます。",
    fr: "Essayez les modèles d'image dans la console.",
    ru: "Пробуйте модели генерации изображений в консоли.",
    vi: "Thử mô hình tạo ảnh trong Console.",
    ko: "콘솔에서 이미지 생성 모델을 체험하세요.",
    de: "Bildmodelle in der Konsole ausprobieren.",
    es: "Pruebe modelos de imagen en la consola.",
    "pt-BR": "Experimente modelos de imagem no console.",
    ar: "جرّب نماذج توليد الصور في لوحة التحكم.",
    hi: "कंसोल में छवि मॉडल आज़माएँ।",
    id: "Coba model gambar di Console.",
  },
  video: {
    "zh-CN": "在控制台试用视频生成模型。",
    en: "Try video generation models in the Console Playground.",
    "zh-TW": "在控制台試用影片生成模型。",
    ja: "コンソールで動画生成モデルを試せます。",
    fr: "Essayez les modèles vidéo dans la console.",
    ru: "Пробуйте модели генерации видео в консоли.",
    vi: "Thử mô hình tạo video trong Console.",
    ko: "콘솔에서 비디오 생성 모델을 체험하세요.",
    de: "Videomodelle in der Konsole ausprobieren.",
    es: "Pruebe modelos de vídeo en la consola.",
    "pt-BR": "Experimente modelos de vídeo no console.",
    ar: "جرّب نماذج توليد الفيديو في لوحة التحكم.",
    hi: "कंसोल में वीडियो मॉडल आज़माएँ।",
    id: "Coba model video di Console.",
  },
  tts: {
    "zh-CN": "在控制台试用语音合成模型。",
    en: "Try speech synthesis models in the Console Playground.",
    "zh-TW": "在控制台試用語音合成模型。",
    ja: "コンソールで音声合成モデルを試せます。",
    fr: "Essayez les modèles de synthèse vocale dans la console.",
    ru: "Пробуйте модели синтеза речи в консоли.",
    vi: "Thử mô hình tổng hợp giọng nói trong Console.",
    ko: "콘솔에서 음성 합성 모델을 체험하세요.",
    de: "Sprachsynthese-Modelle in der Konsole ausprobieren.",
    es: "Pruebe modelos de síntesis de voz en la consola.",
    "pt-BR": "Experimente modelos de síntese de fala no console.",
    ar: "جرّب نماذج تحويل النص إلى كلام في لوحة التحكم.",
    hi: "कंसोल में वाक् संश्लेषण मॉडल आज़माएँ।",
    id: "Coba model sintesis ucapan di Console.",
  },
};

function playgroundMeta(
  locale: string,
  page: "chat" | "image" | "video" | "tts",
): PageMeta {
  const copy = getPlaygroundUiCopy(locale);
  const chrome = getConsoleChromeCopy(locale);
  return {
    title: `${copy.pageTitles[page]} · ${chrome.brandAlt}`,
    description: pickTargetCatalog(locale, PLAYGROUND_DESCRIPTIONS[page]),
  };
}

export function getConsolePlaygroundChatPageMetadata(locale: string): PageMeta {
  return playgroundMeta(locale, "chat");
}

export function getConsolePlaygroundImagePageMetadata(
  locale: string,
): PageMeta {
  return playgroundMeta(locale, "image");
}

export function getConsolePlaygroundVideoPageMetadata(
  locale: string,
): PageMeta {
  return playgroundMeta(locale, "video");
}

export function getConsolePlaygroundTtsPageMetadata(locale: string): PageMeta {
  return playgroundMeta(locale, "tts");
}

const BATCHES_DESCRIPTIONS: Record<TargetLocale, string> = {
  "zh-CN": "创建与管理批量推理任务。",
  en: "Create and manage batch inference jobs.",
  "zh-TW": "建立與管理批量推理任務。",
  ja: "バッチ推論ジョブの作成と管理。",
  fr: "Créez et gérez des jobs d'inférence par lot.",
  ru: "Создание и управление пакетными задачами.",
  vi: "Tạo và quản lý job suy luận hàng loạt.",
  ko: "배치 추론 작업 생성 및 관리.",
  de: "Batch-Inferenzjobs erstellen und verwalten.",
  es: "Cree y administre trabajos de inferencia por lotes.",
  "pt-BR": "Crie e gerencie jobs de inferência em lote.",
  ar: "إنشاء وإدارة مهام الاستنتاج الدفعي.",
  hi: "बैच इन्फ़रेंस जॉब बनाएँ और प्रबंधित करें।",
  id: "Buat dan kelola job inferensi batch.",
};

const INVITATION_DESCRIPTIONS: Record<TargetLocale, string> = {
  "zh-CN": "查看邀请记录与推荐奖励。",
  en: "View referral records and ambassador rewards.",
  "zh-TW": "查看邀請記錄與推薦獎勵。",
  ja: "紹介履歴と報酬を確認。",
  fr: "Consultez vos parrainages et récompenses.",
  ru: "Просмотр приглашений и наград.",
  vi: "Xem lịch sử giới thiệu và phần thưởng.",
  ko: "추천 기록 및 보상 확인.",
  de: "Empfehlungsverlauf und Prämien anzeigen.",
  es: "Consulte referidos y recompensas.",
  "pt-BR": "Veja indicações e recompensas.",
  ar: "عرض سجل الإحالات والمكافآت.",
  hi: "रेफ़रल रिकॉर्ड और पुरस्कार देखें।",
  id: "Lihat riwayat undangan dan hadiah.",
};

const INVITER_DESCRIPTIONS: Record<TargetLocale, string> = {
  "zh-CN": "推荐官计划：邀请好友获得代金券。",
  en: "Referral Ambassador Program: invite friends for vouchers.",
  "zh-TW": "推薦官計畫：邀請好友獲得代金券。",
  ja: "紹介アンバサダー：友達を招待してクーポンを獲得。",
  fr: "Programme ambassadeur : invitez des amis pour des bons.",
  ru: "Программа рефералов: приглашайте друзей за купоны.",
  vi: "Chương trình giới thiệu: mời bạn bè nhận voucher.",
  ko: "추천 앰배서더: 친구 초대로 쿠폰 획득.",
  de: "Empfehlungsprogramm: Freunde einladen für Gutscheine.",
  es: "Programa de embajadores: invite amigos por cupones.",
  "pt-BR": "Programa embaixador: indique amigos por vouchers.",
  ar: "برنامج السفراء: ادعُ الأصدقاء للحصول على قسائم.",
  hi: "रेफ़रल एंबेसडर: वाउचर के लिए मित्रों को आमंत्रित करें।",
  id: "Program duta: undang teman untuk voucher.",
};

const REAL_NAME_DESCRIPTIONS: Record<TargetLocale, string> = {
  "zh-CN": "完成实名认证，领取认证专享代金券。",
  en: "Complete identity verification to claim your reward voucher.",
  "zh-TW": "完成實名認證，領取認證專享代金券。",
  ja: "本人確認完了で認証特典クーポンを受け取り。",
  fr: "Vérification d'identité pour obtenir un bon exclusif.",
  ru: "Верификация личности для получения купона.",
  vi: "Xác minh danh tính để nhận voucher đặc quyền.",
  ko: "본인 인증 후 전용 쿠폰 수령.",
  de: "Identitätsprüfung für exklusiven Gutschein.",
  es: "Verificación de identidad para cupón exclusivo.",
  "pt-BR": "Verificação de identidade para voucher exclusivo.",
  ar: "التحقق من الهوية للحصول على قسيمة حصرية.",
  hi: "पहचान सत्यापन पर विशेष वाउचर प्राप्त करें।",
  id: "Verifikasi identitas untuk voucher eksklusif.",
};

const DEDICATED_APPLY_DESCRIPTIONS: Record<TargetLocale, string> = {
  "zh-CN": "申请弹性 GPU 云函数公测。",
  en: "Apply for Elastic GPU cloud functions beta access.",
  "zh-TW": "申請彈性 GPU 雲函數公測。",
  ja: "Elastic GPU クラウド関数ベータへ申請。",
  fr: "Demander l'accès bêta aux fonctions GPU élastiques.",
  ru: "Заявка на бета-доступ к Elastic GPU.",
  vi: "Đăng ký beta GPU cloud functions linh hoạt.",
  ko: "Elastic GPU 클라우드 함수 베타 신청.",
  de: "Beta-Zugang für Elastic GPU Cloud Functions beantragen.",
  es: "Solicitar acceso beta a funciones GPU elásticas.",
  "pt-BR": "Solicitar acesso beta a funções GPU elásticas.",
  ar: "التقدم لوصول تجريبي لوظائف GPU السحابية.",
  hi: "Elastic GPU क्लाउड फ़ंक्शन बीटा के लिए आवेदन करें।",
  id: "Ajukan akses beta GPU cloud functions elastis.",
};

export function getConsoleBatchesPageMetadata(locale: string): PageMeta {
  const copy = getBatchesUiCopy(locale);
  const chrome = getConsoleChromeCopy(locale);
  return {
    title: `${copy.pageTitle} · ${chrome.brandAlt}`,
    description: pickTargetCatalog(locale, BATCHES_DESCRIPTIONS),
  };
}

export function getConsoleInvitationPageMetadata(locale: string): PageMeta {
  const copy = getInvitationUiCopy(locale);
  const chrome = getConsoleChromeCopy(locale);
  return {
    title: `${copy.pageTitle} · ${chrome.brandAlt}`,
    description: pickTargetCatalog(locale, INVITATION_DESCRIPTIONS),
  };
}

export function getConsoleCampaignInviterPageMetadata(locale: string): PageMeta {
  const copy = getCampaignsInviterUiCopy(locale);
  const chrome = getConsoleChromeCopy(locale);
  return {
    title: `${copy.pageTitle} · ${chrome.brandAlt}`,
    description: pickTargetCatalog(locale, INVITER_DESCRIPTIONS),
  };
}

export function getConsoleCampaignRealNamePageMetadata(
  locale: string,
): PageMeta {
  const copy = getCampaignsRealNameUiCopy(locale);
  const chrome = getConsoleChromeCopy(locale);
  return {
    title: `${copy.pageTitle} · ${chrome.brandAlt}`,
    description: pickTargetCatalog(locale, REAL_NAME_DESCRIPTIONS),
  };
}

export function getConsoleDedicatedApplyPageMetadata(locale: string): PageMeta {
  const copy = getDedicatedApplyUiCopy(locale);
  const chrome = getConsoleChromeCopy(locale);
  return {
    title: `${copy.pageTitle} · ${chrome.brandAlt}`,
    description: pickTargetCatalog(locale, DEDICATED_APPLY_DESCRIPTIONS),
  };
}

const CONSOLE_RESOLVERS: Record<string, (locale: string) => PageMeta> = {
  [APP_ROUTES.consoleModels]: getConsoleModelsPageMetadata,
  [APP_ROUTES.consoleAccountAk]: getConsoleAccountAkPageMetadata,
  [APP_ROUTES.consoleAccountAuthentication]: getConsoleAccountAuthPageMetadata,
  [APP_ROUTES.consoleBills]: getConsoleBillsPageMetadata,
  [APP_ROUTES.consoleExpenseBill]: getConsoleExpenseBillPageMetadata,
  [APP_ROUTES.consoleLogs]: getConsoleBillsPageMetadata,
  [APP_ROUTES.consoleWallet]: getConsoleExpenseBillPageMetadata,
  [APP_ROUTES.consoleOverview]: (locale) => {
    const chrome = getConsoleChromeCopy(locale);
    return {
      title: `${chrome.nav.overview} · ${chrome.brandAlt}`,
      description: chrome.nav.overview,
    };
  },
  [APP_ROUTES.consoleProfile]: (locale) => {
    const chrome = getConsoleChromeCopy(locale);
    return {
      title: `${chrome.nav.profile} · ${chrome.brandAlt}`,
      description: chrome.nav.profile,
    };
  },
  [APP_ROUTES.consoleLogsDrawing]: (locale) => {
    const chrome = getConsoleChromeCopy(locale);
    return {
      title: `${chrome.nav.drawingLogs} · ${chrome.brandAlt}`,
      description: chrome.nav.drawingLogs,
    };
  },
  [APP_ROUTES.consoleLogsTasks]: (locale) => {
    const chrome = getConsoleChromeCopy(locale);
    return {
      title: `${chrome.nav.taskLogs} · ${chrome.brandAlt}`,
      description: chrome.nav.taskLogs,
    };
  },
  [APP_ROUTES.consoleInvoice]: getConsoleInvoicePageMetadata,
  [APP_ROUTES.consolePlaygroundChat]: getConsolePlaygroundChatPageMetadata,
  [APP_ROUTES.consolePlaygroundImage]: getConsolePlaygroundImagePageMetadata,
  [APP_ROUTES.consolePlaygroundVideo]: getConsolePlaygroundVideoPageMetadata,
  [APP_ROUTES.consolePlaygroundTts]: getConsolePlaygroundTtsPageMetadata,
  [APP_ROUTES.consoleBatches]: getConsoleBatchesPageMetadata,
  [APP_ROUTES.consoleInvitation]: getConsoleInvitationPageMetadata,
  [APP_ROUTES.consoleCampaignInviter]: getConsoleCampaignInviterPageMetadata,
  [APP_ROUTES.consoleCampaignRealName]: getConsoleCampaignRealNamePageMetadata,
  [APP_ROUTES.consoleDedicatedApply]: getConsoleDedicatedApplyPageMetadata,
};

export function resolveConsoleDocumentMetadata(
  pathname: string,
  locale: string,
): PageMeta | null {
  const resolver = CONSOLE_RESOLVERS[pathname];
  return resolver ? resolver(locale) : null;
}
