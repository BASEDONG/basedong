import type { Metadata } from "next";
import { EcosystemSection } from "@/components/marketing/token-factory/EcosystemSection";
import { PartnershipSection } from "@/components/marketing/token-factory/PartnershipSection";
import { TechArchitecture } from "@/components/marketing/token-factory/TechArchitecture";
import { TestimonialsSection } from "@/components/marketing/token-factory/TestimonialsSection";
import { TokenFactoryCta } from "@/components/marketing/token-factory/TokenFactoryCta";
import { TokenFactoryFeatures } from "@/components/marketing/token-factory/TokenFactoryFeatures";
import { TokenFactoryHero } from "@/components/marketing/token-factory/TokenFactoryHero";
import { WhyChooseSection } from "@/components/marketing/token-factory/WhyChooseSection";

export const metadata: Metadata = {
  title: "八色鸫 AI 算力运营平台",
  description: "适配主流 GPU，把自有算力快速变成可持续运转的 Token 产能",
};

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
