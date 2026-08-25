import Image from "next/image";
import Link from "next/link";
import { ArrowForwardIcon } from "@/components/marketing/shared/icons";
import { CONSULT_URL, TF_ASSETS } from "./content";

export function TokenFactoryHero() {
  return (
    <div className="w-full overflow-hidden">
      <div className="relative min-h-[745px] w-full border-t py-[50px]">
        <div className="tf-hero-grid absolute inset-0" aria-hidden="true" />
        <div className="relative flex min-h-[644px] items-center justify-center px-8 max-[1180px]:min-h-0 max-[1180px]:flex-col">
          <div className="min-w-[566px] max-[1180px]:min-w-full max-[1180px]:pt-[100px]">
            <h1 className="bd-gradient-text-hero mb-10 text-left text-[64px] font-bold leading-[1.5] max-[1180px]:text-center max-[1180px]:text-[56px]">
              AI 算力运营平台
            </h1>
            <p className="mb-4 text-[24px] font-semibold text-slate-800 max-[1180px]:text-center max-[1180px]:text-[20px]">
              把闲置或自有算力，快速变成可持续运转的{" "}
              <span className="text-[#4AABF0]">Token</span> 产能
            </p>
            <p className="mb-10 text-[20px] text-slate-700 max-[1180px]:text-center max-[1180px]:text-[18px]">
              适配主流 GPU，充分释放每一张卡的产出
            </p>
            <Link
              href={CONSULT_URL}
              target="_blank"
              rel="noreferrer"
              className="group bd-gradient-bg flex h-16 w-[166px] items-center justify-center rounded-[10px] text-[24px] font-semibold text-white max-[1180px]:mx-auto max-[1180px]:h-[52px] max-[1180px]:w-[150px] max-[1280px]:text-[18px]"
            >
              <span>预约沟通</span>
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowForwardIcon className="h-5 w-5" />
              </span>
            </Link>
          </div>

          <div className="relative flex h-[644px] w-[644px] items-center justify-center max-[1180px]:mt-8 max-[1180px]:h-[480px] max-[1180px]:w-full">
            <div className="absolute inset-0 scale-50 rounded-full bg-gradient-to-br from-[#5DCDE8] to-[#E848A0] opacity-25 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="relative h-[420px] w-[420px] max-h-full max-w-full">
                <div className="tf-spin-slow absolute inset-0 rounded-full border border-[#4AABF0]/15">
                  <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#4AABF0] shadow-lg shadow-[#4AABF0]/50" />
                  <span className="absolute top-1/2 -right-1.5 h-2 w-2 -translate-y-1/2 rounded-full bg-[#E848A0]" />
                </div>
                <div className="tf-spin-reverse absolute inset-8 rounded-full border border-[#5DCDE8]/20">
                  <span className="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[hsl(200_90%_60%)]" />
                </div>
              </div>
            </div>
            <div className="relative flex h-[644px] w-[644px] items-center justify-center max-[1180px]:h-[400px] max-[1180px]:w-[400px]">
              <Image
                src={`${TF_ASSETS}/hero-visual.svg`}
                alt="算力运营平台示意"
                width={448}
                height={448}
                className="relative z-10 h-auto w-[448px] max-w-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
