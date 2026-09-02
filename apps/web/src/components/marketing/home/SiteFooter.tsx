"use client";

import { NavAnchor } from "@/components/marketing/shared/NavAnchor";
import { ContactQrCode } from "@/components/marketing/shared/ContactQrCode";
import { getChromeCopy } from "@/components/marketing/shared/chrome-copy";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { useLocale } from "@/components/shared/LocaleProvider";
import { APP_ROUTES, filterEnabledLinks } from "@/lib/routes";

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4 text-base">
      <p className="text-base text-slate-500">{title}</p>
      {links.map((l) => (
        <NavAnchor
          key={l.href}
          href={l.href}
          className="text-slate-800 hover:text-[#4AABF0]"
        >
          {l.label}
        </NavAnchor>
      ))}
    </div>
  );
}

export function SiteFooter() {
  const { locale } = useLocale();
  const c = getChromeCopy(locale);

  const pageLinks = filterEnabledLinks([
    { label: c.nav.pricing, href: APP_ROUTES.pricing },
    { label: c.nav.docs, href: APP_ROUTES.docsIntroduction },
    { label: c.nav.partner, href: APP_ROUTES.partner },
    { label: c.footer.companyIntro, href: APP_ROUTES.about },
    { label: c.footer.brandIdea, href: APP_ROUTES.brand },
  ]);

  const productLinks = filterEnabledLinks([
    { label: c.nav.cloudMaas, href: APP_ROUTES.consoleModels },
    { label: c.nav.tokenFactory, href: APP_ROUTES.tokenFactory },
    { label: c.nav.reserved, href: APP_ROUTES.reserved },
    { label: c.nav.privatePlatform, href: APP_ROUTES.enterprise },
    { label: c.nav.privateGateway, href: APP_ROUTES.aiGateway },
  ]);

  const legalLinks = [
    { label: c.footer.userAgreement, href: APP_ROUTES.userAgreement },
  ];

  return (
    <footer className="w-full bg-[#F2F5FA] pb-[70px] pt-[120px]">
      <div className="sf-content mb-16 flex items-start justify-between max-md:flex-col max-md:items-center max-md:gap-[66px]">
        <div className="max-md:text-center">
          <BrandLogo size="nav" className="mb-[33px]" alt={c.brandAlt} />
          <p
            className="mb-10 text-xl font-light text-[#57627F]"
            style={{ letterSpacing: "6.6px" }}
          >
            {c.tagline}
          </p>
        </div>

        <div className="flex justify-center gap-[132px] max-md:gap-[30px]">
          <LinkColumn title={c.footer.pages} links={pageLinks} />
          <LinkColumn title={c.footer.products} links={productLinks} />
          <LinkColumn title={c.footer.legal} links={legalLinks} />
        </div>

        <div className="max-w-[272px]">
          <div className="mb-11 flex items-center justify-between gap-10">
            <div>
              <p className="mb-3 text-center text-base text-[#57627F]">
                {c.wechat}
              </p>
              <ContactQrCode platform="wechat" />
            </div>
            <div>
              <p className="mb-3 text-center text-base text-[#57627F]">
                WhatsApp
              </p>
              <ContactQrCode platform="whatsapp" />
            </div>
          </div>

          <section className="max-w-[272px] space-y-2 text-base text-slate-800">
            <h3 className="text-slate-500">{c.contactUs}</h3>
            <div className="flex items-center">
              <span>{c.marketCoop}</span>
              <a href="mailto:basedong@88.com" className="text-[#4AABF0]">
                basedong@88.com
              </a>
            </div>
            <div className="flex items-start">
              <span className="whitespace-nowrap">{c.addressLabel}</span>
              <p>{c.address}</p>
            </div>
          </section>
        </div>
      </div>

      <section className="sf-content border-t border-[#D5D6EA] pt-9 text-center text-base text-[#57627F]">
        <p>{c.copyright}</p>
      </section>
    </footer>
  );
}
