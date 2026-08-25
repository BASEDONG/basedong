import Link from "next/link";
import { ArrowForwardIcon } from "@/components/marketing/shared/icons";
import { HeroSlideBackground } from "@/components/marketing/home/HeroSlideBackground";
import { CONSULT_URL, heroBackground, heroTags } from "./content";

export function EnterpriseHero() {
  const accentStyle = { color: heroBackground.accent };

  return (
    <section
      className="relative mb-[110px] h-[588px] w-full overflow-hidden lg:h-[760px] min-[1571px]:h-[888px]"
    >
      <HeroSlideBackground {...heroBackground} />
      <div className="relative z-10 h-full">
        <section className="mx-auto flex h-full max-w-[1434px] flex-col items-start justify-center pl-[46px] max-lg:items-center max-lg:px-6">
          <p className="text-[36px] font-semibold lg:text-[64px]">八色鸫</p>
          <p
            className="mb-5 text-center text-[36px] font-semibold lg:mb-6 lg:text-[64px]"
            style={accentStyle}
          >
            企业级 MaaS 平台
          </p>
          <p className="mb-6 text-center text-[16px] lg:mb-8 lg:text-left lg:text-[24px] text-[#161722]">
            全栈 AI 能力，一站交付
          </p>

          <div className="mb-7 flex flex-wrap items-center justify-center gap-[30px] text-[14px] text-[#57627f] lg:mb-[54px] lg:justify-start lg:text-[18px] max-[600px]:gap-4">
            {heroTags.map((tag, index) => (
              <span
                key={tag}
                className="flex items-center gap-[30px] max-[600px]:gap-4"
              >
                <span>{tag}</span>
                {index < heroTags.length - 1 ? (
                  <i
                    aria-hidden="true"
                    className="inline-block h-[22px] w-px bg-[#9AA6B8]"
                  />
                ) : null}
              </span>
            ))}
          </div>

          <Link
            href={CONSULT_URL}
            target="_blank"
            rel="noreferrer"
            className="group bd-gradient-bg flex h-16 items-center justify-center gap-2 rounded-[12px] px-[23px] text-[24px] font-bold text-white transition-transform duration-300 hover:-translate-y-0.5 max-lg:scale-75"
          >
            预约方案咨询
            <ArrowForwardIcon />
          </Link>
        </section>
      </div>
    </section>
  );
}
