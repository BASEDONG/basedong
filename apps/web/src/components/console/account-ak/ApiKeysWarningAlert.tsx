import { warningMessage } from "./content";

const antFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

export function ApiKeysWarningAlert() {
  return (
    <div
      role="alert"
      className="mb-4 flex min-h-10 items-center rounded-[8px] border border-[rgb(255,229,143)] bg-[rgb(255,251,230)] px-3 py-2 text-sm font-normal leading-[22px] text-[rgb(30,41,59)]"
      style={{ fontFamily: antFont }}
    >
      <div className="w-full">{warningMessage}</div>
    </div>
  );
}
