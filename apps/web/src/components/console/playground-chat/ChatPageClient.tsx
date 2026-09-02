"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { ConsoleShell } from "../shared/ConsoleShell";
import { getPlaygroundUiCopy } from "../shared/playground-ui-copy";
import {
  pickPlaygroundModel,
  usePlaygroundModelQuery,
} from "../shared/usePlaygroundModelQuery";
import { ChatConfigPanel } from "./ChatConfigPanel";
import { ChatWorkspace } from "./ChatWorkspace";
import { getUserModels } from "@/lib/backend/client";

function ChatPageInner() {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getPlaygroundUiCopy(targetLocale), [targetLocale]);
  const urlModel = usePlaygroundModelQuery();
  const [collapsed, setCollapsed] = useState(false);
  const [model, setModel] = useState(urlModel ?? "");
  const [modelOptions, setModelOptions] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const models = await getUserModels();
        if (cancelled) return;
        setModelOptions(models);
        setModel((prev) =>
          pickPlaygroundModel(
            models,
            urlModel ?? (prev || null),
            models[0] ?? "",
          ),
        );
      } catch {
        if (!cancelled) {
          setModelOptions([]);
          setModel(urlModel ?? "");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [urlModel]);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="chat"
      title={copy.pageTitles.chat}
      mainClassName="z-50 flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pt-2 pb-2.5"
    >
      <div className="flex h-full min-h-0 flex-1 gap-3">
        <ChatConfigPanel
          copy={copy}
          model={model}
          modelOptions={modelOptions}
          onModelChange={setModel}
        />
        <div
          className="my-2 w-px shrink-0 bg-[linear-gradient(rgb(252,252,252),rgb(230,230,230),rgb(252,252,252))]"
          aria-hidden
        />
        <ChatWorkspace copy={copy} model={model} />
      </div>
    </ConsoleShell>
  );
}

export function ChatPageClient() {
  return (
    <Suspense fallback={null}>
      <ChatPageInner />
    </Suspense>
  );
}
