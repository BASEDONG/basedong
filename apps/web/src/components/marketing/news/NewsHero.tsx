import type { NewsFeatured } from "./content-types";

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
    </svg>
  );
}

type NewsHeroProps = {
  title: string;
  featured: NewsFeatured;
  heroBg: string;
};

export function NewsHero({ title, featured, heroBg }: NewsHeroProps) {
  return (
    <div
      className="relative flex h-[800px] w-full items-center justify-center bg-cover bg-center bg-no-repeat px-[14px] max-[1024px]:h-auto max-[1024px]:pb-5 max-[1024px]:pt-14"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <section className="mx-auto h-full w-full max-w-[1434px] pt-[180px] max-[1024px]:py-9">
        <h2 className="mb-4 text-[48px] leading-[72px] font-semibold text-[#4AABF0] max-[1024px]:text-center max-[1024px]:text-[36px] max-[1024px]:leading-[54px]">
          {title}
        </h2>
        <div className="relative flex h-[320px] w-full justify-center gap-10 rounded-[8px] bg-white/60 p-6 max-[1024px]:h-auto max-[1024px]:flex-col max-[1024px]:gap-4 max-[1024px]:p-4">
          <div
            className="relative h-[272px] w-[663px] shrink-0 rounded-[8px] bg-cover bg-center bg-no-repeat max-[1024px]:h-32 max-[1024px]:w-full"
            style={{ backgroundImage: `url(${featured.cover})` }}
          >
            <a
              href={featured.href}
              target="_blank"
              rel="noreferrer"
              className="absolute top-0 left-0 z-10 h-full w-full cursor-pointer"
              aria-label={featured.title}
            />
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <h3 className="mb-6 line-clamp-2 text-[24px] leading-9 font-normal max-[1024px]:mb-4 max-[1024px]:line-clamp-3">
              <a
                href={featured.href}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                {featured.title}
              </a>
            </h3>
            <p className="mb-4 line-clamp-3 text-base leading-6 text-slate-600">
              {featured.excerpt}
            </p>
            <div className="flex flex-col">
              <div className="mb-4 flex items-center gap-[11px]">
                <div className="rounded-[14px] border border-slate-500 px-3 py-1 text-sm text-slate-500">
                  {featured.category}
                </div>
                <div className="text-sm text-slate-500">{featured.date}</div>
              </div>
              <a
                href={featured.href}
                target="_blank"
                rel="noreferrer"
                className="relative flex items-center gap-[5px] text-sm leading-[21px] text-[#4AABF0]"
              >
                查看更多 <ArrowRightIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
