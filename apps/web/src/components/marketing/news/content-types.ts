export type NewsCategory =
  | "全部"
  | "荣誉奖项"
  | "企业动态"
  | "模型上新"
  | "市场活动"
  | "客户案例"
  | "生态合作"
  | "企业AI实践";

export type NewsArticle = {
  id: string;
  title: string;
  excerpt: string;
  category: Exclude<NewsCategory, "全部">;
  date: string;
  href: string;
  thumb: string;
};

export type NewsFeatured = {
  title: string;
  excerpt: string;
  category: Exclude<NewsCategory, "全部">;
  date: string;
  href: string;
  cover: string;
};

export type NewsPageContent = {
  pageTitle: string;
  featured: NewsFeatured;
  heroBg: string;
  categories: NewsCategory[];
  articles: NewsArticle[];
  /** Extra articles shown when filtering (not on default page 1) */
  filterExtras: Partial<Record<Exclude<NewsCategory, "全部">, NewsArticle[]>>;
  totalPages: number;
  pageSize: number;
};
