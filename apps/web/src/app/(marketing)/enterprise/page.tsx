import type { Metadata } from "next";
import { ApplicationScenariosSection } from "@/components/marketing/enterprise/ApplicationScenariosSection";
import { EnterpriseFaqSection } from "@/components/marketing/enterprise/EnterpriseFaqSection";
import { EnterpriseHero } from "@/components/marketing/enterprise/EnterpriseHero";
import { EnterpriseTestimonialsSection } from "@/components/marketing/enterprise/EnterpriseTestimonialsSection";
import { ProductAdvantagesSection } from "@/components/marketing/enterprise/ProductAdvantagesSection";
import { ProductIntroSection } from "@/components/marketing/enterprise/ProductIntroSection";

export const metadata: Metadata = {
  title: "八色鸫企业级MaaS平台",
  description:
    "面向企业的大模型 MaaS 能力平台，贯通算力统一调度、模型训练微调、推理服务部署与业务场景落地，提供端到端闭环能力。",
};

export default function EnterprisePage() {
  return (
    <div>
      <EnterpriseHero />
      <ProductIntroSection />
      <ProductAdvantagesSection />
      <ApplicationScenariosSection />
      <EnterpriseTestimonialsSection />
      <EnterpriseFaqSection />
    </div>
  );
}
