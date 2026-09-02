import { Lock, Maximize2, ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BRAND_THEME, LOGO_COLORS } from "@/lib/brand-colors";
import type {
  HeroSlideLayout,
  IndustryIllustrationVariant,
  ProductCardIllustrationVariant,
  SfGradientPalette,
  WhyHighlightIllustrationVariant,
} from "@/types/siliconflow-cn-10b89bdc";

const A = "/assets/marketing/home/images";
const HERO_LOGOS = `${A}/hero-logos`;

export const SF_SHARED = "/assets/marketing/shared";
export const partnersBg = `${A}/partners-bg.svg`;

export type HeroSlideBase = {
  id: string;
  ctaHref: string;
  layout?: HeroSlideLayout;
  background: SfGradientPalette;
};

export const HERO_SLIDE_BASE: HeroSlideBase[] = [
  {
    id: "gpt-5-6",
    ctaHref: "/me/models",
    background: {
      base: "linear-gradient(135deg, #b8e6d4 0%, #8fd4b8 22%, #eef9f4 52%, #ffffff 100%)",
      orbPrimary: "#10a37f",
      orbSecondary: "#1a7f64",
      accent: "#0d8a6a",
      logoSrc: `${HERO_LOGOS}/gpt-5-6.svg`,
    },
  },
  {
    id: "opus-5",
    ctaHref: "/me/models",
    background: {
      base: "linear-gradient(135deg, #f5e6d8 0%, #e8d4c0 22%, #faf6f2 52%, #ffffff 100%)",
      orbPrimary: "#d4a574",
      orbSecondary: "#c4956a",
      accent: "#a67c52",
      logoSrc: `${HERO_LOGOS}/opus-5.svg`,
    },
  },
  {
    id: "auto-free",
    ctaHref: "/me/models",
    layout: "centered",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.cyan,
      orbSecondary: LOGO_COLORS.blue,
      accent: LOGO_COLORS.blue,
      logoSrc: `${HERO_LOGOS}/auto.svg`,
    },
  },
  {
    id: "deployment",
    ctaHref: "/enterprise",
    layout: "stacked",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: "#5B6FE8",
      orbSecondary: "#3D4FC7",
      accent: "#5B6FE8",
      logoSrc: `${HERO_LOGOS}/deployment.svg`,
    },
  },
];

export type ProductCardBase = {
  ctaHref: string;
  illustration: ProductCardIllustrationVariant;
  background: SfGradientPalette;
};

export const PRODUCT_CARD_BASE: ProductCardBase[] = [
  {
    ctaHref: "/enterprise",
    illustration: "deploy",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: "#5B6FE8",
      orbSecondary: "#3D4FC7",
      accent: "#5B6FE8",
    },
  },
  {
    ctaHref: "/share/base/form/shrcn2G8XKaFfNasfwD1lgDUbcb",
    illustration: "inference",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: "#8b5cf6",
      orbSecondary: LOGO_COLORS.magenta,
      accent: "#7c3aed",
    },
  },
  {
    ctaHref: "/me/models",
    illustration: "auto",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.lime,
      orbSecondary: LOGO_COLORS.cyan,
      accent: "#7ab82e",
    },
  },
  {
    ctaHref: "/me/models",
    illustration: "api",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.cyan,
      orbSecondary: LOGO_COLORS.blue,
      accent: LOGO_COLORS.blue,
    },
  },
];

export type WhyHighlightCardBase = {
  illustration: WhyHighlightIllustrationVariant;
  background: SfGradientPalette;
};

export const WHY_HIGHLIGHT_CARD_BASE: WhyHighlightCardBase[] = [
  {
    illustration: "cost-value",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.cyan,
      orbSecondary: LOGO_COLORS.lime,
      accent: LOGO_COLORS.blue,
    },
  },
  {
    illustration: "stability",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: "#8b5cf6",
      orbSecondary: LOGO_COLORS.blue,
      accent: "#7c3aed",
    },
  },
];

export type FeatureCardBase = {
  icon: LucideIcon;
  image: string;
  border: string;
  bg: string;
  iconBg: string;
};

export const FEATURE_CARD_BASE: FeatureCardBase[] = [
  {
    icon: Maximize2,
    image: `${A}/why-card-1.svg`,
    border: "#FDBA74",
    bg: "#FFF7ED",
    iconBg: "#FFEDD5",
  },
  {
    icon: Lock,
    image: `${A}/why-card-2.svg`,
    border: "#6EE7B7",
    bg: "#ECFDF5",
    iconBg: "#D1FAE5",
  },
  {
    icon: Sparkles,
    image: `${A}/why-card-3.svg`,
    border: "#F9A8D4",
    bg: "#FDF2F8",
    iconBg: "#FCE7F3",
  },
  {
    icon: ShieldCheck,
    image: `${A}/why-card-4.svg`,
    border: "#A5B4FC",
    bg: "#EEF2FF",
    iconBg: "#E0E7FF",
  },
];

export type IndustryItemBase = {
  illustration: IndustryIllustrationVariant;
  background: SfGradientPalette;
};

export const INDUSTRY_ITEM_BASE: IndustryItemBase[] = [
  {
    illustration: "ai-hardware",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.magenta,
      orbSecondary: LOGO_COLORS.pink,
      accent: LOGO_COLORS.magenta,
    },
  },
  {
    illustration: "government",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: "#8b5cf6",
      orbSecondary: LOGO_COLORS.magenta,
      accent: "#7c3aed",
    },
  },
  {
    illustration: "compute",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: "#1EB8C7",
      orbSecondary: "#0D8A9A",
      accent: "#1EB8C7",
    },
  },
  {
    illustration: "education",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.lime,
      orbSecondary: LOGO_COLORS.cyan,
      accent: "#7ab82e",
    },
  },
  {
    illustration: "internet",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.cyan,
      orbSecondary: LOGO_COLORS.blue,
      accent: LOGO_COLORS.blue,
    },
  },
];
