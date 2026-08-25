"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqs, type FaqItem } from "./content";
import { GatewayReveal } from "./GatewayReveal";

function FaqAnswer({ answer }: { answer: FaqItem["answer"] }) {
  if (answer.type === "paragraphs") {
    return (
      <div className="space-y-3.5 text-[16px] leading-[1.9] text-[#5F6472]">
        {answer.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    );
  }

  if (answer.type === "list") {
    return (
      <div className="space-y-3.5 text-[16px] leading-[1.9] text-[#5F6472]">
        <p>{answer.intro}</p>
        <ul className="list-disc space-y-2 pl-[18px]">
          {answer.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {answer.outro ? <p>{answer.outro}</p> : null}
      </div>
    );
  }

  return (
    <div className="space-y-3.5 text-[16px] leading-[1.9] text-[#5F6472]">
      <p>{answer.intro}</p>
      <ul className="list-disc space-y-2 pl-[18px]">
        {answer.items.map((item) => (
          <li key={item.label}>
            <span className="font-medium text-[#2B2F38]">{item.label}</span>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GatewayFaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="w-full bg-white py-[160px] max-[1180px]:py-20">
      <section className="ai-gateway-faq relative w-full overflow-hidden px-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[80px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#4AABF0]/[0.06] blur-[120px]"
        />

        <div className="relative mx-auto max-w-[1400px]">
          <GatewayReveal variant="soft">
            <div className="mb-10 text-center max-[960px]:mb-[42px]">
              <div className="mb-[18px] inline-flex items-center rounded-full border border-[#7A3CFF]/[0.14] bg-[#7A3CFF]/[0.06] px-4 py-1.5 text-[14px] font-medium tracking-[0.12em] text-[#4AABF0] backdrop-blur-xl">
                FAQ
              </div>
              <h2 className="bg-[linear-gradient(180deg,#4AABF0_0%,#5A1FFF_100%)] bg-clip-text text-[48px] font-semibold leading-[1.12] tracking-[-0.03em] text-transparent max-[960px]:text-[36px]">
                相关问题
              </h2>
            </div>
          </GatewayReveal>

          <GatewayReveal variant="card" delayMs={100}>
            <div className="rounded-lg bg-white/90 backdrop-blur-xl max-[960px]:p-3">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={faq.question}
                    className={cn(
                      "gw-faq-item mb-3 overflow-hidden rounded-lg border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] last:mb-0",
                      isOpen
                        ? "border-[rgba(123,66,255,0.2)] bg-[linear-gradient(180deg,#FFFFFF_0%,rgba(123,66,255,0.02)_100%)] shadow-[0_16px_40px_rgba(109,40,246,0.06)]"
                        : "border-[#ECEEF5] bg-white",
                    )}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="flex min-h-[60px] w-full items-center justify-between gap-4 px-8 py-[14px] text-left"
                    >
                      <span
                        className={cn(
                          "text-[20px] font-normal leading-7 transition-colors duration-300 max-[960px]:text-[16px]",
                          isOpen ? "text-[#4AABF0]" : "text-[#1F2430]",
                        )}
                      >
                        {faq.question}
                      </span>
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                          isOpen
                            ? "border-[#4AABF0]/20 bg-[#4AABF0]/10 text-[#4AABF0]"
                            : "border-[#E7EAF3] bg-white text-[#98A2B3]",
                        )}
                        aria-hidden="true"
                      >
                        {isOpen ? (
                          <Minus className="size-[13px]" strokeWidth={2} />
                        ) : (
                          <Plus className="size-[13px]" strokeWidth={2} />
                        )}
                      </span>
                    </button>
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="px-8 pb-6 pt-0">
                          <FaqAnswer answer={faq.answer} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </GatewayReveal>
        </div>
      </section>
    </div>
  );
}
