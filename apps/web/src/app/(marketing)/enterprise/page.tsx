import type { Metadata } from "next";
import { ApplicationScenariosSection } from "@/components/marketing/enterprise/ApplicationScenariosSection";
import { EnterpriseFaqSection } from "@/components/marketing/enterprise/EnterpriseFaqSection";
import { EnterpriseHero } from "@/components/marketing/enterprise/EnterpriseHero";
import { EnterpriseTestimonialsSection } from "@/components/marketing/enterprise/EnterpriseTestimonialsSection";
import { ProductAdvantagesSection } from "@/components/marketing/enterprise/ProductAdvantagesSection";
import { ProductIntroSection } from "@/components/marketing/enterprise/ProductIntroSection";
import { getMarketingPageMetadata } from "@/lib/marketing-page-metadata";
import { staticPageMetadata } from "@/lib/static-page-metadata";

export const metadata: Metadata = staticPageMetadata((locale) =>
  getMarketingPageMetadata("enterprise", locale),
);

export default function EnterprisePage() {
  return (
    <div>
      <EnterpriseHero />
      <ProductIntroSection />
      <ProductAdvantagesSection />
      <ApplicationScenariosSection />
      <EnterpriseTestimonialsSection />
      <EnterpriseFaqSection />
    </div>
  );
}
