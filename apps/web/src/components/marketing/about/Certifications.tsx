import Image from "next/image";
import { ABOUT_COPY, CERTIFICATIONS } from "./content";

export function Certifications() {
  return (
    <section className="w-full py-20">
      <h3 className="mb-[72px] text-center text-[48px] text-[#1e293b] max-[1024px]:text-[36px]">
        {ABOUT_COPY.certsTitle}
      </h3>
      <div className="flex items-center justify-center">
        <div className="mx-auto grid grid-cols-4 gap-24 max-[1024px]:grid-cols-1 max-[1024px]:gap-12">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.label}
              className="flex flex-col items-center gap-6"
            >
              <Image
                src={cert.image}
                alt=""
                width={128}
                height={128}
                className="h-[128px] w-[128px]"
              />
              <div>{cert.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
