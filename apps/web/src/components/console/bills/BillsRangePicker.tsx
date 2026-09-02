"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { BillsUiCopy } from "./bills-ui-copy";
import { formatDateISO } from "./content";
import { CalendarIcon, SwapRightIcon } from "./icons";

const antFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif';

const WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"] as const;

interface BillsRangePickerProps {
  copy: BillsUiCopy;
  startDate: string;
  endDate: string;
  onStartDateChange: (v: string) => void;
  onEndDateChange: (v: string) => void;
}

function parseISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function addMonths(base: Date, delta: number): Date {
  return new Date(base.getFullYear(), base.getMonth() + delta, 1);
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function daysInMonthGrid(year: number, month: number) {
  // Monday-first grid
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7; // Sun=0 → 6
  const days: { date: Date; inMonth: boolean }[] = [];
  const start = new Date(year, month, 1 - startOffset);
  for (let i = 0; i < 42; i++) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    days.push({ date: d, inMonth: d.getMonth() === month });
  }
  return days;
}

function MonthPanel({
  view,
  start,
  end,
  hover,
  onPick,
  onHover,
  onPrev,
  onNext,
  onSuperPrev,
  onSuperNext,
  showLeftNav,
  showRightNav,
}: {
  view: Date;
  start: Date | null;
  end: Date | null;
  hover: Date | null;
  onPick: (d: Date) => void;
  onHover: (d: Date | null) => void;
  onPrev: () => void;
  onNext: () => void;
  onSuperPrev: () => void;
  onSuperNext: () => void;
  showLeftNav: boolean;
  showRightNav: boolean;
}) {
  const year = view.getFullYear();
  const month = view.getMonth();
  const cells = useMemo(() => daysInMonthGrid(year, month), [year, month]);
  const today = startOfDay(new Date());

  const rangeStart = start;
  const rangeEnd = end ?? (start && hover ? hover : null);
  const [rs, re] =
    rangeStart && rangeEnd
      ? rangeStart <= rangeEnd
        ? [rangeStart, rangeEnd]
        : [rangeEnd, rangeStart]
      : [rangeStart, rangeEnd];

  return (
    <div className="w-[288px]">
      <div className="flex h-[41px] items-center px-2">
        <div className="flex w-14 shrink-0 items-center gap-0.5">
          {showLeftNav ? (
            <>
              <button
                type="button"
                aria-label="上一年"
                className="inline-flex size-6 cursor-pointer items-center justify-center text-xs text-[#1E293B] hover:text-[rgb(74,171,240)]"
                onClick={onSuperPrev}
              >
                «
              </button>
              <button
                type="button"
                aria-label="上个月"
                className="inline-flex size-6 cursor-pointer items-center justify-center text-xs text-[#1E293B] hover:text-[rgb(74,171,240)]"
                onClick={onPrev}
              >
                ‹
              </button>
            </>
          ) : (
            <span className="w-12" />
          )}
        </div>
        <div className="flex flex-1 items-center justify-center gap-1 text-sm leading-[22px] text-[#1E293B]">
          <span>{year}年</span>
          <span>{month + 1}月</span>
        </div>
        <div className="flex w-14 shrink-0 items-center justify-end gap-0.5">
          {showRightNav ? (
            <>
              <button
                type="button"
                aria-label="下个月"
                className="inline-flex size-6 cursor-pointer items-center justify-center text-xs text-[#1E293B] hover:text-[rgb(74,171,240)]"
                onClick={onNext}
              >
                ›
              </button>
              <button
                type="button"
                aria-label="下一年"
                className="inline-flex size-6 cursor-pointer items-center justify-center text-xs text-[#1E293B] hover:text-[rgb(74,171,240)]"
                onClick={onSuperNext}
              >
                »
              </button>
            </>
          ) : (
            <span className="w-12" />
          )}
        </div>
      </div>
      <div className="px-2 pb-2">
        <table className="w-full border-collapse text-center text-sm">
          <thead>
            <tr>
              {WEEKDAYS.map((d) => (
                <th
                  key={d}
                  className="h-8 font-normal text-[#1E293B]"
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }, (_, row) => (
              <tr key={row}>
                {cells.slice(row * 7, row * 7 + 7).map(({ date, inMonth }) => {
                  const day = startOfDay(date);
                  const isStart = rs ? sameDay(day, rs) : false;
                  const isEnd = re ? sameDay(day, re) : false;
                  const inRange =
                    rs && re && day > rs && day < re;
                  const isToday = sameDay(day, today);

                  return (
                    <td
                      key={day.toISOString()}
                      className={cn(
                        "h-8 p-0",
                        inRange && "bg-[rgba(74,171,240,0.1)]",
                        isStart && re && "rounded-l",
                        isEnd && rs && "rounded-r",
                      )}
                    >
                      <button
                        type="button"
                        disabled={!inMonth}
                        onMouseEnter={() => onHover(day)}
                        onMouseLeave={() => onHover(null)}
                        onClick={() => onPick(day)}
                        className={cn(
                          "relative mx-auto inline-flex size-6 cursor-pointer items-center justify-center rounded text-sm leading-6 transition-colors",
                          !inMonth && "invisible cursor-default",
                          inMonth &&
                            !isStart &&
                            !isEnd &&
                            "text-[#1E293B] hover:bg-[rgba(74,171,240,0.1)]",
                          (isStart || isEnd) &&
                            "bg-[rgb(74,171,240)] text-white hover:bg-[rgb(74,171,240)]",
                          isToday &&
                            !isStart &&
                            !isEnd &&
                            "font-medium text-[rgb(74,171,240)]",
                        )}
                      >
                        {day.getDate()}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function BillsRangePicker({
  copy,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: BillsRangePickerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [pickingEnd, setPickingEnd] = useState(false);
  const [hover, setHover] = useState<Date | null>(null);
  const [leftView, setLeftView] = useState(() => {
    const d = parseISO(startDate);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const start = startDate ? parseISO(startDate) : null;
  const end = endDate ? parseISO(endDate) : null;
  const rightView = addMonths(leftView, 1);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const applyRange = (s: Date, e: Date) => {
    const [a, b] = s <= e ? [s, e] : [e, s];
    onStartDateChange(formatDateISO(a));
    onEndDateChange(formatDateISO(b));
    setPickingEnd(false);
    setOpen(false);
  };

  const onPick = (d: Date) => {
    if (!pickingEnd || !start) {
      onStartDateChange(formatDateISO(d));
      onEndDateChange(formatDateISO(d));
      setPickingEnd(true);
      return;
    }
    applyRange(start, d);
  };

  const setPreset = (which: "today" | "yesterday") => {
    const t = startOfDay(new Date());
    const day =
      which === "today"
        ? t
        : new Date(t.getFullYear(), t.getMonth(), t.getDate() - 1);
    applyRange(day, day);
    setLeftView(new Date(day.getFullYear(), day.getMonth(), 1));
  };

  return (
    <div ref={rootRef} className="relative -ml-px" style={{ fontFamily: antFont }}>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setPickingEnd(false);
          setLeftView(
            new Date(
              parseISO(startDate).getFullYear(),
              parseISO(startDate).getMonth(),
              1,
            ),
          );
        }}
        className={cn(
          "relative flex h-10 w-[338px] cursor-pointer items-center rounded-r-[8px] border border-[#CBD5E1] bg-white px-[11px] py-[7px] text-left text-[#1E293B] hover:z-[1] hover:border-[rgb(74,171,240)]",
          open &&
            "z-[1] border-[rgb(74,171,240)] shadow-[0_0_0_2px_rgba(74,171,240,0.06)]",
        )}
      >
        <span
          className={cn(
            "min-w-0 flex-1 truncate text-base leading-6",
            !startDate && "text-[#94A3B8]",
          )}
        >
          {startDate || copy.startPlaceholder}
        </span>
        <span className="mx-2 inline-flex w-4 shrink-0 items-center justify-center text-[#94A3B8]">
          <SwapRightIcon className="size-4" />
        </span>
        <span
          className={cn(
            "min-w-0 flex-1 truncate text-base leading-6",
            !endDate && "text-[#94A3B8]",
          )}
        >
          {endDate || copy.endPlaceholder}
        </span>
        <CalendarIcon className="ml-1 size-[14px] shrink-0 text-[#94A3B8]" />
      </button>

      {open ? (
        <div className="absolute left-0 top-[calc(100%+4px)] z-[120] flex overflow-hidden rounded-[8px] border border-[#E2E8F0] bg-white shadow-[0_6px_16px_0_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]">
          <div className="w-[120px] shrink-0 border-r border-[#E2E8F0] py-1">
            <ul className="m-0 list-none p-0">
              {(
                [
                  { key: "today" as const, label: "今天" },
                  { key: "yesterday" as const, label: "昨天" },
                ] as const
              ).map((p) => (
                <li key={p.key}>
                  <button
                    type="button"
                    className="w-full cursor-pointer px-2 py-px text-left text-sm leading-[22px] text-[#1E293B] hover:bg-black/[0.04]"
                    onClick={() => setPreset(p.key)}
                  >
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex">
            <MonthPanel
              view={leftView}
              start={start}
              end={pickingEnd ? null : end}
              hover={pickingEnd ? hover : null}
              onPick={onPick}
              onHover={setHover}
              showLeftNav
              showRightNav={false}
              onPrev={() => setLeftView((v) => addMonths(v, -1))}
              onNext={() => setLeftView((v) => addMonths(v, 1))}
              onSuperPrev={() => setLeftView((v) => addMonths(v, -12))}
              onSuperNext={() => setLeftView((v) => addMonths(v, 12))}
            />
            <MonthPanel
              view={rightView}
              start={start}
              end={pickingEnd ? null : end}
              hover={pickingEnd ? hover : null}
              onPick={onPick}
              onHover={setHover}
              showLeftNav={false}
              showRightNav
              onPrev={() => setLeftView((v) => addMonths(v, -1))}
              onNext={() => setLeftView((v) => addMonths(v, 1))}
              onSuperPrev={() => setLeftView((v) => addMonths(v, -12))}
              onSuperNext={() => setLeftView((v) => addMonths(v, 12))}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
