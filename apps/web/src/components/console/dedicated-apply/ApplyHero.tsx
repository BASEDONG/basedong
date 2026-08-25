import { ASSET, heroFeatures } from "./content";

export function ApplyHero() {
  return (
    <div className="relative flex h-[200px] flex-col items-center justify-center overflow-hidden rounded-lg border border-[rgba(74,171,240,0.2)] px-16">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ASSET.hero} alt="" className="absolute left-0" />
      <h1 className="relative z-10 whitespace-nowrap text-[36px] font-extrabold leading-[48px] tracking-[-0.58px] text-[#1e293b]">
        弹性 GPU 服务 · <span className="text-[#4AABF0]">公测开放申请</span>🔥
      </h1>
      <p className="relative z-10 mt-4 flex w-[500px] justify-between text-center text-[16px] leading-[28px] text-[#475569]">
        {heroFeatures.flatMap((label, i) =>
          i === 0
            ? [<span key={label}>{label}</span>]
            : [
                <span key={`sep-${label}`} className="text-[#94a3b8]">
                  |
                </span>,
                <span key={label}>{label}</span>,
              ],
        )}
      </p>
    </div>
  );
}
