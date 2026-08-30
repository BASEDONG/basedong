"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ASSET, SUGGESTION_PROMPTS, TERMS_URL } from "./content";
import { SendIcon, WarningTriangleIcon } from "./icons";

interface ImageWorkspaceProps {
  model: string;
}

export function ImageWorkspace({ model }: ImageWorkspaceProps) {
  const [prompt, setPrompt] = useState("");
  const [preview, setPreview] = useState(ASSET.hero);
  const [error, setError] = useState<string | null>(null);
  const canSend = prompt.trim().length > 0;

  const send = () => {
    if (!canSend) return;
    setError(
      "图像生成尚未接入 basedong Relay。请使用对话 Playground，或通过 API Key 调用已支持的 /v1 接口。",
    );
    setPreview(ASSET.hero);
  };

  return (
    <div className="box-border flex h-full min-w-0 flex-1 flex-col gap-3 overflow-x-hidden">
      <div className="relative mb-2 flex w-full items-center justify-between whitespace-nowrap rounded-lg bg-[#EBE5F8] px-4 py-1.5 text-sm text-[#333]">
        {model}
        <div className="flex items-center gap-2">
          <WarningTriangleIcon className="text-lg text-[#FAAD14]" />
          <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
            在线体验将按照用量产生费用，详见
            <button
              type="button"
              className="inline-flex h-6 items-center px-[7px] text-sm leading-5 text-[rgb(74,171,240)] hover:underline"
            >
              模型详情
            </button>
          </span>
        </div>
        <div />
      </div>

      <div className="no-scrollbar full box-border min-h-0 flex-1 overflow-y-auto bg-no-repeat">
        <div className="h-full w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Picture of the author"
            className="h-full max-h-[100%] w-full max-w-[100%] object-contain"
          />
        </div>
      </div>

      {error ? (
        <p className="text-sm text-amber-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex w-full gap-3">
        {SUGGESTION_PROMPTS.map((text) => (
          <div
            key={text.slice(0, 32)}
            role="button"
            tabIndex={0}
            title={text}
            onClick={() => setPrompt(text)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setPrompt(text);
              }
            }}
            className="group max-w-[200px] cursor-pointer truncate rounded-[8px] border border-transparent bg-slate-100 px-3 py-1 text-xs text-slate-500 transition-all hover:border-[rgb(74,171,240)]"
          >
            {text}
          </div>
        ))}
      </div>

      <div
        className={cn(
          "flex w-full flex-col rounded-[6px] border border-slate-200 bg-white/50 p-1 pr-3 transition-all duration-300",
          "focus-within:border-[rgb(74,171,240)]",
        )}
      >
        <div className="flex h-[112px] w-full items-center justify-between bg-transparent">
          <div className="h-full flex-1 bg-transparent">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && canSend) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="请输入提示词..."
              className="no-scrollbar h-full w-full resize-none rounded-[6px] border-0 bg-transparent px-[11px] py-1 text-sm leading-[22px] text-slate-800 outline-none"
            />
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={send}
              aria-label="send"
              className={cn(
                "flex size-10 items-center justify-center rounded-[4px] bg-[rgb(108,40,246)] text-white transition-all duration-200",
                canSend
                  ? "cursor-pointer opacity-100"
                  : "cursor-not-allowed opacity-50",
              )}
            >
              <SendIcon className="-rotate-90" />
            </button>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-slate-400">
        内容由人工智能生成，可能不完全准确，仅供参考。请遵守平台
        <a
          href={TERMS_URL}
          target="_blank"
          rel="noreferrer"
          className="mx-1 text-[rgb(108,40,246)] underline-offset-2 hover:underline"
        >
          服务条款
        </a>
        及适用的法律法规
      </div>
    </div>
  );
}
