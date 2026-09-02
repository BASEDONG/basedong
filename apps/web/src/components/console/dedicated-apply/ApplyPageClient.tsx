"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { ConsoleShell } from "../shared/ConsoleShell";
import { ApplyHero } from "./ApplyHero";
import { AudienceGrid } from "./AudienceGrid";
import { BetaApplyPanel } from "./BetaApplyPanel";
import { navActiveKey } from "./content";
import { getDedicatedApplyUiCopy } from "./dedicated-apply-ui-copy";
import { GettingStarted } from "./GettingStarted";
import { ProductCapabilities } from "./ProductCapabilities";
import { ProductIntro } from "./ProductIntro";

export function ApplyPageClient() {
  const { targetLocale } = useLocale();
  const copy = useMemo(
    () => getDedicatedApplyUiCopy(targetLocale),
    [targetLocale],
  );
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey={navActiveKey}
      title={copy.pageTitle}
      mainClassName="z-50 overflow-y-auto px-5 pb-2.5 pt-2"
    >
      <div className="mx-auto flex w-[1060px] flex-col gap-8 pb-10 text-[#1e293b]">
        <ApplyHero />
        <ProductIntro />
        <BetaApplyPanel />
        <AudienceGrid />
        <GettingStarted />
        <ProductCapabilities />
      </div>
    </ConsoleShell>
  );
}
