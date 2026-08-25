"use client";

import Image from "next/image";
import Link from "next/link";
import { GatewayReveal } from "@/components/marketing/ai-gateway/GatewayReveal";
import { MORE_CASES_URL, partnerCases } from "./content";
import { ArrowRightIcon } from "./icons";
import { PartnerSectionIntro } from "./PartnerSectionIntro";

function PartnerCaseCard({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <div className="group flex h-[102px] cursor-pointer select-none flex-col justify-between overflow-hidden rounded-[6px] bg-[#F1ECFF] px-5 py-[18px]">
      <div className="flex h-[38px] items-center">
        <Image
          src={image}
          alt=""
          width={200}
          height={38}
          className="h-[38px] w-auto max-w-full object-contain object-left"
        />
      </div>
      <p className="truncate text-[14px] leading-[22px] text-[#667085]">
        {title}
      </p>
    </div>
  );
}

export function PartnerCasesSection() {
  return (
    <div className="bg-white py-[110px]">
      <div className="mx-auto max-w-[1440px] px-6 max-[1180px]:max-w-full max-[960px]:px-4">
        <section>
          <GatewayReveal variant="soft">
            <PartnerSectionIntro
              label="PARTNER CASE"
              title="生态伙伴案例"
              subtitle="以下为部分合作伙伴展示，顺序不分先后"
              titleClassName="text-[#101828]"
              subtitleClassName="mb-[46px] leading-7"
            />
          </GatewayReveal>
          <div className="grid grid-cols-4 gap-x-6 gap-y-[22px] max-[1280px]:grid-cols-2 max-[960px]:grid-cols-1">
            {partnerCases.map((item, index) => (
              <GatewayReveal
                key={item.title}
                variant="card"
                delayMs={(index % 4) * 40}
                className="h-full"
              >
                <PartnerCaseCard {...item} />
              </GatewayReveal>
            ))}
          </div>
          <div className="mt-[34px] flex justify-center">
            <Link
              href={MORE_CASES_URL}
              target="_blank"
              rel="noreferrer"
              className="group flex h-[42px] items-center gap-2.5 rounded-full bg-[linear-gradient(90deg,#4AABF0_0%,#4AABF0_100%)] px-6 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(58,97,255,0.28)] transition-all duration-300 hover:scale-[1.04] hover:bg-[linear-gradient(90deg,#4AABF0_0%,#5DCDE8_100%)] hover:shadow-[0_14px_32px_rgba(58,97,255,0.38)]"
            >
              更多场景示例
              <ArrowRightIcon size={16} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
