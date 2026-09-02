import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";

export type TalkCategory =
  | "全部"
  | "技术实践"
  | "平台活动"
  | "用户故事"
  | "用户测评";

export type TalkArticleTag =
  | "技术实践"
  | "平台活动"
  | "用户故事"
  | "用户测评"
  | "市场活动";

export type TalkArticleCopy = {
  title: string;
  excerpt: string;
};

export type TalkStrings = {
  pageTitle: string;
  heroLogoAlt: string;
  pageSubtitle: string;
  shareCtaLabel: string;
  submitCtaTitle: string;
  submitCtaLabel: string;
  featuredReadMore: string;
  categoryLabels: Record<TalkCategory, string>;
  tagLabels: Record<TalkArticleTag, string>;
  articles: Record<string, TalkArticleCopy>;
};

export type TalkArticle = TalkArticleCopy & {
  id: string;
  tag: TalkArticleTag;
  date: string;
  href: string;
  cover: string;
};

export type TalkPageContent = {
  pageTitle: string;
  pageSubtitle: string;
  heroBackground: SfGradientPalette;
  shareCta: { label: string; href: string };
  submitCta: { title: string; label: string; href: string };
  featuredReadMore: string;
  categoryLabels: Record<TalkCategory, string>;
  tagLabels: Record<TalkArticleTag, string>;
  filterCategories: TalkCategory[];
  articles: TalkArticle[];
};
