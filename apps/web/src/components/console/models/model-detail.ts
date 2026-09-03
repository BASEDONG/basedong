import type { ModelCardData } from "./content-types";
import { capabilityTags } from "@/lib/backend/model-tags";

export interface ModelDetailDerived {
  context: string | null;
  capabilities: string[];
  apiDocsHref: string;
}

function getApiDocsHref(model: ModelCardData): string {
  const endpoints = model.endpointTypes ?? [];
  if (
    endpoints.includes("image-generation") ||
    model.typeTags.includes("图像") ||
    model.typeTags.includes("生图")
  ) {
    return "/docs/api/ai-model/images/openai/post-v1-images-generations";
  }
  if (model.typeTags.includes("视频")) {
    return "/docs/api/ai-model/videos/sora/createvideo";
  }
  if (model.typeTags.includes("语音")) {
    return "/docs/api/ai-model/audio/openai/createspeech";
  }
  if (endpoints.includes("embeddings") || endpoints.includes("jina-rerank")) {
    return endpoints.includes("jina-rerank")
      ? "/docs/api/ai-model/rerank/creatererank"
      : "/docs/api/ai-model/embeddings/createembedding";
  }
  if (endpoints.includes("anthropic") && !endpoints.includes("openai")) {
    return "/docs/api/ai-model/chat/createmessage";
  }
  return "/docs/api/ai-model/chat/openai/createchatcompletion";
}

export function deriveModelDetail(model: ModelCardData): ModelDetailDerived {
  return {
    context: model.context ?? null,
    capabilities: capabilityTags(model.featureTags),
    apiDocsHref: getApiDocsHref(model),
  };
}
