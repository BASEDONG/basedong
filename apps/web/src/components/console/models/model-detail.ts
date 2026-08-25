import type { ModelCardData } from "./content-types";

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
  { match: /视觉|多模态/i, label: "👁️ 视觉" },
  { match: /^Coder$/i, label: "💻 代码" },
  { match: /推理/, label: "🧠 推理" },
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

function buildTokenId(title: string, kind: string): string {
  const base = title.toLowerCase().replace(/\s+/g, "");
  return `${base}.online.${kind}`;
}

function defaultPrices(title: string, typeTags: string[]): PriceRow[] {
  if (typeTags.includes("生图") || typeTags.includes("视频")) {
    return [
      {
        label: "按次计费",
        price: "0.040000",
        unit: "/ 次",
        tokenId: buildTokenId(title, "request"),
      },
    ];
  }
  if (typeTags.includes("语音")) {
    return [
      {
        label: "输入音频",
        price: "0.000700",
        unit: "/ K Tokens",
        tokenId: buildTokenId(title, "input-audio-tokens"),
      },
      {
        label: "输出音频",
        price: "0.001400",
        unit: "/ K Tokens",
        tokenId: buildTokenId(title, "output-audio-tokens"),
      },
    ];
  }
  return [
    {
      label: "缓存命中 tokens",
      price: "0.000100",
      unit: "/ K Tokens",
      tokenId: buildTokenId(title, "cached-input-tokens"),
    },
    {
      label: "输入 tokens",
      price: "0.005000",
      unit: "/ K Tokens",
      tokenId: buildTokenId(title, "input-tokens"),
    },
    {
      label: "输出 tokens",
      price: "0.020000",
      unit: "/ K Tokens",
      tokenId: buildTokenId(title, "output-tokens"),
    },
  ];
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
    return `/me/modelsme/playground/chat?${q}`;
  }
  if (model.typeTags.includes("生图")) {
    return `/me/modelsme/playground/image?${q}`;
  }
  if (model.typeTags.includes("视频")) {
    return `/me/modelsme/playground/video?${q}`;
  }
  if (model.typeTags.includes("语音")) {
    return `/me/modelsme/playground/audio?${q}`;
  }
  return null;
}

function getApiDocsHref(model: ModelCardData): string {
  if (model.typeTags.includes("生图")) {
    return "https://api-docs.siliconflow.cn/docs/api/images-generations-post";
  }
  if (model.typeTags.includes("视频")) {
    return "https://api-docs.siliconflow.cn/docs/api/videos-generations-post";
  }
  if (model.typeTags.includes("语音")) {
    return "https://api-docs.siliconflow.cn/docs/api/audio-transcriptions-post";
  }
  if (model.typeTags.includes("嵌入")) {
    return "https://api-docs.siliconflow.cn/docs/api/embeddings-post";
  }
  if (model.typeTags.includes("重排序")) {
    return "https://api-docs.siliconflow.cn/docs/api/rerank-post";
  }
  return "https://api-docs.siliconflow.cn/docs/api/chat-completions-post";
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
