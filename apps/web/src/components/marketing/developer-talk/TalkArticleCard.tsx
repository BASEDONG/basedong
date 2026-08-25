import type { TalkArticle } from "./content-types";

interface TalkArticleCardProps {
  article: TalkArticle;
}

export function TalkArticleCard({ article }: TalkArticleCardProps) {
  return (
    <article className="group relative min-w-0">
      <a
        href={article.href}
        className="absolute inset-0 z-10"
        aria-label={article.title}
      />
      <div
        className="aspect-[377/191] w-full rounded-[6px] bg-[#14121f] bg-cover bg-center transition-transform duration-500 group-hover:-translate-y-[2px]"
        style={{ backgroundImage: `url(${article.cover})` }}
      />
      <h3 className="mt-[14px] min-h-[44px] line-clamp-2 text-[18px] font-semibold leading-[1.32] text-[#1F2937] max-[720px]:min-h-0 max-[720px]:text-[16px]">
        {article.title}
      </h3>
      <div className="mt-[12px] flex flex-wrap items-center gap-[16px] text-[14px] text-[#718096]">
        <span className="flex h-[30px] w-[76px] items-center justify-center rounded-full border border-slate-400 bg-white text-[14px] leading-none text-slate-500">
          {article.tag}
        </span>
        <span>{article.date}</span>
      </div>
    </article>
  );
}
