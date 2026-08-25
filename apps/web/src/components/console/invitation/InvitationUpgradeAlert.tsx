import Link from "next/link";
import { copy } from "./content";

export function InvitationUpgradeAlert() {
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
          🎉 邀请活动已升级，详细规则请查看
          <Link
            href={copy.inviterPlanHref}
            className="text-[rgb(74,171,240)] no-underline transition-colors duration-300 hover:text-[#b17dff]"
          >
            {copy.inviterPlanLabel}
          </Link>
          ！
        </div>
      </div>
    </div>
  );
}
