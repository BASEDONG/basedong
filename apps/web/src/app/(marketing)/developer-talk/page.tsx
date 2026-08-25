import type { Metadata } from "next";
import { Suspense } from "react";
import { TalkPageClient } from "@/components/marketing/developer-talk/TalkPageClient";

export const metadata: Metadata = {
  title: "技术实践与用户故事 - 硅基流动 | SiliconFlow",
  description: "来自开发者的真实实践与洞察",
};

export default function DeveloperTalkPage() {
  return (
    <div className="bg-[#F4F7FB] text-[#1F2937]">
      <Suspense fallback={null}>
        <TalkPageClient />
      </Suspense>
    </div>
  );
}
