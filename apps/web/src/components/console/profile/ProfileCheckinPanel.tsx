"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getCheckinStatus,
  postCheckin,
  type CheckinStatus,
} from "@/lib/backend/client";
import { localizeBackendError } from "@/lib/backend/localize-error";
import { CONSOLE_PRIMARY_BTN, CONSOLE_SURFACE } from "../shared/console-ui";
import { formatConsoleQuota } from "../shared/format-quota";
import { currentCheckinMonth } from "./profile-gates";
import type { ProfileUiCopy } from "./profile-ui-copy";

type Props = {
  copy: ProfileUiCopy;
  targetLocale: string;
  onNotice: (msg: string) => void;
  onError: (msg: string) => void;
  onQuotaMaybeChanged?: () => void;
};

export function ProfileCheckinPanel({
  copy,
  targetLocale,
  onNotice,
  onError,
  onQuotaMaybeChanged,
}: Props) {
  const [data, setData] = useState<CheckinStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setData(await getCheckinStatus(currentCheckinMonth()));
    } catch (e) {
      setData(null);
      onError(localizeBackendError(targetLocale, e, copy.loadFailed));
    } finally {
      setLoading(false);
    }
  }, [copy.loadFailed, onError, targetLocale]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const onCheckin = async () => {
    setBusy(true);
    try {
      const result = await postCheckin();
      onNotice(
        (copy.checkinSuccess ?? ((q) => q))(
          formatConsoleQuota(result.quota_awarded ?? 0, targetLocale),
        ),
      );
      onQuotaMaybeChanged?.();
      await refresh();
    } catch (e) {
      onError(localizeBackendError(targetLocale, e, copy.saveFailed));
    } finally {
      setBusy(false);
    }
  };

  const stats = data?.stats;
  const checkedIn = Boolean(stats?.checked_in_today);

  return (
    <section className={`${CONSOLE_SURFACE} p-4`}>
      <h2 className="text-sm font-semibold text-slate-800">
        {copy.sectionCheckin ?? "Check-in"}
      </h2>
      {loading ? (
        <p className="mt-2 text-sm text-slate-500">…</p>
      ) : (
        <>
          <p className="mt-2 text-xs text-slate-500">
            {(copy.checkinRange ?? ((a, b) => `${a}-${b}`))(
              formatConsoleQuota(data?.min_quota ?? 0, targetLocale),
              formatConsoleQuota(data?.max_quota ?? 0, targetLocale),
            )}
          </p>
          <p className="mt-1 text-sm text-slate-700">
            {checkedIn
              ? (copy.checkinToday ?? "Checked in")
              : (copy.checkinNotToday ?? "Not yet")}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {(copy.checkinTotal ?? ((c, q) => `${c} · ${q}`))(
              stats?.checkin_count ?? stats?.total_checkins ?? 0,
              formatConsoleQuota(stats?.total_quota ?? 0, targetLocale),
            )}
          </p>
          <button
            type="button"
            disabled={busy || checkedIn}
            onClick={() => void onCheckin()}
            className={`mt-3 ${CONSOLE_PRIMARY_BTN} disabled:opacity-50`}
          >
            {copy.checkinAction ?? "Check in"}
          </button>
          {stats?.records && stats.records.length > 0 ? (
            <ul className="mt-3 max-h-40 space-y-1 overflow-y-auto text-xs text-slate-600">
              {stats.records.slice(0, 14).map((r) => (
                <li key={`${r.checkin_date}-${r.quota_awarded}`}>
                  {r.checkin_date ?? "—"} ·{" "}
                  {formatConsoleQuota(r.quota_awarded ?? 0, targetLocale)}
                </li>
              ))}
            </ul>
          ) : null}
        </>
      )}
    </section>
  );
}
