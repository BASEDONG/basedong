import {
  BadgeCheck,
  CircleDollarSign,
  FileCheck,
  Maximize2,
  Rocket,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import { BRAND_THEME } from "@/lib/brand-colors";
import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";

export const RV_ASSETS = "/assets/marketing/reserved/images";

const TF_ASSETS = "/assets/marketing/token-factory/images";

export const CONSULT_URL =
  "/share/base/form/shrcn2G8XKaFfNasfwD1lgDUbcb?from=navigation";

export const heroBackgroundBase: Omit<SfGradientPalette, "logoAlt"> = {
  base: BRAND_THEME.cardSurface,
  /** Electric cyan — reserved instances / capacity */
  orbPrimary: "#1EB8C7",
  orbSecondary: "#0D8A9A",
  accent: "#1EB8C7",
  logoSrc: `${RV_ASSETS}/hero-visual.svg`,
};

export type WhyCardBase = {
  bg: string;
  icon: LucideIcon;
};

export const WHY_CARD_BASE: WhyCardBase[] = [
  { bg: `${TF_ASSETS}/why-card-1.svg`, icon: Server },
  { bg: `${TF_ASSETS}/why-card-2.svg`, icon: BadgeCheck },
  { bg: `${TF_ASSETS}/why-card-3.svg`, icon: CircleDollarSign },
  { bg: `${TF_ASSETS}/why-card-4.svg`, icon: ShieldCheck },
];

export type ModelBase = {
  brand: string;
  model: string;
  ttft: string;
  tps: string;
};

export const HIGH_PERF_MODEL_BASE: ModelBase[] = [
  {
    brand: "Zai",
    model: "zai-org/GLM-5.1",
    ttft: "1500 ms",
    tps: "30",
  },
  {
    brand: "Kimi",
    model: "moonshotai/Kimi-K2.6",
    ttft: "1500 ms",
    tps: "30",
  },
  {
    brand: "MiniMax",
    model: "MiniMaxAI/MiniMax-M2.5",
    ttft: "500 ms",
    tps: "30",
  },
  {
    brand: "deepseek",
    model: "deepseek-ai/DeepSeek-V3.2",
    ttft: "1600 ms",
    tps: "45",
  },
];

export const STANDARD_MODEL_BASE: ModelBase[] = [
  {
    brand: "Kimi",
    model: "moonshotai/Kimi-K2.6",
    ttft: "2100 ms",
    tps: "20",
  },
  {
    brand: "MiniMax",
    model: "MiniMaxAI/MiniMax-M2.5",
    ttft: "1300 ms",
    tps: "21",
  },
  {
    brand: "deepseek",
    model: "deepseek-ai/DeepSeek-V3.2",
    ttft: "1900 ms",
    tps: "22",
  },
];

export type DeliveryStepBase = {
  num: string;
  icon: LucideIcon;
};

export const DELIVERY_STEP_BASE: DeliveryStepBase[] = [
  { num: "1", icon: Rocket },
  { num: "2", icon: SlidersHorizontal },
  { num: "3", icon: Maximize2 },
  { num: "4", icon: FileCheck },
];
