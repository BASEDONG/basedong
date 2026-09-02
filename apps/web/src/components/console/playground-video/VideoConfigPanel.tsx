"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { PlaygroundUiCopy } from "../shared/playground-ui-copy";
import {
  ASSET,
  DEFAULT_NEGATIVE_PROMPT,
  DEFAULT_VIDEO_SIZE,
  MODEL_OPTIONS,
  VIDEO_SIZES,
  isI2VModel,
  randomSeed,
  type VideoSizeRatio,
} from "./content";
import { InfoCircleIcon, SyncIcon, UploadIcon } from "./icons";
import { ModelSelect } from "./ModelSelect";

interface VideoConfigPanelProps {
  copy: PlaygroundUiCopy;
  model: string;
  modelOptions?: readonly string[];
  onModelChange: (model: string) => void;
}

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      className={cn(
        "inline-flex w-full items-center",
        required &&
          "before:mr-1 before:inline-block before:font-[SimSun,sans-serif] before:text-sm before:leading-none before:text-[#ff4d4f] before:content-['*']",
      )}
    >
      <div className="flex w-full items-center justify-between pb-0.5">
        <div className="flex gap-1">
          <span className="truncate text-sm leading-[22px] text-slate-700">
            {children}
          </span>
          <InfoCircleIcon className="relative top-[-4px] left-[-2px] cursor-pointer text-xs text-slate-400" />
        </div>
      </div>
    </label>
  );
}

export function VideoConfigPanel({
  copy,
  model,
  modelOptions = MODEL_OPTIONS,
  onModelChange,
}: VideoConfigPanelProps) {
  const [size, setSize] = useState<VideoSizeRatio>(DEFAULT_VIDEO_SIZE);
  const [seed, setSeed] = useState<string>("");
  const [negative, setNegative] = useState(DEFAULT_NEGATIVE_PROMPT);
  const [imageName, setImageName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const showUpload = isI2VModel(model);

  return (
    <div className="flex h-full w-[262px] min-w-[262px] flex-col gap-3 overflow-x-hidden pr-5 pl-2">
      <div className="grid w-full gap-1">
        <div className="text-sm leading-5 text-slate-700">Model</div>
        <ModelSelect
          value={model}
          options={modelOptions}
          onChange={onModelChange}
          emptyText={copy.noData}
        />
      </div>

      <div className="model-form">
        {showUpload ? (
          <div className="mb-3">
            <FieldLabel required>Upload Image</FieldLabel>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setImageName(file?.name ?? null);
              }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex h-8 w-full cursor-pointer items-center justify-center gap-2 rounded-[6px] border border-slate-300 bg-white px-[15px] text-sm leading-[22px] text-slate-800 shadow-[0_2px_0_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-[rgb(74,171,240)]"
            >
              <UploadIcon />
              <span className="truncate">{imageName ?? copy.addImage}</span>
            </button>
          </div>
        ) : (
          <div className="mb-3">
            <FieldLabel>Video Size</FieldLabel>
            <div className="flex max-w-full">
              {VIDEO_SIZES.map(({ ratio }, index) => {
                const checked = size === ratio;
                const isFirst = index === 0;
                const isLast = index === VIDEO_SIZES.length - 1;
                return (
                  <button
                    key={ratio}
                    type="button"
                    onClick={() => setSize(ratio)}
                    className={cn(
                      "relative h-[56px] flex-1 cursor-pointer bg-white/50 p-0 text-sm leading-[30px] transition-colors",
                      isFirst && "rounded-l-[6px]",
                      isLast && "rounded-r-[6px]",
                      !isLast && "mr-[-1px]",
                      checked
                        ? "z-[1] border border-[rgb(74,171,240)] text-[rgb(74,171,240)] hover:border-[rgb(147,84,255)] hover:text-[rgb(147,84,255)]"
                        : "border border-slate-300 text-slate-800 hover:text-[rgb(74,171,240)]",
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ASSET.sizeIcons[ratio]}
                      alt=""
                      className="absolute top-2 left-1/2 size-5 -translate-x-1/2"
                    />
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs">
                      {ratio}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mb-3">
          <FieldLabel>Seed</FieldLabel>
          <div className="flex h-8 w-full focus-within:[&>div]:border-[rgb(74,171,240)]">
            <div className="min-w-0 flex-1 overflow-hidden rounded-l-[6px] border border-slate-300 bg-white transition-colors">
              <input
                id="seed"
                type="number"
                min={0}
                max={9999999999}
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                className="h-8 w-full appearance-none border-0 bg-transparent px-[11px] text-sm leading-[22px] text-slate-800 outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
            <div className="relative w-[34px] shrink-0 rounded-r-[6px] border border-l-0 border-slate-300 bg-slate-50 px-[11px] transition-colors">
              <div className="pointer-events-none opacity-0" aria-hidden>
                --
              </div>
              <button
                type="button"
                aria-label="sync"
                onClick={() => setSeed(String(randomSeed()))}
                className="absolute inset-0 flex cursor-pointer items-center justify-center text-slate-800 transition-all duration-500 ease-linear hover:rotate-180"
              >
                <SyncIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <FieldLabel>Negative Prompt</FieldLabel>
          <textarea
            value={negative}
            onChange={(e) => setNegative(e.target.value)}
            rows={2}
            className="w-full resize-none rounded-[6px] border border-slate-300 bg-white/50 px-[11px] py-1 text-sm leading-[22px] text-slate-800 outline-none transition-colors focus:border-[rgb(74,171,240)]"
          />
        </div>
      </div>
    </div>
  );
}
