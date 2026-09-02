import type { WhyHighlightIllustrationVariant } from "@/types/siliconflow-cn-10b89bdc";
import { WHY_HIGHLIGHT_ILLUSTRATIONS } from "@/components/marketing/shared/illustration-assets";
import { MarketingIllustration } from "@/components/marketing/shared/MarketingIllustration";

export function WhyHighlightIllustration({
  variant,
}: {
  variant: WhyHighlightIllustrationVariant;
}) {
  return <MarketingIllustration src={WHY_HIGHLIGHT_ILLUSTRATIONS[variant]} />;
}
