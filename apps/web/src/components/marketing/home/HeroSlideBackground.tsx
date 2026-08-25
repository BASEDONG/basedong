import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";

function OrbitDecor({
  orbPrimary,
  orbSecondary,
  accent,
  subdued,
}: Pick<SfGradientPalette, "orbPrimary" | "orbSecondary" | "accent"> & {
  subdued?: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute right-[4%] top-1/2 hidden h-[min(520px,70vh)] w-[min(520px,55vw)] -translate-y-1/2 lg:block"
      style={{ opacity: subdued ? 0.55 : 1 }}
    >
      <div
        className="absolute inset-0 scale-[0.85] rounded-full opacity-40 blur-3xl"
        style={{
          background: `linear-gradient(135deg, ${orbPrimary}, ${orbSecondary})`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[88%] w-[88%]">
          <div
            className="tf-spin-slow absolute inset-0 rounded-full border-2"
            style={{ borderColor: `${accent}30` }}
          >
            <span
              className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full shadow-lg"
              style={{ backgroundColor: orbPrimary, boxShadow: `0 0 20px ${orbPrimary}80` }}
            />
            <span
              className="absolute top-1/2 -right-2 h-3 w-3 -translate-y-1/2 rounded-full"
              style={{ backgroundColor: orbSecondary }}
            />
          </div>
          <div
            className="tf-spin-reverse absolute inset-[12%] rounded-full border"
            style={{ borderColor: `${orbSecondary}35` }}
          >
            <span
              className="absolute -bottom-2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span
              className="absolute left-2 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full"
              style={{ backgroundColor: orbPrimary }}
            />
          </div>
          <div
            className="absolute inset-[28%] rounded-full border border-dashed opacity-60"
            style={{ borderColor: `${accent}25` }}
          />
          <div
            className="absolute inset-[38%] rounded-full opacity-90"
            style={{
              background: `radial-gradient(circle, ${orbPrimary}55 0%, ${orbSecondary}33 45%, transparent 70%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function HeroSlideBackground({
  base,
  orbPrimary,
  orbSecondary,
  accent,
  logoSrc,
  logoAlt,
}: SfGradientPalette) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0" style={{ background: base }} />

      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 75% 45%, ${orbPrimary}45 0%, transparent 55%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(ellipse 55% 50% at 15% 75%, ${orbSecondary}40 0%, transparent 50%)`,
        }}
      />

      <div className="hero-carousel-grid absolute inset-0" />

      <div
        className="hero-carousel-float absolute -right-[5%] top-[8%] h-[48%] w-[42%] rounded-full opacity-45 blur-3xl"
        style={{ backgroundColor: orbPrimary }}
      />
      <div
        className="hero-carousel-float-delayed absolute -bottom-[12%] left-[5%] h-[45%] w-[38%] rounded-full opacity-40 blur-3xl"
        style={{ backgroundColor: orbSecondary }}
      />
      <div
        className="absolute right-[30%] top-[15%] h-[28%] w-[22%] rounded-full opacity-30 blur-2xl max-lg:hidden"
        style={{ backgroundColor: accent }}
      />

      <OrbitDecor
        orbPrimary={orbPrimary}
        orbSecondary={orbSecondary}
        accent={accent}
        subdued={Boolean(logoSrc)}
      />

      {logoSrc ? (
        <img
          src={logoSrc}
          alt={logoAlt ?? ""}
          className="pointer-events-none absolute right-[6%] top-1/2 hidden h-[min(280px,35vh)] w-auto -translate-y-1/2 opacity-[0.22] max-lg:right-[4%] max-lg:h-[min(180px,28vh)] max-lg:opacity-[0.15] lg:block"
        />
      ) : null}

      <div
        className="absolute inset-0 max-lg:opacity-60"
        style={{
          background: `linear-gradient(105deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.55) 38%, ${accent}18 72%, ${orbSecondary}28 100%)`,
        }}
      />

      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background: "linear-gradient(to top, rgba(255,255,255,0.85), transparent)",
        }}
      />
    </div>
  );
}
