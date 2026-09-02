import type { TranslatedLocale } from "@/lib/locale";
import { pickCatalog } from "@/lib/pick-catalog";

type PageMeta = { title: string; description: string };

type PageMetaCatalog = Partial<Record<TranslatedLocale, PageMeta>> & {
  "zh-CN": PageMeta;
};

const LOGIN: PageMetaCatalog = {
  "zh-CN": {
    title: "登录 — 八色鸫",
    description: "欢迎登录八色鸫 — 做所有人的 AI。",
  },
  en: {
    title: "Sign in — basedong",
    description: "Welcome to basedong — AI for everyone.",
  },
  "zh-TW": {
    title: "登入 — 八色鸫",
    description: "歡迎登入八色鸫 — 做所有人的 AI。",
  },
  fr: {
    title: "Connexion — basedong",
    description: "Bienvenue sur basedong — l'IA pour tous.",
  },
  ru: {
    title: "Вход — basedong",
    description: "Добро пожаловать в basedong — AI для всех.",
  },
  ja: {
    title: "ログイン — basedong",
    description: "basedong へようこそ — すべての人のための AI。",
  },
  vi: {
    title: "Đăng nhập — basedong",
    description: "Chào mừng đến basedong — AI cho mọi người.",
  },
};

export function getLoginPageMetadata(locale: string): PageMeta {
  return pickCatalog(locale, LOGIN);
}
