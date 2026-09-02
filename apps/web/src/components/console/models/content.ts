import type { ModelCardData } from "./content-types";
import { BRAND } from "@/lib/assets";
import modelsJson from "./models-data.json";

export const modelsData = modelsJson as ModelCardData[];

/** @deprecated Use getFilterSections(locale) from models-ui-copy */
export { FILTER_SECTIONS_BASE as filterSectionsBase } from "./models-ui-copy";

export const ASSET = {
  logo: BRAND.logo,
  logoMark: BRAND.logoMark,
} as const;
