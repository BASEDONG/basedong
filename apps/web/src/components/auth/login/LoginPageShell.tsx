import { LanguageSwitcher } from "./LanguageSwitcher";
import { LoginBanner } from "./LoginBanner";
import { LoginFormPanel, type LoginMode } from "./LoginFormPanel";

type LoginPageShellProps = {
  mode: LoginMode;
};

export function LoginPageShell({ mode }: LoginPageShellProps) {
  return (
    <div className="sf-account-login relative flex h-full min-h-dvh w-full overflow-hidden bg-white text-black">
      <div
        className="pointer-events-none fixed bottom-0 right-0 z-0 hidden h-[100vh] w-screen bg-[url('/assets/auth/login/images/auth-bg-rb.svg')] bg-[length:auto] bg-[position:100%_100%] bg-no-repeat opacity-65 lg:block"
        aria-hidden
      />
      <LanguageSwitcher />
      <LoginBanner />
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col items-center justify-center">
        <LoginFormPanel mode={mode} />
      </div>
    </div>
  );
}
