"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const root = useRef<HTMLElement | null>(null);
  const lines = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-headline > *", {
        scrollTrigger: { trigger: root.current, start: "top 75%" },
        y: 24,
        opacity: 0,
        duration: 0.85,
        ease: "power2.out",
        stagger: 0.08,
      });
      gsap.from(".cta-card", {
        scrollTrigger: { trigger: root.current, start: "top 70%" },
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
        delay: 0.2,
      });

      // Animate lines drawing
      if (lines.current) {
        const paths = lines.current.querySelectorAll<SVGPathElement>("path");
        paths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={root as any}
      className="relative py-28 md:py-40 overflow-hidden"
    >
      {/* Decorative grid lines */}
      <svg
        ref={lines}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 120 L 600 120 L 600 480 L 1200 480"
          stroke="rgba(13,107,78,0.18)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 0 480 L 360 480 L 360 60 L 1200 60"
          stroke="rgba(14,20,17,0.10)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 800 0 L 800 240 L 1200 240"
          stroke="rgba(13,107,78,0.14)"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      <div className="relative mx-auto max-w-[1320px] px-5">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7 cta-headline">
            <div className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-ink/30" />
              07 · Engage
            </div>
            <h2 className="mt-6 display text-[58px] md:text-[96px] leading-[0.94]">
              <span className="block">Show us</span>
              <span className="block">the workflow that&apos;s</span>
              <span className="block">
                <span className="italic font-light text-forge-600">eating</span> your
                team.
              </span>
            </h2>
            <p className="mt-7 text-[16px] text-ink/65 max-w-[520px]">
              We&apos;ll audit it in 30 minutes, send you a written recommendation
              within 48 hours, and tell you honestly whether we should build it.
              No deck, no decks-of-decks.
            </p>
          </div>

          <div className="lg:col-span-5 grid gap-4">
            <a href="mailto:hello@autoworkflows.ai" className="cta-card bp-card p-6 group flex items-center justify-between hover:bg-canvas-warm/40 transition-colors">
              <div>
                <div className="eyebrow">Direct</div>
                <div className="mt-2 text-[18px]">hello@autoworkflows.ai</div>
                <div className="mt-1 mono text-[11.5px] text-ink/50">Replies within 6 hours</div>
              </div>
              <ArrowUpRight size={20} className="text-ink/40 group-hover:text-forge-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
            </a>
            <a href="#" className="cta-card bp-card p-6 group flex items-center justify-between hover:bg-canvas-warm/40 transition-colors">
              <div>
                <div className="eyebrow">Book directly</div>
                <div className="mt-2 text-[18px]">30-min discovery call</div>
                <div className="mt-1 mono text-[11.5px] text-ink/50">Founders + principal engineer · No SDR</div>
              </div>
              <ArrowUpRight size={20} className="text-ink/40 group-hover:text-forge-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
            </a>
            <a href="#" className="cta-card bp-card p-6 group flex items-center justify-between hover:bg-canvas-warm/40 transition-colors">
              <div>
                <div className="eyebrow">Async</div>
                <div className="mt-2 text-[18px]">Loom us your worst workflow</div>
                <div className="mt-1 mono text-[11.5px] text-ink/50">We send a written response, not a sales pitch</div>
              </div>
              <ArrowUpRight size={20} className="text-ink/40 group-hover:text-forge-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
