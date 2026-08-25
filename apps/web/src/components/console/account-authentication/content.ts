export const pageTitle = "实名认证";

/** Live campaigns route (not cloned) */
export const claimCouponHref =
  "/me/modelsme/campaigns/real-name";

/** Live agreement flow (not cloned) */
export const enterpriseChangeHref =
  "/me/modelsme/account/authentication/agreement/personal/change/org";

export const successAlert = {
  beforeLink: "🎉 恭喜您完成实名认证，专属代金券待领取，别错过福利～ ",
  linkText: "前往领取",
  afterLink: " 🎟️",
} as const;

export interface AuthFieldRow {
  label: string;
  value: string;
  showCheck?: boolean;
  /** Live: only 认证状态 has a space after the colon */
  spaceAfterColon?: boolean;
}

export const statusCard = {
  title: "已完成实名认证",
  enterpriseLink: "变更为企业用户",
  columns: [
    [
      {
        label: "认证状态",
        value: "已认证",
        showCheck: true,
        spaceAfterColon: true,
      },
      { label: "证件类型", value: "中国大陆二代居民身份证" },
    ],
    [
      { label: "认证类型", value: "个人" },
      { label: "证件号码", value: "350427********5515" },
    ],
    [
      { label: "真实姓名", value: "郑*" },
      { label: "认证时间", value: "2026-08-01 10:38:58" },
    ],
  ] as AuthFieldRow[][],
} as const;
