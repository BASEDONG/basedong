import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";
import type { BRAND_ASSETS } from "./content-base";

export type BrandValueStrings = {
  title: string;
  body: string;
};

export type BrandSwatchStrings = {
  name: string;
};

export type BrandStrings = {
  heroLogoAlt: string;
  heroTitle: string;
  heroSubtitle: string;
  logoBirthTitle: string;
  logoBirthBody: string;
  playVideoLabel: string;
  missionBadge: string;
  missionHeading: string;
  missionLines: readonly [string, string];
  missionBody: string;
  valuesBadge: string;
  valuesHeading: string;
  values: BrandValueStrings[];
  relationshipBadge: string;
  relationshipHeading: string;
  relationshipParas: readonly string[];
  guidelinesTitle: string;
  guidelinesSubtitle: string;
  downloadLabel: string;
  gradientLabel: string;
  swatches: BrandSwatchStrings[];
};

export type BrandSwatch = BrandSwatchStrings & {
  hex: string;
  rgb: string;
  variant?: "gradient" | "white" | "black";
  gradient?: string;
};

export type BrandValue = BrandValueStrings & {
  bg: string;
};

export type BrandContent = {
  heroBackground: SfGradientPalette;
  assets: typeof BRAND_ASSETS;
  heroTitle: string;
  heroSubtitle: string;
  logoBirthTitle: string;
  logoBirthBody: string;
  playVideoLabel: string;
  missionBadge: string;
  missionHeading: string;
  missionLines: readonly [string, string];
  missionBody: string;
  valuesBadge: string;
  valuesHeading: string;
  values: BrandValue[];
  relationshipBadge: string;
  relationshipHeading: string;
  relationshipParas: readonly string[];
  guidelinesTitle: string;
  guidelinesSubtitle: string;
  downloadLabel: string;
  gradientLabel: string;
  swatches: BrandSwatch[];
};
