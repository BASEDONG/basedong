import { whyCards } from "./content";
import { ScrollReveal } from "./ScrollReveal";

function CheckIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[14px] text-[#4AABF0]"
      height="1em"
      width="1em"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function WhyReservedSection() {
  return (
    <section className="w-full bg-white px-4 py-[110px] max-[960px]:py-[72px]">
      <p className="mb-[24px] text-center text-[18px] leading-[27px] text-[#4AABF0]">
        WHY RESERVED
      </p>
      <h2 className="mb-[24px] text-center text-[48px] font-semibold leading-[72px] text-slate-800 max-[960px]:text-[36px]">
        为什么选择预留实例服务
      </h2>
      <p className="mb-[24px] text-center text-[18px] leading-[27px] text-slate-800 max-[960px]:text-[16px]">
        面向企业核心推理场景，提供独占算力、精度保障与成本优化的一站式解决方案。
      </p>

      <div className="mx-auto grid w-[1400px] max-w-full grid-cols-2 gap-[24px] max-[1280px]:w-full max-[960px]:grid-cols-1">
        {whyCards.map((card, index) => (
          <ScrollReveal key={card.title} delay={index * 80} className="h-full">
            <article className="group relative h-full max-w-[688px] overflow-hidden rounded-[16px] border border-slate-200 border-t-[3px] border-t-[#4AABF0] bg-white max-[960px]:min-w-full max-[960px]:max-w-full">
              <div
                className="absolute inset-0 opacity-[0.92]"
                style={{
                  backgroundImage: `url(${card.bg})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(74,171,240,0.10),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-[16px] ring-0 ring-[#4AABF0]/10 transition-all duration-300 group-hover:ring-4"
                aria-hidden="true"
              />
              <div className="relative z-10 p-[32px]">
                <div
                  className="mb-[20px] flex h-[44px] w-[44px] items-center justify-center rounded-[10px] bg-[#4AABF01A] bg-[length:32px_32px] bg-center bg-no-repeat shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
                  style={{ backgroundImage: `url(${card.icon})` }}
                  aria-hidden="true"
                />
                <h3 className="mb-[16px] pr-[12px] text-[22px] font-semibold leading-[1.35] text-slate-900">
                  {card.title}
                </h3>
                <ul className="space-y-[12px]">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start text-[15px] leading-[1.75] text-slate-600"
                    >
                      <span className="mr-[10px] mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4AABF0]/10">
                        <CheckIcon />
                      </span>
                      <span className="break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="pointer-events-none absolute inset-0 rounded-[16px] shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-300 group-hover:shadow-[0_20px_60px_rgba(74,171,240,0.10)]"
                aria-hidden="true"
              />
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
