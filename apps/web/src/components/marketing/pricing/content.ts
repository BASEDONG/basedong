export const ASSET = "/assets/marketing/pricing/images";

export function logoSrc(logoFile?: string, fallbackUrl?: string): string {
  if (logoFile) return `${ASSET}/${logoFile}`;
  return fallbackUrl || "";
}
