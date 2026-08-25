"use client";

import { useMemo, useState } from "react";
import { NEWS_CONTENT, resolveNewsArticles } from "./content";
import type { NewsCategory } from "./content-types";
import { NewsHero } from "./NewsHero";
import { NewsListSection } from "./NewsListSection";
import { NewsPagination } from "./NewsPagination";

export function NewsPageClient() {
  const [category, setCategory] = useState<NewsCategory>("全部");
  const [page, setPage] = useState(1);

  const articles = useMemo(() => resolveNewsArticles(category), [category]);

  const handleCategoryChange = (next: NewsCategory) => {
    setCategory(next);
    setPage(1);
  };

  return (
    <>
      <NewsHero
        title={NEWS_CONTENT.pageTitle}
        featured={NEWS_CONTENT.featured}
        heroBg={NEWS_CONTENT.heroBg}
      />
      <NewsListSection
        articles={articles}
        categories={NEWS_CONTENT.categories}
        activeCategory={category}
        onCategoryChange={handleCategoryChange}
      />
      <div>
        <NewsPagination
          page={page}
          totalPages={NEWS_CONTENT.totalPages}
          pageSize={NEWS_CONTENT.pageSize}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
