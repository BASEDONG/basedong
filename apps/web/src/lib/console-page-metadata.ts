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

const CONSOLE_RESOLVERS: Record<string, (locale: string) => PageMeta> = {
  [APP_ROUTES.consoleModels]: getConsoleModelsPageMetadata,
  [APP_ROUTES.consoleAccountAk]: getConsoleAccountAkPageMetadata,
  [APP_ROUTES.consoleAccountAuthentication]: getConsoleAccountAuthPageMetadata,
  [APP_ROUTES.consoleBills]: getConsoleBillsPageMetadata,
  [APP_ROUTES.consoleExpenseBill]: getConsoleExpenseBillPageMetadata,
  [APP_ROUTES.consoleInvoice]: getConsoleInvoicePageMetadata,
};

export function resolveConsoleDocumentMetadata(
  pathname: string,
  locale: string,
): PageMeta | null {
  const resolver = CONSOLE_RESOLVERS[pathname];
  return resolver ? resolver(locale) : null;
}
