"use client";

import Image from "next/image";
import { useLocale } from "@/components/shared/LocaleProvider";
import { cardVariants } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getModelsContent, modelDetailHref } from "./content";
import type { ModelCardData } from "./content-types";

export function ModelCard({ model }: { model: ModelCardData }) {
  const { locale } = useLocale();
  const { modelCard: copy, typeLabels } = getModelsContent(locale);
  const href = modelDetailHref(model.modelId);
  const typeLabel = typeLabels[model.type] ?? model.type;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        cardVariants({
          variant: "surface",
          interactive: "lift",
          size: "md",
        }),
        "h-[210px] w-full cursor-pointer hover:bg-[#4AABF01A] max-md:h-auto max-md:min-h-[210px] min-[1490px]:h-auto min-[1490px]:min-h-[210px]",
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <Image
            src={model.logo}
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
            unoptimized
          />
          <span className="text-sm text-slate-500">{model.vendor}</span>
        </div>
        <span className="inline-flex h-[22px] items-center rounded border border-[#91CAFF] bg-[#E6F4FF] px-[7px] text-xs leading-5 text-[#0958D9]">
          {typeLabel}
        </span>
      </div>

      <div className="mb-3.5 group-hover:hidden">
        <div className="mb-1 truncate text-base font-semibold text-slate-800">
          {model.modelId}
        </div>
        <div className="mb-4 text-xs text-slate-500">{model.published}</div>
        {model.sceneTags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {model.sceneTags.map((tag) => (
              <span
                key={tag}
                className="mr-0 inline-flex h-[22px] items-center rounded border border-[#91CAFF] bg-[#EEF7FD] px-[7px] text-xs font-medium leading-5"
              >
                <span className="text-[#4AABF0]">{tag}</span>
              </span>
            ))}
          </div>
        ) : (
          <div />
        )}
      </div>

      <div className="mb-3 hidden group-hover:block">
        <div className="mb-2 line-clamp-2 text-sm text-slate-800">
          {model.description}
        </div>
        {model.features.length > 0 ? (
          <div>
            <div className="text-sm text-slate-500">{copy.featuresLabel}</div>
            <div className="flex flex-wrap gap-1.5">
              {model.features.map((f) => (
                <span key={f} className="text-sm text-slate-800">
                  {f}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="mb-2.5 h-px w-full border-b border-[var(--sf-card-border)] group-hover:border-slate-400" />

      <div className="flex items-center justify-between text-xs text-slate-500 group-hover:hidden">
        {model.inputPrice || model.outputPrice ? (
          <>
            <div>
              {copy.inputLabel}{" "}
              <span className="text-[#4AABF0]">￥{model.inputPrice || "—"}</span>{" "}
              {copy.perMTokens}
            </div>
            <div>
              {copy.outputLabel}{" "}
              <span className="text-[#4AABF0]">
                ￥{model.outputPrice || "—"}
              </span>{" "}
              {copy.perMTokens}
            </div>
          </>
        ) : (
          <>
            <div>
              {copy.contextLabel}{" "}
              <span className="text-[#4AABF0]">{model.context}</span>
            </div>
            <div>
              {copy.sizeLabel}
              <span className="text-[#4AABF0]">{model.size}</span>
            </div>
          </>
        )}
      </div>

      <div className="hidden items-center justify-between text-xs text-slate-500 group-hover:flex">
        <div>
          {copy.contextLabel}{" "}
          <span className="text-[#4AABF0]">{model.context}</span>
        </div>
        <div>
          {copy.sizeLabel}
          <span className="text-[#4AABF0]">{model.size}</span>
        </div>
      </div>
    </a>
  );
}
