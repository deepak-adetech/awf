"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const words = [
  "We",
  "build",
  "AI",
  "workflows",
  "the way",
  "good",
  "ops",
  "teams",
  "build",
  "process",
  "—",
  "auditable,",
  "measurable,",
  "boring",
  "to",
  "your",
  "lawyers,",
  "magic",
  "to",
  "your",
  "team.",
];

export default function Manifesto() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>(".m-word");
      gsap.set(els, { opacity: 0.12 });

      gsap.to(els, {
        opacity: 1,
        ease: "none",
        stagger: 0.06,
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 0.4,
        },
      });

      gsap.from(".m-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root as any} className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1180px] px-5">
        <div className="m-line h-px w-full bg-ink/15 mb-12" />
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <div className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-ink/30" /> Operating thesis
            </div>
            <div className="mt-5 mono text-[12px] text-ink/55 leading-relaxed">
              We&apos;ve been on
              <br />both sides of the table.
              <br />Operators who hated
              <br />the &ldquo;AI vendor&rdquo; meeting.
              <br />Engineers who&apos;ve shipped
              <br />the systems that worked.
            </div>
          </div>
          <p className="lg:col-span-9 display text-[44px] md:text-[64px] leading-[1.05] tracking-tightest">
            {words.map((w, i) => (
              <span key={i} className="m-word inline-block mr-[0.22em]">
                {w}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
