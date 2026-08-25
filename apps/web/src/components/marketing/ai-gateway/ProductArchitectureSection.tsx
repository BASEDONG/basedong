import Image from "next/image";
import {
  ArrowLeftRight,
  Bot,
  ChartNoAxesColumn,
  Eye,
  FileText,
  Gauge,
  Lock,
  Network,
  ShieldCheck,
  Users,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { gatewayFeatures, GW_ASSETS } from "./content";
import { GatewayReveal } from "./GatewayReveal";

const featureIcons: LucideIcon[] = [
  Network,
  Gauge,
  ArrowLeftRight,
  ChartNoAxesColumn,
  Eye,
  FileText,
  Lock,
  WalletCards,
  Users,
  ShieldCheck,
];

function ArchitectureArrow() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center gap-[30px] max-[1180px]:my-2 max-[1180px]:rotate-90"
    >
      <span className="gw-arch-arrow-left block h-0 w-0 border-y-[10px] border-y-transparent border-r-[18px] border-r-[#4AABF0]" />
      <span className="gw-arch-arrow-right block h-0 w-0 border-y-[10px] border-y-transparent border-l-[18px] border-l-[#10D6E5]" />
    </div>
  );
}

export function ProductArchitectureSection() {
  return (
    <div className="w-full bg-white py-[160px] max-[1180px]:py-20">
      <section className="w-full px-6">
        <GatewayReveal variant="soft">
          <p className="mx-auto max-w-[1260px] text-center text-[20px] font-medium leading-[1.65] text-slate-600 max-[1180px]:text-[16px]">
            为企业提供统一的模型接入与调用管理能力，支持多模型接入、策略配置、安全防护与调用观测，
          </p>
        </GatewayReveal>
        <GatewayReveal variant="soft" delayMs={60}>
          <p className="mx-auto max-w-[1260px] text-center text-[20px] font-medium leading-[1.65] text-slate-600 max-[1180px]:text-[16px]">
            <span className="font-semibold text-slate-700">
              帮助企业更灵活、高效地使用大模型服务
            </span>
          </p>
        </GatewayReveal>

        <div className="relative mx-auto mt-[42px] flex min-h-[374px] w-full max-w-[1400px] items-center justify-between rounded-[22px] border border-[#DED2FF] bg-[#FBF9FF] px-[72px] py-12 shadow-[0_8px_22px_rgba(74,171,240,0.22)] max-[1180px]:flex-col max-[1180px]:px-9 max-[960px]:gap-7 max-[960px]:py-[42px]">
          <GatewayReveal variant="card" delayMs={80} className="flex flex-col items-center max-[1180px]:w-full">
            <h3 className="mb-[22px] text-[20px] font-bold text-[#4AABF0]">
              AI 应用
            </h3>
            <div className="flex h-[250px] w-[132px] flex-col items-center justify-center rounded-[20px] border-2 border-[#DECFFF] bg-[#F5EEFF] max-[1180px]:w-full max-[960px]:h-[180px]">
              <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[14px] bg-[#7C4DFF] shadow-[0_10px_22px_rgba(124,77,255,0.28)]">
                <Bot
                  className="text-[26px] text-white"
                  aria-hidden="true"
                  strokeWidth={2}
                />
              </div>
              <p className="mt-3 text-[18px] font-bold text-[#1E2230]">Agent</p>
            </div>
          </GatewayReveal>

          <GatewayReveal variant="pop" delayMs={160}>
            <ArchitectureArrow />
          </GatewayReveal>

          <GatewayReveal
            variant="card"
            delayMs={220}
            className="w-[514px] rounded-[20px] border-2 border-[#DECFFF] bg-white/50 px-6 py-[26px] max-[1180px]:w-full"
          >
            <h3 className="mb-[18px] text-center text-[20px] font-bold text-[#4AABF0]">
              大模型推理服务网关
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {gatewayFeatures.map((feature, index) => {
                const Icon = featureIcons[index] ?? Network;
                return (
                  <GatewayReveal
                    key={feature}
                    variant="pop"
                    delayMs={260 + index * 35}
                  >
                    <div className="flex h-[46px] items-center gap-3 rounded-[12px] border border-[#E4E7EE] bg-[#F8FAFC] px-4 text-[16px] font-semibold text-[#2B2F3A]">
                      <Icon
                        className="size-4 shrink-0 text-[#7C4DFF]"
                        aria-hidden="true"
                        strokeWidth={2}
                      />
                      {feature}
                    </div>
                  </GatewayReveal>
                );
              })}
            </div>
          </GatewayReveal>

          <GatewayReveal variant="pop" delayMs={300}>
            <ArchitectureArrow />
          </GatewayReveal>

          <GatewayReveal
            variant="card"
            delayMs={360}
            className="flex w-[260px] flex-col gap-[22px] max-[1180px]:w-full max-[1180px]:flex-row max-[720px]:flex-col"
          >
            <GatewayReveal variant="pop" delayMs={400} className="flex-1">
              <div className="rounded-[14px] border border-[#E3E7EF] bg-white px-7 py-[22px] shadow-[0_8px_18px_rgba(15,23,42,0.06)]">
                <h3 className="mb-[14px] text-center text-[20px] font-bold text-[#4AABF0]">
                  第三方大模型推理服务
                </h3>
                <Image
                  src={`${GW_ASSETS}/third-party-logos.svg`}
                  alt="第三方大模型推理服务"
                  width={178}
                  height={96}
                  unoptimized
                  className="mx-auto h-auto w-[178px]"
                />
              </div>
            </GatewayReveal>

            <GatewayReveal variant="pop" delayMs={460} className="flex-1">
              <div className="rounded-[14px] border border-[#E4D7FF] bg-[#F4EDFF] px-[18px] py-[18px]">
                <h3 className="mb-3 text-center text-[20px] font-bold text-[#4AABF0]">
                  私有 MaaS 平台
                </h3>
                <div className="space-y-[10px]">
                  <div className="flex h-[46px] items-center justify-center rounded-[8px] bg-white text-[15px] font-semibold text-[#1E2230] shadow-[0_3px_10px_rgba(74,171,240,0.06)]">
                    私有模型
                  </div>
                  <div className="flex h-[46px] items-center justify-center rounded-[8px] bg-white text-[15px] font-semibold text-[#1E2230] shadow-[0_3px_10px_rgba(74,171,240,0.06)]">
                    微调模型
                  </div>
                </div>
              </div>
            </GatewayReveal>
          </GatewayReveal>
        </div>
      </section>
    </div>
  );
}
