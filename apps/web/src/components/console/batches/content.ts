import { BRAND } from "@/lib/assets";

export const pageTitle = "批量推理";

export const docsUrl =
  "https://api-docs.siliconflow.cn/docs/userguide/guides/batch";

export const ASSET = {
  logo: BRAND.logoWhite,
  logoMark: BRAND.logoMark,
  campaign:
    "/assets/console/batches/images/header-campaigns-inviter.webp",
  avatar:
    "/assets/console/batches/images/avatar.jpeg",
  empty:
    "/assets/console/batches/images/finetune-empty.webp",
} as const;

export const navActiveKey = "batches";

/** Live model labels from cloud.siliconflow.cn/me/batches create drawer */
export const modelOptions = [
  { value: "deepseek-ai/DeepSeek-V4-Pro", label: "DeepSeek-V4-Pro" },
  { value: "moonshotai/Kimi-K2.7-Code", label: "Kimi-K2.7-Code" },
  { value: "zai-org/GLM-5.2", label: "GLM-5.2" },
  { value: "deepseek-ai/DeepSeek-V4-Flash", label: "DeepSeek-V4-Flash" },
  { value: "MiniMaxAI/MiniMax-M2.5", label: "MiniMax-M2.5" },
  { value: "Qwen/Qwen3.5-397B-A17B", label: "Qwen3.5-397B-A17B" },
  { value: "deepseek-ai/DeepSeek-V3.2", label: "DeepSeek-V3.2" },
  {
    value: "deepseek-ai/DeepSeek-V3.1-Terminus",
    label: "DeepSeek-V3.1-Terminus",
  },
  { value: "deepseek-ai/DeepSeek-V3", label: "DeepSeek-V3" },
  { value: "deepseek-ai/DeepSeek-R1", label: "DeepSeek-R1" },
] as const;

export type PriceUnit = "K" | "M";

export interface PriceRow {
  feature: string;
  pricePerK: number;
  meterId: string;
}

/** DeepSeek-V4-Pro batch pricing captured from live drawer */
export const defaultPriceRows: PriceRow[] = [
  {
    feature: "缓存命中 tokens",
    pricePerK: 0,
    meterId: "deepseek-ai/deepseek-v4-pro.batch.cached-input-tokens",
  },
  {
    feature: "输入 tokens",
    pricePerK: 0.006,
    meterId: "deepseek-ai/deepseek-v4-pro.batch.input-tokens",
  },
  {
    feature: "输出 tokens",
    pricePerK: 0.012,
    meterId: "deepseek-ai/deepseek-v4-pro.batch.output-tokens",
  },
];

export const completionNotes = [
  "完成时间窗口从任务创建开始计算；",
  "若任务在设定时间窗口内未能开始，或未能全部执行完毕，该任务将被自动终止并置为超时（expired）状态，输入文件中未处理的请求将被置为失败，您可以在失败文件中获得具体的明细信息；",
] as const;

export const priceDisclaimer =
  "实际执行价格以任务执行时每个请求实际完成时间的实时生效价格为准";

export const uploadDatasetLabel = "上传新的数据集（jsonl 文件）";
