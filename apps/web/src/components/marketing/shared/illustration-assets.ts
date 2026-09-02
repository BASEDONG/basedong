import type {
  IndustryIllustrationVariant,
  ProductCardIllustrationVariant,
  WhyHighlightIllustrationVariant,
} from "@/types/siliconflow-cn-10b89bdc";

const HOME_ILL = "/assets/marketing/home/images/illustrations";

export const PRODUCT_ILLUSTRATIONS: Record<ProductCardIllustrationVariant, string> = {
  api: `${HOME_ILL}/product-api.svg`,
  auto: `${HOME_ILL}/product-auto.svg`,
  inference: `${HOME_ILL}/product-inference.svg`,
  deploy: `${HOME_ILL}/product-deploy.svg`,
};

export const INDUSTRY_ILLUSTRATIONS: Record<IndustryIllustrationVariant, string> = {
  internet: `${HOME_ILL}/industry-internet.svg`,
  education: `${HOME_ILL}/industry-education.svg`,
  government: `${HOME_ILL}/industry-government.svg`,
  compute: `${HOME_ILL}/industry-compute.svg`,
  "ai-hardware": `${HOME_ILL}/industry-ai-hardware.svg`,
};

export const WHY_HIGHLIGHT_ILLUSTRATIONS: Record<WhyHighlightIllustrationVariant, string> = {
  "cost-value": `${HOME_ILL}/why-cost-value.svg`,
  stability: `${HOME_ILL}/why-stability.svg`,
};

export const SCENARIO_DETAIL_VARIANTS = [
  "enterprise",
  "aicenter",
  "transport",
  "energy",
  "carrier",
  "manufacturing",
] as const;

export type ScenarioDetailVariant = (typeof SCENARIO_DETAIL_VARIANTS)[number];

const ENT_SCENARIO = "/assets/marketing/enterprise/images/scenarios";

/** Dedicated Storyset art per enterprise scenario — not shared with home industry cards. */
export const SCENARIO_ILLUSTRATIONS: Record<ScenarioDetailVariant, string> = {
  energy: `${ENT_SCENARIO}/energy.svg`,
  aicenter: `${ENT_SCENARIO}/aicenter.svg`,
  transport: `${ENT_SCENARIO}/transport.svg`,
  enterprise: `${ENT_SCENARIO}/enterprise.svg`,
  carrier: `${ENT_SCENARIO}/carrier.svg`,
  manufacturing: `${ENT_SCENARIO}/manufacturing.svg`,
};
