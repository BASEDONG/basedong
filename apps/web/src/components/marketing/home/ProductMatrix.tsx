import { NavAnchor } from "@/components/marketing/shared/NavAnchor";
import { CardGradientBackground } from "./CardGradientBackground";
import { ProductCardIllustration } from "./ProductCardIllustration";
import { productCards } from "./content";

export function ProductMatrix() {
  return (
    <section className="mb-[110px] w-full">
      <h3 className="mb-2 px-3.5 text-center text-[38px] font-bold md:mb-2 md:text-[48px]">
        覆盖全链路的产品体系，支撑 AI 应用从构想到上线
      </h3>
      <p className="mb-16 px-9 text-center text-[20px] md:text-[24px]">
        为开发者与企业提供一体化接入能力，快速打通 AI 与业务场景
      </p>

      <div className="mb-[120px] flex px-3.5">
        <div className="mx-auto grid w-full max-w-[1397px] grid-cols-1 gap-[31px] md:grid-cols-2">
          {productCards.map((card) => (
            <section
              key={card.title}
              className="group relative min-h-[380px] max-w-full overflow-hidden rounded-[12px] border border-[#eceef3] px-8 py-12 md:max-w-[708px] md:px-12 md:py-[60px]"
            >
              <CardGradientBackground {...card.background} />
              <h3
                className="relative z-10 mb-3 text-[28px] font-semibold leading-[1.5] text-[#161722] md:text-[32px]"
                style={{ color: card.background.accent }}
              >
                {card.title}
              </h3>
              <p className="relative z-10 max-w-[520px] text-[16px] leading-[1.5] text-[#161722] md:text-[18px]">
                {card.description}
              </p>
              <NavAnchor
                href={card.ctaHref}
                className="bd-gradient-bg absolute bottom-[50px] left-[33px] z-10 flex h-12 w-[120px] cursor-pointer items-center justify-center rounded-[12px] text-[16px] font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                {card.ctaLabel}
              </NavAnchor>
              <div className="pointer-events-none absolute bottom-[-12px] right-[-16px] z-[1] h-[160px] w-[180px] opacity-[0.18] md:bottom-[-16px] md:right-[-20px] md:h-[185px] md:w-[220px] md:opacity-[0.2]">
                <ProductCardIllustration variant={card.illustration} palette={card.background} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
