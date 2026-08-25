import type { ReactNode } from "react";

import {
  ChevronRightIcon,
  LinkIcon,
} from "@/components/docs/shared/icons";
import { cn } from "@/lib/utils";
import { filterEnabledLinks } from "@/lib/routes";

import {
  advantages,
  contactEmail,
  moreLinks,
  nextPage,
  overview,
  pageMeta,
  products,
  scenarios,
} from "./content";

const visibleMoreLinks = filterEnabledLinks(moreLinks);

function HeadingLink({
  id,
  level,
  children,
  className,
}: {
  id: string;
  level: 2 | 3;
  children: ReactNode;
  className?: string;
}) {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Tag
      id={id}
      className={cn(
        "group/heading flex scroll-m-28 flex-row items-center gap-2 font-semibold text-[#0a0a0a]",
        level === 2 ? "mb-6 mt-12 text-2xl leading-8" : "mb-3 mt-8 text-xl leading-8",
        className,
      )}
    >
      <a href={`#${id}`} className="peer text-inherit no-underline">
        {children}
      </a>
      <LinkIcon className="size-3.5 shrink-0 text-[#737373] opacity-0 transition-opacity peer-hover:opacity-100 group-hover/heading:opacity-100" />
    </Tag>
  );
}

export function DocsArticle() {
  return (
    <article className="flex min-w-0 w-full flex-col gap-6 px-4 pt-8 md:mx-auto md:px-6 xl:px-12 xl:pt-12">
      <div className="flex items-center gap-1.5 text-[15px] text-[#737373]">
        <span className="truncate font-medium text-[#4AABF0]">{pageMeta.breadcrumb}</span>
      </div>

      <h1 className="text-3xl font-semibold leading-9 text-[#0a0a0a]">{pageMeta.title}</h1>
      <p className="mb-8 text-lg leading-7 text-[#737373]">{pageMeta.description}</p>

      <div className="prose max-w-none text-base leading-7 text-[color-mix(in_oklab,#0a0a0a_90%,transparent)]">
        <HeadingLink id="概述" level={2} className="mt-0">
          概述
        </HeadingLink>
        <p className="mb-5">{overview}</p>

        <HeadingLink id="核心产品矩阵" level={2}>
          核心产品矩阵
        </HeadingLink>

        {products.map((product, index) => (
          <div key={product.id}>
            <HeadingLink
              id={product.id}
              level={3}
              className={index === 0 ? "mt-0" : undefined}
            >
              {product.title}
            </HeadingLink>
            <ul className="mb-5 list-disc ps-4">
              {product.bullets.map((b) => (
                <li key={b} className="my-2">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <HeadingLink id="平台优势" level={2}>
          平台优势
        </HeadingLink>
        <ol className="mb-5 list-decimal ps-[26px]">
          {advantages.map((adv) => (
            <li key={adv.title} className="my-2">
              <p className="mb-0">
                <strong className="font-semibold text-[#0a0a0a]">{adv.title}</strong>
              </p>
              <ul className="mb-2 list-disc ps-4">
                {adv.bullets.map((b) => (
                  <li key={b} className="my-2">
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <HeadingLink id="适用场景" level={2}>
          适用场景
        </HeadingLink>
        <ul className="mb-5 list-disc ps-4">
          {scenarios.map((s) => (
            <li key={s.title} className="my-2">
              <strong className="font-semibold text-[#0a0a0a]">{s.title}</strong>
              ：{s.text}
            </li>
          ))}
        </ul>

        <HeadingLink id="联系我们" level={2}>
          联系我们
        </HeadingLink>
        <p className="mb-5">
          <a
            href={`mailto:${contactEmail}`}
            className="font-medium text-[#0a0a0a] underline decoration-[#4AABF0] decoration-[1.5px] underline-offset-2"
          >
            {contactEmail}
          </a>
        </p>

        <HeadingLink id="更多" level={2}>
          更多
        </HeadingLink>
        <ul className="mb-5 list-disc ps-4">
          {visibleMoreLinks.map((link) => (
            <li key={link.href} className="my-2">
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-[#0a0a0a] underline decoration-[#4AABF0] decoration-[1.5px] underline-offset-2"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1" />
      <div className="flex flex-row flex-wrap items-center justify-between gap-4 empty:hidden" />
      <div className="@container grid grid-cols-1 gap-4 pb-6">
        <a
          href={nextPage.href}
          className="flex flex-col gap-2 rounded-lg border border-[#9e9e9e]/20 p-4 text-end text-sm text-[#0a0a0a] transition-colors hover:bg-[#e6e6e6]/80 hover:text-[#171717] @max-lg:col-span-full"
        >
          <div className="inline-flex flex-row-reverse items-center gap-1.5 font-medium">
            <ChevronRightIcon className="-mx-1 size-4 shrink-0" />
            {nextPage.title}
          </div>
          <p className="truncate text-[#737373]">{nextPage.description}</p>
        </a>
      </div>
    </article>
  );
}
