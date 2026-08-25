import type { Metadata } from "next";
import { AboutPageClient } from "@/components/marketing/about/AboutPageClient";

export const metadata: Metadata = {
  title: "公司介绍 - 硅基流动 SiliconFlow",
  description:
    "硅基流动（SiliconFlow）成立于2023年，是国内领先的独立生态词元（Token）供应平台，做所有人的 AI。",
};

export default function AboutPage() {
  return (
    <div className="bg-white text-slate-900">
      <AboutPageClient />
    </div>
  );
}
