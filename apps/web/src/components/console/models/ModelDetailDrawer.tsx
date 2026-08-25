"use client";

import { useEffect, useState } from "react";
import type { ModelCardData } from "./content-types";
import { deriveModelDetail } from "./model-detail";

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

const PRICE_TABS = [
  { id: "在线推理", label: "在线推理", enabled: true },
  { id: "批量推理", label: "批量推理", enabled: false },
  { id: "微调训练", label: "微调训练", enabled: false },
] as const;

type PriceTabId = (typeof PRICE_TABS)[number]["id"];

interface ModelDetailDrawerProps {
  model: ModelCardData | null;
  onClose: () => void;
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      width={18}
      height={18}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
      width={14}
      height={14}
    >
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  );
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    /* ignore in demo */
  }
}

export function ModelDetailDrawer({ model, onClose }: ModelDetailDrawerProps) {
  const open = model !== null;
  const [priceTab, setPriceTab] = useState<PriceTabId>("在线推理");
  const [visible, setVisible] = useState(false);
  const [tabTip, setTabTip] = useState<{
    label: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    if (open) {
      setPriceTab("在线推理");
      setTabTip(null);
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setVisible(false);
    setTabTip(null);
  }, [open, model?.id]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!model) return null;

  const detail = deriveModelDetail(model);
  const currentLimit = detail.rateLimits.find((r) => r.current) ?? detail.rateLimits[0];

  return (
    <div className="sf-cloud-console pointer-events-none fixed inset-0 z-[1000]">
      <button
        type="button"
        aria-label="关闭遮罩"
        onClick={onClose}
        className={`pointer-events-auto absolute inset-0 border-0 bg-[rgba(2,6,23,0.45)] transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={model.title}
        className={`pointer-events-auto absolute right-0 top-0 flex h-full w-[min(100vw,736px)] flex-col bg-white text-slate-800 shadow-[-6px_0_16px_rgba(0,0,0,0.08),-3px_0_6px_-4px_rgba(0,0,0,0.12),-9px_0_28px_8px_rgba(0,0,0,0.05)] transition-transform duration-300 ease-out ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="hidden-scrollbar flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="relative mb-1 h-12 pl-[54px]">
            <div className="absolute left-0 top-1 flex h-full w-12 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={model.logo}
                alt=""
                width={40}
                height={40}
                className="size-10 object-contain"
              />
            </div>
            <div className="flex h-full w-full flex-col justify-center pr-10">
              <div className="flex w-full min-w-0 items-center">
                <button
                  type="button"
                  onClick={() => copyText(model.title)}
                  className="m-0 flex min-w-0 items-center truncate text-base text-slate-700"
                  title="复制"
                >
                  <span className="truncate">{model.title}</span>
                  <CopyIcon className="ml-1 size-4 shrink-0 text-slate-400" />
                </button>
                <ShareIcon className="ml-1 size-4 shrink-0 cursor-pointer text-slate-400" />
                {model.badge ? (
                  <div
                    className={`ml-2 flex items-center justify-center rounded-md rounded-bl-none px-1 py-0.5 text-xs text-white ${
                      model.badge.includes("限免")
                        ? "bd-gradient-bg"
                        : "bg-[#EF4444]"
                    }`}
                  >
                    {model.badge}
                  </div>
                ) : null}
              </div>
              <div className="truncate text-xs text-slate-500">
                {detail.shortName}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="关闭"
              className="absolute right-0 top-0 rounded-[6px] p-2 text-slate-800 hover:bg-slate-100"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Full description */}
          <div className="text-xs leading-5 text-slate-500">
            {model.description}
          </div>

          {/* Tags — full wrap, no truncate */}
          <div className="mt-2 flex flex-wrap gap-2">
            {model.deprecated ? (
              <span className="inline-flex h-[22px] items-center rounded border border-transparent bg-[rgb(203,213,225)] px-[7px] text-xs text-white">
                Deprecated
              </span>
            ) : null}
            {model.typeTags.map((tag) => (
              <span
                key={tag}
                className={`inline-flex h-[22px] items-center rounded border px-[7px] text-xs ${TYPE_TAG_STYLES[tag] ?? "border-transparent bg-[var(--sf-cloud-primary-chip)] text-[var(--sf-cloud-primary)]"}`}
              >
                {tag}
              </span>
            ))}
            {model.featureTags.map((tag) => (
              <div
                key={tag}
                className="inline-flex h-[22px] items-center rounded bg-[var(--sf-cloud-primary-chip)] px-2 text-xs text-[var(--sf-cloud-primary)]"
              >
                {tag}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-5 flex gap-3">
            {detail.experienceHref ? (
              <a
                href={detail.experienceHref}
                target="_blank"
                rel="noreferrer"
                className="bd-gradient-bg inline-flex h-11 min-w-[140px] cursor-pointer items-center justify-center rounded-[12px] px-5 text-base text-white hover:opacity-90"
              >
                🏀 在线体验
              </a>
            ) : (
              <span
                title="暂未支持"
                className="inline-flex h-11 min-w-[140px] cursor-not-allowed items-center justify-center rounded-[12px] bg-slate-200 px-5 text-base text-slate-400"
              >
                🏀 在线体验
              </span>
            )}
            <a
              href={detail.apiDocsHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 min-w-[140px] cursor-pointer items-center justify-center rounded-[8px] bg-[rgba(108,40,246,0.2)] px-5 text-base text-[rgb(108,40,246)] hover:opacity-90"
            >
              📖 API 文档
            </a>
          </div>

          {/* Pricing */}
          <div className="mb-8 mt-8 w-full overflow-hidden">
            <div className="relative flex items-center py-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="px-4 text-lg font-medium text-slate-800">
                价格信息
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="relative mx-auto mb-4 flex w-[320px] rounded-[6px] bg-slate-100 p-1 text-slate-800">
              {PRICE_TABS.map((tab) => {
                const active = priceTab === tab.id;
                if (!tab.enabled) {
                  return (
                    <button
                      type="button"
                      key={tab.id}
                      disabled
                      onMouseEnter={(e) => {
                        const r = e.currentTarget.getBoundingClientRect();
                        setTabTip({
                          label: "暂未支持",
                          x: r.left + r.width / 2,
                          y: r.top,
                        });
                      }}
                      onMouseLeave={() => setTabTip(null)}
                      className="min-w-fit flex-1 cursor-not-allowed rounded-[4px] py-1 text-sm text-slate-400"
                    >
                      {tab.label}
                    </button>
                  );
                }
                return (
                  <button
                    type="button"
                    key={tab.id}
                    onClick={() => setPriceTab(tab.id)}
                    className={`min-w-fit flex-1 rounded-[4px] py-1 text-sm transition-colors ${
                      active
                        ? "bg-white font-medium text-slate-800 shadow-sm"
                        : "text-slate-600"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {tabTip ? (
              <div
                className="pointer-events-none fixed z-[1100] -translate-x-1/2 -translate-y-full rounded px-2 py-1 text-xs text-white"
                style={{
                  left: tabTip.x,
                  top: tabTip.y - 8,
                  backgroundColor: "rgba(0,0,0,0.85)",
                }}
              >
                {tabTip.label}
              </div>
            ) : null}

            <div className="overflow-hidden rounded-[8px] border border-slate-200">
              <div className="flex border-b border-slate-200 bg-slate-50 text-sm text-slate-500">
                <div className="w-[140px] shrink-0 px-4 py-3">功能</div>
                <div className="flex flex-1 items-center justify-between px-4 py-3">
                  <span>价格</span>
                  <span className="cursor-pointer text-[var(--sf-cloud-primary)]">
                    M Tokens
                  </span>
                </div>
              </div>
              {detail.priceRows.map((row) => (
                <div
                  key={row.tokenId}
                  className="flex border-b border-slate-100 last:border-b-0"
                >
                  <div className="flex w-[140px] shrink-0 items-center px-4 py-4 text-sm text-slate-700">
                    {row.label}
                  </div>
                  <div className="min-w-0 flex-1 px-4 py-3">
                    <div className="text-[20px] font-bold text-[var(--sf-cloud-primary)]">
                      <span className="mr-1 text-xs font-normal text-slate-400">
                        ¥
                      </span>
                      {row.price}
                      <span className="ml-2 text-[10px] font-normal text-slate-400">
                        {row.unit}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyText(row.tokenId)}
                      className="mt-1 flex max-w-full items-center gap-1 truncate text-xs text-slate-400 hover:text-[var(--sf-cloud-primary)]"
                    >
                      <span className="truncate">{row.tokenId}</span>
                      <CopyIcon className="size-3 shrink-0 text-[var(--sf-cloud-primary)]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Model info */}
          <div className="mb-0 mt-7 pb-1 text-lg font-medium">
            <div className="relative flex items-center py-2">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="px-4">模型信息</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
          </div>

          <div className="flex flex-col gap-4 pl-3 text-slate-800">
            <div className="flex items-start text-sm">
              <div className="mr-3 w-[94px] shrink-0 text-slate-500">上下文</div>
              <div className="flex-1">{detail.context}</div>
            </div>

            {detail.capabilities.length > 0 ? (
              <div className="flex items-start text-sm">
                <div className="mr-3 w-[94px] shrink-0 text-slate-500">
                  支持能力
                </div>
                <div className="flex flex-1 flex-wrap gap-2">
                  {detail.capabilities.map((cap) => (
                    <span key={cap}>{cap}</span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex items-start text-sm">
              <div className="mr-3 w-[94px] shrink-0 pt-1 text-slate-500">
                Rate Limits
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex gap-2 rounded-[8px] border-none bg-[rgba(124,58,237,0.1)] px-3 py-2 text-slate-700">
                  <InfoIcon className="mt-0.5 shrink-0 text-[var(--sf-cloud-primary)]" />
                  <div className="text-sm leading-relaxed">
                    <p className="m-0">
                      您当前的用量级别为 {currentLimit.level}；
                    </p>
                    <p className="m-0">
                      使用本模型时最高 RPM 为 {currentLimit.rpm}；最高TPM 为{" "}
                      {currentLimit.tpm}；
                    </p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-[8px] border border-slate-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-500">
                        <th className="px-4 py-2 font-normal">用量级别</th>
                        <th className="px-4 py-2 font-normal">最高 RPM</th>
                        <th className="px-4 py-2 font-normal">最高 TPM</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detail.rateLimits.map((row) => (
                        <tr
                          key={row.level}
                          className="border-b border-slate-100 last:border-b-0"
                        >
                          <td
                            className={`px-4 py-2 ${row.current ? "text-[rgba(108,40,246,0.8)]" : ""}`}
                          >
                            {row.level}
                          </td>
                          <td
                            className={`px-4 py-2 ${row.current ? "text-[rgba(108,40,246,0.8)]" : ""}`}
                          >
                            {row.rpm}
                          </td>
                          <td
                            className={`px-4 py-2 ${row.current ? "text-[rgba(108,40,246,0.8)]" : ""}`}
                          >
                            {row.tpm}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {detail.releaseDate ? (
              <div className="flex items-start text-sm">
                <div className="mr-3 w-[94px] shrink-0 text-slate-500">
                  发布日期
                </div>
                <div className="flex-1">{detail.releaseDate}</div>
              </div>
            ) : null}
          </div>
        </div>
      </aside>
    </div>
  );
}
