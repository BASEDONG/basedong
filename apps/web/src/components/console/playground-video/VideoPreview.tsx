"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface VideoPreviewProps {
  src: string;
  poster?: string;
}

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** Lightweight stand-in for live xgplayer chrome (no native controls). */
export function VideoPreview({ src, poster }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hover, setHover] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setPlaying(false);
    setCurrent(0);
    setDuration(0);
    setFailed(false);
  }, [src]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v || failed) return;
    if (v.paused) {
      void v.play().catch(() => setFailed(true));
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const showChrome = !failed && (hover || !playing);

  return (
    <div
      className="mp-video-container relative h-full w-full min-w-[200px] overflow-hidden rounded-[8px] border-[2px] border-slate-400 bg-black p-0"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <video
        ref={videoRef}
        key={src}
        src={src}
        poster={poster}
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-contain"
        onClick={toggle}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          const v = e.currentTarget;
          setDuration(v.duration);
          setFailed(false);
        }}
        onError={() => setFailed(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      {failed ? (
        <div className="absolute inset-0 z-[6] flex items-center justify-center bg-black text-sm text-white">
          <div className="text-center">
            <div className="mb-5">Audio/video is not supported</div>
            <button
              type="button"
              className="cursor-pointer text-[#fa1f41]"
              onClick={() => {
                setFailed(false);
                videoRef.current?.load();
              }}
            >
              Please Try <span className="px-[3px]">Refresh</span>
            </button>
          </div>
        </div>
      ) : null}

      {/* Center start / pause affordance (xgplayer-start style) */}
      {!playing && !failed ? (
        <button
          type="button"
          aria-label="play"
          onClick={toggle}
          className="absolute top-1/2 left-1/2 z-[5] flex size-[70px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white"
        >
          <svg viewBox="0 0 24 24" className="ml-1 size-10 fill-white" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      ) : null}

      {/* Bottom controls (xgplayer-controls gradient) */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-10 h-12 bg-[linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.37),rgba(0,0,0,0.75),rgba(0,0,0,0.75))] transition-opacity duration-500",
          showChrome ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="absolute inset-x-2.5 top-2 flex h-10 items-center justify-between">
          <div className="relative z-[1] flex items-center">
            <button
              type="button"
              aria-label={playing ? "pause" : "play"}
              onClick={toggle}
              className="flex h-10 w-7 cursor-pointer items-center justify-center text-white/80"
            >
              {playing ? (
                <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
                  <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <span className="ml-4 min-w-10 text-sm leading-10 whitespace-nowrap text-white">
              {formatTime(current)}
              {duration > 0 ? ` / ${formatTime(duration)}` : ""}
            </span>
          </div>

          <div className="relative z-[1] flex flex-row-reverse items-center">
            <button
              type="button"
              aria-label="fullscreen"
              onClick={() => {
                const box = videoRef.current?.parentElement;
                if (!box) return;
                if (document.fullscreenElement) {
                  void document.exitFullscreen();
                } else {
                  void box.requestFullscreen();
                }
              }}
              className="flex h-10 w-7 cursor-pointer items-center justify-center text-white/80"
            >
              <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="absolute top-[-20px] right-0 left-0 px-0 py-[5px]">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            aria-label="seek"
            onChange={(e) => {
              const t = Number(e.target.value);
              const v = videoRef.current;
              if (v) v.currentTime = t;
              setCurrent(t);
            }}
            className="sf-video-progress h-5 w-full cursor-pointer appearance-none bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}
