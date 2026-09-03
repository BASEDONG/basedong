import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";
import { APP_ROUTES } from "@/lib/routes";
import type { FooterLink, NavGroup } from "../models/content-types";

export type ConsoleChromeCopy = {
  brandAlt: string;
  pageTitles: {
    modelsPlaza: string;
  };
  nav: {
    models: string;
    modelsPlaza: string;
    playground: string;
    chat: string;
    console: string;
    overview: string;
    apiKeys: string;
    records: string;
    callLogs: string;
    drawingLogs: string;
    taskLogs: string;
    personal: string;
    wallet: string;
    profile: string;
  };
  footer: {
    docs: string;
    copyright: string;
  };
  topbar: {
    quota: (amount: number) => string;
    logout: string;
    menuFold: string;
    notifications: string;
    avatar: string;
    notificationTitle: string;
    notificationDate: string;
    notificationBody: string;
  };
};

const zhCN: ConsoleChromeCopy = {
  brandAlt: "八色鸫",
  pageTitles: { modelsPlaza: "模型广场" },
  nav: {
    models: "模型",
    modelsPlaza: "模型广场",
    playground: "在线体验",
    chat: "对话",
    console: "控制台",
    overview: "用量概览",
    apiKeys: "API 密钥",
    records: "记录",
    callLogs: "调用记录",
    drawingLogs: "绘图记录",
    taskLogs: "异步任务",
    personal: "个人",
    wallet: "钱包",
    profile: "个人资料",
  },
  footer: {
    docs: "文档中心",
    copyright:
      "© 八色鸫人工智能科技（福建省泉州市）有限责任公司 2026 版权所有",
  },
  topbar: {
    quota: (amount) => `额度 ${amount}`,
    logout: "退出登录",
    menuFold: "折叠菜单",
    notifications: "通知",
    avatar: "账户菜单",
    notificationTitle: "《隐私政策》更新",
    notificationDate: "2026-06-29",
    notificationBody:
      "为了更好地保护您的个人信息与隐私安全，提供更优质、安全的服务，我们根据最新法律法规要求，制定并上线了全新的《隐私政策》。本次上线的《隐私政策》详细说明了以下核心内容：我们如何收集、使用和保护您的个人信息；我们与第三方共享信息的具体情况；您如何行使查阅、更正、删除个人信息以及注销账号等权利。我们强烈建议您仔细阅读更新版 《隐私政策》 的全部内容。如您继续使用我们的服务，即表示您已充分阅读、理解并同意受该政策的约束。我们将一如既往地坚守安全底线，为您提供安全可靠的服务体验。感谢您对八色鸫的信任与支持！",
  },
};

const en: ConsoleChromeCopy = {
  brandAlt: "basedong",
  pageTitles: { modelsPlaza: "Model plaza" },
  nav: {
    models: "Models",
    modelsPlaza: "Model plaza",
    playground: "Playground",
    chat: "Chat",
    console: "Console",
    overview: "Usage overview",
    apiKeys: "API keys",
    records: "Records",
    callLogs: "Call history",
    drawingLogs: "Drawing records",
    taskLogs: "Async tasks",
    personal: "Personal",
    wallet: "Wallet",
    profile: "Profile",
  },
  footer: {
    docs: "Docs",
    copyright: "© basedong AI Tech (Quanzhou, Fujian) Co., Ltd. 2026",
  },
  topbar: {
    quota: (amount) => `Quota ${amount}`,
    logout: "Log out",
    menuFold: "Toggle menu",
    notifications: "Notifications",
    avatar: "Account menu",
    notificationTitle: "Privacy Policy update",
    notificationDate: "2026-06-29",
    notificationBody:
      "To better protect your personal information and privacy and to provide safer services, we have published an updated Privacy Policy in line with applicable laws. It explains how we collect, use, and protect your data; when we share information with third parties; and how you can access, correct, delete data, or close your account. Please read the full Privacy Policy. Continued use of our services means you understand and agree to it. Thank you for trusting basedong.",
  },
};

const zhTW: ConsoleChromeCopy = {
  brandAlt: "八色鶇",
  pageTitles: { modelsPlaza: "模型廣場" },
  nav: {
    models: "模型",
    modelsPlaza: "模型廣場",
    playground: "線上體驗",
    chat: "對話",
    console: "控制台",
    overview: "用量概覽",
    apiKeys: "API 密鑰",
    records: "記錄",
    callLogs: "呼叫記錄",
    drawingLogs: "繪圖記錄",
    taskLogs: "非同步任務",
    personal: "個人",
    wallet: "錢包",
    profile: "個人資料",
  },
  footer: {
    docs: "文件中心",
    copyright:
      "© 八色鶇人工智慧科技（福建省泉州市）有限責任公司 2026 版權所有",
  },
  topbar: {
    quota: (amount) => `額度 ${amount}`,
    logout: "登出",
    menuFold: "摺疊選單",
    notifications: "通知",
    avatar: "帳戶選單",
    notificationTitle: "《隱私權政策》更新",
    notificationDate: "2026-06-29",
    notificationBody:
      "為了更好地保護您的個人資訊與隱私安全，提供更優質、安全的服務，我們根據最新法規要求，制定並上線了全新的《隱私權政策》。請仔細閱讀更新版全部內容。如您繼續使用我們的服務，即表示您已充分閱讀、理解並同意受該政策約束。感謝您對八色鶇的信任與支持！",
  },
};

const ja: ConsoleChromeCopy = {
  brandAlt: "basedong",
  pageTitles: { modelsPlaza: "モデル広場" },
  nav: {
    models: "モデル",
    modelsPlaza: "モデル広場",
    playground: "オンライン体験",
    chat: "チャット",
    console: "コンソール",
    overview: "利用概要",
    apiKeys: "API キー",
    records: "記録",
    callLogs: "呼び出し記録",
    drawingLogs: "描画記録",
    taskLogs: "非同期タスク",
    personal: "個人",
    wallet: "ウォレット",
    profile: "プロフィール",
  },
  footer: {
    docs: "ドキュメント",
    copyright: "© basedong AI Tech (Quanzhou, Fujian) Co., Ltd. 2026",
  },
  topbar: {
    quota: (amount) => `枠 ${amount}`,
    logout: "ログアウト",
    menuFold: "メニュー切替",
    notifications: "通知",
    avatar: "アカウントメニュー",
    notificationTitle: "プライバシーポリシー更新",
    notificationDate: "2026-06-29",
    notificationBody:
      "個人情報とプライバシーをより良く保護し、安全なサービスを提供するため、最新の法令に基づきプライバシーポリシーを更新しました。引き続きサービスをご利用いただく場合、本ポリシーに同意したものとみなします。basedong へのご信頼に感謝します。",
  },
};

const fr: ConsoleChromeCopy = {
  brandAlt: "basedong",
  pageTitles: { modelsPlaza: "Place des modèles" },
  nav: {
    models: "Modèles",
    modelsPlaza: "Place des modèles",
    playground: "Playground",
    chat: "Chat",
    console: "Console",
    overview: "Usage overview",
    apiKeys: "API keys",
    records: "Records",
    callLogs: "Call history",
    drawingLogs: "Drawing records",
    taskLogs: "Async tasks",
    personal: "Personal",
    wallet: "Wallet",
    profile: "Profile",
  },
  footer: {
    docs: "Documentation",
    copyright: "© basedong AI Tech (Quanzhou, Fujian) Co., Ltd. 2026",
  },
  topbar: {
    quota: (amount) => `Quota ${amount}`,
    logout: "Déconnexion",
    menuFold: "Réduire le menu",
    notifications: "Notifications",
    avatar: "Menu du compte",
    notificationTitle: "Mise à jour de la politique de confidentialité",
    notificationDate: "2026-06-29",
    notificationBody:
      "Pour mieux protéger vos données personnelles, nous avons publié une politique de confidentialité mise à jour. Veuillez la lire attentivement. En continuant à utiliser nos services, vous acceptez cette politique. Merci de votre confiance.",
  },
};

const ru: ConsoleChromeCopy = {
  brandAlt: "basedong",
  pageTitles: { modelsPlaza: "Площадка моделей" },
  nav: {
    models: "Модели",
    modelsPlaza: "Площадка моделей",
    playground: "Песочница",
    chat: "Чат",
    console: "Console",
    overview: "Usage overview",
    apiKeys: "API keys",
    records: "Records",
    callLogs: "Call history",
    drawingLogs: "Drawing records",
    taskLogs: "Async tasks",
    personal: "Personal",
    wallet: "Wallet",
    profile: "Profile",
  },
  footer: {
    docs: "Документация",
    copyright: "© basedong AI Tech (Quanzhou, Fujian) Co., Ltd. 2026",
  },
  topbar: {
    quota: (amount) => `Квота ${amount}`,
    logout: "Выйти",
    menuFold: "Свернуть меню",
    notifications: "Уведомления",
    avatar: "Меню аккаунта",
    notificationTitle: "Обновление политики конфиденциальности",
    notificationDate: "2026-06-29",
    notificationBody:
      "Чтобы лучше защитить ваши персональные данные, мы опубликовали обновлённую политику конфиденциальности. Продолжая пользоваться сервисом, вы соглашаетесь с ней. Спасибо за доверие к basedong.",
  },
};

const vi: ConsoleChromeCopy = {
  brandAlt: "basedong",
  pageTitles: { modelsPlaza: "Quảng trường mô hình" },
  nav: {
    models: "Mô hình",
    modelsPlaza: "Quảng trường mô hình",
    playground: "Thử nghiệm",
    chat: "Trò chuyện",
    console: "Console",
    overview: "Usage overview",
    apiKeys: "API keys",
    records: "Records",
    callLogs: "Call history",
    drawingLogs: "Drawing records",
    taskLogs: "Async tasks",
    personal: "Personal",
    wallet: "Wallet",
    profile: "Profile",
  },
  footer: {
    docs: "Tài liệu",
    copyright: "© basedong AI Tech (Quanzhou, Fujian) Co., Ltd. 2026",
  },
  topbar: {
    quota: (amount) => `Hạn mức ${amount}`,
    logout: "Đăng xuất",
    menuFold: "Thu gọn menu",
    notifications: "Thông báo",
    avatar: "Menu tài khoản",
    notificationTitle: "Cập nhật Chính sách quyền riêng tư",
    notificationDate: "2026-06-29",
    notificationBody:
      "Để bảo vệ thông tin cá nhân tốt hơn, chúng tôi đã cập nhật Chính sách quyền riêng tư. Việc tiếp tục sử dụng dịch vụ đồng nghĩa bạn đồng ý với chính sách này. Cảm ơn bạn đã tin tưởng basedong.",
  },
};

const ko: ConsoleChromeCopy = {
  brandAlt: "basedong",
  pageTitles: { modelsPlaza: "모델 광장" },
  nav: {
    models: "모델",
    modelsPlaza: "모델 광장",
    playground: "플레이그라운드",
    chat: "채팅",
    console: "Console",
    overview: "Usage overview",
    apiKeys: "API keys",
    records: "Records",
    callLogs: "Call history",
    drawingLogs: "Drawing records",
    taskLogs: "Async tasks",
    personal: "Personal",
    wallet: "Wallet",
    profile: "Profile",
  },
  footer: {
    docs: "문서",
    copyright: "© basedong AI Tech (Quanzhou, Fujian) Co., Ltd. 2026",
  },
  topbar: {
    quota: (amount) => `한도 ${amount}`,
    logout: "로그아웃",
    menuFold: "메뉴 접기",
    notifications: "알림",
    avatar: "계정 메뉴",
    notificationTitle: "개인정보 처리방침 업데이트",
    notificationDate: "2026-06-29",
    notificationBody:
      "개인정보 보호를 강화하기 위해 개인정보 처리방침을 업데이트했습니다. 서비스를 계속 이용하시면 본 방침에 동의한 것으로 간주됩니다. basedong을 믿어 주셔서 감사합니다.",
  },
};

const de: ConsoleChromeCopy = {
  brandAlt: "basedong",
  pageTitles: { modelsPlaza: "Modellplatz" },
  nav: {
    models: "Modelle",
    modelsPlaza: "Modellplatz",
    playground: "Playground",
    chat: "Chat",
    console: "Console",
    overview: "Usage overview",
    apiKeys: "API keys",
    records: "Records",
    callLogs: "Call history",
    drawingLogs: "Drawing records",
    taskLogs: "Async tasks",
    personal: "Personal",
    wallet: "Wallet",
    profile: "Profile",
  },
  footer: {
    docs: "Dokumentation",
    copyright: "© basedong AI Tech (Quanzhou, Fujian) Co., Ltd. 2026",
  },
  topbar: {
    quota: (amount) => `Kontingent ${amount}`,
    logout: "Abmelden",
    menuFold: "Menü umschalten",
    notifications: "Benachrichtigungen",
    avatar: "Kontomenü",
    notificationTitle: "Aktualisierung der Datenschutzrichtlinie",
    notificationDate: "2026-06-29",
    notificationBody:
      "Zum besseren Schutz Ihrer Daten haben wir die Datenschutzrichtlinie aktualisiert. Die weitere Nutzung bedeutet Ihre Zustimmung. Danke für Ihr Vertrauen in basedong.",
  },
};

const es: ConsoleChromeCopy = {
  brandAlt: "basedong",
  pageTitles: { modelsPlaza: "Plaza de modelos" },
  nav: {
    models: "Modelos",
    modelsPlaza: "Plaza de modelos",
    playground: "Playground",
    chat: "Chat",
    console: "Console",
    overview: "Usage overview",
    apiKeys: "API keys",
    records: "Records",
    callLogs: "Call history",
    drawingLogs: "Drawing records",
    taskLogs: "Async tasks",
    personal: "Personal",
    wallet: "Wallet",
    profile: "Profile",
  },
  footer: {
    docs: "Documentación",
    copyright: "© basedong AI Tech (Quanzhou, Fujian) Co., Ltd. 2026",
  },
  topbar: {
    quota: (amount) => `Cuota ${amount}`,
    logout: "Cerrar sesión",
    menuFold: "Contraer menú",
    notifications: "Notificaciones",
    avatar: "Menú de cuenta",
    notificationTitle: "Actualización de la Política de privacidad",
    notificationDate: "2026-06-29",
    notificationBody:
      "Para proteger mejor su información personal, hemos actualizado la Política de privacidad. El uso continuado implica su aceptación. Gracias por confiar en basedong.",
  },
};

const ptBR: ConsoleChromeCopy = {
  brandAlt: "basedong",
  pageTitles: { modelsPlaza: "Praça de modelos" },
  nav: {
    models: "Modelos",
    modelsPlaza: "Praça de modelos",
    playground: "Playground",
    chat: "Chat",
    console: "Console",
    overview: "Usage overview",
    apiKeys: "API keys",
    records: "Records",
    callLogs: "Call history",
    drawingLogs: "Drawing records",
    taskLogs: "Async tasks",
    personal: "Personal",
    wallet: "Wallet",
    profile: "Profile",
  },
  footer: {
    docs: "Documentação",
    copyright: "© basedong AI Tech (Quanzhou, Fujian) Co., Ltd. 2026",
  },
  topbar: {
    quota: (amount) => `Cota ${amount}`,
    logout: "Sair",
    menuFold: "Recolher menu",
    notifications: "Notificações",
    avatar: "Menu da conta",
    notificationTitle: "Atualização da Política de Privacidade",
    notificationDate: "2026-06-29",
    notificationBody:
      "Para proteger melhor seus dados pessoais, atualizamos a Política de Privacidade. Continuar usando o serviço implica concordância. Obrigado pela confiança no basedong.",
  },
};

const ar: ConsoleChromeCopy = {
  brandAlt: "basedong",
  pageTitles: { modelsPlaza: "ساحة النماذج" },
  nav: {
    models: "النماذج",
    modelsPlaza: "ساحة النماذج",
    playground: "ساحة التجربة",
    chat: "محادثة",
    console: "Console",
    overview: "Usage overview",
    apiKeys: "API keys",
    records: "Records",
    callLogs: "Call history",
    drawingLogs: "Drawing records",
    taskLogs: "Async tasks",
    personal: "Personal",
    wallet: "Wallet",
    profile: "Profile",
  },
  footer: {
    docs: "المستندات",
    copyright: "© basedong AI Tech (Quanzhou, Fujian) Co., Ltd. 2026",
  },
  topbar: {
    quota: (amount) => `الحصة ${amount}`,
    logout: "تسجيل الخروج",
    menuFold: "طي القائمة",
    notifications: "الإشعارات",
    avatar: "قائمة الحساب",
    notificationTitle: "تحديث سياسة الخصوصية",
    notificationDate: "2026-06-29",
    notificationBody:
      "لحماية بياناتك الشخصية بشكل أفضل، حدّثنا سياسة الخصوصية. استمرارك في استخدام الخدمة يعني موافقتك عليها. شكرًا لثقتك بـ basedong.",
  },
};

const hi: ConsoleChromeCopy = {
  brandAlt: "basedong",
  pageTitles: { modelsPlaza: "मॉडल प्लाज़ा" },
  nav: {
    models: "मॉडल",
    modelsPlaza: "मॉडल प्लाज़ा",
    playground: "प्लेग्राउंड",
    chat: "चैट",
    console: "Console",
    overview: "Usage overview",
    apiKeys: "API keys",
    records: "Records",
    callLogs: "Call history",
    drawingLogs: "Drawing records",
    taskLogs: "Async tasks",
    personal: "Personal",
    wallet: "Wallet",
    profile: "Profile",
  },
  footer: {
    docs: "दस्तावेज़",
    copyright: "© basedong AI Tech (Quanzhou, Fujian) Co., Ltd. 2026",
  },
  topbar: {
    quota: (amount) => `कोटा ${amount}`,
    logout: "लॉग आउट",
    menuFold: "मेनू समेटें",
    notifications: "सूचनाएँ",
    avatar: "खाता मेनू",
    notificationTitle: "गोपनीयता नीति अपडेट",
    notificationDate: "2026-06-29",
    notificationBody:
      "आपकी व्यक्तिगत जानकारी की बेहतर सुरक्षा के लिए हमने गोपनीयता नीति अपडेट की है। सेवा का निरंतर उपयोग सहमति माना जाएगा। basedong पर विश्वास के लिए धन्यवाद।",
  },
};

const id: ConsoleChromeCopy = {
  brandAlt: "basedong",
  pageTitles: { modelsPlaza: "Plaza model" },
  nav: {
    models: "Model",
    modelsPlaza: "Plaza model",
    playground: "Playground",
    chat: "Obrolan",
    console: "Console",
    overview: "Usage overview",
    apiKeys: "API keys",
    records: "Records",
    callLogs: "Call history",
    drawingLogs: "Drawing records",
    taskLogs: "Async tasks",
    personal: "Personal",
    wallet: "Wallet",
    profile: "Profile",
  },
  footer: {
    docs: "Dokumentasi",
    copyright: "© basedong AI Tech (Quanzhou, Fujian) Co., Ltd. 2026",
  },
  topbar: {
    quota: (amount) => `Kuota ${amount}`,
    logout: "Keluar",
    menuFold: "Ciutkan menu",
    notifications: "Notifikasi",
    avatar: "Menu akun",
    notificationTitle: "Pembaruan Kebijakan Privasi",
    notificationDate: "2026-06-29",
    notificationBody:
      "Untuk melindungi data pribadi Anda dengan lebih baik, kami memperbarui Kebijakan Privasi. Melanjutkan penggunaan berarti Anda setuju. Terima kasih atas kepercayaan Anda kepada basedong.",
  },
};

const CHROME_COPY: Record<TargetLocale, ConsoleChromeCopy> = {
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

export function getConsoleChromeCopy(locale: string): ConsoleChromeCopy {
  return pickTargetCatalog(locale, CHROME_COPY);
}

export function getConsoleNavGroups(locale: string): NavGroup[] {
  const c = getConsoleChromeCopy(locale).nav;
  return [
    {
      key: "models",
      label: c.models,
      items: [
        {
          key: "models-plaza",
          label: c.modelsPlaza,
          icon: "ModelsPlazaIcon",
          href: "/me/models",
        },
      ],
    },
    {
      key: "playground",
      label: c.playground,
      items: [
        {
          key: "chat",
          label: c.chat,
          icon: "ChatIcon",
          href: "/me/playground/chat",
        },
      ],
    },
    {
      key: "console",
      label: c.console,
      items: [
        {
          key: "overview",
          label: c.overview,
          icon: "BillsIcon",
          href: "/me/overview",
        },
        {
          key: "ak",
          label: c.apiKeys,
          icon: "KeyIcon",
          href: "/me/account/ak",
        },
      ],
    },
    {
      key: "records",
      label: c.records,
      items: [
        {
          key: "call-logs",
          label: c.callLogs,
          icon: "BillsIcon",
          href: "/me/logs",
        },
        {
          key: "drawing-logs",
          label: c.drawingLogs,
          icon: "ImageIcon",
          href: "/me/logs/drawing",
        },
        {
          key: "task-logs",
          label: c.taskLogs,
          icon: "VideoIcon",
          href: "/me/logs/tasks",
        },
      ],
    },
    {
      key: "personal",
      label: c.personal,
      items: [
        {
          key: "wallet",
          label: c.wallet,
          icon: "WalletIcon",
          href: "/me/wallet",
        },
        {
          key: "profile",
          label: c.profile,
          icon: "KeyIcon",
          href: "/me/profile",
        },
      ],
    },
  ];
}

export function getConsoleFooterLinks(locale: string): FooterLink[] {
  const c = getConsoleChromeCopy(locale).footer;
  return [
    {
      key: "docs",
      label: c.docs,
      href: APP_ROUTES.docsIntroduction,
      icon: "DocsIcon",
    },
  ];
}
