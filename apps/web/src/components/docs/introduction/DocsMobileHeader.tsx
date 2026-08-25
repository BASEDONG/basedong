"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  MenuIcon,
  SearchIcon,
  XIcon,
} from "@/components/docs/shared/icons";

import { logoHref, logoSrc, pageMeta } from "./content";
import { DocsSidebar } from "./DocsSidebar";

export function DocsMobileHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        id="nd-subnav"
        className="fixed inset-x-0 top-0 z-30 flex h-14 items-center border-b border-[#9e9e9e]/20 bg-white/80 px-4 backdrop-blur-[8px] md:hidden"
      >
        <a
          href={logoHref}
          className="inline-flex items-center gap-2.5 font-semibold"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={logoSrc}
            alt="八色鸫 basedong"
            width={140}
            height={30}
            className="h-[30px] w-auto"
          />
        </a>
        <div className="flex-1" />
        <button
          type="button"
          aria-label="Open Search"
          className="inline-flex size-9 items-center justify-center rounded-md text-sm text-[#0a0a0a] transition-colors hover:bg-[#e6e6e6]"
        >
          <SearchIcon className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Open Sidebar"
          onClick={() => setOpen(true)}
          className="inline-flex size-9 items-center justify-center rounded-md text-sm text-[#0a0a0a] transition-colors hover:bg-[#e6e6e6]"
        >
          <MenuIcon className="size-5" />
        </button>
      </header>

      <header
        id="nd-tocnav"
        className="fixed inset-x-0 top-14 z-10 border-b border-[#9e9e9e]/20 bg-white/80 px-4 py-2 text-sm text-[#737373] backdrop-blur-[8px] md:top-0 md:start-[var(--fd-sidebar-width,268px)] xl:hidden"
      >
        <span className="font-medium text-[#0a0a0a]">{pageMeta.title}</span>
        <span className="mx-2 text-[#9e9e9e]">·</span>
        <span>概述</span>
      </header>

      {open ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            aria-label="Close overlay"
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 start-0 flex w-[min(100vw,320px)] flex-col bg-white shadow-xl">
            <div className="flex h-14 items-center justify-end border-b border-[#9e9e9e]/20 px-3">
              <button
                type="button"
                aria-label="Close Sidebar"
                onClick={() => setOpen(false)}
                className="inline-flex size-9 items-center justify-center rounded-md hover:bg-[#e6e6e6]"
              >
                <XIcon className="size-5" />
              </button>
            </div>
            <DocsSidebar className="min-h-0 flex-1" onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}
