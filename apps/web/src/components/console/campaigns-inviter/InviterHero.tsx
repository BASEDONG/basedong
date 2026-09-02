"use client";

import { useMemo } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { ASSET } from "./content";
import { getCampaignsInviterUiCopy } from "./campaigns-inviter-ui-copy";

export function InviterHero() {
  const { targetLocale } = useLocale();
  const copy = useMemo(
    () => getCampaignsInviterUiCopy(targetLocale),
    [targetLocale],
  );

  return (
    <div className="bg relative box-content h-[400px] w-full">
      <div
        className="absolute left-0 top-0 h-full w-full rounded-[16px]"
        style={{
          background:
            "linear-gradient(rgba(74, 171, 240), 0.1) 0%, rgba(2, 246, 247, 0.1) 100%)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ASSET.bannerBg}
        alt="inviter-banner-bg"
        className="m-auto object-cover"
      />
      <div className="absolute top-0 w-full">
        <div className="flex justify-center">
          <div className="w-[480px] flex-grow-0 pl-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSET.bannerText}
              alt="inviter-banner-text"
              className="mr-[-32px] mt-[96px] max-w-[418px]"
            />
            <div className="mt-[24px] text-3xl font-bold text-slate-700">
              {copy.heroCopy.headline}
            </div>
            <div className="mt-[24px] text-lg text-slate-500">
              {copy.heroCopy.deadline}
            </div>
          </div>
          <div className="w-[8%]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSET.bannerImg}
            alt="inviter-banner-img"
            className="w-[410px] flex-grow-0"
          />
        </div>
      </div>
    </div>
  );
}
