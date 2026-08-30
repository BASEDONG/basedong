"use client";

import { useEffect, useState } from "react";
import { ConsoleShell } from "../shared/ConsoleShell";
import { pageTitle } from "./content";
import { ChatConfigPanel } from "./ChatConfigPanel";
import { ChatWorkspace } from "./ChatWorkspace";
import { getUserModels } from "@/lib/backend/client";

export function ChatPageClient() {
  const [collapsed, setCollapsed] = useState(false);
  const [model, setModel] = useState("");
  const [modelOptions, setModelOptions] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const models = await getUserModels();
        if (cancelled) return;
        setModelOptions(models);
        setModel((prev) =>
          prev && models.includes(prev) ? prev : models[0] ?? "",
        );
      } catch {
        if (!cancelled) {
          setModelOptions([]);
          setModel("");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="chat"
      title={pageTitle}
      mainClassName="z-50 flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pt-2 pb-2.5"
    >
      <div className="flex h-full min-h-0 flex-1 gap-3">
        <ChatConfigPanel
          model={model}
          modelOptions={modelOptions}
          onModelChange={setModel}
        />
        <div
          className="my-2 w-px shrink-0 bg-[linear-gradient(rgb(252,252,252),rgb(230,230,230),rgb(252,252,252))]"
          aria-hidden
        />
        <ChatWorkspace model={model} />
      </div>
    </ConsoleShell>
  );
}
