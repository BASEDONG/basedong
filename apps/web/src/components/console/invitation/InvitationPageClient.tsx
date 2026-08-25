"use client";

import { useState } from "react";
import { ConsoleShell } from "../shared/ConsoleShell";
import { pageTitle } from "./content";
import { InvitationRecordsTable } from "./InvitationRecordsTable";
import { InvitationUpgradeAlert } from "./InvitationUpgradeAlert";

export function InvitationPageClient() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="invitation"
      title={pageTitle}
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
