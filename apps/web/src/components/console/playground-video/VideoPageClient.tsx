"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { ConsoleShell } from "../shared/ConsoleShell";
import { getPlaygroundUiCopy } from "../shared/playground-ui-copy";
import {
  pickPlaygroundModel,
  usePlaygroundModelQuery,
} from "../shared/usePlaygroundModelQuery";
import { DEFAULT_MODEL, MODEL_OPTIONS } from "./content";
import { VideoConfigPanel } from "./VideoConfigPanel";
import { VideoWorkspace } from "./VideoWorkspace";

function VideoPageInner() {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getPlaygroundUiCopy(targetLocale), [targetLocale]);
  const urlModel = usePlaygroundModelQuery();
  const [collapsed, setCollapsed] = useState(false);
  const [model, setModel] = useState<string>(DEFAULT_MODEL);

  useEffect(() => {
    setModel(pickPlaygroundModel(MODEL_OPTIONS, urlModel, DEFAULT_MODEL));
  }, [urlModel]);

  const modelOptions = useMemo(() => {
    if (model && !(MODEL_OPTIONS as readonly string[]).includes(model)) {
      return [model, ...MODEL_OPTIONS];
    }
    return [...MODEL_OPTIONS];
  }, [model]);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="video"
      title={copy.pageTitles.video}
    >
      <div className="relative flex h-full">
        <VideoConfigPanel
          copy={copy}
          model={model}
          modelOptions={modelOptions}
          onModelChange={setModel}
        />
        <div
          className="h-hull my-[8px] mr-5 w-[1px] min-w-[1px] shrink-0 bg-[linear-gradient(rgb(252,252,252),rgb(230,230,230),rgb(252,252,252))]"
          aria-hidden
        />
        <VideoWorkspace copy={copy} model={model} />
      </div>
    </ConsoleShell>
  );
}

export function VideoPageClient() {
  return (
    <Suspense fallback={null}>
      <VideoPageInner />
    </Suspense>
  );
}
