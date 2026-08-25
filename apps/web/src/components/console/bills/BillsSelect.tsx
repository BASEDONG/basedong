"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, CloseIcon } from "./icons";

const antFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif';

interface BillsSelectProps {
  value: string | null;
  options: readonly string[];
  placeholder: string;
  onChange: (value: string | null) => void;
  className?: string;
  widthClass?: string;
  radiusClass?: string;
  disabled?: boolean;
  /** Match ant-select-lg content (16px) */
  large?: boolean;
  searchable?: boolean;
}

export function BillsSelect({
  value,
  options,
  placeholder,
  onChange,
  className,
  widthClass = "w-[210.6px]",
  radiusClass = "rounded-[8px]",
  disabled = false,
  large = true,
  searchable = false,
}: BillsSelectProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (open && searchable) inputRef.current?.focus();
  }, [open, searchable]);

  const filtered = searchable
    ? options.filter((o) =>
        o.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : options;

  const openAndFocus = () => {
    if (disabled) return;
    setOpen(true);
    queueMicrotask(() => inputRef.current?.focus());
  };

  return (
    <div
      ref={rootRef}
      className={cn("relative", widthClass, className)}
      style={{ fontFamily: antFont }}
    >
      <div
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        tabIndex={disabled || searchable ? -1 : 0}
        onClick={openAndFocus}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openAndFocus();
          }
        }}
        className={cn(
          "relative flex h-10 w-full cursor-pointer items-center border border-[#CBD5E1] bg-white text-left text-[#1E293B] transition-colors hover:border-[rgb(74,171,240)]",
          large ? "text-base leading-[25px]" : "text-sm leading-[22px]",
          radiusClass,
          searchable ? "py-px pl-[11px] pr-6" : "justify-between px-[11px]",
          disabled && "cursor-not-allowed bg-[#F8FAFC] text-[#94A3B8]",
          open &&
            "border-[rgb(74,171,240)] shadow-[0_0_0_2px_rgba(74,171,240,0.06)]",
        )}
      >
        {searchable ? (
          <div className="relative flex min-w-0 flex-1 items-center overflow-hidden">
            {!value && !query ? (
              <span className="pointer-events-none absolute left-0 truncate text-[#94A3B8]">
                {placeholder}
              </span>
            ) : null}
            {value && !query ? (
              <span className="pointer-events-none absolute left-0 truncate">
                {value}
              </span>
            ) : null}
            <input
              ref={inputRef}
              type="search"
              autoComplete="off"
              disabled={disabled}
              value={query}
              aria-autocomplete="list"
              aria-controls={listId}
              onChange={(e) => {
                setQuery(e.target.value);
                if (!open) setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              className={cn(
                "h-8 w-full min-w-[4px] border-0 bg-transparent p-0 text-base leading-8 text-[#1E293B] outline-none [&::-webkit-search-cancel-button]:hidden",
                value && !query && "caret-transparent text-transparent",
              )}
            />
          </div>
        ) : (
          <span
            className={cn("min-w-0 flex-1 truncate", !value && "text-[#94A3B8]")}
          >
            {value ?? placeholder}
          </span>
        )}
        <ChevronDownIcon
          className={cn(
            "pointer-events-none size-3 shrink-0 text-[#94A3B8] transition-transform",
            searchable ? "absolute right-[11px]" : "ml-1",
            open && "rotate-180",
          )}
        />
      </div>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 z-[100] mt-1 max-h-64 w-full overflow-auto rounded-[8px] border border-[#E2E8F0] bg-white py-1 shadow-[0_6px_16px_0_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-[#94A3B8]">
              暂无数据
            </li>
          ) : (
            filtered.map((opt) => {
              const selected = opt === value;
              return (
                <li key={opt} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    className={cn(
                      "flex w-full cursor-pointer px-3 py-[5px] text-left text-sm text-[#1E293B] hover:bg-black/[0.04]",
                      selected &&
                        "bg-[rgba(74,171,240,0.1)] font-medium text-[rgb(74,171,240)]",
                    )}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      onChange(opt);
                      setQuery("");
                      setOpen(false);
                    }}
                  >
                    {opt}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      ) : null}
    </div>
  );
}

interface BillsMultiSelectProps {
  values: string[];
  options: readonly string[];
  placeholder: string;
  allLabel?: string;
  onChange: (values: string[]) => void;
  className?: string;
  widthClass?: string;
  /** When options empty, show this in dropdown (ant empty) */
  emptyText?: string;
  showAllOption?: boolean;
  /** ant-select-show-search — type to filter (default true) */
  searchable?: boolean;
}

export function BillsMultiSelect({
  values,
  options,
  placeholder,
  allLabel = "全部",
  onChange,
  className,
  widthClass = "w-[210.6px]",
  emptyText = "暂无数据",
  showAllOption = true,
  searchable = true,
}: BillsMultiSelectProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [inputWidth, setInputWidth] = useState(4);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (open && searchable) inputRef.current?.focus();
  }, [open, searchable]);

  useEffect(() => {
    if (!searchable) return;
    const w = mirrorRef.current?.offsetWidth ?? 0;
    setInputWidth(Math.max(4, w + 4));
  }, [query, searchable]);

  const filtered = searchable
    ? options.filter((o) =>
        o.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : options;

  const allSelected =
    options.length > 0 && values.length === options.length;
  const filteredAllSelected =
    filtered.length > 0 && filtered.every((o) => values.includes(o));

  const toggle = (opt: string) => {
    if (values.includes(opt)) onChange(values.filter((v) => v !== opt));
    else onChange([...values, opt]);
    setQuery("");
    queueMicrotask(() => inputRef.current?.focus());
  };

  const toggleAll = () => {
    if (query.trim()) {
      if (filteredAllSelected) {
        onChange(values.filter((v) => !filtered.includes(v)));
      } else {
        const set = new Set(values);
        filtered.forEach((o) => set.add(o));
        onChange([...set]);
      }
    } else if (allSelected) {
      onChange([]);
    } else {
      onChange([...options]);
    }
    setQuery("");
    queueMicrotask(() => inputRef.current?.focus());
  };

  const removeTag = (tag: string) => {
    onChange(values.filter((v) => v !== tag));
  };

  const displayTags = values.slice(0, 1);
  const rest = values.length - displayTags.length;
  const showPlaceholder = values.length === 0 && !query;
  const showClear = values.length > 0;

  const openAndFocus = () => {
    setOpen(true);
    queueMicrotask(() => inputRef.current?.focus());
  };

  return (
    <div
      ref={rootRef}
      className={cn("group relative max-w-[450px]", widthClass, className)}
      style={{ fontFamily: antFont }}
    >
      <div
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        onClick={openAndFocus}
        className={cn(
          "relative flex h-10 w-full cursor-text items-center rounded-[8px] border border-[#CBD5E1] bg-white py-px pl-[3px] pr-6 text-left text-base leading-[25px] text-[#1E293B] transition-colors hover:border-[rgb(74,171,240)]",
          open &&
            "border-[rgb(74,171,240)] shadow-[0_0_0_2px_rgba(74,171,240,0.06)]",
        )}
      >
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1 overflow-hidden">
          {displayTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex h-8 max-w-full items-center gap-1 rounded-[6px] bg-[#F1F5F9] py-0 pl-2 pr-1 text-base leading-8 text-[#1E293B]"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="truncate">{tag}</span>
              <span
                role="button"
                tabIndex={0}
                aria-label={`移除 ${tag}`}
                className="inline-flex size-[14px] shrink-0 items-center justify-center rounded-sm text-[#94A3B8] hover:bg-black/5 hover:text-[#1E293B]"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    removeTag(tag);
                  }
                }}
              >
                <CloseIcon className="size-[10px]" />
              </span>
            </span>
          ))}
          {rest > 0 ? (
            <span className="inline-flex h-8 shrink-0 items-center rounded-[6px] bg-[#F1F5F9] px-2 text-base leading-8 text-[#1E293B]">
              + {rest} ...
            </span>
          ) : null}
          {searchable ? (
            <span className="relative inline-flex h-8 min-w-[4px] flex-1 items-center">
              {showPlaceholder ? (
                <span className="pointer-events-none absolute left-2 truncate text-[#94A3B8]">
                  {placeholder}
                </span>
              ) : null}
              <input
                ref={inputRef}
                type="search"
                autoComplete="off"
                value={query}
                aria-autocomplete="list"
                aria-controls={listId}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (!open) setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !query && values.length > 0) {
                    onChange(values.slice(0, -1));
                  }
                  if (e.key === "Escape") {
                    setOpen(false);
                    setQuery("");
                  }
                }}
                style={{ width: inputWidth }}
                className="h-8 max-w-full border-0 bg-transparent p-0 text-base leading-8 text-[#1E293B] outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              <span
                ref={mirrorRef}
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 -z-10 whitespace-pre text-base leading-8 opacity-0"
              >
                {query || " "}
              </span>
            </span>
          ) : showPlaceholder ? (
            <span className="truncate pl-2 text-[#94A3B8]">{placeholder}</span>
          ) : null}
        </div>
        {showClear ? (
          <button
            type="button"
            aria-label="清除"
            className="absolute right-[11px] z-[1] hidden size-[14px] items-center justify-center rounded-full bg-[#94A3B8] text-white group-hover:inline-flex hover:bg-[#64748B]"
            onClick={(e) => {
              e.stopPropagation();
              onChange([]);
              setQuery("");
            }}
          >
            <CloseIcon className="size-[8px]" />
          </button>
        ) : null}
        <ChevronDownIcon
          className={cn(
            "pointer-events-none absolute right-[11px] size-3 shrink-0 text-[#94A3B8] transition-transform",
            open && "rotate-180",
            showClear && "group-hover:opacity-0",
          )}
        />
      </div>
      {open ? (
        <div
          id={listId}
          role="listbox"
          className="absolute left-0 z-[100] mt-1 max-h-72 w-full min-w-[220px] overflow-auto rounded-[8px] border border-[#E2E8F0] bg-white py-1 shadow-[0_6px_16px_0_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]"
        >
          {options.length === 0 || filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 px-3 py-6 text-sm text-[#94A3B8]">
              <span>{emptyText}</span>
            </div>
          ) : (
            <>
              {showAllOption && !query.trim() ? (
                <label className="flex cursor-pointer items-center gap-2 px-3 py-[5px] text-sm text-[#1E293B] hover:bg-black/[0.04]">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => {
                      if (el)
                        el.indeterminate = values.length > 0 && !allSelected;
                    }}
                    onChange={toggleAll}
                    onMouseDown={(e) => e.preventDefault()}
                    className="size-4 accent-[rgb(74,171,240)]"
                  />
                  {allLabel}
                </label>
              ) : null}
              {filtered.map((opt) => {
                const checked = values.includes(opt);
                return (
                  <label
                    key={opt}
                    className="flex cursor-pointer items-center gap-2 px-3 py-[5px] text-sm text-[#1E293B] hover:bg-black/[0.04]"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(opt)}
                      className="size-4 accent-[rgb(74,171,240)]"
                    />
                    {opt}
                  </label>
                );
              })}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
