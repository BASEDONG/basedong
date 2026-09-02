import type { GatewayStrings } from "../content-types";

export const fr: GatewayStrings = {
  archLayers: [
    {
      kind: "apps",
      title: "Applications IA",
      modules: [
        "Agent",
        "RAG",
        "Apps conversationnelles",
        "Workflows",
        "Inférence batch",
        "Recherche d'embeddings",
        "Multimodal",
      ],
    },
    {
      kind: "divider",
      title: "API / Appels",
    },
    {
      kind: "section",
      title: "Passerelle de services d'inférence LLM",
      modules: [
        "API unifiée",
        "Authentification",
        "Observabilité",
        "Facturation",
        "Multi-tenant",
        "Fallback",
        "Contrôle d'accès fin",
        "Routage par politique",
        "Journaux d'audit",
        "Limites & quotas",
      ],
    },
    {
      kind: "parallel-vendors",
      left: {
        title: "Services d'inférence LLM tiers",
        vendors: [
          "DeepSeek",
          "Qwen",
          "Llama",
          "GLM",
          "Mistral",
          "InternLM",
          "Gemma",
          "Kimi",
        ],
      },
      right: {
        title: "Plateforme MaaS privée",
        vendors: ["Modèles privés", "Modèles fine-tunés"],
      },
    },
  ],
  advantageCards: [
    {
      title: "Politiques de routage orchestrables",
      description:
        "Configurez routage dynamique, équilibrage de charge et basculement selon le trafic et les caractéristiques des services modèles — pour maintenir la disponibilité et les SLA métier.",
    },
    {
      title: "Comptabilité des coûts sur toute la chaîne",
      description:
        "Tracez les coûts à travers utilisateurs finaux, clés API, projets, organisations, modèles et calcul — reconstituez la structure complète pour une comptabilité précise.",
    },
    {
      title: "Sécurité et conformité entreprise",
      description:
        "L'anonymisation bidirectionnelle réduit les risques de confidentialité en temps réel, avec blocage de contenu sensible et journaux d'audit — pour des charges LLM conformes et traçables.",
    },
    {
      title: "Accès unifié multi-sources",
      description:
        "Intégration standardisée des modèles fournisseurs — onboarding et appels centralisés, fini les intégrations fragmentées et gestion simplifiée de l'écosystème multi-fournisseurs.",
    },
    {
      title: "Observabilité modèle de bout en bout",
      description:
        "Vues multidimensionnelles du volume d'appels, des performances, etc. — les données nécessaires à la gouvernance, au cycle de vie et à l'optimisation du routage.",
    },
    {
      title: "Gouvernance granulaire",
      description:
        "Définissez permissions, trafic et quotas par utilisateur, clé API, projet, organisation, etc. — chaque appel reste contrôlé et gérable.",
    },
  ],
  scenarios: [
    {
      tab: "Plateforme de capacités LLM entreprise",
      title: "Plateforme de capacités LLM entreprise",
      paragraphs: [
        "Quand plusieurs départements et lignes métier adoptent les LLM en parallèle, les modes d'accès, permissions et politiques d'appel divergent — augmentant le coût de gestion unifiée.",
        "La passerelle LLM offre un point d'entrée unique pour l'accès et la gouvernance des appels, planifiant centralement les ressources modèles et fournissant aux apps et Agents un canal cohérent et contrôlé.",
      ],
      cards: [
        { title: "API unifiée", subtitle: "Intégration plus rapide" },
        { title: "Contrôle d'accès fin", subtitle: "Gestion simplifiée" },
        { title: "Isolation multi-tenant", subtitle: "Sécurité renforcée" },
      ],
    },
    {
      tab: "Orchestration multi-modèles",
      title: "Orchestration multi-modèles",
      paragraphs: [
        "Les modèles diffèrent en capacité, performance et coût — les entreprises ont souvent besoin de politiques d'appel par scénario.",
        "La passerelle LLM route et planifie par politique, rendant l'usage multi-modèles plus flexible et l'efficacité globale plus élevée.",
      ],
      cards: [
        { title: "Routage intelligent", subtitle: "Ops plus efficaces" },
        { title: "Bascule dynamique de modèle", subtitle: "Coût de bascule nul" },
        { title: "Support A/B test", subtitle: "Complexité réduite" },
      ],
    },
    {
      tab: "Observabilité centralisée et gouvernance des appels",
      title: "Observabilité centralisée et gouvernance des appels",
      paragraphs: [
        "Quand les appels modèles sont dispersés entre apps et systèmes, la vue d'ensemble manque — dépannage et optimisation prennent plus de temps.",
        "La passerelle LLM agrège journaux d'appels et métriques runtime pour que l'entreprise suive l'usage en un seul endroit et améliore continuellement la gouvernance.",
      ],
      cards: [
        { title: "Analyses multidimensionnelles", subtitle: "Rapports" },
        { title: "Alertes d'anomalie", subtitle: "Surveillance temps réel" },
      ],
    },
    {
      tab: "Interactions fréquentes : coût réduit, réponse accélérée",
      title: "Interactions fréquentes : coût réduit, réponse accélérée",
      paragraphs: [
        "Dans les scénarios à haute fréquence (service client intelligent, Q&R de recherche), coût d'appel et latence dégradent directement l'expérience et l'efficacité opérationnelle.",
        "Avec cache et routage, les entreprises réduisent les coûts sans sacrifier la qualité et accélèrent les requêtes fréquentes.",
      ],
      cards: [
        { title: "Coût visible en temps réel", subtitle: "Dépenses maîtrisées" },
        { title: "Ajustement dynamique des quotas", subtitle: "Appels plus efficaces" },
      ],
    },
    {
      tab: "Disponibilité des charges critiques",
      title: "Disponibilité des charges critiques",
      paragraphs: [
        "Si l'activité critique dépend d'un seul service modèle, limites de débit, jitter ou pannes peuvent interrompre la continuité.",
        "La passerelle LLM prend en charge routage multi-modèles et politiques de reprise — bascule automatique en cas d'anomalie ou de dégradation pour maintenir la stabilité métier.",
      ],
      cards: [
        { title: "Bascule automatique", subtitle: "Reprise plus rapide" },
        { title: "Sondes de santé temps réel", subtitle: "Disponibilité accrue" },
      ],
    },
  ],
  testimonials: [
    {
      title: "Éducation",
      body: "Avec le déploiement des LLM dans l'enseignement intelligent, l'analyse pédagogique et la Q&R intelligente, facultés et apps pédagogiques se connectent en parallèle — augmentant les besoins en permissions hiérarchisées, audit d'appels et suivi d'usage. La passerelle LLM basedong renforce l'accès unifié et la gouvernance fine, supportant la gestion consolidée par campus, la revue de contenu conforme et l'observabilité de bout en bout — améliorant significativement l'efficacité ops et la stabilité des services pédagogiques.",
      role: "Responsable plateforme pédagogique",
    },
    {
      title: "Plateformes pétrolières offshore",
      body: "Avec les LLM déployés pour la maintenance offshore, l'analyse de données de forage et la conformité sécurité, les exigences de latence, concurrence et continuité sont plus élevées. Déployée sur des centres de données conteneurisés sur site, la passerelle LLM basedong route intelligemment par type de tâche et longueur de contexte, avec bascule automatique, haute disponibilité edge et observabilité de bout en bout — des services modèles plus stables et prévisibles pour les charges offshore critiques.",
      role: "Responsable ops plateforme",
    },
  ],
  faqItems: [
    {
      question: "Pourquoi une entreprise a-t-elle besoin d'une passerelle LLM ?",
      answer: {
        type: "list",
        intro:
          "Quand une entreprise utilise simultanément modèles internes, open source et API tierces, ces problèmes apparaissent rapidement :",
        items: [
          "Sources et protocoles hétérogènes — coût d'intégration élevé",
          "Chaque app appelle seule — chaînes fragmentées sans gestion, audit ni observabilité unifiés",
          "SLA différents par application — difficiles à coordonner",
          "Usage et coûts difficiles à mesurer — décisions sans données fiables",
        ],
        outro: "Une passerelle LLM répond à ces défis de manière centralisée.",
      },
    },
    {
      question: "Nous avons déjà des API LLM — pourquoi ajouter une passerelle ?",
      answer: {
        type: "paragraphs",
        paragraphs: [
          "Les appels API directs résolvent la connectivité ; la passerelle résout le contrôle. À l'échelle, coûts incontrôlés, lacunes sécurité/conformité et verrouillage fournisseur émergent. Couche intermédiaire unifiée, la passerelle aide à maîtriser les dépenses, protéger toute la chaîne et basculer entre modèles — étape clé du pilote à la production IA.",
        ],
      },
    },
    {
      question: "La passerelle LLM peut-elle être déployée on-premise ?",
      answer: {
        type: "paragraphs",
        paragraphs: [
          "Pour la finance, le secteur public et autres domaines exigeants en sécurité des données, la passerelle LLM entreprise supporte le déploiement on-premise. Traitement des données et relais modèles restent dans le réseau interne, protégeant les actifs critiques.",
        ],
      },
    },
    {
      question: "Comment la passerelle maîtrise-t-elle les coûts d'usage LLM ?",
      answer: {
        type: "rich-list",
        intro: "La passerelle LLM offre des contrôles de coût multidimensionnels :",
        items: [
          {
            label: "Gestion des quotas Token :",
            text: "Plafonds de dépense par équipe ou projet pour éviter les dépassements budgétaires.",
          },
          {
            label: "Routage intelligent :",
            text: "Sélection automatique du modèle adapté à la complexité (tâches simples → modèles légers).",
          },
          {
            label: "Cache de requêtes :",
            text: "Réduit les appels dupliqués et économise directement les Tokens.",
          },
        ],
      },
    },
    {
      question: "Comment la passerelle garantit-elle la conformité du contenu généré ?",
      answer: {
        type: "paragraphs",
        paragraphs: [
          "Revue de contenu bidirectionnelle intégrée : blocage des entrées sensibles côté requête, filtrage des sorties non conformes côté réponse. Listes de mots et politiques personnalisables pour respecter réglementations et charte de marque.",
        ],
      },
    },
    {
      question: "La passerelle ralentit-elle les requêtes ?",
      answer: {
        type: "paragraphs",
        paragraphs: [
          "Sur architecture cloud-native haute performance, la surcharge réseau est typiquement de l'ordre de la milliseconde — imperceptible pour l'utilisateur. La planification intelligente du trafic facilite le respect des SLA applicatifs et une orchestration judicieuse peut encore augmenter le débit global des services modèles.",
        ],
      },
    },
  ],
};
