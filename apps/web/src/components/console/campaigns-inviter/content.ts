export const navActiveKey = "inviter";

const BASE =
  "/assets/console/campaigns-inviter/images";

export const ASSET = {
  bannerBg: `${BASE}/inviter-banner-bg.webp`,
  bannerText: `${BASE}/inviter-banner-text-success.webp`,
  bannerImg: `${BASE}/inviter-banner-img.webp`,
  text1: `${BASE}/inviter-text-1.webp`,
  text2: `${BASE}/inviter-text-2.webp`,
  text3: `${BASE}/inviter-text-3.webp`,
  text4: `${BASE}/inviter-text-4.webp`,
  icon1: `${BASE}/inviter-icon-1.svg`,
  icon2: `${BASE}/inviter-icon-2.svg`,
  icon3: `${BASE}/inviter-icon-3.svg`,
  arrow: `${BASE}/inviter-arrow.svg`,
  cardBg: `${BASE}/inviter-card-bg.webp`,
  cardBgReverse: `${BASE}/inviter-card-bg-reverse.webp`,
  inviteQr: `${BASE}/invite-qr.png`,
} as const;

/** Demo invite identity (per-session on live site) */
export const DEMO_INVITE = {
  code: "yF5FmD6b",
  link: "/i/yF5FmD6b",
} as const;
