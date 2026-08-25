import Link from "next/link";
import {
  CONSULT_URL,
  highPerformanceModels,
  standardModels,
} from "./content";
import { PricingModelCard } from "./PricingModelCard";

function ModelGroup({
  title,
  models,
  startDelay = 0,
}: {
  title: string;
  models: typeof highPerformanceModels;
  startDelay?: number;
}) {
  return (
    <div className="mb-12">
      <h3 className="mb-4 text-[24px] font-semibold leading-[1.35] text-slate-600 max-[960px]:text-[20px]">
        {title}
      </h3>
      <div className="mx-auto grid grid-cols-2 gap-12 max-[960px]:grid-cols-1">
        {models.map((model, index) => (
          <PricingModelCard
            key={`${title}-${model.model}`}
            model={model}
            delay={startDelay + index * 80}
          />
        ))}
      </div>
    </div>
  );
}

export function PricingSection() {
  return (
    <section className="w-full bg-white px-4 pb-[110px] pt-[50px]">
      <p className="mb-6 text-center text-[18px] text-[#4AABF0]">
        PRICING & PERFORMANCE
      </p>
      <h2 className="mb-6 text-center text-[48px] font-semibold text-slate-800 max-[960px]:text-[36px]">
        预留实例参考性能与价格
      </h2>
      <p className="mx-auto mb-6 max-w-[642px] text-center text-[18px] text-slate-800 max-[960px]:text-[16px]">
        预留实例支持多种算力规格，可根据模型类型、并发需求与业务规模灵活配置。以下展示部分模型在不同实例规格下的参考性能与定价。
      </p>

      <div className="mb-12">
        <div className="mx-auto w-[1400px] max-[1280px]:w-full">
          <ModelGroup title="高性能实例规格" models={highPerformanceModels} />
          <ModelGroup
            title="标准版实例规格"
            models={standardModels}
            startDelay={320}
          />
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] space-y-4 rounded-tl-lg rounded-tr-lg border-b border-b-slate-300 bg-slate-50 px-6 py-4 text-[18px] leading-8 text-slate-700">
        <p>
          <span className="text-red-500">*</span>{" "}
          折合单价是基于上表 TPM、按每月 30 天、总体利用率 50% 的基准进行折算。
        </p>
        <p>
          <span className="text-red-500">**</span>{" "}
          性能数据基于典型推理参数测试：输入 24k tokens，输出 1k tokens，缓存命中率
          80%。
        </p>
        <p>
          上述为示例规格，更多模型规格及定制部署方案欢迎
          <Link
            href={CONSULT_URL}
            target="_blank"
            rel="noreferrer"
            className="text-[#4AABF0]"
          >
            预约咨询
          </Link>
          。
        </p>
      </div>
    </section>
  );
}
