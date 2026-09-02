import type { TranslatedLocale } from "@/lib/locale";
import { pickCatalog } from "@/lib/pick-catalog";
import {
  ARTICLE_BASE,
  FEATURED_BASE,
  FILTER_EXTRA_BASE,
  heroBackgroundBase,
  NEWS_CATEGORIES,
  NEWS_PAGE_SIZE,
  NEWS_TOTAL_PAGES,
} from "./content-base";
import { en, fr, ja, ru, vi, zhCN, zhTW, ko, de, es, ptBR, ar, hi, id } from "./content-locales";
import type {
  NewsArticle,
  NewsCategory,
  NewsPageContent,
  NewsStrings,
} from "./content-types";

export type {
  NewsArticle,
  NewsCategory,
  NewsFeatured,
  NewsPageContent,
  NewsStrings,
} from "./content-types";

function mergeArticle(
  base: (typeof ARTICLE_BASE)[number],
  strings: NewsStrings,
): NewsArticle {
  const copy = strings.articles[base.id];
  if (!copy) {
    throw new Error(`Missing news copy for article ${base.id}`);
  }
  return { ...base, ...copy };
}

function buildNewsContent(strings: NewsStrings): NewsPageContent {
  const articles = ARTICLE_BASE.map((base) => mergeArticle(base, strings));

  const filterExtras: Partial<
    Record<Exclude<NewsCategory, "全部">, NewsArticle[]>
  > = {};
  for (const [category, bases] of Object.entries(FILTER_EXTRA_BASE) as [
    Exclude<NewsCategory, "全部">,
    (typeof FILTER_EXTRA_BASE)[Exclude<NewsCategory, "全部">],
  ][]) {
    if (bases) {
      filterExtras[category] = bases.map((base) => mergeArticle(base, strings));
    }
  }

  return {
    pageTitle: strings.pageTitle,
    heroLogoAlt: strings.heroLogoAlt,
    categoryFilterTitle: strings.categoryFilterTitle,
    featuredReadMore: strings.featuredReadMore,
    categoryLabels: strings.categoryLabels,
    heroBackground: {
      ...heroBackgroundBase,
      logoAlt: strings.heroLogoAlt,
    },
    featured: {
      ...FEATURED_BASE,
      ...strings.featured,
    },
    categories: NEWS_CATEGORIES,
    articles,
    filterExtras,
    totalPages: NEWS_TOTAL_PAGES,
    pageSize: NEWS_PAGE_SIZE,
  };
}

const NEWS_STRINGS: Partial<Record<TranslatedLocale, NewsStrings>> & {
  "zh-CN": NewsStrings;
} = {
  "zh-CN": zhCN,
  en,
  "zh-TW": zhTW,
  fr,
  ru,
  ja,
  vi,
  ko: ko,
  de: de,
  es: es,
  "pt-BR": ptBR,
  ar: ar,
  hi: hi,
  id: id,
};

export function getNewsContent(locale: string): NewsPageContent {
  return buildNewsContent(pickCatalog(locale, NEWS_STRINGS));
}

export function resolveNewsArticles(
  category: NewsCategory,
  locale: string,
): NewsArticle[] {
  const content = getNewsContent(locale);
  if (category === "全部") return content.articles;
  const extras = content.filterExtras[category];
  if (extras && extras.length > 0) return extras;
  return content.articles.filter((a) => a.category === category);
}
