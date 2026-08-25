import type { Metadata } from "next";
import { BrandPageClient } from "@/components/marketing/brand/BrandPageClient";

export const metadata: Metadata = {
  title: "品牌解读 - 硅基流动 SiliconFlow",
  description:
    "硅基流动品牌焕新：使命愿景、价值观、品牌关系与使用规范，做所有人的 AI。",
};

export default function BrandPage() {
  return (
    <div className="bg-white text-slate-900">
      <BrandPageClient />
    </div>
  );
}
