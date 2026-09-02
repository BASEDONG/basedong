import type { DocsLocale } from "@/lib/docs-locale";

type PageMeta = { title: string; description: string };

const INDEX_TITLES: Record<DocsLocale, string> = {
  zh: "API 参考",
  en: "API Reference",
  ja: "APIリファレンス",
};

const SECTION_SUFFIX: Record<DocsLocale, string> = {
  zh: "AI 模型接口",
  en: "AI Model APIs",
  ja: "AIモデル API",
};

const DEFAULT_DESCRIPTION: Record<DocsLocale, string> = {
  zh: "basedong AI 模型接口文档：OpenAI 兼容的聊天、嵌入、图像、音频、视频等 Relay 接口说明。",
  en: "basedong AI model API docs: OpenAI-compatible chat, embeddings, images, audio, video, and other Relay endpoints.",
  ja: "basedong の AI モデル API ドキュメント：OpenAI 互換のチャット、埋め込み、画像、音声、動画などの Relay インターフェース。",
};

function docsBrandSuffix(locale: DocsLocale): string {
  return locale === "zh" ? "八色鸫" : "basedong";
}

/** Build `<title>` and meta description for a docs API page. */
export function getDocsApiPageMetadata(
  locale: DocsLocale,
  pageTitle: string,
  description?: string,
): PageMeta {
  const section = INDEX_TITLES[locale];
  const suffix = docsBrandSuffix(locale);
  const isIndex = pageTitle === INDEX_TITLES[locale];

  const title = isIndex
    ? `${section} · ${SECTION_SUFFIX[locale]} · ${suffix}`
    : `${pageTitle} · ${section} · ${suffix}`;

  return {
    title,
    description: description?.trim() || DEFAULT_DESCRIPTION[locale],
  };
}
