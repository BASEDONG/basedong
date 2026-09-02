"use client";



import { useCallback, useState } from "react";

import {

  BackendError,

  playgroundChat,

  type ChatMessage,

} from "@/lib/backend/client";

import type { PlaygroundUiCopy } from "../shared/playground-ui-copy";

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

  copy: PlaygroundUiCopy;

  model: string;

}



export function ChatWorkspace({ copy, model }: ChatWorkspaceProps) {

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  const [sending, setSending] = useState(false);

  const [error, setError] = useState<string | null>(null);



  const send = useCallback(

    async (text?: string) => {

      const content = (text ?? input).trim();

      if (!content || sending) return;

      if (!model.trim()) {

        setError(copy.selectModelFirst);

        return;

      }



      const userMsg: Message = {

        id: `u-${Date.now()}`,

        role: "user",

        content,

      };

      const history: ChatMessage[] = [

        ...messages.map((m) => ({

          role: m.role as "user" | "assistant",

          content: m.content,

        })),

        { role: "user", content },

      ];



      setMessages((prev) => [...prev, userMsg]);

      setInput("");

      setError(null);

      setSending(true);



      try {

        const result = await playgroundChat({

          model,

          messages: history,

        });

        setMessages((prev) => [

          ...prev,

          {

            id: `a-${Date.now()}`,

            role: "assistant",

            content: result.content,

          },

        ]);

      } catch (e) {

        const msg =

          e instanceof BackendError ? e.message : copy.requestFailed;

        setError(msg);

        setMessages((prev) => [

          ...prev,

          {

            id: `a-${Date.now()}`,

            role: "assistant",

            content: `${copy.errorPrefix}${msg}`,

          },

        ]);

      } finally {

        setSending(false);

      }

    },

    [copy, input, messages, model, sending],

  );



  const clear = () => {

    setMessages([]);

    setInput("");

    setError(null);

  };



  return (

    <div className="box-border flex h-full min-w-0 flex-1 flex-col gap-1 overflow-hidden">

      <div className="no-scrollbar full box-border flex flex-1 gap-1 overflow-y-auto bg-no-repeat pt-0 pb-2 text-sm">

        <div className="full flex-1 overflow-y-auto">

          <div className="no-scrollbar full box-border flex flex-col bg-no-repeat py-0 text-sm">

            <ChatModelBanner copy={copy} model={model} />

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

                {sending ? (

                  <div className="mr-auto max-w-[80%] rounded-[8px] border border-dashed border-slate-200 bg-white/60 px-3 py-2 text-sm text-slate-500">

                    {copy.callingRelay}

                  </div>

                ) : null}

              </div>

              <div className="hello world h-1" aria-hidden />

            </div>

          </div>

        </div>

      </div>



      {error ? (

        <p className="px-3 text-sm text-red-600" role="alert">

          {error}

        </p>

      ) : null}



      <ChatSuggestions

        onPick={(text) => {

          setInput(text);

        }}

        onClear={clear}

      />



      <ChatComposer

        value={input}

        onChange={setInput}

        onSend={() => void send()}

        placeholder={copy.promptPlaceholder}

      />



      <div className="text-center text-xs text-slate-400">

        {copy.disclaimerBefore}

        <a

          href={TERMS_URL}

          target="_blank"

          rel="noreferrer"

          className="mx-1 text-[rgb(108,40,246)] underline-offset-2 hover:underline"

        >

          {copy.termsLink}

        </a>

        {copy.disclaimerAfter}

        {copy.disclaimerUsageUnits}

      </div>

    </div>

  );

}


