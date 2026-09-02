import { APP_ROUTES } from "@/lib/routes";

export const MODEL_OPTIONS = [
  "claude-haiku-4-5",
  "claude-opus-4-5",
  "claude-opus-4-6",
  "claude-opus-4-7",
  "claude-opus-4-8",
  "claude-opus-5",
  "claude-sonnet-4-6",
  "claude-sonnet-5",
  "codex-auto-review",
  "codex-auto-review-openai-compact",
  "gpt-5.4",
  "gpt-5.4-mini",
  "gpt-5.4-openai-compact",
  "gpt-5.5",
  "gpt-5.5-mini",
  "gpt-5.5-openai-compact",
  "gpt-5.6-luna",
  "gpt-5.6-sol",
  "gpt-5.6-terra",
  "grok-4.20-multi-agent-xhigh",
  "grok-4.5",
  "grok-4.5-聊天",
  "grok-4.6",
  "doubao-seed-2.0-code",
  "doubao-seed-2.0-lite",
  "doubao-seed-2.0-mini",
  "doubao-seed-2.0-pro",
  "glm-5-turbo",
  "glm-5.1",
  "glm-5.2",
  "glm-5.3",
  "kimi-k2.6",
  "kimi-k2.7-code",
  "kimi-k3",
  "MiniMax-M2.7",
  "MiniMax-M3",
] as const;

export const DEFAULT_MODEL = MODEL_OPTIONS[0];

export const SUGGESTION_PROMPTS = [
  "非洲平头哥是哪种动物？",
  "如何评价周杰伦在歌坛的地位",
  "空穴来风的真正含义",
  "抗生素能治疗病毒感染吗？",
] as const;

export const TERMS_URL = APP_ROUTES.userAgreement;

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
