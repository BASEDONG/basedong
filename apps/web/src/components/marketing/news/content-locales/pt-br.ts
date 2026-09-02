import type { NewsStrings } from "../content-types";

const categoryLabels = {
  全部: "Todos",
  荣誉奖项: "Prêmios e honras",
  企业动态: "Notícias da empresa",
  模型上新: "Novos modelos",
  市场活动: "Eventos",
  客户案例: "Histórias de clientes",
  生态合作: "Parcerias do ecossistema",
  企业AI实践: "IA empresarial na prática",
} as const;

const articles = {
  iejarphf9lqgywte36eowzo6: {
    title:
      "Shujia Tech × Suanjia Compute × basedong: Operações conjuntas de compute para construir fábricas Token",
    excerpt:
      "O basedong firmou parceria de operações conjuntas de compute com Guizhou Shujia Technology Co., Ltd. (Shujia Tech) e Guizhou Suanjia Computing Services Co., Ltd. (Suanjia Compute).",
  },
  tteguv6arblns7n7wwu60qy5: {
    title: "basedong na lista IDC China AI 50",
    excerpt:
      "Em 30 de julho, a IDC publicou a lista 2026 IDC China AI 50. O basedong foi selecionado por força técnica e tração comercial em infraestrutura de IA.",
  },
  yxn60w9116uqgow8qmj2frsl: {
    title: "Zhou Hongyi e Kai-Fu Lee visitam o basedong | Destaques da WAIC",
    excerpt:
      "De 17 a 20 de julho, a Conferência Mundial de Inteligência Artificial 2026 ocorreu em Xangai. O basedong teve seu próprio estande e recebeu visitantes, clientes e mídia no local.",
  },
  agd6v0r0omgx1ymzxrj9jagy: {
    title:
      "Yusys Technologies e basedong formam parceria estratégica para acelerar IA financeira",
    excerpt:
      "Yusys Technologies e basedong assinaram parceria estratégica. As partes combinarão experiência em cenários financeiros e infraestrutura de IA para entregar soluções integradas de IA a instituições financeiras.",
  },
  ct2w1w4jrodh14vwcw96rxyo: {
    title:
      "Chips nacionais + modelos nacionais + engine de inferência nacional: prática de compute IA full-stack de grande grupo aéreo estatal",
    excerpt:
      "Implantar modelos grandes nacionais de forma privada em chips nacionais levanta desafios para infraestrutura de IA empresarial: como melhorar utilização e oferta de Token mantendo sistemas de alto desempenho e evolutivos?",
  },
  bapiztk1gu3cqrwju1okix7g: {
    title:
      "basedong entra na «Jingsuan Token Factory» de Pequim para reforçar base de compute da capital",
    excerpt:
      "O basedong é co-construtor central da «Jingsuan Token Factory» de Pequim, ajudando a reforçar a base de compute digital da capital e impulsionar sua economia digital.",
  },
  fdedihyzxgbu7yfcerf2q2lu: {
    title:
      "Shandong Mobile e basedong assinam parceria estratégica para avançar economia digital",
    excerpt:
      "China Mobile Communications Group Shandong Co., Ltd. (Shandong Mobile) e basedong assinaram acordo de cooperação estratégica cobrindo serviços de compute, colaboração de negócios e co-construção do ecossistema para Digital Shandong.",
  },
  jmeqt0sd1q3ciq04g2qd7xfg: {
    title:
      "Guizhou Mobile × basedong: co-construção profunda de grandes clusters de compute para acelerar indústria digital",
    excerpt:
      "basedong e China Mobile Communications Group Guizhou Co., Ltd. (Guizhou Mobile) assinaram acordo de cooperação profunda em compute inteligente, lançando colaboração estratégica integral para construir serviços de compute eficientes e confiáveis.",
  },
  k7r7cjt5fkxyfroe3thsnqtd: {
    title: "basedong lança Meituan LongCat-2.0",
    excerpt:
      "O basedong agora oferece o LongCat-2.0 recém-lançado pela Meituan — 1,6T parâmetros totais, ~48B ativação média, faixa dinâmica 33B–56B e contexto nativo de 1M. É o primeiro modelo de trilhões de parâmetros treinado e inferido end-to-end em 50.000 placas aceleradoras nacionais.",
  },
  wxoo1kd98f2ydxnnyihzv3x9: {
    title:
      "basedong na AICon: plataforma de fornecimento Token impulsiona adoção escalada de Agentic AI",
    excerpt:
      "Na AICon 2026 Xangai, o basedong exibiu sua matriz completa de produtos de plataforma de fornecimento Token e manteve discussões profundas com developers e participantes empresariais.",
  },
  fbfvrxlms2fgthtxnzggrg7b: {
    title:
      "basedong na lista Top 20 de excelência em produtos de IA «Foresee 2026»",
    excerpt:
      "Em 22 de janeiro, a lista «Foresee 2026» foi anunciada. O basedong foi reconhecido entre as Top 20 empresas de excelência em produtos de IA por inovação sustentada e comercialização confiável em infraestrutura de IA.",
  },
  knjxu87y68uuvjzeqp5r5uqq: {
    title: "basedong na lista CYZONE 2025 100 Future Unicorns",
    excerpt:
      "Na 18ª conferência anual da CYZONE em 15 de janeiro, o basedong foi selecionado entre mais de 300 candidatos por inovação e alto potencial de crescimento em infraestrutura de IA.",
  },
  e7zpqgllgfn1mrfq1yw6lm5s: {
    title: "basedong vence InfoQ 2025 AI Infrastructure Excellence Award",
    excerpt: "O basedong recebeu o AI Infrastructure Excellence Award 2025.",
  },
  hjliq094e4jvw6scke6f0iwz: {
    title: "MaaS empresarial do basedong honrado como caso benchmark AIIA de serviço de modelos",
    excerpt:
      "A plataforma MaaS empresarial do basedong foi um dos oito casos benchmark anuais na categoria model-as-a-service (MaaS), ao lado de Huawei, Ant Group e outros líderes.",
  },
  dsjglm4diutrngvh2weypzhv: {
    title:
      "basedong na lista 50 Smart Companies da MIT Technology Review",
    excerpt:
      "Em 12 de setembro no EmTech China 2025, o basedong entrou para Alibaba, Huawei, DeepSeek e outros na lista anual 50 Smart Companies da MIT Technology Review.",
  },
  wwd368rw8xud0sprc7eu1029: {
    title: "basedong na lista 2025 AI MVP TOP 50",
    excerpt:
      "O basedong foi reconhecido na lista AI Product Rankings 2025 AI MVP TOP 50 por excelência técnica e inovação sustentada.",
  },
  hu6j13i7aokzbp02bty3k6zk: {
    title:
      "basedong nomeada empresa benchmark de tecnologia digital fundamental de Pequim",
    excerpt:
      "O basedong foi selecionado no 2024 Beijing Digital Economy Benchmark Enterprise Evaluation Report como empresa benchmark de tecnologia digital fundamental.",
  },
  qy96pn32h4p6px88wpllfftk: {
    title: "basedong na lista 2025 AI Cloud 100 China",
    excerpt:
      "O basedong foi nomeado na lista 2025 AI Cloud 100 China da Jingya Capital por tecnologia líder em infraestrutura cloud GenAI e desempenho comercial crescente.",
  },
} as const;

export const ptBR: NewsStrings = {
  pageTitle: "Notícias da empresa",
  heroLogoAlt: "Últimas notícias",
  categoryFilterTitle: "Categoria",
  featuredReadMore: "Leia mais",
  categoryLabels,
  featured: {
    title: "basedong lança Kimi K2.7 Code de alta velocidade",
    excerpt:
      "«Pense menos, escreva melhor»: pode ver e fazer — entender fluxos de trabalho a partir de gravações de tela e completar desenvolvimento de projetos entre arquivos em uma passagem.",
  },
  articles,
};
