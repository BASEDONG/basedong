import { APP_ROUTES } from "@/lib/routes";
import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";

export type InvoiceUiCopy = {
  pageTitle: string;
  applyButton: string;
  applyEmoji: string;
  recordsTitle: string;
  outsideHoursTooltip: string;
  outsideHoursToast: string;
  registerFormHref: string;
  bindEmailHref: string;
  bindPhoneHref: string;
  noticeLines: [string, string, string];
  registerHere: string;
  drawer: {
    title: string;
    submit: string;
    amountLabel: string;
    amountPlaceholder: string;
    feeLabel: string;
    feeFixedPlaceholder: string;
    titleTaxLabel: string;
    invoiceTypeLabel: string;
    sectionInvoice: string;
    sectionReceive: string;
    emailReceive: string;
    smsReceive: string;
    emailHelpBefore: string;
    emailHelpLink: string;
    emailHelpAfter: string;
    smsHelpBefore: string;
    smsHelpLink: string;
    smsHelpAfter: string;
    titleHelpBefore: string;
    invoiceableLabel: string;
    consumedLabel: string;
    debtLabel: string;
    invoicedLabel: string;
  };
  feeTypeOptions: [string, string, string];
  invoiceTypeOptions: [string];
  titleTaxOptions: [string];
};

const zhCN: InvoiceUiCopy = {
  pageTitle: "发票开具",
  applyButton: "申请发票",
  applyEmoji: "👉🏻",
  recordsTitle: "发票记录",
  outsideHoursTooltip:
    "当前不在可开票时段，请在工作日 10:00~19:00 申请发票",
  outsideHoursToast:
    "当前不在可开票时段，请在工作日 10:00~19:00 申请发票",
  registerFormHref: APP_ROUTES.formSupport,
  bindEmailHref: APP_ROUTES.consoleAccountAk,
  bindPhoneHref: APP_ROUTES.consoleAccountAk,
  registerHere: "点击这里登记",
  noticeLines: [
    "1. 仅已消费金额可以申请开具发票，充值未消费的充值余额不可开具发票，您可酌情申请退款；已开票金额不可重复开票；",
    "2. 工作日 10:00 ~ 19:00 可以提交开票申请，通常发票会在您申请开票后 2 个工作日内开具完成；",
    "3. 根据我国税收相关政策要求，发票抬头需与账户主体名称一致；如需开具机构抬头发票且可以配合提供相应证明材料，请",
  ],
  drawer: {
    title: "申请发票",
    submit: "申请发票",
    amountLabel: "申请开票金额",
    amountPlaceholder: "金额",
    feeLabel: "费用项名称",
    feeFixedPlaceholder: "生产生活服务",
    titleTaxLabel: "抬头名称和税号",
    invoiceTypeLabel: "发票类型",
    sectionInvoice: "开票信息",
    sectionReceive: "发票接收",
    emailReceive: "邮箱接收",
    smsReceive: "短信接收",
    emailHelpBefore: "默认使用 ",
    emailHelpLink: "绑定邮箱",
    emailHelpAfter: " 接收发票，如需使用其他邮箱请认真核对",
    smsHelpBefore: "默认使用 ",
    smsHelpLink: "绑定手机",
    smsHelpAfter: " 接收发票，如需使用其他手机请认真核对",
    titleHelpBefore:
      "根据我国税收相关政策要求，发票抬头需与账户主体名称一致；如需开具机构抬头发票且可以配合提供相应证明材料，请",
    invoiceableLabel: "可开票金额",
    consumedLabel: "累计已消费金额",
    debtLabel: "欠款",
    invoicedLabel: "累计已开票金额",
  },
  feeTypeOptions: ["API 调用", "技术服务", "云服务"],
  invoiceTypeOptions: ["增值税普通发票"],
  titleTaxOptions: ["演示用户"],
};

const en: InvoiceUiCopy = {
  pageTitle: "Invoices",
  applyButton: "Request invoice",
  applyEmoji: "👉🏻",
  recordsTitle: "Invoice history",
  outsideHoursTooltip:
    "Invoicing is unavailable now. Apply on weekdays 10:00–19:00.",
  outsideHoursToast:
    "Invoicing is unavailable now. Apply on weekdays 10:00–19:00.",
  registerFormHref: APP_ROUTES.formSupport,
  bindEmailHref: APP_ROUTES.consoleAccountAk,
  bindPhoneHref: APP_ROUTES.consoleAccountAk,
  registerHere: "register here",
  noticeLines: [
    "1. Only consumed amounts can be invoiced; unused recharge balance cannot be invoiced (you may request a refund). Invoiced amounts cannot be invoiced again.",
    "2. Submit requests on weekdays 10:00–19:00. Invoices are usually issued within 2 business days.",
    "3. Per tax policy, the invoice title must match the account holder. For organization titles with supporting documents, please ",
  ],
  drawer: {
    title: "Request invoice",
    submit: "Submit request",
    amountLabel: "Invoice amount",
    amountPlaceholder: "Amount",
    feeLabel: "Fee item",
    feeFixedPlaceholder: "Production & life services",
    titleTaxLabel: "Title and tax ID",
    invoiceTypeLabel: "Invoice type",
    sectionInvoice: "Invoice details",
    sectionReceive: "Delivery",
    emailReceive: "Email",
    smsReceive: "SMS",
    emailHelpBefore: "By default we use your ",
    emailHelpLink: "bound email",
    emailHelpAfter: ". Verify if using another address.",
    smsHelpBefore: "By default we use your ",
    smsHelpLink: "bound phone",
    smsHelpAfter: ". Verify if using another number.",
    titleHelpBefore:
      "Per tax policy, the invoice title must match the account holder. For organization titles with documents, please ",
    invoiceableLabel: "Invoiceable amount",
    consumedLabel: "Total consumed",
    debtLabel: "Outstanding",
    invoicedLabel: "Total invoiced",
  },
  feeTypeOptions: ["API usage", "Technical services", "Cloud services"],
  invoiceTypeOptions: ["VAT ordinary invoice"],
  titleTaxOptions: ["Demo user"],
};

const zhTW: InvoiceUiCopy = {
  ...zhCN,
  pageTitle: "發票開立",
  applyButton: "申請發票",
  recordsTitle: "發票記錄",
  outsideHoursTooltip:
    "目前不在可開票時段，請在工作日 10:00~19:00 申請發票",
  outsideHoursToast:
    "目前不在可開票時段，請在工作日 10:00~19:00 申請發票",
  registerHere: "點擊這裡登記",
  noticeLines: [
    "1. 僅已消費金額可以申請開具發票，儲值未消費的儲值餘額不可開具發票，您可酌情申請退款；已開票金額不可重複開票；",
    "2. 工作日 10:00 ~ 19:00 可以提交開票申請，通常發票會在您申請開票後 2 個工作天內開具完成；",
    "3. 根據我國稅收相關政策要求，發票抬頭需與帳戶主體名稱一致；如需開具機構抬頭發票且可以配合提供相應證明材料，請",
  ],
  drawer: {
    ...zhCN.drawer,
    title: "申請發票",
    submit: "申請發票",
    amountLabel: "申請開票金額",
    feeLabel: "費用項名稱",
    titleTaxLabel: "抬頭名稱和稅號",
    invoiceTypeLabel: "發票類型",
    sectionInvoice: "開票資訊",
    sectionReceive: "發票接收",
    emailReceive: "信箱接收",
    smsReceive: "簡訊接收",
    emailHelpLink: "綁定信箱",
    smsHelpLink: "綁定手機",
    invoiceableLabel: "可開票金額",
    consumedLabel: "累計已消費金額",
    debtLabel: "欠款",
    invoicedLabel: "累計已開票金額",
  },
  feeTypeOptions: ["API 呼叫", "技術服務", "雲服務"],
  invoiceTypeOptions: ["增值稅普通發票"],
  titleTaxOptions: ["演示用戶"],
};

function fromEn(
  partial: Partial<Omit<InvoiceUiCopy, "drawer">> & {
    drawer?: Partial<InvoiceUiCopy["drawer"]>;
  },
): InvoiceUiCopy {
  return {
    ...en,
    ...partial,
    drawer: { ...en.drawer, ...partial.drawer },
    noticeLines: partial.noticeLines ?? en.noticeLines,
    feeTypeOptions: partial.feeTypeOptions ?? en.feeTypeOptions,
    invoiceTypeOptions: partial.invoiceTypeOptions ?? en.invoiceTypeOptions,
    titleTaxOptions: partial.titleTaxOptions ?? en.titleTaxOptions,
  };
}

const ja = fromEn({
  pageTitle: "請求書",
  applyButton: "請求書を申請",
  recordsTitle: "請求書履歴",
  outsideHoursTooltip: "現在は請求書申請時間外です。平日 10:00–19:00 に申請してください。",
  outsideHoursToast: "現在は請求書申請時間外です。平日 10:00–19:00 に申請してください。",
  registerHere: "こちらから登録",
  drawer: {
    title: "請求書を申請",
    submit: "申請する",
    amountLabel: "請求金額",
    feeLabel: "費用項目",
    sectionInvoice: "請求情報",
    sectionReceive: "受け取り方法",
  },
});

const fr = fromEn({
  pageTitle: "Factures",
  applyButton: "Demander une facture",
  recordsTitle: "Historique des factures",
  outsideHoursTooltip:
    "Facturation indisponible. Demandez en semaine de 10h00 à 19h00.",
  outsideHoursToast:
    "Facturation indisponible. Demandez en semaine de 10h00 à 19h00.",
  registerHere: "inscrivez-vous ici",
});

const ru = fromEn({
  pageTitle: "Счета-фактуры",
  applyButton: "Запросить счёт",
  recordsTitle: "История счетов",
  outsideHoursTooltip:
    "Сейчас нельзя запросить счёт. Подавайте заявки в будни 10:00–19:00.",
  outsideHoursToast:
    "Сейчас нельзя запросить счёт. Подавайте заявки в будни 10:00–19:00.",
  registerHere: "зарегистрируйтесь здесь",
});

const vi = fromEn({
  pageTitle: "Hóa đơn",
  applyButton: "Yêu cầu hóa đơn",
  recordsTitle: "Lịch sử hóa đơn",
  registerHere: "đăng ký tại đây",
});

const ko = fromEn({
  pageTitle: "세금계산서",
  applyButton: "세금계산서 신청",
  recordsTitle: "세금계산서 내역",
  registerHere: "여기서 등록",
});

const de = fromEn({
  pageTitle: "Rechnungen",
  applyButton: "Rechnung anfordern",
  recordsTitle: "Rechnungsverlauf",
  registerHere: "hier registrieren",
});

const es = fromEn({
  pageTitle: "Facturas",
  applyButton: "Solicitar factura",
  recordsTitle: "Historial de facturas",
  registerHere: "regístrese aquí",
});

const ptBR = fromEn({
  pageTitle: "Notas fiscais",
  applyButton: "Solicitar nota fiscal",
  recordsTitle: "Histórico de notas",
  registerHere: "registre-se aqui",
});

const ar = fromEn({
  pageTitle: "الفواتير",
  applyButton: "طلب فاتورة",
  recordsTitle: "سجل الفواتير",
  registerHere: "سجّل هنا",
});

const hi = fromEn({
  pageTitle: "चालान",
  applyButton: "चालान का अनुरोध",
  recordsTitle: "चालान इतिहास",
  registerHere: "यहाँ पंजीकरण करें",
});

const id = fromEn({
  pageTitle: "Faktur",
  applyButton: "Ajukan faktur",
  recordsTitle: "Riwayat faktur",
  registerHere: "daftar di sini",
});

const INVOICE_UI_COPY: Record<TargetLocale, InvoiceUiCopy> = {
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

export function getInvoiceUiCopy(locale: string): InvoiceUiCopy {
  return pickTargetCatalog(locale, INVOICE_UI_COPY);
}
