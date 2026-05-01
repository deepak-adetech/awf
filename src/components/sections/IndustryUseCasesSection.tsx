"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { industries } from "@/lib/content";
import { PlayIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function IndustryUseCasesSection() {
  const [active, setActive] = useState(industries[0].id);
  const ind = industries.find((i) => i.id === active) ?? industries[0];

  return (
    <section className="dynamic-section-padding">
      <div className="mx-auto max-w-[1288px] px-6">
        <div className="flex items-center justify-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-[#1E1E1E]">
            <Image src="/callers/use-cases/b2c.svg" alt="" width={16} height={16} className="size-4" />
            Industry Use Cases
          </span>
        </div>
        <h2 className="text-center text-[32px] leading-[1.2] font-medium tracking-[-0.06em] text-[#1E1E1E] md:text-[60px]">
          ROI on every customer moment.
        </h2>

        {/* Tab pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 lg:gap-3">
          {industries.map((i) => (
            <button
              key={i.id}
              type="button"
              onClick={() => setActive(i.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                active === i.id
                  ? "border-[#7C3AED] bg-[#7C3AED] text-white"
                  : "border-gray-200 bg-white text-[#1E1E1E] hover:border-gray-300"
              )}
            >
              <Image
                src={i.iconSrc}
                alt=""
                width={16}
                height={16}
                className={cn("size-4", active === i.id && "invert brightness-0")}
              />
              {i.label}
            </button>
          ))}
        </div>

        <div
          key={ind.id}
          className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          style={{ animation: "var(--animate-tabs)" }}
        >
          {/* Left: Use cases + stats */}
          <div className="rounded-[28px] border border-gray-100 bg-[#FAFAFA] p-7 lg:p-9">
            <h3 className="text-lg font-medium text-[#1E1E1E]">Popular use cases in the industry:</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {ind.popularUseCases.map((u) => (
                <span
                  key={u}
                  className="inline-flex items-center gap-1 rounded-full border border-[#E5E5E5] bg-white px-3 py-1.5 text-xs font-medium text-[#1E1E1E]"
                >
                  {u}
                </span>
              ))}
            </div>

            {ind.stats && (
              <div className="mt-7 grid grid-cols-2 gap-4">
                {ind.stats.map((s, idx) => (
                  <div key={s.label} className="rounded-2xl bg-white border border-gray-100 p-5">
                    <AnimatedStatValue value={s.value} reKey={`${ind.id}-${idx}`} />
                    <p className="mt-1 text-xs uppercase tracking-wider text-[#1E1E1E]/60">{s.label}</p>
                  </div>
                ))}
              </div>
            )}

            <Link
              href="#"
              className="mt-7 inline-flex h-[48px] items-center justify-center rounded-xl bg-[#1E1E1E] px-6 text-sm font-medium text-white hover:bg-[#1E1E1E]/90"
            >
              Speak With Our Experts
              <span className="ml-2" aria-hidden>→</span>
            </Link>
          </div>

          {/* Right: Video card */}
          <div className="relative overflow-hidden rounded-[28px] border border-gray-100 bg-[#1E1E1E] min-h-[360px]">
            <Image
              src="/callers/industries/concierge.png"
              alt={ind.videoTitle ?? ""}
              fill
              className="object-cover opacity-90"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" aria-hidden />
            <button
              type="button"
              aria-label={`Play: ${ind.videoTitle}`}
              className="absolute inset-0 flex items-center justify-center group"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-white/90 text-[#1E1E1E] shadow-lg transition-transform duration-200 group-hover:scale-110">
                <PlayIcon className="size-7" />
              </span>
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                Hear It In Action
              </p>
              <p className="mt-1 text-lg lg:text-xl font-medium text-white">{ind.videoTitle}</p>
              <p className="mt-1 text-xs text-white/70">{ind.videoDuration}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Animated stat value: counts up from 0 to target whenever `reKey` changes. */
function AnimatedStatValue({ value, reKey }: { value: string; reKey: string }) {
  // Parse the numeric prefix once per value
  const match = value.match(/^(\d+(?:\.\d+)?)/);
  const target = match ? parseFloat(match[1]) : null;
  const suffix = match ? value.slice(match[1].length) : "";
  const isInt = target !== null && Number.isInteger(target);

  const [display, setDisplay] = useState(value);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (target === null) return;
    const duration = 800;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const cur = target * eased;
      setDisplay(`${isInt ? Math.round(cur) : cur.toFixed(1)}${suffix}`);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reKey, target, suffix, isInt]);

  return <p className="text-2xl lg:text-[32px] font-semibold text-[#7C3AED]">{target === null ? value : display}</p>;
}
