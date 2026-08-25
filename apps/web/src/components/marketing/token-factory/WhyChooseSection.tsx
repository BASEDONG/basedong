import { whyCards, TF_ASSETS } from "./content";

export function WhyChooseSection() {
  return (
    <div className="relative w-full overflow-hidden bg-white px-4 py-[110px] max-md:pb-24 max-md:pt-[72px]">
      <div
        className="absolute left-0 top-0 h-full w-full bg-cover bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${TF_ASSETS}/bg-section-3.svg)` }}
        aria-hidden="true"
      />
      <section className="relative z-10">
        <h2 className="mb-6 bg-[linear-gradient(180deg,#3A9AE0_9.58%,#4AABF0_50.21%)] bg-clip-text text-center text-[48px] font-semibold leading-[1.5] text-transparent max-[1280px]:text-[38px] max-[960px]:text-[28px]">
          为什么选择八色鸫
        </h2>

        <div className="mx-auto grid max-w-[1400px] grid-cols-4 justify-items-center gap-6 max-[1490px]:grid-cols-2 max-[960px]:grid-cols-1">
          {whyCards.map((card) => (
            <article
              key={card.title}
              className="group relative box-border h-[456px] w-[332px] overflow-hidden rounded-[14px] border px-6 py-8 transition-shadow duration-300 will-change-transform hover:shadow-[0_12px_32px_rgba(74,171,240,0.10)] max-[1490px]:w-auto max-[1490px]:min-w-[332px] max-[1180px]:mx-auto max-[960px]:w-full max-[960px]:min-w-full max-[960px]:max-w-[284px]"
              style={{ borderColor: card.border, backgroundColor: card.bg }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[14px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.36) 0%, rgba(255,255,255,0) 46%)",
                }}
              />
              <div
                className="mx-auto mb-8 h-[200px] w-[200px] bg-contain bg-center bg-no-repeat transition-transform duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.08] group-hover:rotate-[-3deg]"
                style={{
                  backgroundImage: `url(${card.image})`,
                  transformOrigin: "50% 80%",
                }}
              />
              <div className="mb-[18px] flex items-center gap-2">
                <div
                  className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg bg-center bg-no-repeat bg-[length:26px_26px]"
                  style={{
                    backgroundColor: card.iconBg,
                    backgroundImage: `url(${card.icon})`,
                  }}
                />
                <div>
                  <div className="text-[14px] font-semibold leading-[1.2] text-[#4AABF0]">
                    {card.prefix}
                  </div>
                  <div className="mt-0.5 text-[20px] font-semibold leading-[1.25] text-slate-800">
                    {card.title}
                  </div>
                </div>
              </div>
              <p className="text-[16px] leading-[1.75] text-slate-500">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
