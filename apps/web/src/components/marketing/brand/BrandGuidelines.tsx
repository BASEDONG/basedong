"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { MarketingButton } from "@/components/marketing/shared/MarketingButton";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getBrandContent } from "./content";
import type { BrandSwatch } from "./content-types";

function SwatchCard({
  swatch,
  gradientLabel,
}: {
  swatch: BrandSwatch;
  gradientLabel: string;
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
        <p className="opacity-90">{gradientLabel}</p>
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
  const { locale } = useLocale();
  const {
    assets,
    guidelinesTitle,
    guidelinesSubtitle,
    downloadLabel,
    gradientLabel,
    swatches,
  } = getBrandContent(locale);

  return (
    <div className="sf-brand-bg-dot flex w-full items-center justify-center py-[200px]">
      <div className="w-[1112px] max-[1024px]:w-full">
        <div className="mb-[73px] flex items-end justify-between max-[1024px]:flex-col max-[1024px]:items-center max-[1024px]:justify-center max-[1024px]:px-[52px]">
          <div className="max-[1024px]:mb-[27px]">
            <h3 className="mb-[25px] text-[48px] leading-[72px] font-normal text-[#252736]">
              {guidelinesTitle}
            </h3>
            <p className="text-[20px] leading-[30px] text-[#57627F]">
              {guidelinesSubtitle}
            </p>
          </div>
          <MarketingButton
            href={assets.logoZip}
            size="lg"
            className="h-[64px] w-[277px] min-w-0 gap-[10px] text-[24px] font-bold"
          >
            <Download className="h-6 w-6 translate-y-[3px]" aria-hidden />
            {downloadLabel}
          </MarketingButton>
        </div>

        <div className="flex gap-[19px] px-[14px] max-[1024px]:flex-col max-[1024px]:items-center">
          <div className="flex min-w-0 flex-col gap-[19px]">
            <Image
              src={assets.s5_01}
              alt=""
              width={544}
              height={264}
              className="h-[264px] w-[544px] max-w-full max-[1024px]:h-[142px] max-[1024px]:w-[294px]"
            />
            <Image
              src={assets.s5_02}
              alt=""
              width={544}
              height={264}
              className="h-[264px] w-[544px] max-w-full max-[1024px]:h-[142px] max-[1024px]:w-[294px]"
            />
          </div>
          <div className="flex min-w-0 flex-col items-center gap-[19px]">
            <div className="flex flex-wrap justify-center gap-[12px] max-w-[720px]">
              {swatches.map((swatch) => (
                <SwatchCard
                  key={swatch.hex + swatch.name}
                  swatch={swatch}
                  gradientLabel={gradientLabel}
                />
              ))}
            </div>
            <div className="flex gap-[24px]">
              <Image
                src={assets.s5_04}
                alt=""
                width={260}
                height={260}
                className="h-[260px] w-[260px] max-[1024px]:h-[140px] max-[1024px]:w-[140px]"
              />
              <Image
                src={assets.s5_05}
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
