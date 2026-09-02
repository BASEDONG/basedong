import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PartnerBenefitsSection } from "@/components/marketing/partner/PartnerBenefitsSection";
import { PartnerCasesSection } from "@/components/marketing/partner/PartnerCasesSection";
import { PartnerCtaSection } from "@/components/marketing/partner/PartnerCtaSection";
import { PartnerHero } from "@/components/marketing/partner/PartnerHero";
import { PartnershipModesSection } from "@/components/marketing/partner/PartnershipModesSection";
import { getMarketingPageMetadata } from "@/lib/marketing-page-metadata";
import { staticPageMetadata } from "@/lib/static-page-metadata";
import { APP_ROUTES, PARTNER_PAGE_ENABLED } from "@/lib/routes";

export const metadata: Metadata = staticPageMetadata((locale) =>
  getMarketingPageMetadata("partner", locale),
);

export default function PartnerPage() {
  if (!PARTNER_PAGE_ENABLED) {
    redirect(APP_ROUTES.home);
  }

  return (
    <div>
      <PartnerHero />
      <PartnershipModesSection />
      <PartnerBenefitsSection />
      <PartnerCasesSection />
      <PartnerCtaSection />
    </div>
  );
}
