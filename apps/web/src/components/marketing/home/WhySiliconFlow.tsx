"use client";

import type { SfWhyHighlightCard, SfWhyTextBlock, SfTextPart } from "@/types/siliconflow-cn-10b89bdc";
import { useLocale } from "@/components/shared/LocaleProvider";
import { WhyChooseCardsSection } from "@/components/marketing/shared/WhyChooseCardsSection";
import { Card } from "@/components/ui/card";
import { CardGradientBackground } from "./CardGradientBackground";
import { WhyHighlightIllustration } from "./WhyHighlightIllustration";
import { getHomeContent } from "./content";

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
    <div className="relative z-10 flex h-full flex-col p-8 md:p-12">
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
  const { locale } = useLocale();
  const { whySection, whyHighlightCards, featureCards } = getHomeContent(locale);

  return (
    <section className="mb-[110px] w-full">
      <h3 className="mb-10 px-3.5 text-center text-[38px] font-bold md:mb-[66px] md:text-[48px]">
        {whySection.title}
      </h3>

      <div className="sf-content mb-[74px] grid grid-cols-1 gap-9 md:grid-cols-2 md:items-stretch">
        {whyHighlightCards.map((card) => (
          <Card
            key={card.illustration}
            variant="elevated"
            interactive="lift"
            className="relative h-full min-w-0"
          >
            <CardGradientBackground {...card.background} />
            <div className="pointer-events-none absolute right-[-22px] top-[-39px] z-[1] h-[220px] w-[220px] opacity-[0.18] md:h-[290px] md:w-[290px] md:opacity-[0.2]">
              <WhyHighlightIllustration variant={card.illustration} />
            </div>
            <WhyHighlightCardContent card={card} />
          </Card>
        ))}
      </div>

      <WhyChooseCardsSection
        hideTitle
        embedded
        cards={featureCards}
        columns={4}
      />
    </section>
  );
}
