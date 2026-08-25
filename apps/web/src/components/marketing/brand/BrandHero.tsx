import Image from "next/image";
import { BRAND_ASSETS, BRAND_COPY } from "./content";

export function BrandHero() {
  return (
    <section
      className="flex h-[818px] w-full flex-col items-center justify-center bg-no-repeat bg-[length:100%_100.1%] max-[1024px]:bg-center"
      style={{ backgroundImage: `url(${BRAND_ASSETS.heroBg})` }}
    >
      <h2 className="mb-[20px] text-center text-[60px] leading-[90px] font-bold text-[#1e293b] max-[1024px]:text-[40px] max-[1024px]:leading-[60px]">
        {BRAND_COPY.heroTitle}
      </h2>
      <p className="mb-[50px] text-center text-[32px] leading-[48px] text-[#1e293b] max-[1024px]:max-w-[250px] max-[1024px]:text-[20px] max-[1024px]:leading-[30px]">
        {BRAND_COPY.heroSubtitle}
      </p>
      <Image
        src={BRAND_ASSETS.arrowDown}
        alt=""
        width={54}
        height={54}
        className="sf-brand-bounce mx-auto h-[54px] w-[54px]"
      />
    </section>
  );
}
