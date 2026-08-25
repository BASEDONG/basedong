import { SubmitArrowIcon } from "./icons";

interface TalkSubmitCtaProps {
  title: string;
  label: string;
  href: string;
}

export function TalkSubmitCta({ title, label, href }: TalkSubmitCtaProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#4AABF0] px-[16px] py-[40px]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #4AABF0 0%, #5DCDE8 38%, #E848A0 66%, #E848A0 100%)",
          backgroundSize: "180% 180%",
        }}
      />
      <div className="pointer-events-none absolute inset-[-20%]">
        <div className="absolute left-[-10%] top-[-18%] h-[620px] w-[620px] rounded-full bg-white/10 blur-[120px]" />
        <div className="absolute bottom-[-26%] right-[-12%] h-[680px] w-[680px] rounded-full bg-white/10 blur-[140px]" />
        <div className="absolute left-[38%] top-[20%] h-[460px] w-[460px] rounded-full bg-[#ffffff]/[0.07] blur-[120px]" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
          maskImage:
            "radial-gradient(circle at center, black 0%, rgba(0,0,0,0.92) 46%, rgba(0,0,0,0.55) 72%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 0%, rgba(0,0,0,0.92) 46%, rgba(0,0,0,0.55) 72%, transparent 100%)",
        }}
      />
      <div className="relative z-[1] mx-auto flex min-h-[150px] max-w-[1440px] items-center justify-center gap-[72px] px-[24px] text-center max-[720px]:min-h-[180px] max-[720px]:flex-col max-[720px]:gap-[24px] max-[720px]:px-0">
        <h2 className="text-[36px] font-semibold leading-[1.25] text-white max-[1280px]:text-[32px] max-[720px]:text-[24px]">
          {title}
        </h2>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex h-[48px] items-center justify-center gap-[12px] rounded-[10px] border border-white/65 px-[28px] text-[18px] font-semibold text-white transition-all duration-500 ease-out hover:-translate-y-[2px] hover:bg-white/10 max-[720px]:h-[44px] max-[720px]:px-[22px] max-[720px]:text-[15px]"
        >
          <span>{label}</span>
          <span className="transition-transform duration-500 ease-out group-hover:translate-x-[6px]">
            <SubmitArrowIcon className="h-[20px] w-[20px]" />
          </span>
        </a>
      </div>
    </section>
  );
}
