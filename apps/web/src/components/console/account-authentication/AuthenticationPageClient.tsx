"use client";

import { useState } from "react";
import { ConsoleShell } from "../shared/ConsoleShell";
import { AuthStatusCard } from "./AuthStatusCard";
import { AuthSuccessAlert } from "./AuthSuccessAlert";
import { pageTitle } from "./content";

export function AuthenticationPageClient() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="auth"
      title={pageTitle}
      notificationCount={0}
      textTone="black"
    >
      <AuthSuccessAlert />
      <AuthStatusCard />
    </ConsoleShell>
  );
}
