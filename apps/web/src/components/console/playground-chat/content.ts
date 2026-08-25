export const pageTitle = "文本对话";

export const MODEL_OPTIONS = [
  "LongCat-2.0",
  "DeepSeek-V3.2",
  "Qwen3-235B-A22B",
  "Kimi-K2.5",
  "GLM-5",
] as const;

export const SUGGESTION_PROMPTS = [
  "非洲平头哥是哪种动物？",
  "如何评价周杰伦在歌坛的地位",
  "空穴来风的真正含义",
  "抗生素能治疗病毒感染吗？",
] as const;

export const TERMS_URL =
  "https://api-docs.siliconflow.cn/docs/legals/terms-of-service";

export interface ParamDef {
  key: "maxTokens" | "temperature" | "topP" | "topK" | "frequencyPenalty";
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  showInfo?: boolean;
  format?: (n: number) => string;
}

export const PARAM_DEFS: ParamDef[] = [
  {
    key: "maxTokens",
    label: "Max Tokens",
    min: 1,
    max: 131072,
    step: 1,
    defaultValue: 8192,
  },
  {
    key: "temperature",
    label: "Temperature",
    min: 0,
    max: 2,
    step: 0.1,
    defaultValue: 1.4,
    showInfo: true,
    format: (n) => n.toFixed(1),
  },
  {
    key: "topP",
    label: "Top-P",
    min: 0.1,
    max: 1,
    step: 0.01,
    defaultValue: 0.95,
    showInfo: true,
    format: (n) => n.toFixed(2),
  },
  {
    key: "topK",
    label: "Top-K",
    min: 1,
    max: 100,
    step: 1,
    defaultValue: 1,
    showInfo: true,
  },
  {
    key: "frequencyPenalty",
    label: "Frequency Penalty",
    min: -2,
    max: 2,
    step: 0.1,
    defaultValue: 0,
    showInfo: true,
    format: (n) => n.toFixed(1),
  },
];

export type ParamValues = Record<ParamDef["key"], number>;

export function defaultParamValues(): ParamValues {
  return {
    maxTokens: 8192,
    temperature: 1.4,
    topP: 0.95,
    topK: 1,
    frequencyPenalty: 0,
  };
}
