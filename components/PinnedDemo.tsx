"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const states = [
  {
    title: "Hour 0",
    sub: "Inbox, no one&apos;s home",
    detail:
      "412 customer emails, 3 spreadsheets, an SLA quietly slipping. The work that everyone hates and no one owns.",
  },
  {
    title: "Day 3",
    sub: "Audit complete",
    detail:
      "We&apos;ve sat with two operators, mapped the actual decisions, and picked the workflow with the highest leverage.",
  },
  {
    title: "Week 2",
    sub: "Shadow mode",
    detail:
      "The agent reads each ticket alongside your team. We tune until its judgment matches your top operator&apos;s. Side-by-side, not above.",
  },
  {
    title: "Week 4",
    sub: "Live in production",
    detail:
      "82% auto-resolution. 26-second median response. Your team handles the 18% that actually requires a human.",
  },
];

export default function PinnedDemo() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>(".pd-slide");
      const progress = document.querySelectorAll<HTMLElement>(".pd-tick");
      const total = slides.length;

      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: () => `+=${total * 90}%`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(total - 1, Math.floor(self.progress * total));
          slides.forEach((s, i) => {
            gsap.to(s, {
              autoAlpha: i === idx ? 1 : 0,
              y: i === idx ? 0 : 18,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          });
          progress.forEach((p, i) => {
            p.style.background =
              i <= idx ? "#0D6B4E" : "rgba(14,20,17,0.12)";
          });
        },
      });

      gsap.set(slides[0], { autoAlpha: 1 });
      slides.slice(1).forEach((s) => gsap.set(s, { autoAlpha: 0 }));

      // looping packet on the canvas
      const packet = document.querySelector<SVGCircleElement>(".pd-packet");
      const path = document.querySelector<SVGPathElement>(".pd-path");
      if (path && packet) {
        const len = path.getTotalLength();
        const proxy = { v: 0 };
        gsap.to(proxy, {
          v: 1,
          duration: 4,
          ease: "none",
          repeat: -1,
          onUpdate: () => {
            const p = path.getPointAtLength(proxy.v * len);
            packet.setAttribute("cx", String(p.x));
            packet.setAttribute("cy", String(p.y));
          },
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root as any} className="relative h-screen overflow-hidden bg-canvas-warm/40 border-y border-ink/10">
      <div className="absolute inset-0 bp-grid opacity-60 mask-edges-y" />

      <div className="relative h-full mx-auto max-w-[1320px] px-5 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <div className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-ink/30" /> Live · scroll to advance
          </div>
          <div className="relative mt-6 min-h-[280px]">
            {states.map((s, i) => (
              <article
                key={i}
                className="pd-slide absolute inset-0"
                style={{ visibility: "visible" }}
              >
                <div className="mono text-[11px] text-forge-600">
                  {s.title}
                </div>
                <h3
                  className="mt-3 display-tight text-[40px] md:text-[56px]"
                  dangerouslySetInnerHTML={{ __html: s.sub }}
                />
                <p
                  className="mt-5 text-[15px] text-ink/65 leading-[1.6] max-w-[440px]"
                  dangerouslySetInnerHTML={{ __html: s.detail }}
                />
              </article>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-1.5">
            {states.map((_, i) => (
              <span
                key={i}
                className="pd-tick h-1 w-12 rounded-full transition-colors"
                style={{ background: i === 0 ? "#0D6B4E" : "rgba(14,20,17,0.12)" }}
              />
            ))}
            <span className="ml-3 mono text-[10.5px] text-ink/45">
              {states.length} states
            </span>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bp-card p-5 relative">
            <div className="flex items-center justify-between mb-3 mono text-[10.5px] text-ink/50">
              <span>cabinet · live-trace · ops-12.flow</span>
              <span className="text-forge-600">●  recording</span>
            </div>
            <svg viewBox="0 0 720 380" className="w-full h-auto">
              <defs>
                <pattern id="bp2" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.8" fill="rgba(14,20,17,0.10)" />
                </pattern>
              </defs>
              <rect width="720" height="380" fill="url(#bp2)" opacity="0.6" />

              {/* skeleton frames */}
              {[
                { x: 30, y: 60, label: "INBOX" },
                { x: 230, y: 30, label: "CLASSIFY" },
                { x: 230, y: 130, label: "EXTRACT" },
                { x: 430, y: 80, label: "AGENT v3" },
                { x: 430, y: 220, label: "REVIEW" },
                { x: 600, y: 30, label: "CRM" },
                { x: 600, y: 140, label: "TICKET" },
                { x: 600, y: 250, label: "SLACK" },
              ].map((n, i) => (
                <g key={i}>
                  <rect
                    x={n.x}
                    y={n.y}
                    width="90"
                    height="44"
                    rx="8"
                    fill="#FFFFFF"
                    stroke="rgba(14,20,17,0.14)"
                  />
                  <rect x={n.x} y={n.y} width="3" height="44" rx="2" fill="#0D6B4E" />
                  <text
                    x={n.x + 12}
                    y={n.y + 26}
                    fontSize="10.5"
                    fill="#0E1411"
                    style={{ letterSpacing: "0.06em" }}
                  >
                    {n.label}
                  </text>
                </g>
              ))}

              {/* The flowing path */}
              <path
                className="pd-path"
                d="M 120 82 C 180 82, 200 52, 230 52 M 230 152 C 320 152, 340 102, 430 102 M 520 102 C 560 102, 580 52, 600 52 M 520 102 C 560 102, 580 162, 600 162 M 430 242 C 480 242, 540 272, 600 272"
                stroke="#0D6B4E"
                strokeWidth="1.4"
                fill="none"
                opacity="0.65"
                strokeDasharray="4 6"
              />
              <circle className="pd-packet" r="5" fill="#0D6B4E" />
            </svg>

            <div className="mt-3 grid grid-cols-3 gap-3 text-[12px]">
              <div className="border-l border-forge-500/40 pl-3">
                <div className="mono text-[10px] text-ink/45">queue depth</div>
                <div className="display-tight text-[22px]">412 → 0</div>
              </div>
              <div className="border-l border-forge-500/40 pl-3">
                <div className="mono text-[10px] text-ink/45">first response</div>
                <div className="display-tight text-[22px]">26s</div>
              </div>
              <div className="border-l border-forge-500/40 pl-3">
                <div className="mono text-[10px] text-ink/45">human-in-loop</div>
                <div className="display-tight text-[22px]">4%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
