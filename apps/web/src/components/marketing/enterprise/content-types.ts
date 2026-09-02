import type { SfIndustryItem, SfProductCard } from "@/types/siliconflow-cn-10b89bdc";
import type { WhyChooseCard } from "@/components/marketing/shared/WhyChooseCardsSection";
import type { ScenarioDetailVariant } from "@/components/marketing/shared/illustration-assets";

export type IntroCardCopy = {
  title: string;
  description: string;
};

export type AdvantageCardCopy = {
  title: string;
  description: string;
};

export type ArchLayerCopy =
  | {
      kind: "apps";
      title: string;
      modules: string[];
    }
  | {
      kind: "divider";
      title: string;
    }
  | {
      kind: "section";
      title: string;
      modules: string[];
    }
  | {
      kind: "vendors";
      title: string;
      vendors: string[];
    };

export type ScenarioCopy = {
  tab: string;
  title: string;
  description: string;
  advantages: string[];
};

export type ScenarioDiagramSpecCopy =
  | {
      layout: "enterpriseFlow";
      title: string;
      training: { title: string; steps: string[] };
      inference: { title: string; steps: string[] };
      apps: { title: string; items: string[] };
      apiUp: string;
      apiDown: string;
      platform: string;
      supportLeft: string;
      supportRight: string;
    }
  | {
      layout: "aiCenterStack";
      title: string;
      leftAudience: string;
      rightAudience: string;
      axisLeft: string;
      axisRight: string;
      capabilityChips: string[];
      modelServiceTitle: string;
      models: string[];
      sidePanels: string[];
      integrateBar: string;
      poolTitle: string;
      vendors: string[];
    }
  | {
      layout: "industryFunnel";
      title: string;
      topMode: "apps" | "service";
      topTitle?: string;
      topItems: string[];
      hub: string;
      arc?: string[];
      left: string;
      right: string;
      engine?: string;
      platform: string;
    }
  | {
      layout: "transportFlow";
      title: string;
      trainingTitle: string;
      trainingSteps: string[];
      edgeTitle: string;
      edgeChip: string;
      centerTitle: string;
      businessTitle: string;
      flowEdgeToCenter: string;
      flowModelDown: string;
      flowDataUp: string;
      flowToBusiness: string;
      flowFromBusiness: string;
    };

export type TestimonialCopy = {
  title: string;
  body: string;
  role: string;
};

export type FaqCopy = {
  question: string;
  answer: string;
};

export type EnterpriseStrings = {
  introCards: IntroCardCopy[];
  archLayers: ArchLayerCopy[];
  advantageCards: AdvantageCardCopy[];
  scenarios: ScenarioCopy[];
  scenarioDiagramSpecs: Record<ScenarioDetailVariant, ScenarioDiagramSpecCopy>;
  testimonials: TestimonialCopy[];
  faqItems: FaqCopy[];
};

export type EnterpriseArchLayer = ArchLayerCopy;

export type EnterpriseAdvantageCard = WhyChooseCard;

export type EnterpriseScenario = Omit<SfIndustryItem, "illustration"> & {
  id: ScenarioDetailVariant;
  tab: string;
  advantages: string[];
};

export type ScenarioDiagramSpec = ScenarioDiagramSpecCopy;

export type EnterpriseContent = {
  introCards: SfProductCard[];
  archLayers: EnterpriseArchLayer[];
  advantageCards: EnterpriseAdvantageCard[];
  scenarios: EnterpriseScenario[];
  scenarioDiagramSpecs: Record<ScenarioDetailVariant, ScenarioDiagramSpec>;
  testimonials: (TestimonialCopy & { avatarSeed: string })[];
  faqItems: FaqCopy[];
};
