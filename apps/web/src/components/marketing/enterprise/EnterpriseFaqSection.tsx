"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/components/shared/LocaleProvider";
import { cn } from "@/lib/utils";
import { getEnterpriseContent } from "./content";
import type { FaqCopy } from "./content-types";
import { getEnterpriseUiCopy } from "./enterprise-ui-copy";

function FaqColumn({
  items,
  startIndex,
}: {
  items: FaqCopy[];
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
                {item.answer.split("\n").map((line) =>
                  line.trim() ? (
                    <p
                      key={line}
                      className="mb-2 text-[15px] leading-7 text-[#57627f]"
                    >
                      {line}
                    </p>
                  ) : null,
                )}
              </div>
            ) : null}
          </Card>
        );
      })}
    </div>
  );
}

export function EnterpriseFaqSection() {
  const { locale } = useLocale();
  const { faqTitle } = getEnterpriseUiCopy(locale);
  const { faqItems } = getEnterpriseContent(locale);
  const leftItems = faqItems.slice(0, 5);
  const rightItems = faqItems.slice(5);

  return (
    <section className="mb-[110px] w-full">
      <h3 className="mb-12 px-3.5 text-center text-[32px] font-bold md:mb-16 md:text-[48px]">
        {faqTitle}
      </h3>
      <div className="flex flex-col items-center justify-center gap-8 px-3.5 lg:flex-row lg:gap-[80px]">
        <FaqColumn items={leftItems} startIndex={0} />
        <FaqColumn items={rightItems} startIndex={5} />
      </div>
    </section>
  );
}
