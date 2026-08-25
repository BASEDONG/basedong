import { deliverySteps, RV_ASSETS } from "./content";
import { ScrollReveal } from "./ScrollReveal";

export function DeliverySlaSection() {
  return (
    <div className="relative w-full bg-white px-4 pb-[204px] pt-[110px] max-[960px]:pb-24 max-[960px]:pt-[72px]">
      <div
        className="absolute left-0 top-0 h-full w-full bg-cover bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${RV_ASSETS}/bg-section-3.svg)` }}
        aria-hidden="true"
      />
      <section className="relative z-10">
        <p className="mb-6 text-center text-[18px] text-[#4AABF0]">
          DELIVERY & SLA
        </p>
        <h2 className="mb-4 text-center text-[48px] font-semibold text-slate-800 max-[960px]:text-[36px]">
          企业级交付与运行保障
        </h2>

        <div className="mt-[60px] flex justify-center max-[960px]:block">
          <div className="relative w-full max-w-[1344px] px-2">
            <div className="flex flex-col gap-9">
              {deliverySteps.map((step, index) => (
                <ScrollReveal key={step.num} delay={index * 100} y={24}>
                  <div className="flex items-start gap-4">
                    <div className="relative flex w-10 shrink-0 justify-center">
                      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#4AABF0] text-[16px] font-semibold text-white shadow-md">
                        {step.num}
                        {index < deliverySteps.length - 1 ? (
                          <div
                            className="absolute left-1/2 top-10 h-[102px] w-0.5 -translate-x-1/2"
                            style={{
                              background:
                                "linear-gradient(to bottom, #4AABF033 0%, #4AABF000 100%)",
                            }}
                            aria-hidden="true"
                          />
                        ) : null}
                      </div>
                    </div>
                    <div className="min-h-[104px] flex-1 rounded-xl border border-transparent bg-white px-4 py-6 transition-all duration-300 hover:border-[#4AABF0] hover:bg-white">
                      <div className="flex items-start gap-4">
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#4AABF01A] bg-[length:16px_16px] bg-center bg-no-repeat"
                          style={{ backgroundImage: `url(${step.icon})` }}
                          aria-hidden="true"
                        />
                        <div>
                          <h3 className="mb-1.5 text-[18px] font-semibold text-slate-800">
                            {step.title}
                          </h3>
                          <p className="text-[14px] leading-[1.6] text-gray-500">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
