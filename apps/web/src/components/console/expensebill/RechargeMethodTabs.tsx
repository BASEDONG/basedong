"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ASSET, copy, type RechargeMethod } from "./content";
import { CheckCircleIcon } from "./icons";

interface RechargeMethodTabsProps {
  method: RechargeMethod;
  onChange: (m: RechargeMethod) => void;
  warningEnabled?: boolean;
  onWarningClick?: () => void;
}

export function RechargeMethodTabs({
  method,
  onChange,
  warningEnabled = true,
  onWarningClick,
}: RechargeMethodTabsProps) {
  const items: { key: RechargeMethod; label: ReactNode }[] = [
    { key: "online", label: copy.online },
    {
      key: "auto",
      label: (
        <span className="inline-flex items-center gap-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSET.alipay} alt="" width={20} height={20} />
          {copy.auto}
          <span className="!m-0 !ml-1 rounded-full bg-slate-200 px-2 py-0 text-xs font-normal text-slate-500">
            {copy.autoOff}
          </span>
        </span>
      ),
    },
  ];

  return (
    <div className="relative mb-4 flex h-[62px] items-center justify-between">
      <div
        role="tablist"
        className="relative flex flex-1 items-center border-b border-slate-200"
      >
        {items.map((item, index) => {
          const active = method === item.key;
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(item.key)}
              className={cn(
                "relative flex h-[62px] cursor-pointer items-center py-4 transition-colors duration-300",
                index > 0 && "ml-8",
                active ? "text-[rgb(74,171,240)]" : "text-slate-700",
              )}
            >
              <span className="px-6 text-lg font-semibold">{item.label}</span>
              {active ? (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[rgb(74,171,240)]" />
              ) : null}
            </button>
          );
        })}
      </div>

      <span className="ml-3 shrink-0">
        <button
          type="button"
          onClick={onWarningClick}
          className="inline-flex h-8 cursor-pointer items-center gap-2 rounded-md border border-transparent px-2 py-0 text-sm shadow-[0_2px_0_0_rgba(74,171,240,0.06)]"
          style={
            warningEnabled
              ? {
                  backgroundColor: "rgb(220, 252, 231)",
                  color: "rgb(22, 163, 74)",
                }
              : {
                  backgroundColor: "rgb(241, 245, 249)",
                  color: "rgb(100, 116, 139)",
                }
          }
        >
          <CheckCircleIcon className="size-3.5" />
          {warningEnabled ? copy.warningOn : copy.warningOffChip}
        </button>
      </span>
    </div>
  );
}
