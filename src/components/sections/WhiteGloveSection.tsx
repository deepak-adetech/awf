import Image from "next/image";
import { dayMilestones, testimonials } from "@/lib/content";

export function WhiteGloveSection() {
  return (
    <section
      className="dynamic-section-padding bg-[#F9F8F8]"
      style={
        {
          "--mobile-pt": "48px",
          "--mobile-pb": "30px",
          "--tablet-pt": "100px",
          "--tablet-pb": "50px",
          "--desktop-pt": "100px",
          "--desktop-pb": "50px",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto max-w-[1138px] px-6">
        {/* Badge with avatars */}
        <div className="flex items-center justify-center mb-8">
          <span className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-[#1E1E1E]">
            <span className="flex -space-x-1.5">
              {[
                "/callers/testimonials/justin-kahn.png",
                "/callers/testimonials/chelsea-thompson.png",
              ].map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt=""
                  width={28}
                  height={28}
                  className="size-7 rounded-full border-2 border-white object-cover"
                />
              ))}
            </span>
            <span>White-Glove Partner</span>
            <span className="flex -space-x-1.5">
              {[
                "/callers/testimonials/rob-stevenson.png",
                "/callers/testimonials/maria-gomez.png",
              ].map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt=""
                  width={28}
                  height={28}
                  className="size-7 rounded-full border-2 border-white object-cover"
                />
              ))}
            </span>
          </span>
        </div>

        <h2 className="text-center text-[32px] leading-[1.2] font-medium tracking-[-0.06em] text-[#1E1E1E] md:text-[60px] max-w-[1100px] mx-auto">
          We do the setup. You get the outcome.
        </h2>

        {/* Horizontal timeline */}
        <div className="mt-16 lg:mt-20 hidden md:block">
          <Timeline />
        </div>

        {/* Testimonials */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.slice(0, 3).map((t) => (
            <article
              key={t.authorName}
              className="rounded-[24px] border border-gray-100 bg-[#FAFAFA] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {t.companyLogoSrc && (
                <div className="mb-5 h-9 flex items-center">
                  <Image src={t.companyLogoSrc} alt="" width={120} height={36} className="h-7 w-auto object-contain" />
                </div>
              )}
              <p className="text-base lg:text-[17px] leading-snug text-[#1E1E1E]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                {t.authorAvatarSrc && (
                  <Image
                    src={t.authorAvatarSrc}
                    alt={t.authorName}
                    width={48}
                    height={48}
                    className="size-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-[#1E1E1E]">{t.authorName}</p>
                  <p className="text-xs text-[#1E1E1E]/60">{t.authorRole}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.slice(3).map((t) => (
            <article
              key={t.authorName}
              className="rounded-[24px] border border-gray-100 bg-[#FAFAFA] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {t.companyLogoSrc && (
                <div className="mb-5 h-9 flex items-center">
                  <Image src={t.companyLogoSrc} alt="" width={120} height={36} className="h-7 w-auto object-contain" />
                </div>
              )}
              <p className="text-base lg:text-[17px] leading-snug text-[#1E1E1E]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                {t.authorAvatarSrc && (
                  <Image
                    src={t.authorAvatarSrc}
                    alt={t.authorName}
                    width={48}
                    height={48}
                    className="size-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-[#1E1E1E]">{t.authorName}</p>
                  <p className="text-xs text-[#1E1E1E]/60">{t.authorRole}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  // 5 milestones, alternating above/below the line
  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gray-200">
        <div className="h-full w-[60%] bg-[#7C3AED]" />
      </div>
      {/* Milestones */}
      <div className="relative grid grid-cols-5 gap-4">
        {dayMilestones.map((m, i) => {
          const above = i % 2 === 0;
          const completed = i < 3;
          return (
            <div key={m.day} className="relative flex flex-col items-center min-h-[180px] justify-center">
              {above && (
                <div className="rounded-2xl bg-white shadow-md border border-gray-100 px-5 py-4 text-center min-w-[140px] mb-12">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#1E1E1E]/55">{m.day}</p>
                  <p className="mt-1 text-sm font-medium text-[#1E1E1E]">{m.label}</p>
                </div>
              )}
              <div className="absolute top-1/2 -translate-y-1/2 size-3 rounded-full" style={{ background: completed ? "#7C3AED" : "#D1D5DB" }} />
              {!above && (
                <div className="rounded-2xl bg-white shadow-md border border-gray-100 px-5 py-4 text-center min-w-[140px] mt-12">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#1E1E1E]/55">{m.day}</p>
                  <p className="mt-1 text-sm font-medium text-[#1E1E1E]">{m.label}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
