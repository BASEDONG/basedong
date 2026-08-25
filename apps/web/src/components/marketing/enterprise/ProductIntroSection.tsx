import { CardGradientBackground } from "@/components/marketing/home/CardGradientBackground";
import { ProductCardIllustration } from "@/components/marketing/home/ProductCardIllustration";
import { EnterprisePlatformArchitecture } from "./EnterprisePlatformArchitecture";
import { introCards, introSummary } from "./content";

export function ProductIntroSection() {
  return (
    <section className="mb-[110px] w-full">
      <h3 className="mb-2 px-3.5 text-center text-[38px] font-bold md:text-[48px]">
        平台概览
      </h3>
      <p className="mx-auto mb-16 max-w-[1290px] px-9 text-center text-[18px] text-[#57627f] md:text-[20px]">
        {introSummary}
      </p>

      <div className="mb-[74px] flex px-3.5">
        <div className="mx-auto grid w-full max-w-[1397px] grid-cols-1 gap-[31px] md:grid-cols-2">
          {introCards.map((card) => (
            <section
              key={card.title}
              className="group relative min-h-[280px] max-w-full overflow-hidden rounded-[12px] border border-[#eceef3] px-8 py-12 md:max-w-[708px] md:px-12 md:py-[56px]"
            >
              <CardGradientBackground {...card.background} />
              <h3
                className="relative z-10 mb-3 text-[24px] font-semibold leading-[1.5] text-[#161722] md:text-[28px]"
                style={{ color: card.background.accent }}
              >
                {card.title}
              </h3>
              <p className="relative z-10 max-w-[520px] text-[16px] leading-[1.5] text-[#57627f] md:text-[18px]">
                {card.description}
              </p>
              <div className="pointer-events-none absolute bottom-[-12px] right-[-16px] z-[1] h-[160px] w-[180px] opacity-[0.18] md:bottom-[-16px] md:right-[-20px] md:h-[185px] md:w-[220px] md:opacity-[0.2]">
                <ProductCardIllustration
                  variant={card.illustration}
                  palette={card.background}
                />
              </div>
            </section>
          ))}
        </div>
      </div>

      <h3 className="mb-10 px-3.5 text-center text-[32px] font-bold md:mb-12 md:text-[48px]">
        八色鸫企业级平台技术架构
      </h3>
      <div className="flex px-3.5">
        <div className="mx-auto w-full max-w-[1397px] rounded-[12px] border border-[#eceef3] bg-white p-6 md:p-[24px]">
          <EnterprisePlatformArchitecture />
        </div>
      </div>
    </section>
  );
}
