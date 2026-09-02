import type { Metadata } from "next";
import { BRAND } from "@/lib/assets";
import { getMarketingPageMetadata } from "@/lib/marketing-page-metadata";
import { staticPageMetadata } from "@/lib/static-page-metadata";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { ClientLocaleProvider } from "@/components/shared/ClientLocaleProvider";
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
  ...staticPageMetadata((locale) => getMarketingPageMetadata("home", locale)),
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
      <body className="min-h-full flex flex-col">
        <ClientLocaleProvider>{children}</ClientLocaleProvider>
      </body>
    </html>
  );
}
