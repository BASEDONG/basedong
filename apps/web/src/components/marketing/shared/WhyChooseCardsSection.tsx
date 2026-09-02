import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { MarketingIconBadge } from "@/components/marketing/shared/MarketingIconBadge";
import { Card } from "@/components/ui/card";

export type WhyChooseCard = {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  border: string;
  bg: string;
  iconBg: string;
  prefix?: string;
};

type WhyChooseCardsSectionProps = {
  title?: string;
  subtitle?: string;
  hideTitle?: boolean;
  cards: readonly WhyChooseCard[];
  columns?: 3 | 4;
  backgroundImage?: string;
  /** Nest inside another section without extra vertical padding. */
  embedded?: boolean;
  /** Default full section py; bottom-only matches Token Factory features after hero. */
  padY?: "full" | "bottom";
};

const GRID_COLS = {
  3: "grid-cols-3 max-[1280px]:grid-cols-2 max-[960px]:grid-cols-1",
  4: "grid-cols-4 max-[1280px]:grid-cols-2 max-md:grid-cols-1",
} as const;

export function WhyChooseCardsSection({
  title,
  subtitle,
  hideTitle = false,
  cards,
  columns = 4,
  backgroundImage,
  embedded = false,
  padY = "full",
}: WhyChooseCardsSectionProps) {
  const showTitle = !hideTitle && Boolean(title);

  const shellClass = embedded
    ? "relative w-full overflow-hidden"
    : padY === "bottom"
      ? "relative w-full overflow-hidden bg-white pb-[110px]"
      : "relative w-full overflow-hidden bg-white py-[110px] max-md:pb-24 max-md:pt-[72px]";

  return (
    <div className={shellClass}>
      {backgroundImage ? (
        <div
          className="absolute left-0 top-0 h-full w-full bg-cover bg-no-repeat opacity-40"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      ) : null}
      <section className="relative z-10">
        {showTitle ? (
          <>
            <h2
              className={`bg-[linear-gradient(180deg,#3A9AE0_9.58%,#4AABF0_50.21%)] bg-clip-text text-center text-[48px] font-semibold leading-[1.5] text-transparent max-[1280px]:text-[38px] max-[960px]:text-[28px] ${subtitle ? "" : "mb-10"}`}
            >
              {title}
            </h2>
            {subtitle ? (
              <h3 className="mb-10 text-center text-[24px] font-semibold text-black max-[1280px]:text-[18px]">
                {subtitle}
              </h3>
            ) : null}
          </>
        ) : null}

        <div className={`sf-content grid gap-6 ${GRID_COLS[columns]}`}>
          {cards.map((card) => (
            <Card
              key={card.title}
              variant="feature"
              size="lg"
              interactive="lift"
              className="relative min-h-[419px] w-full pt-14"
              style={{ borderColor: card.border, backgroundColor: card.bg }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0)_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <Image
                src={card.image}
                alt=""
                width={160}
                height={120}
                className="relative z-10 mx-auto mb-6 block h-[120px] w-[160px] origin-center select-none object-contain transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
              />
              <div className="relative z-10 mb-7 flex items-start gap-3">
                <MarketingIconBadge
                  icon={card.icon}
                  size="md"
                  bg={card.iconBg}
                  className="mt-0.5"
                />
                <div className="min-w-0">
                  {card.prefix ? (
                    <div className="text-[13px] font-semibold leading-[1.2] text-[#4AABF0]">
                      {card.prefix}
                    </div>
                  ) : null}
                  <h3
                    className={`text-[19px] font-semibold leading-[1.45] text-slate-800 ${card.prefix ? "mt-0.5" : ""}`}
                  >
                    {card.title}
                  </h3>
                </div>
              </div>
              <p className="relative z-10 text-[15px] leading-[1.7] text-slate-500">
                {card.description}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
