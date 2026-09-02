"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { ConsoleShell } from "../shared/ConsoleShell";
import { AuthStatusCard } from "./AuthStatusCard";
import { AuthSuccessAlert } from "./AuthSuccessAlert";
import { getAuthUiCopy } from "./account-authentication-ui-copy";

export function AuthenticationPageClient() {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getAuthUiCopy(targetLocale), [targetLocale]);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="auth"
      title={copy.pageTitle}
      notificationCount={0}
      textTone="black"
    >
      <AuthSuccessAlert copy={copy} />
      <AuthStatusCard copy={copy} />
    </ConsoleShell>
  );
}
