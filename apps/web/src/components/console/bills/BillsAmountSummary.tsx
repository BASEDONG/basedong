import {
  copy,
  formatYuan,
  type AmountSummary,
} from "./content";

interface BillsAmountSummaryProps {
  amounts?: AmountSummary;
}

function Metric({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-[12px] font-medium leading-5 text-[#64748B]">
        {label}
      </div>
      <div
        className={
          accent
            ? "font-Inter text-[24px] font-semibold leading-8 tracking-[-0.144px] text-[#4AABF0]"
            : "font-Inter text-[24px] font-semibold leading-8 tracking-[-0.144px] text-[#1E293B]"
        }
      >
        {formatYuan(value)}
      </div>
    </div>
  );
}

function Op({ children }: { children: string }) {
  return (
    <div className="flex items-center text-[24px] font-semibold leading-8 text-[#94A3B8]">
      {children}
    </div>
  );
}

export function BillsAmountSummary({
  amounts = { bill: 0, charge: 0, discount: 0, coupon: 0 },
}: BillsAmountSummaryProps) {
  return (
    <div className="mb-4 flex gap-6 rounded-[8px] bg-white px-6 py-4">
      <Metric label={copy.billAmount} value={amounts.bill} accent />
      <Op>=</Op>
      <Metric label={copy.chargeAmount} value={amounts.charge} />
      <Op>-</Op>
      <Metric label={copy.discountAmount} value={amounts.discount} />
      <Op>-</Op>
      <Metric label={copy.couponAmount} value={amounts.coupon} />
    </div>
  );
}
