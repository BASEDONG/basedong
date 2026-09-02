import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { TalkPageClient } from "@/components/marketing/developer-talk/TalkPageClient";
import { getMarketingPageMetadata } from "@/lib/marketing-page-metadata";
import { staticPageMetadata } from "@/lib/static-page-metadata";
import { ABOUT_MENU_ENABLED, APP_ROUTES } from "@/lib/routes";

export const metadata: Metadata = staticPageMetadata((locale) =>
  getMarketingPageMetadata("developer-talk", locale),
);

export default function DeveloperTalkPage() {
  if (!ABOUT_MENU_ENABLED) {
    redirect(APP_ROUTES.home);
  }

  return (
    <div className="bg-[#F4F7FB] text-[#1F2937]">
      <Suspense fallback={null}>
        <TalkPageClient />
      </Suspense>
    </div>
  );
}
