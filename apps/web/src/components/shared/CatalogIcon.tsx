"use client";

import * as LobeIcons from "@lobehub/icons";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CatalogIconProps = {
  /** Backend `@lobehub/icons` key, or a path/URL (`/assets/…`, `https://…`). */
  value: string;
  size?: number;
  className?: string;
  alt?: string;
};

function isAssetOrUrl(value: string): boolean {
  return (
    value.startsWith("/") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:")
  );
}

function parsePropValue(raw: string | undefined | null): string | number | boolean {
  if (raw == null) return true;
  let v = String(raw).trim();
  if (v.startsWith("{") && v.endsWith("}")) {
    v = v.slice(1, -1).trim();
  }
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    return v.slice(1, -1);
  }
  if (v === "true") return true;
  if (v === "false") return false;
  if (/^-?\d+(?:\.\d+)?$/.test(v)) return Number(v);
  return v;
}

function letterFallback(label: string, size: number): ReactNode {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-500"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {(label.charAt(0) || "?").toUpperCase()}
    </span>
  );
}

/** Resolve a Backend catalog icon key to a LobeHub React node. */
export function renderLobeIcon(
  iconName: string | undefined | null,
  size = 20,
): ReactNode {
  if (!iconName || typeof iconName !== "string") {
    return letterFallback("?", size);
  }
  const trimmed = iconName.trim();
  if (!trimmed) return letterFallback("?", size);

  const segments = trimmed.split(".");
  const baseKey = segments[0]!;
  const BaseIcon = (LobeIcons as Record<string, unknown>)[baseKey] as
    | Record<string, unknown>
    | undefined;

  let IconComponent: React.ComponentType<Record<string, unknown>> | undefined;
  let propStartIndex: number;

  if (BaseIcon && segments.length > 1 && BaseIcon[segments[1]!]) {
    IconComponent = BaseIcon[segments[1]!] as React.ComponentType<
      Record<string, unknown>
    >;
    propStartIndex = 2;
  } else {
    IconComponent = (LobeIcons as Record<string, unknown>)[baseKey] as
      | React.ComponentType<Record<string, unknown>>
      | undefined;
    propStartIndex =
      segments.length > 1 && /^[A-Z]/.test(segments[1] ?? "") ? 2 : 1;
  }

  if (
    !IconComponent ||
    (typeof IconComponent !== "function" && typeof IconComponent !== "object")
  ) {
    return letterFallback(trimmed, size);
  }

  const props: Record<string, string | number | boolean> = {};
  for (let i = propStartIndex; i < segments.length; i++) {
    const seg = segments[i];
    if (!seg) continue;
    const eqIdx = seg.indexOf("=");
    if (eqIdx === -1) {
      props[seg.trim()] = true;
      continue;
    }
    props[seg.slice(0, eqIdx).trim()] = parsePropValue(seg.slice(eqIdx + 1).trim());
  }
  if (props.size == null) props.size = size;

  return <IconComponent {...props} />;
}

/**
 * Catalog vendor/model icon: LobeHub key from `/api/pricing`, or a static asset URL.
 */
export function CatalogIcon({
  value,
  size = 20,
  className,
  alt = "",
}: CatalogIconProps) {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return letterFallback("?", size);

  if (isAssetOrUrl(trimmed)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={trimmed}
        alt={alt}
        width={size}
        height={size}
        className={cn("shrink-0 object-contain", className)}
        style={{ width: size, height: size } satisfies CSSProperties}
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center [&>svg]:block",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden={alt ? undefined : true}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
    >
      {renderLobeIcon(trimmed, size)}
    </span>
  );
}
