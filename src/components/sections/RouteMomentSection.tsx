"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const cards = [
  {
    iconSrc: "/callers/section-icons/ai-brain-large.png",
    title: "Human time where it matters",
    body: "CometLab keeps your teams on the moments where judgment and presence actually change the outcome, not on routine questions and follow‑ups.",
    image: "/callers/omni/multilingual.png",
  },
  {
    iconSrc: "/callers/section-icons/arrow-growth.svg",
    title: "Coverage across the whole lifecycle",
    body: "From first outreach to win‑back, CometLab handles simple questions, checks, nudges, and outreach across every stage of the customer journey.",
    image: "/callers/omni/omni-channel.png",
  },
  {
    iconSrc: "/callers/section-icons/global.svg",
    title: "AI that feels human, not robotic",
    body: "Calls and messages are handled the way a good human would, so customers get quick, natural responses without feeling the AI underneath.",
    image: "/callers/omni/white-glove-care.png",
  },
  {
    iconSrc: "/callers/section-icons/handshake-md.svg",
    title: "Built into your existing stack",
    body: "CometLab plugs into the systems you already run, answering, qualifying, re‑engaging, and routing through your current tools in seconds.",
    image: "/callers/omni/native-integrations.png",
  },
  {
    iconSrc: "/callers/section-icons/crystal-ball.svg",
    title: "Clear routing between AI and people",
    body: "Simple work goes to CometLab, high‑stakes moments go to your team—so customer work is always routed to the right place.",
    image: "/callers/omni/insights-mode.png",
  },
];

export function RouteMomentSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const slideTo = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - 8, behavior: "smooth" });
    setActiveIdx(idx);
  };

  const scrollBy = (dir: 1 | -1) => {
    const next = Math.max(0, Math.min(cards.length - 1, activeIdx + dir));
    slideTo(next);
  };

  // Keep activeIdx in sync with scroll position (for swipe / drag scrolling)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const slideW = (el.children[0] as HTMLElement)?.offsetWidth ?? 360;
        const idx = Math.round(el.scrollLeft / (slideW + 20));
        setActiveIdx(Math.max(0, Math.min(cards.length - 1, idx)));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="dynamic-section-padding bg-[#F9F8F8]">
      <div className="mx-auto max-w-[1394px] px-6 lg:px-12 xl:px-16">
        <div className="flex items-end justify-between gap-6 mb-10 lg:mb-12">
          <h2 className="text-[32px] leading-[1.2] font-medium tracking-[-0.06em] text-[#1E1E1E] md:text-[60px] max-w-[860px]">
            Route every customer moment to the right pla
            <span className="text-[#FCC8E1]">ce</span>
          </h2>
          <div className="hidden md:flex items-center gap-3 shrink-0 mb-3">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollBy(-1)}
              disabled={activeIdx === 0}
              className="size-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#1E1E1E]/60 hover:text-[#1E1E1E] hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ArrowRightIcon className="size-4 rotate-180" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollBy(1)}
              disabled={activeIdx === cards.length - 1}
              className="size-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#1E1E1E]/60 hover:text-[#1E1E1E] hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ArrowRightIcon className="size-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="hidden sm:flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {cards.map((card, i) => (
            <RouteCard key={card.title} card={card} active={i === activeIdx} />
          ))}
        </div>

        {/* Pagination dots (mobile) */}
        <div className="md:hidden mt-6 flex justify-center gap-1.5">
          {cards.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => slideTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === activeIdx ? "w-6 bg-[#7C3AED]" : "w-1.5 bg-gray-300"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function RouteCard({ card, active }: { card: (typeof cards)[number]; active: boolean }) {
  return (
    <article
      className={cn(
        "group snap-start shrink-0 w-[280px] md:w-[320px] lg:w-[360px] aspect-[5/7] rounded-[28px] overflow-hidden relative shadow-md transition-all duration-500 cursor-pointer",
        active ? "scale-[1.02]" : "hover:scale-[1.01]"
      )}
    >
      {/* Background image */}
      <Image
        src={card.image}
        alt={card.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 360px"
      />
      {/* Blue gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(54,85,232,0.55) 0%, rgba(54,85,232,0.85) 100%)",
        }}
      />
      {/* Heading + body */}
      <div className="absolute inset-x-0 top-0 p-7 lg:p-8 z-[1]">
        <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
          <Image
            src={card.iconSrc}
            alt=""
            width={28}
            height={28}
            className="size-7 brightness-0 invert"
          />
        </div>
        <h3 className="text-white text-[22px] lg:text-[24px] leading-[1.2] font-medium tracking-[-0.02em]">
          {card.title}
        </h3>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-7 lg:p-8 z-[1]">
        <p className="text-white/85 text-sm lg:text-[15px] leading-[1.55]">{card.body}</p>
      </div>
    </article>
  );
}
