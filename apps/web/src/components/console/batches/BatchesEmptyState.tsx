import { ASSET } from "./content";

export function BatchesEmptyState() {
  return (
    <div className="mb-10">
      <div className="mt-[10%] flex flex-1 items-start justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ASSET.empty}
          alt=""
          width={320}
          height={320}
          className="h-auto w-80 max-w-full"
        />
      </div>
    </div>
  );
}
