import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";

export type ModelType =
  | "全部"
  | "对话"
  | "生图"
  | "嵌入"
  | "重排序"
  | "语音"
  | "视频";

export type ModelCardData = {
  vendor: string;
  type: Exclude<ModelType, "全部">;
  modelId: string;
  published: string;
  publishedAt: string;
  sceneTags: string[];
  description: string;
  features: string[];
  inputPrice: string;
  outputPrice: string;
  context: string;
  size: string;
  logo: string;
};

export type SeriesCardData = {
  name: string;
  description: string;
  models: string[];
  logo: string;
  bg: string;
  exploreHref: string;
};

export type ModelCardCopy = {
  featuresLabel: string;
  inputLabel: string;
  outputLabel: string;
  contextLabel: string;
  sizeLabel: string;
  perMTokens: string;
};

export type ModelsPageStrings = {
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  searchButton: string;
  hotLabel: string;
  typeLabel: string;
  vendorLabel: string;
  sceneLabel: string;
  catalogTitle: string;
  sortDefault: string;
  sortReverse: string;
  pageSizeLabel: string;
  seriesTitle: string;
  moreSeries: string;
  exploreSeries: string;
  heroLogoAlt: string;
  filterAll: string;
  typeLabels: Record<Exclude<ModelType, "全部">, string>;
  statusLoading: string;
  statusEmpty: string;
  statusError: string;
  catalogDescriptionFallback: string;
  modelCard: ModelCardCopy;
  seriesDescriptions: string[];
  paginationPrev: string;
  paginationNext: string;
};

export type ModelsPageContent = {
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  searchButton: string;
  hotLabel: string;
  typeLabel: string;
  vendorLabel: string;
  sceneLabel: string;
  catalogTitle: string;
  sortDefault: string;
  sortReverse: string;
  pageSizeLabel: string;
  seriesTitle: string;
  moreSeries: string;
  exploreSeries: string;
  heroBackground: SfGradientPalette;
  pageSize: number;
  hotModels: readonly string[];
  typeOptions: readonly ModelType[];
  filterAll: string;
  typeLabels: ModelsPageStrings["typeLabels"];
  displayFilterLabel: (value: string) => string;
  statusLoading: string;
  statusEmpty: string;
  statusError: string;
  catalogDescriptionFallback: string;
  modelCard: ModelCardCopy;
  series: SeriesCardData[];
  paginationPrev: string;
  paginationNext: string;
};
