import type { NewsStrings } from "../content-types";

const categoryLabels = {
  全部: "전체",
  荣誉奖项: "수상 및 영예",
  企业动态: "기업 소식",
  模型上新: "신규 모델",
  市场活动: "행사",
  客户案例: "고객 사례",
  生态合作: "생태계 파트너십",
  企业AI实践: "엔터프라이즈 AI 실천",
} as const;

const articles = {
  iejarphf9lqgywte36eowzo6: {
    title:
      "Shujia Tech × Suanjia Compute × basedong: Token 팩토리 구축을 위한 컴퓨팅 공동 운영",
    excerpt:
      "basedong은 Guizhou Shujia Technology Co., Ltd.(Shujia Tech) 및 Guizhou Suanjia Computing Services Co., Ltd.(Suanjia Compute)와 컴퓨팅 공동 운영 파트너십을 체결했습니다.",
  },
  tteguv6arblns7n7wwu60qy5: {
    title: "basedong, IDC China AI 50 리스트 선정",
    excerpt:
      "7월 30일 IDC가 2026 IDC China AI 50 리스트를 발표했습니다. basedong은 AI 인프라 분야의 기술력과 상용화 역량으로 선정되었습니다.",
  },
  yxn60w9116uqgow8qmj2frsl: {
    title: "Zhou Hongyi와 Kai-Fu Lee, basedong 방문 | WAIC 하이라이트",
    excerpt:
      "7월 17–20일 상하이에서 2026 세계 인공지능 대회가 열렸습니다. basedong은 자체 부스를 운영하며 참관객, 고객, 미디어와 현장에서 만났습니다.",
  },
  agd6v0r0omgx1ymzxrj9jagy: {
    title:
      "Yusys Technologies와 basedong, 금융 AI 가속을 위한 전략적 파트너십",
    excerpt:
      "Yusys Technologies와 basedong이 전략적 파트너십을 체결했습니다. 양측은 금융 시나리오와 AI 인프라 분야의 깊은 경험을 결합하여 금융 기관을 위한 통합 AI 솔루션을 제공합니다.",
  },
  ct2w1w4jrodh14vwcw96rxyo: {
    title:
      "국산 칩 + 국산 모델 + 국산 추론 엔진: 대형 국유 항공 그룹의 풀스택 AI 컴퓨팅 실천",
    excerpt:
      "국산 칩에 국산 대규모 모델을 프라이빗 배포하면 기업 AI 인프라에 어려운 과제가 생깁니다: 활용률과 Token 공급을 높이면서 시스템을 고성능·진화 가능하게 유지하려면?",
  },
  bapiztk1gu3cqrwju1okix7g: {
    title:
      "basedong, 베이징 'Jingsuan Token Factory' 참여로 수도 컴퓨팅 기반 강화",
    excerpt:
      "basedong은 베이징 'Jingsuan Token Factory'의 핵심 공동 구축 파트너로, 수도의 디지털 컴퓨팅 기반을 강화하고 디지털 경제에 새 동력을 불어넣습니다.",
  },
  fdedihyzxgbu7yfcerf2q2lu: {
    title:
      "Shandong Mobile과 basedong, 디지털 경제 발전을 위한 전략적 파트너십",
    excerpt:
      "China Mobile Communications Group Shandong Co., Ltd.(Shandong Mobile)와 basedong이 전략적 협력 협정을 체결했습니다. 컴퓨팅 서비스, 비즈니스 협력, 생태계 공동 구축을 포괄합니다.",
  },
  jmeqt0sd1q3ciq04g2qd7xfg: {
    title:
      "Guizhou Mobile × basedong: 대형 컴퓨팅 클러스터 심층 공동 구축으로 산업 디지털화 가속",
    excerpt:
      "basedong과 China Mobile Communications Group Guizhou Co., Ltd.(Guizhou Mobile)가 지능형 컴퓨팅 심층 협력 협정을 체결하여 효율적이고 신뢰할 수 있는 컴퓨팅 서비스 구축에 착수했습니다.",
  },
  k7r7cjt5fkxyfroe3thsnqtd: {
    title: "basedong, Meituan LongCat-2.0 출시",
    excerpt:
      "basedong은 Meituan이 오늘 발표한 LongCat-2.0을 제공합니다 — 총 1.6T 파라미터, 평균 활성화 ~48B, 동적 범위 33B–56B, 네이티브 1M 컨텍스트. 5만 장 국산 가속기 카드에서 end-to-end 학습·추론한 최초의 조 파라미터 모델입니다.",
  },
  wxoo1kd98f2ydxnnyihzv3x9: {
    title:
      "basedong AICon 참가: Token 공급 플랫폼이 Agentic AI 대규모 도입 견인",
    excerpt:
      "AICon 2026 상하이에서 basedong은 전체 Token 공급 플랫폼 제품 매트릭스를 선보이고 개발자 및 기업 참가자와 심층 논의를 진행했습니다.",
  },
  fbfvrxlms2fgthtxnzggrg7b: {
    title:
      "basedong, 'Foresee 2026' AI 제품 우수 기업 TOP 20 선정",
    excerpt:
      "1월 22일 'Foresee 2026' 리스트가 발표되었습니다. basedong은 AI 인프라 분야의 지속적 혁신과 신뢰할 수 있는 상용화 역량으로 TOP 20 AI 제품 우수 기업으로 인정받았습니다.",
  },
  knjxu87y68uuvjzeqp5r5uqq: {
    title: "basedong, CYZONE 2025 100 Future Unicorns 리스트 선정",
    excerpt:
      "1월 15일 CYZONE 제18회 연례 컨퍼런스에서 basedong은 300개 이상 지원 기업 중 AI 인프라 혁신과 고성장 잠재력으로 선정되었습니다.",
  },
  e7zpqgllgfn1mrfq1yw6lm5s: {
    title: "basedong, InfoQ 2025 AI Infrastructure Excellence Award 수상",
    excerpt: "basedong이 2025 AI Infrastructure Excellence Award를 수상했습니다.",
  },
  hjliq094e4jvw6scke6f0iwz: {
    title: "basedong 엔터프라이즈 MaaS, AIIA 모델 서비스 벤치마크 케이스 수상",
    excerpt:
      "basedong의 엔터프라이즈 MaaS 플랫폼은 Huawei, Ant Group 등과 함께 연간 model-as-a-service(MaaS) 벤치마크 8개 케이스 중 하나로 선정되었습니다.",
  },
  dsjglm4diutrngvh2weypzhv: {
    title:
      "basedong, MIT Technology Review 50 Smart Companies 선정",
    excerpt:
      "9월 12일 EmTech China 2025에서 basedong은 Alibaba, Huawei, DeepSeek 등과 함께 MIT Technology Review 연간 50 Smart Companies 리스트에 올랐습니다.",
  },
  wwd368rw8xud0sprc7eu1029: {
    title: "basedong, 2025 AI MVP TOP 50 리스트 선정",
    excerpt:
      "basedong은 기술 우수성과 지속적 혁신으로 AI Product Rankings 2025 AI MVP TOP 50 리스트에 선정되었습니다.",
  },
  hu6j13i7aokzbp02bty3k6zk: {
    title:
      "basedong, 베이징 디지털 기초 기술 벤치마크 기업 선정",
    excerpt:
      "basedong은 2024 Beijing Digital Economy Benchmark Enterprise Evaluation Report에서 디지털 기초 기술 벤치마크 기업으로 선정되었습니다.",
  },
  qy96pn32h4p6px88wpllfftk: {
    title: "basedong, 2025 AI Cloud 100 China 리스트 선정",
    excerpt:
      "basedong은 GenAI 클라우드 인프라 기술 선도와 성장하는 상용화 실적으로 Jingya Capital의 2025 AI Cloud 100 China 리스트에 이름을 올렸습니다.",
  },
} as const;

export const ko: NewsStrings = {
  pageTitle: "기업 소식",
  heroLogoAlt: "최신 소식",
  categoryFilterTitle: "카테고리",
  featuredReadMore: "더 보기",
  categoryLabels,
  featured: {
    title: "basedong, 고속 Kimi K2.7 Code 출시",
    excerpt:
      "「덜 생각하고, 더 잘 쓰기」: 화면 녹화의 워크플로를 이해하고 크로스 파일 프로젝트 개발을 한 번에 완료할 수 있습니다.",
  },
  articles,
};
