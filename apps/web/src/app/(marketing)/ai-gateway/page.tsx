import type { Metadata } from "next";
import { ApplicationScenariosSection } from "@/components/marketing/ai-gateway/ApplicationScenariosSection";
import { GatewayFaqSection } from "@/components/marketing/ai-gateway/GatewayFaqSection";
import { GatewayHero } from "@/components/marketing/ai-gateway/GatewayHero";
import { GatewayTestimonialsSection } from "@/components/marketing/ai-gateway/GatewayTestimonialsSection";
import { ProductAdvantagesSection } from "@/components/marketing/ai-gateway/ProductAdvantagesSection";
import { ProductArchitectureSection } from "@/components/marketing/ai-gateway/ProductArchitectureSection";

export const metadata: Metadata = {
  title: "硅基流动大模型服务网关｜统一接入 智能路由 多模型调度",
  description:
    "硅基流动大模型服务网关，提供多模型统一接入、API统一管理、智能路由、成本优化，一站式简化大模型服务接入与运维。",
};

export default function AiGatewayPage() {
  return (
    <div>
        <GatewayHero />
        <ProductArchitectureSection />
        <ProductAdvantagesSection />
        <ApplicationScenariosSection />
        <GatewayTestimonialsSection />
        <GatewayFaqSection />
      </div>
  );
}
