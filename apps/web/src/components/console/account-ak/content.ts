export interface ApiKeyRow {
  id: string;
  key: string;
  description: string;
  createdAt: string;
}

/** Live account observed empty — default empty; modal can append mock rows */
export const initialKeys: ApiKeyRow[] = [];
