"use client";

import Image from "next/image";
import type { ModelCardData } from "./content";
import { modelDetailHref } from "./content";

export function ModelCard({ model }: { model: ModelCardData }) {
  const href = modelDetailHref(model.modelId);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group h-[210px] w-full max-w-[340px] cursor-pointer rounded-[8px] border border-slate-200 bg-white p-6 transition hover:border hover:border-[#4AABF0] hover:bg-[#4AABF01A] max-md:h-auto max-md:min-h-[210px] min-[1490px]:h-auto min-[1490px]:min-h-[210px]"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <Image
            src={model.logo}
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
            unoptimized
          />
          <span className="text-sm text-slate-500">{model.vendor}</span>
        </div>
        <span className="inline-flex h-[22px] items-center rounded border border-[#91CAFF] bg-[#E6F4FF] px-[7px] text-xs leading-5 text-[#0958D9]">
          {model.type}
        </span>
      </div>

      <div className="mb-3.5 group-hover:hidden">
        <div className="mb-1 truncate text-base font-semibold text-slate-800">
          {model.modelId}
        </div>
        <div className="mb-4 text-xs text-slate-500">{model.published}</div>
        {model.sceneTags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {model.sceneTags.map((tag) => (
              <span
                key={tag}
                className="mr-0 inline-flex h-[22px] items-center rounded border border-[#D3ADF7] bg-[#F9F0FF] px-[7px] text-xs font-medium leading-5"
              >
                <span className="text-[#4AABF0]">{tag}</span>
              </span>
            ))}
          </div>
        ) : (
          <div />
        )}
      </div>

      <div className="mb-3 hidden group-hover:block">
        <div className="mb-2 line-clamp-2 text-sm text-slate-800">
          {model.description}
        </div>
        {model.features.length > 0 ? (
          <div>
            <div className="text-sm text-slate-500">支持功能：</div>
            <div className="flex flex-wrap gap-1.5">
              {model.features.map((f) => (
                <span key={f} className="text-sm text-slate-800">
                  {f}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="mb-2.5 h-px w-full border-b border-slate-200 group-hover:border-slate-400" />

      <div className="flex items-center justify-between text-xs text-slate-500 group-hover:hidden">
        <div>
          输入: <span className="text-[#4AABF0]">￥{model.inputPrice}</span> / M
          Tokens
        </div>
        <div>
          输出: <span className="text-[#4AABF0]">￥{model.outputPrice}</span> / M
          Tokens
        </div>
      </div>

      <div className="hidden items-center justify-between text-xs text-slate-500 group-hover:flex">
        <div>
          上下文长度: <span className="text-[#4AABF0]">{model.context}</span>
        </div>
        <div>
          尺寸：
          <span className="text-[#4AABF0]">{model.size}</span>
        </div>
      </div>
    </a>
  );
}
