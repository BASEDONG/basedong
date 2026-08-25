import Image from "next/image";
import { ABOUT_ASSETS, ABOUT_COPY } from "./content";

export function CompanyIntro() {
  return (
    <div className="flex w-full items-center justify-center bg-white p-[14px] py-[80px]">
      <section className="relative mx-auto max-w-[1434px] pr-[740px] max-[1434px]:p-0">
        <div className="mb-[50px] max-[1434px]:mb-6">
          <h3 className="text-[48px] text-[#1e293b] max-[1434px]:text-center max-[1434px]:text-[36px]">
            {ABOUT_COPY.introTitle}
          </h3>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 max-[1434px]:static max-[1434px]:mb-6 max-[1434px]:translate-y-0">
          <Image
            src={ABOUT_ASSETS.introIllustration}
            alt=""
            width={656}
            height={485}
            className="mx-auto h-auto w-[660px]"
          />
        </div>
        <div className="space-y-4 text-justify text-[18px] leading-8 text-[#1e293b] max-[1434px]:max-w-full">
          {ABOUT_COPY.introParagraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
