import { gettingStartedSteps } from "./content";
import { getStepIcon } from "./icons";

const CONNECTOR_STYLE = {
  background:
    "linear-gradient(70deg, rgba(74, 171, 240), 0) 0%, rgba(74, 171, 240), 0.2) 100%)",
} as const;

export function GettingStarted() {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <p className="text-[24px] font-semibold leading-[32px] tracking-[-0.144px] text-[#1e293b]">
        开始使用
      </p>
      <p className="min-w-full text-[16px] font-normal leading-[28px] text-[#1e293b]">
        只需 3 步，即可完成 GPU 云函数的部署与调用
      </p>
      <div className="flex w-full gap-4">
        <div className="flex shrink-0 flex-col items-center">
          <div className="flex size-[32px] items-center justify-center rounded-[8px] bg-[#4AABF0]">
            <span className="text-[14px] font-medium leading-normal text-white">
              1
            </span>
          </div>
          <div
            className="flex h-[78px] w-[1px] items-center justify-center"
            style={CONNECTOR_STYLE}
          />
          <div className="flex size-[32px] items-center justify-center rounded-[8px] bg-[#4AABF0]">
            <span className="text-[14px] font-medium leading-normal text-white">
              2
            </span>
          </div>
          <div
            className="flex h-[78px] w-[1px] items-center justify-center"
            style={CONNECTOR_STYLE}
          />
          <div className="flex size-[32px] items-center justify-center rounded-[8px] bg-[#4AABF0]">
            <span className="text-[14px] font-medium leading-normal text-white">
              3
            </span>
          </div>
          <div
            className="flex h-[50px] w-[1px] items-center justify-center"
            style={CONNECTOR_STYLE}
          />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-6">
          {gettingStartedSteps.map((step) => {
            const Icon = getStepIcon(step.icon);
            return (
              <div
                key={step.title}
                className="flex cursor-pointer items-start gap-4 rounded-[8px] border border-solid border-[#e2e8f0] bg-[rgba(255,255,255,0.3)] p-4 transition-all duration-200 hover:border-[rgba(74,171,240,0.5)] hover:shadow-[0px_4px_4px_0px_rgba(74,171,240,0.1)]"
              >
                <div className="flex size-[32px] shrink-0 items-center justify-center rounded-[8px] bg-[rgba(74,171,240,0.1)]">
                  <Icon className="text-[#4AABF0]" width={16} height={16} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="text-[16px] font-medium leading-[24px] text-[#1e293b]">
                    {step.title}
                  </p>
                  <p className="text-[14px] leading-[24px] text-[#64748b]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
