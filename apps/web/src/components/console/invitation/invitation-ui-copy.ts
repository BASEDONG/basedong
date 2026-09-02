import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";

export type InvitationUiCopy = {
  pageTitle: string;
  tableColumns: readonly [string, string, string, string];
  upgradeAlertPrefix: string;
  inviterPlanLabel: string;
  upgradeAlertSuffix: string;
  empty: string;
};

const zhCN: InvitationUiCopy = {
  pageTitle: "我的邀请记录",
  tableColumns: ["昵称", "用户 ID", "注册时间", "奖励金额"],
  upgradeAlertPrefix: "🎉 邀请活动已升级，详细规则请查看",
  inviterPlanLabel: "「推荐官计划」",
  upgradeAlertSuffix: "！",
  empty: "暂无数据",
};

const en: InvitationUiCopy = {
  pageTitle: "My referrals",
  tableColumns: ["Nickname", "User ID", "Registered", "Reward"],
  upgradeAlertPrefix: "🎉 The referral program has been upgraded — see",
  inviterPlanLabel: "Referral Ambassador Program",
  upgradeAlertSuffix: " for details!",
  empty: "No data",
};

const zhTW: InvitationUiCopy = {
  ...zhCN,
  pageTitle: "我的邀請記錄",
  tableColumns: ["暱稱", "使用者 ID", "註冊時間", "獎勵金額"],
  upgradeAlertPrefix: "🎉 邀請活動已升級，詳細規則請查看",
  inviterPlanLabel: "「推薦官計畫」",
  empty: "暫無資料",
};

function fromEn(partial: Partial<InvitationUiCopy>): InvitationUiCopy {
  return {
    ...en,
    ...partial,
    tableColumns: partial.tableColumns ?? en.tableColumns,
  };
}

const ja = fromEn({
  pageTitle: "紹介履歴",
  tableColumns: ["ニックネーム", "ユーザー ID", "登録日", "報酬"],
  inviterPlanLabel: "紹介アンバサダープログラム",
});

const fr = fromEn({
  pageTitle: "Mes parrainages",
  tableColumns: ["Pseudo", "ID utilisateur", "Inscription", "Récompense"],
  inviterPlanLabel: "Programme ambassadeur",
});

const ru = fromEn({
  pageTitle: "Мои приглашения",
  tableColumns: ["Ник", "ID пользователя", "Регистрация", "Награда"],
});

const vi = fromEn({ pageTitle: "Lịch sử giới thiệu" });
const ko = fromEn({ pageTitle: "내 추천 기록" });
const de = fromEn({ pageTitle: "Meine Empfehlungen" });
const es = fromEn({ pageTitle: "Mis referidos" });
const ptBR = fromEn({ pageTitle: "Minhas indicações" });
const ar = fromEn({ pageTitle: "سجل الإحالات" });
const hi = fromEn({ pageTitle: "मेरे रेफ़रल" });
const id = fromEn({ pageTitle: "Riwayat undangan" });

const INVITATION_UI_COPY: Record<TargetLocale, InvitationUiCopy> = {
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

export function getInvitationUiCopy(locale: string): InvitationUiCopy {
  return pickTargetCatalog(locale, INVITATION_UI_COPY);
}
