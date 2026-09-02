"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { InvoiceUiCopy } from "./invoice-ui-copy";
import { formatYuan, mockAmounts } from "./content";

const antFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

const DIVIDER_LINE = "rgba(13, 63, 130, 0.12)";

interface ApplyInvoiceDrawerProps {
  copy: InvoiceUiCopy;
  open: boolean;
  onClose: () => void;
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={14}
      height={14}
      aria-hidden
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg
      viewBox="64 64 896 896"
      fill="currentColor"
      width={12}
      height={12}
      aria-hidden
      className="text-slate-400"
    >
      <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} fill="currentColor" aria-hidden>
      <path d="M1.5 1.2a.75.75 0 0 1 .82-.1l12.5 5.75a.75.75 0 0 1 0 1.38L2.32 14a.75.75 0 0 1-1.07-.72V9.1L8 8 1.25 6.9V1.9a.75.75 0 0 1 .25-.7Z" />
    </svg>
  );
}

function AntCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="mb-2 inline-flex cursor-pointer items-baseline gap-2 text-sm text-slate-800">
      <span
        className={cn(
          "relative inline-flex size-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors",
          checked
            ? "border-[rgb(74,171,240)] bg-[rgb(74,171,240)]"
            : "border-slate-300 bg-white",
        )}
      >
        <input
          type="checkbox"
          className="absolute inset-0 m-0 cursor-pointer opacity-0"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        {checked ? (
          <svg viewBox="0 0 16 16" width={10} height={10} fill="none" aria-hidden>
            <path
              d="M3.5 8.2 6.4 11l6-7"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
      <span>{label}</span>
    </label>
  );
}

function Field({
  label,
  required,
  help,
  children,
}: {
  label: string;
  required?: boolean;
  help?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="mb-0.5 flex flex-wrap items-baseline gap-x-1 text-sm leading-[22px] text-slate-800">
        {required ? (
          <span className="text-[#ff4d4f]" aria-hidden>
            *
          </span>
        ) : null}
        <span>{label}</span>
      </div>
      {help ? (
        <div className="-ml-2 mb-2 break-all pr-4 text-xs leading-4 text-slate-400">
          {help}
        </div>
      ) : (
        <div className="mb-2" />
      )}
      {children}
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="my-4 flex items-center">
      <span className="h-px flex-1" style={{ backgroundColor: DIVIDER_LINE }} />
      <span className="px-4 text-base font-medium text-slate-500">{label}</span>
      <span className="h-px flex-1" style={{ backgroundColor: DIVIDER_LINE }} />
    </div>
  );
}

function SelectField({
  value,
  options,
  onChange,
  className,
  buttonClassName,
  minWidth,
}: {
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
  className?: string;
  buttonClassName?: string;
  minWidth?: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [menuOpen]);

  return (
    <div className={cn("relative", className)} ref={ref} style={{ minWidth }}>
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        className={cn(
          "flex h-8 w-full cursor-pointer items-center justify-between border border-slate-300 bg-white px-[11px] text-left text-sm text-slate-800 outline-none transition-[border-color,box-shadow] hover:border-[rgb(74,171,240)] focus:border-[rgb(74,171,240)] focus:shadow-[0_0_0_2px_rgba(74,171,240,0.1)]",
          buttonClassName ?? "rounded-md",
        )}
      >
        <span className="truncate">{value}</span>
        <ChevronDown />
      </button>
      {menuOpen ? (
        <ul className="absolute left-0 right-0 z-20 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 shadow-[0_6px_16px_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                className={cn(
                  "flex w-full cursor-pointer px-3 py-1.5 text-left text-sm hover:bg-[rgb(247,240,255)]",
                  opt === value
                    ? "bg-[rgb(247,240,255)] text-[rgb(74,171,240)]"
                    : "text-slate-800",
                )}
                onClick={() => {
                  onChange(opt);
                  setMenuOpen(false);
                }}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function ApplyInvoiceDrawer({
  copy,
  open,
  onClose,
}: ApplyInvoiceDrawerProps) {
  const drawerCopy = copy.drawer;
  const feeTypeOptions = copy.feeTypeOptions;
  const titleTaxOptions = copy.titleTaxOptions;
  const invoiceTypeOptions = copy.invoiceTypeOptions;
  const titleId = useId();
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const [amount, setAmount] = useState("0.00");
  const [feeType, setFeeType] = useState<string>(feeTypeOptions[0]);
  const [titleTax, setTitleTax] = useState<string>(titleTaxOptions[0]);
  const [invoiceType, setInvoiceType] = useState<string>(invoiceTypeOptions[0]);
  const [emailOn, setEmailOn] = useState(false);
  const [smsOn, setSmsOn] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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
    const t = window.setTimeout(() => setVisible(false), 300);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!visible) return null;

  return (
    <div
      className="sf-cloud-console pointer-events-none fixed inset-0 z-[1000]"
      style={{ fontFamily: antFont }}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-auto absolute inset-0 bg-[rgba(2,6,23,0.45)] transition-opacity duration-300",
          entered ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "pointer-events-auto absolute right-0 top-0 flex h-full w-[530px] min-w-[530px] max-w-full flex-col bg-white shadow-[-6px_0_16px_rgba(0,0,0,0.08),-3px_0_6px_-4px_rgba(0,0,0,0.12),-9px_0_28px_8px_rgba(0,0,0,0.05)] transition-transform duration-300 ease-out",
          entered ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-14 shrink-0 items-center px-6 py-4">
          <button
            type="button"
            aria-label="关闭"
            onClick={onClose}
            className="mr-2 flex size-6 cursor-pointer items-center justify-center rounded text-slate-500 transition hover:bg-black/[0.06] hover:text-slate-800"
          >
            <CloseIcon />
          </button>
          <h2
            id={titleId}
            className="m-0 text-base font-semibold leading-6 text-slate-800"
          >
            {drawerCopy.title}
          </h2>
        </div>

        <div className="hidden-scrollbar flex-1 overflow-y-auto p-6">
          <div className="mb-4 rounded-[8px] border-none bg-[rgba(108,40,246,0.15)] px-3 py-2 text-sm leading-[22px] text-slate-800">
            <div>
              {drawerCopy.invoiceableLabel}{" "}
              <span className="text-2xl text-[rgb(108,40,246)]">
                {formatYuan(mockAmounts.invoiceable)}
              </span>
            </div>
            <div className="mt-0.5 text-sm text-slate-700">
              {drawerCopy.consumedLabel}{" "}
              <span className="font-semibold">
                {formatYuan(mockAmounts.consumed)}
              </span>
              {" - "}
              {drawerCopy.debtLabel}{" "}
              <span className="font-semibold">
                {formatYuan(mockAmounts.debt)}
              </span>
              {" - "}
              {drawerCopy.invoicedLabel}{" "}
              <span className="font-semibold">
                {formatYuan(mockAmounts.invoiced)}
              </span>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            <Field label={drawerCopy.amountLabel} required>
              <div className="flex h-8 w-full overflow-hidden rounded-md border border-slate-300">
                <span className="flex h-8 w-[37px] shrink-0 items-center justify-center border-r border-slate-300 bg-slate-50 px-[11px] text-sm text-slate-800">
                  ￥
                </span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={drawerCopy.amountPlaceholder}
                  className="h-8 min-w-0 flex-1 border-0 bg-white px-[11px] text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
            </Field>

            <Field label={drawerCopy.feeLabel}>
              <div className="flex w-full">
                <input
                  type="text"
                  disabled
                  placeholder={drawerCopy.feeFixedPlaceholder}
                  className="h-8 w-[183px] cursor-not-allowed rounded-l-md rounded-r-none border border-r-0 border-slate-300 bg-slate-50 px-[11px] text-sm text-slate-400 outline-none"
                />
                <SelectField
                  value={feeType}
                  options={feeTypeOptions}
                  onChange={setFeeType}
                  className="min-w-0 flex-1"
                  minWidth={300}
                  buttonClassName="rounded-l-none rounded-r-md"
                />
              </div>
            </Field>

            <SectionDivider label={drawerCopy.sectionInvoice} />

            <Field
              label={drawerCopy.titleTaxLabel}
              required
              help={
                <>
                  {drawerCopy.titleHelpBefore}
                  <a
                    href={copy.registerFormHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[rgb(108,40,246)] hover:text-[#b17dff]"
                  >
                    {copy.registerHere}
                  </a>
                </>
              }
            >
              <SelectField
                value={titleTax}
                options={titleTaxOptions}
                onChange={setTitleTax}
              />
            </Field>

            <Field label={drawerCopy.invoiceTypeLabel} required>
              <SelectField
                value={invoiceType}
                options={invoiceTypeOptions}
                onChange={setInvoiceType}
              />
            </Field>

            <SectionDivider label={drawerCopy.sectionReceive} />

            <div className="mb-6">
              <AntCheckbox
                checked={emailOn}
                onChange={setEmailOn}
                label={drawerCopy.emailReceive}
              />
              <p className="mb-2 text-sm leading-[22px] text-slate-500">
                {drawerCopy.emailHelpBefore}
                <a
                  href={copy.bindEmailHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[rgb(108,40,246)] hover:text-[#b17dff]"
                >
                  {drawerCopy.emailHelpLink}
                </a>
                {drawerCopy.emailHelpAfter}
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-8 w-full rounded-md border border-slate-300 bg-white px-[11px] text-sm text-slate-800 outline-none focus:border-[rgb(74,171,240)] focus:shadow-[0_0_0_2px_rgba(74,171,240,0.1)]"
              />
            </div>

            <div className="mb-6">
              <AntCheckbox
                checked={smsOn}
                onChange={setSmsOn}
                label={drawerCopy.smsReceive}
              />
              <p className="mb-2 text-sm leading-[22px] text-slate-500">
                {drawerCopy.smsHelpBefore}
                <a
                  href={copy.bindPhoneHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[rgb(108,40,246)] hover:text-[#b17dff]"
                >
                  {drawerCopy.smsHelpLink}
                </a>
                {drawerCopy.smsHelpAfter}
              </p>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-8 w-full rounded-md border border-slate-300 bg-white px-[11px] text-sm text-slate-800 outline-none focus:border-[rgb(74,171,240)] focus:shadow-[0_0_0_2px_rgba(74,171,240,0.1)]"
              />
            </div>

            <div
              className="my-6 h-px w-full"
              style={{ backgroundColor: DIVIDER_LINE }}
            />

            <button
              type="submit"
              className="inline-flex h-10 w-[120px] cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-transparent bg-[rgb(74,171,240)] px-[15px] text-base text-white shadow-[0_2px_0_rgba(74,171,240,0.06)] transition-colors hover:bg-[rgb(147,84,255)] active:bg-[rgb(79,25,207)]"
            >
              <SendIcon />
              {drawerCopy.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
