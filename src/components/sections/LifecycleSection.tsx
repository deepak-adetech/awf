"use client";

import { useState } from "react";
import Image from "next/image";
import { lifecycleStages } from "@/lib/content";
import { cn } from "@/lib/utils";

const STAGE_THEME: Record<string, { bg: string; chipBg: string }> = {
  prospect: { bg: "bg-[#7DC658]", chipBg: "bg-[#5BA938]" },
  "new-customer": { bg: "bg-[#E5EAFF]", chipBg: "bg-[#7C3AED]" },
  active: { bg: "bg-[#FFE4E1]", chipBg: "bg-[#E14B6A]" },
  churn: { bg: "bg-[#FFE6BB]", chipBg: "bg-[#E89B2D]" },
};

export function LifecycleSection() {
  const [active, setActive] = useState(lifecycleStages[0].id);

  return (
    <section
      className="dynamic-section-padding"
      style={
        {
          "--tablet-pt": "80px",
          "--tablet-pb": "80px",
          "--desktop-pt": "242px",
          "--desktop-pb": "242px",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto max-w-[1294px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#1E1E1E]">
              <Image src="/callers/section-icons/handshake-md.svg" alt="" width={16} height={16} />
              Across the Customer Lifecycle
            </span>
            <h2 className="mt-7 text-[30px] leading-[1] font-medium tracking-[-0.06em] text-[#1E1E1E] md:text-[40px] md:leading-[1.2]">
              We build customer moments that earn the highest engagement at every step of the journe
              <span className="text-[#7C3AED]">y.</span>
            </h2>

            <ul className="mt-10 relative">
              <span className="absolute left-0 top-2 bottom-2 w-[2px] bg-gray-200 rounded-full" />
              {lifecycleStages.map((s) => {
                const isActive = active === s.id;
                return (
                  <li key={s.id} className="relative">
                    {isActive && (
                      <span className="absolute left-0 top-2 h-7 w-[2px] rounded-full bg-[#7C3AED]" />
                    )}
                    <button
                      type="button"
                      onClick={() => setActive(s.id)}
                      className={cn(
                        "block w-full text-left pl-6 py-3 transition-colors",
                        isActive
                          ? "text-[18px] font-semibold text-[#1E1E1E]"
                          : "text-[16px] font-medium text-[#1E1E1E]/45 hover:text-[#1E1E1E]/80"
                      )}
                    >
                      {s.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: Stack of cards, active is large, others are collapsed */}
          <div className="space-y-4 hidden lg:block">
            {lifecycleStages.map((s) => {
              const isActive = active === s.id;
              const theme = STAGE_THEME[s.id] ?? { bg: "bg-gray-100", chipBg: "bg-gray-700" };
              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={cn(
                    "relative w-full overflow-hidden rounded-[28px] transition-[height,opacity,transform] duration-500 text-left",
                    isActive ? "h-[420px] shadow-lg" : "h-[80px] hover:opacity-90",
                    theme.bg
                  )}
                >
                  {isActive ? (
                    <>
                      <Image
                        src={s.imageSrc}
                        alt={s.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 600px"
                      />
                      <div
                        className={cn(
                          "absolute top-5 left-5 rounded-full px-5 py-2 text-white text-sm font-medium z-[1]",
                          theme.chipBg
                        )}
                      >
                        {s.title}
                      </div>
                      <span
                        className="absolute bottom-5 right-5 size-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#1E1E1E] z-[1]"
                        aria-hidden
                      >
                        <svg className="size-5" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 5v14M5 12h14"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </>
                  ) : (
                    <div className="h-full flex items-center pl-7">
                      <p className="text-[15px] font-medium text-[#1E1E1E]/70">{s.title}</p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
