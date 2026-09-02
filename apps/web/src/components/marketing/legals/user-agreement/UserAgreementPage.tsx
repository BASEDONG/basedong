"use client";

import { useLocale } from "@/components/shared/LocaleProvider";
import { getUserAgreementContent } from "./content";

export function UserAgreementPage() {
  const { locale } = useLocale();
  const { pageTitle, intro, sections, closing } =
    getUserAgreementContent(locale);

  return (
    <article className="sf-content mx-auto max-w-3xl px-5 pb-16 pt-28 text-slate-800 lg:pt-32">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight text-slate-900">
        {pageTitle}
      </h1>
      <p className="mb-10 text-base leading-7 text-slate-600">{intro}</p>

      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-3 text-xl font-medium text-slate-900">
              {section.title}
            </h2>
            <div className="space-y-3 text-base leading-7 text-slate-700">
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              {section.bullets ? (
                <ul className="list-disc space-y-2 pl-5">
                  {section.bullets.map((item) => (
                    <li key={item.slice(0, 24)}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-12 text-base leading-7 font-medium text-slate-800">
        {closing}
      </p>
    </article>
  );
}
