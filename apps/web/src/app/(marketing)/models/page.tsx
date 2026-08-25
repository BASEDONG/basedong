import type { Metadata } from "next";
import { Suspense } from "react";
import { ModelsPageClient } from "@/components/marketing/models/ModelsPageClient";

export const metadata: Metadata = {
  title: "模型中心｜硅基流动 SiliconFlow 大模型云服务",
  description: "你要的 AI 模型，这里都有。1 个 API，3 行代码，100+ 主流模型轻松调用",
};

export default function ModelsPage() {
  return (
    <div className="min-w-[380px] !bg-[#F7F9FC]">
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <ModelsPageClient />
      </Suspense>
    </div>
  );
}
