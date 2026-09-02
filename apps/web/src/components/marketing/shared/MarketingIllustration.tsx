import Image from "next/image";

type MarketingIllustrationProps = {
  src: string;
  className?: string;
  width?: number;
  height?: number;
};

export function MarketingIllustration({
  src,
  className = "h-full w-full object-contain",
  width = 400,
  height = 400,
}: MarketingIllustrationProps) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden
      width={width}
      height={height}
      className={className}
      unoptimized
    />
  );
}
