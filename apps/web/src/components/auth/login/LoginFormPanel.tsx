"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  ChevronDownIcon,
  MailIcon,
  WeChatIcon,
} from "@/components/auth/shared/icons";
import { cn } from "@/lib/utils";
import { ASSET, COPY, LINKS } from "./content";

export type LoginMode = "phone" | "email";

type LoginFormPanelProps = {
  mode: LoginMode;
};

function PurpleCheckbox({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  id: string;
}) {
  return (
    <button
      type="button"
      id={id}
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative top-[0.2em] inline-block size-4 shrink-0 rounded-[4px] border transition-colors",
        checked
          ? "border-[#4AABF0] bg-[#4AABF0]"
          : "border-slate-300 bg-white",
      )}
    >
      {checked ? (
        <span
          aria-hidden
          className="absolute left-[4.5px] top-[1px] h-[9px] w-[5px] rotate-45 border-b-2 border-r-2 border-white"
        />
      ) : null}
    </button>
  );
}

export function LoginFormPanel({ mode }: LoginFormPanelProps) {
  const [agree, setAgree] = useState(false);
  const [keepLogin, setKeepLogin] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [countryOpen, setCountryOpen] = useState(false);

  function onGetCode() {
    if (countdown > 0) return;
    setCountdown(60);
    const timer = window.setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
  }

  const isPhone = mode === "phone";

  return (
    <section className="w-[350px] max-w-[calc(100vw-40px)] font-[system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,'Noto_Sans',sans-serif] text-slate-800">
      <Image
        src={ASSET.logoBlack}
        alt="八色鸫 basedong"
        width={260}
        height={40}
        className="mx-auto mb-8 block h-auto w-[260px] xl:hidden"
        priority
        unoptimized
      />
      <h2 className="mb-8 text-center text-2xl font-normal leading-9 text-slate-800">
        {COPY.title}
      </h2>

      <form className="text-sm" onSubmit={onSubmit}>
        {isPhone ? (
          <>
            {/* Phone: Ant-style input-group — addon + bordered input */}
            <div className="mb-6 flex h-10 w-full">
              <div className="relative flex h-10 w-[68px] shrink-0 items-center justify-center rounded-l-[8px] border border-r-0 border-slate-300 bg-slate-50 px-[11px]">
                <button
                  type="button"
                  className="flex h-8 w-full items-center justify-center gap-1 text-sm leading-4 text-slate-800"
                  onClick={() => setCountryOpen((v) => !v)}
                  aria-expanded={countryOpen}
                >
                  <span>{COPY.countryCode}</span>
                  <ChevronDownIcon className="size-3 text-slate-400" />
                </button>
                {countryOpen ? (
                  <ul className="absolute left-0 top-full z-20 mt-1 min-w-[80px] rounded-md border border-slate-200 bg-white py-1 shadow-md">
                    <li>
                      <button
                        type="button"
                        className="block w-full px-3 py-1.5 text-left text-sm hover:bg-slate-50"
                        onClick={() => setCountryOpen(false)}
                      >
                        +86
                      </button>
                    </li>
                  </ul>
                ) : null}
              </div>
              <input
                type="tel"
                required
                placeholder={COPY.phonePlaceholder}
                className="h-10 min-w-0 flex-1 rounded-r-[8px] border border-slate-300 bg-white px-[11px] text-base leading-6 text-slate-800 outline-none placeholder:text-zinc-500 focus:z-10 focus:border-[#4AABF0]"
              />
            </div>

            {/* SMS code: input + slate-50 addon */}
            <div className="mb-6 flex h-10 w-full">
              <input
                type="text"
                required
                maxLength={6}
                placeholder={COPY.smsPlaceholder}
                className="h-10 min-w-0 flex-1 rounded-l-[8px] border border-r-0 border-slate-300 bg-white px-[11px] text-base leading-6 text-slate-800 outline-none placeholder:text-zinc-500 focus:z-10 focus:border-[#4AABF0]"
              />
              <div className="flex h-10 w-[95px] shrink-0 items-center justify-center rounded-r-[8px] border border-slate-300 bg-slate-50 px-[11px]">
                <button
                  type="button"
                  onClick={onGetCode}
                  disabled={countdown > 0}
                  className="h-8 whitespace-nowrap p-0 text-sm leading-[22px] text-[#4AABF0] transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {countdown > 0 ? `${countdown}秒后重发` : COPY.getCode}
                </button>
              </div>
            </div>

            <div className="mb-2">
              <input
                type="text"
                placeholder={COPY.invitePlaceholder}
                className="h-10 w-full rounded-[8px] border border-slate-300 bg-white px-[11px] text-base leading-6 text-slate-800 outline-none placeholder:text-zinc-500 focus:border-[#4AABF0]"
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <input
                type="email"
                required
                placeholder={COPY.emailPlaceholder}
                className="h-10 w-full rounded-[8px] border border-slate-300 bg-white px-[11px] text-base leading-6 text-slate-800 outline-none placeholder:text-zinc-500 focus:border-[#4AABF0]"
              />
            </div>
            <div className="mb-2 flex h-10 w-full">
              <input
                type="text"
                required
                maxLength={6}
                placeholder={COPY.emailCodePlaceholder}
                className="h-10 min-w-0 flex-1 rounded-l-[8px] border border-r-0 border-slate-300 bg-white px-[11px] text-base leading-6 text-slate-800 outline-none placeholder:text-zinc-500 focus:z-10 focus:border-[#4AABF0]"
              />
              <div className="flex h-10 w-[95px] shrink-0 items-center justify-center rounded-r-[8px] border border-slate-300 bg-slate-50 px-[11px]">
                <button
                  type="button"
                  onClick={onGetCode}
                  disabled={countdown > 0}
                  className="h-8 whitespace-nowrap p-0 text-sm leading-[22px] text-[#4AABF0] transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {countdown > 0 ? `${countdown}秒后重发` : COPY.getCode}
                </button>
              </div>
            </div>
          </>
        )}

        <div className="mb-2 flex h-8 items-baseline text-sm leading-[22px] text-slate-800">
          <PurpleCheckbox id="sf-agree" checked={agree} onChange={setAgree} />
          <label
            htmlFor="sf-agree"
            className="flex cursor-pointer select-none items-center gap-[5px] pl-2"
          >
            <span>{COPY.agreePrefix}</span>
            <a
              href={LINKS.terms}
              target="_blank"
              rel="noreferrer"
              className="text-[#4AABF0] transition-colors duration-300 hover:opacity-80"
              onClick={(e) => e.stopPropagation()}
            >
              {COPY.termsLabel}
            </a>
            <span>{COPY.and}</span>
            <a
              href={LINKS.privacy}
              target="_blank"
              rel="noreferrer"
              className="text-[#4AABF0] transition-colors duration-300 hover:opacity-80"
              onClick={(e) => e.stopPropagation()}
            >
              {COPY.privacyLabel}
            </a>
          </label>
        </div>

        <button
          type="submit"
          className="bd-gradient-bg mb-2.5 inline-flex h-10 w-full items-center justify-center rounded-[8px] px-[15px] text-base leading-6 text-white shadow-[0_2px_0_0_rgba(74,171,240,0.12)] transition"
        >
          {isPhone ? COPY.registerLogin : COPY.login}
        </button>

        <div className="mb-8 flex h-8 items-center text-sm leading-[22px] text-slate-800">
          <PurpleCheckbox
            id="sf-keep"
            checked={keepLogin}
            onChange={setKeepLogin}
          />
          <label htmlFor="sf-keep" className="cursor-pointer select-none pl-2">
            {COPY.keepLogin}
          </label>
        </div>

        <div className="flex w-full items-center justify-center gap-4">
          <button
            type="button"
            className="flex h-10 flex-1 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-[15px] text-base leading-6 text-slate-800 shadow-[0_2px_0_0_rgba(0,0,0,0.02)] transition hover:border-slate-400"
          >
            <WeChatIcon />
            {COPY.wechatLogin}
          </button>
          {isPhone ? (
            <Link
              href={LINKS.emailLogin}
              className="flex h-10 flex-1 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-[15px] text-base leading-6 text-slate-800 shadow-[0_2px_0_0_rgba(0,0,0,0.02)] transition hover:border-slate-400"
            >
              <MailIcon className="size-4" />
              {COPY.emailLogin}
            </Link>
          ) : (
            <Link
              href={LINKS.phoneLogin}
              className="flex h-10 flex-1 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-[15px] text-base leading-6 text-slate-800 shadow-[0_2px_0_0_rgba(0,0,0,0.02)] transition hover:border-slate-400"
            >
              {COPY.smsLogin}
            </Link>
          )}
        </div>
      </form>
    </section>
  );
}
