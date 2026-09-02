import type { HomeStrings } from "../content-types";

export const fr: HomeStrings = {
  heroSlides: [
    {
      tabLabel: "GPT-5.6",
      eyebrow: "basedong est en ligne",
      title: "GPT-5.6",
      description:
        "La famille GPT-5.6 — Sol (flagship), Terra (équilibré) et Luna (rapide) — offre des performances de pointe pour le code, les agents, le travail intellectuel et le raisonnement scientifique. Disponible sur la plateforme.",
      ctaLabel: "Essayer",
      logoAlt: "GPT-5.6",
    },
    {
      tabLabel: "Opus 5",
      eyebrow: "Dernier flagship d'Anthropic",
      title: "Opus 5",
      description:
        "Opus 5 améliore le code, les agents et la rédaction professionnelle — conçu pour les tâches complexes et longues avec des résultats plus précis.",
      ctaLabel: "Essayer",
      logoAlt: "Opus 5",
    },
    {
      tabLabel: "Auto",
      eyebrow: "Gratuit pour une durée limitée",
      title: "Modèles Auto",
      description:
        "Le routage intelligent choisit le bon modèle et équilibre vitesse, coût et qualité. Essai gratuit limité — accès sans friction aux grands modèles.",
      ctaLabel: "Essayer",
      logoAlt: "Modèles Auto",
    },
    {
      tabLabel: "Déploiement",
      eyebrow: "Niveau entreprise",
      title: "Déploiement de services de modèles",
      description:
        "Déploiement privé et mise à l'échelle cloud élastique — adaptation des modèles, accélération de l'inférence et support opérationnel pour les charges critiques.",
      ctaLabel: "En savoir plus",
      logoAlt: "Déploiement de services de modèles",
    },
  ],
  productMatrix: {
    title: "Une offre complète, de l'idée à la production",
    subtitle:
      "Accès unifié pour développeurs et entreprises — connectez l'IA à votre activité plus vite",
  },
  productCards: [
    {
      title: "Déploiement privé sur site",
      description:
        "Pour les entreprises soumises à la conformité et à la souveraineté des données : déploiements privés prêts pour la production, tuning, clusters et exploitation continue.",
      ctaLabel: "En savoir plus",
    },
    {
      title: "Optimisation des performances d'inférence",
      description:
        "Moteurs d'inférence open source, modèles ouverts et modèles sur mesure — de la sélection au tuning et à l'exploitation en production.",
      ctaLabel: "Nous contacter",
    },
    {
      title: "Modèles Auto gratuits",
      description:
        "Routage intelligent entre vitesse, coût et qualité. Accès gratuit limité — zéro barrière aux grands modèles.",
      ctaLabel: "Essayer",
    },
    {
      title: "API unifiée pour grands modèles",
      description:
        "Texte, voix, image et vidéo via une seule API — facturation à l'usage pour intégrer et itérer rapidement.",
      ctaLabel: "Commencer",
    },
  ],
  whySection: {
    title: "Pourquoi basedong",
  },
  whyHighlightCards: [
    {
      title: "Excellent rapport qualité-prix",
      textBlocks: [
        {
          lines: [
            [{ text: "Gouvernance des coûts" }, { text: "de bout en bout", emphasis: true }],
          ],
        },
        {
          lines: [
            [{ text: "Modèles Auto" }, { text: "gratuits pour une durée limitée", emphasis: true }],
            [{ text: "Routage intelligent entre vitesse et coût" }],
          ],
          className: "mb-8",
        },
      ],
      stats: [
        { prefix: "Réduisez les dépenses d'inférence et de déploiement jusqu'à", value: "40%" },
        { prefix: "Modèles Auto gratuits — coût d'accès", value: "nul" },
      ],
      footnotes: [
        [{ text: "Facturation transparente à l'usage, dépenses prévisibles" }],
        [{ text: "Calcul hétérogène découplé — orchestration fluide des accélérateurs IA" }],
        [
          { text: "Des" },
          { text: "coûts stables et prévisibles", emphasis: true },
          { text: " pour les applications sensibles au budget" },
        ],
      ],
    },
    {
      title: "Haute fiabilité",
      textBlocks: [
        {
          lines: [
            [{ text: "Redondance" }, { text: "multi-nœuds", emphasis: true }],
          ],
        },
        {
          lines: [
            [{ text: "Surveillance, alertes et auto-réparation", emphasis: true }],
            [{ text: "Stabilité durable des services" }],
          ],
          className: "mb-8",
        },
      ],
      stats: [
        { prefix: "Redondance multi-nœuds — basculement en", value: "secondes" },
        { prefix: "Support entreprise réactif, conforme aux exigences", value: "SLA" },
      ],
      footnotes: [
        [{ text: "Gérez la forte concurrence et les inférences par lots" }],
        [{ text: "Éprouvé par des développeurs — stable en production" }],
        [
          { text: "Des" },
          { text: "performances de service stables", emphasis: true },
          { text: " pour les charges critiques" },
        ],
      ],
    },
  ],
  featureCards: [
    {
      title: "Haute extensibilité",
      description:
        "Mise à l'échelle élastique pour les pics de trafic et les charges complexes. Déployez des modèles sur mesure rapidement — architecture flexible, hybrid cloud et multi-cloud.",
    },
    {
      title: "Haute sécurité",
      description:
        "BYOC en option — les données restent dans votre périmètre. Isolation calcul, réseau et stockage, conformité sectorielle pour la sécurité et l'audit entreprise.",
    },
    {
      title: "Haute intelligence",
      description:
        "LLM de pointe et capacités multimodales audio/vidéo en un seul endroit. Évoluez avec votre activité et suivez usage et dépenses avec des analyses claires.",
    },
    {
      title: "Haute disponibilité",
      description:
        "Validé en production par des développeurs du monde entier. Surveillance, alertes, auto-réparation et support entreprise pour les charges soumises aux SLA.",
    },
  ],
  industrySection: {
    title: "Solutions sectorielles adaptées à vos besoins de déploiement",
  },
  industryItems: [
    {
      title: "Matériel IA",
      description:
        "Terminaux mobiles IA, appliances d'inférence et intelligence incarnée — réduisez la latence edge-cloud et améliorez la réactivité.",
    },
    {
      title: "Secteur public",
      description:
        "Inférence à haut débit et faible latence pour l'administration intelligente, la sécurité publique et la modernisation industrielle — IA générative rentable sans verrouillage fournisseur.",
    },
    {
      title: "Centres de calcul IA",
      description:
        "Optimisez l'ordonnancement et l'allocation pour accélérer l'entraînement et le déploiement d'inférence à grande échelle.",
    },
    {
      title: "Éducation",
      description:
        "Assistants pédagogiques intelligents, parcours personnalisés multi-modèles, Q&R instantanées — meilleure efficacité pour enseignants et élèves.",
    },
    {
      title: "Internet",
      description:
        "Génération de contenu et personnalisation pour les plateformes — changement à chaud de modèles, accélération d'inférence, meilleure utilisation GPU et UX.",
    },
  ],
  partners: {
    title: "Clients et partenaires de l'écosystème",
    ctaPrimaryDesc: "Activez les API de modèles en quelques minutes",
    ctaPrimaryButton: "Commencer l'essai",
    ctaSecondaryDesc: "Besoin d'une offre sur mesure ? Contactez-nous",
    ctaSecondaryButton: "Soumettre une demande",
  },
  heroCarousel: {
    ariaLabel: "Points forts de la page d'accueil",
    switchTabLabel: (tabLabel) => `Passer à ${tabLabel}`,
  },
};
