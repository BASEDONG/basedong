import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";
import { APP_ROUTES } from "@/lib/routes";

export type ConsoleOfflineUiCopy = {
  pageTitle: string;
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

const zhCN: ConsoleOfflineUiCopy = {
  pageTitle: "功能未提供",
  heading: "此功能暂未提供",
  body: "basedong 当前不提供该控制台能力。请返回模型广场继续使用已开放的服务。",
  ctaLabel: "前往模型广场",
  ctaHref: APP_ROUTES.consoleModels,
};

const en: ConsoleOfflineUiCopy = {
  pageTitle: "Not available",
  heading: "This feature is not offered",
  body: "basedong does not provide this Console capability. Return to the model plaza to continue with available services.",
  ctaLabel: "Go to model plaza",
  ctaHref: APP_ROUTES.consoleModels,
};

const zhTW: ConsoleOfflineUiCopy = {
  pageTitle: "功能未提供",
  heading: "此功能暫未提供",
  body: "basedong 目前不提供此控制台能力。請返回模型廣場繼續使用已開放的服務。",
  ctaLabel: "前往模型廣場",
  ctaHref: APP_ROUTES.consoleModels,
};

const ja: ConsoleOfflineUiCopy = {
  pageTitle: "利用不可",
  heading: "この機能は提供していません",
  body: "basedong はこのコンソール機能を提供していません。モデル広場に戻ってご利用ください。",
  ctaLabel: "モデル広場へ",
  ctaHref: APP_ROUTES.consoleModels,
};

const fr: ConsoleOfflineUiCopy = {
  ...en,
  pageTitle: "Non disponible",
  heading: "Fonctionnalité non proposée",
  body: "basedong ne propose pas cette capacité de la console. Retournez à la place des modèles.",
  ctaLabel: "Place des modèles",
};

const ru: ConsoleOfflineUiCopy = {
  ...en,
  pageTitle: "Недоступно",
  heading: "Функция не предоставляется",
  body: "basedong не предоставляет эту возможность консоли. Вернитесь на площадь моделей.",
  ctaLabel: "К площади моделей",
};

const vi: ConsoleOfflineUiCopy = {
  ...en,
  pageTitle: "Không khả dụng",
  heading: "Tính năng này không được cung cấp",
  body: "basedong không cung cấp khả năng Console này. Hãy quay lại quảng trường mô hình.",
  ctaLabel: "Đến quảng trường mô hình",
};

const ko: ConsoleOfflineUiCopy = {
  ...en,
  pageTitle: "제공되지 않음",
  heading: "이 기능은 제공되지 않습니다",
  body: "basedong은 이 콘솔 기능을 제공하지 않습니다. 모델 광장으로 돌아가 주세요.",
  ctaLabel: "모델 광장으로",
};

const de: ConsoleOfflineUiCopy = {
  ...en,
  pageTitle: "Nicht verfügbar",
  heading: "Diese Funktion wird nicht angeboten",
  body: "basedong bietet diese Console-Funktion nicht an. Kehren Sie zur Modell-Plaza zurück.",
  ctaLabel: "Zur Modell-Plaza",
};

const es: ConsoleOfflineUiCopy = {
  ...en,
  pageTitle: "No disponible",
  heading: "Esta función no se ofrece",
  body: "basedong no ofrece esta capacidad de la consola. Vuelva a la plaza de modelos.",
  ctaLabel: "Ir a la plaza de modelos",
};

const ptBR: ConsoleOfflineUiCopy = {
  ...en,
  pageTitle: "Indisponivel",
  heading: "Este recurso nao e oferecido",
  body: "A basedong nao oferecece este recurso do Console. Volte a praca de modelos.",
  ctaLabel: "Ir a praca de modelos",
};

const ar: ConsoleOfflineUiCopy = {
  ...en,
  pageTitle: "غير متاح",
  heading: "هذه الميزة غير متوفرة",
  body: "لا توفر basedong قدرة وحدة التحكم هذه. عد إلى ساحة النماذج.",
  ctaLabel: "إلى ساحة النماذج",
};

const hi: ConsoleOfflineUiCopy = {
  ...en,
  pageTitle: "उपलब्ध नहीं",
  heading: "यह सुविधा उपलब्ध नहीं है",
  body: "basedong यह Console क्षमता नहीं देता। मॉडल प्लाज़ा पर वापस जाएँ।",
  ctaLabel: "मॉडल प्लाज़ा पर जाएँ",
};

const id: ConsoleOfflineUiCopy = {
  ...en,
  pageTitle: "Tidak tersedia",
  heading: "Fitur ini tidak ditawarkan",
  body: "basedong tidak menyediakan kemampuan Console ini. Kembali ke plaza model.",
  ctaLabel: "Ke plaza model",
};

const CATALOG: Record<TargetLocale, ConsoleOfflineUiCopy> = {
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

export function getConsoleOfflineUiCopy(locale: string): ConsoleOfflineUiCopy {
  return pickTargetCatalog(locale, CATALOG);
}
