"use client";

import Image from "next/image";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getAboutContent } from "./content";

export function HonorsMarquee() {
  const { locale } = useLocale();
  const { assets, honorsTitle } = getAboutContent(locale);
  const honors = [...assets.honors, ...assets.honors];

  return (
    <section
      className="h-[878px] w-full bg-center bg-no-repeat py-20 [background-size:100%_100%] max-[1024px]:h-[304px]"
      style={{ backgroundImage: `url(${assets.honorsBg})` }}
    >
      <h3 className="mb-9 w-full text-center text-[48px] text-[#1e293b] max-[1024px]:text-[36px]">
        {honorsTitle}
      </h3>
      <div className="relative h-[720px] w-full overflow-hidden max-[1024px]:h-[170px]">
        <div className="about-honors-track absolute top-[160px] left-0 flex w-max max-[1024px]:top-0">
          {honors.map((src, i) => (
            <Image
              key={`${src}-${i}`}
              src={src}
              alt=""
              width={300}
              height={366}
              className="mr-4 h-[366px] w-[300px] shrink-0 cursor-pointer transition-transform duration-150 ease-in-out hover:scale-[1.6] max-[1024px]:pointer-events-none max-[1024px]:h-[170px] max-[1024px]:w-[138px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
