import type { ModelCardData } from "./content-types";
import { APP_ROUTES } from "@/lib/routes";

export interface PriceRow {
  label: string;
  price: string;
  unit: string;
  tokenId: string;
}

export interface RateLimitRow {
  level: string;
  rpm: string;
  tpm: string;
  current?: boolean;
}

export interface ModelDetailDerived {
  shortName: string;
  context: string;
  capabilities: string[];
  priceRows: PriceRow[];
  rateLimits: RateLimitRow[];
  releaseDate: string | null;
  experienceHref: string | null;
  apiDocsHref: string;
}

const CAPABILITY_MAP: { match: RegExp | string; label: string }[] = [
  { match: /^Tools$/i, label: "🛠️ 工具调用" },
  { match: /^Prefix$/i, label: "✍🏻 前缀续写" },
  { match: /^FIM$/i, label: "🧩 FIM" },
  { match: /视觉|多模态/, label: "👁️ 视觉" },
  { match: /^Coder$/i, label: "💻 代码" },
  { match: /代码/, label: "💻 代码" },
  { match: /推理/, label: "🧠 推理" },
  { match: /旗舰/, label: "⭐ 旗舰" },
  { match: /轻量|低延迟/, label: "⚡ 轻量" },
  { match: /聊天/, label: "💬 聊天" },
  { match: /代理/, label: "🤖 代理" },
  { match: /图像|生成/, label: "🖼️ 图像" },
  { match: /文本/, label: "📝 文本" },
];

function parseContext(tags: string[]): string {
  let best = 0;
  let label = "—";
  for (const tag of tags) {
    const m = tag.trim().toUpperCase().match(/^(\d+(?:\.\d+)?)(K|M)$/);
    if (!m) continue;
    const n = Number(m[1]) * (m[2] === "M" ? 1024 : 1);
    if (n > best) {
      best = n;
      label = m[2] === "M" ? `${Number(m[1]) * 1024}K` : tag.trim().toUpperCase();
    }
  }
  return label;
}

/** Pricing deferred — rows left empty until rates are finalized. */
function defaultPrices(_title: string, _typeTags: string[]): PriceRow[] {
  return [];
}

const DEFAULT_RATE_LIMITS: RateLimitRow[] = [
  { level: "L0", rpm: "500", tpm: "2,000,000", current: true },
  { level: "L1", rpm: "500", tpm: "2,000,000" },
  { level: "L2", rpm: "500", tpm: "2,000,000" },
  { level: "L3", rpm: "500", tpm: "2,000,000" },
  { level: "L4", rpm: "500", tpm: "2,000,000" },
  { level: "L5", rpm: "500", tpm: "2,000,000" },
];

/** Playground path by model type (matches cloud.siliconflow.cn). */
function getExperienceHref(model: ModelCardData): string | null {
  const q = `model=${encodeURIComponent(model.title)}`;
  if (model.typeTags.includes("对话")) {
    return `${APP_ROUTES.consolePlaygroundChat}?${q}`;
  }
  if (model.typeTags.includes("生图")) {
    return `${APP_ROUTES.consolePlaygroundImage}?${q}`;
  }
  if (model.typeTags.includes("视频")) {
    return `${APP_ROUTES.consolePlaygroundVideo}?${q}`;
  }
  if (model.typeTags.includes("语音")) {
    return `${APP_ROUTES.consolePlaygroundTts}?${q}`;
  }
  return null;
}

function getApiDocsHref(model: ModelCardData): string {
  if (model.typeTags.includes("生图")) {
    return "/docs/api/ai-model/images/openai/post-v1-images-generations";
  }
  if (model.typeTags.includes("视频")) {
    return "/docs/api/ai-model/videos/sora/createvideo";
  }
  if (model.typeTags.includes("语音")) {
    return "/docs/api/ai-model/audio/openai/createspeech";
  }
  if (model.typeTags.includes("嵌入")) {
    return "/docs/api/ai-model/embeddings/createembedding";
  }
  if (model.typeTags.includes("重排序")) {
    return "/docs/api/ai-model/rerank/creatererank";
  }
  return "/docs/api/ai-model/chat/openai/createchatcompletion";
}

export function deriveModelDetail(model: ModelCardData): ModelDetailDerived {
  const shortName = model.title.includes("/")
    ? model.title.split("/").pop() || model.title
    : model.title;

  const capabilities: string[] = [];
  for (const tag of model.featureTags) {
    for (const rule of CAPABILITY_MAP) {
      const ok =
        typeof rule.match === "string"
          ? tag === rule.match
          : rule.match.test(tag);
      if (ok && !capabilities.includes(rule.label)) {
        capabilities.push(rule.label);
      }
    }
  }

  return {
    shortName,
    context: parseContext(model.featureTags),
    capabilities,
    priceRows: defaultPrices(model.title, model.typeTags),
    rateLimits: DEFAULT_RATE_LIMITS,
    releaseDate: null,
    experienceHref: getExperienceHref(model),
    apiDocsHref: getApiDocsHref(model),
  };
}
