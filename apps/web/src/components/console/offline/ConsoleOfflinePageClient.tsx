"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { ConsoleShell } from "../shared/ConsoleShell";
import { getConsoleOfflineUiCopy } from "./offline-ui-copy";

export function ConsoleOfflinePageClient() {
  const { targetLocale } = useLocale();
  const copy = useMemo(
    () => getConsoleOfflineUiCopy(targetLocale),
    [targetLocale],
  );
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      title={copy.pageTitle}
      mainClassName="z-50 flex min-h-0 flex-1 flex-col items-center justify-center px-5 pb-10 pt-6"
    >
      <div className="max-w-lg text-center">
        <h1 className="text-xl font-semibold text-slate-800">{copy.heading}</h1>
        <p className="mt-3 text-[14px] leading-relaxed text-slate-500">
          {copy.body}
        </p>
        <Link
          href={copy.ctaHref}
          className="mt-8 inline-flex h-10 items-center justify-center rounded-[8px] bg-[#4AABF0] px-5 text-[13px] font-semibold text-white transition hover:bg-[#3A9BD8]"
        >
          {copy.ctaLabel}
        </Link>
      </div>
    </ConsoleShell>
  );
}
