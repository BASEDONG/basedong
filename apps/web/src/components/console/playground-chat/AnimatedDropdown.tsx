"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedDropdownProps {
  open: boolean;
  className?: string;
  children: ReactNode;
}

/** Ant Design slide-up enter/leave (0.2s) for select menus */
export function AnimatedDropdown({
  open,
  className,
  children,
}: AnimatedDropdownProps) {
  const [render, setRender] = useState(open);
  const [phase, setPhase] = useState<"enter" | "leave" | null>(
    open ? "enter" : null,
  );
  const leavingRef = useRef(false);

  useEffect(() => {
    if (open) {
      leavingRef.current = false;
      setRender(true);
      setPhase("enter");
      return;
    }
    if (!render) return;
    leavingRef.current = true;
    setPhase("leave");
  }, [open, render]);

  if (!render) return null;

  return (
    <ul
      className={cn(
        className,
        phase === "enter" && "sf-chat-dropdown-enter",
        phase === "leave" && "sf-chat-dropdown-leave",
      )}
      onAnimationEnd={() => {
        if (leavingRef.current || phase === "leave") {
          leavingRef.current = false;
          setRender(false);
          setPhase(null);
        }
      }}
    >
      {children}
    </ul>
  );
}
