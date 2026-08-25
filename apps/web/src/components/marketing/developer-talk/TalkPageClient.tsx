"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { resolveTalkArticles, TALK_CONTENT } from "./content";
import type { TalkCategory } from "./content-types";
import { TalkHero } from "./TalkHero";
import { TalkListSection } from "./TalkListSection";
import { TalkSubmitCta } from "./TalkSubmitCta";

const FILTERABLE: TalkCategory[] = [
  "技术实践",
  "平台活动",
  "用户故事",
  "用户测评",
];

function parseTags(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((t) => decodeURIComponent(t.trim()))
    .filter((t): t is TalkCategory =>
      FILTERABLE.includes(t as TalkCategory),
    );
}

export function TalkPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = useMemo(
    () => parseTags(searchParams.get("tags")),
    [searchParams],
  );

  const articles = useMemo(
    () => resolveTalkArticles(selected),
    [selected],
  );
  const featured = articles[0] ?? TALK_CONTENT.articles[0];

  const syncTags = useCallback(
    (next: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.length === 0) {
        params.delete("tags");
      } else {
        params.set("tags", next.join(","));
      }
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const onToggle = (category: TalkCategory) => {
    if (category === "全部") {
      syncTags([]);
      return;
    }
    const next = selected.includes(category)
      ? selected.filter((t) => t !== category)
      : [...selected, category];
    syncTags(next);
  };

  return (
    <>
      <TalkHero
        title={TALK_CONTENT.pageTitle}
        subtitle={TALK_CONTENT.pageSubtitle}
        heroBg={TALK_CONTENT.heroBg}
        shareLabel={TALK_CONTENT.shareCta.label}
        shareHref={TALK_CONTENT.shareCta.href}
        featured={featured}
      />
      <TalkListSection
        articles={articles}
        categories={TALK_CONTENT.filterCategories}
        selected={selected}
        onToggle={onToggle}
        onClear={() => syncTags([])}
      />
      <TalkSubmitCta
        title={TALK_CONTENT.submitCta.title}
        label={TALK_CONTENT.submitCta.label}
        href={TALK_CONTENT.submitCta.href}
      />
    </>
  );
}
