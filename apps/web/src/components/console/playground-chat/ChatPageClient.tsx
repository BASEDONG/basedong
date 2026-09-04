"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getUserGroups, getUserModels } from "@/lib/backend/client";
import { ConsoleShell } from "../shared/ConsoleShell";
import { getPlaygroundUiCopy } from "../shared/playground-ui-copy";
import {
  pickPlaygroundModel,
  usePlaygroundModelQuery,
} from "../shared/usePlaygroundModelQuery";
import { ChatConfigPanel } from "./ChatConfigPanel";
import { ChatWorkspace } from "./ChatWorkspace";
import { defaultParamValues, type ParamValues } from "./content";

function ChatPageInner() {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getPlaygroundUiCopy(targetLocale), [targetLocale]);
  const urlModel = usePlaygroundModelQuery();
  const [collapsed, setCollapsed] = useState(false);
  const [model, setModel] = useState(urlModel ?? "");
  const [modelOptions, setModelOptions] = useState<string[]>([]);
  const [group, setGroup] = useState("");
  const [groupOptions, setGroupOptions] = useState<string[]>([]);
  const [params, setParams] = useState<ParamValues>(() => defaultParamValues());

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const [models, groups] = await Promise.all([
          getUserModels(),
          getUserGroups(),
        ]);
        if (cancelled) return;
        setModelOptions(models);
        setModel((prev) =>
          pickPlaygroundModel(
            models,
            urlModel ?? (prev || null),
            models[0] ?? "",
          ),
        );
        setGroupOptions(groups);
        setGroup((prev) => {
          if (prev && groups.includes(prev)) return prev;
          if (groups.includes("default")) return "default";
          return groups[0] ?? "default";
        });
      } catch {
        if (!cancelled) {
          setModelOptions([]);
          setModel(urlModel ?? "");
          setGroupOptions([]);
          setGroup("default");
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
      mainClassName="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pt-2 pb-2.5"
    >
      <div className="flex h-full min-h-0 flex-1 gap-3">
        <ChatConfigPanel
          copy={copy}
          model={model}
          modelOptions={modelOptions}
          onModelChange={setModel}
          group={group}
          groupOptions={groupOptions}
          onGroupChange={setGroup}
          params={params}
          onParamsChange={setParams}
        />
        <div
          className="my-2 w-px shrink-0 bg-[linear-gradient(rgb(252,252,252),rgb(230,230,230),rgb(252,252,252))]"
          aria-hidden
        />
        <ChatWorkspace
          copy={copy}
          model={model}
          group={group}
          params={params}
        />
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
