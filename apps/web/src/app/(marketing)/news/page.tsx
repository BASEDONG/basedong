import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { NewsPageClient } from "@/components/marketing/news/NewsPageClient";
import { getMarketingPageMetadata } from "@/lib/marketing-page-metadata";
import { staticPageMetadata } from "@/lib/static-page-metadata";
import { ABOUT_MENU_ENABLED, APP_ROUTES } from "@/lib/routes";

export const metadata: Metadata = staticPageMetadata((locale) =>
  getMarketingPageMetadata("news", locale),
);

export default function NewsPage() {
  if (!ABOUT_MENU_ENABLED) {
    redirect(APP_ROUTES.home);
  }

  return (
    <div className="bg-white pb-[68px] text-slate-800 max-[1024px]:pb-0">
      <NewsPageClient />
    </div>
  );
}
