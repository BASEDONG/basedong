import type { Metadata } from "next";
import { ApplicationScenariosSection } from "@/components/marketing/ai-gateway/ApplicationScenariosSection";
import { GatewayFaqSection } from "@/components/marketing/ai-gateway/GatewayFaqSection";
import { GatewayHero } from "@/components/marketing/ai-gateway/GatewayHero";
import { GatewayTestimonialsSection } from "@/components/marketing/ai-gateway/GatewayTestimonialsSection";
import { ProductAdvantagesSection } from "@/components/marketing/ai-gateway/ProductAdvantagesSection";
import { ProductArchitectureSection } from "@/components/marketing/ai-gateway/ProductArchitectureSection";
import { getMarketingPageMetadata } from "@/lib/marketing-page-metadata";
import { staticPageMetadata } from "@/lib/static-page-metadata";

export const metadata: Metadata = staticPageMetadata((locale) =>
  getMarketingPageMetadata("ai-gateway", locale),
);

export default function AiGatewayPage() {
  return (
    <div>
      <GatewayHero />
      <ProductArchitectureSection />
      <ProductAdvantagesSection />
      <ApplicationScenariosSection />
      <GatewayTestimonialsSection />
      <GatewayFaqSection />
    </div>
  );
}
