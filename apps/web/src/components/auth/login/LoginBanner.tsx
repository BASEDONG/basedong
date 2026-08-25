import Image from "next/image";
import { ASSET, COPY } from "./content";

export function LoginBanner() {
  return (
    <div className="relative hidden min-h-0 flex-1 lg:block">
      <div className="absolute inset-0 bg-[url('/assets/auth/login/images/login.png')] bg-cover bg-center bg-no-repeat text-white">
        <div className="absolute inset-0 bg-black/30" />
        <Image
          src={ASSET.logoWhite}
          alt="八色鸫 basedong"
          width={260}
          height={42}
          className="absolute left-[56px] top-[56px] h-auto w-[260px]"
          priority
          unoptimized
        />
        <section className="absolute left-[56px] top-[170px] text-[48px] font-semibold leading-[72px]">
          <h1>{COPY.brandName}</h1>
          <p>{COPY.tagline}</p>
          <div className="mt-6 text-[28px] leading-[42px]">
            <p>{COPY.feature1}</p>
            <p>
              {COPY.feature2Lead}{" "}
              <span className="mx-3">{COPY.feature2Mid}</span>{" "}
              {COPY.feature2Tail}
            </p>
          </div>
        </section>
        <section className="absolute bottom-[120px] left-[56px] text-[48px] leading-[52px]">
          <p className="mb-1.5 text-[48px] font-semibold text-[#02F6F7]">
            {COPY.claim1}{" "}
          </p>
          <p className="mb-1.5 flex items-start text-[48px] font-semibold text-[#02F6F7]">
            {COPY.claim2}
            <span className="ml-1.5 text-[14px] leading-[30px] text-white">
              *
            </span>
          </p>
          <p className="text-[28px] font-semibold leading-[52px] text-white">
            {COPY.claimUsers}
          </p>
        </section>
        <footer className="absolute bottom-[56px] left-[56px] flex items-center gap-[3px] text-[18px] text-white/40">
          {COPY.footnote}
        </footer>
      </div>
    </div>
  );
}
