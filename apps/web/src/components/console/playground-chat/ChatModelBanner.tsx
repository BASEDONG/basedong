"use client";

import Link from "next/link";
import { APP_ROUTES, consoleHref } from "@/lib/routes";
import type { PlaygroundUiCopy } from "../shared/playground-ui-copy";
import { WarningTriangleIcon } from "./icons";

interface ChatModelBannerProps {
  copy: PlaygroundUiCopy;
  model: string;
}

export function ChatModelBanner({ copy, model }: ChatModelBannerProps) {
  return (
    <div className="relative mb-2 flex h-9 w-full items-center justify-between gap-3 whitespace-nowrap rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm leading-5 text-slate-700">
      <span className="min-w-0 truncate font-medium">{model}</span>
      <div className="flex min-w-0 items-center gap-2">
        <WarningTriangleIcon className="shrink-0 text-lg text-amber-500" />
        <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-slate-500">
          {copy.feeBannerBefore}
          <Link
            href={consoleHref(APP_ROUTES.consoleModels)}
            className="text-[rgb(74,171,240)] hover:underline"
          >
            {copy.modelDetails}
          </Link>
        </span>
      </div>
    </div>
  );
}
