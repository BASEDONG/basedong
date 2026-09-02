"use client";

import { ArrowUp, Workflow } from "lucide-react";
import { MarketingIconBadge } from "@/components/marketing/shared/MarketingIconBadge";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getTokenFactoryContent } from "./content";

export function TechArchitecture() {
  const { locale } = useLocale();
  const {
    assets,
    architectureBadge,
    architectureTitleLine1,
    architectureTitleLine2,
    architectureBodyPrefix,
    architectureBodySuffix,
    architectureLayers,
  } = getTokenFactoryContent(locale);

  return (
    <div className="relative w-full overflow-hidden bg-white py-[110px] max-md:pb-24 max-md:pt-[72px]">
      <div
        className="absolute left-0 top-0 h-full w-full bg-cover bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${assets}/bg-section-3.svg)` }}
        aria-hidden="true"
      />
      <section className="relative z-10">
        <div className="sf-content">
          <div className="relative overflow-hidden py-[72px] max-[1280px]:py-12 max-md:py-7">
            <div className="relative z-10 grid grid-cols-[minmax(320px,480px)_1fr] items-center gap-24 max-[1280px]:grid-cols-1 max-[1280px]:gap-12 max-md:gap-8">
              <div className="max-w-[460px] max-[1280px]:flex max-[1280px]:max-w-full max-[1280px]:flex-col max-[1280px]:items-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4AABF033] bg-[#4AABF01A] px-3 py-[5px] text-[14px] font-semibold leading-none text-[#4AABF0]">
                  <Workflow className="h-4 w-4" strokeWidth={2} aria-hidden />
                  <span>{architectureBadge}</span>
                </div>
                <h2 className="mb-4 text-[48px] font-semibold tracking-[-0.03em] text-[#2B1970] max-[1280px]:text-center max-[1280px]:text-[38px]">
                  <span className="bg-[linear-gradient(180deg,#3A9AE0_9.58%,#4AABF0_50.21%)] bg-clip-text text-transparent">
                    {architectureTitleLine1}
                  </span>
                  <br className="max-[1280px]:hidden" />
                  <span className="bg-[linear-gradient(180deg,#3A9AE0_9.58%,#4AABF0_50.21%)] bg-clip-text text-transparent">
                    {" "}
                    {architectureTitleLine2}
                  </span>
                </h2>
                <p className="max-w-[577px] text-[18px] text-slate-600 max-[1280px]:max-w-full max-[1280px]:text-center">
                  {architectureBodyPrefix}{" "}
                  <span className="font-semibold text-[#4AABF0]">Token</span>{" "}
                  {architectureBodySuffix}
                </p>
              </div>

              <div className="relative mx-auto w-full">
                <div className="relative flex flex-col gap-9">
                  {architectureLayers.map((layer, index) => (
                    <div
                      key={layer.title}
                      className="relative z-10 flex flex-col items-center"
                    >
                      {index > 0 ? (
                        <ArrowUp
                          className="pointer-events-none absolute left-1/2 top-[-26px] z-20 h-6 w-6 -translate-x-1/2 text-[#4AABF0]"
                          aria-hidden
                        />
                      ) : null}
                      <Card
                        variant="surface"
                        size="md"
                        interactive="outline"
                        className="relative w-full rounded-lg border-slate-200 backdrop-blur-sm hover:shadow-[0_12px_32px_rgba(74,171,240,0.12),0_0_0_1px_rgba(74,171,240,0.05)]"
                      >
                        <div className="relative z-10 flex items-start gap-4">
                          <MarketingIconBadge
                            icon={layer.icon}
                            size="sm"
                            bg={layer.iconBg}
                          />
                          <div className="min-w-0">
                            <div className="mb-1 text-[20px] font-semibold text-slate-800">
                              {layer.title}
                            </div>
                            <div className="text-[16px] text-slate-500">
                              {layer.subtitle}
                            </div>
                          </div>
                        </div>
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(74,171,240,0.06) 0%, rgba(74,171,240,0) 45%)",
                          }}
                        />
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
