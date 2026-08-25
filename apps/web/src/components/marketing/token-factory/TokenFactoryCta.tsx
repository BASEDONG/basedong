import Link from "next/link";
import { ArrowForwardIcon } from "@/components/marketing/shared/icons";
import { CONSULT_URL } from "./content";

export function TokenFactoryCta() {
  return (
    <div className="bg-[#4AABF0]">
      <section className="relative isolate overflow-hidden bg-[#4AABF0] px-4 py-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgb(110, 41, 245) 0%, rgb(123, 53, 247) 38%, rgb(142, 60, 250) 66%, rgb(163, 51, 255) 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, rgba(0,0,0,0) 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, rgba(0,0,0,0) 1px)",
            backgroundSize: "58px 58px",
          }}
          aria-hidden="true"
        />

        <div className="relative z-[1] mx-auto flex min-h-[460px] max-w-[1650px] flex-col items-center justify-center px-6 text-center">
          <h2 className="mb-4 text-[48px] font-semibold leading-[1.3] text-white max-[1280px]:text-[38px] max-[960px]:text-[28px]">
            把算力变成可交付的 Token 产能
          </h2>
          <p className="mb-10 max-w-[720px] text-[18px] leading-[1.75] text-white/90 max-[960px]:text-[16px]">
            若您已有 GPU 资源，并希望建立 Token
            服务与变现能力，欢迎与我们进一步沟通。
          </p>
          <Link
            href={CONSULT_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex h-[62px] items-center justify-center gap-3.5 rounded-[14px] bg-[linear-gradient(90deg,#3A9AE0_0%,#4AABF0_100%)] px-[34px] text-[20px] font-semibold text-white shadow-[0_18px_40px_rgba(54,24,127,0.30)] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(54,24,127,0.38)] max-md:h-[52px] max-md:px-[22px] max-md:text-[16px]"
          >
            <span>获取算力运营方案</span>
            <ArrowForwardIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
