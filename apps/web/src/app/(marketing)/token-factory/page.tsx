import type { Metadata } from "next";
import { EcosystemSection } from "@/components/marketing/token-factory/EcosystemSection";
import { PartnershipSection } from "@/components/marketing/token-factory/PartnershipSection";
import { TechArchitecture } from "@/components/marketing/token-factory/TechArchitecture";
import { TestimonialsSection } from "@/components/marketing/token-factory/TestimonialsSection";
import { TokenFactoryCta } from "@/components/marketing/token-factory/TokenFactoryCta";
import { TokenFactoryFeatures } from "@/components/marketing/token-factory/TokenFactoryFeatures";
import { TokenFactoryHero } from "@/components/marketing/token-factory/TokenFactoryHero";
import { WhyChooseSection } from "@/components/marketing/token-factory/WhyChooseSection";
import { getMarketingPageMetadata } from "@/lib/marketing-page-metadata";
import { staticPageMetadata } from "@/lib/static-page-metadata";

export const metadata: Metadata = staticPageMetadata((locale) =>
  getMarketingPageMetadata("token-factory", locale),
);

export default function TokenFactoryPage() {
  return (
    <div>
      <TokenFactoryHero />
      <TokenFactoryFeatures />
      <TechArchitecture />
      <PartnershipSection />
      <WhyChooseSection />
      <EcosystemSection />
      <TestimonialsSection />
      <TokenFactoryCta />
    </div>
  );
}
