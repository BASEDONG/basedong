import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "硅基流动统一登录",
  description: "欢迎登录 SiliconFlow — 做所有人的 AI。",
  icons: {
    icon: "/assets/auth/shared/favicon.ico",
  },
};

export default function ZhLoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="sf-account-login-root flex min-h-0 flex-1 flex-col bg-white">
      {children}
    </div>
  );
}
