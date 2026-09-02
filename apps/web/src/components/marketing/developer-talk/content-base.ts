import { APP_ROUTES } from "@/lib/routes";
import { BRAND_THEME } from "@/lib/brand-colors";
import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";
import type { TalkArticleTag, TalkCategory } from "./content-types";

export const TALK_IMG = "/assets/marketing/developer-talk/images";

export const CONSULT_URL = APP_ROUTES.formBusiness;

export const heroBackgroundBase: Omit<SfGradientPalette, "logoAlt"> = {
  base: BRAND_THEME.cardSurface,
  orbPrimary: "#8B5CF6",
  orbSecondary: "#A78BFA",
  accent: "#8B5CF6",
  logoSrc: `${TALK_IMG}/hero-visual.svg`,
};

export const TALK_FILTER_CATEGORIES: TalkCategory[] = [
  "全部",
  "技术实践",
  "平台活动",
  "用户故事",
  "用户测评",
];

export type TalkArticleBase = {
  id: string;
  tag: TalkArticleTag;
  date: string;
  href: string;
  cover: string;
};

export const ARTICLE_BASE: TalkArticleBase[] = [
  {
    id: "b56thjrf4dfpzg1wynejke5j",
    tag: "用户故事",
    date: "2026-08-05",
    href: "/developer-talk",
    cover: `${TALK_IMG}/opc-nanchuan.png`,
  },
  {
    id: "qc68kpityh6nwvth6yv1zaei",
    tag: "技术实践",
    date: "2026-07-30",
    href: "/developer-talk",
    cover: `${TALK_IMG}/opencode.jpg`,
  },
  {
    id: "e3okr78ulcbd36ggdxswgbpy",
    tag: "技术实践",
    date: "2026-07-10",
    href: "/developer-talk",
    cover: `${TALK_IMG}/codex.png`,
  },
  {
    id: "crkywf0secr2axnazev9ay0f",
    tag: "技术实践",
    date: "2026-06-12",
    href: "/developer-talk",
    cover: `${TALK_IMG}/openhuman.png`,
  },
  {
    id: "rtlosvhg5hy6p112rlrigoo7",
    tag: "平台活动",
    date: "2026-05-29",
    href: "/developer-talk",
    cover: `${TALK_IMG}/maas-2yr.png`,
  },
  {
    id: "hiwf5yfr6b790jmog9a6xlsb",
    tag: "用户故事",
    date: "2026-05-22",
    href: "/developer-talk",
    cover: `${TALK_IMG}/harness.png`,
  },
  {
    id: "ecqutah37y0fsgn53j7gfus4",
    tag: "技术实践",
    date: "2026-05-19",
    href: "/developer-talk",
    cover: `${TALK_IMG}/byok.png`,
  },
  {
    id: "edmojkiwvenrby4mzq5kizl9",
    tag: "用户故事",
    date: "2026-04-02",
    href: "/developer-talk",
    cover: `${TALK_IMG}/art-to-shrimp.png`,
  },
  {
    id: "zc516s5lixvrjuvo6soc81mz",
    tag: "用户故事",
    date: "2026-03-26",
    href: "/developer-talk",
    cover: `${TALK_IMG}/lobster-team.png`,
  },
  {
    id: "jt2by9g3v7aa6dgjotmrcfoh",
    tag: "技术实践",
    date: "2026-03-24",
    href: "/developer-talk",
    cover: `${TALK_IMG}/wechat-claude.png`,
  },
  {
    id: "pkivkufhheggmeskcfhh8kh9",
    tag: "平台活动",
    date: "2026-03-17",
    href: "/developer-talk",
    cover: `${TALK_IMG}/meetup.png`,
  },
  {
    id: "wd6etweavt2nfbydjsx1a6z8",
    tag: "用户故事",
    date: "2026-03-10",
    href: "/developer-talk",
    cover: `${TALK_IMG}/openclaw-addon.png`,
  },
  {
    id: "a58mvaz20e3bw6qhx8joewaw",
    tag: "用户故事",
    date: "2026-03-04",
    href: "/developer-talk",
    cover: `${TALK_IMG}/openclaw-guide.png`,
  },
  {
    id: "wzj6xzbdvzsytjnqno7fxyp1",
    tag: "用户故事",
    date: "2026-02-26",
    href: "/developer-talk",
    cover: `${TALK_IMG}/billion-tokens.png`,
  },
  {
    id: "wln8c6grxkh11brde838wfxd",
    tag: "用户故事",
    date: "2026-02-04",
    href: "/developer-talk",
    cover: `${TALK_IMG}/cloud-native.png`,
  },
  {
    id: "o8zq301umaf89v5bcxyltbav",
    tag: "技术实践",
    date: "2026-02-02",
    href: "/developer-talk",
    cover: `${TALK_IMG}/drawio.jpeg`,
  },
  {
    id: "od7wj9rr23p95uhihmhrombp",
    tag: "市场活动",
    date: "2026-01-15",
    href: "/developer-talk",
    cover: `${TALK_IMG}/referral.png`,
  },
  {
    id: "zx3caanoshbvxbudsq5x1nbz",
    tag: "用户测评",
    date: "2025-10-31",
    href: "/developer-talk",
    cover: `${TALK_IMG}/deepseek-ocr.png`,
  },
  {
    id: "nddw0hghm23vbkfcz4y99glc",
    tag: "用户故事",
    date: "2025-10-16",
    href: "/developer-talk",
    cover: `${TALK_IMG}/easy-story.png`,
  },
  {
    id: "evdjqa744e2bim1wwcrzwix2",
    tag: "技术实践",
    date: "2025-07-07",
    href: "/developer-talk",
    cover: `${TALK_IMG}/gemini-cli.png`,
  },
  {
    id: "swbnccchf5esxedxq01s4vr5",
    tag: "平台活动",
    date: "2025-05-31",
    href: "/developer-talk",
    cover: `${TALK_IMG}/siliconcloud-1yr.png`,
  },
];
