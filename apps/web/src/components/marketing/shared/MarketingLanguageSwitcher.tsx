"use client";

import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import {
  DEFAULT_LANGUAGE_CODE,
  MARKETING_LANGUAGES,
  type MarketingLanguage,
} from "@/lib/languages";
import { cn } from "@/lib/utils";

const scrollAreaClass =
  "flex w-max max-h-64 flex-col gap-[6px] overflow-y-auto overscroll-y-contain px-[6px] py-[20px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

function LanguageOption({
  item,
  selected,
  onSelect,
}: {
  item: MarketingLanguage;
  selected: boolean;
  onSelect: (code: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item.code)}
      className={cn(
        "block whitespace-nowrap rounded-[20px] px-[28px] py-[8px] text-left text-[14px] leading-none text-slate-800 transition-colors hover:bg-[#EEF6FE]",
        selected && "rounded-lg bg-[#4AABF0]/10 font-medium text-[#4AABF0]",
      )}
    >
      <span dir="auto">{item.nativeLabel}</span>
    </button>
  );
}

export function MarketingLanguageSwitcher({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(DEFAULT_LANGUAGE_CODE);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onDocMouseDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function handleOpenToggle() {
    setOpen((prev) => !prev);
  }

  function handleSelect(code: string) {
    setLang(code);
    setOpen(false);
  }

  return (
    <div className={cn("relative", className)} ref={rootRef}>
      <button
        type="button"
        aria-label="切换语言"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={handleOpenToggle}
        className={cn(
          "flex size-8 items-center justify-center text-slate-800 transition-colors duration-150 hover:text-[#4AABF0]",
          open && "text-[#4AABF0]",
        )}
      >
        <Globe className="size-4" />
      </button>

      <div
        className={cn(
          "absolute right-0 top-full z-50 origin-top pt-3 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
          open
            ? "pointer-events-auto opacity-100 [transform:scaleY(1)]"
            : "pointer-events-none opacity-0 [transform:scaleY(0.8)]",
        )}
        aria-hidden={!open}
      >
        <div className="w-max min-w-[124px] rounded-[16px] bg-white shadow-xl">
          <div className={scrollAreaClass} role="listbox" aria-label="语言列表">
            {MARKETING_LANGUAGES.map((item) => (
              <LanguageOption
                key={item.code}
                item={item}
                selected={lang === item.code}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
