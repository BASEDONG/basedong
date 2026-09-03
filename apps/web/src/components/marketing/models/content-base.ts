import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";
import { BRAND_THEME } from "@/lib/brand-colors";
import { APP_ROUTES } from "@/lib/routes";
import type { ModelType } from "./content-types";

export const ASSET = "/assets/marketing/models/images";

export const FILTER_ALL = "全部";

export const TYPE_OPTIONS = [
  FILTER_ALL,
  "文本",
  "图像",
  "语音",
  "视频",
] as const satisfies readonly ModelType[];

export const HOT_MODEL_IDS = [
  "claude-opus-4-6",
  "claude-sonnet-5",
  "gpt-5.5",
  "kimi-k3",
  "gemini-3-pro-image-preview",
] as const;

export const MODELS_PAGE_BASE = {
  pageSize: 20,
  heroBackground: {
    base: BRAND_THEME.cardSurface,
    orbPrimary: "#D63D8E",
    orbSecondary: "#F2A2B3",
    accent: "#D63D8E",
    logoSrc: `${ASSET}/hero-visual.svg`,
  } satisfies Omit<SfGradientPalette, "logoAlt">,
} as const;

export type SeriesBase = {
  id: string;
  name: string;
  models: string[];
  logo: string;
  bg: string;
  vendorQuery: string;
};

export const SERIES_BASE: SeriesBase[] = [
  {
    id: "claude",
    name: "Claude",
    models: ["claude-opus-4-6", "claude-sonnet-5", "claude-haiku-4-5"],
    logo: `${ASSET}/logo-anthropic.svg`,
    bg: "#FFF4EF",
    vendorQuery: "Anthropic",
  },
  {
    id: "openai",
    name: "OpenAI",
    models: ["gpt-5.5", "gpt-5.4", "codex-auto-review"],
    logo: `${ASSET}/logo-openai.svg`,
    bg: "#EEFBF6",
    vendorQuery: "OpenAI",
  },
  {
    id: "xai",
    name: "xAI",
    models: ["grok-4.6", "grok-4.5", "grok-imagine-image-2.0"],
    logo: `${ASSET}/logo-xai.svg`,
    bg: "#F5F5F5",
    vendorQuery: "xAI",
  },
  {
    id: "doubao",
    name: "Doubao",
    models: ["doubao-seed-2.0-pro", "doubao-seed-2.0-lite", "doubao-seed-2.0-code"],
    logo: `${ASSET}/logo-bytedance.svg`,
    bg: "#EEF5FF",
    vendorQuery: "字节跳动",
  },
  {
    id: "glm",
    name: "GLM",
    models: ["glm-5.3", "glm-5.2", "glm-5.1"],
    logo: `${ASSET}/logo-zhipu.svg`,
    bg: "#F3EEFF",
    vendorQuery: "智谱",
  },
  {
    id: "kimi",
    name: "Kimi",
    models: ["kimi-k3", "kimi-k2.7-code", "kimi-k2.6"],
    logo: `${ASSET}/logo-moonshotai.png`,
    bg: "#EEF9FF",
    vendorQuery: "Moonshot",
  },
  {
    id: "minimax",
    name: "MiniMax",
    models: ["MiniMax-M3", "MiniMax-M2.7"],
    logo: `${ASSET}/logo-minimax.svg`,
    bg: "#FFF0F5",
    vendorQuery: "MiniMax",
  },
  {
    id: "gemini",
    name: "Gemini",
    models: ["gemini-3-pro-image-preview", "gemini-3.1-flash-image-preview"],
    logo: `${ASSET}/logo-google.svg`,
    bg: "#EEF4FF",
    vendorQuery: "Google",
  },
];

export const CLOUD_MODELS_URL = APP_ROUTES.consoleModels;
export const CLOUD_ME_MODELS_URL = APP_ROUTES.consoleModels;
export const MORE_SERIES_HREF = CLOUD_ME_MODELS_URL;

export function modelDetailHref(modelId: string): string {
  return `${CLOUD_MODELS_URL}?target=${encodeURIComponent(modelId)}`;
}

export function seriesExploreHref(vendorQuery: string): string {
  return `${CLOUD_ME_MODELS_URL}?mfs=${encodeURIComponent(vendorQuery)}`;
}
