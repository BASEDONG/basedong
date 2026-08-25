import { ASSET, heroCopy } from "./content";

export function HeroBanner() {
  return (
    <div className="bg relative mb-8 box-content h-[400px] w-full">
      <div
        className="absolute left-0 top-0 h-full w-full rounded-2xl"
        style={{
          backgroundImage:
            "linear-gradient(rgba(211, 203, 254, 0.6) 0%, rgba(243, 243, 253, 0.6) 100%)",
        }}
      />
      <div className="absolute top-0 flex w-full justify-center">
        <div className="flex w-full justify-center">
          <div className="flex-grow-0 pl-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSET.bannerText}
              alt="auth-banner-text"
              className="mt-[100px] h-[76px] max-w-[640px]"
            />
            <div className="flex flex-col gap-4">
              <div className="mt-[20px] text-xl font-bold text-slate-700">
                {heroCopy.subtitle}
                <span className="ml-2">ℹ️</span>
              </div>
              <div className="text-lg text-slate-500">{heroCopy.deadline}</div>
            </div>
            <div className="mt-4 h-1 w-[50px] rounded-[8px] bg-primary-20" />
          </div>
          <div className="w-[8%]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSET.bannerImg}
            alt="auth-banner-img"
            className="block w-[410px] flex-grow-0"
          />
        </div>
      </div>
    </div>
  );
}
