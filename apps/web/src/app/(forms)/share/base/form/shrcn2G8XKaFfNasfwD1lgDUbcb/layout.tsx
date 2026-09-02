import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";

const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-sans-sc",
});

export const metadata: Metadata = {
  title: "八色鸫 - 商务需求反馈表",
  icons: {
    icon: "/assets/forms/business/images/feishu.ico",
  },
};

export default function FeishuBusinessFormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${notoSansSc.variable} min-h-dvh w-full`}>
      {children}
    </div>
  );
}
