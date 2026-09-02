import type { DocsLocale } from "@/lib/docs-locale";

type DocsUiCopy = {
  apiReference: string;
  overview: string;
  search: string;
  switchLanguage: string;
};

const COPY: Record<DocsLocale, DocsUiCopy> = {
  zh: {
    apiReference: "API 参考",
    overview: "概览",
    search: "搜索",
    switchLanguage: "切换语言",
  },
  en: {
    apiReference: "API Reference",
    overview: "Overview",
    search: "Search",
    switchLanguage: "Switch language",
  },
  ja: {
    apiReference: "API リファレンス",
    overview: "概要",
    search: "検索",
    switchLanguage: "言語を切り替え",
  },
};

export function getDocsUiCopy(locale: DocsLocale): DocsUiCopy {
  return COPY[locale];
}
