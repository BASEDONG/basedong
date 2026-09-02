import type { Metadata } from "next";
import { VideoPageClient } from "@/components/console/playground-video/VideoPageClient";

export const metadata: Metadata = {
  title: "视频生成 - 八色鸫",
};

export default function PlaygroundVideoPage() {
  return (
    <div className="flex h-dvh min-h-0 flex-1 flex-col overflow-hidden">
      <VideoPageClient />
    </div>
  );
}
