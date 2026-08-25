"use client";

import { useMemo, useState } from "react";
import type { PricingCategoryId, PricingChip } from "./content-types";
import { pricingData } from "./content";
import { PricingHero } from "./PricingHero";
import { PricingTable } from "./PricingTable";
import { PricingVendorChips } from "./PricingVendorChips";

const SECTION_KEYS = ["对话", "生图", "语音", "视频"] as const;

export function PricingPageClient() {
  const [category, setCategory] = useState<PricingCategoryId>("全部");
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [activeVendor, setActiveVendor] = useState<string | null>(null);

  const visibleSectionKeys = useMemo(() => {
    if (category === "全部") return [...SECTION_KEYS];
    return SECTION_KEYS.filter((k) => k === category);
  }, [category]);

  const chips = useMemo(() => {
    if (category === "全部") return pricingData.chips;
    const vendors = new Set(
      pricingData.sections[category].groups.map((g) => g.vendor),
    );
    return pricingData.chips.filter((c) => vendors.has(c.name));
  }, [category]);

  function onSelectChip(chip: PricingChip) {
    setActiveVendor(chip.name);
    const el = document.getElementById(chip.providerId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <>
      <PricingHero
        category={category}
        searchInput={searchInput}
        onCategoryChange={(c) => {
          setCategory(c);
          setActiveVendor(null);
        }}
        onSearchInputChange={setSearchInput}
        onSearch={() => setQuery(searchInput.trim())}
      />

      <section className="relative mx-auto w-full max-w-[1440px] px-4 pb-[72px] 2xl:px-0">
        <PricingVendorChips
          chips={chips}
          activeVendor={activeVendor}
          onSelect={onSelectChip}
        />
        <div className="space-y-9 pt-7">
          {visibleSectionKeys.map((key) => (
            <PricingTable
              key={key}
              section={pricingData.sections[key]}
              query={query}
            />
          ))}
        </div>
      </section>
    </>
  );
}
