import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";
import type { LucideIcon } from "lucide-react";

export type HighlightItemCopy = {
  label: string;
  text: string;
};

export type PartnershipModeCopy = {
  audience: string;
  title: string;
  targetLabel: string;
  target: string;
  methodLabel: string;
  method: string;
  incentives: HighlightItemCopy[];
};

export type PartnerBenefitCopy = {
  num: string;
  title: string;
  description: string;
};

export type PartnerCaseCopy = {
  title: string;
};

export type PartnerStrings = {
  heroLogoAlt: string;
  heroBrandName: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  heroCta: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  modesSectionLabel: string;
  modesSectionTitle: string;
  modesSectionSubtitle: string;
  coreIncentiveLabel: string;
  benefitsSectionLabel: string;
  benefitsSectionTitle: string;
  benefitsSectionSubtitle: string;
  casesSectionLabel: string;
  casesSectionTitle: string;
  casesSectionSubtitle: string;
  moreCasesLabel: string;
  partnershipModes: PartnershipModeCopy[];
  partnerBenefits: PartnerBenefitCopy[];
  partnerCases: PartnerCaseCopy[];
};

export type HighlightItem = HighlightItemCopy;

export type PartnershipMode = PartnershipModeCopy & {
  icon: LucideIcon;
};

export type PartnerBenefit = PartnerBenefitCopy & {
  icon: LucideIcon;
  featured?: boolean;
};

export type PartnerCase = PartnerCaseCopy & {
  image: string;
};

export type PartnerContent = {
  heroBackground: SfGradientPalette;
  applyUrl: string;
  moreCasesUrl: string;
  assets: typeof import("./content-base").PARTNER_ASSETS;
  heroBrandName: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  heroCta: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  modesSectionLabel: string;
  modesSectionTitle: string;
  modesSectionSubtitle: string;
  coreIncentiveLabel: string;
  benefitsSectionLabel: string;
  benefitsSectionTitle: string;
  benefitsSectionSubtitle: string;
  casesSectionLabel: string;
  casesSectionTitle: string;
  casesSectionSubtitle: string;
  moreCasesLabel: string;
  partnershipModes: PartnershipMode[];
  partnerBenefits: PartnerBenefit[];
  partnerCases: PartnerCase[];
};
