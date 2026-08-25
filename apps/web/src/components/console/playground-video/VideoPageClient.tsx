"use client";

import { useState } from "react";
import { ConsoleShell } from "../shared/ConsoleShell";
import { DEFAULT_MODEL, pageTitle } from "./content";
import { VideoConfigPanel } from "./VideoConfigPanel";
import { VideoWorkspace } from "./VideoWorkspace";

export function VideoPageClient() {
  const [collapsed, setCollapsed] = useState(false);
  const [model, setModel] = useState<string>(DEFAULT_MODEL);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="video"
      title={pageTitle}
    >
      <div className="relative flex h-full">
        <VideoConfigPanel model={model} onModelChange={setModel} />
        <div
          className="h-hull my-[8px] mr-5 w-[1px] min-w-[1px] shrink-0 bg-[linear-gradient(rgb(252,252,252),rgb(230,230,230),rgb(252,252,252))]"
          aria-hidden
        />
        <VideoWorkspace model={model} />
      </div>
    </ConsoleShell>
  );
}
