import type { LucideIcon } from "lucide-react";
import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";

export type ReservedWhyCardStrings = {
  title: string;
  items: readonly [string, string];
};

export type ReservedModelStrings = {
  description: string;
  price: string;
  unitPrice: string;
  tpm: string;
};

export type ReservedStepStrings = {
  title: string;
  description: string;
};

export type ReservedStrings = {
  pageTitle: string;
  pageDescription: string;
  heroLogoAlt: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  consultCta: string;
  whyBadge: string;
  whyTitle: string;
  whySubtitle: string;
  whyCards: ReservedWhyCardStrings[];
  pricingBadge: string;
  pricingTitle: string;
  pricingSubtitle: string;
  highPerfTitle: string;
  standardTitle: string;
  pricingNote1: string;
  pricingNote2: string;
  pricingFootCtaBefore: string;
  pricingFootCtaAfter: string;
  costReferenceLabel: string;
  priceLabel: string;
  unitPriceLabel: string;
  perfReferenceLabel: string;
  deliveryBadge: string;
  deliveryTitle: string;
  deliverySteps: ReservedStepStrings[];
  ctaBadge: string;
  ctaTitle: string;
  ctaBody: string;
  ctaCardTitle: string;
  ctaCardBody: string;
  ctaButton: string;
  highPerfModels: ReservedModelStrings[];
  standardModels: ReservedModelStrings[];
};

export type ReservedWhyCard = ReservedWhyCardStrings & {
  bg: string;
  icon: LucideIcon;
};

export type ReservedPricingModel = ReservedModelStrings & {
  brand: string;
  model: string;
  ttft: string;
  tps: string;
};

export type ReservedDeliveryStep = ReservedStepStrings & {
  num: string;
  icon: LucideIcon;
};

export type ReservedContent = {
  pageTitle: string;
  pageDescription: string;
  heroBackground: SfGradientPalette;
  consultUrl: string;
  assets: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  consultCta: string;
  whyBadge: string;
  whyTitle: string;
  whySubtitle: string;
  whyCards: ReservedWhyCard[];
  pricingBadge: string;
  pricingTitle: string;
  pricingSubtitle: string;
  highPerfTitle: string;
  standardTitle: string;
  pricingNote1: string;
  pricingNote2: string;
  pricingFootCtaBefore: string;
  pricingFootCtaAfter: string;
  costReferenceLabel: string;
  priceLabel: string;
  unitPriceLabel: string;
  perfReferenceLabel: string;
  deliveryBadge: string;
  deliveryTitle: string;
  deliverySteps: ReservedDeliveryStep[];
  ctaBadge: string;
  ctaTitle: string;
  ctaBody: string;
  ctaCardTitle: string;
  ctaCardBody: string;
  ctaButton: string;
  highPerformanceModels: ReservedPricingModel[];
  standardModels: ReservedPricingModel[];
};
