"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";
import { SearchIcon } from "./icons";

interface ModelSelectProps {
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  emptyText?: string;
}

/**
 * Ant Design Select + showSearch stand-in:
 * type to filter inside the selector (not a separate dropdown search box).
 */
export function ModelSelect({
  value,
  options,
  onChange,
  emptyText = "无数据",
}: ModelSelectProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const typing = open && query.length > 0;

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
      return;
    }
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    queueMicrotask(() => {
      inputRef.current?.focus();
      const idx = filtered.findIndex((o) => o === value);
      setActiveIndex(idx >= 0 ? idx : 0);
    });
    return () => document.removeEventListener("mousedown", onDoc);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only rebind when open toggles
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const pick = (opt: string) => {
    onChange(opt);
    setOpen(false);
    setQuery("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const opt = filtered[activeIndex];
      if (opt) pick(opt);
    }
  };

  return (
    <div ref={rootRef} className="relative max-w-full">
      <div
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        className={cn(
          "sf-select-bg relative flex h-8 w-full cursor-pointer items-center truncate rounded-[6px] border border-slate-300 bg-white/60 px-[11px] text-sm text-slate-800 transition-all duration-200 sf-chat-ease-ant hover:border-[rgb(74,171,240)]",
          open &&
            "border-[rgb(74,171,240)] shadow-[0_0_0_2px_rgba(74,171,240,0.06)]",
        )}
        onMouseDown={(e) => {
          // Keep focus on input; toggle open on selector click
          if ((e.target as HTMLElement).tagName === "INPUT") return;
          e.preventDefault();
          setOpen((v) => !v);
          queueMicrotask(() => inputRef.current?.focus());
        }}
      >
        <div className="relative min-w-0 flex-1">
          <input
            ref={inputRef}
            type="search"
            autoComplete="off"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            value={open ? query : ""}
            placeholder=""
            onChange={(e) => {
              setQuery(e.target.value);
              if (!open) setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            className={cn(
              "absolute inset-0 z-[1] h-full w-full border-0 bg-transparent text-sm leading-[30px] text-slate-800 outline-none [&::-webkit-search-cancel-button]:hidden",
              !open && "cursor-pointer caret-transparent opacity-0",
              open && "opacity-100",
            )}
          />
          <span
            className={cn(
              "block truncate leading-[30px]",
              typing && "opacity-0",
            )}
            title={value}
          >
            {value}
          </span>
        </div>
        <SearchIcon className="pointer-events-none ml-2 size-3 shrink-0 text-slate-400" />
      </div>

      {open ? (
        <div
          className="sf-chat-dropdown-enter absolute z-20 mt-1 w-full rounded-lg bg-white p-1 shadow-[0_6px_16px_0_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]"
          role="presentation"
        >
          <ul
            id={listId}
            role="listbox"
            className="max-h-64 overflow-auto"
          >
            {filtered.map((opt, index) => {
              const selected = opt === value;
              const active = index === activeIndex;
              return (
                <li key={opt} role="presentation">
                  <div
                    role="option"
                    aria-selected={selected}
                    title={opt}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      pick(opt);
                    }}
                    className={cn(
                      "flex min-h-8 cursor-pointer items-center rounded px-3 py-[5px] text-sm leading-[22px] text-slate-800 transition-colors",
                      (selected || active) && "bg-[#EEF6FE]",
                    )}
                  >
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {opt}
                    </div>
                  </div>
                </li>
              );
            })}
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-center text-sm text-slate-400">
                {emptyText}
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
