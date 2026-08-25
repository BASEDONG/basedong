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
import { enterpriseArchLayers } from "./content";

const APP_ICONS: Record<string, LucideIcon> = {
  能源: Leaf,
  智算: Cpu,
  政府: Landmark,
  通信: Radio,
  金融: Wallet,
  教育: GraduationCap,
  互联网: Globe,
};

function ArchModuleChip({ label }: { label: string }) {
  return (
    <div className="flex min-h-[44px] items-center justify-center rounded-lg border border-[#4AABF0]/20 bg-[#4AABF0]/05 px-3 py-2 text-center text-[13px] font-medium leading-snug text-[#1E293B] md:min-h-[48px] md:text-[14px]">
      {label}
    </div>
  );
}

function AppsLayer({ title, modules }: { title: string; modules: string[] }) {
  return (
    <div className="rounded-lg bg-[#4AABF0]/20 px-4 py-3 md:px-5 md:py-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
        <p className="shrink-0 text-[15px] font-semibold text-[#1E293B] md:w-[72px] md:text-[16px]">
          {title}
        </p>
        <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {modules.map((label) => {
            const Icon = APP_ICONS[label];
            return (
              <div
                key={label}
                className="flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/40 px-3 py-2.5 text-[14px] font-medium text-[#1E293B]"
              >
                {Icon ? (
                  <Icon
                    className="size-4 shrink-0 text-[#4AABF0]"
                    aria-hidden="true"
                    strokeWidth={2}
                  />
                ) : null}
                <span>{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DividerLayer({ title }: { title: string }) {
  return (
    <div className="rounded-lg bg-[#02F6F7]/20 py-3 text-center text-[16px] font-bold text-[#1E293B] md:py-3.5 md:text-[18px]">
      {title}
    </div>
  );
}

function SectionLayer({
  title,
  modules,
}: {
  title: string;
  modules: string[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#4AABF0]/50 bg-white">
      <div className="bg-[#4AABF0]/20 px-4 py-2.5 text-center text-[15px] font-semibold text-[#1E293B] md:text-[16px]">
        {title}
      </div>
      <div className="grid grid-cols-2 gap-2.5 p-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {modules.map((label) => (
          <ArchModuleChip key={label} label={label} />
        ))}
      </div>
    </div>
  );
}

function VendorsLayer({
  title,
  vendors,
}: {
  title: string;
  vendors: string[];
}) {
  const colClass =
    vendors.length >= 10
      ? "grid-cols-2 sm:grid-cols-5 lg:grid-cols-10"
      : "grid-cols-2 sm:grid-cols-4 lg:grid-cols-7";

  return (
    <div className="rounded-lg border border-[#4AABF0]/40 bg-[#4AABF0]/10 px-4 py-3 md:px-5 md:py-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
        <p className="shrink-0 text-[15px] font-semibold text-[#1E293B] md:w-[72px] md:text-[16px]">
          {title}
        </p>
        <div className={`grid min-w-0 flex-1 gap-2 ${colClass}`}>
          {vendors.map((name) => (
            <div
              key={name}
              className="flex min-h-[44px] items-center justify-center rounded-lg border border-[#4AABF0]/20 bg-white/60 px-2 py-2 text-center text-[13px] font-medium text-[#57627f] md:min-h-[48px] md:text-[14px]"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EnterprisePlatformArchitecture() {
  return (
    <div
      className="space-y-3"
      role="img"
      aria-label="八色鸫企业级平台技术架构"
    >
      {enterpriseArchLayers.map((layer) => {
        switch (layer.kind) {
          case "apps":
            return (
              <AppsLayer
                key={layer.title}
                title={layer.title}
                modules={layer.modules}
              />
            );
          case "divider":
            return <DividerLayer key={layer.title} title={layer.title} />;
          case "section":
            return (
              <SectionLayer
                key={layer.title}
                title={layer.title}
                modules={layer.modules}
              />
            );
          case "vendors":
            return (
              <VendorsLayer
                key={layer.title}
                title={layer.title}
                vendors={layer.vendors}
              />
            );
        }
      })}
    </div>
  );
}
