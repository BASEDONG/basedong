import Image from "next/image";
import { BRAND_ASSETS, BRAND_COPY } from "./content";

function DownloadIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 448 512"
      className="translate-y-[3px]"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z" />
    </svg>
  );
}

function SwatchCard({
  swatch,
}: {
  swatch: (typeof BRAND_COPY.swatches)[number];
}) {
  const base =
    "flex min-h-[118px] w-[120px] flex-col justify-end rounded-[7px] px-[12px] py-[14px] text-[12px] leading-[18px] max-[1024px]:w-[140px]";

  if ("variant" in swatch && swatch.variant === "gradient") {
    return (
      <div
        className={`${base} text-white`}
        style={{ background: swatch.gradient }}
      >
        <p className="font-medium">{swatch.name}</p>
        <p className="opacity-90">{BRAND_COPY.gradientLabel}</p>
      </div>
    );
  }

  if ("variant" in swatch && swatch.variant === "white") {
    return (
      <div
        className={`${base} border border-[#4AABF0] bg-white text-[#4AABF0]`}
      >
        <p className="font-medium">{swatch.name}</p>
        <p>{swatch.hex}</p>
        <p>{swatch.rgb}</p>
      </div>
    );
  }

  if ("variant" in swatch && swatch.variant === "black") {
    return (
      <div className={`${base} bg-black text-white`}>
        <p className="font-medium">{swatch.name}</p>
        <p>{swatch.hex}</p>
        <p>{swatch.rgb}</p>
      </div>
    );
  }

  return (
    <div
      className={`${base} text-white`}
      style={{ backgroundColor: swatch.hex }}
    >
      <p className="font-medium">{swatch.name}</p>
      <p>{swatch.hex}</p>
      <p>{swatch.rgb}</p>
    </div>
  );
}

export function BrandGuidelines() {
  return (
    <div className="sf-brand-bg-dot flex w-full items-center justify-center py-[200px]">
      <div className="w-[1112px] max-[1024px]:w-full">
        <div className="mb-[73px] flex items-end justify-between max-[1024px]:flex-col max-[1024px]:items-center max-[1024px]:justify-center max-[1024px]:px-[52px]">
          <div className="max-[1024px]:mb-[27px]">
            <h3 className="mb-[25px] text-[48px] leading-[72px] font-normal text-[#252736]">
              {BRAND_COPY.guidelinesTitle}
            </h3>
            <p className="text-[20px] leading-[30px] text-[#57627F]">
              {BRAND_COPY.guidelinesSubtitle}
            </p>
          </div>
          <div className="h-[64px] w-[277px] cursor-pointer rounded-[12px] bg-black text-[24px] font-bold text-white transition-[filter] duration-200 hover:brightness-110">
            <a
              href={BRAND_ASSETS.logoZip}
              target="_blank"
              rel="noreferrer"
              className="bd-gradient-bg flex h-full w-full items-center justify-center gap-[10px] rounded-[12px]"
            >
              <DownloadIcon />
              <span>{BRAND_COPY.downloadLabel}</span>
            </a>
          </div>
        </div>

        <div className="flex gap-[19px] px-[14px] max-[1024px]:flex-col max-[1024px]:items-center">
          <div className="flex min-w-0 flex-col gap-[19px]">
            <Image
              src={BRAND_ASSETS.s5_01}
              alt=""
              width={544}
              height={264}
              className="h-[264px] w-[544px] max-w-full max-[1024px]:h-[142px] max-[1024px]:w-[294px]"
            />
            <Image
              src={BRAND_ASSETS.s5_02}
              alt=""
              width={544}
              height={264}
              className="h-[264px] w-[544px] max-w-full max-[1024px]:h-[142px] max-[1024px]:w-[294px]"
            />
          </div>
          <div className="flex min-w-0 flex-col items-center gap-[19px]">
            <div className="flex flex-wrap justify-center gap-[12px] max-w-[720px]">
              {BRAND_COPY.swatches.map((swatch) => (
                <SwatchCard key={swatch.hex + swatch.name} swatch={swatch} />
              ))}
            </div>
            <div className="flex gap-[24px]">
              <Image
                src={BRAND_ASSETS.s5_04}
                alt=""
                width={260}
                height={260}
                className="h-[260px] w-[260px] max-[1024px]:h-[140px] max-[1024px]:w-[140px]"
              />
              <Image
                src={BRAND_ASSETS.s5_05}
                alt=""
                width={260}
                height={260}
                className="h-[260px] w-[260px] max-[1024px]:h-[140px] max-[1024px]:w-[140px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
