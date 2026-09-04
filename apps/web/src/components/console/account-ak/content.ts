export interface ApiKeyRow {
  id: string;
  key: string;
  description: string;
  createdAt: string;
  status: number;
  usedQuota: number;
  remainQuota: number;
  unlimitedQuota: boolean;
  expiredTime: number;
  group: string;
  modelLimits: string;
  allowIps: string;
  accessedAt: string;
}

/** Live account observed empty — default empty; modal can append mock rows */
export const initialKeys: ApiKeyRow[] = [];

export const API_KEY_STATUS_ENABLED = 1;
export const API_KEY_STATUS_DISABLED = 2;
export const API_KEY_STATUS_EXPIRED = 3;
export const API_KEY_STATUS_EXHAUSTED = 4;

export const API_KEYS_PAGE_SIZE = 10;
