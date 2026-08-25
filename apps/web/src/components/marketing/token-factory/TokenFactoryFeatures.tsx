import Image from "next/image";
import { featureCards } from "./content";

export function TokenFactoryFeatures() {
  return (
    <section className="w-full bg-white px-4 pb-[110px]">
      <h2 className="bg-[linear-gradient(180deg,#3A9AE0_9.58%,#4AABF0_50.21%)] bg-clip-text text-center text-[48px] font-semibold leading-[1.5] text-transparent max-[1280px]:text-[38px]">
        稳定、可扩展的 Token 产能
      </h2>
      <h2 className="mb-10 text-center text-[24px] font-semibold text-black max-[1280px]:text-[18px]">
        让硬件投入持续变成可计量的 AI 生产力
      </h2>

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-4 justify-items-center gap-6 px-4 max-[1280px]:grid-cols-2 max-md:grid-cols-1">
        {featureCards.map((card) => (
          <article
            key={card.title}
            className="group relative box-border h-[419px] w-full max-w-[332px] overflow-hidden rounded-2xl border px-6 pb-7 pt-12 transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)] max-[1280px]:max-w-full"
            style={{ borderColor: card.border, backgroundColor: card.bg }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0)_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <Image
              src={card.image}
              alt=""
              width={160}
              height={120}
              className="mx-auto mb-6 block h-[120px] w-[160px] origin-center select-none object-contain transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
            />
            <div className="mb-7 flex items-center gap-3">
              <div
                className="mt-0.5 h-9 w-9 shrink-0 rounded-md bg-center bg-no-repeat bg-[length:22px_22px]"
                style={{
                  backgroundColor: card.iconBg,
                  backgroundImage: `url(${card.icon})`,
                }}
              />
              <h3 className="text-[19px] font-semibold leading-[1.45] text-slate-800">
                {card.title}
              </h3>
            </div>
            <p className="text-[14px] leading-[1.7] text-slate-500">
              {card.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
