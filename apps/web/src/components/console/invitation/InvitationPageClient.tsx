"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { ConsoleShell } from "../shared/ConsoleShell";
import { getInvitationUiCopy } from "./invitation-ui-copy";
import { InvitationRecordsTable } from "./InvitationRecordsTable";
import { InvitationUpgradeAlert } from "./InvitationUpgradeAlert";

export function InvitationPageClient() {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getInvitationUiCopy(targetLocale), [targetLocale]);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="invitation"
      title={copy.pageTitle}
      notificationCount={0}
      textTone="black"
    >
      <InvitationUpgradeAlert />
      <div className="mt-3">
        <InvitationRecordsTable />
      </div>
    </ConsoleShell>
  );
}
