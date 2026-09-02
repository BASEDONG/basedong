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
  ko: {
    title: "로그인 — basedong",
    description: "basedong에 오신 것을 환영합니다 — 모두를 위한 AI.",
  },
  de: {
    title: "Anmelden — basedong",
    description: "Willkommen bei basedong — KI für alle.",
  },
  es: {
    title: "Iniciar sesión — basedong",
    description: "Bienvenido a basedong — IA para todos.",
  },
  "pt-BR": {
    title: "Entrar — basedong",
    description: "Bem-vindo ao basedong — IA para todos.",
  },
  ar: {
    title: "تسجيل الدخول — basedong",
    description: "مرحبًا بك في basedong — ذكاء اصطناعي للجميع.",
  },
  hi: {
    title: "साइन इन — basedong",
    description: "basedong में आपका स्वागत है — सभी के लिए AI।",
  },
  id: {
    title: "Masuk — basedong",
    description: "Selamat datang di basedong — AI untuk semua.",
  },
};

export function getLoginPageMetadata(locale: string): PageMeta {
  return pickCatalog(locale, LOGIN);
}
