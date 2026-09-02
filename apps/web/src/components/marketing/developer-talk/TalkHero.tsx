import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";
import { HeroSlideBackground } from "@/components/marketing/home/HeroSlideBackground";
import { MarketingButton } from "@/components/marketing/shared/MarketingButton";
import type { TalkArticle, TalkArticleTag } from "./content-types";
import { TalkFeaturedCard } from "./TalkFeaturedCard";

interface TalkHeroProps {
  title: string;
  subtitle: string;
  shareLabel: string;
  shareHref: string;
  heroBackground: SfGradientPalette;
  featured: TalkArticle;
  featuredReadMore: string;
  tagLabels: Record<TalkArticleTag, string>;
}

export function TalkHero({
  title,
  subtitle,
  shareLabel,
  shareHref,
  heroBackground,
  featured,
  featuredReadMore,
  tagLabels,
}: TalkHeroProps) {
  return (
    <section className="relative overflow-hidden pb-[126px] pt-[170px] max-[720px]:pb-[64px] max-[720px]:pt-[104px]">
      <HeroSlideBackground {...heroBackground} />
      <div className="sf-content relative z-10">
        <div className="mb-[30px] flex items-end justify-between gap-[24px] max-[720px]:items-start">
          <div>
            <h1 className="text-[40px] font-semibold leading-[1.2] text-[#1F2937] max-[720px]:text-[30px]">
              {title}
            </h1>
            <p className="mt-[8px] text-[14px] font-medium text-[#64748B]">
              {subtitle}
            </p>
          </div>
          <MarketingButton
            href={shareHref}
            variant="secondary"
            size="sm"
            showArrow
            className="h-[48px] shrink-0 px-5 text-[16px] max-[720px]:h-10 max-[720px]:px-3 max-[720px]:text-[13px]"
          >
            {shareLabel}
          </MarketingButton>
        </div>
        <TalkFeaturedCard
          article={featured}
          featuredReadMore={featuredReadMore}
          tagLabel={tagLabels[featured.tag]}
        />
      </div>
    </section>
  );
}
