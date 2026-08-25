"use client";

import { useState } from "react";
import { ASSET, stepCards } from "./content";

export function StepCards() {
  const [claimed, setClaimed] = useState(false);
  const { left, right } = stepCards;

  return (
    <div className="flex gap-6">
      <div
        className="flex h-[240px] w-1/2 items-center justify-between gap-6 rounded-[8px] border border-slate-200 px-8 py-8"
        style={{
          backgroundImage: `url(${ASSET.cardBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex w-full items-center justify-between rounded-[8px] border border-white bg-[rgba(255,255,255,0.3)] px-8 py-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-1 text-xl font-bold text-primary">
              {left.title}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={left.icon}
                alt="auth-icon"
                className="inline-block size-8 h-[22px] w-[26px]"
              />
            </div>
            <div className="text-base font-normal text-slate-800">
              {left.desc}
            </div>
            <span>{left.status}</span>
          </div>
          <div className="w-[128px] shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={left.icon} alt="auth-icon" />
          </div>
        </div>
      </div>

      <div
        className="flex h-[240px] w-1/2 items-center justify-between gap-6 rounded-[8px] border border-slate-200 px-8 py-6"
        style={{
          backgroundImage: `url(${ASSET.cardBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex w-full items-center justify-between rounded-[8px] border border-white bg-[rgba(255,255,255,0.3)] px-8 py-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-1 text-xl font-bold text-primary">
              {right.title}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={right.icon}
                alt="auth-icon"
                className="inline-block size-8 h-[22px] w-[26px]"
              />
            </div>
            <div className="text-base font-normal text-slate-800">
              {right.desc}
            </div>
            <button
              type="button"
              disabled={claimed}
              onClick={() => setClaimed(true)}
              className="inline-flex h-8 min-w-[168px] cursor-pointer items-center justify-center gap-2 self-start rounded-[6px] border border-transparent bg-[rgb(74,171,240)] px-12 text-sm leading-[21px] text-white shadow-[0_2px_0_0_rgba(74,171,240,0.06)] transition-all duration-200 hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {claimed ? right.claimed : right.cta}
            </button>
          </div>
          <div className="w-[128px] shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={right.icon} alt="auth-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
