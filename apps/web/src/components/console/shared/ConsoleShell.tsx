"use client";

import type { ReactNode, RefObject } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { CloudSidebar } from "../models/CloudSidebar";
import { CloudTopBar } from "../models/CloudTopBar";
import { CONSOLE_ASSET } from "./content";

export interface ConsoleShellProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  /** Nav item key for CloudSidebar highlight */
  activeKey?: string;
  title: string;
  notificationCount?: number;
  /** Root text color utility — defaults to slate-700 */
  textTone?: "slate" | "black";
  mainClassName?: string;
  mainRef?: RefObject<HTMLElement | null>;
  onMainScroll?: (scrollTop: number) => void;
  children: ReactNode;
  /** Drawers, FABs, etc. rendered inside the shell root */
  overlay?: ReactNode;
}

export function ConsoleShell({
  collapsed,
  onToggleCollapse,
  activeKey,
  title,
  notificationCount,
  textTone = "slate",
  mainClassName = "z-50 min-h-0 flex-1 overflow-y-auto px-5 pb-2.5 pt-2",
  mainRef,
  onMainScroll,
  children,
  overlay,
}: ConsoleShellProps) {
  const { isRtl } = useLocale();
  const textClass = textTone === "black" ? "text-black" : "text-slate-700";

  return (
    <div
      className={`sf-cloud-console relative flex h-dvh min-h-0 overflow-hidden bg-[#f2f5fa] ${textClass} ${isRtl ? "flex-row-reverse" : ""}`}
    >
      <div
        className="pointer-events-none fixed start-0 top-0 -z-10 h-[100vh] w-screen bg-no-repeat opacity-45"
        style={{
          backgroundImage: `url(${CONSOLE_ASSET.wallpaper0})`,
          backgroundPosition: "0% 0%",
          backgroundSize: "auto",
        }}
      />
      <div
        className="pointer-events-none fixed bottom-0 end-0 -z-10 h-[100vh] w-screen bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url(${CONSOLE_ASSET.wallpaper1})`,
          backgroundPosition: "100% 100%",
          backgroundSize: "auto",
        }}
      />

      <CloudSidebar collapsed={collapsed} activeKey={activeKey} />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden">
        <CloudTopBar
          title={title}
          notificationCount={notificationCount}
          collapsed={collapsed}
          onToggleCollapse={onToggleCollapse}
        />

        <main
          ref={mainRef}
          className={mainClassName}
          onScroll={
            onMainScroll
              ? (e) => onMainScroll(e.currentTarget.scrollTop)
              : undefined
          }
        >
          {children}
        </main>
      </div>

      {overlay}
    </div>
  );
}
