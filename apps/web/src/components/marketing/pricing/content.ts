import type { PricingData } from "./content-types";
import raw from "./pricing-data.json";

export const ASSET =
  "/assets/marketing/pricing/images";

export const pricingData = raw as PricingData;

export function logoSrc(logoFile?: string, fallbackUrl?: string): string {
  if (logoFile) return `${ASSET}/${logoFile}`;
  return fallbackUrl || "";
}
