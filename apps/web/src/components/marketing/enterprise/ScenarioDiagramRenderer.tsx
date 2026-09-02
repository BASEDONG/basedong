"use client";

import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/components/shared/LocaleProvider";
import type { EnterpriseScenario } from "./content-types";
import { getEnterpriseContent } from "./content";
import {
  AiCenterScenarioSvg,
  EnterpriseScenarioSvg,
  IndustryFunnelScenarioSvg,
  TransportScenarioSvg,
  type DiagramPalette,
} from "./ScenarioDesignSvgs";

export type { ScenarioDetailVariant } from "@/components/marketing/shared/illustration-assets";

export function ScenarioDiagramRenderer({
  scenario,
}: {
  scenario: EnterpriseScenario;
}) {
  const { locale } = useLocale();
  const { scenarioDiagramSpecs } = getEnterpriseContent(locale);
  const spec = scenarioDiagramSpecs[scenario.id];
  const palette: DiagramPalette = {
    accent: scenario.background.accent,
    secondary: scenario.background.orbSecondary,
  };

  let body: ReactNode;
  switch (spec.layout) {
    case "enterpriseFlow":
      body = <EnterpriseScenarioSvg spec={spec} palette={palette} />;
      break;
    case "aiCenterStack":
      body = <AiCenterScenarioSvg spec={spec} palette={palette} />;
      break;
    case "industryFunnel":
      body = <IndustryFunnelScenarioSvg spec={spec} palette={palette} />;
      break;
    case "transportFlow":
      body = <TransportScenarioSvg spec={spec} palette={palette} />;
      break;
  }

  return (
    <Card variant="surface" size="md" className="overflow-hidden p-4 md:p-6">
      {body}
    </Card>
  );
}
