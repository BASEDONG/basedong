import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

export type ArchTheme = {
  accent: string;
  secondary: string;
};

function tint(color: string, alpha: number) {
  return `color-mix(in srgb, ${color} ${alpha}%, transparent)`;
}

export function ArchModuleChip({
  label,
  theme,
}: {
  label: string;
  theme: ArchTheme;
}) {
  return (
    <div
      className="flex min-h-[52px] items-center justify-center rounded-lg border px-3.5 py-2.5 text-center text-[14px] font-medium leading-snug text-[#1E293B] md:min-h-[56px] md:text-[15px]"
      style={{
        borderColor: tint(theme.accent, 20),
        backgroundColor: tint(theme.accent, 5),
      }}
    >
      {label}
    </div>
  );
}

export function ArchCapabilityCard({
  title,
  subtitle,
  theme,
}: {
  title: string;
  subtitle: string;
  theme: ArchTheme;
}) {
  return (
    <div
      className="flex min-h-[104px] flex-col justify-center rounded-lg border px-3.5 py-3.5 md:min-h-[112px] md:px-4"
      style={{
        borderColor: tint(theme.accent, 25),
        backgroundColor: tint(theme.accent, 4),
      }}
    >
      <p className="text-[15px] font-semibold leading-snug text-[#1E293B] md:text-[16px]">{title}</p>
      {subtitle ? (
        <p className="mt-1.5 text-[13px] leading-relaxed text-[#57627f] md:text-[14px]">{subtitle}</p>
      ) : null}
    </div>
  );
}

export function ArchDividerLayer({
  title,
  theme,
  emphasized = false,
}: {
  title: string;
  theme: ArchTheme;
  emphasized?: boolean;
}) {
  return (
    <div
      className={`rounded-lg py-3.5 text-center font-bold text-[#1E293B] md:py-4 ${
        emphasized ? "text-[17px] md:text-[19px]" : "text-[16px] md:text-[18px]"
      }`}
      style={{ backgroundColor: tint(emphasized ? theme.accent : theme.secondary, emphasized ? 15 : 20) }}
    >
      {title}
    </div>
  );
}

export function ArchSectionLayer({
  title,
  modules,
  theme,
  columns = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
}: {
  title: string;
  modules: string[];
  theme: ArchTheme;
  columns?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white" style={{ borderColor: tint(theme.accent, 50) }}>
      <div
        className="px-4 py-3.5 text-center text-[16px] font-semibold text-[#1E293B] md:text-[18px]"
        style={{ backgroundColor: tint(theme.accent, 20) }}
      >
        {title}
      </div>
      <div className={`grid gap-3 p-4 md:p-5 ${columns}`}>
        {modules.map((label) => (
          <ArchModuleChip key={label} label={label} theme={theme} />
        ))}
      </div>
    </div>
  );
}

export function ArchVendorsLayer({
  title,
  vendors,
  theme,
}: {
  title: string;
  vendors: string[];
  theme: ArchTheme;
}) {
  return (
    <div
      className="rounded-lg border px-5 py-4 md:px-6 md:py-5"
      style={{
        borderColor: tint(theme.accent, 40),
        backgroundColor: tint(theme.accent, 10),
      }}
    >
      <div className="flex flex-col gap-3.5 md:flex-row md:items-center md:gap-5">
        <p className="shrink-0 text-[16px] font-semibold text-[#1E293B] md:w-[80px] md:text-[17px]">
          {title}
        </p>
        <div className="grid min-w-0 flex-1 grid-cols-2 gap-2.5 sm:grid-cols-3 md:flex md:flex-nowrap">
          {vendors.map((name) => (
            <div
              key={name}
              className="flex min-h-[48px] min-w-0 flex-1 items-center justify-center rounded-lg border bg-white/60 px-2 py-2.5 text-center text-[13px] font-medium text-[#57627f] md:min-h-[52px] md:text-[14px]"
              style={{ borderColor: tint(theme.accent, 20) }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ArchFlowLayer({
  steps,
  theme,
}: {
  steps: [string, string, string];
  theme: ArchTheme;
}) {
  return (
    <div
      className="rounded-lg px-5 py-5 md:px-6 md:py-6"
      style={{ backgroundColor: tint(theme.accent, 8) }}
    >
      <div className="grid grid-cols-1 items-stretch gap-3.5 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-2.5">
        {steps.flatMap((step, index) => {
          const nodes = [
            <div
              key={step}
              className="flex min-h-[60px] items-center justify-center rounded-lg border bg-white/70 px-3.5 py-3 text-center text-[14px] font-semibold leading-snug text-[#1E293B] md:min-h-[64px] md:text-[15px]"
              style={{ borderColor: tint(theme.accent, 30) }}
            >
              {step}
            </div>,
          ];
          if (index < steps.length - 1) {
            nodes.push(
              <div key={`arrow-${index}`} className="flex items-center justify-center text-[#57627f] md:px-1">
                <ChevronRight className="hidden size-5 md:block" aria-hidden strokeWidth={2} style={{ color: theme.accent }} />
                <span className="text-[13px] font-medium md:hidden" style={{ color: theme.accent }}>
                  ↓
                </span>
              </div>,
            );
          }
          return nodes;
        })}
      </div>
    </div>
  );
}

export function ArchAppsLayer({
  title,
  modules,
  theme,
  renderModule,
}: {
  title: string;
  modules: string[];
  theme: ArchTheme;
  renderModule?: (label: string, index: number) => ReactNode;
}) {
  return (
    <div className="rounded-lg px-5 py-4 md:px-6 md:py-5" style={{ backgroundColor: tint(theme.accent, 20) }}>
      <div className="flex flex-col gap-3.5 md:flex-row md:items-center md:gap-5">
        <p className="shrink-0 text-[16px] font-semibold text-[#1E293B] md:w-[80px] md:text-[17px]">
          {title}
        </p>
        <div className="grid flex-1 grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {modules.map((label, index) =>
            renderModule ? (
              <div key={label}>{renderModule(label, index)}</div>
            ) : (
              <div
                key={label}
                className="flex items-center justify-center rounded-lg border border-white/30 bg-white/40 px-3.5 py-3 text-[15px] font-medium text-[#1E293B]"
              >
                {label}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
