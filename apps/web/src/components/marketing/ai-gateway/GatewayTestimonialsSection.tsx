import { GW_ASSETS, testimonials } from "./content";
import { GatewayReveal } from "./GatewayReveal";

export function GatewayTestimonialsSection() {
  return (
    <div className="relative w-full py-[110px]">
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${GW_ASSETS}/bg-section-3.svg)`,
        }}
      />
      <div className="relative z-10">
        <section className="w-full overflow-hidden px-6">
          <div className="mx-auto max-w-[1400px]">
            <GatewayReveal variant="soft">
              <h2 className="mb-9 text-center text-[48px] font-semibold leading-[1.2] text-[#4AABF0] max-[960px]:text-[36px]">
                客户评价
              </h2>
            </GatewayReveal>
            <div className="grid grid-cols-2 gap-6 max-[960px]:grid-cols-1">
              {testimonials.map((item, index) => (
                <GatewayReveal
                  key={item.title}
                  variant="card"
                  delayMs={100 + index * 100}
                >
                  <article className="group relative min-h-[360px] overflow-hidden rounded-lg border border-transparent bg-[rgba(2,246,247,0.1)] p-8 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#4AABF01A] hover:shadow-[0_12px_32px_rgba(74,171,240,0.06)] max-[1180px]:h-auto max-[1180px]:min-h-[360px]">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute right-[-80px] top-[-80px] h-[180px] w-[180px] rounded-full bg-[#4AABF0]/[0.05] opacity-0 blur-[50px] transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <div className="relative z-[1] flex h-full flex-col justify-between">
                      <h3 className="text-[24px] font-semibold leading-[34px] text-slate-800 transition-colors duration-300 max-[960px]:text-[20px]">
                        {item.title}
                      </h3>
                      <div className="border-l border-slate-300 py-7 pl-5 transition-colors duration-300 group-hover:border-[#4AABF033]">
                        <p className="border-l border-slate-300 pl-4 text-justify text-[16px] leading-7 text-slate-600 transition-colors duration-300 group-hover:border-[#4AABF033]">
                          {item.body}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div
                          className="mr-2 h-[22px] w-[22px] rounded-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundImage: `url(${item.avatar})` }}
                        />
                        <span className="text-[15px] font-medium text-slate-800">
                          {item.role}
                        </span>
                      </div>
                    </div>
                  </article>
                </GatewayReveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
