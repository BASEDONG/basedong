"use client";

import { useState } from "react";
import { ConsoleShell } from "../shared/ConsoleShell";
import { BenefitsSection } from "./BenefitsSection";
import { navActiveKey, pageTitle } from "./content";
import { InvitePanel } from "./InvitePanel";
import { InviteRecords } from "./InviteRecords";
import { InviterHero } from "./InviterHero";
import { RulesSection } from "./RulesSection";
import { StepsSection } from "./StepsSection";

export function InviterPageClient() {
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
      <div className="w-full pb-10">
        <InviterHero />
        <BenefitsSection />
        <StepsSection />
        <InvitePanel />
        <InviteRecords />
        <RulesSection />
      </div>
    </ConsoleShell>
  );
}
