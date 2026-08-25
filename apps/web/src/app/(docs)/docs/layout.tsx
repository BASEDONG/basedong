import type { Metadata } from "next";
import { BRAND } from "@/lib/assets";

export const metadata: Metadata = {
  title: "平台简介",
  description:
    "SiliconFlow 平台简介，了解硅基流动大模型云服务的核心能力与产品矩阵。",
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
