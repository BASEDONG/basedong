export const pageTitle = "发票开具";

export const ASSET = {
  empty:
    "/assets/console/invoice/images/finetune-empty.webp",
} as const;

export const copy = {
  applyButton: "申请发票",
  applyEmoji: "👉🏻",
  recordsTitle: "发票记录",
  registerFormHref:
    "https://siliconflow.feishu.cn/share/base/form/shrcnN8lrKXCbYJQScKDTNsAuHc",
  outsideHoursTooltip:
    "当前不在可开票时段，请在工作日 10:00~19:00 申请发票",
  bindEmailHref: "https://account.siliconflow.cn/zh/user/settings",
  bindPhoneHref: "https://account.siliconflow.cn/zh/user/settings",
} as const;

export const drawerCopy = {
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
  registerHere: "点击这里登记",
  invoiceableLabel: "可开票金额",
  consumedLabel: "累计已消费金额",
  debtLabel: "欠款",
  invoicedLabel: "累计已开票金额",
} as const;

/** Demo amounts matching empty live account extract */
export const mockAmounts = {
  invoiceable: 0,
  consumed: 0,
  debt: 0,
  invoiced: 0,
} as const;

export const feeTypeOptions = ["API 调用", "技术服务", "云服务"] as const;

export const invoiceTypeOptions = ["增值税普通发票"] as const;

/** Demo title options — live uses authenticated subject name(s) */
export const titleTaxOptions = ["演示用户"] as const;

export function formatYuan(n: number): string {
  return `￥${n.toFixed(2)}`;
}

/** Weekday local time window 10:00–19:00 (matches live `O()` gate). */
export function isInvoiceBusinessHours(now = new Date()): boolean {
  const day = now.getDay();
  if (day === 0 || day === 6) return false;
  const minutes = now.getHours() * 60 + now.getMinutes();
  return minutes >= 10 * 60 && minutes < 19 * 60;
}
