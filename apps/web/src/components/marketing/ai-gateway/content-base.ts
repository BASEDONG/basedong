import {
  Eye,
  GitBranch,
  Network,
  Shield,
  SlidersHorizontal,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { BRAND_THEME, LOGO_COLORS } from "@/lib/brand-colors";
import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";

export const GW_ASSETS = "/assets/marketing/ai-gateway/images";

export const CONSULT_URL =
  "/share/base/form/shrcn2G8XKaFfNasfwD1lgDUbcb";

export const gatewayHeroBackgroundBase: Omit<SfGradientPalette, "logoAlt"> = {
  base: BRAND_THEME.cardSurface,
  orbPrimary: "#5B6FE8",
  orbSecondary: "#3D4FC7",
  accent: "#5B6FE8",
  logoSrc: `${GW_ASSETS}/hero-gateway.svg`,
};

export const THIRD_PARTY_VENDORS = [
  "DeepSeek",
  "Qwen",
  "Llama",
  "GLM",
  "Mistral",
  "InternLM",
  "Gemma",
  "Kimi",
] as const;

export type AdvantageCardBase = {
  icon: LucideIcon;
  image: string;
  border: string;
  bg: string;
  iconBg: string;
};

export const ADVANTAGE_CARD_BASE: AdvantageCardBase[] = [
  {
    icon: GitBranch,
    image: `${GW_ASSETS}/advantage-card-1.svg`,
    border: "#F9A8D4",
    bg: "#FDF2F8",
    iconBg: "#FCE7F3",
  },
  {
    icon: WalletCards,
    image: `${GW_ASSETS}/advantage-card-2.svg`,
    border: "#D9F99D",
    bg: "#F7FEE7",
    iconBg: "#ECFCCB",
  },
  {
    icon: Shield,
    image: `${GW_ASSETS}/advantage-card-3.svg`,
    border: "#FCA5A5",
    bg: "#FEF2F2",
    iconBg: "#FEE2E2",
  },
  {
    icon: Network,
    image: `${GW_ASSETS}/advantage-card-4.svg`,
    border: "#67E8F9",
    bg: "#ECFEFF",
    iconBg: "#CFFAFE",
  },
  {
    icon: Eye,
    image: `${GW_ASSETS}/advantage-card-5.svg`,
    border: "#93C5FD",
    bg: "#EFF6FF",
    iconBg: "#DBEAFE",
  },
  {
    icon: SlidersHorizontal,
    image: `${GW_ASSETS}/advantage-card-6.svg`,
    border: "#FDBA74",
    bg: "#FFF7ED",
    iconBg: "#FFEDD5",
  },
];

export type ScenarioBase = {
  id: string;
  gridCols: 2 | 3;
  background: SfGradientPalette;
};

export const SCENARIO_BASE: ScenarioBase[] = [
  {
    id: "platform",
    gridCols: 3,
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.blue,
      orbSecondary: LOGO_COLORS.cyan,
      accent: LOGO_COLORS.blue,
    },
  },
  {
    id: "multi",
    gridCols: 3,
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.magenta,
      orbSecondary: LOGO_COLORS.pink,
      accent: LOGO_COLORS.magenta,
    },
  },
  {
    id: "observe",
    gridCols: 2,
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.yellow,
      orbSecondary: LOGO_COLORS.orange,
      accent: LOGO_COLORS.yellow,
    },
  },
  {
    id: "cost",
    gridCols: 2,
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.orange,
      orbSecondary: LOGO_COLORS.yellow,
      accent: LOGO_COLORS.orange,
    },
  },
  {
    id: "stability",
    gridCols: 2,
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.cyan,
      orbSecondary: LOGO_COLORS.lime,
      accent: LOGO_COLORS.cyan,
    },
  },
];

export const TESTIMONIAL_BASE = [
  { avatarSeed: "education-platform-lead" },
  { avatarSeed: "ocean-oil-platform-lead" },
] as const;
