"use client";

import type { ModelCardData } from "./content-types";
import { CatalogIcon } from "@/components/shared/CatalogIcon";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getModelsUiCopy, getTypeTagLabel } from "./models-ui-copy";

interface ModelCardProps {
  model: ModelCardData;
  onSelect?: (model: ModelCardData) => void;
}

const TYPE_TAG_STYLES: Record<string, string> = {
  文本:
    "border-[rgb(145,202,255)] bg-[rgb(230,244,255)] text-[rgb(9,88,217)]",
  图像:
    "border-[rgb(135,232,222)] bg-[rgb(230,255,251)] text-[rgb(8,151,156)]",
  视频:
    "border-[rgb(211,173,247)] bg-[rgb(249,240,255)] text-[rgb(83,29,171)]",
  语音:
    "border-[rgb(255,187,150)] bg-[rgb(255,242,232)] text-[rgb(212,56,13)]",
};

export function ModelCard({ model, onSelect }: ModelCardProps) {
  const { targetLocale } = useLocale();
  const ui = getModelsUiCopy(targetLocale);

  return (
    <Card
      role="button"
      tabIndex={0}
      variant="surface"
      interactive="lift"
      onClick={() => onSelect?.(model)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(model);
        }
      }}
      className="relative h-[120px] min-w-0 cursor-pointer justify-between p-4 hover:bg-[#4AABF01A]"
    >
      {model.badge ? (
        <div
          className={`tag absolute right-0 top-0 z-10 flex items-center justify-center rounded-bl-[6px] px-1 py-0.5 text-xs text-white ${
            model.badge.includes("限免")
              ? "bd-gradient-bg"
              : "bg-[#EF4444]"
          }`}
        >
          {model.badge}
        </div>
      ) : null}

      <div className="relative h-12 min-w-0 shrink-0 pl-[54px]">
        <div className="absolute left-0 top-1 flex h-full w-12 items-center justify-center">
          <CatalogIcon value={model.logo} size={40} className="size-10" />
        </div>
        <div className="flex h-full min-w-0 w-full flex-col justify-center text-slate-800">
          <div className="w-full truncate break-all align-top text-base font-semibold text-slate-800">
            {model.title}
          </div>
          <div className="flex h-5 min-w-0 items-center gap-2 text-xs text-slate-500">
            <span className="truncate">{model.provider}</span>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 w-full shrink-0 gap-2 overflow-hidden">
        {model.deprecated ? (
          <span className="m-0 inline-flex h-[22px] shrink-0 items-center rounded border border-transparent bg-[rgb(203,213,225)] px-[7px] text-xs text-white">
            Deprecated
          </span>
        ) : null}
        {model.typeTags.map((tag) => (
          <span
            key={tag}
            className={`m-0 inline-flex h-[22px] shrink-0 items-center rounded border px-[7px] text-xs ${TYPE_TAG_STYLES[tag] ?? "border-transparent bg-[var(--sf-cloud-primary-chip)] text-[var(--sf-cloud-primary)]"}`}
          >
            {getTypeTagLabel(ui, tag)}
          </span>
        ))}
      </div>
    </Card>
  );
}
