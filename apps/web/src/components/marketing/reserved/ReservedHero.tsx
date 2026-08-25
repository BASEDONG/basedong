import Link from "next/link";
import { ArrowForwardIcon } from "@/components/marketing/shared/icons";
import { CONSULT_URL, RV_ASSETS } from "./content";

export function ReservedHero() {
  return (
    <div
      className="h-[818px] w-full bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: `url(${RV_ASSETS}/hero-bg.png)` }}
    >
      <div className="mx-auto flex h-full max-w-[1434px] flex-col items-start justify-center max-[960px]:items-center">
        <p className="text-[64px] font-semibold leading-[96px] text-slate-800 max-[960px]:text-[36px] max-[960px]:leading-[1.3]">
          锁定算力
        </p>
        <p className="mb-10 text-[64px] font-semibold leading-[96px] text-[#4AABF0] max-[960px]:mb-5 max-[960px]:text-[36px] max-[960px]:leading-[1.3]">
          支撑关键业务稳定运行
        </p>
        <p className="mb-[54px] text-[20px] leading-[30px] text-slate-800 max-[960px]:mb-7 max-[960px]:text-center max-[960px]:text-[16px]">
          可预期性能 · 高用量场景更优成本结构 · 企业级 SLA 保障
        </p>
        <Link
          href={CONSULT_URL}
          target="_blank"
          rel="noreferrer"
          className="group bd-gradient-bg flex h-16 w-[166px] items-center justify-center rounded-[12px] text-[24px] font-bold text-white max-[960px]:scale-75"
        >
          <span>预约咨询</span>
          <span className="ml-[11px] transition-transform duration-300 group-hover:translate-x-1">
            <ArrowForwardIcon className="h-6 w-6 max-[960px]:h-[18px] max-[960px]:w-[18px]" />
          </span>
        </Link>
      </div>
    </div>
  );
}
