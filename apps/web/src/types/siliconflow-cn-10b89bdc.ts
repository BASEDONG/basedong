export type HeroSlideLayout = "inline" | "centered" | "stacked";

export type SfGradientPalette = {
  /** Hero slides use linear-gradient; cards use {@link BRAND_THEME.cardSurface} + soft blobs */
  base: string;
  /** Primary radial glow color */
  orbPrimary: string;
  /** Secondary radial glow color */
  orbSecondary: string;
  /** Dot indicator and title accent */
  accent: string;
  /** Large watermark logo on the right, e.g. /assets/marketing/home/images/hero-logos/gpt-5-6.svg */
  logoSrc?: string;
  logoAlt?: string;
  /** Illustration opacity; default ~0.22 watermark. Use ≥0.7 for a visible page hero art. */
  logoOpacity?: number;
};

/** @deprecated Use SfGradientPalette */
export type SfHeroSlideBackground = SfGradientPalette;

export type SfHeroSlide = {
  id: string;
  tabLabel: string;
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  layout?: HeroSlideLayout;
  background: SfGradientPalette;
};
export type ProductCardIllustrationVariant = "api" | "auto" | "inference" | "deploy";

export type SfProductCard = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  illustration: ProductCardIllustrationVariant;
  background: SfGradientPalette;
};

export type IndustryIllustrationVariant =
  | "internet"
  | "education"
  | "government"
  | "compute"
  | "ai-hardware";

export type SfIndustryItem = {
  title: string;
  description: string;
  illustration: IndustryIllustrationVariant;
  background: SfGradientPalette;
};

export type WhyHighlightIllustrationVariant = "cost-value" | "stability";
export type FeatureCardIllustrationVariant = "stability" | "intelligence" | "security" | "scalability";

export type SfTextPart = {
  text: string;
  emphasis?: boolean;
};

export type SfWhyTextBlock = {
  lines: SfTextPart[][];
  className?: string;
};

export type SfWhyHighlightStat = {
  prefix: string;
  value: string;
  suffix?: string;
};

export type SfWhyHighlightCard = {
  title: string;
  textBlocks: SfWhyTextBlock[];
  stats?: SfWhyHighlightStat[];
  footnotes?: SfTextPart[][];
  illustration: WhyHighlightIllustrationVariant;
  background: SfGradientPalette;
};

export type SfFeatureCard = {
  title: string;
  items: string[];
  illustration: FeatureCardIllustrationVariant;
  background: SfGradientPalette;
};
