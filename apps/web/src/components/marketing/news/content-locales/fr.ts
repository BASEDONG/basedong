import type { NewsStrings } from "../content-types";

const categoryLabels = {
  全部: "Tout",
  荣誉奖项: "Distinctions",
  企业动态: "Actualités",
  模型上新: "Nouveaux modèles",
  市场活动: "Événements",
  客户案例: "Cas clients",
  生态合作: "Partenariats",
  企业AI实践: "IA entreprise",
} as const;

const articles = {
  iejarphf9lqgywte36eowzo6: {
    title:
      "Shujia Tech × Suanjia Compute × basedong : co-exploitation de capacité pour des usines Token",
    excerpt:
      "basedong a conclu un partenariat de co-exploitation de capacité avec Shujia Tech et Suanjia Compute, au Guizhou.",
  },
  tteguv6arblns7n7wwu60qy5: {
    title: "basedong figure dans le classement IDC China AI 50",
    excerpt:
      "Le 30 juillet, IDC a publié le classement 2026 IDC China AI 50. basedong y figure pour sa force technique et sa capacité de déploiement commercial en infrastructure IA.",
  },
  yxn60w9116uqgow8qmj2frsl: {
    title: "Zhou Hongyi et Kai-Fu Lee chez basedong | Retour sur le WAIC",
    excerpt:
      "Du 17 au 20 juillet, la Conférence mondiale sur l’intelligence artificielle 2026 s’est tenue à Shanghai. basedong a accueilli visiteurs, clients et médias sur son stand.",
  },
  agd6v0r0omgx1ymzxrj9jagy: {
    title:
      "Yusys Technologies et basedong s’associent pour accélérer l’IA financière",
    excerpt:
      "Yusys Technologies et basedong ont signé un partenariat stratégique pour combiner leur expertise des scénarios financiers et de l’infrastructure IA.",
  },
  ct2w1w4jrodh14vwcw96rxyo: {
    title:
      "Puce, modèle et moteur d’inférence nationaux : pratique IA full-stack d’un grand groupe aéronautique",
    excerpt:
      "Déployer des grands modèles nationaux sur des puces nationales pose des défis majeurs : efficacité de la capacité, approvisionnement en tokens et performance durable.",
  },
  bapiztk1gu3cqrwju1okix7g: {
    title:
      "basedong rejoint l’usine Token « Jingsuan » pour renforcer la base de calcul de Pékin",
    excerpt:
      "basedong est un co-constructeur clé de l’usine Token « Jingsuan », renforçant la base de calcul numérique de la capitale.",
  },
  fdedihyzxgbu7yfcerf2q2lu: {
    title:
      "Shandong Mobile et basedong signent un partenariat stratégique pour l’économie numérique",
    excerpt:
      "Shandong Mobile et basedong ont signé un accord couvrant services de calcul, synergie métier et co-construction d’écosystème pour le Shandong numérique.",
  },
  jmeqt0sd1q3ciq04g2qd7xfg: {
    title:
      "Guizhou Mobile × basedong : clusters de calcul à grande échelle pour l’industrie numérique",
    excerpt:
      "basedong et Guizhou Mobile ont signé un accord de coopération approfondie en calcul intelligent pour bâtir des services de capacité fiables.",
  },
  k7r7cjt5fkxyfroe3thsnqtd: {
    title: "basedong lance Meituan LongCat-2.0",
    excerpt:
      "basedong propose LongCat-2.0 de Meituan : 1,6T de paramètres, ~48B d’activation moyenne, plage dynamique 33B–56B et contexte natif 1M — premier modèle trillion entraîné et inféré sur 50 000 cartes nationales.",
  },
  wxoo1kd98f2ydxnnyihzv3x9: {
    title:
      "basedong à AICon : la plateforme Token accélère l’IA agentique à l’échelle",
    excerpt:
      "À AICon 2026 Shanghai, basedong a présenté sa matrice produit complète de plateforme d’approvisionnement Token.",
  },
  fbfvrxlms2fgthtxnzggrg7b: {
    title:
      "basedong dans le Top 20 « Foresee 2026 » des produits IA d’excellence",
    excerpt:
      "Le 22 janvier, basedong a été reconnu parmi les 20 entreprises d’excellence en produits IA pour son innovation en infrastructure IA.",
  },
  knjxu87y68uuvjzeqp5r5uqq: {
    title: "basedong dans le classement CYZONE 100 Future Unicorns 2025",
    excerpt:
      "Le 15 janvier, basedong a été sélectionné parmi plus de 300 candidats pour son innovation et son potentiel de croissance en infrastructure IA.",
  },
  e7zpqgllgfn1mrfq1yw6lm5s: {
    title: "basedong remporte le prix InfoQ 2025 Infrastructure IA",
    excerpt: "basedong a reçu le prix d’excellence Infrastructure IA 2025 d’InfoQ.",
  },
  hjliq094e4jvw6scke6f0iwz: {
    title: "Le MaaS entreprise basedong, cas de référence AIIA",
    excerpt:
      "La plateforme MaaS entreprise de basedong figure parmi huit cas de référence annuels de services de modèles, aux côtés de Huawei et Ant Group.",
  },
  dsjglm4diutrngvh2weypzhv: {
    title: "basedong parmi les 50 Smart Companies du MIT Technology Review",
    excerpt:
      "Le 12 septembre à EmTech China 2025, basedong rejoint Alibaba, Huawei, DeepSeek et d’autres sur la liste annuelle du MIT Technology Review.",
  },
  wwd368rw8xud0sprc7eu1029: {
    title: "basedong dans le classement AI MVP TOP 50 2025",
    excerpt:
      "basedong figure dans le classement AI MVP TOP 50 2025 pour son excellence technique et son innovation continue.",
  },
  hu6j13i7aokzbp02bty3k6zk: {
    title:
      "basedong, entreprise de référence en technologies numériques fondamentales à Pékin",
    excerpt:
      "basedong figure dans le rapport 2024 sur les entreprises de référence de l’économie numérique de Pékin.",
  },
  qy96pn32h4p6px88wpllfftk: {
    title: "basedong dans le classement AI Cloud 100 China 2025",
    excerpt:
      "basedong figure dans le classement AI Cloud 100 China 2025 de Jingya Capital pour son infrastructure cloud GenAI et sa croissance commerciale.",
  },
} as const;

export const fr: NewsStrings = {
  pageTitle: "Actualités",
  heroLogoAlt: "Dernières actualités",
  categoryFilterTitle: "Catégorie",
  featuredReadMore: "En savoir plus",
  categoryLabels,
  featured: {
    title: "basedong lance Kimi K2.7 Code haute vitesse",
    excerpt:
      "« Moins réfléchir, mieux écrire » : il voit et agit — comprend les flux depuis des enregistrements d’écran et mène des projets multi-fichiers en une passe.",
  },
  articles,
};
