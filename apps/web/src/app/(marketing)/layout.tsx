import { SiteFooter } from "@/components/marketing/home/SiteFooter";
import { SiteHeader } from "@/components/marketing/home/SiteHeader";
import { ConsoleLocaleBanner } from "@/components/marketing/shared/ConsoleLocaleBanner";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="sf-site min-h-screen">
      <ConsoleLocaleBanner />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
