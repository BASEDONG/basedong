import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DeliverySlaSection } from "@/components/marketing/reserved/DeliverySlaSection";
import { PricingSection } from "@/components/marketing/reserved/PricingSection";
import { ReservedCta } from "@/components/marketing/reserved/ReservedCta";
import { ReservedHero } from "@/components/marketing/reserved/ReservedHero";
import { WhyReservedSection } from "@/components/marketing/reserved/WhyReservedSection";
import { getReservedPageMetadata } from "@/lib/marketing-page-metadata";
import { staticPageMetadata } from "@/lib/static-page-metadata";
import { APP_ROUTES, RESERVED_PAGE_ENABLED } from "@/lib/routes";

export const metadata: Metadata = staticPageMetadata(getReservedPageMetadata);

export default function ReservedPage() {
  if (!RESERVED_PAGE_ENABLED) {
    redirect(APP_ROUTES.home);
  }

  return (
    <div>
      <ReservedHero />
      <WhyReservedSection />
      <PricingSection />
      <DeliverySlaSection />
      <ReservedCta />
    </div>
  );
}
