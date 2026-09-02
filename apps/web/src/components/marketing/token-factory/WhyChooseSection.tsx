"use client";

import { WhyChooseCardsSection } from "@/components/marketing/shared/WhyChooseCardsSection";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getTokenFactoryContent } from "./content";

export function WhyChooseSection() {
  const { locale } = useLocale();
  const { whyChooseTitle, whyCards } = getTokenFactoryContent(locale);

  return (
    <WhyChooseCardsSection
      title={whyChooseTitle}
      cards={whyCards}
      columns={4}
    />
  );
}
