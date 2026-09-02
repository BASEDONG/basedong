import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";

import type { WhyChooseCard } from "@/components/marketing/shared/WhyChooseCardsSection";

import type { LucideIcon } from "lucide-react";



export type FeatureCardCopy = {

  title: string;

  description: string;

};



export type ArchitectureLayerCopy = {

  title: string;

  subtitle: string;

};



export type PartnershipCardCopy = {

  title: string;

  description: string;

  partnerLabel: string;

  partners: string;

  benefits: string[];

  cta: string;

};



export type WhyCardCopy = {

  prefix: string;

  title: string;

  description: string;

};



export type TestimonialCopy = {

  title: string;

  quote: string;

  role: string;

};



export type GpuVendorCopy = {

  alt: string;

};



export type TokenFactoryStrings = {

  heroLogoAlt: string;

  heroBrandName: string;

  heroTitle: string;

  heroSubtitle: string;

  heroTags: readonly string[];

  heroCta: string;

  featuresTitle: string;

  featuresSubtitle: string;

  featureCards: FeatureCardCopy[];

  architectureBadge: string;

  architectureTitleLine1: string;

  architectureTitleLine2: string;

  architectureBodyPrefix: string;

  architectureBodySuffix: string;

  architectureLayers: ArchitectureLayerCopy[];

  partnershipTitle: string;

  partnershipBenefitsHeading: string;

  partnershipCards: PartnershipCardCopy[];

  whyChooseTitle: string;

  whyCards: WhyCardCopy[];

  ecosystemTitle: string;

  ecosystemSubtitle: string;

  gpuVendors: GpuVendorCopy[];

  testimonialsTitle: string;

  testimonials: TestimonialCopy[];

  ctaTitle: string;

  ctaSubtitle: string;

  ctaButton: string;

};



export type ArchitectureLayer = ArchitectureLayerCopy & {

  icon: LucideIcon;

  iconBg: string;

};



export type PartnershipCard = PartnershipCardCopy & {

  icon: LucideIcon;

  iconBg: string;

};



export type Testimonial = TestimonialCopy & {

  avatarSeed: string;

  bg: string;

};



export type GpuVendor = GpuVendorCopy & {

  id: string;

  name: string;

  logo: string;

};



export type TokenFactoryContent = {

  heroBackground: SfGradientPalette;

  consultUrl: string;

  assets: string;

  heroBrandName: string;

  heroTitle: string;

  heroSubtitle: string;

  heroTags: readonly string[];

  heroCta: string;

  featuresTitle: string;

  featuresSubtitle: string;

  featureCards: WhyChooseCard[];

  architectureBadge: string;

  architectureTitleLine1: string;

  architectureTitleLine2: string;

  architectureBodyPrefix: string;

  architectureBodySuffix: string;

  architectureLayers: ArchitectureLayer[];

  partnershipTitle: string;

  partnershipBenefitsHeading: string;

  partnershipCards: PartnershipCard[];

  whyChooseTitle: string;

  whyCards: WhyChooseCard[];

  ecosystemTitle: string;

  ecosystemSubtitle: string;

  gpuVendors: GpuVendor[];

  testimonialsTitle: string;

  testimonials: Testimonial[];

  ctaTitle: string;

  ctaSubtitle: string;

  ctaButton: string;

};

