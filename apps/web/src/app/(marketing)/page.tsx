import type { Metadata } from "next";
import { HeroCarousel } from "@/components/marketing/home/HeroCarousel";
import { IndustrySolutions } from "@/components/marketing/home/IndustrySolutions";
import { PartnersAndCta } from "@/components/marketing/home/PartnersAndCta";
import { ProductMatrix } from "@/components/marketing/home/ProductMatrix";
import { WhySiliconFlow } from "@/components/marketing/home/WhySiliconFlow";
import { getMarketingPageMetadata } from "@/lib/marketing-page-metadata";
import { staticPageMetadata } from "@/lib/static-page-metadata";

export const metadata: Metadata = staticPageMetadata((locale) =>
  getMarketingPageMetadata("home", locale),
);

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <ProductMatrix />
      <WhySiliconFlow />
      <IndustrySolutions />
      <PartnersAndCta />
    </>
  );
}
