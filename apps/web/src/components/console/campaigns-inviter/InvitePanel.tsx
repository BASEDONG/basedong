"use client";

import { ASSET, DEMO_INVITE, inviteOverview } from "./content";

function CopyIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      aria-hidden
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      aria-hidden
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    // demo only
  }
}

function downloadQr() {
  const a = document.createElement("a");
  a.href = ASSET.inviteQr;
  a.download = "invite-qr.png";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function InviteField({
  label,
  value,
  copyLabel,
}: {
  label: string;
  value: string;
  copyLabel: string;
}) {
  return (
    <div className={label === "邀请码" ? "mb-6 w-full" : undefined}>
      <div className="mb-2 text-sm font-semibold">{label}</div>
      <div className="inviter-input-group flex h-8 w-full">
        <input
          readOnly
          value={value}
          className="h-8 min-w-0 flex-1 rounded-l-[6px] border border-r-0 border-slate-300 bg-white px-[11px] text-sm leading-[22px] text-slate-800 outline-none"
        />
        <button
          type="button"
          aria-label={copyLabel}
          onClick={() => void copyText(value)}
          className="flex h-8 shrink-0 cursor-pointer items-center justify-center rounded-r-[6px] border border-slate-300 bg-slate-50 px-[11px] text-[rgb(74,171,240)]"
        >
          <span className="inline-flex w-[10px] items-center justify-center">
            <CopyIcon />
          </span>
        </button>
      </div>
    </div>
  );
}

export function InvitePanel() {
  return (
    <div className="relative h-auto w-full">
      <div
        className="absolute left-[-1px] top-0 h-full w-[calc(100%+1px)]"
        style={{
          backgroundImage: `url(${ASSET.cardBgReverse})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="relative flex w-full items-center gap-10 px-[64px] py-[32px]">
        <div className="flex w-full flex-grow-0 flex-col gap-1">
          <div className="font-semibold">{inviteOverview.title}</div>
          <div>
            <span className="font-semibold">{inviteOverview.leadBold}</span>
            {inviteOverview.leadRest}
          </div>
          <ul className="list-outside list-disc pl-5 text-slate-800">
            {inviteOverview.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="flex w-[460px] shrink-0 gap-8">
          <div className="mt-4 flex w-[140px] flex-col items-center justify-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSET.inviteQr}
              alt="invite qr"
              width={140}
              height={140}
              className="size-[140px]"
            />
            <button
              type="button"
              onClick={downloadQr}
              className="inline-flex h-8 cursor-pointer items-center justify-center gap-2 rounded-[6px] border border-transparent bg-[rgb(74,171,240)] px-[15px] text-sm leading-[21px] text-white"
            >
              <DownloadIcon />
              下载二维码
            </button>
          </div>

          <div className="mt-8 w-full min-w-[220px]">
            <InviteField
              label="邀请码"
              value={DEMO_INVITE.code}
              copyLabel="copy-code"
            />
            <InviteField
              label="邀请链接"
              value={DEMO_INVITE.link}
              copyLabel="copy-link"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
