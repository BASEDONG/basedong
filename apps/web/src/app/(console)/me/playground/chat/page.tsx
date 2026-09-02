import type { Metadata } from "next";
import { ChatPageClient } from "@/components/console/playground-chat/ChatPageClient";

export const metadata: Metadata = {
  title: "对话 - 八色鸫",
};

export default function PlaygroundChatPage() {
  return (
    <div className="flex h-dvh min-h-0 flex-1 flex-col overflow-hidden">
      <ChatPageClient />
    </div>
  );
}
