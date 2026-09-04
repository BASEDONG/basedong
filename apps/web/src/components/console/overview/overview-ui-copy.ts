import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";

export type OverviewUiCopy = {
  pageTitle: string;
  remainingQuota: string;
  usedQuota: string;
  balanceSection: string;
  rangeSection: string;
  rangeQuota: string;
  rangeRequests: string;
  rangeTokens: string;
  topModels: string;
  trendTitle: string;
  flowSection: string;
  flowByKey: string;
  flowByModel: string;
  empty: string;
  emptyRange: string;
  loadFailed: string;
  refresh: string;
  presetDays: (days: number) => string;
  granularityHour: string;
  granularityDay: string;
  granularityWeek: string;
  customRange: string;
  rangeInvalid: string;
  applyRange: string;
  startDate: string;
  endDate: string;
};

const zhCN: OverviewUiCopy = {
  pageTitle: "用量概览",
  remainingQuota: "剩余额度",
  usedQuota: "已用额度",
  balanceSection: "账户",
  rangeSection: "区间用量",
  rangeQuota: "消耗额度",
  rangeRequests: "请求次数",
  rangeTokens: "词元",
  topModels: "模型用量排行",
  trendTitle: "用量趋势",
  flowSection: "调用流向",
  flowByKey: "按 API Key",
  flowByModel: "按模型",
  empty: "暂无用量数据。调用 Relay 或在线体验后将显示在这里。",
  emptyRange: "所选时间范围内暂无用量数据。",
  loadFailed: "加载用量概览失败",
  refresh: "刷新",
  presetDays: (days) => `近 ${days} 日`,
  granularityHour: "按小时",
  granularityDay: "按天",
  granularityWeek: "按周",
  customRange: "自定义",
  rangeInvalid: "时间范围无效（结束须晚于开始，且不超过 30 天）。",
  applyRange: "应用",
  startDate: "开始",
  endDate: "结束",
};

const en: OverviewUiCopy = {
  pageTitle: "Usage overview",
  remainingQuota: "Remaining quota",
  usedQuota: "Used quota",
  balanceSection: "Account",
  rangeSection: "Range usage",
  rangeQuota: "Quota used",
  rangeRequests: "Requests",
  rangeTokens: "Tokens",
  topModels: "Top models",
  trendTitle: "Usage trend",
  flowSection: "Traffic flow",
  flowByKey: "By API Key",
  flowByModel: "By model",
  empty: "No usage yet. Relay or Playground calls will appear here.",
  emptyRange: "No usage in the selected time range.",
  loadFailed: "Failed to load usage overview",
  refresh: "Refresh",
  presetDays: (days) => `Last ${days}d`,
  granularityHour: "Hour",
  granularityDay: "Day",
  granularityWeek: "Week",
  customRange: "Custom",
  rangeInvalid:
    "Invalid range (end must be after start, and at most 30 days).",
  applyRange: "Apply",
  startDate: "Start",
  endDate: "End",
};

function fromEn(partial: Partial<OverviewUiCopy>): OverviewUiCopy {
  return {
    ...en,
    ...partial,
    presetDays: partial.presetDays ?? en.presetDays,
  };
}

const CATALOG: Record<TargetLocale, OverviewUiCopy> = {
  "zh-CN": zhCN,
  en,
  "zh-TW": {
    ...zhCN,
    pageTitle: "用量概覽",
    remainingQuota: "剩餘額度",
    usedQuota: "已用額度",
    balanceSection: "帳戶",
    rangeSection: "區間用量",
    rangeQuota: "消耗額度",
    rangeRequests: "請求次數",
    rangeTokens: "詞元",
    topModels: "模型用量排行",
    trendTitle: "用量趨勢",
    flowSection: "呼叫流向",
    flowByKey: "按 API Key",
    flowByModel: "按模型",
    empty: "暫無用量資料。呼叫 Relay 或線上體驗後將顯示在這裡。",
    emptyRange: "所選時間範圍內暫無用量資料。",
    loadFailed: "載入用量概覽失敗",
    refresh: "重新整理",
    presetDays: (days) => `近 ${days} 日`,
    granularityHour: "按小時",
    granularityDay: "按天",
    granularityWeek: "按週",
    customRange: "自訂",
    rangeInvalid: "時間範圍無效（結束須晚於開始，且不超過 30 天）。",
    applyRange: "套用",
    startDate: "開始",
    endDate: "結束",
  },
  ja: fromEn({
    pageTitle: "利用概要",
    remainingQuota: "残り枠",
    usedQuota: "使用済み枠",
    balanceSection: "アカウント",
    rangeSection: "期間の利用",
    rangeQuota: "消費枠",
    rangeRequests: "リクエスト",
    rangeTokens: "トークン",
    topModels: "モデル利用ランキング",
    trendTitle: "利用トレンド",
    flowSection: "トラフィックフロー",
    flowByKey: "API Key 別",
    flowByModel: "モデル別",
    empty: "利用データがありません。",
    emptyRange: "選択した期間に利用データがありません。",
    loadFailed: "利用概要の読み込みに失敗しました",
    refresh: "更新",
    presetDays: (days) => `直近${days}日`,
    granularityHour: "時間",
    granularityDay: "日",
    granularityWeek: "週",
    customRange: "カスタム",
    rangeInvalid: "期間が無効です（終了は開始より後、最大30日）。",
    applyRange: "適用",
    startDate: "開始",
    endDate: "終了",
  }),
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
