import { NewsArticleCard } from "./NewsArticleCard";
import { NewsCategoryFilter } from "./NewsCategoryFilter";
import type { NewsArticle, NewsCategory } from "./content-types";

type NewsListSectionProps = {
  articles: NewsArticle[];
  categories: NewsCategory[];
  activeCategory: NewsCategory;
  onCategoryChange: (category: NewsCategory) => void;
};

export function NewsListSection({
  articles,
  categories,
  activeCategory,
  onCategoryChange,
}: NewsListSectionProps) {
  return (
    <div className="flex items-center justify-center bg-white pt-[58px] pb-[46px]">
      <div className="flex w-full max-w-[1434px] gap-[34px] max-[1024px]:w-full max-[1024px]:flex-col-reverse max-[1024px]:px-[14px]">
        <div className="flex-1 space-y-8 max-[1024px]:w-full max-[1024px]:flex-none">
          {articles.map((article) => (
            <NewsArticleCard key={article.id} article={article} />
          ))}
        </div>
        <NewsCategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={onCategoryChange}
        />
      </div>
    </div>
  );
}
