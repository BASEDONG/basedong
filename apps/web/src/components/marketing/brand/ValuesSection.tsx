import Image from "next/image";
import { BRAND_ASSETS, BRAND_COPY } from "./content";

export function ValuesSection() {
  return (
    <div className="flex w-full items-start justify-center px-[14px] py-[80px]">
      <div className="sf-brand-w-content flex items-center justify-center gap-[59px] max-[1024px]:flex-col">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-[32px] flex h-[34px] w-[130px] items-center justify-center rounded-[4px] bg-[#5DCDE8] text-[18px] text-white">
            {BRAND_COPY.valuesBadge}
          </div>
          <h3 className="mb-[56px] text-center text-[48px] leading-[72px] font-normal text-[#1e293b]">
            {BRAND_COPY.valuesHeading}
          </h3>
          <Image
            src={BRAND_ASSETS.s4}
            alt=""
            width={214}
            height={176}
            className="h-[176px] w-[214px]"
          />
        </div>
        <div className="grid grid-cols-2 gap-[24px] max-[1024px]:flex max-[1024px]:flex-col">
          {BRAND_COPY.values.map((card) => (
            <section
              key={card.title}
              className="min-h-[205px] max-w-[354px] rounded-[9px] p-[32px] max-[1434px]:max-w-full"
              style={{ backgroundColor: card.bg }}
            >
              <h3 className="mb-[16px] text-[32px] leading-[48px] font-bold text-[#1e293b]">
                {card.title}
              </h3>
              <p className="text-[18px] leading-[27px] text-[#505167]">
                {card.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
