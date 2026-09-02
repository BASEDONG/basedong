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

const ko: ChromeCopy = {
  brandAlt: "basedong",
  homeAria: "basedong 홈",
  menuAria: "메뉴",
  backToTop: "맨 위로",
  switchLanguage: "언어 변경",
  languageList: "언어 목록",
  tagline: "모두를 위한 AI.",
  wechat: "WeChat",
  contactUs: "문의하기",
  marketCoop: "파트너십:",
  addressLabel: "주소:",
  address:
    "중국 푸젠성 취안저우 펑쩌구 디지털 경제 산업단지 종합동",
  copyright:
    "© basedong AI Technology (Quanzhou, Fujian) Co., Ltd. 2026 All rights reserved",
  nav: {
    models: "모델",
    pricing: "요금",
    docs: "문서",
    partner: "파트너",
    cloudMaas: "클라우드 MaaS",
    tokenFactory: "AI 연산 운영",
    reserved: "예약 인스턴스",
    privateMaas: "프라이빗 MaaS",
    privatePlatform: "프라이빗 모델 플랫폼",
    privateGateway: "프라이빗 모델 게이트웨이",
    about: "소개",
    company: "회사",
    brand: "브랜드",
    news: "뉴스",
    developerTalk: "개발자 이야기",
    login: "로그인",
    console: "콘솔",
    products: "제품",
  },
  footer: {
    pages: "페이지",
    products: "제품",
    legal: "법적 고지",
    userAgreement: "이용약관",
    companyIntro: "회사",
    brandIdea: "브랜드",
  },
};

const de: ChromeCopy = {
  brandAlt: "basedong",
  homeAria: "basedong Startseite",
  menuAria: "Menü",
  backToTop: "Nach oben",
  switchLanguage: "Sprache wechseln",
  languageList: "Sprachen",
  tagline: "KI für alle.",
  wechat: "WeChat",
  contactUs: "Kontakt",
  marketCoop: "Partnerschaften:",
  addressLabel: "Adresse:",
  address:
    "Digital Economy Industrial Park, Fengze District, Quanzhou, Fujian, China",
  copyright:
    "© basedong AI Technology (Quanzhou, Fujian) Co., Ltd. 2026 Alle Rechte vorbehalten",
  nav: {
    models: "Modelle",
    pricing: "Preise",
    docs: "Dokumentation",
    partner: "Partner",
    cloudMaas: "Cloud MaaS",
    tokenFactory: "AI-Compute-Betrieb",
    reserved: "Reservierte Instanzen",
    privateMaas: "Private MaaS",
    privatePlatform: "Private Modellplattform",
    privateGateway: "Private Modell-Gateway",
    about: "Über uns",
    company: "Unternehmen",
    brand: "Marke",
    news: "Neuigkeiten",
    developerTalk: "Entwicklerstimmen",
    login: "Anmelden",
    console: "Konsole",
    products: "Produkte",
  },
  footer: {
    pages: "Seiten",
    products: "Produkte",
    legal: "Rechtliches",
    userAgreement: "Nutzungsvereinbarung",
    companyIntro: "Unternehmen",
    brandIdea: "Marke",
  },
};

const es: ChromeCopy = {
  brandAlt: "basedong",
  homeAria: "Inicio basedong",
  menuAria: "Menú",
  backToTop: "Volver arriba",
  switchLanguage: "Cambiar idioma",
  languageList: "Idiomas",
  tagline: "IA para todos.",
  wechat: "WeChat",
  contactUs: "Contáctanos",
  marketCoop: "Alianzas:",
  addressLabel: "Dirección:",
  address:
    "Parque industrial de economía digital, distrito Fengze, Quanzhou, Fujian, China",
  copyright:
    "© basedong AI Technology (Quanzhou, Fujian) Co., Ltd. 2026 Todos los derechos reservados",
  nav: {
    models: "Modelos",
    pricing: "Precios",
    docs: "Documentación",
    partner: "Socios",
    cloudMaas: "MaaS en la nube",
    tokenFactory: "Operaciones de cómputo IA",
    reserved: "Instancias reservadas",
    privateMaas: "MaaS privado",
    privatePlatform: "Plataforma de modelos privada",
    privateGateway: "Gateway de modelos privado",
    about: "Acerca de",
    company: "Empresa",
    brand: "Marca",
    news: "Noticias",
    developerTalk: "Historias de desarrolladores",
    login: "Iniciar sesión",
    console: "Consola",
    products: "Productos",
  },
  footer: {
    pages: "Páginas",
    products: "Productos",
    legal: "Legal",
    userAgreement: "Acuerdo de usuario",
    companyIntro: "Empresa",
    brandIdea: "Marca",
  },
};

const ptBR: ChromeCopy = {
  brandAlt: "basedong",
  homeAria: "Início basedong",
  menuAria: "Menu",
  backToTop: "Voltar ao topo",
  switchLanguage: "Trocar idioma",
  languageList: "Idiomas",
  tagline: "IA para todos.",
  wechat: "WeChat",
  contactUs: "Fale conosco",
  marketCoop: "Parcerias:",
  addressLabel: "Endereço:",
  address:
    "Parque industrial de economia digital, distrito Fengze, Quanzhou, Fujian, China",
  copyright:
    "© basedong AI Technology (Quanzhou, Fujian) Co., Ltd. 2026 Todos os direitos reservados",
  nav: {
    models: "Modelos",
    pricing: "Preços",
    docs: "Documentação",
    partner: "Parceiros",
    cloudMaas: "MaaS na nuvem",
    tokenFactory: "Operações de computação IA",
    reserved: "Instâncias reservadas",
    privateMaas: "MaaS privado",
    privatePlatform: "Plataforma de modelos privada",
    privateGateway: "Gateway de modelos privado",
    about: "Sobre",
    company: "Empresa",
    brand: "Marca",
    news: "Notícias",
    developerTalk: "Histórias de desenvolvedores",
    login: "Entrar",
    console: "Console",
    products: "Produtos",
  },
  footer: {
    pages: "Páginas",
    products: "Produtos",
    legal: "Legal",
    userAgreement: "Acordo do usuário",
    companyIntro: "Empresa",
    brandIdea: "Marca",
  },
};

const ar: ChromeCopy = {
  brandAlt: "basedong",
  homeAria: "الصفحة الرئيسية basedong",
  menuAria: "القائمة",
  backToTop: "العودة للأعلى",
  switchLanguage: "تغيير اللغة",
  languageList: "اللغات",
  tagline: "ذكاء اصطناعي للجميع.",
  wechat: "WeChat",
  contactUs: "اتصل بنا",
  marketCoop: "الشراكات:",
  addressLabel: "العنوان:",
  address:
    "حديقة اقتصاد رقمي الصناعية، منطقة Fengze، تشوانتشو، فوجيان، الصين",
  copyright:
    "© basedong AI Technology (Quanzhou, Fujian) Co., Ltd. 2026 جميع الحقوق محفوظة",
  nav: {
    models: "النماذج",
    pricing: "الأسعار",
    docs: "التوثيق",
    partner: "الشركاء",
    cloudMaas: "MaaS سحابي",
    tokenFactory: "عمليات الحوسبة للذكاء الاصطناعي",
    reserved: "مثيلات محجوزة",
    privateMaas: "MaaS خاص",
    privatePlatform: "منصة نماذج خاصة",
    privateGateway: "بوابة نماذج خاصة",
    about: "حول",
    company: "الشركة",
    brand: "العلامة",
    news: "الأخبار",
    developerTalk: "قصص المطورين",
    login: "تسجيل الدخول",
    console: "لوحة التحكم",
    products: "المنتجات",
  },
  footer: {
    pages: "الصفحات",
    products: "المنتجات",
    legal: "قانوني",
    userAgreement: "اتفاقية المستخدم",
    companyIntro: "الشركة",
    brandIdea: "العلامة",
  },
};

const hi: ChromeCopy = {
  brandAlt: "basedong",
  homeAria: "basedong होम",
  menuAria: "मेनू",
  backToTop: "ऊपर जाएँ",
  switchLanguage: "भाषा बदलें",
  languageList: "भाषाएँ",
  tagline: "सभी के लिए AI।",
  wechat: "WeChat",
  contactUs: "संपर्क करें",
  marketCoop: "साझेदारी:",
  addressLabel: "पता:",
  address:
    "डिजिटल इकोनॉमी इंडस्ट्रियल पार्क, Fengze District, Quanzhou, Fujian, China",
  copyright:
    "© basedong AI Technology (Quanzhou, Fujian) Co., Ltd. 2026 सर्वाधिकार सुरक्षित",
  nav: {
    models: "मॉडल",
    pricing: "मूल्य",
    docs: "दस्तावेज़",
    partner: "पार्टनर",
    cloudMaas: "क्लाउड MaaS",
    tokenFactory: "AI कंप्यूट ऑप्स",
    reserved: "आरक्षित इंस्टेंस",
    privateMaas: "प्राइवेट MaaS",
    privatePlatform: "प्राइवेट मॉडल प्लेटफ़ॉर्म",
    privateGateway: "प्राइवेट मॉडल गेटवे",
    about: "परिचय",
    company: "कंपनी",
    brand: "ब्रांड",
    news: "समाचार",
    developerTalk: "डेवलपर कहानियाँ",
    login: "लॉग इन",
    console: "कंसोल",
    products: "उत्पाद",
  },
  footer: {
    pages: "पृष्ठ",
    products: "उत्पाद",
    legal: "कानूनी",
    userAgreement: "उपयोगकर्ता समझौता",
    companyIntro: "कंपनी",
    brandIdea: "ब्रांड",
  },
};

const id: ChromeCopy = {
  brandAlt: "basedong",
  homeAria: "Beranda basedong",
  menuAria: "Menu",
  backToTop: "Kembali ke atas",
  switchLanguage: "Ganti bahasa",
  languageList: "Daftar bahasa",
  tagline: "AI untuk semua orang.",
  wechat: "WeChat",
  contactUs: "Hubungi kami",
  marketCoop: "Kemitraan:",
  addressLabel: "Alamat:",
  address:
    "Taman Industri Ekonomi Digital, Distrik Fengze, Quanzhou, Fujian, China",
  copyright:
    "© basedong AI Technology (Quanzhou, Fujian) Co., Ltd. 2026 Hak cipta dilindungi",
  nav: {
    models: "Model",
    pricing: "Harga",
    docs: "Dokumentasi",
    partner: "Mitra",
    cloudMaas: "MaaS cloud",
    tokenFactory: "Operasi komputasi AI",
    reserved: "Instans terpesan",
    privateMaas: "MaaS privat",
    privatePlatform: "Platform model privat",
    privateGateway: "Gateway model privat",
    about: "Tentang",
    company: "Perusahaan",
    brand: "Merek",
    news: "Berita",
    developerTalk: "Cerita developer",
    login: "Masuk",
    console: "Konsol",
    products: "Produk",
  },
  footer: {
    pages: "Halaman",
    products: "Produk",
    legal: "Hukum",
    userAgreement: "Perjanjian pengguna",
    companyIntro: "Perusahaan",
    brandIdea: "Merek",
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
  ko,
  de,
  es,
  "pt-BR": ptBR,
  ar,
  hi,
  id,
};

export function getChromeCopy(locale: string): ChromeCopy {
  return CHROME[locale as TranslatedLocale] ?? zhCN;
}
