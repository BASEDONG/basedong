"use client";

import { WarningTriangleIcon } from "./icons";

interface ChatModelBannerProps {
  model: string;
}

export function ChatModelBanner({ model }: ChatModelBannerProps) {
  return (
    <div className="relative mb-2 flex h-9 w-full items-center justify-between whitespace-nowrap rounded-[8px] bg-[#EBE5F8] px-4 py-1.5 text-sm leading-5 text-[#333]">
      {model}
      <div className="flex items-center gap-2">
        <WarningTriangleIcon className="shrink-0 text-lg text-[#FAAD14]" />
        <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
          在线体验将按照用量产生费用，详见
          <button
            type="button"
            className="inline-flex h-6 items-center rounded px-[7px] text-sm leading-5 text-[rgb(74,171,240)] hover:underline"
          >
            模型详情
          </button>
        </span>
      </div>
      <div />
    </div>
  );
}
