import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const marketingSized = ["surface", "elevated", "feature", "accent"] as const

const cardVariants = cva(
  "group/card group flex flex-col overflow-hidden text-card-foreground",
  {
    variants: {
      variant: {
        default:
          "gap-(--card-spacing) rounded-xl bg-card py-(--card-spacing) text-sm ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        surface:
          "rounded-xl border border-[var(--sf-card-border,#eceef3)] bg-card",
        elevated:
          "rounded-xl border border-[var(--sf-card-border,#eceef3)] bg-card",
        feature: "box-border rounded-2xl border",
        accent:
          "rounded-2xl border border-slate-200 border-t-[3px] border-t-[#4AABF0] bg-card",
        promo:
          "rounded-[24px] border border-white/20 bg-white/[0.10] text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-[14px]",
        ghost: "rounded-xl border border-transparent bg-transparent",
      },
      interactive: {
        none: "",
        lift: "transition-shadow duration-300 hover:shadow-[var(--sf-card-shadow-hover,0_24px_70px_rgba(3,7,18,0.08))]",
        outline: "transition-colors hover:border-primary",
        raise:
          "transition-all duration-500 ease-out hover:-translate-y-1 hover:border-white/35 hover:bg-white/[0.14] hover:shadow-[0_28px_80px_rgba(0,0,0,0.24)]",
      },
      size: {
        default: "",
        sm: "",
        md: "",
        lg: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        size: "sm",
        class: "[--card-spacing:--spacing(3)]",
      },
      ...marketingSized.flatMap((variant) => [
        { variant, size: "sm" as const, class: "p-5" },
        { variant, size: "md" as const, class: "p-6 md:p-8" },
        { variant, size: "lg" as const, class: "p-8 md:p-10" },
      ]),
    ],
    defaultVariants: {
      variant: "default",
      interactive: "none",
      size: "default",
    },
  }
)

function Card({
  className,
  variant = "default",
  interactive = "none",
  size = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(cardVariants({ variant, interactive, size }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
}
