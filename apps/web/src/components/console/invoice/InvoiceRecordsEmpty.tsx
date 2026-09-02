import { ASSET } from "./content";
import type { InvoiceUiCopy } from "./invoice-ui-copy";

interface InvoiceRecordsEmptyProps {
  copy: InvoiceUiCopy;
}

export function InvoiceRecordsEmpty({ copy }: InvoiceRecordsEmptyProps) {
  return (
    <div className="mt-6">
      <div className="mb-4 text-base font-medium text-slate-800">
        {copy.recordsTitle}
      </div>
      <div className="flex flex-col items-center justify-center py-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ASSET.empty}
          alt=""
          width={240}
          height={240}
          className="mb-4 h-[240px] w-[240px] object-contain"
        />
      </div>
    </div>
  );
}
