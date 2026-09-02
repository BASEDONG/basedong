"use client";

import { useEffect, useRef, useState } from "react";

import { AlignLeftIcon } from "@/components/docs/shared/icons";
import { cn } from "@/lib/utils";

import type { TocItem } from "./content-types";

export function DocsToc({
  items,
  className,
}: {
  items: TocItem[];
  className?: string;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [thumb, setThumb] = useState({ top: 12, height: 20 });
  const listRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 1] },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const link = linkRefs.current.get(activeId);
    const list = listRef.current;
    if (!link || !list) return;
    const listBox = list.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    setThumb({
      top: linkBox.top - listBox.top + list.scrollTop,
      height: Math.max(linkBox.height - 4, 16),
    });
  }, [activeId]);

  if (!items.length) return null;

  return (
    <div
      id="nd-toc"
      className={cn(
        "sticky top-0 hidden h-fit w-[286px] max-w-full shrink-0 flex-col pb-2 pt-12 max-xl:hidden xl:flex",
        className,
      )}
    >
      <div className="flex h-full w-full max-w-full flex-col pe-4">
        <h3 className="inline-flex items-center gap-1.5 text-sm font-normal text-[#737373]">
          <AlignLeftIcon className="size-4 shrink-0" />
          On this page
        </h3>
        <div
          ref={listRef}
          className="relative ms-px min-h-0 overflow-auto py-3 text-sm [mask-image:linear-gradient(to_bottom,transparent,white_16px,white_calc(100%-16px),transparent)] [scrollbar-width:none]"
        >
          <div
            role="none"
            className="absolute start-0 w-px bg-[#4AABF0] transition-all"
            style={{ top: thumb.top, height: thumb.height }}
          />
          <div className="flex flex-col border-s border-[color-mix(in_oklab,#0a0a0a_10%,transparent)]">
            {items.map((item) => (
              <a
                key={item.id}
                ref={(el) => {
                  if (el) linkRefs.current.set(item.id, el);
                  else linkRefs.current.delete(item.id);
                }}
                href={`#${item.id}`}
                data-active={activeId === item.id || undefined}
                className={cn(
                  "prose py-1.5 text-sm text-[#737373] transition-colors [overflow-wrap:anywhere] first:pt-0 last:pb-0 data-[active=true]:text-[#4AABF0]",
                  item.depth === 3 ? "ps-6" : "ps-3",
                )}
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
