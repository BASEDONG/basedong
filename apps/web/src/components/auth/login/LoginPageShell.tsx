import { Suspense } from "react";
import { MarketingLanguageSwitcher } from "@/components/marketing/shared/MarketingLanguageSwitcher";
import { LoginBanner } from "./LoginBanner";
import { LoginFormPanel } from "./LoginFormPanel";

export function LoginPageShell() {
  return (
    <div className="sf-account-login relative flex h-full min-h-dvh w-full flex-col overflow-hidden bg-white text-black">
      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        <div className="absolute right-6 top-6 z-10">
          <MarketingLanguageSwitcher />
        </div>
        <LoginBanner />
        <div className="relative z-[1] flex min-h-0 flex-1 flex-col items-center justify-center px-10 lg:px-16">
          <Suspense fallback={null}>
            <LoginFormPanel />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
