import type { Metadata } from "next";
import { TtsPageClient } from "@/components/console/playground-text-to-speech/TtsPageClient";

export const metadata: Metadata = {
  title: "语音 - 八色鸫",
};

export default function PlaygroundTextToSpeechPage() {
  return (
    <div className="flex h-dvh min-h-0 flex-1 flex-col overflow-hidden">
      <TtsPageClient />
    </div>
  );
}
