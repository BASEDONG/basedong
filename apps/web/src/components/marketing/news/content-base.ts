import { BRAND_THEME } from "@/lib/brand-colors";
import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";
import type { NewsCategory } from "./content-types";

export const NEWS_IMG = "/assets/marketing/news/images";

export const heroBackgroundBase: Omit<SfGradientPalette, "logoAlt"> = {
  base: BRAND_THEME.cardSurface,
  /** Sky blue — news / editorial */
  orbPrimary: "#3BA8E8",
  orbSecondary: "#2B8FC9",
  accent: "#3BA8E8",
  logoSrc: `${NEWS_IMG}/hero-visual.svg`,
};

export const NEWS_CATEGORIES: NewsCategory[] = [
  "全部",
  "荣誉奖项",
  "企业动态",
  "模型上新",
  "市场活动",
  "客户案例",
  "生态合作",
  "企业AI实践",
];

export const FEATURED_BASE = {
  category: "模型上新" as const,
  date: "2026-06-18",
  href: "/news",
  cover: `${NEWS_IMG}/featured-kimi.png`,
};

export type NewsArticleBase = {
  id: string;
  category: Exclude<NewsCategory, "全部">;
  date: string;
  href: string;
  thumb: string;
};

export const ARTICLE_BASE: NewsArticleBase[] = [
  {
    id: "iejarphf9lqgywte36eowzo6",
    category: "生态合作",
    date: "2026-08-13",
    href: "/news",
    thumb: `${NEWS_IMG}/thumb-0.png`,
  },
  {
    id: "tteguv6arblns7n7wwu60qy5",
    category: "荣誉奖项",
    date: "2026-07-31",
    href: "/news",
    thumb: `${NEWS_IMG}/thumb-1.png`,
  },
  {
    id: "yxn60w9116uqgow8qmj2frsl",
    category: "企业动态",
    date: "2026-07-21",
    href: "/news",
    thumb: `${NEWS_IMG}/thumb-2.jpeg`,
  },
  {
    id: "agd6v0r0omgx1ymzxrj9jagy",
    category: "生态合作",
    date: "2026-07-14",
    href: "/news",
    thumb: `${NEWS_IMG}/thumb-3.png`,
  },
  {
    id: "ct2w1w4jrodh14vwcw96rxyo",
    category: "客户案例",
    date: "2026-07-06",
    href: "/news",
    thumb: `${NEWS_IMG}/thumb-4.png`,
  },
  {
    id: "bapiztk1gu3cqrwju1okix7g",
    category: "生态合作",
    date: "2026-07-05",
    href: "/news",
    thumb: `${NEWS_IMG}/thumb-5.png`,
  },
  {
    id: "fdedihyzxgbu7yfcerf2q2lu",
    category: "生态合作",
    date: "2026-07-03",
    href: "/news",
    thumb: `${NEWS_IMG}/thumb-6.jpg`,
  },
  {
    id: "jmeqt0sd1q3ciq04g2qd7xfg",
    category: "生态合作",
    date: "2026-07-02",
    href: "/news",
    thumb: `${NEWS_IMG}/thumb-7.png`,
  },
  {
    id: "k7r7cjt5fkxyfroe3thsnqtd",
    category: "模型上新",
    date: "2026-06-30",
    href: "/news",
    thumb: `${NEWS_IMG}/thumb-8.png`,
  },
  {
    id: "wxoo1kd98f2ydxnnyihzv3x9",
    category: "市场活动",
    date: "2026-06-29",
    href: "/news",
    thumb: `${NEWS_IMG}/thumb-9.jpg`,
  },
];

export const FILTER_EXTRA_BASE: Partial<
  Record<Exclude<NewsCategory, "全部">, NewsArticleBase[]>
> = {
  荣誉奖项: [
    {
      id: "tteguv6arblns7n7wwu60qy5",
      category: "荣誉奖项",
      date: "2026-07-31",
      href: "/news",
      thumb: `${NEWS_IMG}/honor-0.png`,
    },
    {
      id: "fbfvrxlms2fgthtxnzggrg7b",
      category: "荣誉奖项",
      date: "2026-01-27",
      href: "/news",
      thumb: `${NEWS_IMG}/honor-1.png`,
    },
    {
      id: "knjxu87y68uuvjzeqp5r5uqq",
      category: "荣誉奖项",
      date: "2026-01-19",
      href: "/news",
      thumb: `${NEWS_IMG}/honor-2.png`,
    },
    {
      id: "e7zpqgllgfn1mrfq1yw6lm5s",
      category: "荣誉奖项",
      date: "2025-12-26",
      href: "/news",
      thumb: `${NEWS_IMG}/honor-3.jpeg`,
    },
    {
      id: "hjliq094e4jvw6scke6f0iwz",
      category: "荣誉奖项",
      date: "2025-09-23",
      href: "/news",
      thumb: `${NEWS_IMG}/honor-4.png`,
    },
    {
      id: "dsjglm4diutrngvh2weypzhv",
      category: "荣誉奖项",
      date: "2025-09-16",
      href: "/news",
      thumb: `${NEWS_IMG}/honor-5.png`,
    },
    {
      id: "wwd368rw8xud0sprc7eu1029",
      category: "荣誉奖项",
      date: "2025-08-04",
      href: "/news",
      thumb: `${NEWS_IMG}/honor-6.png`,
    },
    {
      id: "hu6j13i7aokzbp02bty3k6zk",
      category: "荣誉奖项",
      date: "2025-07-10",
      href: "/news",
      thumb: `${NEWS_IMG}/honor-7.png`,
    },
    {
      id: "qy96pn32h4p6px88wpllfftk",
      category: "荣誉奖项",
      date: "2025-06-30",
      href: "/news",
      thumb: `${NEWS_IMG}/honor-8.jpg`,
    },
  ],
};

export const NEWS_TOTAL_PAGES = 15;
export const NEWS_PAGE_SIZE = 10;
