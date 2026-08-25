import { productParagraphs } from "./content";

export function ProductIntro() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[24px] font-semibold leading-[32px] tracking-[-0.14px] text-[#1e293b]">
        产品说明
      </h3>
      <div className="pl-5 text-[14px] leading-[24px] text-[#1e293b]">
        {productParagraphs.map((p, i) => (
          <li key={i} className={i === 0 ? "mb-2" : undefined}>
            {p.prefix}
            <span className="font-medium">{p.highlight}</span>
            {p.suffix}
          </li>
        ))}
      </div>
    </div>
  );
}
