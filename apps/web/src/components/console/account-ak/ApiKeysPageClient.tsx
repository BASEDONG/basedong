"use client";

import { useCallback, useState } from "react";
import { ConsoleShell } from "../shared/ConsoleShell";
import { ApiKeysTable } from "./ApiKeysTable";
import { ApiKeysWarningAlert } from "./ApiKeysWarningAlert";
import { CreateKeyModal } from "./CreateKeyModal";
import { MessageToast } from "./MessageToast";
import {
  createButtonLabel,
  deleteModalCopy,
  initialKeys,
  pageTitle,
  toasts,
  type ApiKeyRow,
} from "./content";

function formatNow() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function mockKey() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let body = "";
  for (let i = 0; i < 40; i++) {
    body += chars[Math.floor(Math.random() * chars.length)];
  }
  return `sk-${body}`;
}

export function ApiKeysPageClient() {
  const [collapsed, setCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [keys, setKeys] = useState<ApiKeyRow[]>(initialKeys);
  const [toast, setToast] = useState<{
    message: string;
    type?: "success" | "error";
  } | null>(null);

  const showToast = useCallback(
    (message: string, type: "success" | "error" = "success") => {
      setToast({ message, type });
    },
    [],
  );

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="ak"
      title={pageTitle}
      notificationCount={0}
      textTone="black"
      mainClassName="z-50 min-h-0 flex-1 overflow-y-auto px-5 pb-2.5 pt-2 text-black"
      overlay={
        <>
          <CreateKeyModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onCreate={(description) => {
              setKeys((list) => [
                {
                  id: `mock-${Date.now()}`,
                  key: mockKey(),
                  description,
                  createdAt: formatNow(),
                },
                ...list,
              ]);
              setModalOpen(false);
              showToast(toasts.createSuccess);
            }}
          />
          <MessageToast
            open={toast !== null}
            type={toast?.type ?? "success"}
            message={toast?.message ?? ""}
            onClose={() => setToast(null)}
          />
        </>
      }
    >
      <div className="mb-4 flex justify-between">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="bd-gradient-bg inline-flex h-10 cursor-pointer items-center justify-center rounded-[12px] border border-transparent px-[15px] text-base font-normal leading-6 text-white transition-opacity hover:opacity-90"
        >
          {createButtonLabel}
        </button>
      </div>

      <ApiKeysWarningAlert />
      <ApiKeysTable
        keys={keys}
        onCopied={() => showToast(toasts.copySuccess)}
        onDeleteMismatch={() =>
          showToast(deleteModalCopy.mismatchError, "error")
        }
        onUpdateDescription={(id, description) => {
          setKeys((list) =>
            list.map((k) => (k.id === id ? { ...k, description } : k)),
          );
          showToast(toasts.updateSuccess);
        }}
        onDelete={(id) => {
          setKeys((list) => list.filter((k) => k.id !== id));
          showToast(toasts.deleteSuccess);
        }}
      />
    </ConsoleShell>
  );
}
