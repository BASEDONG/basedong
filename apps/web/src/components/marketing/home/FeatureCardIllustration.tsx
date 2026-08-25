import type { ReactElement } from "react";
import type { FeatureCardIllustrationVariant, SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";

type IllustrationProps = {
  palette: SfGradientPalette;
};

function StabilityIllustration({ palette }: IllustrationProps) {
  const { orbPrimary, orbSecondary, accent } = palette;
  return (
    <svg viewBox="0 0 56 56" fill="none" aria-hidden className="h-full w-full">
      <path
        d="M28 6L44 14v14c0 10-7 18-16 22-9-4-16-12-16-22V14L28 6z"
        fill={`${orbPrimary}22`}
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M20 28l6 6 12-12"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="46" cy="12" r="6" fill={`${orbSecondary}25`} stroke={orbSecondary} strokeWidth="1.5" />
    </svg>
  );
}

function IntelligenceIllustration({ palette }: IllustrationProps) {
  const { orbPrimary, orbSecondary, accent } = palette;
  return (
    <svg viewBox="0 0 56 56" fill="none" aria-hidden className="h-full w-full">
      <circle cx="28" cy="28" r="18" fill={`${orbPrimary}18`} stroke={accent} strokeWidth="2" />
      <circle cx="18" cy="22" r="5" fill={orbSecondary} />
      <circle cx="38" cy="22" r="5" fill={orbPrimary} />
      <circle cx="28" cy="38" r="5" fill={accent} />
      <path
        d="M18 22h20M23 27l10 6M33 27l-10 6"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

function SecurityIllustration({ palette }: IllustrationProps) {
  const { orbPrimary, orbSecondary, accent } = palette;
  return (
    <svg viewBox="0 0 56 56" fill="none" aria-hidden className="h-full w-full">
      <rect x="16" y="24" width="24" height="20" rx="4" fill={`${orbPrimary}20`} stroke={accent} strokeWidth="2" />
      <path
        d="M22 24v-6a6 6 0 0112 0v6"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="28" cy="34" r="3" fill={orbSecondary} />
      <path d="M28 37v4" stroke={accent} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ScalabilityIllustration({ palette }: IllustrationProps) {
  const { orbPrimary, orbSecondary, accent } = palette;
  return (
    <svg viewBox="0 0 56 56" fill="none" aria-hidden className="h-full w-full">
      <rect x="8" y="30" width="14" height="14" rx="3" fill={`${orbPrimary}22`} stroke={accent} strokeWidth="2" />
      <rect x="21" y="22" width="14" height="14" rx="3" fill={`${orbSecondary}20`} stroke={orbSecondary} strokeWidth="2" />
      <rect x="34" y="14" width="14" height="14" rx="3" fill={`${accent}18`} stroke={accent} strokeWidth="2" />
      <path
        d="M15 30V20M28 22V12M41 14V8"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

const ILLUSTRATIONS: Record<
  FeatureCardIllustrationVariant,
  (props: IllustrationProps) => ReactElement
> = {
  stability: StabilityIllustration,
  intelligence: IntelligenceIllustration,
  security: SecurityIllustration,
  scalability: ScalabilityIllustration,
};

export function FeatureCardIllustration({
  variant,
  palette,
}: {
  variant: FeatureCardIllustrationVariant;
  palette: SfGradientPalette;
}) {
  const Illustration = ILLUSTRATIONS[variant];
  return <Illustration palette={palette} />;
}
