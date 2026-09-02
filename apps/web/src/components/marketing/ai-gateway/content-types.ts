import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";
import type { WhyChooseCard } from "@/components/marketing/shared/WhyChooseCardsSection";

export type GatewayArchLayerCopy =
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
      kind: "parallel-vendors";
      left: { title: string; vendors: string[] };
      right: { title: string; vendors: string[] };
    };

export type AdvantageCardCopy = {
  title: string;
  description: string;
};

export type ScenarioCardCopy = {
  title: string;
  subtitle: string;
};

export type ScenarioCopy = {
  tab: string;
  title: string;
  paragraphs: [string, string];
  cards: ScenarioCardCopy[];
};

export type TestimonialCopy = {
  title: string;
  body: string;
  role: string;
};

export type FaqAnswerCopy =
  | { type: "paragraphs"; paragraphs: string[] }
  | { type: "list"; intro: string; items: string[]; outro?: string }
  | {
      type: "rich-list";
      intro: string;
      items: { label: string; text: string }[];
    };

export type FaqCopy = {
  question: string;
  answer: FaqAnswerCopy;
};

export type GatewayStrings = {
  archLayers: GatewayArchLayerCopy[];
  advantageCards: AdvantageCardCopy[];
  scenarios: ScenarioCopy[];
  testimonials: TestimonialCopy[];
  faqItems: FaqCopy[];
};

export type GatewayArchLayer = GatewayArchLayerCopy;
export type GatewayAdvantageCard = WhyChooseCard;

export type Scenario = {
  id: string;
  tab: string;
  title: string;
  paragraphs: [string, string];
  gridCols: 2 | 3;
  cards: ScenarioCardCopy[];
  background: SfGradientPalette;
};

export type FaqItem = FaqCopy;

export type GatewayContent = {
  archLayers: GatewayArchLayer[];
  advantages: GatewayAdvantageCard[];
  scenarios: Scenario[];
  testimonials: (TestimonialCopy & { avatarSeed: string })[];
  faqs: FaqItem[];
};
