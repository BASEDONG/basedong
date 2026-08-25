import type { Metadata } from "next";
import { NewsPageClient } from "@/components/marketing/news/NewsPageClient";

export const metadata: Metadata = {
  title: "最新资讯、产品与活动 - 硅基流动 SiliconFlow",
  description:
    "了解硅基流动最新企业动态、模型上新、生态合作、客户案例与市场活动。",
};

export default function NewsPage() {
  return (
    <div className="bg-white pb-[68px] text-slate-800 max-[1024px]:pb-0">
      <NewsPageClient />
    </div>
  );
}
