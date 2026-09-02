"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getNewsContent, resolveNewsArticles } from "./content";
import type { NewsCategory } from "./content-types";
import { NewsHero } from "./NewsHero";
import { NewsListSection } from "./NewsListSection";
import { NewsPagination } from "./NewsPagination";

export function NewsPageClient() {
  const { locale } = useLocale();
  const content = getNewsContent(locale);
  const [category, setCategory] = useState<NewsCategory>("全部");
  const [page, setPage] = useState(1);

  const articles = useMemo(
    () => resolveNewsArticles(category, locale),
    [category, locale],
  );

  const handleCategoryChange = (next: NewsCategory) => {
    setCategory(next);
    setPage(1);
  };

  return (
    <>
      <NewsHero
        title={content.pageTitle}
        featured={content.featured}
        heroBackground={content.heroBackground}
        featuredReadMore={content.featuredReadMore}
        categoryLabels={content.categoryLabels}
      />
      <NewsListSection
        articles={articles}
        categories={content.categories}
        categoryLabels={content.categoryLabels}
        categoryFilterTitle={content.categoryFilterTitle}
        activeCategory={category}
        onCategoryChange={handleCategoryChange}
      />
      <div>
        <NewsPagination
          page={page}
          totalPages={content.totalPages}
          pageSize={content.pageSize}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
