import type { NewsStrings } from "../content-types";

const categoryLabels = {
  全部: "Todos",
  荣誉奖项: "Premios y honores",
  企业动态: "Noticias de la empresa",
  模型上新: "Nuevos modelos",
  市场活动: "Eventos",
  客户案例: "Historias de clientes",
  生态合作: "Alianzas del ecosistema",
  企业AI实践: "IA empresarial en la práctica",
} as const;

const articles = {
  iejarphf9lqgywte36eowzo6: {
    title:
      "Shujia Tech × Suanjia Compute × basedong: Operaciones conjuntas de cómputo para construir fábricas Token",
    excerpt:
      "basedong ha firmado una alianza de operaciones conjuntas de cómputo con Guizhou Shujia Technology Co., Ltd. (Shujia Tech) y Guizhou Suanjia Computing Services Co., Ltd. (Suanjia Compute).",
  },
  tteguv6arblns7n7wwu60qy5: {
    title: "basedong incluido en la lista IDC China AI 50",
    excerpt:
      "El 30 de julio, IDC publicó la lista 2026 IDC China AI 50. basedong fue seleccionado por su fortaleza técnica y tracción comercial en infraestructura de IA.",
  },
  yxn60w9116uqgow8qmj2frsl: {
    title: "Zhou Hongyi y Kai-Fu Lee visitan basedong | Destacados de WAIC",
    excerpt:
      "Del 17 al 20 de julio tuvo lugar en Shanghái la Conferencia Mundial de Inteligencia Artificial 2026. basedong tuvo su propio stand y recibió visitantes, clientes y medios in situ.",
  },
  agd6v0r0omgx1ymzxrj9jagy: {
    title:
      "Yusys Technologies y basedong forman alianza estratégica para acelerar la IA financiera",
    excerpt:
      "Yusys Technologies y basedong han firmado una alianza estratégica. Ambas partes combinarán experiencia en escenarios financieros e infraestructura de IA para ofrecer soluciones integradas de IA a instituciones financieras.",
  },
  ct2w1w4jrodh14vwcw96rxyo: {
    title:
      "Chips nacionales + modelos nacionales + motor de inferencia nacional: práctica de cómputo IA full-stack de un gran grupo aeronáutico estatal",
    excerpt:
      "Desplegar modelos grandes nacionales de forma privada en chips nacionales plantea retos para la infraestructura de IA empresarial: ¿cómo mejorar utilización y suministro de Token manteniendo sistemas de alto rendimiento y evolutivos?",
  },
  bapiztk1gu3cqrwju1okix7g: {
    title:
      "basedong se une a la «Jingsuan Token Factory» de Pekín para reforzar la base de cómputo de la capital",
    excerpt:
      "basedong es co-constructor central de la «Jingsuan Token Factory» de Pekín, ayudando a reforzar la base de cómputo digital de la capital e impulsar su economía digital.",
  },
  fdedihyzxgbu7yfcerf2q2lu: {
    title:
      "Shandong Mobile y basedong firman alianza estratégica para impulsar la economía digital",
    excerpt:
      "China Mobile Communications Group Shandong Co., Ltd. (Shandong Mobile) y basedong firmaron un acuerdo de cooperación estratégica que cubre servicios de cómputo, colaboración empresarial y co-construcción del ecosistema para Digital Shandong.",
  },
  jmeqt0sd1q3ciq04g2qd7xfg: {
    title:
      "Guizhou Mobile × basedong: co-construcción profunda de grandes clústeres de cómputo para acelerar la industria digital",
    excerpt:
      "basedong y China Mobile Communications Group Guizhou Co., Ltd. (Guizhou Mobile) firmaron un acuerdo de cooperación profunda en cómputo inteligente, lanzando colaboración estratégica integral para construir servicios de cómputo eficientes y fiables.",
  },
  k7r7cjt5fkxyfroe3thsnqtd: {
    title: "basedong lanza Meituan LongCat-2.0",
    excerpt:
      "basedong ya ofrece LongCat-2.0 recién publicado por Meituan — 1,6T parámetros totales, ~48B activación media, rango dinámico 33B–56B y contexto nativo de 1M. Es el primer modelo de billones de parámetros entrenado e inferido end-to-end en 50.000 tarjetas aceleradoras nacionales.",
  },
  wxoo1kd98f2ydxnnyihzv3x9: {
    title:
      "basedong en AICon: la plataforma de suministro Token impulsa la adopción escalada de Agentic AI",
    excerpt:
      "En AICon 2026 Shanghái, basedong mostró su matriz completa de productos de plataforma de suministro Token y mantuvo conversaciones profundas con desarrolladores y asistentes empresariales.",
  },
  fbfvrxlms2fgthtxnzggrg7b: {
    title:
      "basedong incluido en la lista Top 20 de excelencia en productos de IA «Foresee 2026»",
    excerpt:
      "El 22 de enero se anunció la lista «Foresee 2026». basedong fue reconocido entre las Top 20 empresas de excelencia en productos de IA por innovación sostenida y comercialización fiable en infraestructura de IA.",
  },
  knjxu87y68uuvjzeqp5r5uqq: {
    title: "basedong incluido en la lista CYZONE 2025 100 Future Unicorns",
    excerpt:
      "En la 18.ª conferencia anual de CYZONE el 15 de enero, basedong fue seleccionado entre más de 300 solicitantes por innovación y alto potencial de crecimiento en infraestructura de IA.",
  },
  e7zpqgllgfn1mrfq1yw6lm5s: {
    title: "basedong gana el InfoQ 2025 AI Infrastructure Excellence Award",
    excerpt: "basedong recibió el AI Infrastructure Excellence Award 2025.",
  },
  hjliq094e4jvw6scke6f0iwz: {
    title: "MaaS empresarial de basedong honrado como caso benchmark AIIA de servicio de modelos",
    excerpt:
      "La plataforma MaaS empresarial de basedong fue uno de ocho casos benchmark anuales en la categoría model-as-a-service (MaaS), junto a Huawei, Ant Group y otros líderes.",
  },
  dsjglm4diutrngvh2weypzhv: {
    title:
      "basedong incluido en las 50 Smart Companies de MIT Technology Review",
    excerpt:
      "El 12 de septiembre en EmTech China 2025, basedong se unió a Alibaba, Huawei, DeepSeek y otros en la lista anual 50 Smart Companies de MIT Technology Review.",
  },
  wwd368rw8xud0sprc7eu1029: {
    title: "basedong en la lista 2025 AI MVP TOP 50",
    excerpt:
      "basedong fue reconocido en la lista AI Product Rankings 2025 AI MVP TOP 50 por excelencia técnica e innovación sostenida.",
  },
  hu6j13i7aokzbp02bty3k6zk: {
    title:
      "basedong nombrada empresa benchmark de tecnología digital fundamental de Pekín",
    excerpt:
      "basedong fue seleccionada en el 2024 Beijing Digital Economy Benchmark Enterprise Evaluation Report como empresa benchmark de tecnología digital fundamental.",
  },
  qy96pn32h4p6px88wpllfftk: {
    title: "basedong en la lista 2025 AI Cloud 100 China",
    excerpt:
      "basedong fue incluida en la lista 2025 AI Cloud 100 China de Jingya Capital por tecnología líder en infraestructura cloud GenAI y creciente rendimiento comercial.",
  },
} as const;

export const es: NewsStrings = {
  pageTitle: "Noticias de la empresa",
  heroLogoAlt: "Últimas noticias",
  categoryFilterTitle: "Categoría",
  featuredReadMore: "Leer más",
  categoryLabels,
  featured: {
    title: "basedong lanza Kimi K2.7 Code de alta velocidad",
    excerpt:
      "«Piensa menos, escribe mejor»: puede ver y hacer — entender flujos de trabajo desde grabaciones de pantalla y completar desarrollo de proyectos entre archivos en un solo paso.",
  },
  articles,
};
