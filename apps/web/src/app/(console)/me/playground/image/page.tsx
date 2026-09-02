import type { Metadata } from "next";
import { ImagePageClient } from "@/components/console/playground-image/ImagePageClient";

export const metadata: Metadata = {
  title: "图像生成 - 八色鸫",
};

export default function PlaygroundImagePage() {
  return (
    <div className="flex h-dvh min-h-0 flex-1 flex-col overflow-hidden">
      <ImagePageClient />
    </div>
  );
}
