"use client";

import { useEffect, useMemo, useState } from "react";
import { CatalogIcon } from "@/components/shared/CatalogIcon";
import { useLocale } from "@/components/shared/LocaleProvider";
import type { PricingEndpointInfo } from "@/lib/backend/client";
import { getRelayBase } from "@/lib/backend/config";
import type { ModelCardData } from "./content-types";
import { deriveModelDetail } from "./model-detail";
import {
  buildModelCodeSample,
  resolveSampleEndpoints,
  SAMPLE_LANG_LABELS,
  type SampleLang,
} from "./model-code-samples";
import {
  getCapabilityLabel,
  getModelsUiCopy,
  getTypeTagLabel,
} from "./models-ui-copy";
import {
  CONSOLE_END_DRAWER_SHELL,
  consoleEndDrawerTranslate,
} from "../shared/console-rtl-classes";

const TYPE_TAG_STYLES: Record<string, string> = {
  文本:
    "border-[rgb(145,202,255)] bg-[rgb(230,244,255)] text-[rgb(9,88,217)]",
  图像:
    "border-[rgb(135,232,222)] bg-[rgb(230,255,251)] text-[rgb(8,151,156)]",
  视频:
    "border-[rgb(211,173,247)] bg-[rgb(249,240,255)] text-[rgb(83,29,171)]",
  语音:
    "border-[rgb(255,187,150)] bg-[rgb(255,242,232)] text-[rgb(212,56,13)]",
};

interface ModelDetailDrawerProps {
  model: ModelCardData | null;
  endpointMap?: Record<string, PricingEndpointInfo>;
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

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    /* ignore */
  }
}

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="relative flex items-center py-3">
      <div className="h-px flex-1 bg-slate-200" />
      <span className="px-4 text-lg font-medium text-slate-800">{title}</span>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}

function CodeSamplesBlock({
  model,
  endpointMap,
  hint,
}: {
  model: ModelCardData;
  endpointMap?: Record<string, PricingEndpointInfo>;
  hint: string;
}) {
  const endpoints = useMemo(
    () =>
      resolveSampleEndpoints(model.endpointTypes, endpointMap, model.id),
    [model.endpointTypes, model.id, endpointMap],
  );
  const [endpointType, setEndpointType] = useState(endpoints[0]?.type ?? "");
  const [lang, setLang] = useState<SampleLang>("curl");

  useEffect(() => {
    if (endpoints.length === 0) {
      setEndpointType("");
      return;
    }
    if (!endpoints.some((e) => e.type === endpointType)) {
      setEndpointType(endpoints[0]!.type);
    }
  }, [endpoints, endpointType]);

  const active = endpoints.find((e) => e.type === endpointType) ?? endpoints[0];
  if (!active) return null;

  const baseUrl = getRelayBase() || "https://api.example.com";
  const code = buildModelCodeSample(
    lang,
    active.type,
    model.id,
    active.path,
    baseUrl,
  );

  return (
    <div className="mt-4">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        {endpoints.length > 1 ? (
          <div className="flex flex-wrap gap-1">
            {endpoints.map((ep) => (
              <button
                key={ep.type}
                type="button"
                onClick={() => setEndpointType(ep.type)}
                className={`rounded-[6px] px-2.5 py-1 text-xs transition ${
                  ep.type === active.type
                    ? "bg-[var(--sf-cloud-primary-chip)] text-[var(--sf-cloud-primary)]"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {ep.type}
              </button>
            ))}
          </div>
        ) : null}
        <div className="ms-auto flex flex-wrap gap-1">
          {(Object.keys(SAMPLE_LANG_LABELS) as SampleLang[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`rounded-[6px] px-2.5 py-1 text-xs transition ${
                l === lang
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {SAMPLE_LANG_LABELS[l]}
            </button>
          ))}
        </div>
      </div>
      <div className="relative overflow-hidden rounded-[8px] border border-slate-200 bg-slate-950">
        <button
          type="button"
          onClick={() => copyText(code)}
          className="absolute end-2 top-2 rounded-[6px] bg-white/10 p-1.5 text-slate-200 hover:bg-white/20"
          aria-label="Copy"
        >
          <CopyIcon className="size-3.5" />
        </button>
        <pre className="overflow-x-auto p-4 pe-12 text-xs leading-5 text-slate-100">
          <code>{code}</code>
        </pre>
      </div>
      <p className="mt-2 text-xs text-slate-500">{hint}</p>
    </div>
  );
}

export function ModelDetailDrawer({
  model,
  endpointMap,
  onClose,
}: ModelDetailDrawerProps) {
  const { targetLocale, isRtl } = useLocale();
  const ui = getModelsUiCopy(targetLocale);
  const open = model !== null;
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const [displayModel, setDisplayModel] = useState<ModelCardData | null>(null);

  useEffect(() => {
    if (model) setDisplayModel(model);
  }, [model]);

  useEffect(() => {
    if (open) {
      setVisible(true);
      const id = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(id);
    }
    setEntered(false);
    const t = window.setTimeout(() => {
      setVisible(false);
      setDisplayModel(null);
    }, 300);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!visible || !displayModel) return null;

  const detail = deriveModelDetail(displayModel);
  const price = displayModel.retailPrice;
  const hasPrice =
    price &&
    (price.input !== "—" || price.output !== "—" || price.unit !== "—");

  return (
    <div className="sf-cloud-console pointer-events-none fixed inset-0 z-[1000] !bg-transparent">
      <button
        type="button"
        aria-label={ui.drawer.closeOverlay}
        onClick={onClose}
        className={`pointer-events-auto absolute inset-0 border-0 bg-[rgba(2,6,23,0.45)] transition-opacity duration-300 ${
          entered ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={displayModel.title}
        className={`${CONSOLE_END_DRAWER_SHELL} w-[min(100vw,736px)] text-slate-800 transition-transform duration-300 ease-out ${consoleEndDrawerTranslate(entered, isRtl)}`}
      >
        <div className="hidden-scrollbar flex-1 overflow-y-auto p-6">
          <div className="relative mb-4 h-12 ps-[54px]">
            <div className="absolute start-0 top-1 flex h-full w-12 items-center justify-center">
              <CatalogIcon
                value={displayModel.logo}
                size={40}
                className="size-10"
              />
            </div>
            <div className="flex h-full w-full flex-col justify-center pe-10">
              <button
                type="button"
                onClick={() => copyText(displayModel.title)}
                className="m-0 flex min-w-0 items-center truncate text-base text-slate-700"
                title={ui.drawer.copy}
              >
                <span className="truncate">{displayModel.title}</span>
                <CopyIcon className="ml-1 size-4 shrink-0 text-slate-400" />
              </button>
              <div className="truncate text-xs text-slate-500">
                {displayModel.provider}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={ui.drawer.close}
              className="absolute end-0 top-0 rounded-[6px] p-2 text-slate-800 hover:bg-slate-100"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="mt-1 flex flex-wrap gap-2">
            {displayModel.deprecated ? (
              <span className="inline-flex h-[22px] items-center rounded border border-transparent bg-[rgb(203,213,225)] px-[7px] text-xs text-white">
                Deprecated
              </span>
            ) : null}
            {displayModel.typeTags.map((tag) => (
              <span
                key={tag}
                className={`inline-flex h-[22px] items-center rounded border px-[7px] text-xs ${TYPE_TAG_STYLES[tag] ?? "border-transparent bg-[var(--sf-cloud-primary-chip)] text-[var(--sf-cloud-primary)]"}`}
              >
                {getTypeTagLabel(ui, tag)}
              </span>
            ))}
          </div>

          {displayModel.description ? (
            <div className="mt-4 flex items-start text-sm text-slate-800">
              <div className="mr-3 w-[94px] shrink-0 text-slate-500">
                {ui.drawer.description}
              </div>
              <div className="flex-1 whitespace-pre-wrap leading-6">
                {displayModel.description}
              </div>
            </div>
          ) : null}

          <div className="mb-6 mt-8 w-full">
            <SectionDivider title={ui.drawer.pricing} />
            {hasPrice && price ? (
              <div className="overflow-hidden rounded-[8px] border border-slate-200 text-sm">
                {price.input !== "—" ? (
                  <div className="flex border-b border-slate-100 px-4 py-3">
                    <span className="w-24 shrink-0 text-slate-500">
                      {ui.drawer.priceInput}
                    </span>
                    <span className="font-medium text-slate-800">
                      {price.input}
                      <span className="ml-2 text-xs font-normal text-slate-400">
                        / 1M tokens
                      </span>
                    </span>
                  </div>
                ) : null}
                {price.output !== "—" ? (
                  <div className="flex border-b border-slate-100 px-4 py-3 last:border-b-0">
                    <span className="w-24 shrink-0 text-slate-500">
                      {ui.drawer.priceOutput}
                    </span>
                    <span className="font-medium text-slate-800">
                      {price.output}
                      <span className="ml-2 text-xs font-normal text-slate-400">
                        / 1M tokens
                      </span>
                    </span>
                  </div>
                ) : null}
                {price.cache !== "—" ? (
                  <div className="flex px-4 py-3">
                    <span className="w-24 shrink-0 text-slate-500">
                      {ui.drawer.priceCache}
                    </span>
                    <span className="font-medium text-slate-800">
                      {price.cache}
                      <span className="ml-2 text-xs font-normal text-slate-400">
                        / 1M tokens
                      </span>
                    </span>
                  </div>
                ) : null}
                {price.input === "—" &&
                price.output === "—" &&
                price.unit !== "—" ? (
                  <div className="flex px-4 py-3">
                    <span className="w-24 shrink-0 text-slate-500">
                      {ui.drawer.pricing}
                    </span>
                    <span className="font-medium text-slate-800">
                      {price.unit}
                    </span>
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="px-1 py-4 text-center text-sm text-slate-500">
                {ui.drawer.priceUnavailable}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4 pl-1 text-sm text-slate-800">
            <div className="flex items-start">
              <div className="mr-3 w-[94px] shrink-0 text-slate-500">
                {ui.drawer.provider}
              </div>
              <div className="flex-1">{displayModel.provider}</div>
            </div>
            {detail.context ? (
              <div className="flex items-start">
                <div className="mr-3 w-[94px] shrink-0 text-slate-500">
                  {ui.drawer.context}
                </div>
                <div className="flex-1">{detail.context}</div>
              </div>
            ) : null}
            {detail.capabilities.length > 0 ? (
              <div className="flex items-start">
                <div className="mr-3 w-[94px] shrink-0 text-slate-500">
                  {ui.drawer.capabilities}
                </div>
                <div className="flex flex-1 flex-wrap gap-2">
                  {detail.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="inline-flex h-[22px] items-center rounded bg-[var(--sf-cloud-primary-chip)] px-2 text-xs text-[var(--sf-cloud-primary)]"
                    >
                      {getCapabilityLabel(ui, cap)}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="mb-2 mt-8 w-full">
            <SectionDivider title={ui.drawer.access} />
            <a
              href={detail.apiDocsHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 min-w-[140px] cursor-pointer items-center justify-center rounded-[8px] bg-[rgba(108,40,246,0.2)] px-5 text-base text-[rgb(108,40,246)] hover:opacity-90"
            >
              {ui.drawer.apiDocs}
            </a>
            <div className="mt-5 text-sm font-medium text-slate-800">
              {ui.drawer.codeSamples}
            </div>
            <CodeSamplesBlock
              model={displayModel}
              endpointMap={endpointMap}
              hint={ui.drawer.replaceApiKeyHint}
            />
          </div>
        </div>
      </aside>
    </div>
  );
}
