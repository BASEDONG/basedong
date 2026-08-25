type PartnerSectionIntroProps = {
  label: string;
  title: string;
  subtitle: string;
  light?: boolean;
  titleClassName?: string;
  subtitleClassName?: string;
};

export function PartnerSectionIntro({
  label,
  title,
  subtitle,
  light = false,
  titleClassName,
  subtitleClassName,
}: PartnerSectionIntroProps) {
  return (
    <>
      <p className="mb-[18px] text-[14px] font-bold text-[#4AABF0] max-[960px]:text-center">
        {label}
      </p>
      <h2
        className={`mb-[18px] text-[40px] font-bold max-[960px]:text-center max-[960px]:text-[32px] ${
          light ? "text-white" : titleClassName ?? "text-[#1e293b]"
        }`}
      >
        {title}
      </h2>
      <p
        className={`text-[16px] leading-6 text-[#667085] max-[960px]:text-center ${
          light ? "text-white/90" : ""
        } ${subtitleClassName ?? ""}`}
      >
        {subtitle}
      </p>
    </>
  );
}
