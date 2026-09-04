import type { ReactNode } from "react";
import { EmptyBoxIcon } from "./icons";

export function ConsoleEmptyState({
  message,
  icon,
}: {
  message: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-6 text-sm text-slate-500">
      {icon ?? <EmptyBoxIcon aria-hidden />}
      <div>{message}</div>
    </div>
  );
}
