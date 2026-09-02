"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getTalkContent, resolveTalkArticles } from "./content";
import type { TalkCategory } from "./content-types";
import { FILTERABLE_TALK_CATEGORIES } from "./content-types";
import { TalkHero } from "./TalkHero";
import { TalkListSection } from "./TalkListSection";
import { TalkSubmitCta } from "./TalkSubmitCta";

const FILTERABLE: TalkCategory[] = [...FILTERABLE_TALK_CATEGORIES];

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
  const { locale } = useLocale();
  const content = getTalkContent(locale);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = useMemo(
    () => parseTags(searchParams.get("tags")),
    [searchParams],
  );

  const articles = useMemo(
    () => resolveTalkArticles(selected, locale),
    [selected, locale],
  );
  const featured = articles[0] ?? content.articles[0]!;

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
        title={content.pageTitle}
        subtitle={content.pageSubtitle}
        shareLabel={content.shareCta.label}
        shareHref={content.shareCta.href}
        heroBackground={content.heroBackground}
        featured={featured}
        featuredReadMore={content.featuredReadMore}
        tagLabels={content.tagLabels}
      />
      <TalkListSection
        articles={articles}
        categories={content.filterCategories}
        categoryLabels={content.categoryLabels}
        tagLabels={content.tagLabels}
        selected={selected}
        onToggle={onToggle}
        onClear={() => syncTags([])}
      />
      <TalkSubmitCta
        title={content.submitCta.title}
        label={content.submitCta.label}
        href={content.submitCta.href}
      />
    </>
  );
}
