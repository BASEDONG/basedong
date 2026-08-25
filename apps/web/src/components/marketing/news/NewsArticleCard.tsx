import type { NewsArticle } from "./content-types";
import { cn } from "@/lib/utils";

type NewsArticleCardProps = {
  article: NewsArticle;
};

export function NewsArticleCard({ article }: NewsArticleCardProps) {
  return (
    <article
      className={cn(
        "relative h-[208px] w-full rounded-[8px] border border-slate-200 p-6 pl-[208px] transition-all",
        "hover:border-[#4AABF0]",
        "max-[1024px]:block max-[1024px]:h-[114px] max-[1024px]:p-4 max-[1024px]:pl-[88px]",
      )}
    >
      <a
        href={article.href}
        target="_blank"
        rel="noreferrer"
        className="absolute top-0 left-0 z-10 h-full w-full"
        aria-label={article.title}
      />
      <div
        className="absolute top-6 left-6 h-40 w-40 rounded-[8px] bg-cover bg-center bg-no-repeat max-[1024px]:top-5 max-[1024px]:left-4 max-[1024px]:h-14 max-[1024px]:w-14"
        style={{ backgroundImage: `url(${article.thumb})` }}
        role="img"
        aria-label={article.title}
      />
      <section className="flex h-auto w-full flex-col justify-between max-[1024px]:h-full">
        <h3 className="mb-4 line-clamp-1 text-[24px] leading-9 font-semibold text-slate-800 max-[1024px]:mb-2 max-[1024px]:line-clamp-2 max-[1024px]:text-[14px] max-[1024px]:leading-5 max-[1024px]:font-medium">
          {article.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-base leading-7 text-slate-600 max-[1024px]:hidden">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-[11px]">
          <div className="rounded-[14px] border border-slate-500 px-3 py-1 text-sm text-slate-500">
            {article.category}
          </div>
          <div className="text-sm text-slate-500">{article.date}</div>
        </div>
      </section>
    </article>
  );
}
