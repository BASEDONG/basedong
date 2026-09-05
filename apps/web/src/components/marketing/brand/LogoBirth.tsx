"use client";

import Image from "next/image";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getBrandContent } from "./content";

/** Brand “logo birth” visual — still image only (large mp4 exceeds Pages 25 MiB/file limit). */
export function LogoBirth() {
  const { locale } = useLocale();
  const { assets, logoBirthTitle, logoBirthBody } = getBrandContent(locale);

  return (
    <div
      className="flex min-h-[1050px] w-full items-center justify-center bg-no-repeat bg-[length:100%_100.1%] px-[14px] max-[1024px]:min-h-[750px]"
      style={{ backgroundImage: `url(${assets.s2bg})` }}
    >
      <section className="sf-brand-w-content flex h-full w-full flex-col pt-[40px] max-[1024px]:items-center max-[1440px]:pt-0">
        <h2 className="mb-[16px] text-[48px] font-normal text-[#1e293b] max-[1024px]:text-center max-[1024px]:text-[36px]">
          {logoBirthTitle}
        </h2>
        <p className="mb-[38px] text-[20px] leading-[30px] text-[#57627F] max-[1024px]:max-w-[282px] max-[1024px]:text-justify">
          {logoBirthBody}
        </p>
        <div className="relative w-full">
          <div className="relative aspect-video w-full overflow-hidden bg-black max-[1024px]:h-[210px] max-[1024px]:max-h-[210px] max-[1024px]:aspect-auto">
            <Image
              src={assets.videoCover}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1200px"
              unoptimized
            />
          </div>
        </div>
      </section>
    </div>
  );
}
