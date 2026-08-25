import type { Metadata } from "next";
import { PartnerBenefitsSection } from "@/components/marketing/partner/PartnerBenefitsSection";
import { PartnerCasesSection } from "@/components/marketing/partner/PartnerCasesSection";
import { PartnerCtaSection } from "@/components/marketing/partner/PartnerCtaSection";
import { PartnerHero } from "@/components/marketing/partner/PartnerHero";
import { PartnershipModesSection } from "@/components/marketing/partner/PartnershipModesSection";

export const metadata: Metadata = {
  title: "合作伙伴生态 - 硅基流动 SiliconFlow",
  description:
    "依托开放稳定高效的大模型 API 能力，链接模型厂商与创新应用，与全球伙伴共建开放、共赢的 AI 生态价值共同体。",
};

export default function PartnerPage() {
  return (
    <div>
        <PartnerHero />
        <PartnershipModesSection />
        <PartnerBenefitsSection />
        <PartnerCasesSection />
        <PartnerCtaSection />
      </div>
  );
}
