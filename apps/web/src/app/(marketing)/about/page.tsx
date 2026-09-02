import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AboutPageClient } from "@/components/marketing/about/AboutPageClient";
import { getMarketingPageMetadata } from "@/lib/marketing-page-metadata";
import { staticPageMetadata } from "@/lib/static-page-metadata";
import { ABOUT_MENU_ENABLED, APP_ROUTES } from "@/lib/routes";

export const metadata: Metadata = staticPageMetadata((locale) =>
  getMarketingPageMetadata("about", locale),
);

export default function AboutPage() {
  if (!ABOUT_MENU_ENABLED) {
    redirect(APP_ROUTES.home);
  }

  return (
    <div className="bg-white text-slate-900">
      <AboutPageClient />
    </div>
  );
}
