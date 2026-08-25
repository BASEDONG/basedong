import type { TalkPageContent } from "./content-types";

const IMG = "/assets/marketing/developer-talk/images";
const FORM =
  "https://siliconflow.feishu.cn/share/base/form/shrcnGqeuLHP7ByyGXcS1Gls9hd";

export const TALK_CONTENT: TalkPageContent = {
  pageTitle: "开发者说",
  pageSubtitle: "来自开发者的真实实践与洞察",
  heroBg: `${IMG}/hero-mask.png`,
  shareCta: { label: "分享你的实践", href: FORM },
  submitCta: {
    title: "投稿给我们，让更多用户看到你的实践",
    label: "立即投稿",
    href: FORM,
  },
  filterCategories: ["全部", "技术实践", "平台活动", "用户故事", "用户测评"],
  articles: [
    {
      id: "b56thjrf4dfpzg1wynejke5j",
      title: "OPC 南川：超级个体的疯狂探索｜开发者说",
      excerpt:
        "AI 时代让“超级个体”充满想象，很多人都在实践 OPC（一人公司）模式，南川是其中一个。作为「手工川工作室」主理人，他做了几十款 AI 产品，却不追风口，也不急着商业化。他的打法朴素而有张力：一直在一线，碰到问题，解决问题，把解决方案做成产品，卖出去。以下是硅基流动与南川的对话，听他聊一人公司的机会、壁垒、痛苦与快乐。",
      tag: "用户故事",
      date: "2026-08-05",
      href: "https://siliconflow.cn/developer-talk/b56thjrf4dfpzg1wynejke5j",
      cover: `${IMG}/opc-nanchuan.png`,
    },
    {
      id: "qc68kpityh6nwvth6yv1zaei",
      title: "OpenCode 速通：19 万星，自主操控浏览器干活",
      excerpt:
        "用过 Claude Code 和 Codex 的朋友大概知道，接第三方模型是件比较折腾的事，需要装 Router、配环境变量、调参数。\nOpenCode 把这些做成了开箱即用。打开界面，可以选填包括硅基流动（SiliconFlow）在内的任意第三方供应商，填 Key，完事。",
      tag: "技术实践",
      date: "2026-07-30",
      href: "https://siliconflow.cn/developer-talk/qc68kpityh6nwvth6yv1zaei",
      cover: `${IMG}/opencode.jpg`,
    },
    {
      id: "e3okr78ulcbd36ggdxswgbpy",
      title: "Codex 速通：周活逆袭超 500 万，随意跑百款模型",
      excerpt:
        "今天凌晨，OpenAI 在 GPT-5.6 发布会上宣布：Codex 桌面应用正式并入新版 ChatGPT 桌面端。但 Codex 的 Logo、名称、开发能力和专业入口都被完整保留，Codex CLI、IDE 扩展和云端服务仍独立存在，OpenAI 还在同一天更新了 Codex CLI 0.144.1 版本。",
      tag: "技术实践",
      date: "2026-07-10",
      href: "https://siliconflow.cn/developer-talk/e3okr78ulcbd36ggdxswgbpy",
      cover: `${IMG}/codex.png`,
    },
    {
      id: "crkywf0secr2axnazev9ay0f",
      title: "狂揽 31K 星：养虾不如雇“人”，OpenHuman 分分钟懂你",
      excerpt:
        "虾热之后，更进阶的个性化助手“人类”—— OpenHuman 登场了。快来看看如何在 OpenHuman 中使用硅基流动 API 进行配置吧。",
      tag: "技术实践",
      date: "2026-06-12",
      href: "https://siliconflow.cn/developer-talk/crkywf0secr2axnazev9ay0f",
      cover: `${IMG}/openhuman.png`,
    },
    {
      id: "rtlosvhg5hy6p112rlrigoo7",
      title: "硅基流动 MaaS 平台上线两周年回馈",
      excerpt:
        "硅基流动 MaaS 平台上线两周年回馈。充值消费返券，最高1,000元。感谢一路同行！",
      tag: "平台活动",
      date: "2026-05-29",
      href: "https://siliconflow.cn/developer-talk/rtlosvhg5hy6p112rlrigoo7",
      cover: `${IMG}/maas-2yr.png`,
    },
    {
      id: "hiwf5yfr6b790jmog9a6xlsb",
      title: "Harness Engineering 实践与 Skills 打磨心得｜开发者说",
      excerpt:
        "硅基流动「开发者说」访谈了前产品经理、现 AI 开发者姬阁阁（网名产品二姐），通过一个名为 Book2Skills 的实际项目，分享了她对 Harness Engineering 从模糊到清晰、从理念到实践的完整探索。",
      tag: "用户故事",
      date: "2026-05-22",
      href: "https://siliconflow.cn/developer-talk/hiwf5yfr6b790jmog9a6xlsb",
      cover: `${IMG}/harness.png`,
    },
    {
      id: "ecqutah37y0fsgn53j7gfus4",
      title: "BYOK 指南：100+ AI 工具，直连 100+ 模型",
      excerpt:
        "目前，已有近百款独立应用与开发工具通过 BYOK 模式深度接入了硅基流动。现在就可获取你的 API Key，把最适合的模型，装进你最得心应手的工具里。",
      tag: "技术实践",
      date: "2026-05-19",
      href: "https://siliconflow.cn/developer-talk/ecqutah37y0fsgn53j7gfus4",
      cover: `${IMG}/byok.png`,
    },
    {
      id: "edmojkiwvenrby4mzq5kizl9",
      title: "从美术生到养虾人，我的 25 年跨界进化笔记｜开发者说",
      excerpt:
        "从美术生到 AI 实践者，严波用 25 年走出了一条独特的跨界之路。在严波看来，AI 不是魔法，而是能力放大器，其价值取决于使用者。在这个快速变革的时代，他用持续学习与迭代意识，诠释着一位普通 AI 实践者的探索与坚守。",
      tag: "用户故事",
      date: "2026-04-02",
      href: "https://siliconflow.cn/developer-talk/edmojkiwvenrby4mzq5kizl9",
      cover: `${IMG}/art-to-shrimp.png`,
    },
    {
      id: "zc516s5lixvrjuvo6soc81mz",
      title: "每天花 4 小时，我养了一支“龙虾”团队｜开发者说",
      excerpt:
        "彭超，OneOneTalk 联合创始人兼 CTO，之前一直在跨国企业与高科技公司工作，现专注于教育领域的 AI Agent 产品构建，近几年成为 Vibe Coding 深度实践者。如今，他每天花 4 小时来“养”一支“1+6 虾”的 AI 团队，帮助他处理写代码、抓资讯、写公众号等日常工作。以下是他的 AI 实践故事。",
      tag: "用户故事",
      date: "2026-03-26",
      href: "https://siliconflow.cn/developer-talk/zc516s5lixvrjuvo6soc81mz",
      cover: `${IMG}/lobster-team.png`,
    },
    {
      id: "jt2by9g3v7aa6dgjotmrcfoh",
      title: "别光养“龙虾”，微信已玩上 Claude Code",
      excerpt:
        "OpenClaw 问世以来，各类衍生的”小龙虾”争奇斗艳，但微信 ClawBot 的妙处在于，它是一扇任意门的接口，不止让玩“龙虾”变得更简单，门后可以连接任何你想要把玩的 AI Agent。那么，怎么让 Claude Code 装进你的微信 ClawBot？过程简单得几乎像让“龙虾”间互相勾搭一样简单。",
      tag: "技术实践",
      date: "2026-03-24",
      href: "https://siliconflow.cn/developer-talk/jt2by9g3v7aa6dgjotmrcfoh",
      cover: `${IMG}/wechat-claude.png`,
    },
    {
      id: "pkivkufhheggmeskcfhh8kh9",
      title: "“龙虾”聚会，我们要办的首场 Meetup",
      excerpt:
        "小龙虾 OpenClaw 装上了，到底怎么养以及用它到底能做些什么？3 月 21 日（本周六）14:00 - 16:30，北京清华科技园，我们将办一场关于“养虾人”聚会。期待你来聊聊。",
      tag: "平台活动",
      date: "2026-03-17",
      href: "https://siliconflow.cn/developer-talk/pkivkufhheggmeskcfhh8kh9",
      cover: `${IMG}/meetup.png`,
    },
    {
      id: "wd6etweavt2nfbydjsx1a6z8",
      title: "玩“虾”笔记：我把软件升级为 OpenClaw Add-on｜开发者说",
      excerpt:
        "硅基流动生态合作伙伴 WiseFlow（首席情报官）于 2024 年发布，成为一个受欢迎的 AI 开源项目。两年来，这个项目持续进化，最近因为 OpenClaw 能力，产品架构做了大幅调整，这中间经历了哪些思考与取舍，以下是 WiseFlow 作者赵泽明的讲述。",
      tag: "用户故事",
      date: "2026-03-10",
      href: "https://siliconflow.cn/developer-talk/wd6etweavt2nfbydjsx1a6z8",
      cover: `${IMG}/openclaw-addon.png`,
    },
    {
      id: "a58mvaz20e3bw6qhx8joewaw",
      title: "“龙虾”养成记：OpenClaw 保姆级上手指南",
      excerpt:
        "你的“龙虾”养成了吗？鉴于当前仍有不少用户无法成功安装 OpenClaw，所以我们今天分享一篇由知乎博主“大话数据分析”写的 Windows 版 OpenClaw 安装详细教程，我们还补充了 Mac 版教程，争取帮你快速实现养虾愿望。需要指出的是，OpenClaw 运行时操作权限极大，建议在隔离环境中运行。",
      tag: "用户故事",
      date: "2026-03-04",
      href: "https://siliconflow.cn/developer-talk/a58mvaz20e3bw6qhx8joewaw",
      cover: `${IMG}/openclaw-guide.png`,
    },
    {
      id: "wzj6xzbdvzsytjnqno7fxyp1",
      title: "日消耗 10 亿 Tokens，“AI 暴动级实干家”的四点心得｜开发者说",
      excerpt:
        "最近的 AI 实践依旧热火朝天，不论是 Cowork 还是 OpenClaw，各种各样的 Agents 都实实在在干事了。一个显性变化是，我们讨论 Tokens 消耗量的声音越来越多。以下是日消耗 10 亿量级 Tokens 的“AI 暴动级”实干家胥克谦的自述。",
      tag: "用户故事",
      date: "2026-02-26",
      href: "https://siliconflow.cn/developer-talk/wzj6xzbdvzsytjnqno7fxyp1",
      cover: `${IMG}/billion-tokens.png`,
    },
    {
      id: "wln8c6grxkh11brde838wfxd",
      title: "从云原生到 AI 的跃迁探索之路｜开发者说",
      excerpt:
        "海立， LangChain Ambassador，《LangChain 实战》与《LangGraph 实战》作者。从云原生到 AI，海立的转型轨迹颇具代表性。他的故事里，藏着开发者如何在技术浪潮中保持清醒、将经验迁移到新领域、建立可持续成长路径的答案。今天，他分享了三个务实成长策略给浪潮中的大家。",
      tag: "用户故事",
      date: "2026-02-04",
      href: "https://siliconflow.cn/developer-talk/wln8c6grxkh11brde838wfxd",
      cover: `${IMG}/cloud-native.png`,
    },
    {
      id: "o8zq301umaf89v5bcxyltbav",
      title: "硅基流动 × Next AI Draw.io：20K Star，一句话实现图表绘制",
      excerpt:
        "AI 驱动图表创建工具 Next AI Draw.io 的核心理念是：让图表生成如说话一般自然。现在，Next AI Draw.io 与硅基流动（SiliconFlow）进行了深度技术联动，获得了更强大的模型能力支撑。",
      tag: "技术实践",
      date: "2026-02-02",
      href: "https://siliconflow.cn/developer-talk/o8zq301umaf89v5bcxyltbav",
      cover: `${IMG}/drawio.jpeg`,
    },
    {
      id: "od7wj9rr23p95uhihmhrombp",
      title: "硅基流动“推荐官”计划上线",
      excerpt:
        "为更好回馈广大用户，我们今天正式将国内站的“邀好友送赠金”活动升级为“推荐官”计划，邀好友可获得全平台通用代金券。",
      tag: "市场活动",
      date: "2026-01-15",
      href: "https://siliconflow.cn/developer-talk/od7wj9rr23p95uhihmhrombp",
      cover: `${IMG}/referral.png`,
    },
    {
      id: "zx3caanoshbvxbudsq5x1nbz",
      title: "用户测评｜DeepSeek-OCR，你用了吗？",
      excerpt: "资深开发者亲测：用DeepSeek-OCR解决工业CAD图纸识别痛点",
      tag: "用户测评",
      date: "2025-10-31",
      href: "https://siliconflow.cn/developer-talk/zx3caanoshbvxbudsq5x1nbz",
      cover: `${IMG}/deepseek-ocr.png`,
    },
    {
      id: "nddw0hghm23vbkfcz4y99glc",
      title: "用户故事｜Easy：给女儿做 AI 绘本，沉淀孩子成长的复利",
      excerpt:
        "硅基流动记录每一位 AI 建设者的真实故事，让知识流动、让经验共鸣。",
      tag: "用户故事",
      date: "2025-10-16",
      href: "https://siliconflow.cn/developer-talk/nddw0hghm23vbkfcz4y99glc",
      cover: `${IMG}/easy-story.png`,
    },
    {
      id: "evdjqa744e2bim1wwcrzwix2",
      title: "爆改 Gemini-CLI，用 DeepSeek 也能跑同款命令行",
      excerpt:
        'DeepSeek 版 Gemini-CLI 基于开源 Gemini-CLI 架构，通过 SiliconCloud API 接入 DeepSeek 模型，基本可以"平替"原版 Gemini-CLI，为国内开发者提供高效的 CLI 工具替代方案。',
      tag: "技术实践",
      date: "2025-07-07",
      href: "https://siliconflow.cn/developer-talk/evdjqa744e2bim1wwcrzwix2",
      cover: `${IMG}/gemini-cli.png`,
    },
    {
      id: "swbnccchf5esxedxq01s4vr5",
      title: "【活动已结束】SiliconCloud 一周年，两大惊喜回馈登场",
      excerpt:
        "硅基流动 SiliconCloud 上线一周年，为了回馈用户对 SiliconCloud 的喜爱，我们决定开启两大诚意扶持活动。",
      tag: "平台活动",
      date: "2025-05-31",
      href: "https://siliconflow.cn/developer-talk/swbnccchf5esxedxq01s4vr5",
      cover: `${IMG}/siliconcloud-1yr.png`,
    },
  ],
};

/** 平台活动 filter also matches 市场活动 (verified on live site). */
export function articleMatchesTags(
  tag: TalkPageContent["articles"][number]["tag"],
  selected: string[],
): boolean {
  if (selected.length === 0) return true;
  return selected.some((sel) => {
    if (sel === "平台活动") return tag === "平台活动" || tag === "市场活动";
    return tag === sel;
  });
}

export function resolveTalkArticles(selectedTags: string[]) {
  return TALK_CONTENT.articles.filter((a) =>
    articleMatchesTags(a.tag, selectedTags),
  );
}
