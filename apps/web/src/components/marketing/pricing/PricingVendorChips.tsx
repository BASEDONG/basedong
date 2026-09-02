"use client";

import { cn } from "@/lib/utils";
import type { PricingChip } from "./content-types";
import { logoSrc } from "./content";

type PricingVendorChipsProps = {
  chips: PricingChip[];
  activeVendor: string | null;
  onSelect: (chip: PricingChip) => void;
};

export function PricingVendorChips({
  chips,
  activeVendor,
  onSelect,
}: PricingVendorChipsProps) {
  if (!chips.length) return null;

  return (
    <div className="bg-white py-4">
      <div className="flex flex-wrap gap-3">
        {chips.map((chip) => {
          const active = activeVendor === chip.name;
          return (
            <button
              key={chip.name}
              type="button"
              onClick={() => onSelect(chip)}
              className={cn(
                "inline-flex h-[34px] items-center gap-2 rounded-full border px-4 text-[13px] font-semibold transition duration-150",
                active
                  ? "border-[#4AABF0] bg-[#EEF7FD] text-[#4AABF0]"
                  : "border-[#DDE5F0] bg-white text-slate-600 hover:border-[#4AABF0]",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoSrc(chip.logoFile, chip.logo)}
                alt=""
                className="h-[18px] w-[18px] rounded-full object-contain"
              />
              {chip.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
