import { architectureLayers, TF_ASSETS } from "./content";

function TechBadgeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 2V10M4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14C5.10457 14 6 13.1046 6 12M4 10C5.10457 10 6 10.8954 6 12M12 6C13.1046 6 14 5.10457 14 4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4C10 5.10457 10.8954 6 12 6ZM12 6C12 7.5913 11.3679 9.11742 10.2426 10.2426C9.11742 11.3679 7.5913 12 6 12"
        stroke="#4AABF0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LayerArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-[-26px] z-20 -translate-x-1/2"
    >
      <path
        d="M11.7883 3.78784C11.9055 3.67087 12.0951 3.67075 12.2122 3.78784L18.6125 10.1882C18.7147 10.2908 18.7275 10.4489 18.6506 10.5652L18.6125 10.6121C18.5099 10.7147 18.3512 10.7273 18.2346 10.6501L18.1877 10.6121L12.3 4.72437V19.9998C12.3 20.1653 12.1658 20.2995 12.0002 20.2996C11.8346 20.2996 11.7004 20.1654 11.7004 19.9998V4.72437L10.8469 5.57788L5.81177 10.6121C5.6946 10.729 5.50503 10.7292 5.38794 10.6121C5.27084 10.495 5.27097 10.3054 5.38794 10.1882L11.7883 3.78784Z"
        fill="#030712"
        stroke="#4AABF0"
      />
    </svg>
  );
}

export function TechArchitecture() {
  return (
    <div className="relative w-full overflow-hidden bg-white px-4 py-[110px] max-md:pb-24 max-md:pt-[72px]">
      <div
        className="absolute left-0 top-0 h-full w-full bg-cover bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${TF_ASSETS}/bg-section-3.svg)` }}
        aria-hidden="true"
      />
      <section className="relative z-10">
        <div className="mx-auto w-full max-w-[1400px] px-4">
          <div className="relative overflow-hidden py-[72px] max-[1280px]:py-12 max-md:px-5 max-md:py-7">
            <div className="relative z-10 grid grid-cols-[minmax(320px,480px)_1fr] items-center gap-24 max-[1280px]:grid-cols-1 max-[1280px]:gap-12 max-md:gap-8">
              <div className="max-w-[460px] max-[1280px]:flex max-[1280px]:max-w-full max-[1280px]:flex-col max-[1280px]:items-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4AABF033] bg-[#4AABF01A] px-3 py-[5px] text-[14px] font-semibold leading-none text-[#4AABF0]">
                  <TechBadgeIcon />
                  <span>能力栈</span>
                </div>
                <h2 className="mb-4 text-[48px] font-semibold tracking-[-0.03em] text-[#2B1970] max-[1280px]:text-center max-[1280px]:text-[38px]">
                  <span className="bg-[linear-gradient(180deg,#3A9AE0_9.58%,#4AABF0_50.21%)] bg-clip-text text-transparent">
                    从硬件资源
                  </span>
                  <br className="max-[1280px]:hidden" />
                  <span className="bg-[linear-gradient(180deg,#3A9AE0_9.58%,#4AABF0_50.21%)] bg-clip-text text-transparent">
                    {" "}
                    到可用服务
                  </span>
                </h2>
                <p className="max-w-[577px] text-[18px] text-slate-600 max-[1280px]:max-w-full max-[1280px]:text-center">
                  八色鸫以完整的算力运营栈，帮助各类主流 GPU
                  资源快速形成稳定、可对外交付的{" "}
                  <span className="font-semibold text-[#4AABF0]">Token</span>{" "}
                  能力。
                </p>
              </div>

              <div className="relative mx-auto w-full">
                <div className="relative flex flex-col gap-9">
                  {architectureLayers.map((layer, index) => (
                    <div
                      key={layer.title}
                      className="relative z-10 flex flex-col items-center"
                    >
                      {index > 0 ? <LayerArrow /> : null}
                      <div className="group relative w-full rounded-lg border border-slate-200 bg-white px-4 py-6 backdrop-blur-sm transition-all duration-300 hover:border-[#4AABF0] hover:shadow-[0_12px_32px_rgba(74,171,240,0.12),0_0_0_1px_rgba(74,171,240,0.05)]">
                        <div className="relative z-10 flex items-start gap-4">
                          <div
                            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[20px] leading-none"
                            style={{ backgroundColor: layer.emojiBg }}
                          >
                            {layer.emoji}
                          </div>
                          <div className="min-w-0">
                            <div className="mb-1 text-[20px] font-semibold text-slate-800">
                              {layer.title}
                            </div>
                            <div className="text-[16px] text-slate-500">
                              {layer.subtitle}
                            </div>
                          </div>
                        </div>
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(74,171,240,0.06) 0%, rgba(74,171,240,0) 45%)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
