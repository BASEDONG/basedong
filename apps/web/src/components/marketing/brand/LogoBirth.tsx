"use client";

import { useRef, useState } from "react";
import { BRAND_ASSETS, BRAND_COPY } from "./content";

function PlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      width="28"
      height="40"
      viewBox="3 -4 28 40"
      aria-hidden
    >
      <path
        fill="#fff"
        transform="scale(0.0320625 0.0320625)"
        d="M576,363L810,512L576,661zM342,214L576,363L576,661L342,810z"
      />
    </svg>
  );
}

export function LogoBirth() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  function handlePlay() {
    const video = videoRef.current;
    if (!video) return;
    void video.play();
    setStarted(true);
  }

  return (
    <div
      className="flex min-h-[1050px] w-full items-center justify-center bg-no-repeat bg-[length:100%_100.1%] px-[14px] max-[1024px]:min-h-[750px]"
      style={{ backgroundImage: `url(${BRAND_ASSETS.s2bg})` }}
    >
      <section className="sf-brand-w-content flex h-full w-full flex-col pt-[40px] max-[1024px]:items-center max-[1434px]:pt-0">
        <h2 className="mb-[16px] text-[48px] font-normal text-[#1e293b] max-[1024px]:text-center max-[1024px]:text-[36px]">
          {BRAND_COPY.logoBirthTitle}
        </h2>
        <p className="mb-[38px] text-[20px] leading-[30px] text-[#57627F] max-[1024px]:max-w-[282px] max-[1024px]:text-justify">
          {BRAND_COPY.logoBirthBody}
        </p>
        {/* Match live XGPlayer: class has max-w-[996px] but player CSS forces width 100% of w-content */}
        <div className="relative w-full">
          <div className="relative aspect-video w-full overflow-hidden bg-black max-[1024px]:h-[210px] max-[1024px]:max-h-[210px] max-[1024px]:aspect-auto">
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={BRAND_ASSETS.logoVideo}
              poster={BRAND_ASSETS.videoCover}
              controls={started}
              playsInline
              preload="metadata"
              onPlay={() => setStarted(true)}
            />
            {!started ? (
              <button
                type="button"
                aria-label="播放视频"
                onClick={handlePlay}
                className="absolute top-1/2 left-1/2 z-[5] h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 cursor-pointer max-[1024px]:h-[50px] max-[1024px]:w-[50px]"
              >
                <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[rgba(0,0,0,0.38)] p-[15%] hover:opacity-[0.85]">
                  <PlayIcon />
                </span>
              </button>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
