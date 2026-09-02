"use client";

import { WhyChooseCardsSection } from "@/components/marketing/shared/WhyChooseCardsSection";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getEnterpriseContent } from "./content";
import { getEnterpriseUiCopy } from "./enterprise-ui-copy";

export function ProductAdvantagesSection() {
  const { locale } = useLocale();
  const { advantagesTitle } = getEnterpriseUiCopy(locale);
  const { advantageCards } = getEnterpriseContent(locale);

  return (
    <WhyChooseCardsSection
      title={advantagesTitle}
      cards={advantageCards}
      columns={3}
    />
  );
}
