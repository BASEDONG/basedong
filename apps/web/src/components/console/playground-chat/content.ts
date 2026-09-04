import { APP_ROUTES } from "@/lib/routes";

export const SUGGESTION_PROMPTS_ZH = [
  "非洲平头哥是哪种动物？",
  "如何评价周杰伦在歌坛的地位",
  "空穴来风的真正含义",
  "抗生素能治疗病毒感染吗？",
] as const;

export const SUGGESTION_PROMPTS_EN = [
  "What is the capital of France?",
  "Explain quantum entanglement simply",
  "Write a haiku about rain",
  "How do antibiotics work?",
] as const;

export const TERMS_URL = APP_ROUTES.userAgreement;

export interface ParamDef {
  key: "maxTokens" | "temperature" | "topP" | "topK" | "frequencyPenalty";
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  format?: (n: number) => string;
}

export const PARAM_DEFS: ParamDef[] = [
  {
    key: "maxTokens",
    min: 1,
    max: 131072,
    step: 1,
    defaultValue: 8192,
  },
  {
    key: "temperature",
    min: 0,
    max: 2,
    step: 0.1,
    defaultValue: 1.4,
    format: (n) => n.toFixed(1),
  },
  {
    key: "topP",
    min: 0.1,
    max: 1,
    step: 0.01,
    defaultValue: 0.95,
    format: (n) => n.toFixed(2),
  },
  {
    key: "topK",
    min: 1,
    max: 100,
    step: 1,
    defaultValue: 1,
  },
  {
    key: "frequencyPenalty",
    min: -2,
    max: 2,
    step: 0.1,
    defaultValue: 0,
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
