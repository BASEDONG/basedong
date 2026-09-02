import type { TalkArticle, TalkArticleTag, TalkCategory } from "./content-types";
import { TalkArticleCard } from "./TalkArticleCard";
import { TalkCategoryFilter } from "./TalkCategoryFilter";

interface TalkListSectionProps {
  articles: TalkArticle[];
  categories: TalkCategory[];
  categoryLabels: Record<TalkCategory, string>;
  tagLabels: Record<TalkArticleTag, string>;
  selected: string[];
  onToggle: (category: TalkCategory) => void;
  onClear: () => void;
}

export function TalkListSection({
  articles,
  categories,
  categoryLabels,
  tagLabels,
  selected,
  onToggle,
  onClear,
}: TalkListSectionProps) {
  return (
    <section className="pb-[82px] pt-[72px] max-[720px]:py-[48px]">
      <div className="sf-content">
        <TalkCategoryFilter
          categories={categories}
          categoryLabels={categoryLabels}
          selected={selected}
          onToggle={onToggle}
          onClear={onClear}
        />
        <div className="grid grid-cols-3 gap-x-[40px] gap-y-[46px] max-[1280px]:grid-cols-2 max-[1280px]:gap-x-[30px] max-[720px]:grid-cols-1 max-[720px]:gap-y-[32px]">
          {articles.map((article) => (
            <TalkArticleCard
              key={article.id}
              article={article}
              tagLabel={tagLabels[article.tag]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
