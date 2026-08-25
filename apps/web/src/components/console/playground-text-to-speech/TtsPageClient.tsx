"use client";

import { useState } from "react";
import { ConsoleShell } from "../shared/ConsoleShell";
import { DEFAULT_MODEL, pageTitle } from "./content";
import { TtsConfigPanel } from "./TtsConfigPanel";
import { TtsWorkspace } from "./TtsWorkspace";

export function TtsPageClient() {
  const [collapsed, setCollapsed] = useState(false);
  const [model, setModel] = useState<string>(DEFAULT_MODEL);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="tts"
      title={pageTitle}
    >
      <div className="relative flex h-full">
        <TtsConfigPanel model={model} onModelChange={setModel} />
        <div
          className="my-2 mr-5 w-px min-w-px shrink-0 bg-[linear-gradient(rgb(252,252,252),rgb(230,230,230),rgb(252,252,252))]"
          aria-hidden
        />
        <TtsWorkspace model={model} />
      </div>
    </ConsoleShell>
  );
}
