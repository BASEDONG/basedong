import type { HomeStrings } from "../content-types";

export const ko: HomeStrings = {
  heroSlides: [
    {
      tabLabel: "GPT-5.6",
      eyebrow: "basedong 정식 출시",
      title: "GPT-5.6",
      description:
        "GPT-5.6 모델 패밀리 — Sol(플래그십), Terra(균형), Luna(고속) — 는 코딩, 에이전트, 지식 업무, 과학적 추론 등에서 최첨단 성능을 제공합니다. 지금 플랫폼에서 이용할 수 있습니다.",
      ctaLabel: "지금 체험하기",
      logoAlt: "GPT-5.6",
    },
    {
      tabLabel: "Opus 5",
      eyebrow: "Anthropic 최신 플래그십",
      title: "Opus 5",
      description:
        "Opus 5는 코딩, 에이전트, 전문 글쓰기를 대폭 강화했습니다. 고복잡도·장기 실행 작업에 더 정확하고 신뢰할 수 있는 결과를 제공합니다.",
      ctaLabel: "지금 체험하기",
      logoAlt: "Opus 5",
    },
    {
      tabLabel: "Auto",
      eyebrow: "기간 한정 무료",
      title: "Auto 모델",
      description:
        "지능형 라우팅이 최적 모델을 선택하고 속도·비용·품질의 균형을 동적으로 맞춥니다. 기간 한정 무료 체험으로 대형 모델을 손쉽게 시작하세요.",
      ctaLabel: "지금 체험하기",
      logoAlt: "Auto 모델",
    },
    {
      tabLabel: "배포",
      eyebrow: "엔터프라이즈급",
      title: "대형 모델 서비스 배포",
      description:
        "프라이빗 배포와 클라우드 탄력적 스케일링 — 모델 적응, 추론 가속, 운영 지원으로 미션 크리티컬 워크로드를 안정적으로 운영합니다.",
      ctaLabel: "자세히 보기",
      logoAlt: "대형 모델 서비스 배포",
    },
  ],
  productMatrix: {
    title: "아이디어부터 프로덕션까지 전 과정을 아우르는 제품 체계",
    subtitle: "개발자와 기업을 위한 통합 접근 — AI와 비즈니스를 더 빠르게 연결",
  },
  productCards: [
    {
      title: "온프레미스 프라이빗 배포",
      description:
        "컴플라이언스와 데이터 주권이 필요한 기업을 위해 실전 수준의 프라이빗 구성, 성능 튜닝, 클러스터 배포, 지속 운영을 제공합니다.",
      ctaLabel: "자세히 보기",
    },
    {
      title: "모델 추론 성능 최적화 서비스",
      description:
        "오픈소스 추론 엔진 기반으로 주류 오픈 모델과 자체 모델을 지원합니다. 선정·튜닝부터 프로덕션 운영까지 전 과정을 커버해 추론 효율을 크게 높입니다.",
      ctaLabel: "문의하기",
    },
    {
      title: "무료 Auto 모델",
      description:
        "지능형 라우팅이 속도·비용·품질의 균형을 맞춥니다. 기간 한정 무료 — 대형 모델을 손쉽게 시작하세요.",
      ctaLabel: "지금 체험하기",
    },
    {
      title: "통합 대형 모델 API 서비스",
      description:
        "텍스트, 음성, 이미지, 영상을 하나의 API로 — 사용량 기반 과금으로 팀이 빠르게 기능을 통합하고 제품을 출시할 수 있습니다.",
      ctaLabel: "바로 시작하기",
    },
  ],
  whySection: {
    title: "basedong를 선택하는 이유",
  },
  whyHighlightCards: [
    {
      title: "높은 가성비",
      textBlocks: [
        {
          lines: [[{ text: "전 과정" }, { text: "비용 관리", emphasis: true }]],
        },
        {
          lines: [
            [{ text: "Auto 모델" }, { text: "기간 한정 무료", emphasis: true }],
            [{ text: "지능형 라우팅으로 속도와 비용의 균형" }],
          ],
          className: "mb-8",
        },
      ],
      stats: [
        { prefix: "추론·배포 비용 최대", value: "40%", suffix: "까지 절감" },
        { prefix: "Auto 모델 기간 한정 무료, 도입 비용", value: "제로" },
      ],
      footnotes: [
        [{ text: "사용량 기반 투명 과금, 예측 가능한 지출" }],
        [{ text: "이기종 컴퓨트 분리 — 주류 AI 가속기를 원활하게 스케줄링" }],
        [
          { text: "비용 민감 앱을 위한 안정적이고 예측 가능한" },
          { text: "비용 성능", emphasis: true },
        ],
      ],
    },
    {
      title: "높은 안정성",
      textBlocks: [
        {
          lines: [[{ text: "다중 노드" }, { text: "이중화", emphasis: true }]],
        },
        {
          lines: [
            [{ text: "모니터링·알림·자가 복구", emphasis: true }],
            [{ text: "장기간 안정적인 서비스 운영" }],
          ],
          className: "mb-8",
        },
      ],
      stats: [
        { prefix: "다중 노드 이중화 — 장애 전환", value: "초 단위" },
        { prefix: "엔터프라이즈 기술 지원 즉시 대응,", value: "SLA", suffix: " 충족" },
      ],
      footnotes: [
        [{ text: "고동시성·대량 배치 추론 워크로드에 여유롭게 대응" }],
        [{ text: "수많은 개발자가 검증한 프로덕션 안정성" }],
        [
          { text: "핵심 비즈니스를 위한 안정적이고 예측 가능한" },
          { text: "서비스 성능", emphasis: true },
        ],
      ],
    },
  ],
  featureCards: [
    {
      title: "높은 확장성",
      description:
        "탄력적 스케일링으로 트래픽 변동과 복잡한 워크로드에 대응합니다. 맞춤 모델을 빠르게 출시하고 유연한 아키텍처로 대규모 배포를 지원합니다. 하이브리드·멀티클라우드 준비 완료.",
    },
    {
      title: "높은 보안성",
      description:
        "BYOC 옵션 — 데이터는 고객 영역에 유지됩니다. 컴퓨트·네트워크·스토리지 3계층 격리와 업계 규정 준수로 엔터프라이즈 보안·감사 요건을 충족합니다.",
    },
    {
      title: "높은 지능",
      description:
        "최첨단 LLM과 오디오·영상 등 멀티모달 API를 한곳에서. 비즈니스 성장에 맞춰 확장하고 사용량·비용을 명확한 분석으로 추적합니다.",
    },
    {
      title: "높은 가용성",
      description:
        "전 세계 개발자가 프로덕션에서 검증했습니다. 모니터링·알림·자가 복구와 SLA가 중요한 워크로드를 위한 엔터프라이즈 지원.",
    },
  ],
  industrySection: {
    title: "다양한 산업 시나리오에 맞춘 유연한 솔루션",
  },
  industryItems: [
    {
      title: "AI 하드웨어",
      description:
        "AI 모바일 단말, 추론 일체형, 임베디드 인텔리전스 등 — 엣지-클라우드 지연을 줄이고 응답성을 높입니다.",
    },
    {
      title: "정부",
      description:
        "스마트 정부, 공공 안전, 산업 업그레이드 등을 위한 고처리량·저지연 추론 — 이기종 컴퓨트에서 비용 효율적인 생성형 AI, 벤더 종속 없음.",
    },
    {
      title: "AI 컴퓨트 센터",
      description:
        "스케줄링과 자원 할당을 최적화해 모델 학습과 대규모 추론 서비스 배포를 가속합니다.",
    },
    {
      title: "교육",
      description:
        "지능형 교육 어시스턴트 — 다중 모델 협업으로 맞춤형 학습 경로, 즉시 Q&A, 교사와 학생 모두를 위한 더 나은 결과.",
    },
    {
      title: "인터넷",
      description:
        "플랫폼을 위한 콘텐츠 생성과 개인화 — 핫 스왑 모델, 추론 가속, GPU 활용률 향상, UX와 운영 효율 개선.",
    },
  ],
  partners: {
    title: "고객과 생태계 파트너",
    ctaPrimaryDesc: "몇 분 만에 모델 API 개통",
    ctaPrimaryButton: "체험 시작",
    ctaSecondaryDesc: "맞춤형 솔루션이 필요하신가요? 문의하기",
    ctaSecondaryButton: "요청 제출",
  },
  heroCarousel: {
    ariaLabel: "홈페이지 하이라이트",
    switchTabLabel: (tabLabel) => `${tabLabel}(으)로 전환`,
  },
};
