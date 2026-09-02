import type { Metadata } from "next";
import { PricingPageClient } from "@/components/marketing/pricing/PricingPageClient";
import { getPricingPageMetadata } from "@/lib/marketing-page-metadata";
import { staticPageMetadata } from "@/lib/static-page-metadata";

export const metadata: Metadata = staticPageMetadata(getPricingPageMetadata);

export default function PricingPage() {
  return (
    <div className="bg-white text-slate-900">
      <PricingPageClient />
    </div>
  );
}
