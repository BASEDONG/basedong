/** Lightweight cross-component signal when `/api/user/self` data may have changed. */

const SELF_UPDATED = "basedong:self-updated";

export function notifySelfUpdated() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(SELF_UPDATED));
}

export function subscribeSelfUpdated(handler: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener(SELF_UPDATED, handler);
  return () => window.removeEventListener(SELF_UPDATED, handler);
}
