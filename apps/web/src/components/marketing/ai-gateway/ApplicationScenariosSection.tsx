"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  Activity,
  Building2,
  ChartColumn,
  CheckCircle,
  Shield,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { scenarios, type ScenarioIcon } from "./content";
import { GatewayReveal } from "./GatewayReveal";

const scenarioIcons: Record<ScenarioIcon, LucideIcon> = {
  building: Building2,
  zap: Zap,
  shield: Shield,
  activity: Activity,
  chart: ChartColumn,
};

type Phase = "idle" | "exit" | "enter";

export function ApplicationScenariosSection() {
  const [activeId, setActiveId] = useState(scenarios[0].id);
  const [displayId, setDisplayId] = useState(scenarios[0].id);
  const [phase, setPhase] = useState<Phase>("idle");
  const [direction, setDirection] = useState<1 | -1>(1);
  const phaseRef = useRef<Phase>("idle");
  const activeRef = useRef(scenarios[0].id);
  const pendingId = useRef<string | null>(null);
  const timers = useRef<number[]>([]);

  const display = scenarios.find((s) => s.id === displayId) ?? scenarios[0];
  const DisplayIcon = scenarioIcons[display.icon];

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    activeRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  function runSwitch(id: string) {
    if (id === activeRef.current) return;
    const fromIndex = scenarios.findIndex((s) => s.id === activeRef.current);
    const toIndex = scenarios.findIndex((s) => s.id === id);
    setDirection(toIndex >= fromIndex ? 1 : -1);
    setActiveId(id);
    activeRef.current = id;
    setPhase("exit");
    phaseRef.current = "exit";

    const t1 = window.setTimeout(() => {
      setDisplayId(id);
      setPhase("enter");
      phaseRef.current = "enter";
      const t2 = window.setTimeout(() => {
        setPhase("idle");
        phaseRef.current = "idle";
        if (pendingId.current && pendingId.current !== id) {
          const next = pendingId.current;
          pendingId.current = null;
          runSwitch(next);
        }
      }, 420);
      timers.current.push(t2);
    }, 220);
    timers.current.push(t1);
  }

  function selectScenario(id: string) {
    if (id === activeRef.current) return;
    if (phaseRef.current !== "idle") {
      pendingId.current = id;
      return;
    }
    runSwitch(id);
  }

  return (
    <div className="w-full bg-white py-[160px] max-[1180px]:py-20">
      <section className="w-full overflow-hidden px-6">
        <div className="mx-auto max-w-[1400px]">
          <GatewayReveal variant="soft">
            <h2 className="mb-[68px] text-center text-[48px] font-semibold leading-none text-[#4AABF0] max-[1180px]:mb-[52px] max-[960px]:text-[36px]">
              应用场景
            </h2>
          </GatewayReveal>

          <GatewayReveal variant="card" delayMs={80}>
            <div className="grid grid-cols-[312px_1fr] items-center gap-8 max-[1180px]:grid-cols-1">
              <div className="flex flex-col gap-[14px] max-[1180px]:grid max-[1180px]:grid-cols-2 max-[960px]:grid-cols-1">
                {scenarios.map((scenario) => {
                  const isActive = scenario.id === activeId;
                  const TabIcon = scenarioIcons[scenario.icon];
                  return (
                    <button
                      key={scenario.id}
                      type="button"
                      onClick={() => selectScenario(scenario.id)}
                      className={cn(
                        "group relative flex h-[54px] w-full items-center gap-3 overflow-hidden rounded-[16px] border pl-5 text-left transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isActive
                          ? "border-transparent bg-[#7B3FF2] text-white"
                          : "border-[#D9E2EC] bg-white text-[#475569] hover:border-[#B99CFF] hover:bg-[#FBF8FF]",
                      )}
                    >
                      {isActive ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-[linear-gradient(135deg,#5DCDE8_0%,#4AABF0_52%,#4AABF0_100%)]"
                        />
                      ) : null}
                      <span className="relative z-10 flex size-[22px] shrink-0 items-center justify-center">
                        <TabIcon
                          className={cn(
                            "size-5 transition-transform duration-300",
                            isActive ? "text-white" : "text-[#94A3B8]",
                          )}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="relative z-10 text-[16px] font-medium leading-none">
                        {scenario.tab}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="relative min-h-[380px] overflow-hidden rounded-[28px] border border-[#D9E2EC] bg-white p-10 max-[1180px]:min-h-[342px]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_18%_18%,rgba(74,171,240,0.055),transparent_32%),radial-gradient(circle_at_90%_70%,rgba(116,58,237,0.045),transparent_34%)]"
                />

                <div
                  key={display.id}
                  className={cn(
                    "relative z-10 h-full will-change-[opacity,filter,transform]",
                    phase === "exit" && "gw-scenario-exit",
                    phase === "enter" && "gw-scenario-enter",
                    phase === "idle" && "opacity-100 blur-0",
                  )}
                  style={
                    {
                      ["--gw-dir"]: String(direction),
                    } as CSSProperties
                  }
                >
                  <div className="mb-7 flex items-start gap-5">
                    <div
                      className={cn(
                        "flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#7B3FF2] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        phase === "exit" && "scale-[0.88] -rotate-6",
                        phase === "enter" && "gw-scenario-icon-enter",
                      )}
                    >
                      <DisplayIcon
                        className="size-8 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="mb-4 text-[20px] font-bold leading-none text-[#101828] max-[960px]:text-2xl">
                        {display.title}
                      </h3>
                      <p className="text-[16px] leading-[1.75] text-slate-600 max-[960px]:text-[14px]">
                        {display.paragraphs[0]}
                      </p>
                      <p className="mt-0 max-w-[930px] pl-[14px] text-[16px] leading-[1.75] text-[#475569] before:mr-2 before:content-['•'] max-[960px]:text-[14px]">
                        {display.paragraphs[1]}
                      </p>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "grid gap-5 max-[960px]:grid-cols-1",
                      display.gridCols === 3 ? "grid-cols-3" : "grid-cols-2",
                    )}
                  >
                    {display.cards.map((card, index) => (
                      <div
                        key={card.title}
                        className={cn(
                          "group relative min-h-[126px] overflow-hidden rounded-2xl border border-[#EEF6FE] bg-[linear-gradient(180deg,#FFFBFF_0%,#FCF7FF_100%)] p-5 transition-all duration-300 hover:border-[#CDB7FF]",
                          phase === "enter" && "gw-scenario-card-enter",
                        )}
                        style={
                          phase === "enter"
                            ? { animationDelay: `${80 + index * 55}ms` }
                            : undefined
                        }
                      >
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute right-0 top-0 size-[120px] translate-x-1/3 -translate-y-1/3 rounded-full bg-[#5DCDE8]/[0.08] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                        />
                        <CheckCircle
                          className="mb-4 size-[21px] text-[#8A5CFF]"
                          aria-hidden="true"
                        />
                        <h4 className="mb-2.5 text-[20px] font-medium leading-none text-[#7B3FF2] max-[960px]:text-[22px]">
                          {card.title}
                        </h4>
                        <p className="text-[14px] font-medium leading-none text-slate-500">
                          {card.subtitle}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GatewayReveal>
        </div>
      </section>
    </div>
  );
}
