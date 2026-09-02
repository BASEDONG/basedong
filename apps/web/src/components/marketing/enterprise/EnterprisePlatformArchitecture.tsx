import {
  Cpu,
  Globe,
  GraduationCap,
  Landmark,
  Leaf,
  Radio,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import {
  ArchAppsLayer,
  ArchDividerLayer,
  ArchModuleChip,
  ArchSectionLayer,
  ArchVendorsLayer,
  type ArchTheme,
} from "./EnterpriseArchLayers";
import type { EnterpriseArchLayer } from "./content-types";

const ARCH_THEME: ArchTheme = {
  accent: "#4AABF0",
  secondary: "#02F6F7",
};

/** Index-aligned with apps-layer modules (互联网 → 能源 order in zh-CN source). */
const APP_MODULE_ICONS: LucideIcon[] = [
  Globe,
  GraduationCap,
  Wallet,
  Radio,
  Landmark,
  Cpu,
  Leaf,
];

export function EnterprisePlatformArchitecture({
  archAria,
  layers,
}: {
  archAria: string;
  layers: EnterpriseArchLayer[];
}) {
  return (
    <div className="space-y-4" role="img" aria-label={archAria}>
      {layers.map((layer) => {
        switch (layer.kind) {
          case "apps":
            return (
              <ArchAppsLayer
                key={layer.title}
                title={layer.title}
                modules={layer.modules}
                theme={ARCH_THEME}
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
                theme={ARCH_THEME}
              />
            );
          case "section":
            return (
              <ArchSectionLayer
                key={layer.title}
                title={layer.title}
                modules={layer.modules}
                theme={ARCH_THEME}
                columns="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7"
              />
            );
          case "vendors":
            return (
              <ArchVendorsLayer
                key={layer.title}
                title={layer.title}
                vendors={layer.vendors}
                theme={ARCH_THEME}
              />
            );
        }
      })}
    </div>
  );
}

export { ArchModuleChip };
