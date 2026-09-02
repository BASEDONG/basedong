"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CardGradientBackground } from "@/components/marketing/home/CardGradientBackground";
import { Card } from "@/components/ui/card";
import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";
import { cn } from "@/lib/utils";

export const ACCORDION_TRANSITION_MS = 520;
export const DEFAULT_COLLAPSED_PANEL_WIDTH = 140;

export type ScenarioAccordionItem = {
  key: string;
  background: SfGradientPalette;
  renderCollapsed: () => ReactNode;
  renderExpanded: () => ReactNode;
  renderOverlay?: () => ReactNode;
};

type ScenarioAccordionProps = {
  items: ScenarioAccordionItem[];
  collapsedWidth?: number;
  className?: string;
  onActiveChange?: (index: number) => void;
};

function ScenarioAccordionPanel({
  item,
  expanded,
  width,
  onActivate,
}: {
  item: ScenarioAccordionItem;
  expanded: boolean;
  width: number;
  onActivate: () => void;
}) {
  return (
    <div
      style={{ width }}
      className="relative h-full shrink-0 cursor-pointer overflow-hidden border-r border-white/60 transition-[width] duration-500 ease-out last:border-r-0"
      onClick={onActivate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onActivate();
      }}
    >
      <CardGradientBackground {...item.background} />
      {item.renderOverlay?.()}
      <div className="relative z-10 flex h-full items-center justify-center px-6 py-8">
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center px-6 py-8 transition-opacity duration-300 ease-out",
            expanded
              ? "pointer-events-none opacity-0"
              : "opacity-100 delay-75",
          )}
        >
          {item.renderCollapsed()}
        </div>
        <div
          className={cn(
            "max-w-[420px] transition-opacity duration-300 ease-out",
            expanded
              ? "opacity-100 delay-150"
              : "pointer-events-none absolute inset-0 opacity-0",
          )}
        >
          {item.renderExpanded()}
        </div>
      </div>
    </div>
  );
}

export function ScenarioAccordion({
  items,
  collapsedWidth = DEFAULT_COLLAPSED_PANEL_WIDTH,
  className,
  onActiveChange,
}: ScenarioAccordionProps) {
  const [active, setActive] = useState(0);
  const accordionRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1440);
  const activeRef = useRef(0);
  const lockRef = useRef(false);
  const lockTimerRef = useRef<number | null>(null);
  const pendingIndexRef = useRef<number | null>(null);
  const applyActiveRef = useRef<(index: number) => void>(() => {});

  const itemCount = items.length;
  const expandedWidth =
    containerWidth - collapsedWidth * Math.max(itemCount - 1, 0);

  useEffect(() => {
    const el = accordionRef.current;
    if (!el) return;

    const update = () => setContainerWidth(el.clientWidth);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const applyActive = useCallback((index: number) => {
    if (index === activeRef.current) return;
    activeRef.current = index;
    setActive(index);
    onActiveChange?.(index);

    lockRef.current = true;
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    lockTimerRef.current = window.setTimeout(() => {
      lockRef.current = false;
      lockTimerRef.current = null;
      const pending = pendingIndexRef.current;
      pendingIndexRef.current = null;
      if (pending !== null && pending !== activeRef.current) {
        applyActiveRef.current(pending);
      }
    }, ACCORDION_TRANSITION_MS);
  }, [onActiveChange]);

  useEffect(() => {
    applyActiveRef.current = applyActive;
  }, [applyActive]);

  const requestActivate = useCallback(
    (index: number) => {
      if (index === activeRef.current) return;
      if (lockRef.current) {
        pendingIndexRef.current = index;
        return;
      }
      applyActive(index);
    },
    [applyActive],
  );

  const resolveIndexStable = useCallback(
    (clientX: number, activeIndex: number) => {
      const el = accordionRef.current;
      if (!el) return null;
      const containerRect = el.getBoundingClientRect();
      const x = clientX - containerRect.left;
      if (x < 0 || x >= containerRect.width) return null;

      const expandedW =
        containerRect.width - collapsedWidth * Math.max(itemCount - 1, 0);
      let offset = 0;
      for (let i = 0; i < itemCount; i++) {
        const width = i === activeIndex ? expandedW : collapsedWidth;
        if (x >= offset && x < offset + width) return i;
        offset += width;
      }
      return itemCount - 1;
    },
    [collapsedWidth, itemCount],
  );

  const resolveIndexFromPointer = useCallback(
    (clientX: number) => {
      if (lockRef.current) {
        return resolveIndexStable(clientX, activeRef.current);
      }
      const el = accordionRef.current;
      if (!el) return null;
      const children = el.children;
      for (let i = 0; i < children.length; i++) {
        const rect = children[i].getBoundingClientRect();
        if (clientX >= rect.left && clientX < rect.right) return i;
      }
      return null;
    },
    [resolveIndexStable],
  );

  const handleAccordionPointer = useCallback(
    (clientX: number) => {
      const index = resolveIndexFromPointer(clientX);
      if (index !== null) requestActivate(index);
    },
    [resolveIndexFromPointer, requestActivate],
  );

  const getPanelWidth = (index: number) =>
    index === active ? expandedWidth : collapsedWidth;

  return (
    <div className={cn("sf-content hidden md:block", className)}>
      <Card
        ref={accordionRef}
        variant="surface"
        className="flex h-[406px] w-full flex-row"
        onMouseEnter={(e) => handleAccordionPointer(e.clientX)}
        onMouseMove={(e) => handleAccordionPointer(e.clientX)}
      >
        {items.map((item, i) => (
          <ScenarioAccordionPanel
            key={item.key}
            item={item}
            expanded={i === active}
            width={getPanelWidth(i)}
            onActivate={() => requestActivate(i)}
          />
        ))}
      </Card>
    </div>
  );
}

type AccordionDetailFadeProps = {
  activeKey: string;
  children: ReactNode;
  className?: string;
};

export function AccordionDetailFade({
  activeKey,
  children,
  className,
}: AccordionDetailFadeProps) {
  const [visible, setVisible] = useState(true);
  const [frozenChildren, setFrozenChildren] = useState(children);
  const prevKeyRef = useRef(activeKey);
  const childrenRef = useRef(children);

  useEffect(() => {
    childrenRef.current = children;
  }, [children]);

  useEffect(() => {
    if (activeKey === prevKeyRef.current) {
      setFrozenChildren(childrenRef.current);
      return;
    }

    setVisible(false);
    const timer = window.setTimeout(() => {
      prevKeyRef.current = activeKey;
      setFrozenChildren(childrenRef.current);
      setVisible(true);
    }, 150);
    return () => clearTimeout(timer);
  }, [activeKey]);

  return (
    <div
      className={cn(
        "transition-opacity duration-300 ease-out",
        visible ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      {frozenChildren}
    </div>
  );
}
