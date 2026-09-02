"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { TurnstileWidget } from "@/components/auth/shared/TurnstileWidget";
import { MarketingButton } from "@/components/marketing/shared/MarketingButton";
import { BrandLogo } from "@/components/shared/BrandLogo";
import {
  BackendError,
  getPublicAuthStatus,
  login,
  register,
  sendEmailVerification,
} from "@/lib/backend/client";
import { useLocale } from "@/components/shared/LocaleProvider";
import { APP_ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import {
  AUTH_LIMITS,
  getAuthCopy,
  LINKS,
  type AuthCopy,
} from "./content";

const CODE_COOLDOWN_SECONDS = 30;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClassName =
  "h-12 w-full rounded-[12px] border border-[#E3E8F1] bg-white px-3.5 text-base leading-6 text-[var(--sf-ink)] outline-none placeholder:text-[var(--sf-muted)] transition focus:border-[var(--sf-primary)] focus:ring-2 focus:ring-[var(--sf-tint)]";

function AgreeCheckbox({
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
          ? "border-[var(--sf-primary)] bg-[var(--sf-primary)]"
          : "border-[#E3E8F1] bg-white",
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

function errMessage(err: unknown, copy: AuthCopy): string {
  if (err instanceof BackendError) return err.message;
  if (err instanceof Error) return err.message;
  return copy.authFailed;
}

function validateEmail(email: string, copy: AuthCopy): string | null {
  if (!email) return copy.needEmailForCode;
  if (email.length > AUTH_LIMITS.emailMax) return copy.emailTooLong;
  if (!EMAIL_RE.test(email)) return copy.emailInvalid;
  return null;
}

function validateUsername(username: string, copy: AuthCopy): string | null {
  if (!username) return copy.needUsername;
  if (username.length > AUTH_LIMITS.usernameMax) return copy.usernameTooLong;
  return null;
}

function validateRegisterPassword(
  password: string,
  copy: AuthCopy,
): string | null {
  if (
    password.length < AUTH_LIMITS.passwordMin ||
    password.length > AUTH_LIMITS.passwordMax
  ) {
    return copy.passwordLength;
  }
  return null;
}

export function LoginFormPanel() {
  const router = useRouter();
  const { targetLocale } = useLocale();
  const COPY = getAuthCopy(targetLocale);
  const [agree, setAgree] = useState(false);
  const [keepLogin, setKeepLogin] = useState(true);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  /** Login: username or email */
  const [account, setAccount] = useState("");
  /** Register-only */
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [codeCooldown, setCodeCooldown] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const [statusReady, setStatusReady] = useState(false);
  const [statusFailed, setStatusFailed] = useState(false);
  const [turnstileEnabled, setTurnstileEnabled] = useState(false);
  const [turnstileSiteKey, setTurnstileSiteKey] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);

  const loginTabRef = useRef<HTMLButtonElement>(null);
  const registerTabRef = useRef<HTMLButtonElement>(null);
  const [tabIndicator, setTabIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const status = await getPublicAuthStatus();
        if (cancelled) return;
        const siteKey = status.turnstile_site_key?.trim() ?? "";
        setTurnstileEnabled(!!status.turnstile_check && !!siteKey);
        setTurnstileSiteKey(siteKey);
        setStatusReady(true);
      } catch {
        if (cancelled) return;
        setStatusFailed(true);
        setError(COPY.statusLoadFailed);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [COPY.statusLoadFailed]);

  useEffect(() => {
    if (codeCooldown <= 0) return;
    const id = window.setTimeout(
      () => setCodeCooldown((s) => Math.max(0, s - 1)),
      1000,
    );
    return () => window.clearTimeout(id);
  }, [codeCooldown]);

  useLayoutEffect(() => {
    const el =
      authMode === "login" ? loginTabRef.current : registerTabRef.current;
    if (!el) return;
    setTabIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [authMode]);

  function resetTurnstile() {
    setTurnstileToken("");
    setTurnstileKey((k) => k + 1);
  }

  function switchAuthMode(next: "login" | "register") {
    if (next === authMode) return;
    setError(null);
    setInfo(null);
    if (next === "register") {
      const trimmed = account.trim();
      if (trimmed.includes("@")) {
        setEmail(trimmed);
      } else if (trimmed) {
        setUsername(trimmed);
      }
    } else {
      setAccount(username.trim() || email.trim());
      setVerificationCode("");
    }
    setAuthMode(next);
  }

  function requireTurnstile(): boolean {
    if (turnstileEnabled && !turnstileToken) {
      setError(COPY.needTurnstile);
      return false;
    }
    return true;
  }

  async function onSendCode() {
    const trimmedEmail = email.trim();
    const emailErr = validateEmail(trimmedEmail, COPY);
    if (emailErr) {
      setError(emailErr);
      return;
    }
    if (!requireTurnstile()) return;
    setSendingCode(true);
    setError(null);
    setInfo(null);
    try {
      await sendEmailVerification(trimmedEmail, turnstileToken || undefined);
      setInfo(COPY.codeSent);
      setCodeCooldown(CODE_COOLDOWN_SECONDS);
      resetTurnstile();
    } catch (err) {
      setError(errMessage(err, COPY));
    } finally {
      setSendingCode(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (statusFailed || !statusReady) {
      setError(COPY.statusLoadFailed);
      return;
    }
    if (!agree) {
      setError(COPY.needAgree);
      return;
    }
    if (!requireTurnstile()) return;

    if (authMode === "register") {
      const trimmedUsername = username.trim();
      const trimmedEmail = email.trim();
      const usernameErr = validateUsername(trimmedUsername, COPY);
      if (usernameErr) {
        setError(usernameErr);
        return;
      }
      const passwordErr = validateRegisterPassword(password, COPY);
      if (passwordErr) {
        setError(passwordErr);
        return;
      }
      const emailErr = validateEmail(trimmedEmail, COPY);
      if (emailErr) {
        setError(emailErr);
        return;
      }
      if (!verificationCode.trim()) {
        setError(COPY.needCode);
        return;
      }
    } else {
      if (!account.trim()) {
        setError(COPY.needAccount);
        return;
      }
      if (!password) {
        setError(COPY.authFailed);
        return;
      }
    }

    setBusy(true);
    setError(null);
    setInfo(null);
    try {
      if (authMode === "register") {
        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();
        await register({
          username: trimmedUsername,
          password,
          email: trimmedEmail,
          verificationCode: verificationCode.trim(),
          turnstile: turnstileToken || undefined,
        });
        switchAuthMode("login");
        setAccount(trimmedUsername);
        resetTurnstile();
        setInfo(COPY.registerSuccessLogin);
        void keepLogin;
        return;
      }

      await login(account.trim(), password, turnstileToken || undefined);
      void keepLogin;
      router.push(APP_ROUTES.consoleModels);
    } catch (err) {
      setError(errMessage(err, COPY));
      resetTurnstile();
    } finally {
      setBusy(false);
    }
  }

  const isRegister = authMode === "register";
  const submitDisabled = busy || !statusReady || statusFailed;

  return (
    <section className="w-full max-w-[28rem] text-[var(--sf-ink)]">
      <BrandLogo
        size="hero"
        className="mx-auto mb-8 block xl:hidden"
        priority
        alt={COPY.brandName}
      />
      <h2 className="mb-8 text-center text-3xl font-normal leading-10 text-[var(--sf-ink)]">
        {COPY.title}
      </h2>

      <form className="text-base" onSubmit={onSubmit} noValidate>
        <div className="relative mb-4 flex w-fit gap-4 text-base">
          <button
            ref={loginTabRef}
            type="button"
            className={cn(
              "pb-1 transition-colors",
              authMode === "login"
                ? "text-[var(--sf-ink)]"
                : "text-[var(--sf-muted)]",
            )}
            onClick={() => switchAuthMode("login")}
          >
            {COPY.login}
          </button>
          <button
            ref={registerTabRef}
            type="button"
            className={cn(
              "pb-1 transition-colors",
              authMode === "register"
                ? "text-[var(--sf-ink)]"
                : "text-[var(--sf-muted)]",
            )}
            onClick={() => switchAuthMode("register")}
          >
            {COPY.register}
          </button>
          <span
            aria-hidden
            className="absolute bottom-0 h-0.5 bg-[var(--sf-primary)] transition-[left,width] duration-200 ease-out"
            style={{
              left: tabIndicator.left,
              width: tabIndicator.width,
            }}
          />
        </div>

        <div className="mb-2">
          <div
            key={authMode}
            className="animate-in fade-in duration-200"
          >
            {isRegister ? (
              <>
                <div className="mb-4">
                  <input
                    type="text"
                    name="username"
                    autoComplete="username"
                    maxLength={AUTH_LIMITS.usernameMax}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={COPY.usernamePlaceholder}
                    className={inputClassName}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    maxLength={AUTH_LIMITS.passwordMax}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={COPY.passwordPlaceholder}
                    className={inputClassName}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    maxLength={AUTH_LIMITS.emailMax}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={COPY.emailPlaceholder}
                    className={inputClassName}
                  />
                </div>
                <div className="mb-4 flex gap-2">
                  <input
                    type="text"
                    name="verificationCode"
                    autoComplete="one-time-code"
                    maxLength={AUTH_LIMITS.codeLength}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder={COPY.codePlaceholder}
                    className={cn(inputClassName, "min-w-0 flex-1")}
                  />
                  <MarketingButton
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={
                      sendingCode ||
                      codeCooldown > 0 ||
                      !statusReady ||
                      statusFailed
                    }
                    onClick={() => void onSendCode()}
                    className="h-12 shrink-0 px-3 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {sendingCode
                      ? COPY.sendingCode
                      : codeCooldown > 0
                        ? COPY.resendCode(codeCooldown)
                        : COPY.sendCode}
                  </MarketingButton>
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <input
                    type="text"
                    name="account"
                    autoComplete="username"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    placeholder={COPY.accountPlaceholder}
                    className={inputClassName}
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={COPY.passwordLoginPlaceholder}
                    className={inputClassName}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        {turnstileEnabled && turnstileSiteKey ? (
          <div className="mb-4 flex justify-center">
            <TurnstileWidget
              key={turnstileKey}
              siteKey={turnstileSiteKey}
              onVerify={setTurnstileToken}
              onExpire={() => setTurnstileToken("")}
            />
          </div>
        ) : null}

        {info ? (
          <p className="mb-2 text-xs text-[var(--sf-primary)]" role="status">
            {info}
          </p>
        ) : null}

        {error ? (
          <p className="mb-2 text-xs text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <div className="mb-2 flex h-8 items-baseline text-base leading-[22px] text-[var(--sf-ink)]">
          <AgreeCheckbox id="bd-agree" checked={agree} onChange={setAgree} />
          <label
            htmlFor="bd-agree"
            className="flex cursor-pointer select-none items-center gap-[5px] pl-2"
          >
            <span>{COPY.agreePrefix}</span>
            <a
              href={LINKS.terms}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--sf-primary)]"
            >
              {COPY.termsLabel}
            </a>
          </label>
        </div>

        <MarketingButton
          type="submit"
          variant="primary"
          size="sm"
          disabled={submitDisabled}
          className="mb-3 h-12 w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy
            ? COPY.submitting
            : authMode === "register"
              ? COPY.register
              : COPY.login}
        </MarketingButton>

        <div className="mb-6 flex h-8 items-baseline text-base leading-[22px] text-[var(--sf-ink)]">
          <AgreeCheckbox
            id="bd-keep"
            checked={keepLogin}
            onChange={setKeepLogin}
          />
          <label htmlFor="bd-keep" className="cursor-pointer select-none pl-2">
            {COPY.keepLogin}
          </label>
        </div>
      </form>
    </section>
  );
}
