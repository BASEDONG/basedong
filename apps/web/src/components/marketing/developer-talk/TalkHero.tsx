import type { TalkArticle } from "./content-types";
import { ShareArrowIcon } from "./icons";
import { TalkFeaturedCard } from "./TalkFeaturedCard";

interface TalkHeroProps {
  title: string;
  subtitle: string;
  heroBg: string;
  shareLabel: string;
  shareHref: string;
  featured: TalkArticle;
}

export function TalkHero({
  title,
  subtitle,
  heroBg,
  shareLabel,
  shareHref,
  featured,
}: TalkHeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-top px-[24px] pb-[126px] pt-[170px] max-[720px]:px-[16px] max-[720px]:pb-[64px] max-[720px]:pt-[104px]"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-[30px] flex items-end justify-between gap-[24px] max-[720px]:items-start">
          <div>
            <h1 className="text-[40px] font-semibold leading-[1.2] text-[#1F2937] max-[720px]:text-[30px]">
              {title}
            </h1>
            <p className="mt-[8px] text-[14px] font-medium text-[#64748B]">
              {subtitle}
            </p>
          </div>
          <a
            href={shareHref}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex h-[48px] shrink-0 items-center justify-center gap-[8px] rounded-[8px] border border-[#4AABF0] px-[20px] text-[16px] font-semibold text-[#4AABF0] transition-all duration-300 hover:bg-[#4AABF0] hover:text-white max-[720px]:h-[40px] max-[720px]:px-[12px] max-[720px]:text-[13px]"
          >
            <span>{shareLabel}</span>
            <ShareArrowIcon className="h-[22px] w-[22px] transition-transform duration-300 group-hover:translate-x-[4px]" />
          </a>
        </div>
        <TalkFeaturedCard article={featured} />
      </div>
    </section>
  );
}
