"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDownIcon,
  GlobeIcon,
} from "@/components/auth/shared/icons";
import { COPY } from "./content";

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"CN" | "EN">("CN");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className="absolute right-6 top-6 z-10" ref={rootRef}>
      <button
        type="button"
        className="flex cursor-pointer items-center gap-0.5 text-[14px] leading-[21px] text-slate-500"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="flex items-center gap-2">
          <GlobeIcon className="size-3.5" />
          <span>{lang === "CN" ? COPY.lang : "EN"}</span>
        </span>
        <ChevronDownIcon className="size-3.5" />
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-2 min-w-[88px] overflow-hidden rounded-md border border-slate-200 bg-white py-1 text-[14px] text-slate-700 shadow-md"
        >
          {(["CN", "EN"] as const).map((option) => (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected={lang === option}
                className="block w-full px-3 py-1.5 text-left hover:bg-slate-50"
                onClick={() => {
                  setLang(option);
                  setOpen(false);
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
