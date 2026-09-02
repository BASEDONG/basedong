"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { ConsoleShell } from "../shared/ConsoleShell";
import { ApiKeysTable } from "./ApiKeysTable";
import { ApiKeysWarningAlert } from "./ApiKeysWarningAlert";
import { CreateKeyModal } from "./CreateKeyModal";
import { MessageToast } from "./MessageToast";
import { getApiKeysUiCopy } from "./account-ak-ui-copy";
import type { ApiKeyRow } from "./content";
import {
  BackendError,
  createApiKey,
  deleteApiKey,
  fetchApiKeySecret,
  listApiKeys,
  updateApiKeyName,
} from "@/lib/backend/client";
import { getRelayBase } from "@/lib/backend/config";

function formatTs(sec: number) {
  if (!sec) return "—";
  const d = new Date(sec * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function toRow(item: {
  id: number;
  name: string;
  key: string;
  created_time: number;
}): ApiKeyRow {
  return {
    id: String(item.id),
    key: item.key,
    description: item.name,
    createdAt: formatTs(item.created_time),
  };
}

export function ApiKeysPageClient() {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getApiKeysUiCopy(targetLocale), [targetLocale]);
  const [collapsed, setCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [keys, setKeys] = useState<ApiKeyRow[]>([]);
  const [loading, setLoading] = useState(true);
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

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const items = await listApiKeys();
      setKeys(items.map(toRow));
    } catch (err) {
      const msg =
        err instanceof BackendError ? err.message : copy.errors.loadFailed;
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  }, [copy.errors.loadFailed, showToast]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="ak"
      title={copy.pageTitle}
      notificationCount={0}
      textTone="black"
      mainClassName="z-50 min-h-0 flex-1 overflow-y-auto px-5 pb-2.5 pt-2 text-black"
      overlay={
        <>
          <CreateKeyModal
            open={modalOpen}
            copy={copy}
            onClose={() => setModalOpen(false)}
            onCreate={(description) => {
              void (async () => {
                const name = description.trim() || `key-${Date.now()}`;
                try {
                  await createApiKey(name);
                  const items = await listApiKeys();
                  const created =
                    items.find((i) => i.name === name) ?? items[0];
                  if (created) {
                    const secret = await fetchApiKeySecret(created.id);
                    setKeys(
                      items.map((i) =>
                        i.id === created.id
                          ? toRow({ ...i, key: secret })
                          : toRow(i),
                      ),
                    );
                  } else {
                    await reload();
                  }
                  setModalOpen(false);
                  showToast(copy.toasts.createSuccess);
                } catch (err) {
                  const msg =
                    err instanceof BackendError
                      ? err.message
                      : copy.errors.createFailed;
                  showToast(msg, "error");
                }
              })();
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
          {copy.createButtonLabel}
        </button>
      </div>

      <ApiKeysWarningAlert message={copy.warningMessage} />
      <p className="mb-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs leading-5 text-slate-600">
        {copy.relayIntegrationHint(getRelayBase())}
      </p>
      {loading ? (
        <p className="text-sm text-slate-500">{copy.loading}</p>
      ) : (
        <ApiKeysTable
          copy={copy}
          keys={keys}
          onCopied={() => showToast(copy.toasts.copySuccess)}
          onDeleteMismatch={() =>
            showToast(copy.deleteModal.mismatchError, "error")
          }
          onUpdateDescription={(id, description) => {
            void (async () => {
              try {
                await updateApiKeyName(Number(id), description);
                setKeys((list) =>
                  list.map((k) =>
                    k.id === id ? { ...k, description } : k,
                  ),
                );
                showToast(copy.toasts.updateSuccess);
              } catch (err) {
                const msg =
                  err instanceof BackendError
                    ? err.message
                    : copy.errors.updateFailed;
                showToast(msg, "error");
              }
            })();
          }}
          onDelete={(id) => {
            void (async () => {
              try {
                await deleteApiKey(Number(id));
                setKeys((list) => list.filter((k) => k.id !== id));
                showToast(copy.toasts.deleteSuccess);
              } catch (err) {
                const msg =
                  err instanceof BackendError
                    ? err.message
                    : copy.errors.deleteFailed;
                showToast(msg, "error");
              }
            })();
          }}
          onReveal={async (id) => {
            const row = keys.find((k) => k.id === id);
            if (!row || !row.key.includes("*")) return row?.key;
            try {
              const secret = await fetchApiKeySecret(Number(id));
              setKeys((list) =>
                list.map((k) => (k.id === id ? { ...k, key: secret } : k)),
              );
              return secret;
            } catch (err) {
              const msg =
                err instanceof BackendError
                  ? err.message
                  : copy.errors.revealFailed;
              showToast(msg, "error");
              return null;
            }
          }}
        />
      )}
    </ConsoleShell>
  );
}
