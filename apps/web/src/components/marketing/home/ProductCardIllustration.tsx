import type { ReactElement } from "react";
import type { ProductCardIllustrationVariant, SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";

type IllustrationProps = {
  palette: SfGradientPalette;
};

function ApiIllustration({ palette }: IllustrationProps) {
  const { orbPrimary, orbSecondary, accent } = palette;
  return (
    <svg viewBox="0 0 220 180" fill="none" aria-hidden className="h-full w-full">
      <rect x="24" y="28" width="72" height="48" rx="10" fill={`${orbPrimary}12`} stroke={accent} strokeWidth="1.5" opacity="0.7" />
      <rect x="124" y="18" width="72" height="48" rx="10" fill={`${orbSecondary}10`} stroke={orbSecondary} strokeWidth="1.5" opacity="0.7" />
      <rect x="74" y="108" width="72" height="48" rx="10" fill={`${accent}10`} stroke={accent} strokeWidth="1.5" opacity="0.7" />
      <path d="M96 52h28M68 76v20M138 66v32" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <circle cx="44" cy="44" r="5" fill={orbPrimary} opacity="0.5" />
      <circle cx="144" cy="34" r="5" fill={orbSecondary} opacity="0.5" />
      <circle cx="110" cy="124" r="5" fill={accent} opacity="0.5" />
      <path d="M40 62h12M132 52h12M98 112h12" stroke={orbPrimary} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path
        d="M168 88c12-4 20 2 24 12"
        stroke={orbSecondary}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path d="M12 96c10-8 24-10 36-4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

function AutoIllustration({ palette }: IllustrationProps) {
  const { orbPrimary, orbSecondary, accent } = palette;
  return (
    <svg viewBox="0 0 220 180" fill="none" aria-hidden className="h-full w-full">
      <circle cx="110" cy="90" r="34" fill={`${orbPrimary}12`} stroke={accent} strokeWidth="1.5" opacity="0.65" />
      <circle cx="110" cy="90" r="14" fill={`${accent}15`} stroke={accent} strokeWidth="1.5" opacity="0.65" />
      <circle cx="42" cy="48" r="18" fill={`${orbSecondary}10`} stroke={orbSecondary} strokeWidth="1.5" opacity="0.6" />
      <circle cx="178" cy="48" r="18" fill={`${orbPrimary}10`} stroke={orbPrimary} strokeWidth="1.5" opacity="0.6" />
      <circle cx="42" cy="138" r="18" fill={`${accent}10`} stroke={accent} strokeWidth="1.5" opacity="0.6" />
      <circle cx="178" cy="138" r="18" fill={`${orbSecondary}10`} stroke={orbSecondary} strokeWidth="1.5" opacity="0.6" />
      <path
        d="M58 56L92 78M162 56L128 78M58 130L92 102M162 130L128 102"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M104 90h12M110 84v12"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <text
        x="110"
        y="94"
        textAnchor="middle"
        fill={accent}
        fontSize="11"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
        opacity="0.55"
      >
        Auto
      </text>
    </svg>
  );
}

function InferenceIllustration({ palette }: IllustrationProps) {
  const { orbPrimary, orbSecondary, accent } = palette;
  return (
    <svg viewBox="0 0 220 180" fill="none" aria-hidden className="h-full w-full">
      <rect x="62" y="46" width="96" height="88" rx="14" fill={`${orbPrimary}10`} stroke={accent} strokeWidth="1.5" opacity="0.65" />
      <path
        d="M34 72h18M34 108h18M168 72h18M168 108h18"
        stroke={orbSecondary}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M88 78h44M88 102h44"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      <circle cx="110" cy="90" r="16" fill={`${accent}12`} stroke={accent} strokeWidth="1.5" opacity="0.6" />
      <path
        d="M104 90l4 4 8-8"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 44l10 6-10 6M202 44l-10 6 10 6"
        stroke={orbPrimary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      <path
        d="M8 150h28M184 150h28"
        stroke={orbSecondary}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M110 18v16M94 26h32"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

function DeployIllustration({ palette }: IllustrationProps) {
  const { orbPrimary, orbSecondary, accent } = palette;
  return (
    <svg viewBox="0 0 220 180" fill="none" aria-hidden className="h-full w-full">
      <rect x="48" y="54" width="52" height="96" rx="8" fill={`${orbPrimary}10`} stroke={accent} strokeWidth="1.5" opacity="0.65" />
      <rect x="120" y="54" width="52" height="96" rx="8" fill={`${orbSecondary}10`} stroke={orbSecondary} strokeWidth="1.5" opacity="0.65" />
      <path d="M60 74h28M60 90h28M60 106h28M132 74h28M132 90h28M132 106h28" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <circle cx="74" cy="66" r="4" fill={orbPrimary} opacity="0.45" />
      <circle cx="146" cy="66" r="4" fill={orbSecondary} opacity="0.45" />
      <path
        d="M98 34h24v16h-24z"
        fill={`${accent}12`}
        stroke={accent}
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.6"
      />
      <path
        d="M106 42v6h8"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="104" y="40" width="12" height="10" rx="2" stroke={accent} strokeWidth="1.5" fill="none" />
      <path
        d="M18 128c16-10 34-12 52-6M150 122c18-6 36-4 52 8"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

const ILLUSTRATIONS: Record<
  ProductCardIllustrationVariant,
  (props: IllustrationProps) => ReactElement
> = {
  api: ApiIllustration,
  auto: AutoIllustration,
  inference: InferenceIllustration,
  deploy: DeployIllustration,
};

export function ProductCardIllustration({
  variant,
  palette,
}: {
  variant: ProductCardIllustrationVariant;
  palette: SfGradientPalette;
}) {
  const Illustration = ILLUSTRATIONS[variant];
  return <Illustration palette={palette} />;
}
