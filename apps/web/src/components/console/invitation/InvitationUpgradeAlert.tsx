"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { inviterPlanHref } from "./content";
import { getInvitationUiCopy } from "./invitation-ui-copy";

export function InvitationUpgradeAlert() {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getInvitationUiCopy(targetLocale), [targetLocale]);

  return (
    <div
      role="alert"
      className="mb-3 flex w-full items-center rounded-[8px] border border-[#FFE58F] bg-[#FFFBF0] px-3 py-2 text-slate-700"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
      }}
    >
      <div className="w-full">
        <div className="text-sm font-medium leading-5">
          {copy.upgradeAlertPrefix}
          <Link
            href={inviterPlanHref}
            className="text-[rgb(74,171,240)] no-underline transition-colors duration-300 hover:text-[#b17dff]"
          >
            {copy.inviterPlanLabel}
          </Link>
          {copy.upgradeAlertSuffix}
        </div>
      </div>
    </div>
  );
}
