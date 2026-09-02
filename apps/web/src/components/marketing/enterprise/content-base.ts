import {
  Activity,
  CircleDollarSign,
  ListChecks,
  MousePointerClick,
  Rocket,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { BRAND_THEME, LOGO_COLORS } from "@/lib/brand-colors";
import type { ScenarioDetailVariant } from "@/components/marketing/shared/illustration-assets";
import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";

export const ENT_ASSETS = "/assets/marketing/enterprise/images";

export const CONSULT_URL =
  "/share/base/form/shrcn2G8XKaFfNasfwD1lgDUbcb";

export const enterpriseHeroBackgroundBase: Omit<SfGradientPalette, "logoAlt"> = {
  base: BRAND_THEME.cardSurface,
  orbPrimary: LOGO_COLORS.yellow,
  orbSecondary: LOGO_COLORS.orange,
  accent: LOGO_COLORS.orange,
  logoSrc: `${ENT_ASSETS}/hero-maas.svg`,
};

export type IntroCardBase = {
  illustration: "auto" | "api" | "inference" | "deploy";
  background: {
    base: string;
    orbPrimary: string;
    orbSecondary: string;
    accent: string;
  };
};

export const INTRO_CARD_BASE: IntroCardBase[] = [
  {
    illustration: "auto",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.lime,
      orbSecondary: "#10a37f",
      accent: "#059669",
    },
  },
  {
    illustration: "api",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.magenta,
      orbSecondary: LOGO_COLORS.pink,
      accent: LOGO_COLORS.magenta,
    },
  },
  {
    illustration: "inference",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.cyan,
      orbSecondary: LOGO_COLORS.blue,
      accent: LOGO_COLORS.blue,
    },
  },
  {
    illustration: "deploy",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.yellow,
      orbSecondary: LOGO_COLORS.orange,
      accent: LOGO_COLORS.orange,
    },
  },
];

export type AdvantageCardBase = {
  icon: LucideIcon;
  image: string;
  border: string;
  bg: string;
  iconBg: string;
};

export const ADVANTAGE_CARD_BASE: AdvantageCardBase[] = [
  {
    icon: ShieldCheck,
    image: `${ENT_ASSETS}/advantage-card-1.svg`,
    border: "#6EE7B7",
    bg: "#ECFDF5",
    iconBg: "#D1FAE5",
  },
  {
    icon: CircleDollarSign,
    image: `${ENT_ASSETS}/advantage-card-2.svg`,
    border: "#67E8F9",
    bg: "#ECFEFF",
    iconBg: "#CFFAFE",
  },
  {
    icon: MousePointerClick,
    image: `${ENT_ASSETS}/advantage-card-3.svg`,
    border: "#F9A8D4",
    bg: "#FDF2F8",
    iconBg: "#FCE7F3",
  },
  {
    icon: ListChecks,
    image: `${ENT_ASSETS}/advantage-card-4.svg`,
    border: "#E9D5FF",
    bg: "#FAF5FF",
    iconBg: "#F3E8FF",
  },
  {
    icon: Activity,
    image: `${ENT_ASSETS}/advantage-card-5.svg`,
    border: "#A5B4FC",
    bg: "#EEF2FF",
    iconBg: "#E0E7FF",
  },
  {
    icon: Rocket,
    image: `${ENT_ASSETS}/advantage-card-6.svg`,
    border: "#FDBA74",
    bg: "#FFF7ED",
    iconBg: "#FFEDD5",
  },
];

export type ScenarioBase = {
  id: ScenarioDetailVariant;
  background: {
    base: string;
    orbPrimary: string;
    orbSecondary: string;
    accent: string;
  };
};

export const SCENARIO_BASE: ScenarioBase[] = [
  {
    id: "energy",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.lime,
      orbSecondary: LOGO_COLORS.yellow,
      accent: LOGO_COLORS.lime,
    },
  },
  {
    id: "aicenter",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.magenta,
      orbSecondary: LOGO_COLORS.pink,
      accent: LOGO_COLORS.magenta,
    },
  },
  {
    id: "transport",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.blue,
      orbSecondary: LOGO_COLORS.cyan,
      accent: LOGO_COLORS.blue,
    },
  },
  {
    id: "enterprise",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.cyan,
      orbSecondary: LOGO_COLORS.lime,
      accent: "#0d9488",
    },
  },
  {
    id: "carrier",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.pink,
      orbSecondary: LOGO_COLORS.magenta,
      accent: LOGO_COLORS.magenta,
    },
  },
  {
    id: "manufacturing",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.orange,
      orbSecondary: LOGO_COLORS.yellow,
      accent: LOGO_COLORS.orange,
    },
  },
];

export const TESTIMONIAL_BASE = [
  { avatarSeed: "energy-enterprise-lead" },
  { avatarSeed: "transport-it-lead" },
  { avatarSeed: "cloud-compute-lead" },
  { avatarSeed: "software-integration-lead" },
] as const;
