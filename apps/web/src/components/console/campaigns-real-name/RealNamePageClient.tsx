"use client";

import { useState } from "react";
import { ConsoleShell } from "../shared/ConsoleShell";
import { navActiveKey, pageTitle } from "./content";
import { HeroBanner } from "./HeroBanner";
import { RulesSection } from "./RulesSection";
import { StepCards } from "./StepCards";

export function RealNamePageClient() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey={navActiveKey}
      title={pageTitle}
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
