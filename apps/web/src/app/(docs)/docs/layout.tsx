import type { Metadata } from "next";
import { BRAND } from "@/lib/assets";

export const metadata: Metadata = {
  icons: {
    icon: BRAND.logoMark,
  },
};
export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="sf-docs min-h-full bg-white">{children}</div>;
}
