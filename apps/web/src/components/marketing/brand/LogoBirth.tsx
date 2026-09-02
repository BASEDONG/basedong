"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getBrandContent } from "./content";

export function LogoBirth() {
  const { locale } = useLocale();
  const { assets, logoBirthTitle, logoBirthBody, playVideoLabel } =
    getBrandContent(locale);
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
      style={{ backgroundImage: `url(${assets.s2bg})` }}
    >
      <section className="sf-brand-w-content flex h-full w-full flex-col pt-[40px] max-[1024px]:items-center max-[1440px]:pt-0">
        <h2 className="mb-[16px] text-[48px] font-normal text-[#1e293b] max-[1024px]:text-center max-[1024px]:text-[36px]">
          {logoBirthTitle}
        </h2>
        <p className="mb-[38px] text-[20px] leading-[30px] text-[#57627F] max-[1024px]:max-w-[282px] max-[1024px]:text-justify">
          {logoBirthBody}
        </p>
        <div className="relative w-full">
          <div className="relative aspect-video w-full overflow-hidden bg-black max-[1024px]:h-[210px] max-[1024px]:max-h-[210px] max-[1024px]:aspect-auto">
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={assets.logoVideo}
              poster={assets.videoCover}
              controls={started}
              playsInline
              preload="metadata"
              onPlay={() => setStarted(true)}
            />
            {!started ? (
              <button
                type="button"
                aria-label={playVideoLabel}
                onClick={handlePlay}
                className="absolute top-1/2 left-1/2 z-[5] h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 cursor-pointer max-[1024px]:h-[50px] max-[1024px]:w-[50px]"
              >
                <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[rgba(0,0,0,0.38)] p-[15%] hover:opacity-[0.85]">
                  <Play className="h-full w-full fill-white text-white" aria-hidden />
                </span>
              </button>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
