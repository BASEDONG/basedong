"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { ConsoleShell } from "../shared/ConsoleShell";
import { navActiveKey } from "./content";
import { getCampaignsRealNameUiCopy } from "./campaigns-real-name-ui-copy";
import { HeroBanner } from "./HeroBanner";
import { RulesSection } from "./RulesSection";
import { StepCards } from "./StepCards";

export function RealNamePageClient() {
  const { targetLocale } = useLocale();
  const copy = useMemo(
    () => getCampaignsRealNameUiCopy(targetLocale),
    [targetLocale],
  );
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey={navActiveKey}
      title={copy.pageTitle}
      textTone="black"
      mainClassName="z-50 overflow-y-auto px-5 pb-2.5 pt-2"
    >
      <div className="w-full pb-10 font-[ui-sans-serif,system-ui,sans-serif]">
        <HeroBanner />
        <StepCards />
        <RulesSection />
      </div>
    </ConsoleShell>
  );
}
