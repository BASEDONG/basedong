import type { PricingEndpointInfo } from "@/lib/backend/client";
import { getRelayBase } from "@/lib/backend/config";

export type SampleLang = "curl" | "python" | "javascript";

export const SAMPLE_LANG_LABELS: Record<SampleLang, string> = {
  curl: "cURL",
  python: "Python",
  javascript: "JavaScript",
};

const DEFAULT_PATHS: Record<string, string> = {
  openai: "/v1/chat/completions",
  "openai-response": "/v1/responses",
  "openai-response-compact": "/v1/responses/compact",
  anthropic: "/v1/messages",
  gemini: "/v1beta/models/{model}:generateContent",
  embeddings: "/v1/embeddings",
  "jina-rerank": "/v1/rerank",
  "image-generation": "/v1/images/generations",
};

type SampleContext = {
  baseUrl: string;
  modelName: string;
  endpointType: string;
  endpointPath: string;
};

function replaceModelInPath(path: string, modelName: string): string {
  return path.replaceAll("{model}", modelName);
}

export function resolveSampleEndpoints(
  endpointTypes: string[] | undefined,
  endpointMap: Record<string, PricingEndpointInfo> | undefined,
  modelName: string,
): { type: string; path: string; method: string }[] {
  const types =
    endpointTypes && endpointTypes.length > 0 ? endpointTypes : ["openai"];
  const out: { type: string; path: string; method: string }[] = [];
  for (const type of types) {
    const info = endpointMap?.[type];
    let path = (info?.path || DEFAULT_PATHS[type] || "").trim();
    if (!path) continue;
    if (path.includes("{model}")) {
      path = replaceModelInPath(path, modelName);
    }
    out.push({
      type,
      path,
      method: (info?.method || "POST").toUpperCase(),
    });
  }
  return out;
}

function buildChatSample(lang: SampleLang, ctx: SampleContext): string {
  const url = `${ctx.baseUrl}${ctx.endpointPath}`;
  const isResponses = ctx.endpointType === "openai-response";
  const userMessage = "Hello";
  const bodyJson = isResponses
    ? JSON.stringify({ model: ctx.modelName, input: userMessage }, null, 2)
    : JSON.stringify(
        {
          model: ctx.modelName,
          messages: [{ role: "user", content: userMessage }],
        },
        null,
        2,
      );

  if (lang === "curl") {
    return [
      `curl ${url} \\`,
      `  -H "Authorization: Bearer $YOUR_API_KEY" \\`,
      `  -H "Content-Type: application/json" \\`,
      `  -d '${bodyJson.replace(/\n/g, "\n     ")}'`,
    ].join("\n");
  }

  if (lang === "python") {
    const call = isResponses
      ? `response = client.responses.create(\n    model="${ctx.modelName}",\n    input="${userMessage}",\n)\n\nprint(response.output_text)`
      : `completion = client.chat.completions.create(\n    model="${ctx.modelName}",\n    messages=[{"role": "user", "content": "${userMessage}"}],\n)\n\nprint(completion.choices[0].message.content)`;
    return [
      "from openai import OpenAI",
      "",
      "client = OpenAI(",
      `    base_url="${ctx.baseUrl}/v1",`,
      '    api_key="<YOUR_API_KEY>",',
      ")",
      "",
      call,
    ].join("\n");
  }

  return [
    `const response = await fetch("${url}", {`,
    `  method: "POST",`,
    `  headers: {`,
    `    Authorization: "Bearer <YOUR_API_KEY>",`,
    `    "Content-Type": "application/json",`,
    `  },`,
    `  body: JSON.stringify(${bodyJson}),`,
    `});`,
    "",
    `const data = await response.json();`,
    `console.log(data);`,
  ].join("\n");
}

function buildAnthropicSample(lang: SampleLang, ctx: SampleContext): string {
  const url = `${ctx.baseUrl}${ctx.endpointPath}`;
  const userMessage = "Hello";
  const body = {
    model: ctx.modelName,
    max_tokens: 1024,
    messages: [{ role: "user", content: userMessage }],
  };

  if (lang === "curl") {
    const bodyJson = JSON.stringify(body, null, 2);
    return [
      `curl ${url} \\`,
      `  -H "x-api-key: $YOUR_API_KEY" \\`,
      `  -H "anthropic-version: 2023-06-01" \\`,
      `  -H "Content-Type: application/json" \\`,
      `  -d '${bodyJson.replace(/\n/g, "\n     ")}'`,
    ].join("\n");
  }

  if (lang === "python") {
    return [
      "import anthropic",
      "",
      "client = anthropic.Anthropic(",
      `    base_url="${ctx.baseUrl}",`,
      '    api_key="<YOUR_API_KEY>",',
      ")",
      "",
      "message = client.messages.create(",
      `    model="${ctx.modelName}",`,
      "    max_tokens=1024,",
      `    messages=[{"role": "user", "content": "${userMessage}"}],`,
      ")",
      "",
      "print(message.content[0].text)",
    ].join("\n");
  }

  return [
    `const response = await fetch("${url}", {`,
    `  method: "POST",`,
    `  headers: {`,
    `    "x-api-key": "<YOUR_API_KEY>",`,
    `    "anthropic-version": "2023-06-01",`,
    `    "Content-Type": "application/json",`,
    `  },`,
    `  body: JSON.stringify(${JSON.stringify(body, null, 2)}),`,
    `});`,
    "",
    `const data = await response.json();`,
    `console.log(data.content[0].text);`,
  ].join("\n");
}

function buildEmbeddingSample(lang: SampleLang, ctx: SampleContext): string {
  const url = `${ctx.baseUrl}${ctx.endpointPath}`;
  const text = "The food was delicious.";

  if (lang === "curl") {
    const bodyJson = JSON.stringify(
      { model: ctx.modelName, input: text },
      null,
      2,
    );
    return [
      `curl ${url} \\`,
      `  -H "Authorization: Bearer $YOUR_API_KEY" \\`,
      `  -H "Content-Type: application/json" \\`,
      `  -d '${bodyJson.replace(/\n/g, "\n     ")}'`,
    ].join("\n");
  }

  if (lang === "python") {
    return [
      "from openai import OpenAI",
      "",
      `client = OpenAI(base_url="${ctx.baseUrl}/v1", api_key="<YOUR_API_KEY>")`,
      "",
      "response = client.embeddings.create(",
      `    model="${ctx.modelName}",`,
      `    input="${text}",`,
      ")",
      "",
      "print(response.data[0].embedding[:8])",
    ].join("\n");
  }

  return [
    `const response = await fetch("${url}", {`,
    `  method: "POST",`,
    `  headers: {`,
    `    Authorization: "Bearer <YOUR_API_KEY>",`,
    `    "Content-Type": "application/json",`,
    `  },`,
    `  body: JSON.stringify({ model: "${ctx.modelName}", input: "${text}" }),`,
    `});`,
    "",
    `const data = await response.json();`,
    `console.log(data.data[0].embedding.slice(0, 8));`,
  ].join("\n");
}

function buildImageSample(lang: SampleLang, ctx: SampleContext): string {
  const url = `${ctx.baseUrl}${ctx.endpointPath}`;
  const prompt = "A serene koi pond at sunset.";

  if (lang === "curl") {
    const bodyJson = JSON.stringify(
      { model: ctx.modelName, prompt, size: "1024x1024", n: 1 },
      null,
      2,
    );
    return [
      `curl ${url} \\`,
      `  -H "Authorization: Bearer $YOUR_API_KEY" \\`,
      `  -H "Content-Type: application/json" \\`,
      `  -d '${bodyJson.replace(/\n/g, "\n     ")}'`,
    ].join("\n");
  }

  if (lang === "python") {
    return [
      "from openai import OpenAI",
      "",
      `client = OpenAI(base_url="${ctx.baseUrl}/v1", api_key="<YOUR_API_KEY>")`,
      "",
      "response = client.images.generate(",
      `    model="${ctx.modelName}",`,
      `    prompt="${prompt}",`,
      '    size="1024x1024",',
      "    n=1,",
      ")",
      "",
      "print(response.data[0].url)",
    ].join("\n");
  }

  return [
    `const response = await fetch("${url}", {`,
    `  method: "POST",`,
    `  headers: {`,
    `    Authorization: "Bearer <YOUR_API_KEY>",`,
    `    "Content-Type": "application/json",`,
    `  },`,
    `  body: JSON.stringify({`,
    `    model: "${ctx.modelName}",`,
    `    prompt: "${prompt}",`,
    `    size: "1024x1024",`,
    `    n: 1,`,
    `  }),`,
    `});`,
    "",
    `const data = await response.json();`,
    `console.log(data.data[0].url);`,
  ].join("\n");
}

export function buildModelCodeSample(
  lang: SampleLang,
  endpointType: string,
  modelName: string,
  endpointPath: string,
  baseUrl = getRelayBase() || "https://api.example.com",
): string {
  const ctx: SampleContext = {
    baseUrl: baseUrl.replace(/\/$/, ""),
    modelName,
    endpointType,
    endpointPath,
  };
  if (endpointType === "anthropic") return buildAnthropicSample(lang, ctx);
  if (endpointType === "embeddings" || endpointType === "jina-rerank") {
    return buildEmbeddingSample(lang, ctx);
  }
  if (endpointType === "image-generation") return buildImageSample(lang, ctx);
  return buildChatSample(lang, ctx);
}
