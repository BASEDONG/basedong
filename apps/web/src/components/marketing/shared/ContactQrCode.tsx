"use client";

import { QRCodeSVG } from "qrcode.react";
import { CONTACT_LINKS } from "@/lib/contact-links";

const QR_DISPLAY_SIZE = 96;
const QR_RENDER_SIZE = QR_DISPLAY_SIZE * 2;

type ContactQrCodeProps = {
  platform: keyof typeof CONTACT_LINKS;
};

export function ContactQrCode({ platform }: ContactQrCodeProps) {
  return (
    <div className="box-border h-[116px] w-[116px] rounded-[8px] border border-[#a7a2bc] p-[10px]">
      <QRCodeSVG
        value={CONTACT_LINKS[platform]}
        size={QR_RENDER_SIZE}
        level="M"
        bgColor="#ffffff"
        fgColor="#000000"
        includeMargin={true}
        className="h-[96px] w-[96px]"
      />
    </div>
  );
}
