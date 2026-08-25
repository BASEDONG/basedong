import Link from "next/link";
import Image from "next/image";
import { logoRow1, logoRow2, logoRow3, partnersBg } from "./content";
import { APP_ROUTES } from "@/lib/routes";

/** Calibrated from original clone, then slowed for readability (Row2 stays faster than Row1). */
const MARQUEE_SLOWDOWN = 2;
const MARQUEE_SEC_PER_LOGO_FORWARD = (40 / 18) * MARQUEE_SLOWDOWN;
const MARQUEE_SEC_PER_LOGO_REVERSE = (45 / 26) * MARQUEE_SLOWDOWN;

function partnerLogoAlt(src: string) {
  const name = src.split("/").pop()?.replace(/\.svg$/, "").replace(/-/g, " ");
  return name ? `${name} logo` : "Partner logo";
}

function MarqueeRow({
  logos,
  reverse = false,
}: {
  logos: string[];
  reverse?: boolean;
}) {
  const loop = [...logos, ...logos];
  const secPerLogo = reverse
    ? MARQUEE_SEC_PER_LOGO_REVERSE
    : MARQUEE_SEC_PER_LOGO_FORWARD;
  const durationSec = logos.length * secPerLogo;
  return (
    <div className="mb-4 overflow-hidden">
      <div
        className={`flex w-max gap-4 ${reverse ? "sf-partners-marquee-reverse" : "sf-partners-marquee"}`}
        style={
          {
            animationDuration: `${durationSec}s`,
            "--partners-marquee-duration": `${durationSec}s`,
          } as React.CSSProperties
        }
      >
        {loop.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="float-left flex h-20 w-[185px] shrink-0 items-center justify-center rounded-lg bg-white/70 px-3 shadow-sm"
          >
            <Image
              src={src}
              alt={partnerLogoAlt(src)}
              width={160}
              height={56}
              className="h-auto max-h-14 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PartnersAndCta() {
  return (
    <div
      className="w-full bg-cover bg-no-repeat py-[88px]"
      style={{ backgroundImage: `url(${partnersBg})` }}
    >
      <h3 className="mb-12 px-3.5 text-center text-[32px] font-bold md:mb-16 md:text-[48px]">
        众多客户与生态伙伴
      </h3>

      <div className="mb-16">
        <MarqueeRow logos={logoRow1} />
        <MarqueeRow logos={logoRow2} reverse />
        <MarqueeRow logos={logoRow3} />
      </div>

      <div className="mx-auto flex max-w-[900px] flex-col items-center justify-center gap-8 px-6 md:flex-row md:gap-16">
        <div className="text-center">
          <p className="mb-5 text-[20px] font-medium md:text-[24px]">几分钟即可开通模型 API</p>
          <Link
            href={APP_ROUTES.consoleAccountAk}
            className="bd-gradient-bg inline-flex h-14 min-w-[160px] items-center justify-center rounded-[12px] px-8 text-lg text-white"
          >
            开始试用
          </Link>
        </div>
        <div className="text-center">
          <p className="mb-5 text-[20px] font-medium md:text-[24px]">需要专属方案？联系我们</p>
          <Link
            href={APP_ROUTES.formBusiness}
            className="inline-flex h-14 min-w-[160px] items-center justify-center rounded-[12px] border border-[#4AABF0] bg-white px-8 text-lg text-[#4AABF0]"
          >
            提交需求
          </Link>
        </div>
      </div>
    </div>
  );
}
