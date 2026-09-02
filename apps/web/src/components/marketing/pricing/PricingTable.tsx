"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/components/shared/LocaleProvider";
import { cn } from "@/lib/utils";
import type {
  PricingModel,
  PricingSection,
  PricingVendorGroup,
} from "./content-types";
import { logoSrc } from "./content";
import { getPricingUiCopy } from "./pricing-ui-copy";

function PriceValue({ value, freeLabel }: { value: string; freeLabel: string }) {
  if (value === "-" || value === "") {
    return (
      <span className="inline-flex w-[82px] justify-center font-semibold text-slate-300">
        -
      </span>
    );
  }
  if (value === "免费" || value === freeLabel) {
    return (
      <span className="inline-flex w-[82px] justify-center">
        <span className="inline-flex min-w-[58px] justify-center rounded-full bg-slate-100 px-3 py-1 text-[13px] font-semibold leading-5 text-slate-500">
          {freeLabel}
        </span>
      </span>
    );
  }
  return (
    <span className="inline-flex w-[82px] justify-center font-semibold leading-5 text-[#4AABF0]">
      {value}
    </span>
  );
}

function ModelRow({
  model,
  priceColumns,
  variant,
  striped,
  vendor,
  showVendor,
  freeLabel,
}: {
  model: PricingModel;
  priceColumns: number;
  variant: "chat" | "media";
  striped: boolean;
  vendor: PricingVendorGroup;
  showVendor: boolean;
  freeLabel: string;
}) {
  const tierCount = Math.max(1, model.tiers.length);
  const rowBg = striped ? "bg-[#EEF7FD]" : "bg-transparent";
  const vendorWidth = variant === "chat" ? "md:w-[210px]" : "md:w-[170px]";

  const vendorCell = (
    <div
      className={cn(
        "flex shrink-0 items-center gap-3 px-5 py-4 text-[14px] font-semibold text-slate-700 md:items-start md:border-r md:border-[#E1E8F2]",
        vendorWidth,
      )}
    >
      {showVendor ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc(vendor.logoFile, vendor.logo)}
            alt=""
            className="h-[18px] w-[18px] rounded-full object-contain"
          />
          {vendor.vendor}
        </>
      ) : null}
    </div>
  );

  if (variant === "media") {
    const price = model.tiers[0]?.values[0] ?? "-";
    return (
      <div
        className={cn(
          "flex min-h-[48px] scroll-mt-[120px] items-stretch border-b border-[#E1E8F2] text-[13px] transition-colors last:border-b-0 md:min-h-[60px]",
          rowBg,
        )}
      >
        {vendorCell}
        <div className="grid min-w-0 flex-1 md:grid-cols-[minmax(240px,1fr)_165px_165px_165px]">
          <div className="flex min-w-0 items-center px-5 py-4">
            <div className="min-w-0">
              <a
                href={model.href}
                target="_blank"
                rel="noreferrer"
                title={model.modelId}
                className="block truncate font-semibold text-slate-700 transition-colors duration-150 hover:text-[#4AABF0]"
              >
                {model.displayName}
              </a>
              <div className="mt-1 truncate text-[12px] text-slate-400 md:hidden">
                {model.modelId}
              </div>
            </div>
          </div>
          <div className="flex min-h-[60px] items-center justify-center px-5 py-2 text-[#4AABF0]">
            <PriceValue value={price} freeLabel={freeLabel} />
          </div>
          <div />
          <div />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex min-h-[48px] scroll-mt-[120px] items-stretch border-b border-[#E1E8F2] text-[13px] transition-colors last:border-b-0 md:min-h-[60px]",
        rowBg,
      )}
    >
      {vendorCell}
      <div
        className={cn(
          "grid min-w-0 flex-1",
          "md:grid-cols-[minmax(260px,1fr)_minmax(210px,1fr)_minmax(210px,1fr)_minmax(250px,1fr)]",
        )}
      >
        <div
          className="min-w-0 px-5 py-4"
          style={{ gridRow: `span ${tierCount} / span ${tierCount}` }}
        >
          <a
            href={model.href}
            target="_blank"
            rel="noreferrer"
            title={model.modelId}
            className="block truncate font-semibold text-slate-700 transition-colors duration-150 hover:text-[#4AABF0]"
          >
            {model.displayName}
          </a>
          <div className="mt-1 truncate text-[12px] text-slate-400 md:hidden">
            {model.modelId}
          </div>
        </div>

        {model.tiers.map((tier, ti) =>
          Array.from({ length: priceColumns }).map((_, ci) => {
            const value = tier.values[ci] ?? "-";
            const showLabel = Boolean(tier.label) && value !== "-" && value !== "";
            return (
              <div
                key={`${model.modelId}-${ti}-${ci}`}
                className={cn(
                  "flex min-h-[60px] items-center justify-between gap-3 border-l border-[#E1E8F2] px-5 py-3",
                  ti > 0 && "border-t border-[#E1E8F2]",
                )}
              >
                <span
                  className={cn(
                    showLabel
                      ? "min-w-0 flex-1 text-[13px] leading-5 text-slate-500"
                      : "flex-1",
                  )}
                >
                  {showLabel ? <span className="block">{tier.label}</span> : null}
                </span>
                <PriceValue value={value} freeLabel={freeLabel} />
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}

type PricingTableProps = {
  section: PricingSection;
  query: string;
};

export function PricingTable({ section, query }: PricingTableProps) {
  const { locale } = useLocale();
  const ui = getPricingUiCopy(locale);
  const freeLabel = ui.free;
  const q = query.trim().toLowerCase();
  const variant: "chat" | "media" =
    section.priceColumns === 3 ? "chat" : "media";

  const filteredGroups = useMemo(() => {
    return section.groups
      .map((g) => {
        if (!q) return g;
        const models = g.models.filter(
          (m) =>
            m.displayName.toLowerCase().includes(q) ||
            m.modelId.toLowerCase().includes(q),
        );
        return { ...g, models, initialVisible: models.length };
      })
      .filter((g) => g.models.length > 0);
  }, [section.groups, q]);

  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const tableRows = useMemo(() => {
    const rows: {
      group: PricingVendorGroup;
      model: PricingModel;
      showVendor: boolean;
      striped: boolean;
      isFirstOfGroup: boolean;
      hiddenAfter: number;
    }[] = [];

    let rowIndex = 0;
    for (const group of filteredGroups) {
      const expanded =
        expandedIds[group.providerId] ??
        group.models.length <= group.initialVisible;
      const visibleCount = expanded
        ? group.models.length
        : group.initialVisible;
      const visibleModels = group.models.slice(0, visibleCount);
      const hidden = group.models.length - visibleCount;

      visibleModels.forEach((model, modelIndex) => {
        rows.push({
          group,
          model,
          showVendor: modelIndex === 0,
          striped: rowIndex % 2 === 0,
          isFirstOfGroup: modelIndex === 0,
          hiddenAfter: modelIndex === visibleModels.length - 1 ? hidden : 0,
        });
        rowIndex += 1;
      });
    }
    return rows;
  }, [filteredGroups, expandedIds]);

  if (!filteredGroups.length) return null;

  const headerCols =
    variant === "chat"
      ? "grid-cols-[210px_minmax(260px,1fr)_minmax(210px,1fr)_minmax(210px,1fr)_minmax(250px,1fr)]"
      : "grid-cols-[170px_minmax(240px,1fr)_165px_165px_165px]";

  const headers =
    variant === "chat"
      ? section.headers
      : [section.headers[0], section.headers[1], section.headers[2], "", ""];

  return (
    <section>
      <h2 className="mb-4 text-[18px] font-bold text-slate-800">
        {section.title}
      </h2>
      <Card variant="surface" className="rounded-lg border-[#E1E8F2]">
        <div
          className={cn(
            "hidden min-h-[46px] items-center border-b border-[#E1E8F2] bg-[#F8FAFD] text-[13px] font-semibold text-slate-600 md:grid",
            headerCols,
          )}
        >
          {headers.map((h, i) => (
            <div
              key={`${h}-${i}`}
              className={cn(
                "px-5",
                variant === "chat" && i >= 2 && "whitespace-nowrap text-right",
                variant === "media" && i === 2 && "whitespace-nowrap text-center",
              )}
            >
              {h}
            </div>
          ))}
        </div>

        {tableRows.map((row) => (
          <div
            key={row.model.modelId}
            id={row.isFirstOfGroup ? row.group.providerId : undefined}
            className={row.isFirstOfGroup ? "scroll-mt-[120px]" : undefined}
          >
            <ModelRow
              model={row.model}
              priceColumns={section.priceColumns}
              variant={variant}
              striped={row.striped}
              vendor={row.group}
              showVendor={row.showVendor}
              freeLabel={freeLabel}
            />
            {row.hiddenAfter > 0 && (
              <button
                type="button"
                onClick={() =>
                  setExpandedIds((prev) => ({
                    ...prev,
                    [row.group.providerId]: true,
                  }))
                }
                className="flex h-[52px] w-full items-center justify-center gap-2 border-b border-[#E1E8F2] text-[13px] font-semibold text-[#4AABF0] transition duration-150 hover:bg-[#F0F7FC] last:border-b-0"
              >
                {ui.expandMore(row.hiddenAfter)}
                <ChevronDown className="h-4 w-4" aria-hidden />
              </button>
            )}
          </div>
        ))}
      </Card>
    </section>
  );
}
