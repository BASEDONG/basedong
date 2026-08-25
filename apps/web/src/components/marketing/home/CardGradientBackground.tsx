import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";
import { BRAND_THEME } from "@/lib/brand-colors";

/**
 * Soft blob wash — white base + blurred brand-color orbs (partners section style).
 * Used on product / feature / industry cards; hero uses HeroSlideBackground.
 */
export function CardGradientBackground({
  orbPrimary,
  orbSecondary,
  accent,
}: SfGradientPalette) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: BRAND_THEME.cardSurface }}
      aria-hidden
    >
      <div
        className="absolute -right-[15%] top-[5%] h-[65%] w-[60%] rounded-full opacity-[0.2] blur-[80px]"
        style={{ backgroundColor: orbPrimary }}
      />
      <div
        className="absolute -left-[10%] bottom-[0%] h-[60%] w-[55%] rounded-full opacity-[0.16] blur-[80px]"
        style={{ backgroundColor: orbSecondary }}
      />
      <div
        className="absolute right-[10%] bottom-[5%] h-[50%] w-[45%] rounded-full opacity-[0.12] blur-[70px]"
        style={{ backgroundColor: accent }}
      />
      <div
        className="absolute left-[5%] top-[8%] h-[40%] w-[38%] rounded-full opacity-[0.08] blur-[60px]"
        style={{ backgroundColor: accent }}
      />
    </div>
  );
}
