import { copy } from "./content";

export function InvoiceNoticeAlert() {
  return (
    <div
      role="alert"
      className="relative flex w-full items-center rounded-[8px] border-none bg-[rgba(108,40,246,0.15)] px-3 py-2 text-sm leading-[22px] text-slate-800"
    >
      <div className="w-full">
        <ul className="m-0 list-none p-0 text-sm leading-[22px] text-slate-700">
          <li>
            1. 仅
            <span className="font-semibold text-slate-700">已消费</span>
            金额可以申请开具发票，
            <span className="font-semibold text-slate-700">
              充值未消费的充值余额不可开具发票
            </span>
            ，您可酌情申请退款；已开票金额不可重复开票；
          </li>
          <li>
            2.{" "}
            <span className="font-semibold text-slate-700">
              工作日 10:00 ~ 19:00
            </span>{" "}
            可以提交开票申请，通常发票会在您申请开票后
            <span className="font-semibold text-slate-700">2个工作日</span>
            内开具完成；
          </li>
          <li>
            3. 根据我国税收相关政策要求，
            <span className="font-semibold text-slate-700">
              发票抬头需与账户主体名称一致
            </span>
            ；如需开具机构抬头发票且可以配合提供相应证明材料，请
            <a
              href={copy.registerFormHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgb(108,40,246)] no-underline hover:text-[#b17dff]"
            >
              点击这里登记
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
