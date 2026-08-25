import { capabilityCards } from "./content";
import { cn } from "@/lib/utils";

export function ProductCapabilities() {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="text-[24px] font-semibold leading-[32px] tracking-[-0.144px] text-[#1e293b]">
        产品能力
      </p>
      <div className="grid grid-cols-2 gap-10">
        {capabilityCards.map((card) => (
          <div
            key={card.title}
            className={cn(
              "flex flex-col gap-4 rounded-[12px] p-6",
              card.bg,
              card.padRight && "pr-0",
            )}
          >
            <p className="text-[20px] font-semibold leading-[28px] tracking-[-0.1px] text-[#1e293b]">
              {card.title}
            </p>
            <ul className="list-disc text-[16px] font-normal leading-[28px] text-[#475569]">
              {card.items.map((item) => (
                <li key={item} className="ms-6 leading-[28px]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="text-right text-sm font-semibold text-slate-500">
        *即将上线功能
      </div>
    </div>
  );
}
