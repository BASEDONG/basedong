import type { ProductCardIllustrationVariant } from "@/types/siliconflow-cn-10b89bdc";
import { PRODUCT_ILLUSTRATIONS } from "@/components/marketing/shared/illustration-assets";
import { MarketingIllustration } from "@/components/marketing/shared/MarketingIllustration";

export function ProductCardIllustration({
  variant,
}: {
  variant: ProductCardIllustrationVariant;
}) {
  return <MarketingIllustration src={PRODUCT_ILLUSTRATIONS[variant]} />;
}
