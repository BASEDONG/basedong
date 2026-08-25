import { ASSET, benefitCards } from "./content";

export function BenefitsSection() {
  return (
    <div className="mt-12">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ASSET.text2}
        alt="inviter-banner-text"
        className="mx-auto mb-[20px] h-[56px]"
      />
      <div className="flex justify-center gap-[40px]">
        {benefitCards.map((card) => (
          <div
            key={card.title}
            className="h-[240px] w-[33%] rounded-[16px] border border-[rgb(224,208,251)]"
            style={{
              backgroundImage: `url(${ASSET.cardBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex flex-col items-center pt-[48px]">
              <div className="mb-[16px] flex size-[72px] items-center justify-center rounded-[8px] bg-[var(--sf-cloud-primary-10-solid)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.icon} alt="inviter-banner-img" />
              </div>
              <div className="text-xl font-semibold text-[rgb(88,28,135)]">
                {card.title}
              </div>
              <div className="text-slate-500">
                {card.multiLine ? (
                  <div>
                    <div>{card.lines[0]}</div>
                    <div className="flex justify-center text-xs text-slate-500">
                      {card.lines[1]}
                    </div>
                  </div>
                ) : (
                  card.lines[0]
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
