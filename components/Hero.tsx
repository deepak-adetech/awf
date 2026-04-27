"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Play } from "lucide-react";
import WorkflowCanvas from "./WorkflowCanvas";

export default function Hero() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from(".hero-eyebrow", { y: 10, opacity: 0, duration: 0.6, delay: 0.05 })
        .from(
          ".hero-line",
          { y: 28, opacity: 0, duration: 0.85, stagger: 0.08 },
          "-=0.35"
        )
        .from(
          ".hero-sub",
          { y: 14, opacity: 0, duration: 0.7 },
          "-=0.5"
        )
        .from(
          ".hero-cta > *",
          { y: 12, opacity: 0, duration: 0.55, stagger: 0.08 },
          "-=0.4"
        )
        .from(
          ".hero-meta > *",
          { y: 8, opacity: 0, duration: 0.5, stagger: 0.06 },
          "-=0.4"
        );

      // Caret blink trail
      gsap.to(".hero-trail", {
        x: 4,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden"
    >
      <div className="mx-auto max-w-[1320px] px-5">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <div className="hero-eyebrow flex items-center gap-3 text-ink/55 mono text-[11px] uppercase tracking-[0.18em]">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-forge-500 node-pulse" />
                <span>Operating live · 124 workflows in production</span>
              </span>
              <span className="hidden md:inline-block h-px w-10 bg-ink/15" />
              <span className="hidden md:inline">EST. 2023 · NYC / RMT</span>
            </div>

            <h1 className="mt-6 display text-[56px] md:text-[88px] lg:text-[104px]">
              <span className="hero-line block">AI workflows</span>
              <span className="hero-line block">that quietly run</span>
              <span className="hero-line block">
                your operations<span className="text-forge-500">.</span>
                <span className="caret align-middle ml-2 hidden md:inline-block" />
              </span>
            </h1>

            <p className="hero-sub mt-7 max-w-[560px] text-[16.5px] leading-[1.55] text-ink/70">
              We&apos;re a small team of operators and engineers who design, ship, and
              run AI workflows for ops-led companies. Audited blueprints, working
              software in 30 days, no fluff.
            </p>

            <div className="hero-cta mt-9 flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn-primary">
                Book a 30-min audit <ArrowUpRight size={16} />
              </a>
              <a href="#process" className="btn-ghost">
                <Play size={14} /> Watch the 90s tour
              </a>
              <span className="mono text-[11px] text-ink/50 ml-1 hidden sm:inline">
                Reply within 6h <span className="text-ink/25">/</span> avg.
              </span>
            </div>

            <div className="hero-meta mt-12 grid grid-cols-3 gap-8 max-w-[640px]">
              <Metric kpi="48%" label="median ops cost reduction" />
              <Metric kpi="30d" label="from intake to live workflow" />
              <Metric kpi="11x" label="ROI across deployed clients" />
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="bp-card p-4 md:p-5 relative overflow-hidden">
              {/* file header bar */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-ink/20" />
                  <span className="h-2 w-2 rounded-full bg-ink/15" />
                  <span className="h-2 w-2 rounded-full bg-ink/10" />
                  <span className="ml-3 mono text-[10.5px] text-ink/50">
                    blueprint · ar-collections-v3.flow
                  </span>
                </div>
                <span className="chip"><span className="chip-dot" /> live</span>
              </div>
              <WorkflowCanvas />
              <div className="mt-3 flex items-center justify-between mono text-[10.5px] text-ink/50">
                <span>nodes 8 · edges 8 · agents 2</span>
                <span className="hero-trail inline-block">→ replay 00:08</span>
              </div>
            </div>

            {/* floating callouts */}
            <div className="hidden md:block absolute -left-6 top-8 bp-card p-3 max-w-[220px] shadow-none">
              <div className="mono text-[10.5px] text-ink/50">14:02 · 04/19</div>
              <div className="mt-1 text-[12.5px] leading-snug">
                <span className="text-forge-600 font-medium">Routed</span> 412 inbound
                AR queries · 0 manual touches.
              </div>
            </div>
            <div className="hidden md:block absolute -right-4 -bottom-2 bp-card p-3 max-w-[230px]">
              <div className="mono text-[10.5px] text-ink/50">SLA</div>
              <div className="mt-1 text-[12.5px] leading-snug">
                Response time dropped from <b>3h 41m</b> to <b>26s</b>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div className="border-t border-ink/10 pt-3">
      <div className="display-tight text-[34px]">{kpi}</div>
      <div className="mt-1 text-[12px] text-ink/55 leading-snug">{label}</div>
    </div>
  );
}
