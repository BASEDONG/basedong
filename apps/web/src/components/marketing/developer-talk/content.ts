import type { TranslatedLocale } from "@/lib/locale";
import { pickCatalog } from "@/lib/pick-catalog";
import {
  ARTICLE_BASE,
  CONSULT_URL,
  heroBackgroundBase,
  TALK_FILTER_CATEGORIES,
} from "./content-base";
import { en, fr, ja, ru, vi, zhCN, zhTW } from "./content-locales";
import type {
  TalkArticle,
  TalkArticleTag,
  TalkPageContent,
  TalkStrings,
} from "./content-types";

export type {
  TalkArticle,
  TalkArticleTag,
  TalkCategory,
  TalkPageContent,
  TalkStrings,
} from "./content-types";
export { CONSULT_URL } from "./content-base";

function mergeArticle(
  base: (typeof ARTICLE_BASE)[number],
  strings: TalkStrings,
): TalkArticle {
  const copy = strings.articles[base.id];
  if (!copy) {
    throw new Error(`Missing talk copy for article ${base.id}`);
  }
  return { ...base, ...copy };
}

function buildTalkContent(strings: TalkStrings): TalkPageContent {
  return {
    pageTitle: strings.pageTitle,
    pageSubtitle: strings.pageSubtitle,
    heroBackground: {
      ...heroBackgroundBase,
      logoAlt: strings.heroLogoAlt,
    },
    shareCta: { label: strings.shareCtaLabel, href: CONSULT_URL },
    submitCta: {
      title: strings.submitCtaTitle,
      label: strings.submitCtaLabel,
      href: CONSULT_URL,
    },
    featuredReadMore: strings.featuredReadMore,
    categoryLabels: strings.categoryLabels,
    tagLabels: strings.tagLabels,
    filterCategories: TALK_FILTER_CATEGORIES,
    articles: ARTICLE_BASE.map((base) => mergeArticle(base, strings)),
  };
}

const TALK_STRINGS: Partial<Record<TranslatedLocale, TalkStrings>> & {
  "zh-CN": TalkStrings;
} = {
  "zh-CN": zhCN,
  en,
  "zh-TW": zhTW,
  fr,
  ru,
  ja,
  vi,
};

export function getTalkContent(locale: string): TalkPageContent {
  return buildTalkContent(pickCatalog(locale, TALK_STRINGS));
}

/** 平台活动 filter also matches 市场活动 (verified on live site). */
export function articleMatchesTags(
  tag: TalkArticleTag,
  selected: string[],
): boolean {
  if (selected.length === 0) return true;
  return selected.some((sel) => {
    if (sel === "平台活动") return tag === "平台活动" || tag === "市场活动";
    return tag === sel;
  });
}

export function resolveTalkArticles(
  selectedTags: string[],
  locale: string,
): TalkArticle[] {
  const { articles } = getTalkContent(locale);
  return articles.filter((a) => articleMatchesTags(a.tag, selectedTags));
}
