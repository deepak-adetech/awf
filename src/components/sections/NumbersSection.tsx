"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { numberStats } from "@/lib/content";
import { cn } from "@/lib/utils";

const CARD_THEMES = [
  { bg: "bg-white", chip: "bg-[#7C3AED]" },
  { bg: "bg-[#F4D8FF]", chip: "bg-[#A855F7]" },
  { bg: "bg-[#FFE9A8]", chip: "bg-[#F59E0B]" },
  { bg: "bg-[#FFD8E2]", chip: "bg-[#EC4899]" },
];

export function NumbersSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % numberStats.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="dynamic-section-padding bg-white"
      style={
        {
          "--mobile-pt": "60px",
          "--mobile-pb": "60px",
          "--desktop-pt": "73px",
          "--desktop-pb": "73px",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto max-w-[1248px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-16 items-center">
          {/* LEFT: Title block */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-[#1E1E1E]">
              <Image src="/callers/section-icons/statistics.svg" alt="" width={16} height={16} className="size-4" />
              CometLab In Numbers
            </span>
            <h2 className="mt-7 text-[32px] leading-[1.2] font-medium tracking-[-0.06em] text-[#1E1E1E] md:text-[60px]">
              150 million+ moments handled every ye
              <span className="text-[#7C3AED]">ar</span>
            </h2>
          </div>

          {/* RIGHT: Stacked card deck */}
          <div className="relative h-[460px] lg:h-[520px] flex items-center justify-center">
            <div className="relative w-full max-w-[480px] h-full">
              {numberStats.map((stat, i) => {
                const offset = (i - active + numberStats.length) % numberStats.length;
                const isActive = offset === 0;
                const theme = CARD_THEMES[i % CARD_THEMES.length];

                // Stack transform — active is centered, others are fanned behind
                let transform = "";
                let zIndex = 10;
                let opacity = 1;
                if (isActive) {
                  transform = "translate(0, 0) rotate(0deg) scale(1)";
                  zIndex = 50;
                } else if (offset === 1) {
                  transform = "translate(60px, 24px) rotate(6deg) scale(0.95)";
                  zIndex = 40;
                  opacity = 0.95;
                } else if (offset === 2) {
                  transform = "translate(-50px, 24px) rotate(-6deg) scale(0.93)";
                  zIndex = 30;
                  opacity = 0.9;
                } else {
                  transform = "translate(-30px, 50px) rotate(-2deg) scale(0.88)";
                  zIndex = 20;
                  opacity = 0.85;
                }

                return (
                  <article
                    key={stat.title}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(i)}
                    className={cn(
                      "absolute inset-0 rounded-[28px] border border-gray-100 shadow-[0_18px_50px_rgba(0,0,0,0.08)] cursor-pointer",
                      theme.bg
                    )}
                    style={{
                      transform,
                      zIndex,
                      opacity,
                      transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.6s, box-shadow 0.6s",
                    }}
                  >
                    <div className="p-7 lg:p-9 h-full flex flex-col">
                      <div
                        className={cn(
                          "flex size-11 items-center justify-center rounded-xl",
                          isActive ? "bg-[#7C3AED]/10" : "bg-white/60"
                        )}
                      >
                        <Image src={stat.iconSrc} alt="" width={22} height={22} className="size-[22px]" />
                      </div>
                      <h3 className="mt-5 text-[22px] lg:text-[26px] font-semibold text-[#1E1E1E] leading-[1.15]">
                        {stat.title}
                      </h3>
                      <p className="mt-3 text-[14px] lg:text-[15px] text-[#1E1E1E]/70 leading-relaxed">
                        {stat.body}
                      </p>
                      <p className={cn("mt-3 text-[14px] font-semibold", isActive ? "text-[#1E1E1E]" : "text-[#1E1E1E]/80")}>
                        Get the edge.
                      </p>

                      {/* Illustration at bottom */}
                      {stat.illustrationSrc && (
                        <div className="mt-auto pt-5">
                          <div className="overflow-hidden rounded-2xl">
                            <Image
                              src={stat.illustrationSrc}
                              alt=""
                              width={450}
                              height={256}
                              className="h-auto w-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination dots */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-[60]">
              {numberStats.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show stat ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === active ? "w-7 bg-[#1E1E1E]" : "w-1.5 bg-[#1E1E1E]/30"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
