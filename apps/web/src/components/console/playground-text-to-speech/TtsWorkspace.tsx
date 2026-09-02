"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { PlaygroundUiCopy } from "../shared/playground-ui-copy";
import {
  ASSET,
  DEFAULT_SUGGESTIONS,
  pickSuggestions,
  TERMS_URL,
} from "./content";
import { ClearIcon, SendIcon, WarningTriangleIcon } from "./icons";

interface TtsWorkspaceProps {
  copy: PlaygroundUiCopy;
  model: string;
}

export function TtsWorkspace({ copy, model }: TtsWorkspaceProps) {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([
    ...DEFAULT_SUGGESTIONS,
  ]);
  const prevModelRef = useRef(model);
  const canSend = prompt.trim().length > 0;

  useEffect(() => {
    if (prevModelRef.current === model) return;
    prevModelRef.current = model;
    setSuggestions(pickSuggestions(4));
  }, [model]);

  const send = () => {
    if (!canSend) return;
    setError(copy.notConnectedTts);
  };

  return (
    <div className="relative h-full min-w-0 flex-1 overflow-x-hidden border-slate-200">
      <div className="flex h-full w-full flex-col gap-3">
        <div className="relative mb-2 flex w-full items-center justify-between whitespace-nowrap rounded-[8px] bg-[#EBE5F8] px-4 py-1.5 text-sm text-[#333]">
          {model}
          <div className="flex items-center gap-2">
            <WarningTriangleIcon className="text-lg text-[#FAAD14]" />
            <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
              {copy.feeBannerBefore}
              <button
                type="button"
                className="inline-flex h-6 items-center px-[7px] text-sm leading-5 text-[rgb(74,171,240)] hover:underline"
              >
                {copy.modelDetails}
              </button>
            </span>
          </div>
        </div>

        <div
          className="no-scrollbar full box-border flex min-h-0 flex-1 flex-col items-start overflow-y-auto bg-no-repeat"
          style={{
            backgroundImage: `url(${ASSET.emptyAudio})`,
            backgroundPosition: "50% 40%",
            backgroundSize: "320px",
          }}
        />

        {error ? (
          <p className="text-sm text-amber-700" role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex">
          <div className="flex-1 overflow-hidden">
            <div className="flex w-full gap-3">
              {suggestions.map((text) => (
                <div
                  key={text.slice(0, 32)}
                  role="button"
                  tabIndex={0}
                  title={text}
                  onClick={() => setPrompt(text)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setPrompt(text);
                    }
                  }}
                  className="group max-w-[200px] cursor-pointer truncate rounded-[8px] border border-transparent bg-slate-100 p-1 px-3 text-xs text-slate-500 transition-all hover:border-[var(--sf-cloud-primary)]"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            aria-label="clear"
            disabled={!canSend}
            onClick={() => setPrompt("")}
            className={cn(
              "ml-2 flex size-8 min-w-8 items-center justify-center rounded-[6px] border border-slate-300 transition-all duration-200 sf-chat-ease-ant",
              canSend
                ? "cursor-pointer bg-white text-slate-800 shadow-[0_2px_0_0_rgba(0,0,0,0.02)] hover:border-[rgb(74,171,240)] hover:text-[rgb(74,171,240)]"
                : "cursor-not-allowed bg-slate-50 text-slate-400",
            )}
          >
            <ClearIcon />
          </button>
        </div>

        <div
          className={cn(
            "flex w-full flex-col rounded-md border border-slate-200 bg-white/50 p-1 pr-3 transition-all duration-300",
            "focus-within:border-[rgb(74,171,240)]",
          )}
        >
          <div className="flex h-[112px] w-full items-center justify-between bg-transparent">
            <div className="h-full flex-1 bg-transparent">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && canSend) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder={copy.promptPlaceholder}
                className="no-scrollbar h-full w-full resize-none rounded-[6px] border-0 bg-transparent px-[11px] py-1 text-sm leading-[22px] text-slate-800 outline-none"
              />
            </div>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={send}
                aria-label="send"
                className={cn(
                  "flex size-10 items-center justify-center rounded bg-[var(--sf-cloud-primary)] text-white transition-all duration-200",
                  canSend
                    ? "cursor-pointer opacity-100"
                    : "cursor-not-allowed opacity-50",
                )}
              >
                <SendIcon className="-rotate-90" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-xs leading-4 text-slate-400">
          {copy.disclaimerBefore}
          <a
            href={TERMS_URL}
            target="_blank"
            rel="noreferrer"
            className="mx-1 text-[var(--sf-cloud-primary)] underline-offset-2 hover:underline"
          >
            {copy.termsLink}
          </a>
          {copy.disclaimerAfter}
        </div>
      </div>
    </div>
  );
}
