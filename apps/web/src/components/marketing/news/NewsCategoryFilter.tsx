import type { NewsCategory } from "./content-types";
import { cn } from "@/lib/utils";

type NewsCategoryFilterProps = {
  categories: NewsCategory[];
  categoryLabels: Record<NewsCategory, string>;
  filterTitle: string;
  active: NewsCategory;
  onChange: (category: NewsCategory) => void;
};

export function NewsCategoryFilter({
  categories,
  categoryLabels,
  filterTitle,
  active,
  onChange,
}: NewsCategoryFilterProps) {
  return (
    <div className="w-[248px] max-[1024px]:w-full">
      <div className="sticky top-[120px]">
        <div className="mb-[26px] text-[24px] leading-5 font-semibold text-slate-400 max-[1024px]:hidden">
          {filterTitle}
        </div>
        <div className="flex flex-wrap gap-4 whitespace-nowrap max-[1024px]:justify-center max-[1024px]:gap-3">
          {categories.map((category) => {
            const isActive = category === active;
            return (
              <button
                key={category}
                type="button"
                onClick={() => onChange(category)}
                className={cn(
                  "w-[104px] cursor-pointer rounded-[20px] border border-slate-400 px-4 py-1 text-center text-base text-slate-800 transition-colors",
                  isActive && "border-[#4AABF0] bg-[#4AABF0] text-white",
                )}
              >
                {categoryLabels[category]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
