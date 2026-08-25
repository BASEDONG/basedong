import Image from "next/image";
import { testimonials } from "./content";

export function EnterpriseTestimonialsSection() {
  return (
    <section className="mb-[110px] w-full">
      <h3 className="mb-12 px-3.5 text-center text-[32px] font-bold md:mb-16 md:text-[48px]">
        客户证言
      </h3>

      <div className="flex px-3.5">
        <div className="mx-auto grid w-full max-w-[1397px] grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((item) => (
            <article
              key={item.company}
              className="overflow-hidden rounded-[12px] border border-[#eceef3] bg-white p-8 transition-shadow duration-300 hover:shadow-[0_22px_58px_rgba(3,7,18,0.08)] md:p-10"
            >
              <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-[8px]">
                <Image
                  src={item.image}
                  alt={item.company}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 640px"
                  className="object-cover"
                />
              </div>
              <h3 className="mb-4 text-[22px] font-bold text-[#161722] md:text-[24px]">
                {item.company}
              </h3>
              <p className="text-[15px] leading-7 text-[#57627f] md:text-[16px]">
                {item.quote}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
