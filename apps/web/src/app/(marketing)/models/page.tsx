import type { Metadata } from "next";
import { Suspense } from "react";
import { ModelsPageClient } from "@/components/marketing/models/ModelsPageClient";
import { getMarketingPageMetadata } from "@/lib/marketing-page-metadata";
import { staticPageMetadata } from "@/lib/static-page-metadata";

export const metadata: Metadata = staticPageMetadata((locale) =>
  getMarketingPageMetadata("models", locale),
);

export default function ModelsPage() {
  return (
    <div className="min-w-[380px] !bg-[#F7F9FC]">
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <ModelsPageClient />
      </Suspense>
    </div>
  );
}
