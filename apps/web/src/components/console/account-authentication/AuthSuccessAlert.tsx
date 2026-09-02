import type { AuthUiCopy } from "./account-authentication-ui-copy";
import { claimCouponHref } from "./content";

interface AuthSuccessAlertProps {
  copy: AuthUiCopy;
}

export function AuthSuccessAlert({ copy }: AuthSuccessAlertProps) {
  const { successAlert } = copy;

  return (
    <div
      role="alert"
      className="mb-6 flex max-w-[800px] items-center rounded-[8px] border border-[rgb(183,235,143)] bg-[rgb(246,255,237)] px-3 py-2 text-sm leading-[22px] text-[rgb(30,41,59)]"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      }}
    >
      <div>
        {successAlert.beforeLink}
        <a
          href={claimCouponHref}
          className="text-[rgb(74,171,240)] no-underline"
        >
          {successAlert.linkText}
        </a>
        {successAlert.afterLink}
      </div>
    </div>
  );
}
