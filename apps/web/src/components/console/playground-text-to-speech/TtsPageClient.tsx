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
import { TtsConfigPanel } from "./TtsConfigPanel";
import { TtsWorkspace } from "./TtsWorkspace";

function TtsPageInner() {
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
      activeKey="tts"
      title={copy.pageTitles.tts}
    >
      <div className="relative flex h-full">
        <TtsConfigPanel
          copy={copy}
          model={model}
          modelOptions={modelOptions}
          onModelChange={setModel}
        />
        <div
          className="my-2 mr-5 w-px min-w-px shrink-0 bg-[linear-gradient(rgb(252,252,252),rgb(230,230,230),rgb(252,252,252))]"
          aria-hidden
        />
        <TtsWorkspace copy={copy} model={model} />
      </div>
    </ConsoleShell>
  );
}

export function TtsPageClient() {
  return (
    <Suspense fallback={null}>
      <TtsPageInner />
    </Suspense>
  );
}
