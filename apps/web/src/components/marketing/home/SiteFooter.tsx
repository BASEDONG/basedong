import Image from "next/image";
import {
  BilibiliIcon,
  GithubIcon,
  XiaohongshuIcon,
  ZhihuIcon,
} from "@/components/marketing/shared/icons";
import { NavAnchor } from "@/components/marketing/shared/NavAnchor";
import { ContactQrCode } from "@/components/marketing/shared/ContactQrCode";
import { APP_ROUTES, filterEnabledLinks } from "@/lib/routes";
import { BRAND } from "@/lib/assets";

const pageLinks = [
  { label: "价格", href: APP_ROUTES.pricing },
  {
    label: "文档",
    href: APP_ROUTES.docsIntroduction,
  },
  { label: "生态合作", href: APP_ROUTES.partner },
  { label: "公司介绍", href: APP_ROUTES.about },
  { label: "品牌理念", href: APP_ROUTES.brand },
];

const productLinks = filterEnabledLinks([
  { label: "大模型云服务", href: APP_ROUTES.consoleModels },
  { label: "AI 算力运营服务", href: APP_ROUTES.tokenFactory },
  { label: "预留实例", href: APP_ROUTES.reserved },
  { label: "私有化大模型服务平台", href: APP_ROUTES.enterprise },
  { label: "私有化大模型服务网关", href: APP_ROUTES.aiGateway },
]);

const legalLinks = [
  {
    label: "用户协议",
    href: "https://docs.siliconflow.cn/cn/legals/terms-of-service",
  },
  {
    label: "隐私协议",
    href: "https://docs.siliconflow.cn/cn/legals/privacy-policy",
  },
];

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
        <NavAnchor key={l.href} href={l.href} className="text-slate-800 hover:text-[#4AABF0]">
          {l.label}
        </NavAnchor>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="w-full bg-[#F2F5FA] pb-[70px] pt-[120px]">
      <div className="mx-auto mb-16 flex max-w-[1434px] items-start justify-between px-3.5 max-md:flex-col max-md:items-center max-md:gap-[66px]">
        <div className="max-md:text-center">
          <Image
            src={BRAND.logo}
            alt="八色鸫 basedong"
            width={160}
            height={32}
            className="mb-[33px] h-8 w-[160px]"
          />
          <p
            className="mb-10 text-xl font-light text-[#57627F]"
            style={{ letterSpacing: "6.6px" }}
          >
            做所有人的 AI。
          </p>
          <div className="mb-[22px] flex items-center justify-center gap-5 text-[#57627F] max-md:justify-center">
            <a
              href="https://github.com/siliconflow"
              aria-label="GitHub"
              className="text-[30px] hover:text-[#4AABF0]"
            >
              <GithubIcon />
            </a>
            <a
              href="https://space.bilibili.com/3546734179387926"
              aria-label="Bilibili"
              className="text-[30px] hover:text-[#4AABF0]"
            >
              <BilibiliIcon />
            </a>
            <a
              href="https://www.xiaohongshu.com/user/profile/64747711000000000f005ee5"
              aria-label="小红书"
              className="text-[30px] hover:text-[#4AABF0]"
            >
              <XiaohongshuIcon />
            </a>
            <a
              href="https://www.zhihu.com/org/huo-ji-liu-dong"
              aria-label="知乎"
              className="text-[30px] hover:text-[#4AABF0]"
            >
              <ZhihuIcon />
            </a>
          </div>
        </div>

        <div className="flex justify-center gap-[132px] max-md:gap-[30px]">
          <LinkColumn title="页面" links={pageLinks} />
          <LinkColumn title="产品" links={productLinks} />
          <LinkColumn title="法律" links={legalLinks} />
        </div>

        <div className="max-w-[272px]">
          <div className="mb-11 flex items-center justify-between gap-10">
            <div>
              <p className="mb-3 text-center text-base text-[#57627F]">微信</p>
              <ContactQrCode platform="wechat" />
            </div>
            <div>
              <p className="mb-3 text-center text-base text-[#57627F]">WhatsApp</p>
              <ContactQrCode platform="whatsapp" />
            </div>
          </div>

          <section className="max-w-[272px] space-y-2 text-base text-slate-800">
            <h3 className="text-slate-500">联系我们</h3>
            <div className="flex items-center">
              <span>市场合作：</span>
              <a href="mailto:basedong@88.com" className="text-[#4AABF0]">
                basedong@88.com
              </a>
            </div>
            <div className="flex items-start">
              <span className="whitespace-nowrap">地址：</span>
              <p>福建省泉州市丰泽区数字经济产业园综合楼</p>
            </div>
          </section>
        </div>
      </div>

      <section className="mx-auto max-w-[1434px] border-t border-[#D5D6EA] px-3.5 pt-9 text-center text-base text-[#57627F]">
        <p>© 八色鸫人工智能科技（福建省泉州市）有限责任公司 2026 版权所有</p>
      </section>
    </footer>
  );
}
