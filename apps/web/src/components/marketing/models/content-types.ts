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
