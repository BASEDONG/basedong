"use client";

import { WhyChooseCardsSection } from "@/components/marketing/shared/WhyChooseCardsSection";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getGatewayContent } from "./content";
import { getGatewayUiCopy } from "./gateway-ui-copy";

export function ProductAdvantagesSection() {
  const { locale } = useLocale();
  const { advantagesTitle } = getGatewayUiCopy(locale);
  const { advantages } = getGatewayContent(locale);

  return (
    <WhyChooseCardsSection
      title={advantagesTitle}
      cards={advantages}
      columns={3}
    />
  );
}
