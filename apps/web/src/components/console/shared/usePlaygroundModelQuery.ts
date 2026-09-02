"use client";

import { useSearchParams } from "next/navigation";

/** Read `?model=` from the playground URL (set by 模型广场「在线体验」). */
export function usePlaygroundModelQuery(): string | null {
  const searchParams = useSearchParams();
  const raw = searchParams.get("model");
  const trimmed = raw?.trim();
  return trimmed ? trimmed : null;
}

export function pickPlaygroundModel(
  options: readonly string[],
  urlModel: string | null,
  fallback: string,
): string {
  if (urlModel && options.includes(urlModel)) return urlModel;
  if (urlModel) return urlModel;
  if (options.includes(fallback)) return fallback;
  return options[0] ?? fallback;
}
