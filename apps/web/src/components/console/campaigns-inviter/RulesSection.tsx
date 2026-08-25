import { ASSET, rulesHtml } from "./content";

export function RulesSection() {
  return (
    <div className="mt-12 rounded-[16px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ASSET.text4}
        alt="inviter-banner-text"
        className="mx-auto my-[16px] h-[56px]"
      />
      <div
        className="inviter-rules-md rounded-[16px] px-14 py-8"
        style={{
          backgroundImage: `url(${ASSET.cardBgReverse})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "repeat",
        }}
        dangerouslySetInnerHTML={{ __html: rulesHtml }}
      />
    </div>
  );
}
