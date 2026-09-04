"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { ConsoleShell } from "../shared/ConsoleShell";
import { CONSOLE_PRIMARY_BTN } from "../shared/console-ui";
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
      mainClassName="flex min-h-0 flex-1 flex-col items-center justify-center px-5 pb-10 pt-6"
    >
      <div className="max-w-lg text-center">
        <p className="text-[14px] leading-relaxed text-slate-500">{copy.body}</p>
        <Link href={copy.ctaHref} className={`mt-8 ${CONSOLE_PRIMARY_BTN}`}>
          {copy.ctaLabel}
        </Link>
      </div>
    </ConsoleShell>
  );
}
