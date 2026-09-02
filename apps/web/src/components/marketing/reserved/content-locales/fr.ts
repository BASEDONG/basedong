import type { ReservedStrings } from "../content-types";

export const fr: ReservedStrings = {
  pageTitle: "Instances réservées | basedong",
  pageDescription:
    "Capacité garantie pour vos charges critiques. Performance prévisible, meilleur coût à fort volume, SLA entreprise.",
  heroLogoAlt: "Instances réservées",
  heroTitle: "Capacité garantie",
  heroTitleAccent: "Pour vos charges critiques",
  heroSubtitle:
    "Performance prévisible · Meilleur coût à fort volume · SLA entreprise",
  consultCta: "Prendre rendez-vous",
  whyBadge: "WHY RESERVED",
  whyTitle: "Pourquoi des instances réservées",
  whySubtitle:
    "Capacité dédiée, fidélité des modèles et maîtrise des coûts pour l'inférence en entreprise.",
  whyCards: [
    {
      title: "Capacité réservée dédiée",
      items: [
        "Réservez du calcul pour vos charges cœur, même aux pics de trafic.",
        "Évitez la concurrence sur les pools partagés et gardez vos apps critiques en ligne.",
      ],
    },
    {
      title: "Fidélité des modèles",
      items: [
        "Notre stack d'inférence est optimisée au déploiement pour coller aux références éditeur.",
        "Qualité stable pour les scénarios qui ne tolèrent pas la dérive.",
      ],
    },
    {
      title: "Coût maîtrisé à l'échelle",
      items: [
        "Tarification à terme fixe plutôt que des variations à l'usage.",
        "Meilleure économie pour des charges soutenues et un budget long terme.",
      ],
    },
    {
      title: "SLA entreprise",
      items: [
        "Des niveaux de service qui maintiennent vos inférences critiques.",
        "Conçu pour des charges durables et des systèmes métier en production.",
      ],
    },
  ],
  pricingBadge: "PRICING & PERFORMANCE",
  pricingTitle: "Tarifs et performances de référence",
  pricingSubtitle:
    "Plusieurs tailles d'instances réservées selon modèle, concurrence et échelle. Exemples de specs et tarifs ci-dessous.",
  highPerfTitle: "Niveau haute performance",
  standardTitle: "Niveau standard",
  pricingNote1:
    "Le prix unitaire effectif est calculé à partir du TPM ci-dessus, sur 30 jours/mois et 50 % d'utilisation globale.",
  pricingNote2:
    "Performances mesurées avec : 24k tokens en entrée, 1k en sortie, taux de cache 80 %.",
  pricingFootCtaBefore:
    "Specs d'exemple. Pour d'autres modèles ou un déploiement sur mesure, ",
  pricingFootCtaAfter: ".",
  costReferenceLabel: "Référence de coût",
  priceLabel: "Prix",
  unitPriceLabel: "Prix unitaire effectif",
  perfReferenceLabel: "Référence de performance",
  deliveryBadge: "DELIVERY & SLA",
  deliveryTitle: "Livraison et exploitation entreprise",
  deliverySteps: [
    {
      title: "Déploiement rapide",
      description:
        "Déploiement standard en 1 à 7 jours ouvrés, intégration rapide à vos systèmes existants.",
    },
    {
      title: "Déploiement et tuning",
      description:
        "Nous gérons déploiement, validation et réglages d'inférence pour une mise en service fluide.",
    },
    {
      title: "Montée en charge",
      description:
        "Extension ou redimensionnement selon la croissance ou les variations saisonnières.",
    },
    {
      title: "Garanties SLA",
      description:
        "Niveaux de service clairs et garanties opérationnelles pour des charges longues durées.",
    },
  ],
  ctaBadge: "Déploiements sur mesure",
  ctaTitle: "Capacité dédiée\npour grandir",
  ctaBody:
    "Plus d'options de déploiement réservé. Notre équipe adapte specs, rollout et tarifs à votre charge.",
  ctaCardTitle: "En savoir plus sur les instances réservées",
  ctaCardBody: "Prenez rendez-vous pour specs, déploiement et tarifs",
  ctaButton: "Nous contacter",
  highPerfModels: [
    {
      description:
        "Agents entreprise, planification multi-étapes, automatisation logicielle, analyse de longs documents et génération de code.",
      price: "¥ 772 200 / groupe / mois",
      unitPrice: "¥ 3,575 / M tokens",
      tpm: "10 M",
    },
    {
      description:
        "Agents multimodaux, vision, design-to-code et automatisation de tâches complexes.",
      price: "¥ 772 200 / groupe / mois",
      unitPrice: "¥ 8,938 / M tokens",
      tpm: "4 M",
    },
    {
      description:
        "Analyse de documents et bases de connaissances, support, génération de contenu et automatisation de flux.",
      price: "¥ 386 100 / groupe / mois",
      unitPrice: "¥ 3,575 / M tokens",
      tpm: "5 M",
    },
    {
      description:
        "Raisonnement complexe, assistance code, agents outillés, analytics et workflows automatisés.",
      price: "¥ 772 200 / groupe / mois",
      unitPrice: "¥ 2,86 / M tokens",
      tpm: "12,5 M",
    },
  ],
  standardModels: [
    {
      description:
        "Agents multimodaux, vision, design-to-code et automatisation de tâches complexes.",
      price: "¥ 486 000 / groupe / mois",
      unitPrice: "¥ 4,25 / M tokens",
      tpm: "5,3 M",
    },
    {
      description:
        "Analyse de documents et bases de connaissances, support, génération de contenu et automatisation de flux.",
      price: "¥ 486 000 / groupe / mois",
      unitPrice: "¥ 2,50 / M tokens",
      tpm: "9 M",
    },
    {
      description:
        "Raisonnement complexe, assistance code, agents outillés, analytics et workflows automatisés.",
      price: "¥ 486 000 / groupe / mois",
      unitPrice: "¥ 2,08 / M tokens",
      tpm: "10,8 M",
    },
  ],
};
