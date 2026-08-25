export const pageTitle = "API 密钥";

export const warningMessage =
  "API 密钥 是您访问 SiliconFlow 接口的凭证，具有该账户的完整权限，请您妥善保管。";

export const createButtonLabel = "🔑 新建 API 密钥";

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
    "密钥删除后无法恢复，无法在 SiliconFlow 中查看历史使用记录和用量数据，请确认",
  promptBefore: "请输入",
  promptAfter: "确认删除当前密钥",
  cancel: "取 消",
  confirm: "确认删除",
  mismatchError: "输入的API密钥后六位不正确，请重新输入！",
} as const;

export const toasts = {
  createSuccess: "API密钥创建成功！",
  deleteSuccess: "API密钥删除成功！",
  updateSuccess: "API密钥更新成功！",
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
