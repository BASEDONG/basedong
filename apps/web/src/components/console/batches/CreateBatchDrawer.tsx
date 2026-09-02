"use client";

import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { modelOptions, type PriceUnit } from "./content";
import { getBatchesUiCopy, getDefaultPriceRows } from "./batches-ui-copy";
import {
  CONSOLE_END_DRAWER_SHELL,
  consoleEndDrawerTranslate,
} from "../shared/console-rtl-classes";

interface CreateBatchDrawerProps {
  open: boolean;
  onClose: () => void;
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width={16}
      height={16}
      aria-hidden
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width={12}
      height={12}
      aria-hidden
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function SwapIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width={14}
      height={14}
      aria-hidden
    >
      <path d="M8 3 4 7l4 4" />
      <path d="M4 7h16" />
      <path d="m16 21 4-4-4-4" />
      <path d="M20 17H4" />
    </svg>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="64 64 896 896"
      fill="currentColor"
      className={className}
      width={12}
      height={12}
      aria-hidden
    >
      <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="64 64 896 896"
      fill="currentColor"
      className={className}
      width={14}
      height={14}
      aria-hidden
    >
      <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
      <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z" />
    </svg>
  );
}

function EmptyBoxIcon() {
  return (
    <svg width={64} height={41} viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g transform="translate(0 1)" fill="none" fillRule="evenodd">
        <ellipse fill="#f8fafc" cx="32" cy="33" rx="32" ry="7" />
        <g fillRule="nonzero" stroke="#e2e8f0">
          <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
          <path
            d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
            fill="#f8fafc"
          />
        </g>
      </g>
    </svg>
  );
}

function formatPrice(perK: number, unit: PriceUnit): string {
  const value = unit === "M" ? perK * 1000 : perK;
  return value.toFixed(6);
}

function priceRowsForModel(modelValue: string, locale: string) {
  const idBase = modelValue.toLowerCase();
  return getDefaultPriceRows(locale).map((row) => ({
    ...row,
    meterId: `${idBase}.${row.meterId}`,
  }));
}

export function CreateBatchDrawer({ open, onClose }: CreateBatchDrawerProps) {
  const { targetLocale, isRtl } = useLocale();
  const copy = useMemo(() => getBatchesUiCopy(targetLocale), [targetLocale]);
  const titleId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [file, setFile] = useState("");
  const [model, setModel] = useState<string>(modelOptions[0].value);
  const [hours, setHours] = useState(24);
  const [unit, setUnit] = useState<PriceUnit>("K");
  const [fileOpen, setFileOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const fileSelectRef = useRef<HTMLDivElement>(null);
  const modelSelectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setVisible(true);
      const id = requestAnimationFrame(() => setEntered(true));
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        cancelAnimationFrame(id);
        document.body.style.overflow = prev;
      };
    }
    setEntered(false);
    setFileOpen(false);
    setModelOpen(false);
    setFileError(false);
    const t = window.setTimeout(() => setVisible(false), 200);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (fileOpen || modelOpen) {
          setFileOpen(false);
          setModelOpen(false);
          return;
        }
        onClose();
      }
    };
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (fileSelectRef.current && !fileSelectRef.current.contains(t)) {
        setFileOpen(false);
      }
      if (modelSelectRef.current && !modelSelectRef.current.contains(t)) {
        setModelOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDoc);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDoc);
    };
  }, [open, onClose, fileOpen, modelOpen]);

  if (!visible) return null;

  const modelLabel =
    modelOptions.find((m) => m.value === model)?.label ?? model;
  const rows = priceRowsForModel(model, targetLocale);
  const alternateUnit: PriceUnit = unit === "K" ? "M" : "K";

  return (
    <div className="sf-cloud-console pointer-events-none fixed inset-0 z-[1000]">
      <button
        type="button"
        aria-label={copy.closeOverlay}
        className={`pointer-events-auto absolute inset-0 border-0 bg-[rgba(2,6,23,0.45)] transition-opacity duration-200 ${
          entered ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`${CONSOLE_END_DRAWER_SHELL} w-[min(100%,600px)] min-w-[min(100%,600px)] max-w-full transition-transform duration-200 ease-out ${consoleEndDrawerTranslate(entered, isRtl)}`}
      >
        <div className="flex h-14 shrink-0 items-center px-6">
          <button
            type="button"
            aria-label={copy.close}
            onClick={onClose}
            className="mr-2 flex size-6 cursor-pointer items-center justify-center rounded text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <CloseIcon />
          </button>
          <h2
            id={titleId}
            className="text-base font-semibold leading-6 text-slate-800"
          >
            {copy.drawerTitle}
          </h2>
        </div>

        <div className="hidden-scrollbar flex-1 overflow-y-auto px-6 pb-6">
          <form
            className="model-form text-slate-700"
            onSubmit={(e) => {
              e.preventDefault();
              if (!file) {
                setFileError(true);
                setFileOpen(true);
                return;
              }
              setFileError(false);
              onClose();
            }}
          >
            <Field label={copy.taskName} required htmlFor="batch-name">
              <input
                id="batch-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={copy.taskNamePlaceholder}
                required
                className="h-8 w-full rounded-md border border-slate-300 bg-white px-[11px] text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-[rgb(74,171,240)]"
              />
            </Field>

            <Field label={copy.taskDesc} htmlFor="batch-desc">
              <input
                id="batch-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={copy.taskDescPlaceholder}
                className="h-8 w-full rounded-md border border-slate-300 bg-white px-[11px] text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-[rgb(74,171,240)]"
              />
            </Field>

            <Field label={copy.inputFile} required>
              <div className="relative" ref={fileSelectRef}>
                <button
                  type="button"
                  aria-expanded={fileOpen}
                  onClick={() => {
                    setFileOpen((v) => !v);
                    setModelOpen(false);
                  }}
                  className={`flex h-8 w-full cursor-pointer items-center justify-between rounded-md border bg-white px-[11px] text-left text-sm text-slate-800 outline-none hover:border-slate-400 focus:border-[rgb(74,171,240)] ${
                    fileError
                      ? "border-[#ff4d4f]"
                      : "border-slate-300"
                  }`}
                >
                  <span className={`truncate ${file ? "" : "text-slate-400"}`}>
                    {file || "\u00A0"}
                  </span>
                  <ChevronDown className="shrink-0 text-slate-400" />
                </button>

                {fileOpen ? (
                  <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-30 overflow-hidden rounded-md bg-white py-1 shadow-[0_6px_16px_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]">
                    {files.length === 0 ? (
                      <div className="flex flex-col items-center px-3 py-3 text-slate-400">
                        <EmptyBoxIcon />
                        <div className="mt-1 text-sm">{copy.noData}</div>
                      </div>
                    ) : (
                      <ul className="max-h-48 overflow-y-auto py-1">
                        {files.map((f) => (
                          <li key={f}>
                            <button
                              type="button"
                              className={`flex w-full cursor-pointer px-3 py-2 text-left text-sm hover:bg-slate-50 ${
                                file === f
                                  ? "bg-[rgba(74,171,240,0.06)] text-[rgb(74,171,240)]"
                                  : "text-slate-700"
                              }`}
                              onClick={() => {
                                setFile(f);
                                setFileError(false);
                                setFileOpen(false);
                              }}
                            >
                              {f}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="my-2 border-t border-slate-200" />
                    <button
                      type="button"
                      className="mb-1 flex w-full cursor-pointer items-center justify-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-slate-700"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <PlusIcon />
                      {copy.uploadDataset}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jsonl,application/jsonl,text/plain"
                      className="hidden"
                      onChange={(e) => {
                        const picked = e.target.files?.[0];
                        if (!picked) return;
                        const next = picked.name.endsWith(".jsonl")
                          ? picked.name
                          : `${picked.name}.jsonl`;
                        setFiles((prev) =>
                          prev.includes(next) ? prev : [...prev, next],
                        );
                        setFile(next);
                        setFileError(false);
                        setFileOpen(false);
                        e.target.value = "";
                      }}
                    />
                  </div>
                ) : null}
              </div>
              {fileError ? (
                <div className="mt-1 text-sm text-[#ff4d4f]">{copy.selectInputFile}</div>
              ) : null}
            </Field>

            <Field label={copy.taskModel} required className="mb-5">
              <div className="relative max-w-full" ref={modelSelectRef}>
                <button
                  type="button"
                  aria-expanded={modelOpen}
                  onClick={() => {
                    setModelOpen((v) => !v);
                    setFileOpen(false);
                  }}
                  className="flex h-8 w-full max-w-full cursor-pointer items-center justify-between truncate rounded-md border border-slate-300 bg-white px-[11px] text-left text-sm text-slate-800 outline-none hover:border-slate-400 focus:border-[rgb(74,171,240)]"
                >
                  <span className="truncate">{modelLabel}</span>
                  <ChevronDown className="shrink-0 text-slate-400" />
                </button>
                {modelOpen ? (
                  <ul className="absolute left-0 right-0 top-[calc(100%+4px)] z-30 max-h-64 overflow-y-auto rounded-md bg-white py-1 shadow-[0_6px_16px_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]">
                    {modelOptions.map((opt) => (
                      <li key={opt.value}>
                        <button
                          type="button"
                          className={`flex w-full cursor-pointer px-3 py-2 text-left text-sm hover:bg-slate-50 ${
                            model === opt.value
                              ? "bg-[rgba(74,171,240,0.06)] text-[rgb(74,171,240)]"
                              : "text-slate-700"
                          }`}
                          onClick={() => {
                            setModel(opt.value);
                            setModelOpen(false);
                          }}
                        >
                          {opt.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Field>

            <div className="mb-8 w-full overflow-hidden">
              <div className="overflow-hidden rounded-md border border-slate-200">
                <div className="flex border-b border-slate-200 bg-slate-50 text-sm text-slate-700">
                  <div className="w-[140px] shrink-0 px-3 py-2 font-medium">
                    {copy.feature}
                  </div>
                  <div className="flex min-w-0 flex-1 items-center justify-between px-3 py-2 font-medium">
                    <span>{copy.price}</span>
                    <button
                      type="button"
                      onClick={() => setUnit(alternateUnit)}
                      className="inline-flex cursor-pointer items-center gap-1 font-normal text-[rgb(74,171,240)]"
                    >
                      <SwapIcon />
                      {alternateUnit} {copy.tokens}
                    </button>
                  </div>
                </div>
                {rows.map((row) => (
                  <div
                    key={row.meterId}
                    className="flex border-b border-slate-200 last:border-b-0"
                  >
                    <div className="flex w-[140px] shrink-0 items-center px-3 py-3 text-sm text-slate-700">
                      {row.feature}
                    </div>
                    <div className="min-w-0 flex-1 px-3 py-3">
                      <div className="max-w-[320px]">
                        <div className="text-[20px] font-bold text-[rgb(74,171,240)]">
                          <span className="mr-1 text-xs font-normal text-slate-400">
                            ¥
                          </span>
                          <span className="tabular-nums">
                            {formatPrice(row.pricePerK, unit)}
                          </span>
                          <span className="ml-2 text-[10px] font-normal text-slate-400">
                            / {unit} {copy.tokens}
                          </span>
                        </div>
                        <button
                          type="button"
                          aria-label={copy.copy}
                          className="mt-1 flex max-w-full items-center gap-1 truncate text-[10px] text-slate-400 hover:text-[rgb(74,171,240)]"
                          onClick={() => {
                            void navigator.clipboard?.writeText(row.meterId);
                          }}
                        >
                          <span className="truncate">{row.meterId}</span>
                          <CopyIcon className="shrink-0 pt-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-sm text-slate-500">{copy.priceDisclaimer}</div>
            </div>

            <div className="mb-1 flex items-center justify-between gap-3">
              <div className="text-sm leading-[22px] text-slate-800">
                {copy.completionWindow}
              </div>
              <div className="flex w-[115px] items-stretch">
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value) || 1)}
                  className="h-8 w-16 rounded-l-md border border-r-0 border-slate-300 bg-white px-[11px] text-sm outline-none focus:z-10 focus:border-[rgb(74,171,240)]"
                />
                <span className="inline-flex h-8 flex-1 items-center justify-center rounded-r-md border border-slate-300 bg-slate-50 text-sm text-slate-600">
                  {copy.hours}
                </span>
              </div>
            </div>

            <div className="mb-3 flex flex-col gap-1 rounded-md bg-slate-50 px-2 py-1 text-slate-500">
              {copy.completionNotes.map((note, i) => (
                <p key={note} className="m-0 text-sm leading-[22px]">
                  {i + 1}. {note}
                </p>
              ))}
            </div>

            <div className="mb-[100px] mt-5 flex items-center">
              <button
                type="submit"
                className="inline-flex h-10 min-w-[184px] cursor-pointer items-center justify-center rounded-[8px] border border-transparent bg-[rgb(74,171,240)] px-[15px] text-base text-white shadow-[0_2px_0_0_rgba(74,171,240,0.06)] transition hover:bg-[#5b21e6]"
              >
                {copy.createTask}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
  className = "mb-6",
  htmlFor,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  htmlFor?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className={`mb-2 block text-sm leading-[22px] text-slate-800 ${
          required
            ? "before:mr-1 before:inline-block before:font-[SimSun,sans-serif] before:text-sm before:leading-none before:text-[#ff4d4f] before:content-['*']"
            : ""
        }`}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
