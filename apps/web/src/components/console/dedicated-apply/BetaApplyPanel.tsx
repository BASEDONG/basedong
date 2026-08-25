export function BetaApplyPanel() {
  return (
    <div className="flex">
      <div className="flex flex-1 flex-col gap-2 rounded-lg border border-[rgba(74,171,240,0.2)] bg-[rgba(255,255,255,0.3)] p-6 pr-0">
        <h3 className="text-[20px] font-semibold leading-[28px] tracking-[-0.1px] text-[#4AABF0]">
          公测体验申请
        </h3>
        <div className="flex flex-col gap-4">
          <div className="text-[14px] leading-[24px] text-[#334155]">
            本次公测{" "}
            <span className="font-bold">优先面向企业认证的组织账户</span>{" "}
            开放
            <br />
            您当前为 <span className="font-bold">个人账户</span>，建议{" "}
            <span className="font-bold">先创建组织并完成企业认证 </span>
            后再申请公测
          </div>
        </div>
      </div>
    </div>
  );
}
