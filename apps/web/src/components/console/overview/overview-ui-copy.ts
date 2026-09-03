import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";

export type OverviewUiCopy = {
  pageTitle: string;
  remainingQuota: string;
  usedQuota: string;
  requests: string;
  topModels: string;
  empty: string;
  loadFailed: string;
  last7Days: string;
};

const zhCN: OverviewUiCopy = {
  pageTitle: "用量概览",
  remainingQuota: "剩余额度",
  usedQuota: "已用额度",
  requests: "近 7 日请求次数",
  topModels: "近 7 日模型用量",
  empty: "暂无用量数据。调用 Relay 或在线体验后将显示在这里。",
  loadFailed: "加载用量概览失败",
  last7Days: "近 7 日",
};

const en: OverviewUiCopy = {
  pageTitle: "Usage overview",
  remainingQuota: "Remaining quota",
  usedQuota: "Used quota",
  requests: "Requests (7 days)",
  topModels: "Model usage (7 days)",
  empty: "No usage yet. Relay or Playground calls will appear here.",
  loadFailed: "Failed to load usage overview",
  last7Days: "Last 7 days",
};

const CATALOG: Record<TargetLocale, OverviewUiCopy> = {
  "zh-CN": zhCN,
  en,
  "zh-TW": { ...zhCN, pageTitle: "用量概覽", remainingQuota: "剩餘額度", usedQuota: "已用額度", requests: "近 7 日請求次數", topModels: "近 7 日模型用量", empty: "暫無用量資料。", loadFailed: "載入用量概覽失敗", last7Days: "近 7 日" },
  ja: { ...en, pageTitle: "利用概要", remainingQuota: "残り枠", usedQuota: "使用済み枠", requests: "直近7日のリクエスト", topModels: "直近7日のモデル利用", empty: "利用データがありません。", loadFailed: "利用概要の読み込みに失敗しました", last7Days: "直近7日" },
  fr: en,
  ru: en,
  vi: en,
  ko: en,
  de: en,
  es: en,
  "pt-BR": en,
  ar: en,
  hi: en,
  id: en,
};

export function getOverviewUiCopy(locale: string): OverviewUiCopy {
  return pickTargetCatalog(locale, CATALOG);
}
