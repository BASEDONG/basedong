import { testimonials } from "./content";

function QuoteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12.8504 0L12.8504 15.874C12.8504 20.1995 11.6955 23.748 9.38583 26.5197C7.07611 29.3333 3.94751 31.2021 0 32.126L0 25.0709C1.21785 24.6929 2.20472 24.231 2.96063 23.685C3.71654 23.1391 4.30446 22.4882 4.72441 21.7323C5.14436 20.9764 5.41732 20.0945 5.54331 19.0866C5.66929 18.1207 5.73228 17.0499 5.73228 15.874L5.73228 14.1732L0 14.1732L0 0L12.8504 0ZM32 0L32 15.874C32 20.1995 30.8451 23.748 28.5354 26.5197C26.2257 29.3333 23.0971 31.2021 19.1496 32.126L19.1496 25.0709C20.3674 24.6929 21.3543 24.231 22.1102 23.685C22.8661 23.1391 23.454 22.4882 23.874 21.7323C24.2939 20.9764 24.567 20.0945 24.6929 19.0866C24.8189 18.1207 24.8819 17.0499 24.8819 15.874L24.8819 14.1732L19.1496 14.1732L19.1496 0L32 0Z"
        fill="#4AABF0"
        fillOpacity="0.15"
      />
    </svg>
  );
}

export function TestimonialsSection() {
  return (
    <section className="w-full bg-white px-4 py-40 max-md:py-24">
      <h2 className="mb-6 bg-[linear-gradient(180deg,#3A9AE0_9.58%,#4AABF0_50.21%)] bg-clip-text text-center text-[48px] font-semibold leading-[1.5] text-transparent max-[1280px]:text-[38px] max-[960px]:text-[28px]">
        合作伙伴怎么说
      </h2>

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-3 gap-6 max-[1280px]:grid-cols-1">
        {testimonials.map((item) => (
          <article
            key={item.title}
            className="group relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-lg border border-white/40 p-8 shadow-sm backdrop-blur will-change-transform"
            style={{ backgroundColor: item.bg }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 28%, rgba(255,255,255,0) 60%)",
              }}
            />
            <div>
              <h3 className="mb-4 flex items-center justify-between text-[28px] font-semibold text-slate-800">
                {item.title}
                <QuoteIcon />
              </h3>
              <p className="text-[16px] leading-[1.75] text-slate-600">
                {item.quote}
              </p>
            </div>
            <div className="relative z-10 mt-8 flex items-center">
              <div
                className="mr-2 h-6 w-6 rounded-full bg-cover bg-center bg-gray-300"
                style={{ backgroundImage: `url(${item.avatar})` }}
              />
              <span className="text-[14px] text-slate-500">{item.role}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
