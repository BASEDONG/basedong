import type { TalkStrings } from "../content-types";

const categoryLabels = {
  全部: "All",
  技术实践: "Tech in practice",
  平台活动: "Platform events",
  用户故事: "User stories",
  用户测评: "User reviews",
} as const;

const tagLabels = {
  技术实践: "Tech in practice",
  平台活动: "Platform events",
  用户故事: "User stories",
  用户测评: "User reviews",
  市场活动: "Marketing events",
} as const;

const articles = {
  b56thjrf4dfpzg1wynejke5j: {
    title: "OPC Nanchuan: A super-individual’s bold exploration | Developer Talk",
    excerpt:
      "The AI era fuels the idea of the “super-individual,” and many people are trying the OPC (one-person company) model—Nanchuan is one of them. As founder of “Handmade Chuan Studio,” he has shipped dozens of AI products without chasing hype or rushing to monetize. His approach is simple yet intense: stay on the front line, hit a problem, solve it, turn the solution into a product, and sell it. In this Developer Talk conversation with basedong, he shares opportunities, moats, pain, and joy in running a one-person company.",
  },
  qc68kpityh6nwvth6yv1zaei: {
    title: "OpenCode quick start: 190K stars, agents that drive the browser",
    excerpt:
      "If you’ve used Claude Code or Codex, you know wiring third-party models can be painful—routers, env vars, tuning parameters.\nOpenCode makes it plug-and-play. Open the UI, pick any provider (including basedong), enter your key, and you’re done.",
  },
  e3okr78ulcbd36ggdxswgbpy: {
    title: "Codex quick start: 5M+ weekly users, run 100+ models freely",
    excerpt:
      "Early today, OpenAI’s GPT-5.6 launch announced that the Codex desktop app is merging into the new ChatGPT desktop client. Codex branding, capabilities, and pro entry points remain intact; Codex CLI, IDE extensions, and cloud services stay independent—and OpenAI shipped Codex CLI 0.144.1 the same day.",
  },
  crkywf0secr2axnazev9ay0f: {
    title: "31K stars: hire a “human” instead of raising “shrimp”—OpenHuman gets you",
    excerpt:
      "After the “shrimp” craze, the next step is a personalized assistant “human”—OpenHuman. Here’s how to configure basedong API in OpenHuman.",
  },
  rtlosvhg5hy6p112rlrigoo7: {
    title: "basedong MaaS platform: two-year anniversary rewards",
    excerpt:
      "Celebrate two years of basedong MaaS with recharge rewards—vouchers up to ¥1,000. Thanks for building with us!",
  },
  hiwf5yfr6b790jmog9a6xlsb: {
    title: "Harness Engineering in practice and honing Skills | Developer Talk",
    excerpt:
      "Developer Talk spoke with former PM and AI builder Jigege (“Product Sister”), who walked through the Book2Skills project and her journey from fuzzy idea to clear Harness Engineering practice.",
  },
  ecqutah37y0fsgn53j7gfus4: {
    title: "BYOK guide: 100+ AI tools, direct access to 100+ models",
    excerpt:
      "Nearly a hundred apps and dev tools already integrate with basedong via BYOK. Grab your API key and plug the best models into the tools you love.",
  },
  edmojkiwvenrby4mzq5kizl9: {
    title: "From art student to “shrimp keeper”: 25 years of cross-domain notes | Developer Talk",
    excerpt:
      "From fine arts to AI practitioner, Yan Bo spent 25 years on an unusual path. To him, AI isn’t magic—it amplifies ability, and value depends on the user. In a fast-changing era, he keeps learning and iterating as an everyday AI builder.",
  },
  zc516s5lixvrjuvo6soc81mz: {
    title: "Four hours a day raising a “lobster” team | Developer Talk",
    excerpt:
      "Peng Chao, co-founder and CTO of OneOneTalk, spent years in global tech firms and now builds AI agents for education—and practices Vibe Coding deeply. He spends four hours daily “raising” a 1+6 “shrimp” AI team for coding, news, and WeChat posts. Here’s his story.",
  },
  jt2by9g3v7aa6dgjotmrcfoh: {
    title: "Don’t only raise “lobsters”—WeChat already runs Claude Code",
    excerpt:
      "Since OpenClaw, “little lobsters” abound—but WeChat ClawBot is a gateway: it simplifies playing with “lobsters” and connects any agent you want behind the door. Wiring Claude Code into WeChat ClawBot is almost as easy as lobsters talking to each other.",
  },
  pkivkufhheggmeskcfhh8kh9: {
    title: "“Lobster” meetup: our first community gathering",
    excerpt:
      "OpenClaw is installed—now how do you raise it and what can it do? March 21 (Sat) 14:00–16:30, Tsinghua Science Park, Beijing—join fellow “shrimp keepers” for our first meetup.",
  },
  wd6etweavt2nfbydjsx1a6z8: {
    title: "Shrimp notes: upgrading my app to an OpenClaw add-on | Developer Talk",
    excerpt:
      "basedong partner WiseFlow (Chief Intelligence Officer) launched in 2024 as a popular open-source AI project. Two years on, OpenClaw reshaped the architecture—author Zhao Zheming shares the thinking and trade-offs.",
  },
  a58mvaz20e3bw6qhx8joewaw: {
    title: "Raising a “lobster”: OpenClaw step-by-step guide",
    excerpt:
      "Still struggling to install OpenClaw? We share a detailed Windows tutorial from Zhihu author “Big Data Talk,” plus Mac steps, to help you start fast. OpenClaw has broad runtime permissions—use an isolated environment.",
  },
  wzj6xzbdvzsytjnqno7fxyp1: {
    title: "1B tokens/day: four lessons from an “AI doer” | Developer Talk",
    excerpt:
      "AI agents—from Cowork to OpenClaw—are doing real work, and token burn is part of the conversation. Xu Keqian, who consumes around a billion tokens daily, shares four practical lessons.",
  },
  wln8c6grxkh11brde838wfxd: {
    title: "From cloud native to AI: a migration story | Developer Talk",
    excerpt:
      "Haili, LangChain Ambassador and author of LangChain and LangGraph in Action, moved from cloud native to AI. He shares three grounded strategies for riding the wave without losing clarity.",
  },
  o8zq301umaf89v5bcxyltbav: {
    title: "basedong × Next AI Draw.io: 20K stars, diagrams from a sentence",
    excerpt:
      "Next AI Draw.io makes charting feel like conversation. It now integrates deeply with basedong for stronger model support.",
  },
  od7wj9rr23p95uhihmhrombp: {
    title: "basedong “Referral Ambassador” program is live",
    excerpt:
      "We upgraded the invite-friends bonus into the Referral Ambassador program—invite friends and earn platform-wide vouchers.",
  },
  zx3caanoshbvxbudsq5x1nbz: {
    title: "User review | DeepSeek-OCR—have you tried it?",
    excerpt:
      "A senior developer tests DeepSeek-OCR on industrial CAD drawing recognition pain points.",
  },
  nddw0hghm23vbkfcz4y99glc: {
    title: "User story | Easy: AI picture books for my daughter, compounding growth",
    excerpt:
      "basedong documents real stories from AI builders—so knowledge flows and experience resonates.",
  },
  evdjqa744e2bim1wwcrzwix2: {
    title: "Hack Gemini-CLI to run DeepSeek in the same CLI workflow",
    excerpt:
      "The DeepSeek Gemini-CLI fork uses open Gemini-CLI architecture with basedong API for DeepSeek— a practical CLI alternative for domestic developers.",
  },
  swbnccchf5esxedxq01s4vr5: {
    title: "[Ended] basedong first anniversary: two surprise rewards",
    excerpt:
      "On basedong’s first anniversary, we’re launching two thank-you programs for our community.",
  },
} as const;

export const hi: TalkStrings = {
  pageTitle: "Developer Talk",
  heroLogoAlt: "Developer Talk",
  pageSubtitle: "Real practices and insights from developers",
  shareCtaLabel: "Share your practice",
  submitCtaTitle: "Submit your story so more users can learn from your practice",
  submitCtaLabel: "Submit now",
  featuredReadMore: "Read more",
  categoryLabels,
  tagLabels,
  articles,
};
