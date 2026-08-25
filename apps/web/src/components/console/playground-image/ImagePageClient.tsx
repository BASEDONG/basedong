"use client";

import { useState } from "react";
import { ConsoleShell } from "../shared/ConsoleShell";
import { pageTitle } from "./content";
import { ImageConfigPanel } from "./ImageConfigPanel";
import { ImageWorkspace } from "./ImageWorkspace";

export function ImagePageClient() {
  const [collapsed, setCollapsed] = useState(false);
  const [model, setModel] = useState("Z-Image-Turbo");

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="image"
      title={pageTitle}
    >
      <div className="flex h-full">
        <ImageConfigPanel model={model} onModelChange={setModel} />
        <div
          className="my-2 mr-5 w-px min-w-px shrink-0 bg-[linear-gradient(rgb(252,252,252),rgb(230,230,230),rgb(252,252,252))]"
          aria-hidden
        />
        <ImageWorkspace model={model} />
      </div>
    </ConsoleShell>
  );
}
