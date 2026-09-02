import type { WhyChooseCard } from "@/components/marketing/shared/WhyChooseCardsSection";
import type {
  SfHeroSlide,
  SfIndustryItem,
  SfProductCard,
  SfTextPart,
  SfWhyHighlightCard,
  SfWhyHighlightStat,
  SfWhyTextBlock,
} from "@/types/siliconflow-cn-10b89bdc";

export type HeroSlideStrings = {
  tabLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  logoAlt: string;
};

export type ProductCardStrings = {
  title: string;
  description: string;
  ctaLabel: string;
};

export type WhyHighlightCardStrings = {
  title: string;
  textBlocks: SfWhyTextBlock[];
  stats?: SfWhyHighlightStat[];
  footnotes?: SfTextPart[][];
};

export type FeatureCardStrings = {
  title: string;
  description: string;
};

export type IndustryItemStrings = {
  title: string;
  description: string;
};

export type HomeStrings = {
  heroSlides: HeroSlideStrings[];
  productMatrix: {
    title: string;
    subtitle: string;
  };
  productCards: ProductCardStrings[];
  whySection: {
    title: string;
  };
  whyHighlightCards: WhyHighlightCardStrings[];
  featureCards: FeatureCardStrings[];
  industrySection: {
    title: string;
  };
  industryItems: IndustryItemStrings[];
  partners: {
    title: string;
    ctaPrimaryDesc: string;
    ctaPrimaryButton: string;
    ctaSecondaryDesc: string;
    ctaSecondaryButton: string;
  };
  heroCarousel: {
    ariaLabel: string;
    switchTabLabel: (tabLabel: string) => string;
  };
};

export type HomeContent = {
  heroSlides: SfHeroSlide[];
  productMatrix: HomeStrings["productMatrix"];
  productCards: SfProductCard[];
  whySection: HomeStrings["whySection"];
  whyHighlightCards: SfWhyHighlightCard[];
  featureCards: WhyChooseCard[];
  industrySection: HomeStrings["industrySection"];
  industryItems: SfIndustryItem[];
  partners: HomeStrings["partners"];
  heroCarousel: HomeStrings["heroCarousel"];
};
