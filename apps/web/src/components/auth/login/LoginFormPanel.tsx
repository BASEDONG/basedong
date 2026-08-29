"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  ChevronDownIcon,
  MailIcon,
  WeChatIcon,
} from "@/components/auth/shared/icons";
import { login, register, BackendError } from "@/lib/backend/client";
import { APP_ROUTES } from "@/lib/routes";
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
  const router = useRouter();
  const [agree, setAgree] = useState(false);
  const [keepLogin, setKeepLogin] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [countryOpen, setCountryOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (mode === "phone") {
      setError(COPY.phoneBackendHint);
      return;
    }
    if (!agree) {
      setError(COPY.needAgree);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      if (authMode === "register") {
        await register(username.trim(), password);
        await login(username.trim(), password);
      } else {
        await login(username.trim(), password);
      }
      void keepLogin;
      router.push(APP_ROUTES.consoleModels);
    } catch (err) {
      const msg =
        err instanceof BackendError
          ? err.message
          : err instanceof Error
            ? err.message
            : COPY.authFailed;
      setError(msg);
    } finally {
      setBusy(false);
    }
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
            <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
              {COPY.phoneBackendHint}{" "}
              <Link href={LINKS.emailLogin} className="text-[#4AABF0] underline">
                {COPY.emailLogin}
              </Link>
            </p>
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
              </div>
              <input
                type="tel"
                disabled
                placeholder={COPY.phonePlaceholder}
                className="h-10 min-w-0 flex-1 rounded-r-[8px] border border-slate-300 bg-slate-50 px-[11px] text-base leading-6 text-slate-400 outline-none"
              />
            </div>
            <div className="mb-6 flex h-10 w-full">
              <input
                type="text"
                disabled
                maxLength={6}
                placeholder={COPY.smsPlaceholder}
                className="h-10 min-w-0 flex-1 rounded-l-[8px] border border-r-0 border-slate-300 bg-slate-50 px-[11px] text-base leading-6 text-slate-400 outline-none"
              />
              <div className="flex h-10 w-[95px] shrink-0 items-center justify-center rounded-r-[8px] border border-slate-300 bg-slate-50 px-[11px]">
                <button
                  type="button"
                  onClick={onGetCode}
                  disabled
                  className="h-8 whitespace-nowrap p-0 text-sm leading-[22px] text-slate-400"
                >
                  {COPY.getCode}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4 flex gap-4 text-sm">
              <button
                type="button"
                className={cn(
                  "border-b-2 pb-1",
                  authMode === "login"
                    ? "border-[#4AABF0] text-slate-900"
                    : "border-transparent text-slate-500",
                )}
                onClick={() => setAuthMode("login")}
              >
                {COPY.login}
              </button>
              <button
                type="button"
                className={cn(
                  "border-b-2 pb-1",
                  authMode === "register"
                    ? "border-[#4AABF0] text-slate-900"
                    : "border-transparent text-slate-500",
                )}
                onClick={() => setAuthMode("register")}
              >
                {COPY.register}
              </button>
            </div>
            <div className="mb-6">
              <input
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={COPY.usernamePlaceholder}
                className="h-10 w-full rounded-[8px] border border-slate-300 bg-white px-[11px] text-base leading-6 text-slate-800 outline-none placeholder:text-zinc-500 focus:border-[#4AABF0]"
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                required
                autoComplete={
                  authMode === "register" ? "new-password" : "current-password"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={COPY.passwordPlaceholder}
                className="h-10 w-full rounded-[8px] border border-slate-300 bg-white px-[11px] text-base leading-6 text-slate-800 outline-none placeholder:text-zinc-500 focus:border-[#4AABF0]"
              />
            </div>
          </>
        )}

        {error ? (
          <p className="mb-2 text-xs text-red-600" role="alert">
            {error}
          </p>
        ) : null}

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
              className="text-[#4AABF0]"
            >
              {COPY.termsLabel}
            </a>
            <span>{COPY.and}</span>
            <a
              href={LINKS.privacy}
              target="_blank"
              rel="noreferrer"
              className="text-[#4AABF0]"
            >
              {COPY.privacyLabel}
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={busy || isPhone}
          className="mb-3 flex h-10 w-full items-center justify-center rounded-[8px] bg-[#4AABF0] text-base font-medium text-white transition hover:bg-[#3a9ae0] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy
            ? COPY.submitting
            : isPhone
              ? COPY.registerLogin
              : authMode === "register"
                ? COPY.register
                : COPY.login}
        </button>

        {!isPhone ? (
          <div className="mb-6 flex h-8 items-baseline text-sm leading-[22px] text-slate-800">
            <PurpleCheckbox
              id="sf-keep"
              checked={keepLogin}
              onChange={setKeepLogin}
            />
            <label htmlFor="sf-keep" className="cursor-pointer select-none pl-2">
              {COPY.keepLogin}
            </label>
          </div>
        ) : null}

        <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1 opacity-50">
            <WeChatIcon className="size-5" />
            {COPY.wechatLogin}
          </span>
          {isPhone ? (
            <Link
              href={LINKS.emailLogin}
              className="inline-flex items-center gap-1 text-[#4AABF0]"
            >
              <MailIcon className="size-5" />
              {COPY.emailLogin}
            </Link>
          ) : (
            <Link
              href={LINKS.phoneLogin}
              className="inline-flex items-center gap-1 text-[#4AABF0]"
            >
              {COPY.smsLogin}
            </Link>
          )}
        </div>
      </form>
    </section>
  );
}
