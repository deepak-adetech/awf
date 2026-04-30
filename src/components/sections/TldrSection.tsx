import Image from "next/image";
import Link from "next/link";
import { featuredInLogos } from "@/lib/content";

export function TldrSection() {
  return (
    <section className="dynamic-section-padding bg-[#F9F8F8]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="flex items-center justify-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-[#1E1E1E]">
            <Image src="/callers/icons/news.svg" alt="" width={16} height={16} />
            TL.DR
          </span>
        </div>

        <h2 className="text-center text-[32px] leading-[1.2] font-medium tracking-[-0.06em] text-[#1E1E1E] md:text-[60px]">
          CometLab makes &ldquo;satisfied&rdquo; feel underwhelming
        </h2>

        <div className="mt-10 flex justify-center">
          <Link
            href="#"
            className="inline-flex h-[52px] items-center justify-center rounded-full bg-[#1E1E1E] px-10 text-[15px] font-medium text-white hover:bg-[#1E1E1E]/90"
          >
            Learn More
          </Link>
        </div>

        {/* Featured In - static row */}
        <div className="mt-16 lg:mt-20">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#1E1E1E]/55 mb-8">
            FEATURED IN
          </p>
          <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
            {featuredInLogos.map((l) => (
              <div key={l.name} className="shrink-0">
                <Image
                  src={l.src}
                  alt={l.name}
                  width={l.width}
                  height={l.height}
                  className="h-7 lg:h-9 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
