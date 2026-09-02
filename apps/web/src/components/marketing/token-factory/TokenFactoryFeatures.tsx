"use client";

import { WhyChooseCardsSection } from "@/components/marketing/shared/WhyChooseCardsSection";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getTokenFactoryContent } from "./content";

export function TokenFactoryFeatures() {
  const { locale } = useLocale();
  const { featuresTitle, featuresSubtitle, featureCards } =
    getTokenFactoryContent(locale);

  return (
    <WhyChooseCardsSection
      title={featuresTitle}
      subtitle={featuresSubtitle}
      cards={featureCards}
      columns={4}
      padY="bottom"
    />
  );
}
