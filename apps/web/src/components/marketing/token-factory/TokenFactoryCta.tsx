"use client";

import { MarketingButton } from "@/components/marketing/shared/MarketingButton";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getTokenFactoryContent } from "./content";

export function TokenFactoryCta() {
  const { locale } = useLocale();
  const { consultUrl, ctaTitle, ctaSubtitle, ctaButton } =
    getTokenFactoryContent(locale);

  return (
    <div className="bg-[#4AABF0]">
      <section className="relative isolate overflow-hidden bg-[#4AABF0] px-4 py-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgb(110, 41, 245) 0%, rgb(123, 53, 247) 38%, rgb(142, 60, 250) 66%, rgb(163, 51, 255) 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, rgba(0,0,0,0) 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, rgba(0,0,0,0) 1px)",
            backgroundSize: "58px 58px",
          }}
          aria-hidden="true"
        />

        <div className="relative z-[1] mx-auto flex min-h-[460px] max-w-[1650px] flex-col items-center justify-center px-6 text-center">
          <h2 className="mb-4 text-[48px] font-semibold leading-[1.3] text-white max-[1280px]:text-[38px] max-[960px]:text-[28px]">
            {ctaTitle}
          </h2>
          <p className="mb-10 max-w-[720px] text-[18px] leading-[1.75] text-white/90 max-[960px]:text-[16px]">
            {ctaSubtitle}
          </p>
          <MarketingButton
            href={consultUrl}
            variant="onDark"
            showArrow
            className="h-[62px] px-[34px] text-[20px] max-md:h-[52px] max-md:px-[22px] max-md:text-[16px]"
          >
            {ctaButton}
          </MarketingButton>
        </div>
      </section>
    </div>
  );
}
