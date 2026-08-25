import {
  BookMarked,
  Laptop,
  Router,
  ScanEye,
  ShieldCheck,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";
import { advantages, GW_ASSETS } from "./content";
import { GatewayReveal } from "./GatewayReveal";

const advantageIcons: LucideIcon[] = [
  Laptop,
  Router,
  BookMarked,
  TrendingDown,
  ScanEye,
  ShieldCheck,
];

export function ProductAdvantagesSection() {
  return (
    <div className="relative w-full py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${GW_ASSETS}/bg-section-3.svg)`,
        }}
      />
      <div className="relative z-10">
        <section className="w-full px-6">
          <GatewayReveal variant="soft">
            <h2 className="mb-10 text-center text-[48px] font-semibold leading-[1.2] text-[#4AABF0] max-[960px]:text-[36px]">
              产品优势
            </h2>
          </GatewayReveal>
          <div className="mx-auto grid max-w-[1400px] grid-cols-3 gap-x-6 gap-y-6 max-[1180px]:grid-cols-2 max-[960px]:grid-cols-1">
            {advantages.map((item, index) => {
              const Icon = advantageIcons[index] ?? Laptop;
              return (
                <GatewayReveal
                  key={item.num}
                  variant="card"
                  delayMs={80 + index * 70}
                >
                  <article className="group relative h-[300px] rounded-[12px] border border-[#D8DEE8] bg-white/50 px-6 py-8 shadow-[0_12px_30px_rgba(84,89,115,0.03)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#B996FF] hover:bg-white/70 hover:shadow-[0_14px_34px_rgba(74,171,240,0.14)] max-[960px]:h-auto">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-[12px] bg-[radial-gradient(circle_at_18%_12%,rgba(74,171,240,0.08),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.06))] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="mb-8 flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[6px] bg-[#EEF6FE] text-[#4AABF0] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[#4AABF0] group-hover:text-white group-hover:shadow-[0_10px_22px_rgba(74,171,240,0.28)]">
                          <Icon className="size-6" aria-hidden="true" />
                        </div>
                        <span className="select-none text-[40px] font-semibold leading-none text-[#D8C7FF] transition-all duration-500 group-hover:text-[#C7A8FF]">
                          {item.num}
                        </span>
                      </div>
                      <h3 className="mb-[14px] text-[20px] font-semibold leading-[1.35] text-[#172033]">
                        {item.title}
                      </h3>
                      <p className="max-w-[360px] text-[14px] leading-[1.55] text-[#6B7280]">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </GatewayReveal>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
