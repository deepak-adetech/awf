"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Play } from "lucide-react";
import MiniWorkflow from "./MiniWorkflow";
import ActivityFeed from "./ActivityFeed";
import MetricsPanel from "./MetricsPanel";

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
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.85"
      );

      tl.from(
        ".h-trust",
        { y: 10, opacity: 0, duration: 0.55 },
        "-=0.4"
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

      // Trust ticker
      gsap.to(".scroll-trust", {
        xPercent: -50,
        duration: 42,
        repeat: -1,
        ease: "none",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative pt-28 md:pt-32 pb-12 md:pb-20 overflow-hidden"
    >
      {/* Soft gradient atmosphere */}
      <div className="aurora" aria-hidden />
      <div className="absolute inset-0 hero-gradient-bg pointer-events-none" />

      <div className="relative mx-auto max-w-[1200px] px-5">
        {/* Tight, single-line tag — replaces the OPERATING LIVE pill */}
        <div className="h-tag flex items-center justify-center gap-2 mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
          <span className="h-px w-8 bg-ink/15" />
          <span>AutoWorkflows · Studio · 2026</span>
          <span className="h-px w-8 bg-ink/15" />
        </div>

        {/* Headline — centered, Apple proportions (smaller, tighter) */}
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

        {/* Subhead — centered */}
        <p className="h-sub mx-auto mt-7 md:mt-8 max-w-[640px] text-center text-[16px] md:text-[17px] leading-[1.55] text-ink/65">
          A small studio of operators and engineers. We design, ship, and{" "}
          <span className="relative inline-block text-ink">
            run
            <span className="absolute left-0 right-0 bottom-[1px] h-[5px] bg-azure-200/70 -z-0" />
          </span>{" "}
          AI workflows for ops-led companies. Audited blueprints, working
          software in 30 days.
        </p>

        {/* CTAs — centered */}
        <div className="h-cta mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#contact" className="btn-grad">
            Book a 30-min audit <ArrowUpRight size={16} />
          </a>
          <a href="#process" className="btn-ghost">
            <Play size={14} /> 90s tour
          </a>
        </div>

        {/* Bento grid */}
        <div className="relative mt-14 md:mt-20 grid grid-cols-12 gap-3 md:gap-4">
          {/* Big workflow tile */}
          <div className="bento-tile float-a col-span-12 lg:col-span-8 p-3 md:p-4">
            <span className="bento-corner">/01 · live trace</span>
            <div className="flex items-center justify-between px-1.5 pb-3 border-b border-ink/[0.08]">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-ink/15" />
                <span className="h-2 w-2 rounded-full bg-ink/10" />
                <span className="h-2 w-2 rounded-full bg-ink/[0.07]" />
                <span className="ml-3 mono text-[10.5px] text-ink/55">
                  blueprint · ar-collections-v3.flow
                </span>
              </div>
              <span className="chip">
                <span className="chip-dot" /> live · v2.4
              </span>
            </div>

            <div className="relative aspect-[850/340] mt-2">
              <MiniWorkflow />
            </div>

            <div className="mt-2 px-1.5 pt-3 border-t border-ink/[0.08] flex items-center justify-between mono text-[10.5px] text-ink/50">
              <span>nodes 8 · edges 8 · agents 2 · last sync 00:01.4s</span>
              <span className="text-azure-600">→ replay 00:08</span>
            </div>
          </div>

          {/* Activity feed */}
          <div className="bento-tile float-b col-span-12 md:col-span-7 lg:col-span-4 min-h-[260px]">
            <span className="bento-corner">/02 · feed</span>
            <ActivityFeed />
          </div>

          {/* Metrics panel */}
          <div className="bento-tile col-span-12 md:col-span-5 lg:col-span-4 min-h-[260px]">
            <span className="bento-corner">/03 · kpis</span>
            <MetricsPanel />
          </div>
        </div>

        {/* Trust strip */}
        <div className="h-trust mt-10 md:mt-14 relative">
          <div className="border-y border-ink/10 py-4 overflow-hidden mask-edges">
            <div
              className="scroll-trust flex items-center gap-12 mono text-[12px] text-ink/55 whitespace-nowrap"
              style={{ width: "max-content" }}
            >
              {[...trustItems, ...trustItems].map((t, i) => (
                <span key={i} className="flex items-center gap-3">
                  <span className="text-azure-500">●</span>
                  <span className="uppercase tracking-[0.12em]">{t.label}</span>
                  <span className="text-ink/85 normal-case tracking-normal">
                    {t.value}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const trustItems = [
  { label: "median ops cost", value: "−48%" },
  { label: "intake → live", value: "30 days" },
  { label: "ROI across clients", value: "11×" },
  { label: "auto-resolve rate", value: "82%" },
  { label: "first response", value: "26s" },
  { label: "engagements live", value: "12" },
  { label: "review window", value: "weekly" },
  { label: "code ownership", value: "100% yours" },
];
