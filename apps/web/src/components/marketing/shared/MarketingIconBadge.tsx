import type { LucideIcon } from "lucide-react";

const SIZE = {
  sm: { box: "h-8 w-8", icon: 16, radius: "rounded-lg" },
  md: { box: "h-9 w-9", icon: 22, radius: "rounded-md" },
  lg: { box: "h-[38px] w-[38px]", icon: 26, radius: "rounded-lg" },
  xl: { box: "h-11 w-11", icon: 32, radius: "rounded-[10px]" },
} as const;

type MarketingIconBadgeProps = {
  icon: LucideIcon;
  size?: keyof typeof SIZE;
  bg?: string;
  color?: string;
  className?: string;
};

export function MarketingIconBadge({
  icon: Icon,
  size = "md",
  bg,
  color = "#4AABF0",
  className = "",
}: MarketingIconBadgeProps) {
  const spec = SIZE[size];

  return (
    <div
      className={`flex shrink-0 items-center justify-center ${spec.box} ${spec.radius} ${className}`}
      style={bg ? { backgroundColor: bg } : undefined}
      aria-hidden="true"
    >
      <Icon size={spec.icon} strokeWidth={2} color={color} />
    </div>
  );
}
