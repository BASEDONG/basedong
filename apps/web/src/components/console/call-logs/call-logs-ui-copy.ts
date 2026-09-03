import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";

export type CallLogsUiCopy = {
  pageTitle: string;
  quotaUsed: string;
  rpm: string;
  tpm: string;
  refresh: string;
  loadFailed: string;
};

const zhCN: CallLogsUiCopy = {
  pageTitle: "调用记录",
  quotaUsed: "扣减额度合计",
  rpm: "RPM",
  tpm: "TPM",
  refresh: "刷新",
  loadFailed: "加载调用记录失败",
};

const en: CallLogsUiCopy = {
  pageTitle: "Call history",
  quotaUsed: "Quota used",
  rpm: "RPM",
  tpm: "TPM",
  refresh: "Refresh",
  loadFailed: "Failed to load call history",
};

const zhTW: CallLogsUiCopy = {
  ...zhCN,
  pageTitle: "呼叫記錄",
  quotaUsed: "扣減額度合計",
  refresh: "重新整理",
  loadFailed: "載入呼叫記錄失敗",
};

const ja: CallLogsUiCopy = {
  ...en,
  pageTitle: "呼び出し履歴",
  quotaUsed: "消費枠合計",
  refresh: "更新",
  loadFailed: "呼び出し履歴の読み込みに失敗しました",
};

const fr = en;
const ru = en;
const vi = en;
const ko = en;
const de = en;
const es = en;
const ar = en;
const hi = en;
const id = en;

const CATALOG: Record<TargetLocale, CallLogsUiCopy> = {
  "zh-CN": zhCN,
  en,
  "zh-TW": zhTW,
  ja,
  fr,
  ru,
  vi,
  ko,
  de,
  es,
  "pt-BR": en,
  ar,
  hi,
  id,
};

export function getCallLogsUiCopy(locale: string): CallLogsUiCopy {
  return pickTargetCatalog(locale, CATALOG);
}
