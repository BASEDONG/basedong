import type { ModelCardData } from "./content-types";

interface ModelCardProps {
  model: ModelCardData;
  onSelect?: (model: ModelCardData) => void;
}

const TYPE_TAG_STYLES: Record<string, string> = {
  对话:
    "border-[rgb(145,202,255)] bg-[rgb(230,244,255)] text-[rgb(9,88,217)]",
  生图:
    "border-[rgb(135,232,222)] bg-[rgb(230,255,251)] text-[rgb(8,151,156)]",
  视频:
    "border-[rgb(211,173,247)] bg-[rgb(249,240,255)] text-[rgb(83,29,171)]",
  语音:
    "border-[rgb(255,187,150)] bg-[rgb(255,242,232)] text-[rgb(212,56,13)]",
  嵌入:
    "border-[rgb(255,173,210)] bg-[rgb(255,240,246)] text-[rgb(196,29,127)]",
  重排序:
    "border-[rgb(234,255,143)] bg-[rgb(252,255,230)] text-[rgb(124,179,5)]",
};

export function ModelCard({ model, onSelect }: ModelCardProps) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(model)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(model);
        }
      }}
      className="relative flex h-[162px] min-w-0 cursor-pointer flex-col justify-between overflow-hidden rounded-[12px] border border-[#eceef3] bg-white p-4 transition-shadow hover:border-[#eceef3] hover:shadow-md"
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
        <div className="absolute left-0 top-1 h-full w-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={model.logo}
            alt=""
            width={40}
            height={40}
            className="size-10 object-contain"
          />
        </div>
        <div className="flex h-full min-w-0 w-full flex-col justify-center text-slate-800">
          <div className="w-full truncate break-all align-top text-base font-normal text-slate-800">
            {model.title}
          </div>
          <div className="flex h-5 min-w-0 items-center gap-2 text-xs text-slate-500">
            <span className="truncate">{model.provider}</span>
          </div>
        </div>
      </div>

      {/* Cap at exactly 2 lines (42px) — avoid flex-1 growing and clipping a partial 3rd line */}
      <div className="mt-1 h-[42px] min-h-0 min-w-0 shrink-0 overflow-hidden text-xs text-slate-500">
        <div
          className="overflow-hidden break-words"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            lineHeight: 1.75,
          }}
        >
          {model.description}
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
            {tag}
          </span>
        ))}
        {model.featureTags.map((tag) => (
          <div
            key={tag}
            className="inline-flex h-[22px] shrink-0 items-center rounded bg-[var(--sf-cloud-primary-chip)] px-2 text-xs text-[var(--sf-cloud-primary)]"
          >
            {tag}
          </div>
        ))}
      </div>
    </article>
  );
}
