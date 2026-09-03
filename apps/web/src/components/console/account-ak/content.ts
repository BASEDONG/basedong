export interface ApiKeyRow {
  id: string;
  key: string;
  description: string;
  createdAt: string;
  status: number;
  usedQuota: number;
  accessedAt: string;
}

/** Live account observed empty — default empty; modal can append mock rows */
export const initialKeys: ApiKeyRow[] = [];

export const API_KEY_STATUS_ENABLED = 1;
export const API_KEY_STATUS_DISABLED = 2;
