import type { NewsArticle, NewsCategory } from "./content-types";
import { NewsArticleCard } from "./NewsArticleCard";
import { NewsCategoryFilter } from "./NewsCategoryFilter";

type NewsListSectionProps = {
  articles: NewsArticle[];
  categories: NewsCategory[];
  categoryLabels: Record<NewsCategory, string>;
  categoryFilterTitle: string;
  activeCategory: NewsCategory;
  onCategoryChange: (category: NewsCategory) => void;
};

export function NewsListSection({
  articles,
  categories,
  categoryLabels,
  categoryFilterTitle,
  activeCategory,
  onCategoryChange,
}: NewsListSectionProps) {
  return (
    <div className="flex items-center justify-center bg-white pt-[58px] pb-[46px]">
      <div className="sf-content flex gap-[34px] max-[1024px]:flex-col-reverse">
        <div className="flex-1 space-y-8 max-[1024px]:w-full max-[1024px]:flex-none">
          {articles.map((article) => (
            <NewsArticleCard
              key={article.id}
              article={article}
              categoryLabel={categoryLabels[article.category]}
            />
          ))}
        </div>
        <NewsCategoryFilter
          categories={categories}
          categoryLabels={categoryLabels}
          filterTitle={categoryFilterTitle}
          active={activeCategory}
          onChange={onCategoryChange}
        />
      </div>
    </div>
  );
}
