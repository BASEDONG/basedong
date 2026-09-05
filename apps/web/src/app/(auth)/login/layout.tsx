import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getLoginPageMetadata } from "@/lib/auth-page-metadata";
import { BRAND } from "@/lib/assets";
import { staticPageMetadata } from "@/lib/static-page-metadata";

export const metadata: Metadata = {
  ...staticPageMetadata(getLoginPageMetadata),
  icons: {
    icon: BRAND.logoMark,
  },
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="sf-account-login-root flex min-h-0 flex-1 flex-col bg-white">
      {children}
    </div>
  );
}
