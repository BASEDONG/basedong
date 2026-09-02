"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/components/shared/LocaleProvider";
import { cn } from "@/lib/utils";
import { getGatewayContent } from "./content";
import type { FaqItem } from "./content-types";
import { getGatewayUiCopy } from "./gateway-ui-copy";

function FaqAnswer({ answer }: { answer: FaqItem["answer"] }) {
  if (answer.type === "paragraphs") {
    return (
      <div className="space-y-2">
        {answer.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-[15px] leading-7 text-[#57627f]">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  if (answer.type === "list") {
    return (
      <div className="space-y-2">
        <p className="text-[15px] leading-7 text-[#57627f]">{answer.intro}</p>
        <ul className="list-disc space-y-1 pl-[18px]">
          {answer.items.map((item) => (
            <li key={item} className="text-[15px] leading-7 text-[#57627f]">
              {item}
            </li>
          ))}
        </ul>
        {answer.outro ? (
          <p className="text-[15px] leading-7 text-[#57627f]">{answer.outro}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-[15px] leading-7 text-[#57627f]">{answer.intro}</p>
      <ul className="list-disc space-y-1 pl-[18px]">
        {answer.items.map((item) => (
          <li key={item.label} className="text-[15px] leading-7 text-[#57627f]">
            <span className="font-medium text-[#161722]">{item.label}</span>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FaqColumn({
  items,
  startIndex,
}: {
  items: FaqItem[];
  startIndex: number;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    startIndex === 0 ? 0 : null,
  );

  return (
    <div className="w-full max-w-[680px] space-y-3">
      {items.map((item, index) => {
        const globalIndex = startIndex + index;
        const isOpen = openIndex === globalIndex;
        return (
          <Card key={item.question} variant="surface">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-[16px] font-semibold leading-7 text-[#161722]">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "mt-1 h-5 w-5 shrink-0 text-[#57627f] transition-transform",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            {isOpen ? (
              <div className="border-t border-[var(--sf-card-border)] px-5 pb-4 pt-3">
                <FaqAnswer answer={item.answer} />
              </div>
            ) : null}
          </Card>
        );
      })}
    </div>
  );
}

export function GatewayFaqSection() {
  const { locale } = useLocale();
  const { faqTitle } = getGatewayUiCopy(locale);
  const { faqs } = getGatewayContent(locale);
  const leftItems = faqs.slice(0, 3);
  const rightItems = faqs.slice(3);

  return (
    <section className="mb-[110px] w-full">
      <h3 className="mb-12 px-3.5 text-center text-[32px] font-bold md:mb-16 md:text-[48px]">
        {faqTitle}
      </h3>
      <div className="flex flex-col items-center justify-center gap-8 px-3.5 lg:flex-row lg:gap-[80px]">
        <FaqColumn items={leftItems} startIndex={0} />
        <FaqColumn items={rightItems} startIndex={3} />
      </div>
    </section>
  );
}
