/** Motion classes for Console drawers anchored to the inline end. */
export function consoleEndDrawerTranslate(open: boolean, isRtl: boolean): string {
  if (open) return "translate-x-0";
  return isRtl ? "-translate-x-full" : "translate-x-full";
}

/** Base positioning for slide-in Console drawers (shadow via `.console-slide-drawer` in globals.css). */
export const CONSOLE_END_DRAWER_SHELL =
  "console-slide-drawer pointer-events-auto absolute end-0 top-0 flex h-full flex-col bg-white";
