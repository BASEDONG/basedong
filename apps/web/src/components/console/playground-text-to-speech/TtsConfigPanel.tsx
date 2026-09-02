"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  CaretDownIcon,
  CaretUpIcon,
} from "../playground-chat/icons";
import type { PlaygroundUiCopy } from "../shared/playground-ui-copy";
import { GAIN, MODEL_OPTIONS, SPEED, VOICE_OPTIONS } from "./content";
import { ChevronDownIcon, SearchIcon } from "./icons";

interface TtsConfigPanelProps {
  copy: PlaygroundUiCopy;
  model: string;
  modelOptions?: readonly string[];
  onModelChange: (model: string) => void;
}

const modelSelectClass =
  "relative flex h-8 w-full items-center rounded-[6px] border border-slate-300 bg-white/60 px-[11px] text-left text-sm leading-[30px] text-slate-800 transition-all duration-200 sf-chat-ease-ant hover:border-[rgb(74,171,240)]";

const voiceSelectClass =
  "flex h-8 w-full cursor-pointer items-center justify-between truncate rounded-[6px] border border-slate-300 bg-white px-[11px] text-left text-sm leading-[30px] text-slate-800 transition-all duration-200 sf-chat-ease-ant hover:border-[rgb(74,171,240)]";

function snap(value: number, min: number, max: number, step: number) {
  const clamped = Math.min(max, Math.max(min, value));
  const steps = Math.round((clamped - min) / step);
  const next = min + steps * step;
  const precision = String(step).includes(".")
    ? (String(step).split(".")[1]?.length ?? 0)
    : 0;
  return Number(next.toFixed(precision));
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const display = value.toFixed(1);
  const pct = ((value - min) / (max - min)) * 100;
  const atMin = value <= min;
  const atMax = value >= max;

  const bump = (dir: 1 | -1) => {
    onChange(snap(value + dir * step, min, max, step));
  };

  return (
    <div className="mb-3 h-[66px]">
      <div className="flex h-8 w-full items-center justify-between">
        <div className="flex gap-1">
          <span className="max-w-[120px] truncate text-sm text-slate-700">
            {label}
          </span>
        </div>
        <div className="group relative mb-0 h-8 w-[90px] rounded-[6px] border border-slate-300 bg-white/50 transition-all duration-200 ease hover:border-[rgb(74,171,240)]">
          <input
            type="text"
            inputMode="decimal"
            value={display}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            onChange={(e) => {
              const raw = e.target.value.trim();
              if (raw === "" || raw === "-" || raw === ".") return;
              const next = Number(raw);
              if (Number.isNaN(next)) return;
              onChange(snap(next, min, max, step));
            }}
            className="h-[30px] w-[88px] rounded-[6px] border-0 bg-transparent px-[11px] py-1 text-sm leading-[22px] text-slate-800 outline-none"
          />
          <div className="absolute top-0 right-0 flex h-[30px] w-0 flex-col overflow-hidden rounded-r-[6px] bg-white opacity-0 transition-all duration-200 ease group-hover:w-[22px] group-hover:opacity-100">
            <button
              type="button"
              aria-label="Increase Value"
              disabled={atMax}
              onClick={() => bump(1)}
              className="flex h-[15px] flex-1 items-center justify-center text-slate-500 transition-colors duration-150 hover:text-slate-800 disabled:opacity-40"
            >
              <CaretUpIcon />
            </button>
            <button
              type="button"
              aria-label="Decrease Value"
              disabled={atMin}
              onClick={() => bump(-1)}
              className="flex h-[15px] flex-1 items-center justify-center text-slate-500 transition-colors duration-150 hover:text-slate-800 disabled:opacity-40"
            >
              <CaretDownIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="relative mx-[5px] h-8 cursor-pointer">
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-r-[10px] bg-[#f8fafc]" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-l-[10px] bg-[rgb(74,171,240)]"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={label}
          onChange={(e) =>
            onChange(snap(Number(e.target.value), min, max, step))
          }
          className="sf-chat-slider absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
        />
      </div>
    </div>
  );
}

export function TtsConfigPanel({
  copy,
  model,
  modelOptions = MODEL_OPTIONS,
  onModelChange,
}: TtsConfigPanelProps) {
  const [modelOpen, setModelOpen] = useState(false);
  const [modelQuery, setModelQuery] = useState("");
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [voice, setVoice] =
    useState<(typeof VOICE_OPTIONS)[number]>("alex");
  const [speed, setSpeed] = useState<number>(SPEED.default);
  const [gain, setGain] = useState<number>(GAIN.default);
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredModels = modelOptions.filter((opt) =>
    opt.toLowerCase().includes(modelQuery.trim().toLowerCase()),
  );

  useEffect(() => {
    if (!modelOpen && !voiceOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setModelOpen(false);
        setVoiceOpen(false);
        setModelQuery("");
      }
    };
    document.addEventListener("mousedown", onDoc);
    if (modelOpen) queueMicrotask(() => searchRef.current?.focus());
    return () => document.removeEventListener("mousedown", onDoc);
  }, [modelOpen, voiceOpen]);

  const openModel = () => {
    setVoiceOpen(false);
    if (!modelOpen) {
      setModelOpen(true);
      setModelQuery("");
    }
    queueMicrotask(() => searchRef.current?.focus());
  };

  return (
    <div
      ref={rootRef}
      className="flex h-full w-[300px] min-w-[300px] flex-col gap-6 overflow-visible pr-5"
    >
      <div className="grid w-full gap-1">
        <div className="text-sm leading-5 text-slate-700">Model</div>
        <div className="relative max-w-full">
          <div
            role="combobox"
            aria-expanded={modelOpen}
            aria-haspopup="listbox"
            className={cn(
              modelSelectClass,
              "cursor-text",
              modelOpen &&
                "border-[rgb(74,171,240)] shadow-[0_0_0_2px_rgba(74,171,240,0.06)]",
            )}
            onClick={openModel}
          >
            <div className="relative min-w-0 flex-1 overflow-hidden pr-[18px]">
              <span
                className={cn(
                  "pointer-events-none block truncate leading-[30px]",
                  modelQuery && "opacity-0",
                )}
              >
                {model}
              </span>
              <input
                ref={searchRef}
                value={modelQuery}
                onChange={(e) => {
                  setModelQuery(e.target.value);
                  if (!modelOpen) setModelOpen(true);
                }}
                onMouseDown={() => {
                  if (!modelOpen) {
                    setModelOpen(true);
                    setVoiceOpen(false);
                    setModelQuery("");
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setModelOpen(false);
                    setModelQuery("");
                  }
                  if (e.key === "Enter" && filteredModels[0]) {
                    onModelChange(filteredModels[0]);
                    setModelOpen(false);
                    setModelQuery("");
                  }
                }}
                className="absolute inset-0 h-full w-full border-0 bg-transparent text-sm leading-[30px] text-slate-800 outline-none"
                aria-autocomplete="list"
                aria-controls="tts-model-listbox"
                autoComplete="off"
              />
            </div>
            <SearchIcon className="pointer-events-none absolute top-1/2 right-[11px] size-3 -translate-y-1/2 text-slate-400" />
          </div>

          {modelOpen ? (
            <div
              id="tts-model-listbox"
              className="sf-chat-dropdown-enter absolute z-30 mt-1 w-full overflow-hidden rounded-[8px] bg-white p-1 shadow-[0_6px_16px_0_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]"
              role="listbox"
            >
              <ul className="max-h-64 overflow-auto">
                {filteredModels.map((opt) => (
                  <li key={opt}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={opt === model}
                      title={opt}
                      className={cn(
                        "flex min-h-8 w-full items-center overflow-hidden px-3 py-[5px] text-left text-sm leading-[22px] text-slate-800 transition-colors duration-150 sf-chat-ease-out hover:bg-[#EEF6FE]",
                        opt === model && "bg-[#EEF6FE]",
                      )}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        onModelChange(opt);
                        setModelOpen(false);
                        setModelQuery("");
                      }}
                    >
                      <span className="truncate">{opt}</span>
                    </button>
                  </li>
                ))}
                {filteredModels.length === 0 ? (
                  <li className="px-3 py-2 text-sm text-slate-400">
                    {copy.noData}
                  </li>
                ) : null}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <form className="w-full" onSubmit={(e) => e.preventDefault()}>
        <SliderField
          label={copy.speed}
          value={speed}
          min={SPEED.min}
          max={SPEED.max}
          step={SPEED.step}
          onChange={setSpeed}
        />
        <SliderField
          label={copy.gain}
          value={gain}
          min={GAIN.min}
          max={GAIN.max}
          step={GAIN.step}
          onChange={setGain}
        />

        <div className="mb-3">
          <div className="mb-1 text-sm leading-[22px] text-slate-700">音色</div>
          <div className="relative max-w-full">
            <button
              type="button"
              onClick={() => {
                setVoiceOpen((v) => !v);
                setModelOpen(false);
                setModelQuery("");
              }}
              className={cn(
                voiceSelectClass,
                voiceOpen &&
                  "border-[rgb(74,171,240)] shadow-[0_0_0_2px_rgba(74,171,240,0.06)]",
              )}
            >
              <span className="truncate">{voice}</span>
              <ChevronDownIcon
                className={cn(
                  "ml-2 size-3 shrink-0 text-slate-400 transition-transform duration-200 sf-chat-ease-ant",
                  voiceOpen && "rotate-180",
                )}
              />
            </button>
            {voiceOpen ? (
              <ul className="sf-chat-dropdown-enter absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-[8px] bg-white p-1 shadow-[0_6px_16px_0_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]">
                {VOICE_OPTIONS.map((opt) => (
                  <li key={opt}>
                    <button
                      type="button"
                      className={cn(
                        "flex min-h-8 w-full items-center px-3 py-[5px] text-left text-sm leading-[22px] text-slate-800 transition-colors duration-150 sf-chat-ease-out hover:bg-[#EEF6FE]",
                        opt === voice && "bg-[#EEF6FE]",
                      )}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setVoice(opt);
                        setVoiceOpen(false);
                      }}
                    >
                      {opt}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
}
