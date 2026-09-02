import type { TranslatedLocale } from "@/lib/locale";
import { pickCatalog } from "@/lib/pick-catalog";
import {
  FILTER_ALL,
  HOT_MODEL_IDS,
  MODELS_PAGE_BASE,
  SERIES_BASE,
  TYPE_OPTIONS,
  seriesExploreHref,
} from "./content-base";
import { en, fr, ja, ru, vi, zhCN, zhTW, ko, de, es, ptBR, ar, hi, id } from "./content-locales";
import type {
  ModelType,
  ModelsPageContent,
  ModelsPageStrings,
  SeriesCardData,
} from "./content-types";

export type {
  ModelCardData,
  ModelType,
  ModelsPageContent,
  ModelsPageStrings,
  SeriesCardData,
} from "./content-types";

export {
  CLOUD_MODELS_URL,
  CLOUD_ME_MODELS_URL,
  FILTER_ALL,
  MORE_SERIES_HREF,
  modelDetailHref,
} from "./content-base";

function buildModelsContent(strings: ModelsPageStrings): ModelsPageContent {
  const typeLabelKeys = Object.keys(strings.typeLabels) as Exclude<
    ModelType,
    "全部"
  >[];

  function displayFilterLabel(value: string): string {
    if (value === FILTER_ALL) return strings.filterAll;
    if (typeLabelKeys.includes(value as Exclude<ModelType, "全部">)) {
      return strings.typeLabels[value as Exclude<ModelType, "全部">];
    }
    return value;
  }

  const series: SeriesCardData[] = SERIES_BASE.map((base, i) => ({
    name: base.name,
    description: strings.seriesDescriptions[i]!,
    models: base.models,
    logo: base.logo,
    bg: base.bg,
    exploreHref: seriesExploreHref(base.vendorQuery),
  }));

  return {
    heroTitleLine1: strings.heroTitleLine1,
    heroTitleLine2: strings.heroTitleLine2,
    heroSubtitle: strings.heroSubtitle,
    searchPlaceholder: strings.searchPlaceholder,
    searchButton: strings.searchButton,
    hotLabel: strings.hotLabel,
    typeLabel: strings.typeLabel,
    vendorLabel: strings.vendorLabel,
    sceneLabel: strings.sceneLabel,
    catalogTitle: strings.catalogTitle,
    sortDefault: strings.sortDefault,
    sortReverse: strings.sortReverse,
    pageSizeLabel: strings.pageSizeLabel,
    seriesTitle: strings.seriesTitle,
    moreSeries: strings.moreSeries,
    exploreSeries: strings.exploreSeries,
    heroBackground: {
      ...MODELS_PAGE_BASE.heroBackground,
      logoAlt: strings.heroLogoAlt,
    },
    pageSize: MODELS_PAGE_BASE.pageSize,
    hotModels: HOT_MODEL_IDS,
    typeOptions: TYPE_OPTIONS,
    filterAll: strings.filterAll,
    typeLabels: strings.typeLabels,
    displayFilterLabel,
    statusLoading: strings.statusLoading,
    statusEmpty: strings.statusEmpty,
    statusError: strings.statusError,
    catalogDescriptionFallback: strings.catalogDescriptionFallback,
    modelCard: strings.modelCard,
    series,
    paginationPrev: strings.paginationPrev,
    paginationNext: strings.paginationNext,
  };
}

const MODELS_STRINGS: Partial<Record<TranslatedLocale, ModelsPageStrings>> & {
  "zh-CN": ModelsPageStrings;
} = {
  "zh-CN": zhCN,
  en,
  "zh-TW": zhTW,
  fr,
  ru,
  ja,
  vi,
  ko: ko,
  de: de,
  es: es,
  "pt-BR": ptBR,
  ar: ar,
  hi: hi,
  id: id,
};

export function getModelsContent(locale: string): ModelsPageContent {
  return buildModelsContent(pickCatalog(locale, MODELS_STRINGS));
}
