"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { ConsoleShell } from "../shared/ConsoleShell";
import { BenefitsSection } from "./BenefitsSection";
import { navActiveKey } from "./content";
import { getCampaignsInviterUiCopy } from "./campaigns-inviter-ui-copy";
import { InvitePanel } from "./InvitePanel";
import { InviteRecords } from "./InviteRecords";
import { InviterHero } from "./InviterHero";
import { RulesSection } from "./RulesSection";
import { StepsSection } from "./StepsSection";

export function InviterPageClient() {
  const { targetLocale } = useLocale();
  const copy = useMemo(
    () => getCampaignsInviterUiCopy(targetLocale),
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
