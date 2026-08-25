import { ASSET, copy } from "./content";

export function InvoiceRecordsEmpty() {
  return (
    <>
      <h2 className="mt-6 text-lg font-semibold text-slate-800">
        {copy.recordsTitle}
      </h2>
      <div className="mt-[10%] flex flex-1 items-start justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ASSET.empty}
          alt=""
          width={320}
          height={320}
          className="size-[320px] object-fill"
        />
      </div>
    </>
  );
}
