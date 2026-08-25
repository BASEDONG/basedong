import type { Metadata } from "next";
import { BRAND } from "@/lib/assets";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "硅基流动 SiliconFlow - 致力于成为全球领先的 AI 能力提供商",
  description:
    "硅基流动（SiliconFlow）专注于提供高效能、低成本的多品类 AI 模型服务，助力开发者和企业聚焦产品创新。",
  icons: {
    icon: BRAND.logoMark,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
