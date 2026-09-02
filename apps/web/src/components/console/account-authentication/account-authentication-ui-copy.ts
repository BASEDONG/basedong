import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";

export interface AuthFieldRow {
  label: string;
  value: string;
  showCheck?: boolean;
  /** Live: only 认证状态 has a space after the colon */
  spaceAfterColon?: boolean;
}

export type AuthUiCopy = {
  pageTitle: string;
  successAlert: {
    beforeLink: string;
    linkText: string;
    afterLink: string;
  };
  statusCard: {
    title: string;
    enterpriseLink: string;
    columns: AuthFieldRow[][];
  };
};

const zhCN: AuthUiCopy = {
  pageTitle: "实名认证",
  successAlert: {
    beforeLink: "🎉 恭喜您完成实名认证，专属代金券待领取，别错过福利～ ",
    linkText: "前往领取",
    afterLink: " 🎟️",
  },
  statusCard: {
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
    ],
  },
};

const en: AuthUiCopy = {
  pageTitle: "Identity verification",
  successAlert: {
    beforeLink:
      "🎉 Verification complete — a voucher is waiting for you. ",
    linkText: "Claim now",
    afterLink: " 🎟️",
  },
  statusCard: {
    title: "Identity verified",
    enterpriseLink: "Switch to enterprise account",
    columns: [
      [
        {
          label: "Status",
          value: "Verified",
          showCheck: true,
          spaceAfterColon: true,
        },
        { label: "ID type", value: "Mainland China resident ID card" },
      ],
      [
        { label: "Account type", value: "Individual" },
        { label: "ID number", value: "350427********5515" },
      ],
      [
        { label: "Legal name", value: "Zheng*" },
        { label: "Verified at", value: "2026-08-01 10:38:58" },
      ],
    ],
  },
};

const zhTW: AuthUiCopy = {
  ...zhCN,
  pageTitle: "實名認證",
  successAlert: {
    beforeLink: "🎉 恭喜您完成實名認證，專屬代金券待領取，別錯過福利～ ",
    linkText: "前往領取",
    afterLink: " 🎟️",
  },
  statusCard: {
    title: "已完成實名認證",
    enterpriseLink: "變更為企業用戶",
    columns: [
      [
        {
          label: "認證狀態",
          value: "已認證",
          showCheck: true,
          spaceAfterColon: true,
        },
        { label: "證件類型", value: "中國大陸二代居民身份證" },
      ],
      [
        { label: "認證類型", value: "個人" },
        { label: "證件號碼", value: "350427********5515" },
      ],
      [
        { label: "真實姓名", value: "鄭*" },
        { label: "認證時間", value: "2026-08-01 10:38:58" },
      ],
    ],
  },
};

function fromEn(partial: Partial<AuthUiCopy>): AuthUiCopy {
  return {
    ...en,
    ...partial,
    successAlert: { ...en.successAlert, ...partial.successAlert },
    statusCard: partial.statusCard
      ? {
          ...en.statusCard,
          ...partial.statusCard,
          columns: partial.statusCard.columns ?? en.statusCard.columns,
        }
      : en.statusCard,
  };
}

const ja = fromEn({
  pageTitle: "本人確認",
  successAlert: {
    beforeLink: "🎉 本人確認が完了しました。専用クーポンをお受け取りください。 ",
    linkText: "受け取る",
    afterLink: " 🎟️",
  },
  statusCard: {
    title: "本人確認済み",
    enterpriseLink: "法人アカウントに変更",
    columns: [
      [
        {
          label: "認証状態",
          value: "認証済み",
          showCheck: true,
          spaceAfterColon: true,
        },
        { label: "証明書の種類", value: "中国本土の住民身分証" },
      ],
      [
        { label: "アカウント種別", value: "個人" },
        { label: "証明書番号", value: "350427********5515" },
      ],
      [
        { label: "氏名", value: "鄭*" },
        { label: "認証日時", value: "2026-08-01 10:38:58" },
      ],
    ],
  },
});

const fr = fromEn({
  pageTitle: "Vérification d'identité",
  successAlert: {
    beforeLink:
      "🎉 Vérification terminée — un bon vous attend. ",
    linkText: "Réclamer",
    afterLink: " 🎟️",
  },
  statusCard: {
    title: "Identité vérifiée",
    enterpriseLink: "Passer au compte entreprise",
    columns: [
      [
        {
          label: "Statut",
          value: "Vérifié",
          showCheck: true,
          spaceAfterColon: true,
        },
        { label: "Type de pièce", value: "Carte d'identité résident chinoise" },
      ],
      [
        { label: "Type de compte", value: "Particulier" },
        { label: "Numéro de pièce", value: "350427********5515" },
      ],
      [
        { label: "Nom légal", value: "Zheng*" },
        { label: "Vérifié le", value: "2026-08-01 10:38:58" },
      ],
    ],
  },
});

const ru = fromEn({
  pageTitle: "Верификация личности",
  successAlert: {
    beforeLink:
      "🎉 Верификация завершена — ваучер ждёт вас. ",
    linkText: "Получить",
    afterLink: " 🎟️",
  },
  statusCard: {
    title: "Личность подтверждена",
    enterpriseLink: "Перейти на корпоративный аккаунт",
    columns: [
      [
        {
          label: "Статус",
          value: "Подтверждено",
          showCheck: true,
          spaceAfterColon: true,
        },
        { label: "Тип документа", value: "Удостоверение личности КНР" },
      ],
      [
        { label: "Тип аккаунта", value: "Физическое лицо" },
        { label: "Номер документа", value: "350427********5515" },
      ],
      [
        { label: "ФИО", value: "Zheng*" },
        { label: "Дата верификации", value: "2026-08-01 10:38:58" },
      ],
    ],
  },
});

const vi = fromEn({
  pageTitle: "Xác minh danh tính",
  successAlert: {
    beforeLink:
      "🎉 Xác minh hoàn tất — phiếu thưởng đang chờ bạn. ",
    linkText: "Nhận ngay",
    afterLink: " 🎟️",
  },
  statusCard: {
    title: "Đã xác minh danh tính",
    enterpriseLink: "Chuyển sang tài khoản doanh nghiệp",
    columns: [
      [
        {
          label: "Trạng thái",
          value: "Đã xác minh",
          showCheck: true,
          spaceAfterColon: true,
        },
        { label: "Loại giấy tờ", value: "CMND cư trú Trung Quốc đại lục" },
      ],
      [
        { label: "Loại tài khoản", value: "Cá nhân" },
        { label: "Số giấy tờ", value: "350427********5515" },
      ],
      [
        { label: "Họ tên", value: "Zheng*" },
        { label: "Xác minh lúc", value: "2026-08-01 10:38:58" },
      ],
    ],
  },
});

const ko = fromEn({
  pageTitle: "본인 인증",
  successAlert: {
    beforeLink: "🎉 본인 인증이 완료되었습니다. 전용 쿠폰을 받아보세요. ",
    linkText: "받으러 가기",
    afterLink: " 🎟️",
  },
  statusCard: {
    title: "본인 인증 완료",
    enterpriseLink: "기업 계정으로 전환",
    columns: [
      [
        {
          label: "인증 상태",
          value: "인증됨",
          showCheck: true,
          spaceAfterColon: true,
        },
        { label: "신분증 종류", value: "중국 본토 주민신분증" },
      ],
      [
        { label: "계정 유형", value: "개인" },
        { label: "신분증 번호", value: "350427********5515" },
      ],
      [
        { label: "실명", value: "Zheng*" },
        { label: "인증 일시", value: "2026-08-01 10:38:58" },
      ],
    ],
  },
});

const de = fromEn({
  pageTitle: "Identitätsprüfung",
  successAlert: {
    beforeLink:
      "🎉 Identität bestätigt — ein Gutschein wartet auf Sie. ",
    linkText: "Jetzt abholen",
    afterLink: " 🎟️",
  },
  statusCard: {
    title: "Identität bestätigt",
    enterpriseLink: "Zu Unternehmenskonto wechseln",
    columns: [
      [
        {
          label: "Status",
          value: "Bestätigt",
          showCheck: true,
          spaceAfterColon: true,
        },
        { label: "Ausweistyp", value: "Chinesischer Personalausweis" },
      ],
      [
        { label: "Kontotyp", value: "Privat" },
        { label: "Ausweisnummer", value: "350427********5515" },
      ],
      [
        { label: "Name", value: "Zheng*" },
        { label: "Bestätigt am", value: "2026-08-01 10:38:58" },
      ],
    ],
  },
});

const es = fromEn({
  pageTitle: "Verificación de identidad",
  successAlert: {
    beforeLink:
      "🎉 Verificación completada — un cupón le espera. ",
    linkText: "Reclamar",
    afterLink: " 🎟️",
  },
  statusCard: {
    title: "Identidad verificada",
    enterpriseLink: "Cambiar a cuenta empresarial",
    columns: [
      [
        {
          label: "Estado",
          value: "Verificado",
          showCheck: true,
          spaceAfterColon: true,
        },
        { label: "Tipo de documento", value: "DNI de residente de China continental" },
      ],
      [
        { label: "Tipo de cuenta", value: "Individual" },
        { label: "Número de documento", value: "350427********5515" },
      ],
      [
        { label: "Nombre legal", value: "Zheng*" },
        { label: "Verificado el", value: "2026-08-01 10:38:58" },
      ],
    ],
  },
});

const ptBR = fromEn({
  pageTitle: "Verificação de identidade",
  successAlert: {
    beforeLink:
      "🎉 Verificação concluída — um voucher aguarda você. ",
    linkText: "Resgatar",
    afterLink: " 🎟️",
  },
  statusCard: {
    title: "Identidade verificada",
    enterpriseLink: "Mudar para conta empresarial",
    columns: [
      [
        {
          label: "Status",
          value: "Verificado",
          showCheck: true,
          spaceAfterColon: true,
        },
        { label: "Tipo de documento", value: "RG de residente da China continental" },
      ],
      [
        { label: "Tipo de conta", value: "Individual" },
        { label: "Número do documento", value: "350427********5515" },
      ],
      [
        { label: "Nome legal", value: "Zheng*" },
        { label: "Verificado em", value: "2026-08-01 10:38:58" },
      ],
    ],
  },
});

const ar = fromEn({
  pageTitle: "التحقق من الهوية",
  successAlert: {
    beforeLink: "🎉 اكتمل التحقق — قسيمة بانتظارك. ",
    linkText: "استلام",
    afterLink: " 🎟️",
  },
  statusCard: {
    title: "تم التحقق من الهوية",
    enterpriseLink: "التحويل إلى حساب مؤسسي",
    columns: [
      [
        {
          label: "الحالة",
          value: "تم التحقق",
          showCheck: true,
          spaceAfterColon: true,
        },
        { label: "نوع الهوية", value: "بطاقة هوية مقيم في الصين القارية" },
      ],
      [
        { label: "نوع الحساب", value: "فردي" },
        { label: "رقم الهوية", value: "350427********5515" },
      ],
      [
        { label: "الاسم القانوني", value: "Zheng*" },
        { label: "تاريخ التحقق", value: "2026-08-01 10:38:58" },
      ],
    ],
  },
});

const hi = fromEn({
  pageTitle: "पहचान सत्यापन",
  successAlert: {
    beforeLink: "🎉 सत्यापन पूर्ण — वाउचर आपका इंतज़ार कर रहा है। ",
    linkText: "अभी प्राप्त करें",
    afterLink: " 🎟️",
  },
  statusCard: {
    title: "पहचान सत्यापित",
    enterpriseLink: "एंटरप्राइज़ खाते में बदलें",
    columns: [
      [
        {
          label: "स्थिति",
          value: "सत्यापित",
          showCheck: true,
          spaceAfterColon: true,
        },
        { label: "पहचान पत्र प्रकार", value: "मुख्य भूमि चीन निवासी ID" },
      ],
      [
        { label: "खाता प्रकार", value: "व्यक्तिगत" },
        { label: "पहचान संख्या", value: "350427********5515" },
      ],
      [
        { label: "कानूनी नाम", value: "Zheng*" },
        { label: "सत्यापित समय", value: "2026-08-01 10:38:58" },
      ],
    ],
  },
});

const id = fromEn({
  pageTitle: "Verifikasi identitas",
  successAlert: {
    beforeLink:
      "🎉 Verifikasi selesai — voucher menunggu Anda. ",
    linkText: "Klaim sekarang",
    afterLink: " 🎟️",
  },
  statusCard: {
    title: "Identitas terverifikasi",
    enterpriseLink: "Beralih ke akun perusahaan",
    columns: [
      [
        {
          label: "Status",
          value: "Terverifikasi",
          showCheck: true,
          spaceAfterColon: true,
        },
        { label: "Jenis identitas", value: "KTP penduduk Tiongkok daratan" },
      ],
      [
        { label: "Jenis akun", value: "Individu" },
        { label: "Nomor identitas", value: "350427********5515" },
      ],
      [
        { label: "Nama resmi", value: "Zheng*" },
        { label: "Diverifikasi pada", value: "2026-08-01 10:38:58" },
      ],
    ],
  },
});

const AUTH_UI_COPY: Record<TargetLocale, AuthUiCopy> = {
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

export function getAuthUiCopy(locale: string): AuthUiCopy {
  return pickTargetCatalog(locale, AUTH_UI_COPY);
}
