import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DeliverySlaSection } from "@/components/marketing/reserved/DeliverySlaSection";
import { PricingSection } from "@/components/marketing/reserved/PricingSection";
import { ReservedCta } from "@/components/marketing/reserved/ReservedCta";
import { ReservedHero } from "@/components/marketing/reserved/ReservedHero";
import { WhyReservedSection } from "@/components/marketing/reserved/WhyReservedSection";
import { APP_ROUTES, RESERVED_PAGE_ENABLED } from "@/lib/routes";

export const metadata: Metadata = {
  title: "硅基流动预留实例服务｜大模型预留算力与企业级推理部署",
  description:
    "锁定算力，支撑关键业务稳定运行。可预期性能 · 高用量场景更优成本结构 · 企业级 SLA 保障",
};

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
