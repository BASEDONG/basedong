"use client";

import Image from "next/image";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getAboutContent } from "./content";

export function CompanyIntro() {
  const { locale } = useLocale();
  const { assets, introTitle, introParagraphs } = getAboutContent(locale);

  return (
    <div className="flex w-full items-center justify-center bg-white py-[80px]">
      <section className="sf-content relative pr-[740px] max-[1440px]:pr-0">
        <div className="mb-[50px] max-[1440px]:mb-6">
          <h3 className="text-[48px] text-[#1e293b] max-[1440px]:text-center max-[1440px]:text-[36px]">
            {introTitle}
          </h3>
        </div>
        <div className="absolute top-1/2 right-[14px] -translate-y-1/2 max-[1440px]:static max-[1440px]:mb-6 max-[1440px]:translate-y-0">
          <Image
            src={assets.introIllustration}
            alt=""
            width={656}
            height={485}
            className="mx-auto h-auto w-[660px]"
          />
        </div>
        <div className="space-y-4 text-justify text-[18px] leading-8 text-[#1e293b] max-[1440px]:max-w-full">
          {introParagraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
