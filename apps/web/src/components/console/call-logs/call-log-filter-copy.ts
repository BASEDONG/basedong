import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";

export type CallLogFilterCopy = {
  startDate: string;
  endDate: string;
  modelName: string;
  modelNamePlaceholder: string;
  apiKeyName: string;
  apiKeyNamePlaceholder: string;
  search: string;
  colTime: string;
  colModel: string;
  colApiKey: string;
  colQuota: string;
  colTokens: string;
  empty: string;
  totalRows: (n: number) => string;
  usageHint: string;
};

const zhCN: CallLogFilterCopy = {
  startDate: "开始日期",
  endDate: "结束日期",
  modelName: "模型",
  modelNamePlaceholder: "模型名称",
  apiKeyName: "API 密钥名称",
  apiKeyNamePlaceholder: "密钥名称",
  search: "查询",
  colTime: "时间",
  colModel: "模型",
  colApiKey: "API 密钥",
  colQuota: "扣减额度",
  colTokens: "词元",
  empty: "所选条件下暂无调用记录",
  totalRows: (n) => `共 ${n} 条`,
  usageHint:
    "调用记录来自 Backend 用量日志（/api/log/self）。Relay 与在线体验均会计入。",
};

const en: CallLogFilterCopy = {
  startDate: "Start date",
  endDate: "End date",
  modelName: "Model",
  modelNamePlaceholder: "Model name",
  apiKeyName: "API key name",
  apiKeyNamePlaceholder: "Key name",
  search: "Search",
  colTime: "Time",
  colModel: "Model",
  colApiKey: "API key",
  colQuota: "Quota",
  colTokens: "Tokens",
  empty: "No call records for this filter",
  totalRows: (n) => `${n} rows`,
  usageHint:
    "Call history comes from Backend usage logs (/api/log/self). Relay and Playground both appear here.",
};

const CATALOG: Record<TargetLocale, CallLogFilterCopy> = {
  "zh-CN": zhCN,
  en,
  "zh-TW": {
    ...zhCN,
    startDate: "開始日期",
    endDate: "結束日期",
    modelName: "模型",
    apiKeyName: "API 密鑰名稱",
    search: "查詢",
    empty: "所選條件下暫無呼叫記錄",
    totalRows: (n) => `共 ${n} 條`,
    usageHint: "呼叫記錄來自 Backend 用量日誌。Relay 與線上體驗均會計入。",
  },
  ja: {
    ...en,
    startDate: "開始日",
    endDate: "終了日",
    modelName: "モデル",
    apiKeyName: "API キー名",
    search: "検索",
    colQuota: "消費枠",
    colTokens: "トークン",
    empty: "条件に一致する呼び出し記録がありません",
    totalRows: (n) => `${n} 件`,
    usageHint: "呼び出し記録は Backend の利用ログです。",
  },
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

export function getCallLogFilterCopy(locale: string): CallLogFilterCopy {
  return pickTargetCatalog(locale, CATALOG);
}
