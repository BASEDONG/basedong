import type { InvoiceUiCopy } from "./invoice-ui-copy";

interface InvoiceNoticeAlertProps {
  copy: InvoiceUiCopy;
}

export function InvoiceNoticeAlert({ copy }: InvoiceNoticeAlertProps) {
  const [line1, line2, line3Prefix] = copy.noticeLines;

  return (
    <div
      role="alert"
      className="relative flex w-full items-center rounded-[8px] border-none bg-[rgba(108,40,246,0.15)] px-3 py-2 text-sm leading-[22px] text-slate-800"
    >
      <div className="w-full">
        <ul className="m-0 list-none p-0 text-sm leading-[22px] text-slate-700">
          <li>{line1}</li>
          <li>{line2}</li>
          <li>
            {line3Prefix}
            <a
              href={copy.registerFormHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgb(108,40,246)] no-underline hover:text-[#b17dff]"
            >
              {copy.registerHere}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
