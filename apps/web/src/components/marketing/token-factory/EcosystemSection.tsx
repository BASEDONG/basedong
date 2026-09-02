"use client";

import Image from "next/image";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getTokenFactoryContent } from "./content";

/** Fixed slot so wide wordmarks and compact marks share similar visual weight. */
const SLOT_W = 120;
const SLOT_H = 48;

export function EcosystemSection() {
  const { locale } = useLocale();
  const { ecosystemTitle, ecosystemSubtitle, gpuVendors } =
    getTokenFactoryContent(locale);

  return (
    <section className="w-full bg-[#02F6F71A] py-14">
      <h2 className="mb-4 bg-[linear-gradient(180deg,#3A9AE0_9.58%,#4AABF0_50.21%)] bg-clip-text text-center text-[48px] font-semibold leading-[1.5] text-transparent max-[1280px]:text-[38px] max-[960px]:text-[28px]">
        {ecosystemTitle}
      </h2>
      <p className="mx-auto mb-10 max-w-[760px] text-center text-[16px] leading-relaxed text-slate-600 max-md:mb-8 max-md:text-[14px]">
        {ecosystemSubtitle}
      </p>

      <div className="sf-content flex flex-wrap items-center justify-center gap-x-[46px] gap-y-6 max-[960px]:gap-y-5 max-md:gap-y-[18px]">
        {gpuVendors.map((vendor) => (
          <div
            key={vendor.id}
            className="flex shrink-0 items-center justify-center"
            style={{ width: SLOT_W, height: SLOT_H }}
          >
            <Image
              src={vendor.logo}
              alt={vendor.alt}
              width={SLOT_W}
              height={SLOT_H}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
