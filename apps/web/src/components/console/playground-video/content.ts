import { APP_ROUTES } from "@/lib/routes";

const ROOT =
  "/assets/console/playground-video" as const;

export const ASSET = {
  videoI2V: `${ROOT}/videos/suggestion-hero.mp4`,
  videoT2V: `${ROOT}/videos/suggestion-hero-t2v.mp4`,
  posterI2V: `${ROOT}/images/suggestion-poster-i2v.jpg`,
  posterT2V: `${ROOT}/images/suggestion-poster-t2v.jpg`,
  sizeIcons: {
    "16:9": `${ROOT}/images/image-size-16-9.svg`,
    "9:16": `${ROOT}/images/image-size-9-16.svg`,
    "1:1": `${ROOT}/images/image-size-1-1.svg`,
  },
} as const;

export const MODEL_OPTIONS = [
  "Wan2.2-I2V-A14B",
  "Wan2.2-T2V-A14B",
] as const;

export type VideoModel = (typeof MODEL_OPTIONS)[number];

export const DEFAULT_MODEL: VideoModel = "Wan2.2-I2V-A14B";

export function isI2VModel(model: string): boolean {
  return model.includes("I2V");
}

export type VideoSizeRatio = keyof typeof ASSET.sizeIcons;

export const VIDEO_SIZES: { ratio: VideoSizeRatio; value: string }[] = [
  { ratio: "16:9", value: "1280x720" },
  { ratio: "9:16", value: "720x1280" },
  { ratio: "1:1", value: "960x960" },
];

export const DEFAULT_VIDEO_SIZE: VideoSizeRatio = "16:9";

export const DEFAULT_NEGATIVE_PROMPT =
  "色调艳丽,过曝,静态,细节模糊不清,字幕,风格,作品,画作,画面,静止,整体发灰,最差质量,低质量,JPEG压缩残留,丑陋的,残缺的,多余的手指,画得不好的手部,画得不好的脸部,畸形的,毁容的,形态畸形的肢体,手指融合,静止不动的画面,杂乱的背景,三条腿,背景人很多,倒着走";

export const SUGGESTION_PROMPTS = [
  "A young woman in a traditional Mongolian dress is peeking through a sheer white curtain, her face showing a mix of curiosity and apprehension. The woman has long black hair styled in two braids, adorned with white beads, and her eyes are wide with a hint of surprise. Her dress is a vibrant blue with intricate gold embroidery, and she wears a matching headband with a similar design. The background is a simple white curtain, which creates a sense of mystery and intrigue.ith long brown hair and light skin smiles at another woman with long blonde hair. The woman with brown hair wears a black jacket and has a small, barely noticeable mole on her right cheek. The camera angle is a close-up, focused on the woman with brown hair’s face. The lighting is warm and natural, likely from the setting sun, casting a soft glow on the scene. The scene appears to be real-life footage",
  "The waves crash against the jagged rocks of the shoreline, sending spray high into the air.The rocks are a dark gray color, with sharp edges and deep crevices. The water is a clear blue-green, with white foam where the waves break against the rocks. The sky is a light gray, with a few white clouds dotting the horizon.",
  "A clear, turquoise river flows through a rocky canyon, cascading over a small waterfall and forming a pool of water at the bottom.The river is the main focus of the scene, with its clear water reflecting the surrounding trees and rocks. The canyon walls are steep and rocky, with some vegetation growing on them. The trees are mostly pine trees, with their green needles contrasting with the brown and gray rocks. The overall tone of the scene is one of peace and tranquility.",
  "A man with graying hair, a beard, and a gray shirt looks down and to his right, then turns his head to the left. The camera angle is a close-up, focused on the man's face. The lighting is dim, with a greenish tint. The scene appears to be real-life footage. Step",
] as const;

export const TERMS_URL = APP_ROUTES.userAgreement;

export function randomSeed(): number {
  return Math.floor(Math.random() * 10_000_000_000);
}

export function videoSrcForModel(model: string): string {
  return isI2VModel(model) ? ASSET.videoI2V : ASSET.videoT2V;
}

export function posterSrcForModel(model: string): string {
  return isI2VModel(model) ? ASSET.posterI2V : ASSET.posterT2V;
}
