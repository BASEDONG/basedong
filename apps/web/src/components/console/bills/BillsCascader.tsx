"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { CascaderNode } from "./content";
import { ChevronDownIcon, ChevronRightIcon, CloseIcon } from "./icons";

const antFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif';

interface BillsCascaderProps {
  values: string[];
  options: CascaderNode[];
  placeholder: string;
  onChange: (values: string[]) => void;
  className?: string;
  widthClass?: string;
}

function leafValuesUnder(node: CascaderNode): string[] {
  if (!node.children?.length) return [node.value];
  return node.children.flatMap(leafValuesUnder);
}

type FlatPath = { path: string[]; label: string; leaf: string };

function flattenLeaves(
  nodes: CascaderNode[],
  parents: string[] = [],
): FlatPath[] {
  const out: FlatPath[] = [];
  for (const n of nodes) {
    const path = [...parents, n.label];
    if (!n.children?.length) {
      out.push({ path, label: path.join(" / "), leaf: n.value });
    } else {
      out.push(...flattenLeaves(n.children, path));
    }
  }
  return out;
}

export function BillsCascader({
  values,
  options,
  placeholder,
  onChange,
  className,
  widthClass = "w-[210.6px]",
}: BillsCascaderProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [activePath, setActivePath] = useState<string[]>([]);
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
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const w = mirrorRef.current?.offsetWidth ?? 0;
    setInputWidth(Math.max(4, w + 4));
  }, [query]);

  const menus: CascaderNode[][] = [options];
  let level = options;
  for (const key of activePath) {
    const next = level.find((n) => n.value === key);
    if (!next?.children?.length) break;
    menus.push(next.children);
    level = next.children;
  }

  const flat = flattenLeaves(options);
  const q = query.trim().toLowerCase();
  const searchHits = q
    ? flat.filter((f) => f.label.toLowerCase().includes(q))
    : [];

  const toggleLeaf = (leaf: string) => {
    if (values.includes(leaf)) onChange(values.filter((v) => v !== leaf));
    else onChange([...values, leaf]);
    setQuery("");
    queueMicrotask(() => inputRef.current?.focus());
  };

  const toggleGroup = (node: CascaderNode) => {
    const leaves = leafValuesUnder(node);
    const allOn = leaves.every((l) => values.includes(l));
    if (allOn) onChange(values.filter((v) => !leaves.includes(v)));
    else {
      const set = new Set(values);
      leaves.forEach((l) => set.add(l));
      onChange([...set]);
    }
  };

  const removeTag = (leaf: string) => {
    onChange(values.filter((v) => v !== leaf));
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
          className="absolute left-0 z-[100] mt-1 overflow-hidden rounded-[8px] border border-[#E2E8F0] bg-white shadow-[0_6px_16px_0_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]"
        >
          {q ? (
            <ul
              role="listbox"
              className="m-0 max-h-[180px] min-w-[220px] list-none overflow-y-auto p-0 py-1"
            >
              {searchHits.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-[#94A3B8]">
                  暂无数据
                </li>
              ) : (
                searchHits.map((hit) => {
                  const checked = values.includes(hit.leaf);
                  return (
                    <li key={hit.leaf} role="option" aria-selected={checked}>
                      <label
                        className="flex cursor-pointer items-center gap-2 px-3 py-[5px] text-sm text-[#1E293B] hover:bg-black/[0.04]"
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleLeaf(hit.leaf)}
                          className="size-4 accent-[rgb(74,171,240)]"
                        />
                        {hit.label}
                      </label>
                    </li>
                  );
                })
              )}
            </ul>
          ) : (
            <div className="flex">
              {menus.map((menu, depth) => (
                <ul
                  key={depth}
                  role="menu"
                  className="m-0 max-h-[180px] min-w-[111px] list-none overflow-y-auto border-r border-[#E2E8F0] p-0 last:border-r-0"
                >
                  {menu.map((node) => {
                    const hasChildren = Boolean(node.children?.length);
                    const leaves = leafValuesUnder(node);
                    const checked = leaves.every((l) => values.includes(l));
                    const indeterminate =
                      !checked && leaves.some((l) => values.includes(l));
                    const active = activePath[depth] === node.value;

                    return (
                      <li key={node.value} role="none">
                        <div
                          role="menuitemcheckbox"
                          aria-checked={checked}
                          className={cn(
                            "flex h-8 cursor-pointer items-center gap-2 px-3 text-sm text-[#1E293B] hover:bg-black/[0.04]",
                            active && "bg-black/[0.04]",
                          )}
                          onMouseEnter={() => {
                            if (hasChildren) {
                              setActivePath((prev) => [
                                ...prev.slice(0, depth),
                                node.value,
                              ]);
                            } else {
                              setActivePath((prev) => prev.slice(0, depth));
                            }
                          }}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            if (hasChildren) {
                              setActivePath((prev) => [
                                ...prev.slice(0, depth),
                                node.value,
                              ]);
                              toggleGroup(node);
                            } else {
                              toggleLeaf(node.value);
                            }
                          }}
                        >
                          <span
                            className={cn(
                              "relative inline-flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-[#CBD5E1] bg-white",
                              checked &&
                                "border-[rgb(74,171,240)] bg-[rgb(74,171,240)]",
                              indeterminate &&
                                "border-[rgb(74,171,240)] bg-[rgb(74,171,240)]",
                            )}
                          >
                            {checked ? (
                              <svg
                                viewBox="0 0 16 16"
                                className="size-2.5 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M3 8.5l3 3 7-7" />
                              </svg>
                            ) : null}
                            {indeterminate && !checked ? (
                              <span className="h-0.5 w-2 bg-white" />
                            ) : null}
                          </span>
                          <span className="min-w-0 flex-1 truncate">
                            {node.label}
                          </span>
                          {hasChildren ? (
                            <ChevronRightIcon className="size-3 shrink-0 text-[#94A3B8]" />
                          ) : null}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
