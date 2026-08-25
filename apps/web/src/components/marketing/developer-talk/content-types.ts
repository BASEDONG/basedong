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

export interface TalkArticle {
  id: string;
  title: string;
  excerpt: string;
  tag: TalkArticleTag;
  date: string;
  href: string;
  cover: string;
}

export interface TalkPageContent {
  pageTitle: string;
  pageSubtitle: string;
  heroBg: string;
  shareCta: { label: string; href: string };
  submitCta: { title: string; label: string; href: string };
  filterCategories: TalkCategory[];
  articles: TalkArticle[];
}
