"use client";

import { cn } from "@/lib/utils";
import { SendIcon } from "./icons";

interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder: string;
}

export function ChatComposer({
  value,
  onChange,
  onSend,
  placeholder,
}: ChatComposerProps) {
  const canSend = value.trim().length > 0;

  return (
    <div className="flex w-full flex-col rounded-[6px] border border-[#e2e8f0] bg-white/50 p-1 pr-3 transition-all duration-300 sf-chat-ease-out focus-within:border-[rgb(74,171,240)]">
      <div className="flex h-[112px] w-full items-center justify-between bg-transparent">
        <div className="h-full flex-1 bg-transparent">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && canSend) {
                e.preventDefault();
                onSend();
              }
            }}
            placeholder={placeholder}
            className="no-scrollbar h-full w-full resize-none rounded-[6px] border-0 bg-transparent px-[11px] py-1 text-sm leading-[22px] text-slate-800 outline-none"
          />
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            disabled={!canSend}
            onClick={onSend}
            aria-label="send"
            className={cn(
              "flex size-10 items-center justify-center rounded-[4px] bg-[rgb(108,40,246)] text-white transition-all duration-200 ease",
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
  );
}
