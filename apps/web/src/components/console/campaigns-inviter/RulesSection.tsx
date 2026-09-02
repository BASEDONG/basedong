"use client";

import { useMemo } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { ASSET } from "./content";
import { getCampaignsInviterUiCopy } from "./campaigns-inviter-ui-copy";

export function RulesSection() {
  const { targetLocale } = useLocale();
  const copy = useMemo(
    () => getCampaignsInviterUiCopy(targetLocale),
    [targetLocale],
  );

  return (
    <div className="mt-12 rounded-[16px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ASSET.text4}
        alt="inviter-banner-text"
        className="mx-auto my-[16px] h-[56px]"
      />
      <div
        className="inviter-rules-md rounded-[16px] px-14 py-8"
        style={{
          backgroundImage: `url(${ASSET.cardBgReverse})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "repeat",
        }}
        dangerouslySetInnerHTML={{ __html: copy.rulesHtml }}
      />
    </div>
  );
}
