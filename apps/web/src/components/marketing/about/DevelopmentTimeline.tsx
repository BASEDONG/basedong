import Image from "next/image";
import {
  ABOUT_ASSETS,
  ABOUT_COPY,
  TIMELINE_ITEMS,
  type TimelineItem,
} from "./content";

function DesktopRow({ item }: { item: TimelineItem }) {
  const showRock = Boolean(item.rock && item.date === "2024 年 5 月");

  if (item.side === "date-left") {
    return (
      <div className="relative flex items-baseline justify-start">
        <div className="flex-1 pr-[32px] text-right text-[18px] text-slate-600">
          {item.date}
        </div>
        <div className="relative z-20 h-2 w-2 rounded-full border border-[#4AABF0] bg-white">
          {showRock ? (
            <div className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full">
              <Image
                src={ABOUT_ASSETS.timelineRock}
                alt=""
                width={40}
                height={40}
                className="h-full w-full"
              />
            </div>
          ) : null}
        </div>
        <div className="flex-1 pl-[32px] text-[24px] text-[#1e293b]">
          <div className="max-w-[403px]">
            <div className="flex flex-col gap-[6px]">
              {item.events.map((e) => (
                <p key={e}>{e}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-baseline justify-start">
      <div className="flex-1 pr-[32px] text-right text-[24px] text-[#1e293b]">
        {item.events.length > 1 ? (
          <div className="flex flex-col gap-[6px]">
            {item.events.map((e) => (
              <p key={e}>{e}</p>
            ))}
          </div>
        ) : (
          item.events[0]
        )}
      </div>
      <div className="relative z-20 h-2 w-2 rounded-full border border-[#4AABF0] bg-white">
        {showRock ? (
          <div className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full">
            <Image
              src={ABOUT_ASSETS.timelineRock}
              alt=""
              width={40}
              height={40}
              className="h-full w-full"
            />
          </div>
        ) : null}
      </div>
      <div className="flex-1 pl-[32px] text-[18px] text-slate-600">
        <div className="max-w-[403px]">{item.date}</div>
      </div>
    </div>
  );
}

function MobileRow({ item, index }: { item: TimelineItem; index: number }) {
  const showRock = Boolean(item.rock && item.date === "2025 年 6 月");
  // Original: indices 0–4 alternate; from index 5 onward date is always on top
  const dateOnTop = index <= 4 ? item.side === "date-left" : true;

  return (
    <div className="relative flex items-baseline justify-start">
      <div className="relative z-20 mr-[34px] h-2 w-2 rounded-full border border-[#4AABF0] bg-white">
        {showRock ? (
          <div className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full">
            <Image
              src={ABOUT_ASSETS.timelineRock}
              alt=""
              width={40}
              height={40}
              className="h-full w-full"
            />
          </div>
        ) : null}
      </div>
      <div className="flex flex-col">
        {dateOnTop ? (
          <>
            <div className="text-[14px] text-slate-500">{item.date}</div>
            <div className="max-w-[264px] text-[16px] text-slate-800">
              {item.events.length > 1 ? (
                <div className="flex flex-col gap-[6px]">
                  {item.events.map((e) => (
                    <p key={e}>{e}</p>
                  ))}
                </div>
              ) : (
                <p>{item.events[0]}</p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="text-[14px] text-slate-500">
              {item.events.map((e) => (
                <p key={e}>{e}</p>
              ))}
            </div>
            <div className="max-w-[264px] text-[16px] text-slate-800">
              {item.date}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function DevelopmentTimeline() {
  return (
    <div className="relative min-h-[1100px] w-full overflow-hidden bg-[#F7F9FC] max-[1024px]:min-h-[880px]">
      <div
        className="absolute top-0 left-1/2 h-full w-full -translate-x-1/2 bg-[length:100%_auto] bg-[50%_50%] bg-no-repeat opacity-40 max-[1024px]:top-[230px] max-[1024px]:h-[234px]"
        style={{ backgroundImage: `url(${ABOUT_ASSETS.timelineBg})` }}
        aria-hidden
      />
      <section className="relative mx-auto h-full max-w-[1434px] py-12">
        <h3 className="mb-9 text-center text-[48px] text-[#1e293b] max-[1024px]:text-[36px]">
          {ABOUT_COPY.timelineTitle}
        </h3>

        {/* Desktop zigzag — gap 56px */}
        <div className="relative flex w-full flex-col gap-14 max-[1024px]:hidden">
          <div
            className="absolute top-[3%] left-1/2 h-[97%] w-px -translate-x-1/2 bg-slate-300"
            aria-hidden
          />
          {TIMELINE_ITEMS.map((item) => (
            <DesktopRow key={`${item.date}-${item.events[0]}`} item={item} />
          ))}
          <div className="relative flex items-baseline justify-start">
            <div className="flex-1 pr-[32px] text-right text-[18px] text-slate-600" />
            <div className="relative h-8 w-8 rounded-full bg-[#4AABF0]">
              <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
            </div>
            <div className="flex-1 pl-[32px] text-[24px]">
              <div className="max-w-[403px]" />
            </div>
          </div>
        </div>

        {/* Mobile — outer px-24, inner gap-24 */}
        <div className="hidden w-full flex-col items-center px-6 max-[1024px]:flex">
          <div className="relative flex w-full flex-col gap-6">
            <div
              className="absolute top-[3%] left-[1%] h-[97%] w-px bg-slate-300"
              aria-hidden
            />
            {TIMELINE_ITEMS.map((item, index) => (
              <MobileRow
                key={`m-${item.date}-${item.events[0]}`}
                item={item}
                index={index}
              />
            ))}
            <div className="relative flex items-baseline justify-start">
              <div className="relative z-20 mr-[34px] h-2 w-2 rounded-full border border-[#4AABF0] bg-white">
                <div className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4AABF0]">
                  <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
