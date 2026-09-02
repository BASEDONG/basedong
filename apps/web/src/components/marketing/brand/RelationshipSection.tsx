"use client";

import Image from "next/image";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getBrandContent } from "./content";

export function RelationshipSection() {
  const { locale } = useLocale();
  const {
    assets,
    relationshipBadge,
    relationshipHeading,
    relationshipParas,
  } = getBrandContent(locale);

  return (
    <div className="flex w-full items-center justify-center bg-[#1D1F2C] px-[14px] py-[126px]">
      <div className="relative flex h-full w-[1112px] flex-col items-center justify-center max-[1024px]:w-full">
        <div className="absolute top-0 left-0 z-10 max-[1024px]:relative max-[1024px]:mb-[38px]">
          <section className="max-[1024px]:px-[28px]">
            <div className="mb-[24px] flex h-[22px] w-[120px] items-center justify-center rounded-[4px] bg-[#5DCDE8] text-[14px] text-white">
              {relationshipBadge}
            </div>
            <h3 className="mb-[24px] text-[48px] leading-[72px] font-normal text-white max-[1024px]:text-[35px] max-[1024px]:leading-[52px]">
              {relationshipHeading}
            </h3>
            <div className="max-w-[472px] space-y-[10px] text-[22px] leading-[160%] text-[#CBD5F9] max-[1024px]:max-w-full">
              {relationshipParas.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        </div>
        <Image
          src={assets.relationshipBg}
          alt=""
          width={1112}
          height={530}
          className="relative h-[530px] w-[1112px] max-[1024px]:h-auto max-[1024px]:w-auto"
        />
      </div>
    </div>
  );
}
