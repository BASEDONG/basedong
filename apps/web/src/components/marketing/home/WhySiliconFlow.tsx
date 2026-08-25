import type { SfTextPart, SfWhyHighlightCard, SfWhyTextBlock } from "@/types/siliconflow-cn-10b89bdc";
import { CardGradientBackground } from "./CardGradientBackground";
import { FeatureCardIllustration } from "./FeatureCardIllustration";
import { WhyHighlightIllustration } from "./WhyHighlightIllustration";
import { featureCards, whyHighlightCards } from "./content";

function HighlightLine({
  parts,
  accent,
  emphasisInk = false,
}: {
  parts: SfTextPart[];
  accent: string;
  emphasisInk?: boolean;
}) {
  return (
    <>
      {parts.map((part) =>
        part.emphasis ? (
          <span
            key={part.text}
            className={emphasisInk ? "font-semibold text-[#161722]" : "font-semibold"}
            style={emphasisInk ? undefined : { color: accent }}
          >
            {part.text}
          </span>
        ) : (
          <span key={part.text}>{part.text}</span>
        ),
      )}
    </>
  );
}

function HighlightBlock({
  block,
  accent,
}: {
  block: SfWhyTextBlock;
  accent: string;
}) {
  return (
    <div className={block.className}>
      {block.lines.map((line, index) => (
        <p key={index} className="text-[18px] leading-8 text-[#161722] md:text-[20px]">
          <HighlightLine parts={line} accent={accent} />
        </p>
      ))}
    </div>
  );
}

function WhyHighlightCardContent({ card }: { card: SfWhyHighlightCard }) {
  const { accent } = card.background;

  return (
    <div className="relative z-10 p-8 md:p-12">
      <h3
        className="mb-6 text-[32px] font-bold text-[#161722] md:text-[40px]"
        style={{ color: accent }}
      >
        {card.title}
      </h3>

      {card.textBlocks.map((block, index) => (
        <HighlightBlock key={index} block={block} accent={accent} />
      ))}

      {card.stats?.map((stat) => (
        <p
          key={stat.prefix}
          className="mb-3 text-[18px] leading-8 text-[#161722] md:text-[20px]"
        >
          {stat.prefix}{" "}
          <span className="text-[28px] font-bold md:text-[36px]" style={{ color: accent }}>
            {stat.value}
          </span>
          {stat.suffix ? ` ${stat.suffix}` : null}
        </p>
      ))}

      {card.footnotes?.map((line, index) => (
        <p key={index} className="mb-2 text-[16px] text-[#57627f] md:text-[18px]">
          <HighlightLine parts={line} accent={accent} emphasisInk />
        </p>
      ))}
    </div>
  );
}

export function WhySiliconFlow() {
  return (
    <section className="mb-[110px] w-full">
      <h3 className="mb-10 px-3.5 text-center text-[38px] font-bold md:mb-[66px] md:text-[48px]">
        为什么选择八色鸫
      </h3>

      <div className="mb-[74px] flex px-3.5">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-9 md:grid-cols-2">
          {whyHighlightCards.map((card) => (
            <div
              key={card.title}
              className="group relative min-w-0 overflow-hidden rounded-[14px] border border-[#eceef3] transition-shadow duration-300 hover:shadow-[0_24px_70px_rgba(3,7,18,0.08)]"
            >
              <CardGradientBackground {...card.background} />
              <div className="pointer-events-none absolute right-[-22px] top-[-39px] z-[1] h-[220px] w-[220px] opacity-[0.18] md:h-[290px] md:w-[290px] md:opacity-[0.2]">
                <WhyHighlightIllustration variant={card.illustration} palette={card.background} />
              </div>
              <WhyHighlightCardContent card={card} />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-[74px] flex px-3.5">
        <div className="mx-auto grid w-full max-w-[1397px] grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="group relative min-h-[520px] max-w-full overflow-hidden rounded-[12px] border border-[#eceef3] px-8 py-12 transition-shadow duration-300 hover:shadow-[0_22px_58px_rgba(3,7,18,0.08)] md:max-w-[336px]"
            >
              <CardGradientBackground {...card.background} />
              <div className="relative z-10 mb-8 h-14 w-14 opacity-70">
                <FeatureCardIllustration variant={card.illustration} palette={card.background} />
              </div>
              <h3
                className="relative z-10 mb-6 text-[24px] font-bold text-[#161722]"
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
