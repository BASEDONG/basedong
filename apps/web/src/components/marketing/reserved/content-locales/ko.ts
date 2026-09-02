import type { ReservedStrings } from "../content-types";

export const ko: ReservedStrings = {
  pageTitle: "예약 인스턴스 | basedong",
  pageDescription:
    "핵심 워크로드를 위한 용량 확보. 예측 가능한 성능, 대규모 사용 시 더 나은 단위 경제, 엔터프라이즈 SLA.",
  heroLogoAlt: "예약 인스턴스",
  heroTitle: "용량 확보",
  heroTitleAccent: "핵심 워크로드 안정 운영",
  heroSubtitle:
    "예측 가능한 성능 · 대규모 사용 시 더 나은 단위 경제 · 엔터프라이즈 SLA",
  consultCta: "상담 예약",
  whyBadge: "WHY RESERVED",
  whyTitle: "예약 인스턴스를 선택하는 이유",
  whySubtitle:
    "엔터프라이즈 추론 워크로드를 위한 전용 용량, 모델 정확도 및 비용 관리.",
  whyCards: [
    {
      title: "전용 예약 용량",
      items: [
        "핵심 워크로드를 위한 compute를 예약하여 피크 트래픽에서도 예측 가능하게 유지.",
        "공유 풀의 경합을 피하고 미션 크리티컬 앱을 온라인 상태로 유지.",
      ],
    },
    {
      title: "모델 정확도",
      items: [
        "배포 중 추론 스택을 튜닝하여 벤더 기준선과 일치.",
        "드리프트를 허용할 수 없는 시나리오를 위한 안정적인 지능 품질.",
      ],
    },
    {
      title: "규모에서 예측 가능한 비용",
      items: [
        "종량제 청구의 사용량 변동 대신 고정 기간 가격.",
        "안정적인 고부하 워크로드와 장기 예산 수립에 더 나은 경제성.",
      ],
    },
    {
      title: "엔터프라이즈 SLA",
      items: [
        "핵심 추론 작업을 안정적으로 실행하는 서비스 수준.",
        "지속적인 부하와 프로덕션 비즈니스 시스템을 위해 구축.",
      ],
    },
  ],
  pricingBadge: "PRICING & PERFORMANCE",
  pricingTitle: "참고 가격 및 성능",
  pricingSubtitle:
    "예약 인스턴스는 다양한 규격으로 제공됩니다. 모델, 동시성, 규모별로 구성. 아래는 샘플 사양 및 참고 가격입니다.",
  highPerfTitle: "고성능 티어",
  standardTitle: "표준 티어",
  pricingNote1:
    "환산 단가는 위 TPM 기준, 월 30일 및 전체 활용률 50%를 가정하여 산출.",
  pricingNote2:
    "성능 수치는 일반적인 추론 설정 사용: 입력 24k tokens, 출력 1k tokens, 캐시 적중률 80%.",
  pricingFootCtaBefore: "샘플 사양입니다. 더 많은 모델 또는 맞춤 배포는 ",
  pricingFootCtaAfter: ".",
  costReferenceLabel: "비용 참고",
  priceLabel: "가격",
  unitPriceLabel: "환산 단가",
  perfReferenceLabel: "성능 참고",
  deliveryBadge: "DELIVERY & SLA",
  deliveryTitle: "엔터프라이즈 배포 및 운영",
  deliverySteps: [
    {
      title: "빠른 배포",
      description:
        "표준 예약 인스턴스는 1–7 영업일 내 배포되며 기존 시스템에 빠르게 연결.",
    },
    {
      title: "배포 및 튜닝",
      description:
        "배포, 검증, 추론 튜닝을 처리하여 워크로드가 원활하게 착지하도록 지원.",
    },
    {
      title: "탄력적 스케일링",
      description:
        "트래픽 성장 또는 계절적 변화에 따라 용량 확장 또는 사양 조정.",
    },
    {
      title: "SLA 보장",
      description:
        "장기 실행 엔터프라이즈 워크로드를 위한 명확한 서비스 수준 및 운영 보호.",
    },
  ],
  ctaBadge: "맞춤 배포 가능",
  ctaTitle: "전용 용량\n성장을 위해",
  ctaBody:
    "더 많은 예약 배포 옵션을 지원합니다. 팀이 워크로드에 맞게 사양, 롤아웃, 가격을 맞춤 설정합니다.",
  ctaCardTitle: "예약 인스턴스 상세 정보 받기",
  ctaCardBody: "사양, 배포 옵션, 가격을 위한 상담 예약",
  ctaButton: "문의하기",
  highPerfModels: [
    {
      description:
        "엔터프라이즈 Agent, 다단계 계획, 소프트웨어 자동화, 장문 문서 분석, 코드 생성.",
      price: "¥ 772,200 / 그룹 / 월",
      unitPrice: "¥ 3.575 / M tokens",
      tpm: "1000만",
    },
    {
      description:
        "멀티모달 Agent, 비전 이해, 디자인-to-code, 복잡한 작업 자동화.",
      price: "¥ 772,200 / 그룹 / 월",
      unitPrice: "¥ 8.938 / M tokens",
      tpm: "400만",
    },
    {
      description:
        "장문 문서 및 지식베이스 분석, 지원 봇, 콘텐츠 생성, 워크플로 자동화.",
      price: "¥ 386,100 / 그룹 / 월",
      unitPrice: "¥ 3.575 / M tokens",
      tpm: "500만",
    },
    {
      description:
        "복잡한 추론, 코드 지원, 도구 사용 Agent, 분석, 자동화 워크플로.",
      price: "¥ 772,200 / 그룹 / 월",
      unitPrice: "¥ 2.86 / M tokens",
      tpm: "1250만",
    },
  ],
  standardModels: [
    {
      description:
        "멀티모달 Agent, 비전 이해, 디자인-to-code, 복잡한 작업 자동화.",
      price: "¥ 486,000 / 그룹 / 월",
      unitPrice: "¥ 4.25 / M tokens",
      tpm: "530만",
    },
    {
      description:
        "장문 문서 및 지식베이스 분석, 지원 봇, 콘텐츠 생성, 워크플로 자동화.",
      price: "¥ 486,000 / 그룹 / 월",
      unitPrice: "¥ 2.50 / M tokens",
      tpm: "900만",
    },
    {
      description:
        "복잡한 추론, 코드 지원, 도구 사용 Agent, 분석, 자동화 워크플로.",
      price: "¥ 486,000 / 그룹 / 월",
      unitPrice: "¥ 2.08 / M tokens",
      tpm: "1080만",
    },
  ],
};
