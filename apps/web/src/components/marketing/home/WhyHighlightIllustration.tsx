import type { ReactElement } from "react";
import type { WhyHighlightIllustrationVariant, SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";

type IllustrationProps = {
  palette: SfGradientPalette;
};

function InferenceSpeedIllustration({ palette }: IllustrationProps) {
  const { orbPrimary, orbSecondary, accent } = palette;
  return (
    <svg viewBox="0 0 290 291" fill="none" aria-hidden className="h-full w-full">
      <circle cx="145" cy="145" r="72" fill={`${orbPrimary}10`} stroke={accent} strokeWidth="1.5" opacity="0.55" />
      <circle cx="145" cy="145" r="44" fill={`${accent}10`} stroke={accent} strokeWidth="1.5" opacity="0.55" />
      <path
        d="M145 118v54M118 145h54"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <circle cx="58" cy="72" r="22" fill={`${orbSecondary}10`} stroke={orbSecondary} strokeWidth="1.5" opacity="0.5" />
      <circle cx="232" cy="72" r="22" fill={`${orbPrimary}10`} stroke={orbPrimary} strokeWidth="1.5" opacity="0.5" />
      <circle cx="58" cy="218" r="22" fill={`${accent}10`} stroke={accent} strokeWidth="1.5" opacity="0.5" />
      <circle cx="232" cy="218" r="22" fill={`${orbSecondary}10`} stroke={orbSecondary} strokeWidth="1.5" opacity="0.5" />
      <path
        d="M76 86l52 44M214 86l-52 44M76 204l52-44M214 204l-52-44"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M128 145h34l-10-8 10-8"
        stroke={orbPrimary}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.45"
      />
    </svg>
  );
}

function HeterogeneousChipsIllustration({ palette }: IllustrationProps) {
  const { orbPrimary, orbSecondary, accent } = palette;
  return (
    <svg viewBox="0 0 247 251" fill="none" aria-hidden className="h-full w-full">
      <rect x="36" y="88" width="64" height="64" rx="12" fill={`${orbPrimary}10`} stroke={accent} strokeWidth="1.5" opacity="0.55" />
      <rect x="92" y="52" width="64" height="64" rx="12" fill={`${orbSecondary}10`} stroke={orbSecondary} strokeWidth="1.5" opacity="0.55" />
      <rect x="148" y="88" width="64" height="64" rx="12" fill={`${accent}10`} stroke={accent} strokeWidth="1.5" opacity="0.55" />
      <rect x="64" y="144" width="64" height="64" rx="12" fill={`${orbSecondary}10`} stroke={orbSecondary} strokeWidth="1.5" opacity="0.5" />
      <rect x="120" y="144" width="64" height="64" rx="12" fill={`${orbPrimary}10`} stroke={orbPrimary} strokeWidth="1.5" opacity="0.5" />
      <path
        d="M68 108h12M100 72h12M164 108h12M80 164h12M136 164h12"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M100 120h48M124 96v48M88 176h72"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.25"
      />
      <circle cx="124" cy="120" r="10" fill={`${accent}12`} stroke={accent} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

const ILLUSTRATIONS: Record<
  WhyHighlightIllustrationVariant,
  (props: IllustrationProps) => ReactElement
> = {
  "inference-speed": InferenceSpeedIllustration,
  "heterogeneous-chips": HeterogeneousChipsIllustration,
};

export function WhyHighlightIllustration({
  variant,
  palette,
}: {
  variant: WhyHighlightIllustrationVariant;
  palette: SfGradientPalette;
}) {
  const Illustration = ILLUSTRATIONS[variant];
  return <Illustration palette={palette} />;
}
