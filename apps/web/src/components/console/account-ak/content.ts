export const pageTitle = "API 密钥";

export const warningMessage =
  "API Key 是您访问 basedong Relay 的凭证，请妥善保管。按词元用量扣减额度。";

/** Shown under the table — developer-facing Relay base (not SiliconFlow). */
export function relayIntegrationHint(relayBase: string): string {
  const base = relayBase || "https://<your-basedong-api-host>";
  return `Relay 基址：${base}　·　示例 POST ${base}/v1/chat/completions　·　Authorization: Bearer <API Key>`;
}

export const createButtonLabel = "新建 API Key";

export const tableHeaders = {
  key: "密钥(点击复制)",
  description: "描述",
  createdAt: "创建时间",
  actions: "操作",
} as const;

export const emptyText = "暂无数据";

export const modalCopy = {
  title: "新建密钥",
  label: "密钥描述",
  placeholder: "请输入描述信息",
  help: "关于密钥用途等的补充说明",
  cancel: "取 消",
  submit: "新建密钥",
} as const;

export const deleteModalCopy = {
  title: "确认删除密钥",
  warning:
    "API Key 删除后无法恢复，请确认",
  promptBefore: "请输入",
  promptAfter: "确认删除当前 API Key",
  cancel: "取 消",
  confirm: "确认删除",
  mismatchError: "输入的 API Key 后六位不正确，请重新输入！",
} as const;

export const toasts = {
  createSuccess: "API Key 创建成功！",
  deleteSuccess: "API Key 删除成功！",
  updateSuccess: "API Key 更新成功！",
  copySuccess: "复制成功",
} as const;

export interface ApiKeyRow {
  id: string;
  key: string;
  description: string;
  createdAt: string;
}

/** Live account observed empty — default empty; modal can append mock rows */
export const initialKeys: ApiKeyRow[] = [];
