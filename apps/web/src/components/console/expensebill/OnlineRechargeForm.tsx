"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { ASSET, amountPresets, copy, formatYuan } from "./content";
import { DownIcon } from "./icons";

type PayMethod = "alipay" | "wechat";

interface OnlineRechargeFormProps {
  amount: number | "other";
  customAmount: number;
  onAmountChange: (v: number | "other") => void;
  onCustomAmountChange: (v: number) => void;
}

function FieldLabel({ children }: { children: string }) {
  return (
    <div className="mr-2 flex h-[42px] min-w-[80px] items-center justify-center text-sm text-slate-500">
      {children}：
    </div>
  );
}

function ChoiceBtn({
  selected,
  onClick,
  className,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-[50px] cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-6 text-base shadow-sm transition-[color,border-color,background] duration-200 ease-[cubic-bezier(0.645,0.045,0.355,1)]",
        selected
          ? "border border-[rgb(74,171,240)] bg-transparent text-[rgb(74,171,240)]"
          : "border border-slate-300 bg-white text-slate-800",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function OnlineRechargeForm({
  amount,
  customAmount,
  onAmountChange,
  onCustomAmountChange,
}: OnlineRechargeFormProps) {
  const [captchaDone, setCaptchaDone] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [payMethod, setPayMethod] = useState<PayMethod>("alipay");
  const [otherOpen, setOtherOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const effectiveAmount = amount === "other" ? customAmount : amount;
  const canPay = captchaDone && agreed && effectiveAmount > 0;

  useLayoutEffect(() => {
    if (!otherOpen || !triggerRef.current) {
      setMenuPos(null);
      return;
    }
    const sync = () => {
      const r = triggerRef.current?.getBoundingClientRect();
      if (!r) return;
      setMenuPos({
        top: r.bottom + 4,
        left: r.left,
        width: r.width,
      });
    };
    sync();
    window.addEventListener("scroll", sync, true);
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync, true);
      window.removeEventListener("resize", sync);
    };
  }, [otherOpen]);

  useEffect(() => {
    if (!otherOpen) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || menuRef.current?.contains(t)) {
        return;
      }
      setOtherOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [otherOpen]);

  return (
    <div className="flex max-w-[660px] flex-col gap-4">
      <div className="flex place-items-baseline">
        <FieldLabel>{copy.payAmount}</FieldLabel>
        <div className="flex flex-1 flex-col gap-4">
          <div className="grid grid-cols-4 gap-4">
            {amountPresets.map((n) => (
              <ChoiceBtn
                key={n}
                selected={amount === n}
                onClick={() => onAmountChange(n)}
              >
                {formatYuan(n)}
              </ChoiceBtn>
            ))}
            <ChoiceBtn
              selected={amount === "other"}
              onClick={() => onAmountChange("other")}
            >
              {copy.otherAmount}
            </ChoiceBtn>
          </div>
        </div>
      </div>

      {amount === "other" ? (
        <div className="flex items-center">
          <FieldLabel>{copy.otherAmount}</FieldLabel>
          <div className="flex flex-1 flex-col gap-4">
            <input
              type="number"
              min={0}
              step="any"
              placeholder="0.00"
              value={Number.isFinite(customAmount) ? customAmount : ""}
              onChange={(e) =>
                onCustomAmountChange(Number.parseFloat(e.target.value) || 0)
              }
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-base text-slate-800 outline-none focus:border-[rgb(74,171,240)]"
            />
          </div>
        </div>
      ) : null}

      <div className="flex items-center">
        <FieldLabel>{copy.payMethod}</FieldLabel>
        <div className="flex flex-1 flex-col gap-4">
          <div className="relative grid grid-cols-4 gap-4">
            <button
              type="button"
              onClick={() => {
                setPayMethod("alipay");
                setOtherOpen(false);
              }}
              className={cn(
                "inline-flex h-[50px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border px-3 py-6 text-sm shadow-sm transition-[color,border-color,background] duration-200 ease-[cubic-bezier(0.645,0.045,0.355,1)]",
                payMethod === "alipay"
                  ? "border-[rgb(74,171,240)] bg-transparent text-[rgb(74,171,240)]"
                  : "border-slate-300 bg-white text-slate-800",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ASSET.alipay} alt="" className="h-[18px] w-[18px]" />
              {copy.alipay}
            </button>
            <button
              ref={triggerRef}
              type="button"
              aria-haspopup="menu"
              aria-expanded={otherOpen}
              onClick={() => setOtherOpen((v) => !v)}
              className={cn(
                "inline-flex h-[50px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border px-3 py-6 text-sm shadow-sm transition-[color,border-color,background] duration-200 ease-[cubic-bezier(0.645,0.045,0.355,1)]",
                payMethod === "wechat"
                  ? "border-[rgb(114,46,209)] bg-transparent text-[rgb(114,46,209)]"
                  : "border-gray-300 bg-white text-gray-600",
              )}
              style={
                payMethod === "wechat"
                  ? { borderColor: "rgb(114, 46, 209)", color: "rgb(114, 46, 209)" }
                  : undefined
              }
            >
              {payMethod === "wechat" ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ASSET.wechat}
                    alt=""
                    className="h-[18px] w-[18px]"
                  />
                  {copy.wechatShort}
                </>
              ) : (
                copy.otherPay
              )}
              <span className="inline-flex text-xs leading-none" aria-hidden>
                <DownIcon className="text-xs" />
              </span>
            </button>
            {otherOpen && menuPos
              ? createPortal(
                  <div
                    ref={menuRef}
                    className="fixed z-[1050]"
                    style={{
                      top: menuPos.top,
                      left: menuPos.left,
                      width: menuPos.width,
                      minWidth: menuPos.width,
                    }}
                  >
                    <ul
                      role="menu"
                      className="m-0 list-none rounded-lg bg-white p-1 text-sm text-slate-800 shadow-[0_6px_16px_0_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]"
                    >
                      <li role="none">
                        <button
                          type="button"
                          role="menuitem"
                          className="flex w-full cursor-pointer items-center rounded px-3 py-[5px] text-left text-sm leading-[22px] text-slate-800 hover:bg-black/[0.04]"
                          onClick={() => {
                            setPayMethod("wechat");
                            setOtherOpen(false);
                          }}
                        >
                          <span className="flex items-center gap-2 py-1">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={ASSET.wechat}
                              alt=""
                              className="h-[18px] w-[18px]"
                            />
                            {copy.wechatPay}
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>,
                  document.body,
                )
              : null}
          </div>
        </div>
      </div>

      <div className="mb-3 ml-[86px] min-h-[42px] max-w-[330px]">
        <button
          type="button"
          onClick={() => setCaptchaDone(true)}
          className={cn(
            "relative flex h-10 w-[330px] cursor-pointer items-center rounded-[2px] border border-[#e4e7eb] bg-[#f7f9fa] px-2 text-left text-sm text-[#45494c]",
            captchaDone && "border-green-400 bg-green-50 text-green-700",
          )}
        >
          <span
            className={cn(
              "relative mr-[5px] inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_1px_rgba(188,196,204,0.5)]",
              captchaDone && "text-green-600",
            )}
          >
            <span
              className={cn(
                "size-2 rounded-full",
                captchaDone ? "bg-green-500" : "bg-sky-400",
              )}
            />
          </span>
          <span className="leading-[38px]">
            {captchaDone ? copy.captchaSuccess : copy.captcha}
          </span>
        </button>
      </div>

      <div>
        <button
          type="button"
          disabled={!canPay}
          className={cn(
            "ml-[86px] inline-flex h-11 w-[280px] items-center justify-center rounded-lg border px-[15px] text-base transition-[background] duration-200 ease-[cubic-bezier(0.645,0.045,0.355,1)]",
            canPay
              ? "cursor-pointer border-transparent bg-[rgb(74,171,240)] text-white shadow-[0_2px_0_0_rgba(74,171,240,0.06)] hover:bg-[#5b21e6]"
              : "cursor-not-allowed border-slate-300 bg-slate-50 text-slate-400",
          )}
        >
          {copy.confirmPay}
        </button>
      </div>

      <div className="ml-[86px] flex items-center text-sm text-slate-500">
        <input
          id="expensebill-agree"
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mr-2 size-4 cursor-pointer rounded border-slate-300 accent-[rgb(74,171,240)]"
        />
        <div>
          <label
            htmlFor="expensebill-agree"
            className="cursor-pointer text-slate-500"
          >
            {copy.agreePrefix}
          </label>
          <a
            href={copy.agreeHref}
            target="_blank"
            rel="noreferrer"
            className="text-[rgb(108,40,246)] hover:underline"
          >
            {copy.agreeLink}
          </a>
        </div>
      </div>
    </div>
  );
}
