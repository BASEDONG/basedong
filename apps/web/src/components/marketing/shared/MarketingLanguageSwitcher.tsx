"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import {
  SITE_LANGUAGES,
  type SiteLanguage,
} from "@/lib/languages";
import type { TargetLocale } from "@/lib/locale";
import { isTranslatedLocale } from "@/lib/locale";
import {
  pathnameWithoutLocale,
  withLocalePrefix,
} from "@/lib/locale-path";
import { getLocaleUiCopy } from "@/lib/locale-ui-copy";
import {
  persistPreferred,
  useLocale,
} from "@/components/shared/LocaleProvider";
import { getChromeCopy } from "@/components/marketing/shared/chrome-copy";
import { cn } from "@/lib/utils";

const listClass = "flex w-max flex-col gap-[6px] px-[6px] py-[20px]";

function LanguageOption({
  item,
  selected,
  hint,
  onSelect,
}: {
  item: SiteLanguage;
  selected: boolean;
  hint: string;
  onSelect: (code: TargetLocale) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item.code)}
      className={cn(
        "block w-full whitespace-nowrap rounded-[20px] px-[28px] py-[8px] text-left text-[14px] leading-none text-slate-800 transition-colors hover:bg-[#EEF6FE]",
        selected && "rounded-lg bg-[#4AABF0]/10 font-medium text-[#4AABF0]",
      )}
    >
      <span dir="auto">{item.nativeLabel}</span>
      {item.consoleOnly ? (
        <span
          className="mt-1 block text-[11px] font-normal leading-snug text-slate-500"
          dir="auto"
        >
          {hint}
        </span>
      ) : null}
    </button>
  );
}

export function MarketingLanguageSwitcher({
  className,
  /** When false (Console), only persist Preferred Locale — do not navigate to Marketing prefixes. */
  navigateOnSelect = true,
}: {
  className?: string;
  navigateOnSelect?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { locale, preferredLocale, setPreferredLocale } = useLocale();
  const chrome = getChromeCopy(locale);
  const uiCopy = getLocaleUiCopy(preferredLocale);
  const selected = preferredLocale || locale;

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

  function handleSelect(code: TargetLocale) {
    setPreferredLocale(code);
    persistPreferred(code);
    setOpen(false);

    if (!navigateOnSelect) return;

    const bare = pathnameWithoutLocale(pathname);
    const next = isTranslatedLocale(code)
      ? withLocalePrefix(bare, code)
      : withLocalePrefix(bare, locale);
    if (next !== pathname) {
      router.push(next);
    }
  }

  return (
    <div className={cn("relative", className)} ref={rootRef}>
      <button
        type="button"
        aria-label={chrome.switchLanguage}
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
          <div
            className={listClass}
            role="listbox"
            aria-label={chrome.languageList}
          >
            {SITE_LANGUAGES.map((item) => (
              <LanguageOption
                key={item.code}
                item={item}
                selected={selected === item.code}
                hint={uiCopy.consoleLocaleSwitcherHint}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** @deprecated import SITE_LANGUAGES from @/lib/languages */
export { SITE_LANGUAGES as MARKETING_LANGUAGES } from "@/lib/languages";
