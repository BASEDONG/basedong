"use client";

import { useMemo } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { docsUrl } from "./content";
import { getBatchesUiCopy } from "./batches-ui-copy";

interface BatchesToolbarProps {
  onCreate: () => void;
}

export function BatchesToolbar({ onCreate }: BatchesToolbarProps) {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getBatchesUiCopy(targetLocale), [targetLocale]);

  return (
    <div className="flex w-full items-center justify-between overflow-hidden">
      <div className="flex items-center">
        <button
          type="button"
          onClick={onCreate}
          className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-transparent bg-[rgb(74,171,240)] px-[15px] text-sm leading-5 text-white shadow-[0_2px_0_0_rgba(74,171,240,0.06)] transition-[background,opacity] duration-200 ease-[cubic-bezier(0.645,0.045,0.355,1)] hover:bg-[#5b21e6]"
        >
          <span>🔥 </span>
          {copy.createTask}
        </button>
      </div>
      <div className="flex gap-3">
        <a
          href={docsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-transparent bg-[rgb(239,233,253)] px-[15px] text-base leading-6 text-[rgb(74,171,240)] shadow-[0_2px_0_0_rgba(74,171,240,0.06)] transition-[background,opacity] duration-200 ease-[cubic-bezier(0.645,0.045,0.355,1)] hover:bg-[#e4daf9]"
        >
          <span>📖 </span>
          {copy.referenceDocs}
        </a>
      </div>
    </div>
  );
}
