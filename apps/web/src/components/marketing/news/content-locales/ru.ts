import type { NewsStrings } from "../content-types";

const categoryLabels = {
  全部: "Все",
  荣誉奖项: "Награды",
  企业动态: "Новости компании",
  模型上新: "Новые модели",
  市场活动: "Мероприятия",
  客户案例: "Кейсы клиентов",
  生态合作: "Партнёрства",
  企业AI实践: "Корпоративный ИИ",
} as const;

const articles = {
  iejarphf9lqgywte36eowzo6: {
    title:
      "Shujia Tech × Suanjia Compute × basedong: совместная эксплуатация вычислений и Token-фабрики",
    excerpt:
      "basedong заключила соглашение о совместной эксплуатации вычислительных мощностей с Shujia Tech и Suanjia Compute (Guizhou).",
  },
  tteguv6arblns7n7wwu60qy5: {
    title: "basedong вошла в список IDC China AI 50",
    excerpt:
      "30 июля IDC опубликовала рейтинг 2026 IDC China AI 50. basedong отмечена за технологии и коммерческое внедрение в инфраструктуре ИИ.",
  },
  yxn60w9116uqgow8qmj2frsl: {
    title: "Чжоу Хунъи и Кай-Фу Ли посетили basedong | WAIC",
    excerpt:
      "С 17 по 20 июля в Шанхае прошла Всемирная конференция по ИИ 2026. basedong принимала посетителей, клиентов и медиа на своём стенде.",
  },
  agd6v0r0omgx1ymzxrj9jagy: {
    title:
      "Yusys Technologies и basedong: стратегическое партнёрство для финансового ИИ",
    excerpt:
      "Yusys Technologies и basedong заключили стратегическое партнёрство, объединяя опыт финансовых сценариев и инфраструктуры ИИ.",
  },
  ct2w1w4jrodh14vwcw96rxyo: {
    title:
      "Отечественные чипы + модели + движок инференса: полностековая практика ИИ крупной авиакомпании",
    excerpt:
      "Развёртывание отечественных LLM на отечественных чипах ставит задачи эффективности, поставки токенов и устойчивой производительности.",
  },
  bapiztk1gu3cqrwju1okix7g: {
    title:
      "basedong участвует в «Jingsuan Token Factory» для вычислительной базы Пекина",
    excerpt:
      "basedong — ключевой соучастник «Jingsuan Token Factory», укрепляющий цифровую вычислительную базу столицы.",
  },
  fdedihyzxgbu7yfcerf2q2lu: {
    title:
      "Shandong Mobile и basedong: стратегическое партнёрство для цифровой экономики",
    excerpt:
      "Shandong Mobile и basedong подписали соглашение о вычислительных сервисах, синергии бизнеса и экосистемном сотрудничестве.",
  },
  jmeqt0sd1q3ciq04g2qd7xfg: {
    title:
      "Guizhou Mobile × basedong: крупные вычислительные кластеры для цифровой индустрии",
    excerpt:
      "basedong и Guizhou Mobile подписали соглашение о глубоком сотрудничестве в интеллектуальных вычислениях.",
  },
  k7r7cjt5fkxyfroe3thsnqtd: {
    title: "basedong запускает Meituan LongCat-2.0",
    excerpt:
      "basedong предлагает LongCat-2.0 от Meituan: 1,6T параметров, ~48B средней активации, диапазон 33B–56B и контекст 1M — первая триллионная модель, обученная и запущенная на 50 000 отечественных ускорителях.",
  },
  wxoo1kd98f2ydxnnyihzv3x9: {
    title:
      "basedong на AICon: платформа поставки токенов для масштабного Agentic AI",
    excerpt:
      "На AICon 2026 Shanghai basedong представила полную продуктовую матрицу платформы поставки токенов.",
  },
  fbfvrxlms2fgthtxnzggrg7b: {
    title: "basedong в Top 20 «Foresee 2026» лучших AI-продуктов",
    excerpt:
      "22 января basedong вошла в Top 20 компаний с выдающимися AI-продуктами за инновации в инфраструктуре ИИ.",
  },
  knjxu87y68uuvjzeqp5r5uqq: {
    title: "basedong в списке CYZONE 100 Future Unicorns 2025",
    excerpt:
      "15 января basedong была отобрана из 300+ заявок за инновации и потенциал роста в инфраструктуре ИИ.",
  },
  e7zpqgllgfn1mrfq1yw6lm5s: {
    title: "basedong — лауреат InfoQ 2025 AI Infrastructure Excellence",
    excerpt: "basedong получила премию InfoQ 2025 за инфраструктуру ИИ.",
  },
  hjliq094e4jvw6scke6f0iwz: {
    title: "Корпоративный MaaS basedong — эталонный кейс AIIA",
    excerpt:
      "Корпоративная платформа MaaS basedong — один из восьми эталонных кейсов сервисов моделей года наряду с Huawei и Ant Group.",
  },
  dsjglm4diutrngvh2weypzhv: {
    title: "basedong в списке 50 Smart Companies MIT Technology Review",
    excerpt:
      "12 сентября на EmTech China 2025 basedong вошла в ежегодный список MIT Technology Review вместе с Alibaba, Huawei и DeepSeek.",
  },
  wwd368rw8xud0sprc7eu1029: {
    title: "basedong в рейтинге AI MVP TOP 50 2025",
    excerpt:
      "basedong вошла в AI MVP TOP 50 2025 за технологическое превосходство и непрерывные инновации.",
  },
  hu6j13i7aokzbp02bty3k6zk: {
    title:
      "basedong — эталонное предприятие цифровых базовых технологий Пекина",
    excerpt:
      "basedong включена в отчёт 2024 о эталонных предприятиях цифровой экономики Пекина.",
  },
  qy96pn32h4p6px88wpllfftk: {
    title: "basedong в рейтинге AI Cloud 100 China 2025",
    excerpt:
      "basedong вошла в AI Cloud 100 China 2025 от Jingya Capital за GenAI-инфраструктуру и коммерческий рост.",
  },
} as const;

export const ru: NewsStrings = {
  pageTitle: "Новости компании",
  heroLogoAlt: "Последние новости",
  categoryFilterTitle: "Категория",
  featuredReadMore: "Подробнее",
  categoryLabels,
  featured: {
    title: "basedong запускает высокоскоростной Kimi K2.7 Code",
    excerpt:
      "«Меньше думать, лучше писать»: видит и делает — понимает рабочие процессы по записи экрана и выполняет кросс-файловую разработку за один проход.",
  },
  articles,
};
