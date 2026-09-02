"use client";

import { BrandAvatar } from "@/components/marketing/shared/BrandAvatar";
import { useLocale } from "@/components/shared/LocaleProvider";
import { Card } from "@/components/ui/card";
import { getEnterpriseContent } from "./content";
import { getEnterpriseUiCopy } from "./enterprise-ui-copy";

export function EnterpriseTestimonialsSection() {
  const { locale } = useLocale();
  const { testimonialsTitle } = getEnterpriseUiCopy(locale);
  const { testimonials } = getEnterpriseContent(locale);

  return (
    <section className="mb-[110px] w-full">
      <h3 className="mb-12 px-3.5 text-center text-[32px] font-bold md:mb-16 md:text-[48px]">
        {testimonialsTitle}
      </h3>

      <div className="sf-content grid grid-cols-1 gap-8 md:grid-cols-2">
        {testimonials.map((item) => (
          <Card
            key={item.title}
            variant="surface"
            size="lg"
            interactive="lift"
          >
            <h3 className="mb-4 text-[22px] font-bold text-[#161722] md:text-[24px]">
              {item.title}
            </h3>
            <p className="mb-8 text-[15px] leading-7 text-[#57627f] md:text-[16px]">
              {item.body}
            </p>
            <div className="flex items-center">
              <BrandAvatar
                name={item.avatarSeed}
                size={32}
                className="mr-3 shrink-0 overflow-hidden rounded-full"
              />
              <span className="text-[15px] font-medium text-[#161722]">
                {item.role}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
