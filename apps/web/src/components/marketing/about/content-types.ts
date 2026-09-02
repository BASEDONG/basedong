import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";
import type { ABOUT_ASSETS } from "./content-base";
import type { TimelineSide } from "./content-base";

export type TimelineItemStrings = {
  date: string;
  events: string[];
};

export type CertificationStrings = {
  label: string;
};

export type AboutStrings = {
  heroLogoAlt: string;
  heroTitle: string;
  heroSubtitle: string;
  introTitle: string;
  introParagraphs: readonly string[];
  timelineTitle: string;
  timelineItems: TimelineItemStrings[];
  certsTitle: string;
  certifications: CertificationStrings[];
  honorsTitle: string;
};

export type TimelineItem = {
  id: string;
  date: string;
  events: string[];
  side: TimelineSide;
  rockDesktop?: boolean;
  rockMobile?: boolean;
};

export type Certification = {
  label: string;
  image: string;
};

export type AboutContent = {
  heroBackground: SfGradientPalette;
  assets: typeof ABOUT_ASSETS;
  heroTitle: string;
  heroSubtitle: string;
  introTitle: string;
  introParagraphs: readonly string[];
  timelineTitle: string;
  timelineItems: TimelineItem[];
  certsTitle: string;
  certifications: Certification[];
  honorsTitle: string;
};
