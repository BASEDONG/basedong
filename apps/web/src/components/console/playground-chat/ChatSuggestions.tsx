"use client";

import { SUGGESTION_PROMPTS } from "./content";
import { ClearChatIcon } from "./icons";

interface ChatSuggestionsProps {
  onPick: (text: string) => void;
  onClear: () => void;
}

export function ChatSuggestions({ onPick, onClear }: ChatSuggestionsProps) {
  return (
    <div className="flex">
      <div className="flex-1 overflow-hidden">
        <div className="flex w-full gap-3">
          {SUGGESTION_PROMPTS.map((text) => (
            <button
              key={text}
              type="button"
              onClick={() => onPick(text)}
              className="max-w-[200px] cursor-pointer truncate rounded-[8px] border border-transparent bg-[#f1f5f9] px-3 py-1 text-xs leading-4 text-[#64748b] transition-all duration-150 sf-chat-ease-out hover:border-[rgb(108,40,246)]"
            >
              {text}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-label="clear"
        onClick={onClear}
        className="ml-2 flex size-8 min-w-8 items-center justify-center rounded-[6px] border border-slate-300 bg-white text-sm text-slate-800 shadow-[0_2px_0_0_rgba(0,0,0,0.02)] transition-all duration-200 sf-chat-ease-ant hover:border-[rgb(74,171,240)] hover:text-[rgb(74,171,240)]"
      >
        <ClearChatIcon />
      </button>
    </div>
  );
}
