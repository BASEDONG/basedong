"use client";

import { useState } from "react";
import { TERMS_URL } from "./content";
import { ChatComposer } from "./ChatComposer";
import { ChatModelBanner } from "./ChatModelBanner";
import { ChatSuggestions } from "./ChatSuggestions";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatWorkspaceProps {
  model: string;
}

export function ChatWorkspace({ model }: ChatWorkspaceProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const send = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content,
    };
    const assistantMsg: Message = {
      id: `a-${Date.now()}`,
      role: "assistant",
      content: `（演示回复）已收到关于「${content}」的提问。此克隆不连接真实模型 API。`,
    };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
  };

  const clear = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <div className="box-border flex h-full min-w-0 flex-1 flex-col gap-1 overflow-hidden">
      <div className="no-scrollbar full box-border flex flex-1 gap-1 overflow-y-auto bg-no-repeat pt-0 pb-2 text-sm">
        <div className="full flex-1 overflow-y-auto">
          <div className="no-scrollbar full box-border flex flex-col bg-no-repeat py-0 text-sm">
            <ChatModelBanner model={model} />
            <div className="chat-messages mt-2 flex-1 scroll-m-0.5 gap-6 overflow-y-auto">
              <div className="chat-list _fxy_md_engine w-full space-y-3 p-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={
                      m.role === "user"
                        ? "ml-auto max-w-[80%] rounded-[8px] bg-slate-100 px-3 py-2 text-sm text-slate-800"
                        : "mr-auto max-w-[80%] rounded-[8px] border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-800"
                    }
                  >
                    {m.content}
                  </div>
                ))}
              </div>
              <div className="hello world h-1" aria-hidden />
            </div>
          </div>
        </div>
      </div>

      <ChatSuggestions
        onPick={(text) => {
          setInput(text);
        }}
        onClear={clear}
      />

      <ChatComposer
        value={input}
        onChange={setInput}
        onSend={() => send()}
      />

      <div className="text-center text-xs text-slate-400">
        内容由人工智能生成，可能不完全准确，仅供参考。请遵守平台
        <a
          href={TERMS_URL}
          target="_blank"
          rel="noreferrer"
          className="mx-1 text-[rgb(108,40,246)] underline-offset-2 hover:underline"
        >
          服务条款
        </a>
        及适用的法律法规
      </div>
    </div>
  );
}
