"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Play, Sparkles } from "lucide-react";
import MiniWorkflow from "./MiniWorkflow";
import ActivityFeed from "./ActivityFeed";
import MetricsPanel from "./MetricsPanel";

const titleLines: string[][] = [
  ["AI", "workflows"],
  ["that", "quietly"],
  ["run", "your", "ops."],
];

export default function Hero() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Per-word stagger reveal
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".h-eyebrow > *", {
        y: 8,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        delay: 0.1,
      });

      tl.from(
        ".h-word",
        {
          y: 64,
          opacity: 0,
          rotate: 0.5,
          duration: 0.95,
          stagger: 0.045,
        },
        "-=0.3"
      );

      tl.from(
        ".h-sub",
        { y: 14, opacity: 0, duration: 0.7 },
        "-=0.45"
      );

      tl.from(
        ".h-cta > *",
        { y: 14, opacity: 0, duration: 0.55, stagger: 0.07 },
        "-=0.4"
      );

      tl.from(
        ".h-trust",
        { y: 10, opacity: 0, duration: 0.55 },
        "-=0.3"
      );

      tl.from(
        ".bento-tile",
        {
          y: 28,
          opacity: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.85"
      );

      // Floating motion for the bento canvas tile (subtle)
      gsap.to(".float-a", {
        y: -6,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".float-b", {
        y: 6,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Slow ticker rotation through KPIs
      gsap.to(".scroll-trust", {
        xPercent: -50,
        duration: 38,
        repeat: -1,
        ease: "none",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative pt-32 md:pt-36 pb-16 md:pb-24 overflow-hidden"
    >
      {/* Aurora gradient ribbon behind everything */}
      <div className="aurora" aria-hidden />
      <div className="absolute inset-0 hero-gradient-bg pointer-events-none" />

      {/* Coordinate ticks (top-left, blueprint feel) */}
      <div className="hidden md:block absolute left-6 top-28 mono text-[10px] text-ink/30 leading-none">
        <div>+ 00.00</div>
        <div className="mt-2 h-px w-16 bg-ink/15" />
        <div className="mt-2">x 1320 · y 720</div>
      </div>
      <div className="hidden md:block absolute right-6 top-28 mono text-[10px] text-ink/30 leading-none text-right">
        <div>BLUEPRINT v2.4</div>
        <div className="mt-2 h-px w-16 bg-ink/15 ml-auto" />
        <div className="mt-2">// hero · 01</div>
      </div>

      <div className="relative mx-auto max-w-[1320px] px-5">
        {/* Eyebrow */}
        <div className="h-eyebrow flex flex-wrap items-center gap-3 text-ink/55 mono text-[11px] uppercase tracking-[0.18em]">
          <span className="live-pill">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-forge-500 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-forge-500" />
            </span>
            <span className="text-[11px] tracking-[0.16em] text-forge-700">
              OPERATING LIVE
            </span>
            <span className="text-[11px] text-forge-700/60">·</span>
            <span className="text-[11px] tracking-[0.04em] text-forge-700/80 normal-case">
              124 workflows in production
            </span>
          </span>
          <span className="hidden md:inline-block h-px w-10 bg-ink/15" />
          <span className="hidden md:inline">EST. 2023 · NYC / RMT</span>
          <span className="hidden md:inline-block h-px w-10 bg-ink/15" />
          <span className="hidden lg:inline-flex items-center gap-1.5">
            <Sparkles size={11} className="text-signal-amber" />
            <span>Now booking Q3 audits — 3 slots</span>
          </span>
        </div>

        {/* Headline (full bleed, editorial) */}
        <h1 className="relative mt-7 display text-[56px] sm:text-[80px] md:text-[112px] lg:text-[140px] leading-[0.92] tracking-tightest">
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
                          ? "italic font-light text-gradient-forge"
                          : ""
                      }`}
                    >
                      {w}
                      {li === titleLines.length - 1 && wi === line.length - 1 && (
                        <span className="caret align-middle ml-2 hidden md:inline-block" />
                      )}
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
          {/* connector tick to reinforce blueprint vibe */}
          <span className="hidden md:block absolute -left-2 top-[18%] connector" />
          <span className="hidden md:block absolute -left-2 top-[58%] connector" />
        </h1>

        {/* Sub + CTAs row */}
        <div className="relative mt-9 grid lg:grid-cols-12 gap-8 items-end">
          <p className="h-sub lg:col-span-7 max-w-[620px] text-[17px] leading-[1.5] text-ink/70">
            We&apos;re a small studio of operators and engineers. We design,
            ship, and{" "}
            <span className="relative inline-block text-ink">
              run
              <span className="absolute left-0 right-0 bottom-[2px] h-[6px] bg-forge-200/70 -z-0" />
            </span>{" "}
            AI workflows for ops-led companies. Audited blueprints, working
            software in 30 days, no fluff.
          </p>

          <div className="h-cta lg:col-span-5 flex flex-wrap items-center gap-3 lg:justify-end">
            <a href="#contact" className="btn-grad">
              Book a 30-min audit <ArrowUpRight size={16} />
            </a>
            <a href="#process" className="btn-ghost">
              <Play size={14} /> 90s tour
            </a>
          </div>
        </div>

        {/* Bento grid */}
        <div className="relative mt-12 md:mt-16 grid grid-cols-12 gap-3 md:gap-4">
          {/* Big workflow tile */}
          <div className="bento-tile float-a col-span-12 lg:col-span-8 row-span-2 p-3 md:p-4">
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
              <span className="text-forge-600">→ replay 00:08</span>
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

        {/* Trust strip — auto-scrolling */}
        <div className="h-trust mt-10 md:mt-14 relative">
          <div className="border-y border-ink/10 py-5 overflow-hidden mask-edges">
            <div
              className="scroll-trust flex items-center gap-12 mono text-[12.5px] text-ink/55 whitespace-nowrap"
              style={{ width: "max-content" }}
            >
              {[...trustItems, ...trustItems].map((t, i) => (
                <span key={i} className="flex items-center gap-3">
                  <span className="text-forge-500">●</span>
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
