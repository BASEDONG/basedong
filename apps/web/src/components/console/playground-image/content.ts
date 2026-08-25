export const pageTitle = "图像生成";

export const ASSET = {
  hero: "/assets/console/playground-image/images/suggestion-hero.png",
  sizeIcons: {
    "1:1": "/assets/console/playground-image/images/image-size-1-1.svg",
    "3:2": "/assets/console/playground-image/images/image-size-3-2.svg",
    "9:16": "/assets/console/playground-image/images/image-size-9-16.svg",
    "3:4": "/assets/console/playground-image/images/image-size-3-4.svg",
    "16:9": "/assets/console/playground-image/images/image-size-16-9.svg",
    "4:3": "/assets/console/playground-image/images/image-size-4-3.svg",
  },
} as const;

export const MODEL_OPTIONS = [
  "Z-Image-Turbo",
  "Z-Image",
  "ERNIE-Image-Turbo",
  "Qwen-Image-Edit-2509",
  "Qwen-Image-Edit",
  "Qwen-Image",
  "Kolors",
] as const;

export type ImageSizeRatio = keyof typeof ASSET.sizeIcons;

export const IMAGE_SIZES: ImageSizeRatio[] = [
  "1:1",
  "3:2",
  "9:16",
  "3:4",
  "16:9",
  "4:3",
];

export const DEFAULT_IMAGE_SIZE: ImageSizeRatio = "3:2";

export const SUGGESTION_PROMPTS = [
  "In a vast, boundless desert, a female warrior stands at the center of the composition. Her figure contrasts sharply with the endless sand dunes, dressed in futuristic, post-apocalyptic armor adorned with sci-fi elements. She turns her head towards the camera, her gaze deep and mysterious, as if concealing a secret. The style of the artwork is inspired by the film Dune, evoking a sense of desolation and future aesthetics. The desert sky is painted in soft hues, with the distant dunes glistening in golden light. The overall tone of the piece is composed and powerful",
  "A British shorthair kitten, dressed in a tracksuit, stands on its hind legs at an airport, looking up curiously at the departure board. The kitten is wearing a mini backpack and a travel hat, with a small suitcase placed beside it. The scene is bustling, with passengers moving around and background announcements being broadcast. The kitten is personified, depicted in a cinematic style with lifelike photo effects",
  "A captivating dark fantasy portrait of a voluptuous korean woman, standing tall with a contemplative expression. Her green eyes sparkle, while her long, wavy blonde hair cascades down her back. Her fair complexion is adorned with delicate freckles, adding to her unique beauty. She wears a white-colored, two-piece satin dress with a deep neckline and linen, accessorized with a stunning necklace and various boho jewelry that accentuates her style. The background is a mix of soft shadows and mysterious darkness, further highlighting the ethereal allure of the subject., portrait photography, dark fantasy, photo",
  "detail Shot,Exaggerated Perspective View,Bottom View,Epic style,Darkness Style,Tattoo Style,ultra detailed high contrast pencil drawing by James Gilleard,Characters in ancient Chinese mythology,Vajra Bodhisattva,aquiline nose,Angry face,strong body,Holding a Buddhist artifact and soul holding banner,there are continuous mountains and temple,Swirling and Twisting Dense Clouds,conceptual art,High Metal Textures,red Black Color,Cinematic Arts,Super Reality,Super High Details and Textures,Very Detailed Textures,Highly Detailed Textures,8K",
] as const;

export const TERMS_URL =
  "https://api-docs.siliconflow.cn/docs/legals/terms-of-service";

export function randomSeed(): number {
  return Math.floor(Math.random() * 10_000_000_000);
}
