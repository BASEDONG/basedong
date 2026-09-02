"use client";

import { useLocale } from "@/components/shared/LocaleProvider";
import { getBrandContent } from "./content";

export function MissionVision() {
  const { locale } = useLocale();
  const {
    assets,
    missionBadge,
    missionHeading,
    missionLines,
    missionBody,
  } = getBrandContent(locale);

  return (
    <div
      className="flex w-full items-center justify-center bg-top bg-no-repeat bg-[length:124%_340px] px-[14px] max-[1024px]:bg-[length:124%_140px]"
      style={{ backgroundImage: `url(${assets.s3bg})` }}
    >
      <div className="sf-brand-w-content flex items-center justify-center pb-[80px] pt-[300px] max-[1024px]:pt-[100px]">
        <section className="w-[980px] max-[1024px]:w-auto">
          <div className="mb-[60px] flex items-center max-[1024px]:mb-[39px] max-[1024px]:flex-col">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-[28px] flex h-[34px] w-[200px] items-center justify-center rounded-[4px] bg-[#5DCDE8] text-[18px] text-white">
                {missionBadge}
              </div>
              <h3 className="text-[48px] leading-[72px] font-normal text-[#1e293b]">
                {missionHeading}
              </h3>
            </div>
            <div className="mx-[72px] h-[132px] w-[4px] shrink-0 bg-[#4AABF0] max-[1024px]:hidden" />
            <div className="my-[33px] hidden h-[4px] w-[132px] bg-[#4AABF0] max-[1024px]:block" />
            <h2 className="flex h-[156px] flex-col text-[56px] leading-[78px] font-semibold tracking-[10px] text-black max-[1024px]:h-auto max-[1024px]:max-w-[666px] max-[1024px]:text-center max-[1024px]:text-[51px]">
              {missionLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
          </div>
          <p className="text-[26px] leading-[50px] text-[#57627F]">
            {missionBody}
          </p>
        </section>
      </div>
    </div>
  );
}
