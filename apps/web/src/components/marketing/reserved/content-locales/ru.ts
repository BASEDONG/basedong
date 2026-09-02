import type { ReservedStrings } from "../content-types";

export const ru: ReservedStrings = {
  pageTitle: "Зарезервированные инстансы | basedong",
  pageDescription:
    "Фиксированная мощность для критичных нагрузок. Предсказуемая производительность, лучшая экономика при высокой нагрузке, enterprise SLA.",
  heroLogoAlt: "Зарезервированные инстансы",
  heroTitle: "Фиксированная мощность",
  heroTitleAccent: "Для критичных нагрузок",
  heroSubtitle:
    "Предсказуемая производительность · Лучшая экономика при высокой нагрузке · SLA для enterprise",
  consultCta: "Записаться на консультацию",
  whyBadge: "WHY RESERVED",
  whyTitle: "Зачем резервировать инстансы",
  whySubtitle:
    "Выделенная мощность, точность моделей и контроль затрат для корпоративного inference.",
  whyCards: [
    {
      title: "Выделенная резервная мощность",
      items: [
        "Резервируйте вычисления для ключевых нагрузок — пики не сбивают SLA.",
        "Без конкуренции в общих пулах — критичные сервисы остаются онлайн.",
      ],
    },
    {
      title: "Точность моделей",
      items: [
        "При развёртывании наш inference-стек настраивается под эталон вендора.",
        "Стабильное качество для сценариев, где недопустим дрейф.",
      ],
    },
    {
      title: "Предсказуемые затраты",
      items: [
        "Фиксированный период оплаты вместо скачков pay-as-you-go.",
        "Лучшая экономика при стабильной высокой нагрузке и долгосрочном бюджете.",
      ],
    },
    {
      title: "Enterprise SLA",
      items: [
        "Уровни сервиса для надёжной работы критичных inference-задач.",
        "Для постоянной нагрузки и production-систем.",
      ],
    },
  ],
  pricingBadge: "PRICING & PERFORMANCE",
  pricingTitle: "Ориентиры по цене и производительности",
  pricingSubtitle:
    "Несколько размеров резервных инстансов под модель, параллелизм и масштаб. Ниже — примеры specs и цен.",
  highPerfTitle: "Высокопроизводительный tier",
  standardTitle: "Стандартный tier",
  pricingNote1:
    "Эффективная цена за token рассчитана из TPM выше при 30 днях/мес и 50% общей утилизации.",
  pricingNote2:
    "Производительность при типичных параметрах: 24k input tokens, 1k output, cache hit 80%.",
  pricingFootCtaBefore:
    "Это примеры specs. Для других моделей или custom-развёртывания ",
  pricingFootCtaAfter: ".",
  costReferenceLabel: "Ориентир по стоимости",
  priceLabel: "Цена",
  unitPriceLabel: "Эффективная цена",
  perfReferenceLabel: "Ориентир по производительности",
  deliveryBadge: "DELIVERY & SLA",
  deliveryTitle: "Enterprise-доставка и эксплуатация",
  deliverySteps: [
    {
      title: "Быстрое развёртывание",
      description:
        "Стандартные инстансы — за 1–7 рабочих дней, быстрая интеграция в существующие системы.",
    },
    {
      title: "Развёртывание и tuning",
      description:
        "Мы берём на себя deploy, валидацию и настройку inference для плавного запуска.",
    },
    {
      title: "Эластичное масштабирование",
      description:
        "Расширение мощности или смена specs по мере роста или сезонных колебаний.",
    },
    {
      title: "SLA-гарантии",
      description:
        "Чёткие уровни сервиса и операционные гарантии для длительных нагрузок.",
    },
  ],
  ctaBadge: "Custom-развёртывания",
  ctaTitle: "Выделенная мощность\nдля роста",
  ctaBody:
    "Больше вариантов резервного deploy. Команда подберёт specs, rollout и цены под вашу нагрузку.",
  ctaCardTitle: "Подробнее о резервных инстансах",
  ctaCardBody: "Запишитесь на консультацию — specs, deploy и цены",
  ctaButton: "Связаться",
  highPerfModels: [
    {
      description:
        "Enterprise-агенты, многошаговое планирование, автоматизация разработки, длинные документы и codegen.",
      price: "¥ 772 200 / группа / мес",
      unitPrice: "¥ 3,575 / M tokens",
      tpm: "10M",
    },
    {
      description:
        "Мультимодальные агенты, vision, design-to-code и сложная автоматизация задач.",
      price: "¥ 772 200 / группа / мес",
      unitPrice: "¥ 8,938 / M tokens",
      tpm: "4M",
    },
    {
      description:
        "Длинные документы и базы знаний, support-боты, генерация контента и автоматизация процессов.",
      price: "¥ 386 100 / группа / мес",
      unitPrice: "¥ 3,575 / M tokens",
      tpm: "5M",
    },
    {
      description:
        "Сложное рассуждение, помощь с кодом, tool-using агенты, analytics и автоматизация.",
      price: "¥ 772 200 / группа / мес",
      unitPrice: "¥ 2,86 / M tokens",
      tpm: "12,5M",
    },
  ],
  standardModels: [
    {
      description:
        "Мультимодальные агенты, vision, design-to-code и сложная автоматизация задач.",
      price: "¥ 486 000 / группа / мес",
      unitPrice: "¥ 4,25 / M tokens",
      tpm: "5,3M",
    },
    {
      description:
        "Длинные документы и базы знаний, support-боты, генерация контента и автоматизация процессов.",
      price: "¥ 486 000 / группа / мес",
      unitPrice: "¥ 2,50 / M tokens",
      tpm: "9M",
    },
    {
      description:
        "Сложное рассуждение, помощь с кодом, tool-using агенты, analytics и автоматизация.",
      price: "¥ 486 000 / группа / мес",
      unitPrice: "¥ 2,08 / M tokens",
      tpm: "10,8M",
    },
  ],
};
