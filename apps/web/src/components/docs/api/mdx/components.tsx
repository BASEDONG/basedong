import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import {
  Blocks,
  ChartBar,
  CreditCard,
  Database,
  FileQuestion,
  FileText,
  FolderKanban,
  Headphones,
  Image,
  Key,
  KeyRound,
  Link2,
  List,
  ListTodo,
  MessageSquare,
  Network,
  Radio,
  ScrollText,
  Search,
  Server,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Store,
  Ticket,
  UserCheck,
  Users,
  Video,
} from "lucide-react";

import { APIPage } from "./APIPage";
import { Callout, Card, Cards } from "./ui";
import { LinkIcon } from "@/components/docs/shared/icons";
import { cn } from "@/lib/utils";

function Heading({
  as: Tag,
  id,
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"h2"> & {
  as: "h1" | "h2" | "h3" | "h4";
  id?: string;
}) {
  const sizes = {
    h1: "mb-4 mt-0 text-3xl leading-9",
    h2: "mb-6 mt-12 text-2xl leading-8",
    h3: "mb-3 mt-8 text-xl leading-8",
    h4: "mb-2 mt-6 text-lg leading-7",
  };
  return (
    <Tag
      id={id}
      className={cn(
        "group/heading flex scroll-m-28 flex-row items-center gap-2 font-semibold text-[#0a0a0a]",
        sizes[Tag],
        className,
      )}
      {...props}
    >
      {id ? (
        <a href={`#${id}`} className="peer text-inherit no-underline">
          {children}
        </a>
      ) : (
        children
      )}
      {id ? (
        <LinkIcon className="size-3.5 shrink-0 text-[#737373] opacity-0 transition-opacity peer-hover:opacity-100 group-hover/heading:opacity-100" />
      ) : null}
    </Tag>
  );
}

export const docsMdxComponents = {
  Card,
  Cards,
  Callout,
  APIPage,
  // lucide icons used in index.mdx
  List,
  MessageSquare,
  FileText,
  Database,
  Search,
  ShieldCheck,
  Headphones,
  Radio,
  Image,
  Video,
  FileQuestion,
  Server,
  SlidersHorizontal,
  UserCheck,
  Users,
  KeyRound,
  Link2,
  Network,
  Blocks,
  Key,
  Ticket,
  CreditCard,
  ScrollText,
  ChartBar,
  ListTodo,
  FolderKanban,
  Store,
  ShieldAlert,
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className="font-medium text-[#0a0a0a] underline decoration-[#4AABF0] decoration-[1.5px] underline-offset-2"
          {...props}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className="font-medium text-[#0a0a0a] underline decoration-[#4AABF0] decoration-[1.5px] underline-offset-2"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  },
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <Heading as="h1" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <Heading as="h2" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <Heading as="h3" {...props} />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <Heading as="h4" {...props} />
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p
      className={cn("mb-5 text-base leading-7 text-[color-mix(in_oklab,#0a0a0a_90%,transparent)]", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul className={cn("mb-5 list-disc ps-4", className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol className={cn("mb-5 list-decimal ps-[26px]", className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className={cn("my-2", className)} {...props} />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code
      className={cn(
        "rounded bg-[#ededed] px-1 py-0.5 font-mono text-[0.9em] text-[#0a0a0a]",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className={cn(
        "mb-5 overflow-x-auto rounded-lg border border-[#9e9e9e]/20 bg-[#0a0a0a] p-4 text-[13px] leading-6 text-[#f5f5f5] [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit",
        className,
      )}
      {...props}
    />
  ),
  strong: ({ className, ...props }: ComponentPropsWithoutRef<"strong">) => (
    <strong className={cn("font-semibold text-[#0a0a0a]", className)} {...props} />
  ),
} satisfies MDXComponents;
