import type { TranslatedLocale } from "@/lib/locale";

export type ChromeCopy = {
  brandAlt: string;
  homeAria: string;
  menuAria: string;
  backToTop: string;
  switchLanguage: string;
  languageList: string;
  tagline: string;
  wechat: string;
  contactUs: string;
  marketCoop: string;
  addressLabel: string;
  address: string;
  copyright: string;
  nav: {
    models: string;
    pricing: string;
    docs: string;
    partner: string;
    cloudMaas: string;
    tokenFactory: string;
    reserved: string;
    privateMaas: string;
    privatePlatform: string;
    privateGateway: string;
    about: string;
    company: string;
    brand: string;
    news: string;
    developerTalk: string;
    login: string;
    console: string;
    products: string;
  };
  footer: {
    pages: string;
    products: string;
    legal: string;
    userAgreement: string;
    companyIntro: string;
    brandIdea: string;
  };
};

const zhCN: ChromeCopy = {
  brandAlt: "八色鸫 basedong",
  homeAria: "八色鸫 首页",
  menuAria: "菜单",
  backToTop: "回到顶部",
  switchLanguage: "切换语言",
  languageList: "语言列表",
  tagline: "做所有人的 AI。",
  wechat: "微信",
  contactUs: "联系我们",
  marketCoop: "市场合作：",
  addressLabel: "地址：",
  address: "福建省泉州市丰泽区数字经济产业园综合楼",
  copyright: "© 八色鸫人工智能科技（福建省泉州市）有限责任公司 2026 版权所有",
  nav: {
    models: "模型",
    pricing: "价格",
    docs: "文档",
    partner: "生态合作",
    cloudMaas: "大模型云服务",
    tokenFactory: "AI 算力运营服务",
    reserved: "预留实例",
    privateMaas: "私有化 MaaS",
    privatePlatform: "私有化大模型服务平台",
    privateGateway: "私有化大模型服务网关",
    about: "关于",
    company: "公司介绍",
    brand: "品牌理念",
    news: "企业动态",
    developerTalk: "开发者说",
    login: "登录",
    console: "控制台",
    products: "产品",
  },
  footer: {
    pages: "页面",
    products: "产品",
    legal: "法律",
    userAgreement: "用户协议",
    companyIntro: "公司介绍",
    brandIdea: "品牌理念",
  },
};

const en: ChromeCopy = {
  brandAlt: "basedong",
  homeAria: "basedong home",
  menuAria: "Menu",
  backToTop: "Back to top",
  switchLanguage: "Switch language",
  languageList: "Languages",
  tagline: "AI for everyone.",
  wechat: "WeChat",
  contactUs: "Contact us",
  marketCoop: "Partnerships:",
  addressLabel: "Address:",
  address:
    "Digital Economy Industrial Park, Fengze District, Quanzhou, Fujian, China",
  copyright:
    "© basedong AI Technology (Quanzhou, Fujian) Co., Ltd. 2026 All rights reserved",
  nav: {
    models: "Models",
    pricing: "Pricing",
    docs: "Docs",
    partner: "Partners",
    cloudMaas: "Cloud MaaS",
    tokenFactory: "AI compute ops",
    reserved: "Reserved instances",
    privateMaas: "Private MaaS",
    privatePlatform: "Private model platform",
    privateGateway: "Private model gateway",
    about: "About",
    company: "Company",
    brand: "Brand",
    news: "News",
    developerTalk: "Developer stories",
    login: "Log in",
    console: "Console",
    products: "Products",
  },
  footer: {
    pages: "Pages",
    products: "Products",
    legal: "Legal",
    userAgreement: "User agreement",
    companyIntro: "Company",
    brandIdea: "Brand",
  },
};

const zhTW: ChromeCopy = {
  brandAlt: "八色鶇 basedong",
  homeAria: "八色鶇 首頁",
  menuAria: "選單",
  backToTop: "回到頂部",
  switchLanguage: "切換語言",
  languageList: "語言列表",
  tagline: "做所有人的 AI。",
  wechat: "微信",
  contactUs: "聯絡我們",
  marketCoop: "市場合作：",
  addressLabel: "地址：",
  address: "福建省泉州市豐澤區數字經濟產業園綜合樓",
  copyright: "© 八色鶇人工智慧科技（福建省泉州市）有限責任公司 2026 版權所有",
  nav: {
    models: "模型",
    pricing: "價格",
    docs: "文件",
    partner: "生態合作",
    cloudMaas: "大模型雲服務",
    tokenFactory: "AI 算力營運服務",
    reserved: "預留實例",
    privateMaas: "私有化 MaaS",
    privatePlatform: "私有化大模型服務平台",
    privateGateway: "私有化大模型服務閘道",
    about: "關於",
    company: "公司介紹",
    brand: "品牌理念",
    news: "企業動態",
    developerTalk: "開發者說",
    login: "登入",
    console: "控制台",
    products: "產品",
  },
  footer: {
    pages: "頁面",
    products: "產品",
    legal: "法律",
    userAgreement: "使用者協議",
    companyIntro: "公司介紹",
    brandIdea: "品牌理念",
  },
};

const fr: ChromeCopy = {
  brandAlt: "basedong",
  homeAria: "Accueil basedong",
  menuAria: "Menu",
  backToTop: "Haut de page",
  switchLanguage: "Changer de langue",
  languageList: "Langues",
  tagline: "L'IA pour tous.",
  wechat: "WeChat",
  contactUs: "Nous contacter",
  marketCoop: "Partenariats :",
  addressLabel: "Adresse :",
  address:
    "Parc industriel de l'économie numérique, district de Fengze, Quanzhou, Fujian, Chine",
  copyright:
    "© basedong AI Technology (Quanzhou, Fujian) Co., Ltd. 2026 Tous droits réservés",
  nav: {
    models: "Modèles",
    pricing: "Tarifs",
    docs: "Docs",
    partner: "Partenaires",
    cloudMaas: "MaaS cloud",
    tokenFactory: "Ops de calcul IA",
    reserved: "Instances réservées",
    privateMaas: "MaaS privé",
    privatePlatform: "Plateforme de modèles privée",
    privateGateway: "Passerelle de modèles privée",
    about: "À propos",
    company: "Entreprise",
    brand: "Marque",
    news: "Actualités",
    developerTalk: "Paroles de développeurs",
    login: "Connexion",
    console: "Console",
    products: "Produits",
  },
  footer: {
    pages: "Pages",
    products: "Produits",
    legal: "Mentions légales",
    userAgreement: "Conditions d'utilisation",
    companyIntro: "Entreprise",
    brandIdea: "Marque",
  },
};

const ru: ChromeCopy = {
  brandAlt: "basedong",
  homeAria: "Главная basedong",
  menuAria: "Меню",
  backToTop: "Наверх",
  switchLanguage: "Сменить язык",
  languageList: "Языки",
  tagline: "ИИ для всех.",
  wechat: "WeChat",
  contactUs: "Связаться с нами",
  marketCoop: "Сотрудничество:",
  addressLabel: "Адрес:",
  address:
    "Индустриальный парк цифровой экономики, район Фэнцзэ, Цюаньчжоу, Фуцзянь, Китай",
  copyright:
    "© basedong AI Technology (Quanzhou, Fujian) Co., Ltd. 2026 Все права защищены",
  nav: {
    models: "Модели",
    pricing: "Цены",
    docs: "Документация",
    partner: "Партнёры",
    cloudMaas: "Облачный MaaS",
    tokenFactory: "Операции AI-вычислений",
    reserved: "Зарезервированные инстансы",
    privateMaas: "Частный MaaS",
    privatePlatform: "Частная платформа моделей",
    privateGateway: "Частный шлюз моделей",
    about: "О нас",
    company: "Компания",
    brand: "Бренд",
    news: "Новости",
    developerTalk: "Истории разработчиков",
    login: "Вход",
    console: "Консоль",
    products: "Продукты",
  },
  footer: {
    pages: "Страницы",
    products: "Продукты",
    legal: "Правовая информация",
    userAgreement: "Пользовательское соглашение",
    companyIntro: "Компания",
    brandIdea: "Бренд",
  },
};

const ja: ChromeCopy = {
  brandAlt: "basedong",
  homeAria: "basedong ホーム",
  menuAria: "メニュー",
  backToTop: "ページ上部へ",
  switchLanguage: "言語を切り替え",
  languageList: "言語一覧",
  tagline: "すべての人のための AI。",
  wechat: "WeChat",
  contactUs: "お問い合わせ",
  marketCoop: "ビジネス提携：",
  addressLabel: "住所：",
  address: "中国福建省泉州市豊沢区デジタル経済産業園総合棟",
  copyright:
    "© basedong AI Technology (Quanzhou, Fujian) Co., Ltd. 2026 All rights reserved",
  nav: {
    models: "モデル",
    pricing: "料金",
    docs: "ドキュメント",
    partner: "パートナー",
    cloudMaas: "クラウド MaaS",
    tokenFactory: "AI 演算運用サービス",
    reserved: "予約インスタンス",
    privateMaas: "プライベート MaaS",
    privatePlatform: "プライベートモデル基盤",
    privateGateway: "プライベートモデルゲートウェイ",
    about: "会社情報",
    company: "会社紹介",
    brand: "ブランド",
    news: "ニュース",
    developerTalk: "開発者の声",
    login: "ログイン",
    console: "コンソール",
    products: "製品",
  },
  footer: {
    pages: "ページ",
    products: "製品",
    legal: "法務",
    userAgreement: "利用規約",
    companyIntro: "会社紹介",
    brandIdea: "ブランド",
  },
};

const vi: ChromeCopy = {
  brandAlt: "basedong",
  homeAria: "Trang chủ basedong",
  menuAria: "Menu",
  backToTop: "Lên đầu trang",
  switchLanguage: "Đổi ngôn ngữ",
  languageList: "Danh sách ngôn ngữ",
  tagline: "AI cho mọi người.",
  wechat: "WeChat",
  contactUs: "Liên hệ",
  marketCoop: "Hợp tác:",
  addressLabel: "Địa chỉ:",
  address:
    "Khu công nghiệp kinh tế số, quận Fengze, Quanzhou, Fujian, Trung Quốc",
  copyright:
    "© basedong AI Technology (Quanzhou, Fujian) Co., Ltd. 2026 Bảo lưu mọi quyền",
  nav: {
    models: "Mô hình",
    pricing: "Bảng giá",
    docs: "Tài liệu",
    partner: "Đối tác",
    cloudMaas: "MaaS đám mây",
    tokenFactory: "Vận hành tính toán AI",
    reserved: "Instance dự trữ",
    privateMaas: "MaaS riêng",
    privatePlatform: "Nền tảng mô hình riêng",
    privateGateway: "Cổng mô hình riêng",
    about: "Giới thiệu",
    company: "Công ty",
    brand: "Thương hiệu",
    news: "Tin tức",
    developerTalk: "Góc lập trình viên",
    login: "Đăng nhập",
    console: "Bảng điều khiển",
    products: "Sản phẩm",
  },
  footer: {
    pages: "Trang",
    products: "Sản phẩm",
    legal: "Pháp lý",
    userAgreement: "Thỏa thuận người dùng",
    companyIntro: "Công ty",
    brandIdea: "Thương hiệu",
  },
};

const CHROME: Record<TranslatedLocale, ChromeCopy> = {
  "zh-CN": zhCN,
  en,
  "zh-TW": zhTW,
  fr,
  ru,
  ja,
  vi,
};

export function getChromeCopy(locale: string): ChromeCopy {
  return CHROME[locale as TranslatedLocale] ?? zhCN;
}
