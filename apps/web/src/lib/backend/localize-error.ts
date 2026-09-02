import { getBackendErrorUiCopy } from "@/components/console/shared/backend-error-ui-copy";
import type { ClientErrorKey } from "@/components/console/shared/backend-error-ui-copy";
import { BackendError } from "./client";

export type { ClientErrorKey };

const TOKEN_LIMIT_RE =
  /^已达到最大令牌数量限制\s*\((\d+)\)$/;
const TOKEN_LIMIT_EN_RE =
  /^Maximum token limit reached\s*\((\d+)\)$/i;

function localizeBackendMessage(locale: string, message: string): string {
  const trimmed = message.trim();
  if (!trimmed) {
    return getBackendErrorUiCopy(locale).unknownError;
  }

  const copy = getBackendErrorUiCopy(locale);
  const exact = copy.backendMessages[trimmed];
  if (exact) return exact;

  if (trimmed.startsWith("额度不足") || /quota|额度/i.test(trimmed)) {
    const suffix = trimmed.replace(/^额度不足[：:]\s*/, "");
    if (suffix !== trimmed) {
      const inner = localizeBackendMessage(locale, suffix);
      return `${copy.insufficientQuotaPrefix}: ${inner}`;
    }
    if (/insufficient.*quota/i.test(trimmed)) {
      return copy.insufficientQuotaPrefix;
    }
  }

  if (trimmed.startsWith("用户额度不足")) {
    return copy.insufficientUserQuotaPrefix;
  }

  const tokenLimit = trimmed.match(TOKEN_LIMIT_RE) ?? trimmed.match(TOKEN_LIMIT_EN_RE);
  if (tokenLimit) {
    return copy.tokenLimitReached(tokenLimit[1]);
  }

  const httpMatch = /^HTTP (\d+)$/.exec(trimmed);
  if (httpMatch) {
    return copy.httpError(httpMatch[1]);
  }

  return trimmed;
}

/** Localize a Backend or client error for Console display. */
export function localizeBackendError(
  locale: string,
  err: unknown,
  fallback?: string,
): string {
  const copy = getBackendErrorUiCopy(locale);

  if (err instanceof BackendError) {
    if (err.clientKey) {
      return copy.clientErrors[err.clientKey];
    }
    return localizeBackendMessage(locale, err.message);
  }

  if (err instanceof Error && err.message) {
    return localizeBackendMessage(locale, err.message);
  }

  return fallback ?? copy.unknownError;
}