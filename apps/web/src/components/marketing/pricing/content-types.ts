export type PriceTier = {
  label: string | null;
  values: string[];
};

export type PricingModel = {
  displayName: string;
  modelId: string;
  href: string;
  tiers: PriceTier[];
};

export type PricingVendorGroup = {
  providerId: string;
  vendor: string;
  logo: string;
  logoFile?: string;
  models: PricingModel[];
  initialVisible: number;
};

export type PricingSection = {
  title: string;
  headers: string[];
  priceColumns: number;
  groups: PricingVendorGroup[];
};

export type PricingCategoryId = "全部" | "对话" | "生图" | "语音" | "视频";

export type PricingChip = {
  name: string;
  logo: string;
  logoFile?: string;
  providerId: string;
};
