import { BRAND } from "@/lib/assets";
import { APP_ROUTES } from "@/lib/routes";

export const docsUrl = APP_ROUTES.docsIntroduction;

export const ASSET = {
  logo: BRAND.logoWhite,
  logoMark: BRAND.logoMark,
  campaign:
    "/assets/console/batches/images/header-campaigns-inviter.webp",
  empty:
    "/assets/console/batches/images/finetune-empty.webp",
} as const;

export const navActiveKey = "batches";

/** Models available for batch inference (aligned with models plaza). */
export const modelOptions = [
  { value: "claude-opus-4-6", label: "claude-opus-4-6" },
  { value: "claude-sonnet-5", label: "claude-sonnet-5" },
  { value: "claude-haiku-4-5", label: "claude-haiku-4-5" },
  { value: "gpt-5.5", label: "gpt-5.5" },
  { value: "gpt-5.4", label: "gpt-5.4" },
  { value: "gpt-5.6-luna", label: "gpt-5.6-luna" },
  { value: "kimi-k3", label: "kimi-k3" },
  { value: "kimi-k2.7-code", label: "kimi-k2.7-code" },
  { value: "glm-5.3", label: "glm-5.3" },
  { value: "doubao-seed-2.0-pro", label: "doubao-seed-2.0-pro" },
  { value: "MiniMax-M3", label: "MiniMax-M3" },
  { value: "grok-4.6", label: "grok-4.6" },
] as const;

export type PriceUnit = "K" | "M";

export interface PriceRow {
  feature: string;
  pricePerK: number;
  meterId: string;
}
