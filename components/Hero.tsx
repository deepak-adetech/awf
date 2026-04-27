"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Play } from "lucide-react";
import MiniWorkflow from "./MiniWorkflow";
import ActivityFeed from "./ActivityFeed";

const titleLines: string[][] = [
  ["AI", "workflows", "that"],
  ["quietly", "run"],
  ["your", "operations."],
];

export default function Hero() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".h-tag", {
        y: 8,
        opacity: 0,
        duration: 0.55,
        delay: 0.15,
      });

      tl.from(
        ".h-word",
        {
          y: 56,
          opacity: 0,
          duration: 0.9,
          stagger: 0.05,
        },
        "-=0.25"
      );

      tl.from(
        ".h-sub",
        { y: 14, opacity: 0, duration: 0.7 },
        "-=0.5"
      );

      tl.from(
        ".h-cta > *",
        { y: 12, opacity: 0, duration: 0.55, stagger: 0.07 },
        "-=0.45"
      );

      tl.from(
        ".bento-tile",
        {
          y: 26,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.85"
      );

      tl.from(
        ".tile-head > *",
        { y: 8, opacity: 0, duration: 0.5, stagger: 0.04 },
        "-=0.6"
      );

      // Bento subtle drift
      gsap.to(".float-a", {
        y: -5,
        duration: 5.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".float-b", {
        y: 5,
        duration: 6.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative pt-28 md:pt-32 pb-12 md:pb-16 overflow-hidden"
    >
      <div className="aurora" aria-hidden />
      <div className="absolute inset-0 hero-gradient-bg pointer-events-none" />

      <div className="relative mx-auto max-w-[1200px] px-5">
        {/* Tag */}
        <div className="h-tag flex items-center justify-center gap-2 mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
          <span className="h-px w-8 bg-ink/15" />
          <span>AutoWorkflows · Studio · 2026</span>
          <span className="h-px w-8 bg-ink/15" />
        </div>

        <h1 className="relative mt-7 md:mt-8 display text-[44px] sm:text-[64px] md:text-[80px] lg:text-[96px] leading-[0.98] tracking-tightest text-center">
          {titleLines.map((line, li) => (
            <span key={li} className="block">
              {line.map((w, wi) => {
                const isAccent = w === "quietly";
                return (
                  <span
                    key={wi}
                    className="inline-block overflow-hidden align-baseline"
                  >
                    <span
                      className={`h-word inline-block mr-[0.18em] ${
                        isAccent
                          ? "italic font-light text-gradient-azure"
                          : ""
                      }`}
                    >
                      {w}
                      {li === titleLines.length - 1 &&
                        wi === line.length - 1 && (
                          <span className="caret align-middle ml-1.5 hidden md:inline-block" />
                        )}
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <p className="h-sub mx-auto mt-7 md:mt-8 max-w-[640px] text-center text-[16px] md:text-[17px] leading-[1.55] text-ink/65">
          A small studio of operators and engineers. We design, ship, and{" "}
          <span className="relative inline-block text-ink">
            run
            <span className="absolute left-0 right-0 bottom-[1px] h-[5px] bg-azure-200/70 -z-0" />
          </span>{" "}
          AI workflows for ops-led companies. Audited blueprints, working
          software in 30 days.
        </p>

        <div className="h-cta mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#contact" className="btn-grad">
            Book a 30-min audit <ArrowUpRight size={16} />
          </a>
          <a href="#process" className="btn-ghost">
            <Play size={14} /> 90s tour
          </a>
        </div>

        {/* Bento — 2 tiles, each with a clear heading + subheading */}
        <div className="relative mt-12 md:mt-16 grid grid-cols-12 gap-4 md:gap-5">
          {/* Workflow tile */}
          <div className="bento-tile float-a col-span-12 lg:col-span-7 p-4 md:p-5">
            <div className="tile-head flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="display-tight text-[20px] md:text-[22px]">
                  A workflow, assembling itself.
                </h3>
                <p className="mt-1.5 text-[13.5px] text-ink/60 leading-snug max-w-[420px]">
                  Eight nodes, two agents, one human review lane — wired
                  together the way a senior operator would actually draw it.
                </p>
              </div>
              <span className="chip shrink-0">
                <span className="chip-dot" /> live
              </span>
            </div>

            <div className="rounded-2xl border border-ink/[0.06] bg-canvas/60 p-3">
              <div className="flex items-center justify-between px-1.5 pb-2 border-b border-ink/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-ink/15" />
                  <span className="h-2 w-2 rounded-full bg-ink/10" />
                  <span className="h-2 w-2 rounded-full bg-ink/[0.07]" />
                  <span className="ml-3 mono text-[10.5px] text-ink/55">
                    blueprint · ar-collections-v3.flow
                  </span>
                </div>
                <span className="mono text-[10.5px] text-ink/40">trace</span>
              </div>
              <div className="relative aspect-[850/340] mt-2">
                <MiniWorkflow />
              </div>
              <div className="mt-2 px-1.5 pt-2 border-t border-ink/[0.08] flex items-center justify-between mono text-[10.5px] text-ink/50">
                <span>nodes 8 · edges 8 · agents 2</span>
                <span className="text-azure-600">→ replay 00:08</span>
              </div>
            </div>
          </div>

          {/* Activity feed tile */}
          <div className="bento-tile float-b col-span-12 lg:col-span-5 p-0">
            <div className="tile-head flex items-start justify-between gap-4 px-5 pt-5">
              <div>
                <h3 className="display-tight text-[20px] md:text-[22px]">
                  The system, talking back.
                </h3>
                <p className="mt-1.5 text-[13.5px] text-ink/60 leading-snug max-w-[360px]">
                  Every classification, draft, and hand-off in real time —
                  with confidence scores, agent IDs, and timestamps.
                </p>
              </div>
            </div>

            <div className="mt-4 mx-2 mb-2 rounded-2xl border border-ink/[0.06] bg-canvas/60 overflow-hidden">
              <ActivityFeed />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
