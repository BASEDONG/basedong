import type { IndustryIllustrationVariant } from "@/types/siliconflow-cn-10b89bdc";
import { INDUSTRY_ILLUSTRATIONS } from "@/components/marketing/shared/illustration-assets";
import { MarketingIllustration } from "@/components/marketing/shared/MarketingIllustration";

export function IndustryIllustration({ variant }: { variant: IndustryIllustrationVariant }) {
  return <MarketingIllustration src={INDUSTRY_ILLUSTRATIONS[variant]} />;
}
