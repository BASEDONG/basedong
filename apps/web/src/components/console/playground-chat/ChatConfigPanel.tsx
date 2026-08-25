"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  MODEL_OPTIONS,
  PARAM_DEFS,
  defaultParamValues,
  type ParamValues,
} from "./content";
import { ChevronDownIcon, CompareModelsIcon, InfoCircleIcon } from "./icons";
import { ParamSliderField } from "./ParamSliderField";
import { AnimatedDropdown } from "./AnimatedDropdown";

interface ChatConfigPanelProps {
  model: string;
  onModelChange: (model: string) => void;
}

const selectClass =
  "flex h-8 w-full cursor-pointer items-center justify-between truncate rounded-[6px] border border-slate-300 bg-white/60 px-[11px] text-left text-sm leading-[22px] text-slate-800 transition-all duration-200 sf-chat-ease-ant hover:border-[rgb(74,171,240)]";

export function ChatConfigPanel({ model, onModelChange }: ChatConfigPanelProps) {
  const [params, setParams] = useState<ParamValues>(defaultParamValues);
  const [thinking, setThinking] = useState<"关闭" | "开启">("关闭");
  const [modelOpen, setModelOpen] = useState(false);
  const [thinkingOpen, setThinkingOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modelOpen && !thinkingOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setModelOpen(false);
        setThinkingOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [modelOpen, thinkingOpen]);

  return (
    <div
      ref={rootRef}
      className="flex h-full min-w-[262px] max-w-[262px] flex-col gap-6 overflow-x-hidden overflow-y-auto pr-2 pl-0"
    >
      <div className="flex flex-col gap-3">
        <div className="grid w-full gap-1">
          <div className="text-sm leading-5 text-slate-700">Model</div>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setModelOpen((v) => !v);
                setThinkingOpen(false);
              }}
              className={cn(
                selectClass,
                modelOpen &&
                  "border-[rgb(74,171,240)] shadow-[0_0_0_2px_rgba(74,171,240,0.1)]",
              )}
            >
              <span className="truncate">{model}</span>
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
              {MODEL_OPTIONS.map((opt) => (
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

        <div className="model-form">
          {PARAM_DEFS.map((def) => (
            <ParamSliderField
              key={def.key}
              def={def}
              value={params[def.key]}
              onChange={(value) =>
                setParams((prev) => ({ ...prev, [def.key]: value }))
              }
            />
          ))}

          <div className="mb-6 h-14">
            <div className="flex h-6 w-full items-center">
              <div className="flex gap-1">
                <span className="truncate text-sm leading-[22px] text-slate-700">
                  Enable Thinking
                </span>
                <InfoCircleIcon className="relative top-[-4px] left-[-2px] size-3 cursor-pointer text-xs text-slate-400" />
              </div>
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setThinkingOpen((v) => !v);
                  setModelOpen(false);
                }}
                className={cn(
                  selectClass,
                  thinkingOpen &&
                    "border-[rgb(74,171,240)] shadow-[0_0_0_2px_rgba(74,171,240,0.1)]",
                )}
              >
                <span>{thinking}</span>
                <ChevronDownIcon
                  className={cn(
                    "size-3 text-slate-400 transition-transform duration-200 sf-chat-ease-ant",
                    thinkingOpen && "rotate-180",
                  )}
                />
              </button>
              <AnimatedDropdown
                open={thinkingOpen}
                className="absolute z-20 mt-1 w-full overflow-hidden rounded-[6px] border border-slate-200 bg-white py-1 shadow-md"
              >
                {(["关闭", "开启"] as const).map((opt) => (
                  <li key={opt}>
                    <button
                      type="button"
                      className={cn(
                        "flex w-full px-3 py-1.5 text-left text-sm transition-colors duration-150 sf-chat-ease-out hover:bg-slate-50",
                        opt === thinking &&
                          "bg-[var(--sf-cloud-primary-10)] text-[rgb(74,171,240)]",
                      )}
                      onClick={() => {
                        setThinking(opt);
                        setThinkingOpen(false);
                      }}
                    >
                      {opt}
                    </button>
                  </li>
                ))}
              </AnimatedDropdown>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className="inline-flex h-8 w-[140px] items-center justify-center gap-2 rounded-[6px] border border-transparent bg-[#f3e8ff] px-[15px] text-sm leading-[21px] text-[#6b21a8] shadow-[0_2px_0_0_rgba(74,171,240,0.06)] transition-all duration-200 sf-chat-ease-ant hover:opacity-90 active:opacity-80"
        >
          <CompareModelsIcon />
          添加对比模型
        </button>
      </div>
    </div>
  );
}
