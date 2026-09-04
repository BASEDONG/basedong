import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";
import { APP_ROUTES } from "@/lib/routes";
import { getConsoleChromeCopy } from "@/components/console/shared/chrome-copy";
import { getApiKeysUiCopy } from "@/components/console/account-ak/account-ak-ui-copy";
import { getCallLogsUiCopy } from "@/components/console/call-logs/call-logs-ui-copy";
import { getWalletUiCopy } from "@/components/console/wallet/wallet-ui-copy";
import { getConsoleOfflineUiCopy } from "@/components/console/offline/offline-ui-copy";
import { getModelsUiCopy } from "@/components/console/models/models-ui-copy";
import { getPlaygroundUiCopy } from "@/components/console/shared/playground-ui-copy";

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

export function getConsoleAccountAkPageMetadata(locale: string): PageMeta {
  const copy = getApiKeysUiCopy(locale);
  const chrome = getConsoleChromeCopy(locale);
  return {
    title: `${copy.pageTitle} · ${chrome.brandAlt}`,
    description: pickTargetCatalog(locale, AK_DESCRIPTIONS),
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
  "zh-CN": "在线充值、兑换码与充值记录。",
  en: "Online top-up, redemption codes, and top-up history.",
  "zh-TW": "線上儲值、兌換碼與儲值記錄。",
  ja: "オンラインチャージ、交換コード、チャージ履歴。",
  fr: "Recharge en ligne, codes d'échange et historique.",
  ru: "Онлайн-пополнение, коды обмена и история.",
  vi: "Nạp tiền trực tuyến, mã đổi và lịch sử nạp.",
  ko: "온라인 충전, 교환 코드 및 충전 기록.",
  de: "Online-Aufladung, Einlösecodes und Verlauf.",
  es: "Recarga en línea, códigos de canje e historial.",
  "pt-BR": "Recarga online, códigos de resgate e histórico.",
  ar: "شحن عبر الإنترنت ورموز الاستبدال والسجل.",
  hi: "ऑनलाइन टॉप-अप, रिडेम्प्शन कोड और इतिहास।",
  id: "Isi ulang online, kode penukaran, dan riwayat.",
};

export function getConsoleCallLogsPageMetadata(locale: string): PageMeta {
  const copy = getCallLogsUiCopy(locale);
  const chrome = getConsoleChromeCopy(locale);
  return {
    title: `${copy.pageTitle} · ${chrome.brandAlt}`,
    description: pickTargetCatalog(locale, BILLS_DESCRIPTIONS),
  };
}

export function getConsoleWalletPageMetadata(locale: string): PageMeta {
  const copy = getWalletUiCopy(locale);
  const chrome = getConsoleChromeCopy(locale);
  return {
    title: `${copy.pageTitle} · ${chrome.brandAlt}`,
    description: pickTargetCatalog(locale, EXPENSE_DESCRIPTIONS),
  };
}

export function getConsoleOfflinePageMetadata(locale: string): PageMeta {
  const copy = getConsoleOfflineUiCopy(locale);
  const chrome = getConsoleChromeCopy(locale);
  return {
    title: `${copy.pageTitle} · ${chrome.brandAlt}`,
    description: copy.body,
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
  return getConsoleOfflinePageMetadata(locale);
}

export function getConsolePlaygroundVideoPageMetadata(
  locale: string,
): PageMeta {
  return getConsoleOfflinePageMetadata(locale);
}

export function getConsolePlaygroundTtsPageMetadata(locale: string): PageMeta {
  return getConsoleOfflinePageMetadata(locale);
}

const CONSOLE_RESOLVERS: Record<string, (locale: string) => PageMeta> = {
  [APP_ROUTES.consoleModels]: getConsoleModelsPageMetadata,
  [APP_ROUTES.consoleAccountAk]: getConsoleAccountAkPageMetadata,
  [APP_ROUTES.consoleAccountAuthentication]: getConsoleOfflinePageMetadata,
  [APP_ROUTES.consoleBills]: getConsoleCallLogsPageMetadata,
  [APP_ROUTES.consoleExpenseBill]: getConsoleWalletPageMetadata,
  [APP_ROUTES.consoleLogs]: getConsoleCallLogsPageMetadata,
  [APP_ROUTES.consoleWallet]: getConsoleWalletPageMetadata,
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
  [APP_ROUTES.consoleInvoice]: getConsoleOfflinePageMetadata,
  [APP_ROUTES.consolePlaygroundChat]: getConsolePlaygroundChatPageMetadata,
  [APP_ROUTES.consolePlaygroundImage]: getConsolePlaygroundImagePageMetadata,
  [APP_ROUTES.consolePlaygroundVideo]: getConsolePlaygroundVideoPageMetadata,
  [APP_ROUTES.consolePlaygroundTts]: getConsolePlaygroundTtsPageMetadata,
  [APP_ROUTES.consoleBatches]: getConsoleOfflinePageMetadata,
  [APP_ROUTES.consoleInvitation]: getConsoleOfflinePageMetadata,
  [APP_ROUTES.consoleCampaignInviter]: getConsoleOfflinePageMetadata,
  [APP_ROUTES.consoleCampaignRealName]: getConsoleOfflinePageMetadata,
  [APP_ROUTES.consoleDedicatedApply]: getConsoleOfflinePageMetadata,
};

export function resolveConsoleDocumentMetadata(
  pathname: string,
  locale: string,
): PageMeta | null {
  const resolver = CONSOLE_RESOLVERS[pathname];
  return resolver ? resolver(locale) : null;
}
