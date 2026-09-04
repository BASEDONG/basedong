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
    /** `amount` is already locale-formatted (see formatConsoleQuota). */
    quota: (amount: string) => string;
    logout: string;
    menuFold: string;
    avatar: string;
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
    avatar: "账户菜单",
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
    avatar: "Account menu",
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
    avatar: "帳戶選單",
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
    avatar: "アカウントメニュー",
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
    avatar: "Menu du compte",
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
    avatar: "Меню аккаунта",
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
    avatar: "Menu tài khoản",
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
    avatar: "계정 메뉴",
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
    avatar: "Kontomenü",
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
    avatar: "Menú de cuenta",
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
    avatar: "Menu da conta",
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
    avatar: "قائمة الحساب",
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
    avatar: "खाता मेनू",
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
    avatar: "Menu akun",
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
