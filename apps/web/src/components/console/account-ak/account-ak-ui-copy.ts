import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";

export type ApiKeysUiCopy = {
  pageTitle: string;
  warningMessage: string;
  relayIntegrationHint: (relayBase: string) => string;
  createButtonLabel: string;
  loading: string;
  searchPlaceholder?: string;
  searchSubmit?: string;
  batchCopy?: string;
  batchDelete?: string;
  selectedCount?: (n: number) => string;
  recordsPrev?: string;
  recordsNext?: string;
  recordsPage?: (page: number, totalPages: number) => string;
  recordsTotal?: (total: number) => string;
  tableHeaders: {
    key: string;
    description: string;
    createdAt: string;
    actions: string;
    status?: string;
    usedQuota?: string;
    remainQuota?: string;
    group?: string;
  };
  emptyText: string;
  unlimited?: string;
  neverExpire?: string;
  table: {
    delete: string;
    edit: string;
    copyAria: string;
    emptyAria: string;
    enable?: string;
    disable?: string;
    statusEnabled?: string;
    statusDisabled?: string;
    statusExpired?: string;
    statusExhausted?: string;
  };
  createModal: {
    title: string;
    label: string;
    placeholder: string;
    help: string;
    cancel: string;
    submit: string;
    remainQuota?: string;
    unlimitedQuota?: string;
    group?: string;
    groupPlaceholder?: string;
    modelLimits?: string;
    modelLimitsHelp?: string;
    allowIps?: string;
    allowIpsHelp?: string;
    expiredNever?: string;
  };
  editModal: {
    title: string;
    label: string;
    placeholder: string;
    help: string;
    cancel: string;
    save: string;
  };
  deleteModal: {
    title: string;
    warning: string;
    promptBefore: string;
    promptAfter: string;
    cancel: string;
    confirm: string;
    mismatchError: string;
  };
  toasts: {
    createSuccess: string;
    deleteSuccess: string;
    updateSuccess: string;
    copySuccess: string;
    batchDeleteSuccess?: string;
  };
  errors: {
    loadFailed: string;
    createFailed: string;
    updateFailed: string;
    deleteFailed: string;
    revealFailed: string;
    batchFailed?: string;
  };
};

function relayHint(
  relayBase: string,
  parts: { base: string; example: string; auth: string },
): string {
  const base = relayBase || "https://<your-basedong-api-host>";
  return `${parts.base}${base}　·　${parts.example}${base}/v1/chat/completions　·　${parts.auth}`;
}

const zhCN: ApiKeysUiCopy = {
  pageTitle: "API 密钥",
  warningMessage:
    "API Key 是您访问 basedong Relay 的凭证，请妥善保管。按词元用量扣减额度。",
  relayIntegrationHint: (relayBase) =>
    relayHint(relayBase, {
      base: "Relay 基址：",
      example: "示例 POST ",
      auth: "Authorization: Bearer <API Key>",
    }),
  createButtonLabel: "新建 API Key",
  loading: "加载中…",
  searchPlaceholder: "搜索名称或密钥",
  searchSubmit: "搜索",
  batchCopy: "批量复制",
  batchDelete: "批量删除",
  selectedCount: (n) => `已选 ${n} 项`,
  recordsPrev: "上一页",
  recordsNext: "下一页",
  recordsPage: (page, totalPages) => `${page} / ${totalPages}`,
  recordsTotal: (total) => `共 ${total} 条`,
  tableHeaders: {
    key: "密钥(点击复制)",
    description: "描述",
    createdAt: "创建时间",
    actions: "操作",
    status: "状态",
    usedQuota: "已用额度",
    remainQuota: "剩余额度",
    group: "分组",
  },
  emptyText: "暂无数据",
  unlimited: "不限",
  neverExpire: "永不过期",
  table: {
    delete: "删除",
    edit: "编辑",
    copyAria: "复制",
    emptyAria: "暂无数据",
    enable: "启用",
    disable: "停用",
    statusEnabled: "已启用",
    statusDisabled: "已停用",
    statusExpired: "已过期",
    statusExhausted: "已耗尽",
  },
  createModal: {
    title: "新建密钥",
    label: "密钥描述",
    placeholder: "请输入描述信息",
    help: "关于密钥用途等的补充说明",
    cancel: "取 消",
    submit: "新建密钥",
    remainQuota: "额度",
    unlimitedQuota: "不限额度",
    group: "分组",
    groupPlaceholder: "留空为默认分组",
    modelLimits: "模型限制",
    modelLimitsHelp: "逗号分隔模型名；留空表示不限制",
    allowIps: "IP 白名单",
    allowIpsHelp: "每行一个 IP；留空表示不限制",
    expiredNever: "永不过期",
  },
  editModal: {
    title: "编辑密钥",
    label: "密钥描述",
    placeholder: "请输入描述信息",
    help: "关于密钥用途等的补充说明",
    cancel: "取 消",
    save: "保 存",
  },
  deleteModal: {
    title: "确认删除密钥",
    warning: "API Key 删除后无法恢复，请确认",
    promptBefore: "请输入",
    promptAfter: "确认删除当前 API Key",
    cancel: "取 消",
    confirm: "确认删除",
    mismatchError: "输入的 API Key 后四位不正确，请重新输入！",
  },
  toasts: {
    createSuccess: "API Key 创建成功！",
    deleteSuccess: "API Key 删除成功！",
    updateSuccess: "API Key 更新成功！",
    copySuccess: "复制成功",
    batchDeleteSuccess: "已批量删除",
  },
  errors: {
    loadFailed: "加载 API Key 失败",
    createFailed: "创建 API Key 失败",
    updateFailed: "更新描述失败",
    deleteFailed: "删除失败",
    revealFailed: "读取密钥失败",
    batchFailed: "批量操作失败",
  },
};

const en: ApiKeysUiCopy = {
  pageTitle: "API Keys",
  warningMessage:
    "Your API Key is your credential for accessing the basedong Relay. Keep it secure. Quota is deducted by usage units consumed.",
  relayIntegrationHint: (relayBase) =>
    relayHint(relayBase, {
      base: "Relay base: ",
      example: "Example POST ",
      auth: "Authorization: Bearer <API Key>",
    }),
  createButtonLabel: "Create API Key",
  loading: "Loading…",
  searchPlaceholder: "Search name or key",
  searchSubmit: "Search",
  batchCopy: "Copy selected",
  batchDelete: "Delete selected",
  selectedCount: (n) => `${n} selected`,
  recordsPrev: "Prev",
  recordsNext: "Next",
  recordsPage: (page, totalPages) => `${page} / ${totalPages}`,
  recordsTotal: (total) => `${total} total`,
  tableHeaders: {
    key: "Key (click to copy)",
    description: "Description",
    createdAt: "Created",
    actions: "Actions",
    status: "Status",
    usedQuota: "Used quota",
    remainQuota: "Remaining quota",
    group: "Group",
  },
  emptyText: "No data",
  unlimited: "Unlimited",
  neverExpire: "Never expires",
  table: {
    delete: "Delete",
    edit: "Edit",
    copyAria: "Copy",
    emptyAria: "No data",
    enable: "Enable",
    disable: "Disable",
    statusEnabled: "Enabled",
    statusDisabled: "Disabled",
    statusExpired: "Expired",
    statusExhausted: "Exhausted",
  },
  createModal: {
    title: "Create key",
    label: "Key description",
    placeholder: "Enter a description",
    help: "Optional notes about how you will use this key",
    cancel: "Cancel",
    submit: "Create key",
    remainQuota: "Quota",
    unlimitedQuota: "Unlimited quota",
    group: "Group",
    groupPlaceholder: "Leave empty for default group",
    modelLimits: "Model allowlist",
    modelLimitsHelp: "Comma-separated model names; empty means no limit",
    allowIps: "IP allowlist",
    allowIpsHelp: "One IP per line; empty means no limit",
    expiredNever: "Never expires",
  },
  editModal: {
    title: "Edit key",
    label: "Key description",
    placeholder: "Enter a description",
    help: "Optional notes about how you will use this key",
    cancel: "Cancel",
    save: "Save",
  },
  deleteModal: {
    title: "Delete key",
    warning: "Deleted API Keys cannot be recovered. Please confirm.",
    promptBefore: "Enter",
    promptAfter: "to confirm deletion of this API Key",
    cancel: "Cancel",
    confirm: "Delete",
    mismatchError:
      "The last four characters of the API Key do not match. Try again.",
  },
  toasts: {
    createSuccess: "API Key created.",
    deleteSuccess: "API Key deleted.",
    updateSuccess: "API Key updated.",
    copySuccess: "Copied",
    batchDeleteSuccess: "Selected API Keys deleted.",
  },
  errors: {
    loadFailed: "Failed to load API Keys",
    createFailed: "Failed to create API Key",
    updateFailed: "Failed to update description",
    deleteFailed: "Failed to delete",
    revealFailed: "Failed to read key",
    batchFailed: "Batch operation failed",
  },
};

const zhTW: ApiKeysUiCopy = {
  ...zhCN,
  pageTitle: "API 金鑰",
  warningMessage:
    "API Key 是您存取 basedong Relay 的憑證，請妥善保管。按詞元用量扣減額度。",
  relayIntegrationHint: (relayBase) =>
    relayHint(relayBase, {
      base: "Relay 基址：",
      example: "範例 POST ",
      auth: "Authorization: Bearer <API Key>",
    }),
  createButtonLabel: "新建 API Key",
  loading: "載入中…",
  tableHeaders: {
    key: "金鑰（點擊複製）",
    description: "描述",
    createdAt: "建立時間",
    actions: "操作",
  },
  emptyText: "暫無資料",
  table: {
    delete: "刪除",
    edit: "編輯",
    copyAria: "複製",
    emptyAria: "暫無資料",
  },
  createModal: {
    title: "新建金鑰",
    label: "金鑰描述",
    placeholder: "請輸入描述資訊",
    help: "關於金鑰用途等的補充說明",
    cancel: "取 消",
    submit: "新建金鑰",
  },
  editModal: {
    title: "編輯金鑰",
    label: "金鑰描述",
    placeholder: "請輸入描述資訊",
    help: "關於金鑰用途等的補充說明",
    cancel: "取 消",
    save: "保 存",
  },
  deleteModal: {
    title: "確認刪除金鑰",
    warning: "API Key 刪除後無法恢復，請確認",
    promptBefore: "請輸入",
    promptAfter: "確認刪除目前 API Key",
    cancel: "取 消",
    confirm: "確認刪除",
    mismatchError: "輸入的 API Key 後四位不正確，請重新輸入！",
  },
  toasts: {
    createSuccess: "API Key 建立成功！",
    deleteSuccess: "API Key 刪除成功！",
    updateSuccess: "API Key 更新成功！",
    copySuccess: "複製成功",
  },
  errors: {
    loadFailed: "載入 API Key 失敗",
    createFailed: "建立 API Key 失敗",
    updateFailed: "更新描述失敗",
    deleteFailed: "刪除失敗",
    revealFailed: "讀取金鑰失敗",
  },
};

function fromEn(
  partial: Partial<Omit<ApiKeysUiCopy, "relayIntegrationHint">> & {
    relayIntegrationHint?: ApiKeysUiCopy["relayIntegrationHint"];
  },
): ApiKeysUiCopy {
  return {
    ...en,
    ...partial,
    tableHeaders: { ...en.tableHeaders, ...partial.tableHeaders },
    table: { ...en.table, ...partial.table },
    createModal: { ...en.createModal, ...partial.createModal },
    editModal: { ...en.editModal, ...partial.editModal },
    deleteModal: { ...en.deleteModal, ...partial.deleteModal },
    toasts: { ...en.toasts, ...partial.toasts },
    errors: { ...en.errors, ...partial.errors },
  };
}

const ja = fromEn({
  pageTitle: "API キー",
  warningMessage:
    "API Key は basedong Relay へのアクセス資格情報です。安全に保管してください。使用量（利用単位）に応じて枠が差し引かれます。",
  relayIntegrationHint: (relayBase) =>
    relayHint(relayBase, {
      base: "Relay ベース URL: ",
      example: "例 POST ",
      auth: "Authorization: Bearer <API Key>",
    }),
  createButtonLabel: "API Key を作成",
  loading: "読み込み中…",
  tableHeaders: {
    key: "キー（クリックでコピー）",
    description: "説明",
    createdAt: "作成日時",
    actions: "操作",
  },
  emptyText: "データなし",
  table: { delete: "削除", edit: "編集", copyAria: "コピー", emptyAria: "データなし" },
  createModal: {
    title: "キーを作成",
    label: "キーの説明",
    placeholder: "説明を入力",
    help: "キーの用途などの補足",
    cancel: "キャンセル",
    submit: "キーを作成",
  },
  editModal: {
    title: "キーを編集",
    label: "キーの説明",
    placeholder: "説明を入力",
    help: "キーの用途などの補足",
    cancel: "キャンセル",
    save: "保存",
  },
  deleteModal: {
    title: "キーを削除",
    warning: "削除した API Key は復元できません。確認してください。",
    promptBefore: "入力:",
    promptAfter: "（この API Key の削除を確認）",
    cancel: "キャンセル",
    confirm: "削除",
    mismatchError: "API Key の末尾 4 文字が一致しません。",
  },
  toasts: {
    createSuccess: "API Key を作成しました。",
    deleteSuccess: "API Key を削除しました。",
    updateSuccess: "API Key を更新しました。",
    copySuccess: "コピーしました",
  },
  errors: {
    loadFailed: "API Key の読み込みに失敗しました",
    createFailed: "API Key の作成に失敗しました",
    updateFailed: "説明の更新に失敗しました",
    deleteFailed: "削除に失敗しました",
    revealFailed: "キーの取得に失敗しました",
  },
});

const fr = fromEn({
  pageTitle: "Clés API",
  warningMessage:
    "Votre clé API est votre identifiant d'accès au Relay basedong. Conservez-la en sécurité. Le quota est déduit selon les unités d'utilisation consommées.",
  relayIntegrationHint: (relayBase) =>
    relayHint(relayBase, {
      base: "Base Relay : ",
      example: "Exemple POST ",
      auth: "Authorization: Bearer <API Key>",
    }),
  createButtonLabel: "Créer une clé API",
  loading: "Chargement…",
  tableHeaders: {
    key: "Clé (cliquer pour copier)",
    description: "Description",
    createdAt: "Créée le",
    actions: "Actions",
  },
  emptyText: "Aucune donnée",
  table: {
    delete: "Supprimer",
    edit: "Modifier",
    copyAria: "Copier",
    emptyAria: "Aucune donnée",
  },
  createModal: {
    title: "Créer une clé",
    label: "Description de la clé",
    placeholder: "Saisir une description",
    help: "Notes optionnelles sur l'usage de cette clé",
    cancel: "Annuler",
    submit: "Créer",
  },
  editModal: {
    title: "Modifier la clé",
    label: "Description de la clé",
    placeholder: "Saisir une description",
    help: "Notes optionnelles sur l'usage de cette clé",
    cancel: "Annuler",
    save: "Enregistrer",
  },
  deleteModal: {
    title: "Supprimer la clé",
    warning: "Une clé API supprimée ne peut pas être récupérée. Confirmez.",
    promptBefore: "Saisissez",
    promptAfter: "pour confirmer la suppression de cette clé API",
    cancel: "Annuler",
    confirm: "Supprimer",
    mismatchError:
      "Les quatre derniers caractères de la clé API ne correspondent pas.",
  },
  toasts: {
    createSuccess: "Clé API créée.",
    deleteSuccess: "Clé API supprimée.",
    updateSuccess: "Clé API mise à jour.",
    copySuccess: "Copié",
  },
  errors: {
    loadFailed: "Échec du chargement des clés API",
    createFailed: "Échec de la création de la clé API",
    updateFailed: "Échec de la mise à jour de la description",
    deleteFailed: "Échec de la suppression",
    revealFailed: "Échec de la lecture de la clé",
  },
});

const ru = fromEn({
  pageTitle: "API-ключи",
  warningMessage:
    "API Key — ваши учётные данные для доступа к Relay basedong. Храните их в безопасности. Квота списывается по потреблённым единицам использования.",
  relayIntegrationHint: (relayBase) =>
    relayHint(relayBase, {
      base: "Базовый URL Relay: ",
      example: "Пример POST ",
      auth: "Authorization: Bearer <API Key>",
    }),
  createButtonLabel: "Создать API Key",
  loading: "Загрузка…",
  tableHeaders: {
    key: "Ключ (нажмите, чтобы скопировать)",
    description: "Описание",
    createdAt: "Создан",
    actions: "Действия",
  },
  emptyText: "Нет данных",
  table: {
    delete: "Удалить",
    edit: "Изменить",
    copyAria: "Копировать",
    emptyAria: "Нет данных",
  },
  createModal: {
    title: "Создать ключ",
    label: "Описание ключа",
    placeholder: "Введите описание",
    help: "Необязательные заметки об использовании ключа",
    cancel: "Отмена",
    submit: "Создать",
  },
  editModal: {
    title: "Изменить ключ",
    label: "Описание ключа",
    placeholder: "Введите описание",
    help: "Необязательные заметки об использовании ключа",
    cancel: "Отмена",
    save: "Сохранить",
  },
  deleteModal: {
    title: "Удалить ключ",
    warning: "Удалённый API Key нельзя восстановить. Подтвердите действие.",
    promptBefore: "Введите",
    promptAfter: "для подтверждения удаления этого API Key",
    cancel: "Отмена",
    confirm: "Удалить",
    mismatchError: "Последние 4 символа API Key не совпадают.",
  },
  toasts: {
    createSuccess: "API Key создан.",
    deleteSuccess: "API Key удалён.",
    updateSuccess: "API Key обновлён.",
    copySuccess: "Скопировано",
  },
  errors: {
    loadFailed: "Не удалось загрузить API Keys",
    createFailed: "Не удалось создать API Key",
    updateFailed: "Не удалось обновить описание",
    deleteFailed: "Не удалось удалить",
    revealFailed: "Не удалось прочитать ключ",
  },
});

const vi = fromEn({
  pageTitle: "Khóa API",
  warningMessage:
    "API Key là thông tin xác thực truy cập Relay basedong. Hãy bảo mật. Hạn mức bị trừ theo đơn vị sử dụng tiêu thụ.",
  relayIntegrationHint: (relayBase) =>
    relayHint(relayBase, {
      base: "Relay base: ",
      example: "Ví dụ POST ",
      auth: "Authorization: Bearer <API Key>",
    }),
  createButtonLabel: "Tạo API Key",
  loading: "Đang tải…",
  tableHeaders: {
    key: "Khóa (bấm để sao chép)",
    description: "Mô tả",
    createdAt: "Tạo lúc",
    actions: "Thao tác",
  },
  emptyText: "Không có dữ liệu",
  table: {
    delete: "Xóa",
    edit: "Sửa",
    copyAria: "Sao chép",
    emptyAria: "Không có dữ liệu",
  },
  createModal: {
    title: "Tạo khóa",
    label: "Mô tả khóa",
    placeholder: "Nhập mô tả",
    help: "Ghi chú tùy chọn về cách dùng khóa",
    cancel: "Hủy",
    submit: "Tạo khóa",
  },
  editModal: {
    title: "Sửa khóa",
    label: "Mô tả khóa",
    placeholder: "Nhập mô tả",
    help: "Ghi chú tùy chọn về cách dùng khóa",
    cancel: "Hủy",
    save: "Lưu",
  },
  deleteModal: {
    title: "Xóa khóa",
    warning: "API Key đã xóa không thể khôi phục. Vui lòng xác nhận.",
    promptBefore: "Nhập",
    promptAfter: "để xác nhận xóa API Key này",
    cancel: "Hủy",
    confirm: "Xóa",
    mismatchError: "4 ký tự cuối của API Key không khớp.",
  },
  toasts: {
    createSuccess: "Đã tạo API Key.",
    deleteSuccess: "Đã xóa API Key.",
    updateSuccess: "Đã cập nhật API Key.",
    copySuccess: "Đã sao chép",
  },
  errors: {
    loadFailed: "Không tải được API Keys",
    createFailed: "Không tạo được API Key",
    updateFailed: "Không cập nhật được mô tả",
    deleteFailed: "Không xóa được",
    revealFailed: "Không đọc được khóa",
  },
});

const ko = fromEn({
  pageTitle: "API 키",
  warningMessage:
    "API Key는 basedong Relay 접근 자격 증명입니다. 안전하게 보관하세요. 사용량(이용 단위)에 따라 한도가 차감됩니다.",
  relayIntegrationHint: (relayBase) =>
    relayHint(relayBase, {
      base: "Relay 기본 URL: ",
      example: "예시 POST ",
      auth: "Authorization: Bearer <API Key>",
    }),
  createButtonLabel: "API Key 만들기",
  loading: "로딩 중…",
  tableHeaders: {
    key: "키(클릭하여 복사)",
    description: "설명",
    createdAt: "생성일",
    actions: "작업",
  },
  emptyText: "데이터 없음",
  table: {
    delete: "삭제",
    edit: "편집",
    copyAria: "복사",
    emptyAria: "데이터 없음",
  },
  createModal: {
    title: "키 만들기",
    label: "키 설명",
    placeholder: "설명 입력",
    help: "키 사용 목적 등의 추가 설명",
    cancel: "취소",
    submit: "키 만들기",
  },
  editModal: {
    title: "키 편집",
    label: "키 설명",
    placeholder: "설명 입력",
    help: "키 사용 목적 등의 추가 설명",
    cancel: "취소",
    save: "저장",
  },
  deleteModal: {
    title: "키 삭제",
    warning: "삭제된 API Key는 복구할 수 없습니다. 확인하세요.",
    promptBefore: "입력:",
    promptAfter: "(이 API Key 삭제 확인)",
    cancel: "취소",
    confirm: "삭제",
    mismatchError: "API Key 마지막 4자가 일치하지 않습니다.",
  },
  toasts: {
    createSuccess: "API Key가 생성되었습니다.",
    deleteSuccess: "API Key가 삭제되었습니다.",
    updateSuccess: "API Key가 업데이트되었습니다.",
    copySuccess: "복사됨",
  },
  errors: {
    loadFailed: "API Key를 불러오지 못했습니다",
    createFailed: "API Key 생성에 실패했습니다",
    updateFailed: "설명 업데이트에 실패했습니다",
    deleteFailed: "삭제에 실패했습니다",
    revealFailed: "키를 읽지 못했습니다",
  },
});

const de = fromEn({
  pageTitle: "API-Schlüssel",
  warningMessage:
    "Ihr API Key ist Ihre Zugangsberechtigung für das basedong Relay. Bewahren Sie ihn sicher auf. Das Kontingent wird nach verbrauchten Nutzungseinheiten abgezogen.",
  relayIntegrationHint: (relayBase) =>
    relayHint(relayBase, {
      base: "Relay-Basis: ",
      example: "Beispiel POST ",
      auth: "Authorization: Bearer <API Key>",
    }),
  createButtonLabel: "API Key erstellen",
  loading: "Wird geladen…",
  tableHeaders: {
    key: "Schlüssel (klicken zum Kopieren)",
    description: "Beschreibung",
    createdAt: "Erstellt",
    actions: "Aktionen",
  },
  emptyText: "Keine Daten",
  table: {
    delete: "Löschen",
    edit: "Bearbeiten",
    copyAria: "Kopieren",
    emptyAria: "Keine Daten",
  },
  createModal: {
    title: "Schlüssel erstellen",
    label: "Schlüsselbeschreibung",
    placeholder: "Beschreibung eingeben",
    help: "Optionale Hinweise zur Verwendung des Schlüssels",
    cancel: "Abbrechen",
    submit: "Erstellen",
  },
  editModal: {
    title: "Schlüssel bearbeiten",
    label: "Schlüsselbeschreibung",
    placeholder: "Beschreibung eingeben",
    help: "Optionale Hinweise zur Verwendung des Schlüssels",
    cancel: "Abbrechen",
    save: "Speichern",
  },
  deleteModal: {
    title: "Schlüssel löschen",
    warning:
      "Gelöschte API Keys können nicht wiederhergestellt werden. Bitte bestätigen.",
    promptBefore: "Geben Sie",
    promptAfter: "ein, um das Löschen dieses API Keys zu bestätigen",
    cancel: "Abbrechen",
    confirm: "Löschen",
    mismatchError: "Die letzten 4 Zeichen des API Keys stimmen nicht überein.",
  },
  toasts: {
    createSuccess: "API Key erstellt.",
    deleteSuccess: "API Key gelöscht.",
    updateSuccess: "API Key aktualisiert.",
    copySuccess: "Kopiert",
  },
  errors: {
    loadFailed: "API Keys konnten nicht geladen werden",
    createFailed: "API Key konnte nicht erstellt werden",
    updateFailed: "Beschreibung konnte nicht aktualisiert werden",
    deleteFailed: "Löschen fehlgeschlagen",
    revealFailed: "Schlüssel konnte nicht gelesen werden",
  },
});

const es = fromEn({
  pageTitle: "Claves API",
  warningMessage:
    "Su API Key es su credencial de acceso al Relay basedong. Guárdela de forma segura. La cuota se descuenta según las unidades de uso consumidas.",
  relayIntegrationHint: (relayBase) =>
    relayHint(relayBase, {
      base: "Base Relay: ",
      example: "Ejemplo POST ",
      auth: "Authorization: Bearer <API Key>",
    }),
  createButtonLabel: "Crear API Key",
  loading: "Cargando…",
  tableHeaders: {
    key: "Clave (clic para copiar)",
    description: "Descripción",
    createdAt: "Creada",
    actions: "Acciones",
  },
  emptyText: "Sin datos",
  table: {
    delete: "Eliminar",
    edit: "Editar",
    copyAria: "Copiar",
    emptyAria: "Sin datos",
  },
  createModal: {
    title: "Crear clave",
    label: "Descripción de la clave",
    placeholder: "Introduzca una descripción",
    help: "Notas opcionales sobre el uso de la clave",
    cancel: "Cancelar",
    submit: "Crear",
  },
  editModal: {
    title: "Editar clave",
    label: "Descripción de la clave",
    placeholder: "Introduzca una descripción",
    help: "Notas opcionales sobre el uso de la clave",
    cancel: "Cancelar",
    save: "Guardar",
  },
  deleteModal: {
    title: "Eliminar clave",
    warning: "Las API Keys eliminadas no se pueden recuperar. Confirme.",
    promptBefore: "Introduzca",
    promptAfter: "para confirmar la eliminación de esta API Key",
    cancel: "Cancelar",
    confirm: "Eliminar",
    mismatchError:
      "Los últimos 4 caracteres de la API Key no coinciden.",
  },
  toasts: {
    createSuccess: "API Key creada.",
    deleteSuccess: "API Key eliminada.",
    updateSuccess: "API Key actualizada.",
    copySuccess: "Copiado",
  },
  errors: {
    loadFailed: "No se pudieron cargar las API Keys",
    createFailed: "No se pudo crear la API Key",
    updateFailed: "No se pudo actualizar la descripción",
    deleteFailed: "No se pudo eliminar",
    revealFailed: "No se pudo leer la clave",
  },
});

const ptBR = fromEn({
  pageTitle: "Chaves API",
  warningMessage:
    "Sua API Key é sua credencial de acesso ao Relay basedong. Mantenha-a segura. A cota é debitada conforme as unidades de uso consumidas.",
  relayIntegrationHint: (relayBase) =>
    relayHint(relayBase, {
      base: "Base Relay: ",
      example: "Exemplo POST ",
      auth: "Authorization: Bearer <API Key>",
    }),
  createButtonLabel: "Criar API Key",
  loading: "Carregando…",
  tableHeaders: {
    key: "Chave (clique para copiar)",
    description: "Descrição",
    createdAt: "Criada em",
    actions: "Ações",
  },
  emptyText: "Sem dados",
  table: {
    delete: "Excluir",
    edit: "Editar",
    copyAria: "Copiar",
    emptyAria: "Sem dados",
  },
  createModal: {
    title: "Criar chave",
    label: "Descrição da chave",
    placeholder: "Digite uma descrição",
    help: "Notas opcionais sobre o uso da chave",
    cancel: "Cancelar",
    submit: "Criar",
  },
  editModal: {
    title: "Editar chave",
    label: "Descrição da chave",
    placeholder: "Digite uma descrição",
    help: "Notas opcionais sobre o uso da chave",
    cancel: "Cancelar",
    save: "Salvar",
  },
  deleteModal: {
    title: "Excluir chave",
    warning: "API Keys excluídas não podem ser recuperadas. Confirme.",
    promptBefore: "Digite",
    promptAfter: "para confirmar a exclusão desta API Key",
    cancel: "Cancelar",
    confirm: "Excluir",
    mismatchError: "Os últimos 4 caracteres da API Key não coincidem.",
  },
  toasts: {
    createSuccess: "API Key criada.",
    deleteSuccess: "API Key excluída.",
    updateSuccess: "API Key atualizada.",
    copySuccess: "Copiado",
  },
  errors: {
    loadFailed: "Falha ao carregar API Keys",
    createFailed: "Falha ao criar API Key",
    updateFailed: "Falha ao atualizar descrição",
    deleteFailed: "Falha ao excluir",
    revealFailed: "Falha ao ler a chave",
  },
});

const ar = fromEn({
  pageTitle: "مفاتيح API",
  warningMessage:
    "مفتاح API هو بيانات اعتمادك للوصول إلى Relay basedong. احفظه بأمان. تُخصم الحصة حسب وحدات الاستخدام المستهلكة.",
  relayIntegrationHint: (relayBase) =>
    relayHint(relayBase, {
      base: "قاعدة Relay: ",
      example: "مثال POST ",
      auth: "Authorization: Bearer <API Key>",
    }),
  createButtonLabel: "إنشاء API Key",
  loading: "جارٍ التحميل…",
  tableHeaders: {
    key: "المفتاح (انقر للنسخ)",
    description: "الوصف",
    createdAt: "تاريخ الإنشاء",
    actions: "إجراءات",
  },
  emptyText: "لا توجد بيانات",
  table: {
    delete: "حذف",
    edit: "تعديل",
    copyAria: "نسخ",
    emptyAria: "لا توجد بيانات",
  },
  createModal: {
    title: "إنشاء مفتاح",
    label: "وصف المفتاح",
    placeholder: "أدخل وصفًا",
    help: "ملاحظات اختيارية حول استخدام المفتاح",
    cancel: "إلغاء",
    submit: "إنشاء",
  },
  editModal: {
    title: "تعديل المفتاح",
    label: "وصف المفتاح",
    placeholder: "أدخل وصفًا",
    help: "ملاحظات اختيارية حول استخدام المفتاح",
    cancel: "إلغاء",
    save: "حفظ",
  },
  deleteModal: {
    title: "حذف المفتاح",
    warning: "لا يمكن استرداد مفاتيح API المحذوفة. يرجى التأكيد.",
    promptBefore: "أدخل",
    promptAfter: "لتأكيد حذف مفتاح API هذا",
    cancel: "إلغاء",
    confirm: "حذف",
    mismatchError: "آخر 4 أحرف من مفتاح API غير متطابقة.",
  },
  toasts: {
    createSuccess: "تم إنشاء API Key.",
    deleteSuccess: "تم حذف API Key.",
    updateSuccess: "تم تحديث API Key.",
    copySuccess: "تم النسخ",
  },
  errors: {
    loadFailed: "تعذّر تحميل مفاتيح API",
    createFailed: "تعذّر إنشاء API Key",
    updateFailed: "تعذّر تحديث الوصف",
    deleteFailed: "تعذّر الحذف",
    revealFailed: "تعذّر قراءة المفتاح",
  },
});

const hi = fromEn({
  pageTitle: "API कुंजी",
  warningMessage:
    "आपकी API Key basedong Relay तक पहुँच के लिए आपके क्रेडेंशियल हैं। इसे सुरक्षित रखें। उपयोग इकाइयों के अनुसार कोटा कटता है।",
  relayIntegrationHint: (relayBase) =>
    relayHint(relayBase, {
      base: "Relay आधार: ",
      example: "उदाहरण POST ",
      auth: "Authorization: Bearer <API Key>",
    }),
  createButtonLabel: "API Key बनाएँ",
  loading: "लोड हो रहा है…",
  tableHeaders: {
    key: "कुंजी (कॉपी के लिए क्लिक करें)",
    description: "विवरण",
    createdAt: "बनाया गया",
    actions: "कार्रवाई",
  },
  emptyText: "कोई डेटा नहीं",
  table: {
    delete: "हटाएँ",
    edit: "संपादित करें",
    copyAria: "कॉपी",
    emptyAria: "कोई डेटा नहीं",
  },
  createModal: {
    title: "कुंजी बनाएँ",
    label: "कुंजी विवरण",
    placeholder: "विवरण दर्ज करें",
    help: "कुंजी के उपयोग के बारे में वैकल्पिक नोट",
    cancel: "रद्द करें",
    submit: "बनाएँ",
  },
  editModal: {
    title: "कुंजी संपादित करें",
    label: "कुंजी विवरण",
    placeholder: "विवरण दर्ज करें",
    help: "कुंजी के उपयोग के बारे में वैकल्पिक नोट",
    cancel: "रद्द करें",
    save: "सहेजें",
  },
  deleteModal: {
    title: "कुंजी हटाएँ",
    warning: "हटाई गई API Key पुनर्प्राप्त नहीं हो सकती। कृपया पुष्टि करें।",
    promptBefore: "दर्ज करें",
    promptAfter: "इस API Key को हटाने की पुष्टि के लिए",
    cancel: "रद्द करें",
    confirm: "हटाएँ",
    mismatchError: "API Key के अंतिम 4 अक्षर मेल नहीं खाते।",
  },
  toasts: {
    createSuccess: "API Key बनाई गई।",
    deleteSuccess: "API Key हटाई गई।",
    updateSuccess: "API Key अपडेट हुई।",
    copySuccess: "कॉपी हो गया",
  },
  errors: {
    loadFailed: "API Keys लोड नहीं हो सकीं",
    createFailed: "API Key नहीं बन सकी",
    updateFailed: "विवरण अपडेट नहीं हो सका",
    deleteFailed: "हटाना विफल",
    revealFailed: "कुंजी पढ़ने में विफल",
  },
});

const id = fromEn({
  pageTitle: "Kunci API",
  warningMessage:
    "API Key adalah kredensial Anda untuk mengakses Relay basedong. Simpan dengan aman. Kuota dipotong sesuai unit penggunaan yang dikonsumsi.",
  relayIntegrationHint: (relayBase) =>
    relayHint(relayBase, {
      base: "Basis Relay: ",
      example: "Contoh POST ",
      auth: "Authorization: Bearer <API Key>",
    }),
  createButtonLabel: "Buat API Key",
  loading: "Memuat…",
  tableHeaders: {
    key: "Kunci (klik untuk salin)",
    description: "Deskripsi",
    createdAt: "Dibuat",
    actions: "Tindakan",
  },
  emptyText: "Tidak ada data",
  table: {
    delete: "Hapus",
    edit: "Edit",
    copyAria: "Salin",
    emptyAria: "Tidak ada data",
  },
  createModal: {
    title: "Buat kunci",
    label: "Deskripsi kunci",
    placeholder: "Masukkan deskripsi",
    help: "Catatan opsional tentang penggunaan kunci",
    cancel: "Batal",
    submit: "Buat",
  },
  editModal: {
    title: "Edit kunci",
    label: "Deskripsi kunci",
    placeholder: "Masukkan deskripsi",
    help: "Catatan opsional tentang penggunaan kunci",
    cancel: "Batal",
    save: "Simpan",
  },
  deleteModal: {
    title: "Hapus kunci",
    warning: "API Key yang dihapus tidak dapat dipulihkan. Harap konfirmasi.",
    promptBefore: "Masukkan",
    promptAfter: "untuk mengonfirmasi penghapusan API Key ini",
    cancel: "Batal",
    confirm: "Hapus",
    mismatchError: "4 karakter terakhir API Key tidak cocok.",
  },
  toasts: {
    createSuccess: "API Key dibuat.",
    deleteSuccess: "API Key dihapus.",
    updateSuccess: "API Key diperbarui.",
    copySuccess: "Disalin",
  },
  errors: {
    loadFailed: "Gagal memuat API Keys",
    createFailed: "Gagal membuat API Key",
    updateFailed: "Gagal memperbarui deskripsi",
    deleteFailed: "Gagal menghapus",
    revealFailed: "Gagal membaca kunci",
  },
});

const API_KEYS_UI_COPY: Record<TargetLocale, ApiKeysUiCopy> = {
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
  "pt-BR": ptBR,
  ar,
  hi,
  id,
};

export function getApiKeysUiCopy(locale: string): ApiKeysUiCopy {
  const base = pickTargetCatalog(locale, API_KEYS_UI_COPY);
  return {
    ...en,
    ...base,
    tableHeaders: { ...en.tableHeaders, ...base.tableHeaders },
    table: { ...en.table, ...base.table },
    createModal: { ...en.createModal, ...base.createModal },
    editModal: { ...en.editModal, ...base.editModal },
    deleteModal: { ...en.deleteModal, ...base.deleteModal },
    toasts: { ...en.toasts, ...base.toasts },
    errors: { ...en.errors, ...base.errors },
    selectedCount: base.selectedCount ?? en.selectedCount,
    recordsPage: base.recordsPage ?? en.recordsPage,
    recordsTotal: base.recordsTotal ?? en.recordsTotal,
    relayIntegrationHint: base.relayIntegrationHint,
  };
}
