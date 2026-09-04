"use client";

import { useCallback, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { ConsoleEmptyState } from "../shared/ConsoleEmptyState";
import { formatConsoleQuota } from "../shared/format-quota";
import type { ApiKeysUiCopy } from "./account-ak-ui-copy";
import {
  API_KEY_STATUS_DISABLED,
  API_KEY_STATUS_ENABLED,
  API_KEY_STATUS_EXHAUSTED,
  API_KEY_STATUS_EXPIRED,
  type ApiKeyRow,
} from "./content";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { EditKeyModal } from "./EditKeyModal";
import { CopyIcon, EyeIcon, EyeInvisibleIcon } from "./icons";

const antFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

interface ApiKeysTableProps {
  copy: ApiKeysUiCopy;
  keys: ApiKeyRow[];
  selected: Set<string>;
  onSelectedChange: (next: Set<string>) => void;
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
  onDelete: (id: string) => void;
  onUpdateDescription: (id: string, description: string) => void;
  onCopied: () => void;
  onDeleteMismatch: () => void;
  onToggleStatus?: (id: string, enable: boolean) => void;
  onReveal?: (id: string) => Promise<string | null | undefined>;
}

function maskKey(key: string) {
  if (key.length <= 8) return "*".repeat(Math.max(key.length, 8));
  return `${key.slice(0, 4)}${"*".repeat(key.length - 8)}${key.slice(-4)}`;
}

function statusLabel(copy: ApiKeysUiCopy, status: number): string {
  if (status === API_KEY_STATUS_ENABLED) {
    return copy.table.statusEnabled ?? "Enabled";
  }
  if (status === API_KEY_STATUS_EXPIRED) {
    return copy.table.statusExpired ?? "Expired";
  }
  if (status === API_KEY_STATUS_EXHAUSTED) {
    return copy.table.statusExhausted ?? "Exhausted";
  }
  if (status === API_KEY_STATUS_DISABLED) {
    return copy.table.statusDisabled ?? "Disabled";
  }
  return String(status);
}

export function ApiKeysTable({
  copy,
  keys,
  selected,
  onSelectedChange,
  page,
  totalPages,
  total,
  onPageChange,
  onDelete,
  onUpdateDescription,
  onCopied,
  onDeleteMismatch,
  onToggleStatus,
  onReveal,
}: ApiKeysTableProps) {
  const { targetLocale } = useLocale();
  const [revealedAll, setRevealedAll] = useState(false);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(() => new Set());
  const [pendingDelete, setPendingDelete] = useState<ApiKeyRow | null>(null);
  const [pendingEdit, setPendingEdit] = useState<ApiKeyRow | null>(null);

  const toggleAll = useCallback(() => {
    void (async () => {
      const next = !revealedAll;
      if (next && onReveal) {
        await Promise.all(keys.map((k) => onReveal(k.id)));
      }
      setRevealedAll(next);
    })();
  }, [keys, onReveal, revealedAll]);

  const deleteConfirmSuffix = (key: string) => key.slice(-4);

  const isRevealed = useCallback(
    (id: string) => revealedAll || revealedIds.has(id),
    [revealedAll, revealedIds],
  );

  const toggleRow = useCallback(
    (id: string) => {
      void (async () => {
        if (onReveal) await onReveal(id);
        setRevealedIds((prev) => {
          const next = new Set(prev);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return next;
        });
      })();
    },
    [onReveal],
  );

  const copyKey = useCallback(
    async (row: ApiKeyRow) => {
      try {
        let value = row.key;
        if (onReveal && value.includes("*")) {
          const secret = await onReveal(row.id);
          if (secret) value = secret;
        }
        await navigator.clipboard.writeText(value);
        onCopied();
      } catch {
        // ignore
      }
    },
    [onCopied, onReveal],
  );

  const allSelected =
    keys.length > 0 && keys.every((k) => selected.has(k.id));

  const toggleSelectAll = () => {
    if (allSelected) {
      onSelectedChange(new Set());
      return;
    }
    onSelectedChange(new Set(keys.map((k) => k.id)));
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectedChange(next);
  };

  return (
    <>
      <div
        className="w-full overflow-hidden rounded-t-[8px] bg-white"
        style={{ fontFamily: antFont }}
      >
        <div className="w-full overflow-x-auto">
          <table
            className="w-full border-separate border-spacing-0 text-sm leading-[22px] text-[rgb(30,41,59)]"
            style={{ minWidth: 960 }}
          >
            <thead>
              <tr>
                <th className="h-[55px] rounded-tl-[8px] border-b border-[rgb(226,232,240)] bg-[rgb(248,250,252)] p-4">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    aria-label="select-all"
                  />
                </th>
                <th className="h-[55px] border-b border-[rgb(226,232,240)] bg-[rgb(248,250,252)] p-4 text-left text-sm font-semibold">
                  <button
                    type="button"
                    aria-label={revealedAll ? "eye" : "eye-invisible"}
                    onClick={toggleAll}
                    className="inline-flex cursor-pointer border-0 bg-transparent p-0"
                  >
                    {revealedAll ? <EyeIcon /> : <EyeInvisibleIcon />}
                  </button>
                </th>
                <th className="h-[55px] border-b border-[rgb(226,232,240)] bg-[rgb(248,250,252)] p-4 text-left text-sm font-semibold">
                  {copy.tableHeaders.key}
                </th>
                <th className="h-[55px] border-b border-[rgb(226,232,240)] bg-[rgb(248,250,252)] p-4 text-left text-sm font-semibold">
                  {copy.tableHeaders.description}
                </th>
                <th className="h-[55px] border-b border-[rgb(226,232,240)] bg-[rgb(248,250,252)] p-4 text-left text-sm font-semibold">
                  {copy.tableHeaders.status}
                </th>
                <th className="h-[55px] border-b border-[rgb(226,232,240)] bg-[rgb(248,250,252)] p-4 text-left text-sm font-semibold">
                  {copy.tableHeaders.remainQuota ?? "Remain"}
                </th>
                <th className="h-[55px] border-b border-[rgb(226,232,240)] bg-[rgb(248,250,252)] p-4 text-left text-sm font-semibold">
                  {copy.tableHeaders.usedQuota}
                </th>
                <th className="h-[55px] border-b border-[rgb(226,232,240)] bg-[rgb(248,250,252)] p-4 text-left text-sm font-semibold">
                  {copy.tableHeaders.group ?? "Group"}
                </th>
                <th className="h-[55px] border-b border-[rgb(226,232,240)] bg-[rgb(248,250,252)] p-4 text-left text-sm font-semibold">
                  {copy.tableHeaders.createdAt}
                </th>
                <th className="h-[55px] rounded-tr-[8px] border-b border-[rgb(226,232,240)] bg-[rgb(248,250,252)] p-4 text-left text-sm font-semibold">
                  {copy.tableHeaders.actions}
                </th>
              </tr>
            </thead>
            <tbody>
              {keys.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-0">
                    <ConsoleEmptyState message={copy.emptyText} />
                  </td>
                </tr>
              ) : (
                keys.map((row) => {
                  const shown = isRevealed(row.id);
                  return (
                    <tr key={row.id} className="hover:bg-black/[0.02]">
                      <td className="border-b border-[rgb(226,232,240)] bg-white p-4">
                        <input
                          type="checkbox"
                          checked={selected.has(row.id)}
                          onChange={() => toggleSelect(row.id)}
                          aria-label={`select-${row.id}`}
                        />
                      </td>
                      <td className="border-b border-[rgb(226,232,240)] bg-white p-4">
                        <button
                          type="button"
                          aria-label={shown ? "eye" : "eye-invisible"}
                          onClick={() => toggleRow(row.id)}
                          className="inline-flex cursor-pointer border-0 bg-transparent p-0"
                        >
                          {shown ? <EyeIcon /> : <EyeInvisibleIcon />}
                        </button>
                      </td>
                      <td className="border-b border-[rgb(226,232,240)] bg-white p-4">
                        <div className="flex items-center gap-1">
                          <span className="min-w-0 truncate">
                            {shown ? row.key : maskKey(row.key)}
                          </span>
                          <button
                            type="button"
                            aria-label={copy.table.copyAria}
                            onClick={() => void copyKey(row)}
                            className="ml-1 inline-flex shrink-0 cursor-pointer border-0 bg-transparent p-0 text-[rgb(148,163,184)] hover:text-[rgb(74,171,240)]"
                          >
                            <CopyIcon />
                          </button>
                        </div>
                      </td>
                      <td className="border-b border-[rgb(226,232,240)] bg-white p-4">
                        {row.description || "—"}
                      </td>
                      <td className="border-b border-[rgb(226,232,240)] bg-white p-4">
                        {statusLabel(copy, row.status)}
                      </td>
                      <td className="border-b border-[rgb(226,232,240)] bg-white p-4">
                        {row.unlimitedQuota
                          ? (copy.unlimited ?? "Unlimited")
                          : formatConsoleQuota(row.remainQuota, targetLocale)}
                      </td>
                      <td className="border-b border-[rgb(226,232,240)] bg-white p-4">
                        {formatConsoleQuota(row.usedQuota, targetLocale)}
                      </td>
                      <td className="border-b border-[rgb(226,232,240)] bg-white p-4">
                        {row.group || "—"}
                      </td>
                      <td className="border-b border-[rgb(226,232,240)] bg-white p-4 whitespace-nowrap">
                        {row.createdAt}
                      </td>
                      <td className="border-b border-[rgb(226,232,240)] bg-white p-4">
                        <div className="flex flex-nowrap items-center gap-3">
                          {onToggleStatus &&
                          (row.status === API_KEY_STATUS_ENABLED ||
                            row.status === API_KEY_STATUS_DISABLED) ? (
                            <button
                              type="button"
                              onClick={() =>
                                onToggleStatus(
                                  row.id,
                                  row.status !== API_KEY_STATUS_ENABLED,
                                )
                              }
                              className="cursor-pointer border-0 bg-transparent p-0 text-sm text-[rgb(74,171,240)]"
                            >
                              {row.status === API_KEY_STATUS_ENABLED
                                ? copy.table.disable
                                : copy.table.enable}
                            </button>
                          ) : null}
                          <button
                            type="button"
                            onClick={() => setPendingDelete(row)}
                            className="cursor-pointer border-0 bg-transparent p-0 text-sm text-[rgb(220,38,38)]"
                          >
                            {copy.table.delete}
                          </button>
                          <button
                            type="button"
                            onClick={() => setPendingEdit(row)}
                            className="cursor-pointer border-0 bg-transparent p-0 text-sm text-[rgb(74,171,240)]"
                          >
                            {copy.table.edit}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-4 py-2 text-xs text-slate-500">
          <span>
            {(copy.recordsTotal ?? ((n) => `${n}`))(total)}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => onPageChange(Math.max(1, page - 1))}
              className="rounded border border-slate-200 px-2 py-1 disabled:opacity-40"
            >
              {copy.recordsPrev ?? "Prev"}
            </button>
            <span>
              {(copy.recordsPage ?? ((p, t) => `${p}/${t}`))(
                page,
                totalPages,
              )}
            </span>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              className="rounded border border-slate-200 px-2 py-1 disabled:opacity-40"
            >
              {copy.recordsNext ?? "Next"}
            </button>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        open={pendingDelete !== null}
        copy={copy}
        expectedSuffix={
          pendingDelete ? deleteConfirmSuffix(pendingDelete.key) : ""
        }
        onClose={() => setPendingDelete(null)}
        onMismatch={onDeleteMismatch}
        onConfirm={() => {
          if (pendingDelete) onDelete(pendingDelete.id);
          setPendingDelete(null);
        }}
      />

      <EditKeyModal
        open={pendingEdit !== null}
        copy={copy}
        initialDescription={pendingEdit?.description ?? ""}
        onClose={() => setPendingEdit(null)}
        onSave={(description) => {
          if (pendingEdit) onUpdateDescription(pendingEdit.id, description);
          setPendingEdit(null);
        }}
      />
    </>
  );
}
