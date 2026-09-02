import type { TalkStrings } from "../content-types";

const categoryLabels = {
  全部: "Tout",
  技术实践: "Pratiques techniques",
  平台活动: "Événements plateforme",
  用户故事: "Récits utilisateurs",
  用户测评: "Avis utilisateurs",
} as const;

const tagLabels = {
  技术实践: "Pratiques techniques",
  平台活动: "Événements plateforme",
  用户故事: "Récits utilisateurs",
  用户测评: "Avis utilisateurs",
  市场活动: "Événements marketing",
} as const;

const articles = {
  b56thjrf4dfpzg1wynejke5j: {
    title: "OPC Nanchuan : exploration audacieuse du « super-individu » | Developer Talk",
    excerpt:
      "L’ère de l’IA alimente l’idée du « super-individu », et beaucoup expérimentent le modèle OPC (one-person company)—Nanchuan en fait partie. Fondateur de « Handmade Chuan Studio », il a lancé des dizaines de produits IA sans courir après les modes ni brûler les étapes de monétisation. basedong dialogue avec lui sur les opportunités, les barrières, la douleur et la joie d’une entreprise solo.",
  },
  qc68kpityh6nwvth6yv1zaei: {
    title: "OpenCode en bref : 190 k étoiles, l’agent pilote le navigateur",
    excerpt:
      "Avec Claude Code ou Codex, brancher un modèle tiers peut être fastidieux : routeurs, variables d’environnement, réglages.\nOpenCode rend tout prêt à l’emploi : choisissez un fournisseur (dont basedong), saisissez votre clé, c’est parti.",
  },
  e3okr78ulcbd36ggdxswgbpy: {
    title: "Codex en bref : plus de 5 M d’utilisateurs hebdo, 100+ modèles",
    excerpt:
      "Lors de la keynote GPT-5.6, OpenAI annonce la fusion de l’app desktop Codex dans le nouveau client ChatGPT, tout en conservant la marque Codex, le CLI, les extensions IDE et les services cloud—avec la sortie de Codex CLI 0.144.1 le même jour.",
  },
  crkywf0secr2axnazev9ay0f: {
    title: "31 k étoiles : mieux vaut un « humain » qu’une « crevette »—OpenHuman",
    excerpt:
      "Après la mode « crevette », voici OpenHuman, assistant personnalisé. Voici comment configurer l’API basedong dans OpenHuman.",
  },
  rtlosvhg5hy6p112rlrigoo7: {
    title: "basedong MaaS : cadeaux pour les deux ans de la plateforme",
    excerpt:
      "Rechargez et recevez des bons jusqu’à 1 000 ¥ pour fêter deux ans de basedong MaaS. Merci de votre confiance !",
  },
  hiwf5yfr6b790jmog9a6xlsb: {
    title: "Harness Engineering et affûtage des Skills | Developer Talk",
    excerpt:
      "Developer Talk reçoit Jigege, ex-PM devenue développeuse IA, qui présente le projet Book2Skills et son parcours vers une pratique claire du Harness Engineering.",
  },
  ecqutah37y0fsgn53j7gfus4: {
    title: "Guide BYOK : 100+ outils IA, accès direct à 100+ modèles",
    excerpt:
      "Près d’une centaine d’apps et d’outils s’intègrent déjà à basedong en BYOK. Récupérez votre clé API et installez les meilleurs modèles dans vos outils favoris.",
  },
  edmojkiwvenrby4mzq5kizl9: {
    title: "De l’art à l’élevage de « crevettes » : 25 ans de notes | Developer Talk",
    excerpt:
      "Yan Bo, de l’école d’art à la pratique IA, voit l’IA comme un amplificateur de compétences. Il partage 25 ans d’apprentissage continu en tant que bâtisseur IA au quotidien.",
  },
  zc516s5lixvrjuvo6soc81mz: {
    title: "Quatre heures par jour pour une équipe « homard » | Developer Talk",
    excerpt:
      "Peng Chao, cofondateur et CTO de OneOneTalk, consacre quatre heures daily à une équipe IA « 1+6 crevettes » pour coder, veiller l’info et rédiger—récit de pratique IA concrète.",
  },
  jt2by9g3v7aa6dgjotmrcfoh: {
    title: "Au-delà des « homards » : Claude Code déjà sur WeChat",
    excerpt:
      "WeChat ClawBot simplifie l’usage d’OpenClaw et ouvre la porte à n’importe quel agent. Brancher Claude Code sur ClawBot est aussi simple que connecter deux « homards ».",
  },
  pkivkufhheggmeskcfhh8kh9: {
    title: "Meetup « homard » : notre premier rassemblement",
    excerpt:
      "OpenClaw est installé—comment l’élever et quoi en faire ? 21 mars, 14h–16h30, parc scientifique de Tsinghua, Pékin : rejoignez les « éleveurs de crevettes ».",
  },
  wd6etweavt2nfbydjsx1a6z8: {
    title: "Notes crevette : mon app devient un add-on OpenClaw | Developer Talk",
    excerpt:
      "WiseFlow, partenaire basedong, évolue depuis 2024. Zhao Zheming raconte les choix d’architecture après l’arrivée d’OpenClaw.",
  },
  a58mvaz20e3bw6qhx8joewaw: {
    title: "Élever un « homard » : guide pas à pas OpenClaw",
    excerpt:
      "Tutoriel Windows détaillé (plus Mac) pour installer OpenClaw rapidement. Permissions élevées : utilisez un environnement isolé.",
  },
  wzj6xzbdvzsytjnqno7fxyp1: {
    title: "1 Md de tokens/jour : quatre leçons d’un bâtisseur IA | Developer Talk",
    excerpt:
      "Cowork, OpenClaw et autres agents consomment des tokens en masse. Xu Keqian, à ~1 Md/jour, partage quatre enseignements.",
  },
  wln8c6grxkh11brde838wfxd: {
    title: "Du cloud native à l’IA : parcours de transition | Developer Talk",
    excerpt:
      "Haili, ambassadeur LangChain et auteur, explique comment migrer son expérience cloud vers l’IA avec trois stratégies pragmatiques.",
  },
  o8zq301umaf89v5bcxyltbav: {
    title: "basedong × Next AI Draw.io : 20 k stars, diagrammes en une phrase",
    excerpt:
      "Next AI Draw.io génère des schémas naturellement ; l’intégration basedong renforce ses capacités modèles.",
  },
  od7wj9rr23p95uhihmhrombp: {
    title: "Programme « Ambassadeur parrainage » basedong",
    excerpt:
      "L’offre « invitez un ami » devient le programme Ambassadeur : parrainez et gagnez des bons utilisables sur toute la plateforme.",
  },
  zx3caanoshbvxbudsq5x1nbz: {
    title: "Avis utilisateur | DeepSeek-OCR—vous l’avez testé ?",
    excerpt:
      "Un développeur senior évalue DeepSeek-OCR sur des plans CAD industriels.",
  },
  nddw0hghm23vbkfcz4y99glc: {
    title: "Récit utilisateur | Easy : livres IA pour ma fille",
    excerpt:
      "basedong recueille les histoires réelles des bâtisseurs IA pour faire circuler le savoir.",
  },
  evdjqa744e2bim1wwcrzwix2: {
    title: "Adapter Gemini-CLI pour DeepSeek via basedong",
    excerpt:
      "Le fork DeepSeek repose sur Gemini-CLI open source et l’API basedong—alternative CLI efficace pour les développeurs locaux.",
  },
  swbnccchf5esxedxq01s4vr5: {
    title: "[Terminé] Premier anniversaire basedong : deux surprises",
    excerpt:
      "Pour le premier anniversaire de basedong, deux programmes de remerciement pour la communauté.",
  },
} as const;

export const fr: TalkStrings = {
  pageTitle: "Developer Talk",
  heroLogoAlt: "Developer Talk",
  pageSubtitle: "Pratiques et insights réels de développeurs",
  shareCtaLabel: "Partagez votre pratique",
  submitCtaTitle: "Soumettez votre récit pour inspirer plus d’utilisateurs",
  submitCtaLabel: "Soumettre",
  featuredReadMore: "En savoir plus",
  categoryLabels,
  tagLabels,
  articles,
};
