"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { localizeBackendError } from "@/lib/backend/localize-error";
import {
  batchDeleteApiKeys,
  createApiKey,
  deleteApiKey,
  fetchApiKeySecret,
  fetchApiKeySecretsBatch,
  listApiKeys,
  setApiKeyStatus,
  updateApiKeyName,
  type ApiKeyWriteInput,
  type BackendApiKey,
} from "@/lib/backend/client";
import { getRelayBase } from "@/lib/backend/config";
import { ConsoleShell } from "../shared/ConsoleShell";
import { MessageToast } from "../shared/MessageToast";
import { CONSOLE_PRIMARY_BTN, CONSOLE_PRIMARY_BTN_COMPACT } from "../shared/console-ui";
import { ApiKeysTable } from "./ApiKeysTable";
import { ApiKeysWarningAlert } from "./ApiKeysWarningAlert";
import { CreateKeyModal } from "./CreateKeyModal";
import { getApiKeysUiCopy } from "./account-ak-ui-copy";
import {
  API_KEYS_PAGE_SIZE,
  API_KEY_STATUS_DISABLED,
  API_KEY_STATUS_ENABLED,
  type ApiKeyRow,
} from "./content";

function formatTs(sec: number) {
  if (!sec) return "—";
  const d = new Date(sec * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function toRow(item: BackendApiKey): ApiKeyRow {
  return {
    id: String(item.id),
    key: item.key,
    description: item.name,
    createdAt: formatTs(item.created_time),
    status: item.status ?? 1,
    usedQuota: item.used_quota ?? 0,
    remainQuota: item.remain_quota ?? 0,
    unlimitedQuota: Boolean(item.unlimited_quota),
    expiredTime: item.expired_time ?? -1,
    group: item.group ?? "",
    modelLimits: item.model_limits ?? "",
    allowIps: item.allow_ips ?? "",
    accessedAt: formatTs(item.accessed_time ?? 0),
  };
}

export function ApiKeysPageClient() {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getApiKeysUiCopy(targetLocale), [targetLocale]);
  const formatError = useCallback(
    (err: unknown, fallback: string) =>
      localizeBackendError(targetLocale, err, fallback),
    [targetLocale],
  );

  const [collapsed, setCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [keys, setKeys] = useState<ApiKeyRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [draftKeyword, setDraftKeyword] = useState("");
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
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
      const result = await listApiKeys({
        page,
        size: API_KEYS_PAGE_SIZE,
        keyword,
      });
      setKeys(result.items.map(toRow));
      setTotal(result.total);
      setSelected(new Set());
    } catch (err) {
      showToast(formatError(err, copy.errors.loadFailed), "error");
    } finally {
      setLoading(false);
    }
  }, [copy.errors.loadFailed, formatError, keyword, page, showToast]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const totalPages = Math.max(1, Math.ceil(total / API_KEYS_PAGE_SIZE) || 1);

  const onSearch = () => {
    setPage(1);
    setKeyword(draftKeyword.trim());
  };

  const onBatchCopy = async () => {
    const ids = [...selected].map(Number).filter((n) => Number.isFinite(n));
    if (ids.length === 0) return;
    try {
      const secrets = await fetchApiKeySecretsBatch(ids);
      const lines = ids.map((id) => secrets[id]).filter(Boolean);
      await navigator.clipboard.writeText(lines.join("\n"));
      showToast(copy.toasts.copySuccess);
    } catch (err) {
      showToast(
        formatError(err, copy.errors.batchFailed ?? copy.errors.revealFailed),
        "error",
      );
    }
  };

  const onBatchDelete = async () => {
    const ids = [...selected].map(Number).filter((n) => Number.isFinite(n));
    if (ids.length === 0) return;
    try {
      await batchDeleteApiKeys(ids);
      showToast(
        copy.toasts.batchDeleteSuccess ?? copy.toasts.deleteSuccess,
      );
      await reload();
    } catch (err) {
      showToast(
        formatError(err, copy.errors.batchFailed ?? copy.errors.deleteFailed),
        "error",
      );
    }
  };

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="ak"
      title={copy.pageTitle}
      textTone="black"
      mainClassName="min-h-0 flex-1 overflow-y-auto px-5 pb-2.5 pt-2 text-black"
      overlay={
        <>
          <CreateKeyModal
            open={modalOpen}
            copy={copy}
            onClose={() => setModalOpen(false)}
            onCreate={(input: ApiKeyWriteInput) => {
              void (async () => {
                try {
                  await createApiKey(input);
                  setModalOpen(false);
                  showToast(copy.toasts.createSuccess);
                  await reload();
                } catch (err) {
                  showToast(
                    formatError(err, copy.errors.createFailed),
                    "error",
                  );
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
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className={CONSOLE_PRIMARY_BTN}
        >
          {copy.createButtonLabel}
        </button>
        <input
          value={draftKeyword}
          onChange={(e) => setDraftKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch();
          }}
          placeholder={copy.searchPlaceholder ?? "Search"}
          className="h-10 min-w-[200px] flex-1 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-[rgb(74,171,240)] sm:max-w-[280px]"
        />
        <button
          type="button"
          onClick={onSearch}
          className={CONSOLE_PRIMARY_BTN_COMPACT}
        >
          {copy.searchSubmit ?? "Search"}
        </button>
        {selected.size > 0 ? (
          <>
            <span className="text-xs text-slate-500">
              {(copy.selectedCount ?? ((n) => `${n}`))(selected.size)}
            </span>
            <button
              type="button"
              onClick={() => void onBatchCopy()}
              className={CONSOLE_PRIMARY_BTN_COMPACT}
            >
              {copy.batchCopy ?? "Copy"}
            </button>
            <button
              type="button"
              onClick={() => void onBatchDelete()}
              className="inline-flex h-8 items-center rounded-[12px] border border-red-200 bg-red-50 px-3 text-xs text-red-700"
            >
              {copy.batchDelete ?? "Delete"}
            </button>
          </>
        ) : null}
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
          selected={selected}
          onSelectedChange={setSelected}
          page={page}
          totalPages={totalPages}
          total={total}
          onPageChange={setPage}
          onCopied={() => showToast(copy.toasts.copySuccess)}
          onDeleteMismatch={() =>
            showToast(copy.deleteModal.mismatchError, "error")
          }
          onToggleStatus={(id, enable) => {
            void (async () => {
              try {
                await setApiKeyStatus(
                  Number(id),
                  enable ? API_KEY_STATUS_ENABLED : API_KEY_STATUS_DISABLED,
                );
                showToast(copy.toasts.updateSuccess);
                await reload();
              } catch (err) {
                showToast(
                  formatError(err, copy.errors.updateFailed),
                  "error",
                );
              }
            })();
          }}
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
                showToast(
                  formatError(err, copy.errors.updateFailed),
                  "error",
                );
              }
            })();
          }}
          onDelete={(id) => {
            void (async () => {
              try {
                await deleteApiKey(Number(id));
                showToast(copy.toasts.deleteSuccess);
                await reload();
              } catch (err) {
                showToast(formatError(err, copy.errors.deleteFailed), "error");
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
              showToast(formatError(err, copy.errors.revealFailed), "error");
              return null;
            }
          }}
        />
      )}
    </ConsoleShell>
  );
}
