import type { ReactElement } from "react";
import type { IndustryIllustrationVariant, SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";

type IllustrationProps = {
  palette: SfGradientPalette;
};

function InternetIllustration({ palette }: IllustrationProps) {
  const { orbPrimary, orbSecondary, accent } = palette;
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden className="h-full w-full">
      <circle cx="200" cy="200" r="60" fill={`${orbPrimary}10`} stroke={accent} strokeWidth="1.5" opacity="0.6" />
      <circle cx="80" cy="120" r="28" fill={`${orbSecondary}10`} stroke={orbSecondary} strokeWidth="1.5" opacity="0.55" />
      <circle cx="320" cy="120" r="28" fill={`${orbPrimary}10`} stroke={orbPrimary} strokeWidth="1.5" opacity="0.55" />
      <circle cx="80" cy="300" r="28" fill={`${accent}10`} stroke={accent} strokeWidth="1.5" opacity="0.55" />
      <circle cx="320" cy="300" r="28" fill={`${orbSecondary}10`} stroke={orbSecondary} strokeWidth="1.5" opacity="0.55" />
      <path
        d="M104 132l72 52M296 132l-72 52M104 288l72-52M296 288l-72-52"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path d="M170 200h60M200 170v60" stroke={orbPrimary} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function EducationIllustration({ palette }: IllustrationProps) {
  const { orbPrimary, orbSecondary, accent } = palette;
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden className="h-full w-full">
      <rect x="120" y="140" width="160" height="120" rx="8" fill={`${orbPrimary}10`} stroke={accent} strokeWidth="1.5" opacity="0.6" />
      <path d="M140 140l60-36 60 36" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" opacity="0.55" />
      <path d="M160 200h80M160 220h56" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <rect x="260" y="100" width="80" height="56" rx="12" fill={`${orbSecondary}10`} stroke={orbSecondary} strokeWidth="1.5" opacity="0.55" />
      <path d="M276 124h48M276 136h32" stroke={orbSecondary} strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

function GovernmentIllustration({ palette }: IllustrationProps) {
  const { orbPrimary, orbSecondary, accent } = palette;
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden className="h-full w-full">
      <path
        d="M100 280V160l100-60 100 60v120"
        fill={`${orbPrimary}10`}
        stroke={accent}
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.6"
      />
      <path d="M140 280V200h40v80M220 280V200h40v80" stroke={accent} strokeWidth="1.5" opacity="0.4" />
      <path
        d="M200 120v40M180 140h40"
        stroke={orbSecondary}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M280 180l20 12-20 12M120 180l-20 12 20 12"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.35"
      />
    </svg>
  );
}

function ComputeIllustration({ palette }: IllustrationProps) {
  const { orbPrimary, orbSecondary, accent } = palette;
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden className="h-full w-full">
      <rect x="100" y="120" width="70" height="180" rx="8" fill={`${orbPrimary}10`} stroke={accent} strokeWidth="1.5" opacity="0.6" />
      <rect x="165" y="100" width="70" height="200" rx="8" fill={`${orbSecondary}10`} stroke={orbSecondary} strokeWidth="1.5" opacity="0.6" />
      <rect x="230" y="120" width="70" height="180" rx="8" fill={`${accent}10`} stroke={accent} strokeWidth="1.5" opacity="0.6" />
      <path
        d="M115 150h40M115 170h40M115 190h40M180 130h40M180 150h40M180 170h40M245 150h40M245 170h40M245 190h40"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
      <circle cx="200" cy="80" r="16" fill={`${accent}12`} stroke={accent} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function AiHardwareIllustration({ palette }: IllustrationProps) {
  const { orbPrimary, orbSecondary, accent } = palette;
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden className="h-full w-full">
      <rect x="140" y="140" width="120" height="120" rx="16" fill={`${orbPrimary}10`} stroke={accent} strokeWidth="1.5" opacity="0.6" />
      <path
        d="M100 180h24M100 220h24M276 180h24M276 220h24M180 100v24M220 100v24M180 276v24M220 276v24"
        stroke={orbSecondary}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <rect x="170" y="170" width="60" height="60" rx="8" fill={`${accent}12`} stroke={accent} strokeWidth="1.5" opacity="0.55" />
      <rect x="240" y="240" width="80" height="100" rx="12" fill={`${orbSecondary}10`} stroke={orbSecondary} strokeWidth="1.5" opacity="0.5" />
      <circle cx="280" cy="270" r="8" fill={orbPrimary} opacity="0.4" />
    </svg>
  );
}

const ILLUSTRATIONS: Record<
  IndustryIllustrationVariant,
  (props: IllustrationProps) => ReactElement
> = {
  internet: InternetIllustration,
  education: EducationIllustration,
  government: GovernmentIllustration,
  compute: ComputeIllustration,
  "ai-hardware": AiHardwareIllustration,
};

export function IndustryIllustration({
  variant,
  palette,
}: {
  variant: IndustryIllustrationVariant;
  palette: SfGradientPalette;
}) {
  const Illustration = ILLUSTRATIONS[variant];
  return <Illustration palette={palette} />;
}
