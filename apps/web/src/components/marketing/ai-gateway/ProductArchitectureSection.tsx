"use client";

import {
  Bot,
  BookOpen,
  Database,
  GitBranch,
  Image,
  Layers,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import {
  ArchAppsLayer,
  ArchDividerLayer,
  ArchSectionLayer,
  type ArchTheme,
} from "@/components/marketing/enterprise/EnterpriseArchLayers";
import { useLocale } from "@/components/shared/LocaleProvider";
import { Card } from "@/components/ui/card";
import { getGatewayContent } from "./content";
import type { GatewayArchLayer } from "./content-types";
import { getGatewayUiCopy } from "./gateway-ui-copy";

const ARCH_THEME: ArchTheme = {
  accent: "#4AABF0",
  secondary: "#02F6F7",
};

/** Index-aligned with apps-layer modules (Agent → 多模态 order in zh-CN source). */
const APP_MODULE_ICONS: LucideIcon[] = [
  Bot,
  BookOpen,
  MessageSquare,
  GitBranch,
  Layers,
  Database,
  Image,
];

function tint(color: string, alpha: number) {
  return `color-mix(in srgb, ${color} ${alpha}%, transparent)`;
}

function PrivateMaasPanel({
  title,
  modules,
  theme,
}: {
  title: string;
  modules: string[];
  theme: ArchTheme;
}) {
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-xl border bg-white"
      style={{ borderColor: tint(theme.accent, 50) }}
    >
      <div
        className="px-4 py-3.5 text-center text-[16px] font-semibold text-[#1E293B] md:text-[18px]"
        style={{ backgroundColor: tint(theme.accent, 20) }}
      >
        {title}
      </div>
      <div className="grid flex-1 grid-cols-2 content-center gap-3 p-4 md:p-5">
        {modules.map((label) => (
          <div
            key={label}
            className="flex aspect-square max-h-[136px] w-full items-center justify-center justify-self-center rounded-lg border px-2.5 text-center text-[14px] font-medium leading-snug text-[#1E293B] md:max-h-[152px] md:text-[15px]"
            style={{
              borderColor: tint(theme.accent, 20),
              backgroundColor: tint(theme.accent, 5),
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

function renderArchLayer(layer: GatewayArchLayer, theme: ArchTheme) {
  switch (layer.kind) {
    case "apps":
      return (
        <ArchAppsLayer
          key={layer.title}
          title={layer.title}
          modules={layer.modules}
          theme={theme}
          renderModule={(label, index) => {
            const Icon = APP_MODULE_ICONS[index];
            return (
              <div className="flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/40 px-3.5 py-3 text-[15px] font-medium text-[#1E293B]">
                {Icon ? (
                  <Icon
                    className="size-5 shrink-0 text-[#4AABF0]"
                    aria-hidden="true"
                    strokeWidth={2}
                  />
                ) : null}
                <span>{label}</span>
              </div>
            );
          }}
        />
      );
    case "divider":
      return (
        <ArchDividerLayer
          key={layer.title}
          title={layer.title}
          theme={theme}
        />
      );
    case "section":
      return (
        <ArchSectionLayer
          key={layer.title}
          title={layer.title}
          modules={layer.modules}
          theme={theme}
          columns="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        />
      );
    case "parallel-vendors":
      return (
        <div
          key={`${layer.left.title}-${layer.right.title}`}
          className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[1.55fr_1fr]"
        >
          <ArchSectionLayer
            title={layer.left.title}
            modules={layer.left.vendors}
            theme={theme}
            columns="grid-cols-2 sm:grid-cols-4"
          />
          <PrivateMaasPanel
            title={layer.right.title}
            modules={layer.right.vendors}
            theme={theme}
          />
        </div>
      );
  }
}

export function ProductArchitectureSection() {
  const { locale } = useLocale();
  const ui = getGatewayUiCopy(locale);
  const { archLayers } = getGatewayContent(locale);

  return (
    <section className="mb-[110px] w-full">
      <h3 className="mb-2 px-3.5 text-center text-[32px] font-bold md:text-[48px]">
        {ui.archSectionTitle}
      </h3>
      <p className="mx-auto mb-3 max-w-[1260px] px-9 text-center text-[18px] leading-[1.65] text-[#57627f] md:text-[20px]">
        {ui.archIntroLine1}
      </p>
      <p className="mx-auto mb-12 max-w-[1260px] px-9 text-center text-[18px] font-semibold leading-[1.65] text-[#161722] md:mb-14 md:text-[20px]">
        {ui.archIntroLine2}
      </p>
      <div className="sf-content">
        <Card variant="surface" size="md" className="w-full">
          <div className="space-y-4" role="img" aria-label={ui.archAria}>
            {archLayers.map((layer) => renderArchLayer(layer, ARCH_THEME))}
          </div>
        </Card>
      </div>
    </section>
  );
}
