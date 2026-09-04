"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { PlaygroundUiCopy } from "../shared/playground-ui-copy";
import { PARAM_DEFS, type ParamDef, type ParamValues } from "./content";
import { ChevronDownIcon } from "./icons";
import { ParamSliderField } from "./ParamSliderField";
import { AnimatedDropdown } from "./AnimatedDropdown";

interface ChatConfigPanelProps {
  copy: PlaygroundUiCopy;
  model: string;
  modelOptions: string[];
  onModelChange: (model: string) => void;
  group: string;
  groupOptions: string[];
  onGroupChange: (group: string) => void;
  params: ParamValues;
  onParamsChange: (params: ParamValues) => void;
}

function paramLabel(copy: PlaygroundUiCopy, key: ParamDef["key"]): string {
  switch (key) {
    case "maxTokens":
      return copy.paramMaxTokens;
    case "temperature":
      return copy.paramTemperature;
    case "topP":
      return copy.paramTopP;
    case "topK":
      return copy.paramTopK;
    case "frequencyPenalty":
      return copy.paramFrequencyPenalty;
  }
}

const selectClass =
  "flex h-8 w-full cursor-pointer items-center justify-between truncate rounded-[6px] border border-slate-300 bg-white/60 px-[11px] text-left text-sm leading-[22px] text-slate-800 transition-all duration-200 sf-chat-ease-ant hover:border-[rgb(74,171,240)]";

export function ChatConfigPanel({
  copy,
  model,
  modelOptions,
  onModelChange,
  group,
  groupOptions,
  onGroupChange,
  params,
  onParamsChange,
}: ChatConfigPanelProps) {
  const [modelOpen, setModelOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const options = modelOptions.length > 0 ? modelOptions : [];
  const groups = groupOptions.length > 0 ? groupOptions : ["default"];

  useEffect(() => {
    if (!modelOpen && !groupOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setModelOpen(false);
        setGroupOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [groupOpen, modelOpen]);

  return (
    <div
      ref={rootRef}
      className="flex h-full min-w-[262px] max-w-[262px] flex-col gap-6 overflow-x-hidden overflow-y-auto pr-2 pl-0"
    >
      <div className="flex flex-col gap-3">
        <div className="grid w-full gap-1">
          <div className="text-sm leading-5 text-slate-700">
            {copy.modelLabel}
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setGroupOpen(false);
                setModelOpen((v) => !v);
              }}
              className={cn(
                selectClass,
                modelOpen &&
                  "border-[rgb(74,171,240)] shadow-[0_0_0_2px_rgba(74,171,240,0.1)]",
              )}
            >
              <span className="truncate">
                {model ||
                  (options.length === 0 ? copy.noModels : copy.selectModel)}
              </span>
              <ChevronDownIcon
                className={cn(
                  "ml-2 size-3 shrink-0 text-slate-400 transition-transform duration-200 sf-chat-ease-ant",
                  modelOpen && "rotate-180",
                )}
              />
            </button>
            <AnimatedDropdown
              open={modelOpen}
              className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-[6px] border border-slate-200 bg-white py-1 shadow-md"
            >
              {options.length === 0 ? (
                <li className="px-3 py-1.5 text-sm text-slate-400">
                  {copy.configureChannel}
                </li>
              ) : null}
              {options.map((opt) => (
                <li key={opt}>
                  <button
                    type="button"
                    className={cn(
                      "flex w-full px-3 py-1.5 text-left text-sm transition-colors duration-150 sf-chat-ease-out hover:bg-slate-50",
                      opt === model &&
                        "bg-[var(--sf-cloud-primary-10)] text-[rgb(74,171,240)]",
                    )}
                    onClick={() => {
                      onModelChange(opt);
                      setModelOpen(false);
                    }}
                  >
                    {opt}
                  </button>
                </li>
              ))}
            </AnimatedDropdown>
          </div>
        </div>

        <div className="grid w-full gap-1">
          <div className="text-sm leading-5 text-slate-700">
            {copy.groupLabel ?? "Group"}
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setModelOpen(false);
                setGroupOpen((v) => !v);
              }}
              className={cn(
                selectClass,
                groupOpen &&
                  "border-[rgb(74,171,240)] shadow-[0_0_0_2px_rgba(74,171,240,0.1)]",
              )}
            >
              <span className="truncate">
                {group || (copy.selectGroup ?? "Select a group")}
              </span>
              <ChevronDownIcon
                className={cn(
                  "ml-2 size-3 shrink-0 text-slate-400 transition-transform duration-200 sf-chat-ease-ant",
                  groupOpen && "rotate-180",
                )}
              />
            </button>
            <AnimatedDropdown
              open={groupOpen}
              className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-[6px] border border-slate-200 bg-white py-1 shadow-md"
            >
              {groups.map((opt) => (
                <li key={opt}>
                  <button
                    type="button"
                    className={cn(
                      "flex w-full px-3 py-1.5 text-left text-sm transition-colors duration-150 sf-chat-ease-out hover:bg-slate-50",
                      opt === group &&
                        "bg-[var(--sf-cloud-primary-10)] text-[rgb(74,171,240)]",
                    )}
                    onClick={() => {
                      onGroupChange(opt);
                      setGroupOpen(false);
                    }}
                  >
                    {opt}
                  </button>
                </li>
              ))}
            </AnimatedDropdown>
          </div>
        </div>

        <div className="model-form">
          {PARAM_DEFS.map((def) => (
            <ParamSliderField
              key={def.key}
              def={def}
              label={paramLabel(copy, def.key)}
              value={params[def.key]}
              onChange={(value) =>
                onParamsChange({ ...params, [def.key]: value })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
