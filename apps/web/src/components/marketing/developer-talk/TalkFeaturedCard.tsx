import type { TalkArticle } from "./content-types";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TalkFeaturedCardProps {
  article: TalkArticle;
  featuredReadMore: string;
  tagLabel: string;
}

export function TalkFeaturedCard({
  article,
  featuredReadMore,
  tagLabel,
}: TalkFeaturedCardProps) {
  return (
    <Card
      variant="elevated"
      className="relative grid min-h-[294px] grid-cols-[600px_1fr] gap-[30px] border-transparent bg-white/70 p-[30px] shadow-[0_24px_80px_rgba(76,87,115,0.08)] backdrop-blur max-[1280px]:grid-cols-[1fr_1fr] max-[720px]:grid-cols-1 max-[720px]:p-[16px]"
    >
      <a
        href={article.href}
        className="absolute inset-0 z-10"
        aria-label={article.title}
      />
      <div
        className="aspect-[600/272] rounded-[8px] bg-[#14121f] bg-cover bg-center"
        style={{ backgroundImage: `url(${article.cover})` }}
      />
      <div className="flex min-w-0 flex-col justify-center py-[4px]">
        <h2 className="line-clamp-2 text-[26px] font-semibold leading-[1.35] text-[#344054] max-[720px]:text-[20px]">
          {article.title}
        </h2>
        <p className="mt-[22px] line-clamp-3 text-[16px] leading-[1.8] text-[#667085] max-[720px]:mt-[14px] max-[720px]:text-[14px]">
          {article.excerpt}
        </p>
        <div className="mt-[22px] flex flex-wrap items-center gap-[16px] text-[14px] text-[#718096]">
          <span className="flex h-[30px] min-w-[76px] items-center justify-center rounded-full border border-slate-400 bg-white px-3 text-[14px] leading-none text-slate-500">
            {tagLabel}
          </span>
          <span>{article.date}</span>
        </div>
        <div className="mt-[18px] inline-flex items-center gap-[4px] text-[14px] font-semibold text-[#42526B]">
          {featuredReadMore}
          <ArrowRight className="h-5 w-5" aria-hidden />
        </div>
      </div>
    </Card>
  );
}
