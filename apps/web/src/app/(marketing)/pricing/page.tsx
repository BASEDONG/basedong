import type { Metadata } from "next";
import { PricingPageClient } from "@/components/marketing/pricing/PricingPageClient";

export const metadata: Metadata = {
  title: "大模型 API 价格方案 - 硅基流动 SiliconFlow",
  description:
    "面向生产选型的模型价格页：一屏对比主流厂商与模型的输入、输出、缓存命中成本，帮助你快速判断性价比。",
};

export default function PricingPage() {
  return (
    <div className="bg-white text-slate-900">
      <PricingPageClient />
    </div>
  );
}
