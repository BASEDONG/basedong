import { APP_ROUTES } from "@/lib/routes";

export const ASSET = {
  emptyAudio:
    "/assets/console/playground-text-to-speech/images/empty-audio.webp",
} as const;

export const MODEL_OPTIONS = [
  "MOSS-TTSD-v0.5",
  "FunAudioLLM/CosyVoice2-0.5B",
] as const;

export const DEFAULT_MODEL = MODEL_OPTIONS[0];

export const VOICE_OPTIONS = [
  "alex",
  "anna",
  "bella",
  "benjamin",
  "charles",
  "claire",
  "david",
  "diana",
] as const;

export const DEFAULT_VOICE = VOICE_OPTIONS[0];

/** From live combinedFormSchema + uiSchema */
export const SPEED = {
  min: 0.25,
  max: 4,
  step: 0.1,
  default: 1,
} as const;

/** uiSchema gain step is 1 (slider), schema multipleOf 0.1 */
export const GAIN = {
  min: -10,
  max: 10,
  step: 1,
  default: 0,
} as const;

/**
 * Live site rotates suggestion chips from a prompt pool (server + client).
 * Pool collected across sessions for demo fidelity.
 */
export const SUGGESTION_POOL = [
  "Life was like a box of chocolates, you never know what you are gonna get.",
  "在大自然的怀抱中，我们学会了勇敢、坚韧，也发现了真实的自己。背上行囊，去追寻心中的远方，去经历那些让你铭记一生的旅程吧！",
  "Fear can hold you prisoner, hope can set you free. A strong man can save himself, a great man can save another.",
  "八百标兵奔北坡，炮兵并排北边跑，炮兵怕把标兵碰，标兵怕碰炮兵炮。",
  "你站在桥上看风景，看风景的人在楼上看你。明月装饰了你的窗子，你装饰了别人的梦。",
  "作为集合顶尖大模型的一站式云服务平台，八色鸫致力于为开发者提供更快、更便宜、更全面、体验更丝滑的模型API。",
  "The world has kissed my soul with its pain, asking for its return in songs.",
  "家，是一份永远不变的依靠。不论外面的世界多么纷扰，家总是那个让你安心、放松的地方。父母的关爱、孩子的笑脸，都是我们生命中最宝贵的财富。忙碌之余，别忘了停下脚步，回到那个温暖的怀抱，和家人一起享受生活中的点滴温馨。因为，有家才有真正的幸福。",
  "宇宙中任何文明都不能暴露自己的存在，否则就会被其他文明攻击和消灭。",
] as const;

/** Stable default row matching a common live MOSS session */
export const DEFAULT_SUGGESTIONS = [
  SUGGESTION_POOL[0],
  SUGGESTION_POOL[4],
  SUGGESTION_POOL[2],
  SUGGESTION_POOL[5],
] as const;

export function pickSuggestions(count = 4): string[] {
  const pool = [...SUGGESTION_POOL];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = pool[i]!;
    pool[i] = pool[j]!;
    pool[j] = tmp;
  }
  return pool.slice(0, count);
}

export const TERMS_URL = APP_ROUTES.userAgreement;
