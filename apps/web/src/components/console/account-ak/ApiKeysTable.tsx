"use client";

import { useCallback, useState } from "react";
import type { ApiKeysUiCopy } from "./account-ak-ui-copy";
import {
  API_KEY_STATUS_ENABLED,
  type ApiKeyRow,
} from "./content";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { EditKeyModal } from "./EditKeyModal";
import {
  CopyIcon,
  EmptyBoxIcon,
  EyeIcon,
  EyeInvisibleIcon,
  PaginationLeftIcon,
  PaginationRightIcon,
} from "./icons";

const antFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

interface ApiKeysTableProps {
  copy: ApiKeysUiCopy;
  keys: ApiKeyRow[];
  onDelete: (id: string) => void;
  onUpdateDescription: (id: string, description: string) => void;
  onCopied: () => void;
  onDeleteMismatch: () => void;
  onToggleStatus?: (id: string, enable: boolean) => void;
  /** Resolve full API Key secret when list only has a masked value. */
  onReveal?: (id: string) => Promise<string | null | undefined>;
}

/** Live mask: keep first 4 + last 4, asterisks in the middle. */
function maskKey(key: string) {
  if (key.length <= 8) return "*".repeat(Math.max(key.length, 8));
  return `${key.slice(0, 4)}${"*".repeat(key.length - 8)}${key.slice(-4)}`;
}

export function ApiKeysTable({
  copy,
  keys,
  onDelete,
  onUpdateDescription,
  onCopied,
  onDeleteMismatch,
  onToggleStatus,
  onReveal,
}: ApiKeysTableProps) {
  const [revealedAll, setRevealedAll] = useState(false);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(() => new Set());
  const [pendingDelete, setPendingDelete] = useState<ApiKeyRow | null>(null);
  const [pendingEdit, setPendingEdit] = useState<ApiKeyRow | null>(null);

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

  return (
    <>
      <div
        className="w-full overflow-hidden rounded-t-[8px] bg-white"
        style={{ fontFamily: antFont }}
      >
        <div className="w-full overflow-x-auto">
          <table
            className="w-full border-separate border-spacing-0 text-sm leading-[22px] text-[rgb(30,41,59)]"
            style={{
              tableLayout: keys.length === 0 ? "fixed" : "auto",
              minWidth: 720,
            }}
          >
            <colgroup>
              <col style={{ width: 50 }} />
              <col style={{ width: 400 }} />
              {keys.length === 0 ? (
                <>
                  <col style={{ width: 216 }} />
                  <col style={{ width: 317 }} />
                  <col style={{ width: 216 }} />
                </>
              ) : (
                <>
                  <col />
                  <col />
                  <col />
                </>
              )}
            </colgroup>
            <thead>
              <tr>
                <th className="h-[55px] rounded-tl-[8px] border-b border-[rgb(226,232,240)] bg-[rgb(248,250,252)] p-4 text-left text-sm font-semibold leading-[22px] text-[rgb(30,41,59)]">
                  <button
                    type="button"
                    aria-label={revealedAll ? "eye" : "eye-invisible"}
                    onClick={() => setRevealedAll((v) => !v)}
                    className="inline-flex cursor-pointer select-none items-center border-0 bg-transparent p-0 text-[14px] leading-none text-[rgb(30,41,59)]"
                  >
                    {revealedAll ? <EyeIcon /> : <EyeInvisibleIcon />}
                  </button>
                </th>
                <th className="h-[55px] border-b border-[rgb(226,232,240)] bg-[rgb(248,250,252)] p-4 text-left text-sm font-semibold leading-[22px] text-[rgb(30,41,59)]">
                  {copy.tableHeaders.key}
                </th>
                <th className="h-[55px] border-b border-[rgb(226,232,240)] bg-[rgb(248,250,252)] p-4 text-left text-sm font-semibold leading-[22px] text-[rgb(30,41,59)]">
                  {copy.tableHeaders.description}
                </th>
                <th className="h-[55px] border-b border-[rgb(226,232,240)] bg-[rgb(248,250,252)] p-4 text-left text-sm font-semibold leading-[22px] text-[rgb(30,41,59)]">
                  {copy.tableHeaders.status ?? "Status"}
                </th>
                <th className="h-[55px] border-b border-[rgb(226,232,240)] bg-[rgb(248,250,252)] p-4 text-left text-sm font-semibold leading-[22px] text-[rgb(30,41,59)]">
                  {copy.tableHeaders.usedQuota ?? "Used"}
                </th>
                <th className="h-[55px] border-b border-[rgb(226,232,240)] bg-[rgb(248,250,252)] p-4 text-left text-sm font-semibold leading-[22px] text-[rgb(30,41,59)]">
                  {copy.tableHeaders.createdAt}
                </th>
                <th className="h-[55px] rounded-tr-[8px] border-b border-[rgb(226,232,240)] bg-[rgb(248,250,252)] p-4 text-left text-sm font-semibold leading-[22px] text-[rgb(30,41,59)]">
                  {copy.tableHeaders.actions}
                </th>
              </tr>
            </thead>
            <tbody>
              {keys.length === 0 ? (
                <tr className="h-[167px]">
                  <td
                    colSpan={7}
                    className="border-b border-[rgb(226,232,240)] bg-white p-4 text-center text-[rgb(148,163,184)]"
                  >
                    <div className="mx-2 my-8 text-center text-[rgb(100,116,139)]">
                      <div className="mb-2 flex justify-center">
                        <EmptyBoxIcon aria-label={copy.table.emptyAria} />
                      </div>
                      <div className="text-sm leading-[22px]">{copy.emptyText}</div>
                    </div>
                  </td>
                </tr>
              ) : (
                keys.map((row) => {
                  const shown = isRevealed(row.id);
                  return (
                    <tr key={row.id} className="hover:bg-black/[0.02]">
                      <td className="border-b border-[rgb(226,232,240)] bg-white p-4">
                        <button
                          type="button"
                          aria-label={shown ? "eye" : "eye-invisible"}
                          onClick={() => toggleRow(row.id)}
                          className="inline-flex cursor-pointer select-none items-center border-0 bg-transparent p-0 text-[14px] leading-none text-[rgb(30,41,59)]"
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
                            onClick={() => copyKey(row)}
                            className="ml-1 inline-flex shrink-0 cursor-pointer border-0 bg-transparent p-0 text-sm text-[rgb(148,163,184)] transition-colors hover:text-[rgb(74,171,240)]"
                          >
                            <CopyIcon />
                          </button>
                        </div>
                      </td>
                      <td className="border-b border-[rgb(226,232,240)] bg-white p-4 text-sm leading-[22px]">
                        <div className="overflow-hidden text-wrap">
                          {row.description || "—"}
                        </div>
                      </td>
                      <td className="border-b border-[rgb(226,232,240)] bg-white p-4 text-sm leading-[22px]">
                        {row.status === API_KEY_STATUS_ENABLED
                          ? (copy.table.statusEnabled ?? "Enabled")
                          : (copy.table.statusDisabled ?? "Disabled")}
                      </td>
                      <td className="border-b border-[rgb(226,232,240)] bg-white p-4 text-sm leading-[22px]">
                        {row.usedQuota}
                      </td>
                      <td className="border-b border-[rgb(226,232,240)] bg-white p-4 text-sm leading-[22px] whitespace-nowrap">
                        {row.createdAt}
                      </td>
                      <td className="border-b border-[rgb(226,232,240)] bg-white p-4">
                        <div className="flex select-none flex-nowrap items-center gap-3">
                          {onToggleStatus ? (
                            <button
                              type="button"
                              onClick={() =>
                                onToggleStatus(
                                  row.id,
                                  row.status !== API_KEY_STATUS_ENABLED,
                                )
                              }
                              className="cursor-pointer border-0 bg-transparent p-0 text-sm leading-[22px] text-[rgb(74,171,240)] transition-opacity hover:opacity-80"
                            >
                              {row.status === API_KEY_STATUS_ENABLED
                                ? (copy.table.disable ?? "Disable")
                                : (copy.table.enable ?? "Enable")}
                            </button>
                          ) : null}
                          <button
                            type="button"
                            onClick={() => setPendingDelete(row)}
                            className="cursor-pointer border-0 bg-transparent p-0 text-sm leading-[22px] text-[rgb(220,38,38)] transition-opacity hover:opacity-80"
                          >
                            {copy.table.delete}
                          </button>
                          <button
                            type="button"
                            onClick={() => setPendingEdit(row)}
                            className="cursor-pointer border-0 bg-transparent p-0 text-sm leading-[22px] text-[rgb(74,171,240)] transition-opacity hover:opacity-80"
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

        {keys.length > 0 ? (
          <ul className="m-0 flex list-none items-center justify-end p-0 py-4 text-sm leading-[22px] text-[rgb(30,41,59)]">
            <li className="mr-2 inline-block">
              <button
                type="button"
                disabled
                aria-label="left"
                className="inline-flex size-8 cursor-not-allowed items-center justify-center rounded-md border-0 bg-transparent p-0 text-[rgb(148,163,184)]"
              >
                <PaginationLeftIcon className="size-3" />
              </button>
            </li>
            <li className="mr-2 inline-block">
              <button
                type="button"
                className="inline-flex size-8 items-center justify-center rounded-[6px] border border-[rgb(74,171,240)] bg-white text-sm font-semibold leading-[22px] text-[rgb(74,171,240)]"
              >
                1
              </button>
            </li>
            <li className="inline-block">
              <button
                type="button"
                disabled
                aria-label="right"
                className="inline-flex size-8 cursor-not-allowed items-center justify-center rounded-md border-0 bg-transparent p-0 text-[rgb(148,163,184)]"
              >
                <PaginationRightIcon className="size-3" />
              </button>
            </li>
          </ul>
        ) : null}
      </div>

      <ConfirmDeleteModal
        open={pendingDelete !== null}
        copy={copy}
        expectedSuffix={pendingDelete?.key.slice(-6) ?? ""}
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
