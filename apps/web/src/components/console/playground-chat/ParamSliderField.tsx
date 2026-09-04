"use client";

import { CaretDownIcon, CaretUpIcon } from "./icons";
import type { ParamDef } from "./content";

interface ParamSliderFieldProps {
  def: ParamDef;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

function snap(value: number, min: number, max: number, step: number) {
  const clamped = Math.min(max, Math.max(min, value));
  const steps = Math.round((clamped - min) / step);
  const next = min + steps * step;
  const precision = String(step).includes(".")
    ? (String(step).split(".")[1]?.length ?? 0)
    : 0;
  return Number(next.toFixed(precision));
}

export function ParamSliderField({
  def,
  label,
  value,
  onChange,
}: ParamSliderFieldProps) {
  const display = def.format ? def.format(value) : String(value);
  const pct = ((value - def.min) / (def.max - def.min)) * 100;
  const atMin = value <= def.min;
  const atMax = value >= def.max;

  const bump = (dir: 1 | -1) => {
    onChange(snap(value + dir * def.step, def.min, def.max, def.step));
  };

  return (
    <div className="mb-3 h-[66px]">
      <div className="flex h-8 w-full items-center justify-between">
        <span className="max-w-[120px] truncate text-sm text-slate-700">
          {label}
        </span>
        <div className="group relative mb-0 h-8 w-[90px] rounded-[6px] border border-slate-300 bg-white/50 transition-all duration-200 ease hover:border-[rgb(74,171,240)]">
          <input
            type="text"
            inputMode="decimal"
            value={display}
            aria-valuemin={def.min}
            aria-valuemax={def.max}
            aria-valuenow={value}
            onChange={(e) => {
              const raw = e.target.value.trim();
              if (raw === "" || raw === "-" || raw === ".") return;
              const next = Number(raw);
              if (Number.isNaN(next)) return;
              onChange(snap(next, def.min, def.max, def.step));
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
          min={def.min}
          max={def.max}
          step={def.step}
          value={value}
          onChange={(e) =>
            onChange(snap(Number(e.target.value), def.min, def.max, def.step))
          }
          className="sf-chat-slider absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
        />
      </div>
    </div>
  );
}
