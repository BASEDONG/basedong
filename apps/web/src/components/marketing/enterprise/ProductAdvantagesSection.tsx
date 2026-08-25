import { CardGradientBackground } from "@/components/marketing/home/CardGradientBackground";
import { FeatureCardIllustration } from "@/components/marketing/home/FeatureCardIllustration";
import { advantageCards } from "./content";

export function ProductAdvantagesSection() {
  return (
    <section className="mb-[110px] w-full">
      <h3 className="mb-10 px-3.5 text-center text-[38px] font-bold md:mb-[66px] md:text-[48px]">
        产品优势
      </h3>

      <div className="flex px-3.5">
        <div className="mx-auto grid w-full max-w-[1397px] grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {advantageCards.map((card) => (
            <div
              key={card.title}
              className="group relative min-h-[320px] max-w-full overflow-hidden rounded-[12px] border border-[#eceef3] px-8 py-12 transition-shadow duration-300 hover:shadow-[0_22px_58px_rgba(3,7,18,0.08)]"
            >
              <CardGradientBackground {...card.background} />
              <div className="relative z-10 mb-8 h-14 w-14 opacity-70">
                <FeatureCardIllustration
                  variant={card.illustration}
                  palette={card.background}
                />
              </div>
              <h3
                className="relative z-10 mb-6 text-[20px] font-bold text-[#161722] md:text-[22px]"
                style={{ color: card.background.accent }}
              >
                {card.title}
              </h3>
              <ul className="relative z-10 space-y-4 text-[15px] leading-6 text-[#57627f]">
                {card.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: card.background.accent }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
