import { cn } from "@/lib/utils";
import type { TalkCategory } from "./content-types";

interface TalkCategoryFilterProps {
  categories: TalkCategory[];
  selected: string[];
  onToggle: (category: TalkCategory) => void;
  onClear: () => void;
}

export function TalkCategoryFilter({
  categories,
  selected,
  onToggle,
  onClear,
}: TalkCategoryFilterProps) {
  return (
    <div className="mb-[36px]">
      <div className="flex flex-wrap items-center gap-[10px] max-[720px]:gap-[8px]">
        {categories.map((category) => {
          const isAll = category === "全部";
          const active = isAll
            ? selected.length === 0
            : selected.includes(category);

          return (
            <button
              key={category}
              type="button"
              onClick={() => (isAll ? onClear() : onToggle(category))}
              className={cn(
                "h-[28px] rounded-full border px-[16px] text-[13px] font-medium transition-colors",
                active
                  ? "border-[#4AABF0] bg-[#4AABF0] text-white"
                  : "border-[#CAD2DD] bg-white text-[#617084] hover:border-[#4AABF0] hover:text-[#4AABF0]",
              )}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
