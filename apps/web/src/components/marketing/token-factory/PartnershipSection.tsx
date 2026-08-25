import { CONSULT_URL, partnershipCards } from "./content";

function BenefitCheck() {
  return (
    <span className="mt-[5px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#EEE7FF]">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path
          d="M2 5.2L4.1 7.2L8 2.8"
          stroke="#8B5CF6"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function HeartHandshakeIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-white"
      aria-hidden="true"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
      <path d="m18 15-2-2" />
      <path d="m15 18-2-2" />
    </svg>
  );
}

function CoinsIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-white"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  );
}

const cardIcons = [HeartHandshakeIcon, CoinsIcon];

export function PartnershipSection() {
  return (
    <section className="w-full bg-white px-4 py-[110px]">
      <h2 className="mb-8 bg-[linear-gradient(180deg,#3A9AE0_9.58%,#4AABF0_50.21%)] bg-clip-text text-center text-[48px] font-semibold leading-[1.5] text-transparent max-[1280px]:text-[38px]">
        多种合作路径
      </h2>

      <div className="mx-auto w-full max-w-[1400px] px-4">
        <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
          {partnershipCards.map((card, index) => {
            const Icon = cardIcons[index];
            return (
              <article
                key={card.title}
                className="group relative overflow-hidden rounded-[20px] border border-[#D7DEE8] bg-white px-[38px] pb-[30px] pt-[34px] max-[1280px]:px-7 max-[1280px]:pb-6 max-[1280px]:pt-7 max-md:px-[22px] max-md:pb-5 max-md:pt-6"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[20px] bg-[linear-gradient(180deg,rgba(124,58,237,0.02)_0%,rgba(124,58,237,0.01)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="relative z-[1]">
                  <h3 className="mb-2 flex items-center gap-2 text-[24px] font-semibold leading-[30px] text-[#1F2937]">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{
                        background:
                          "linear-gradient(321deg, #E848A0 4.65%, #4AABF0 95.94%)",
                      }}
                    >
                      <Icon />
                    </span>
                    <span>{card.title}</span>
                  </h3>
                  <p className="mb-10 text-[18px] leading-[30px] text-slate-500 max-[1280px]:text-[16px] max-[1280px]:leading-7 max-md:text-[14px] max-md:leading-[26px]">
                    {card.description}
                  </p>
                  <div>
                    <p className="text-[16px] font-semibold leading-6 text-slate-400">
                      {card.partnerLabel}
                    </p>
                    <p className="mt-2.5 text-[18px] leading-[30px] text-slate-500">
                      {card.partners}
                    </p>
                  </div>
                  <div className="my-7 h-px w-full bg-[#E9EEF5]" />
                  <div>
                    <h4 className="text-[20px] font-semibold leading-[26px] text-slate-800">
                      价值收益
                    </h4>
                    <div className="mt-[18px] space-y-3.5">
                      {card.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-start gap-2.5">
                          <BenefitCheck />
                          <p className="text-[16px] leading-6 text-slate-600 max-md:text-[14px]">
                            {benefit}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <a
                    href={CONSULT_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex h-[52px] items-center justify-center rounded-[10px] border border-[#4AABF0] px-6 text-[16px] font-semibold text-[#4AABF0] transition-colors duration-300 hover:bg-[#4AABF0] hover:text-white"
                  >
                    {card.cta}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
