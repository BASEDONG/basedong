import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";
import { APP_ROUTES } from "@/lib/routes";
import { getConsoleChromeCopy } from "@/components/console/shared/chrome-copy";
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

const CONSOLE_RESOLVERS: Record<string, (locale: string) => PageMeta> = {
  [APP_ROUTES.consoleModels]: getConsoleModelsPageMetadata,
};

export function resolveConsoleDocumentMetadata(
  pathname: string,
  locale: string,
): PageMeta | null {
  const resolver = CONSOLE_RESOLVERS[pathname];
  return resolver ? resolver(locale) : null;
}
