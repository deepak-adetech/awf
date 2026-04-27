"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-headline > *", {
        scrollTrigger: { trigger: root.current, start: "top 75%" },
        y: 18,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.07,
      });
      gsap.from(".cta-card", {
        scrollTrigger: { trigger: root.current, start: "top 72%" },
        y: 18,
        opacity: 0,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.08,
        delay: 0.15,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={root as any}
      className="relative py-16 md:py-20"
    >
      <div className="relative mx-auto max-w-[1200px] px-5">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 cta-headline">
            <div className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-ink/30" />
              07 · Engage
            </div>
            <h2 className="mt-5 display text-[34px] md:text-[44px] leading-[1.02]">
              <span className="block">Show us the workflow</span>
              <span className="block">
                that&apos;s{" "}
                <span className="italic font-light text-gradient-azure">
                  eating
                </span>{" "}
                your team.
              </span>
            </h2>
            <p className="mt-5 text-[15px] text-ink/65 max-w-[440px] leading-[1.6]">
              We&apos;ll audit it in 30 minutes, send a written recommendation
              within 48 hours, and tell you honestly whether we should build it.
              No deck, no decks-of-decks.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="mailto:hello@autoworkflows.ai" className="btn-grad">
                Book a 30-min audit <ArrowUpRight size={15} />
              </a>
              <span className="mono text-[11px] text-ink/45">
                Replies within 6 hours · Founders + principal engineer · No SDR
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 grid gap-3">
            <a
              href="mailto:hello@autoworkflows.ai"
              className="cta-card bp-card p-5 group flex items-center justify-between hover:bg-canvas-warm/40 transition-colors"
            >
              <div>
                <div className="eyebrow">Direct</div>
                <div className="mt-1.5 text-[16px]">hello@autoworkflows.ai</div>
                <div className="mt-1 mono text-[11px] text-ink/50">
                  Replies within 6 hours
                </div>
              </div>
              <ArrowUpRight
                size={18}
                className="text-ink/40 group-hover:text-azure-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition"
              />
            </a>
            <a
              href="#"
              className="cta-card bp-card p-5 group flex items-center justify-between hover:bg-canvas-warm/40 transition-colors"
            >
              <div>
                <div className="eyebrow">Book directly</div>
                <div className="mt-1.5 text-[16px]">30-min discovery call</div>
                <div className="mt-1 mono text-[11px] text-ink/50">
                  Founders + principal engineer
                </div>
              </div>
              <ArrowUpRight
                size={18}
                className="text-ink/40 group-hover:text-azure-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition"
              />
            </a>
            <a
              href="#"
              className="cta-card bp-card p-5 group flex items-center justify-between hover:bg-canvas-warm/40 transition-colors"
            >
              <div>
                <div className="eyebrow">Async</div>
                <div className="mt-1.5 text-[16px]">
                  Loom us your worst workflow
                </div>
                <div className="mt-1 mono text-[11px] text-ink/50">
                  We send a written response, not a sales pitch
                </div>
              </div>
              <ArrowUpRight
                size={18}
                className="text-ink/40 group-hover:text-azure-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
