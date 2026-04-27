"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import MiniWorkflow from "./MiniWorkflow";

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

      tl.from(
        ".h-word",
        { y: 56, opacity: 0, duration: 0.9, stagger: 0.05, delay: 0.1 }
      );
      tl.from(".h-sub", { y: 14, opacity: 0, duration: 0.7 }, "-=0.5");
      tl.from(
        ".h-cta > *",
        { y: 12, opacity: 0, duration: 0.55, stagger: 0.07 },
        "-=0.45"
      );
      tl.from(
        ".wf-section-head > *",
        { y: 14, opacity: 0, duration: 0.55, stagger: 0.06 },
        "-=0.3"
      );
      tl.from(
        ".wf-stage",
        { y: 30, opacity: 0, duration: 0.85, ease: "power2.out" },
        "-=0.45"
      );
      tl.from(
        ".wf-meta > *",
        { y: 8, opacity: 0, duration: 0.5, stagger: 0.06 },
        "-=0.5"
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden"
    >
      <div className="aurora" aria-hidden />
      <div className="absolute inset-0 hero-gradient-bg pointer-events-none" />

      <div className="relative mx-auto max-w-[1200px] px-5">
        <h1 className="relative mt-8 md:mt-10 display text-[44px] sm:text-[64px] md:text-[80px] lg:text-[96px] leading-[0.98] tracking-tightest text-center">
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
                        isAccent ? "italic font-light text-gradient-azure" : ""
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
        </div>

        {/* Full-section workflow showcase */}
        <div className="mt-16 md:mt-24">
          <div className="wf-section-head grid lg:grid-cols-12 gap-8 items-end mb-8 md:mb-10">
            <div className="lg:col-span-7">
              <div className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-ink/30" />
                Live demo · 00 · The output
              </div>
              <h2 className="mt-5 display text-[40px] md:text-[60px] lg:text-[72px] leading-[0.98] tracking-tightest">
                A workflow,
                <br />
                <span className="italic font-light text-gradient-azure">
                  assembling itself.
                </span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[15.5px] md:text-[16px] text-ink/65 leading-[1.6] max-w-[440px]">
                Eight nodes, two agents, one human review lane — wired together
                the way a senior operator would actually draw it. Watch the
                packets flow; this is what your ops Tuesday looks like once
                we&apos;re done.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="chip"><span className="chip-dot" /> AR collections · v3</span>
                <span className="chip"><span className="chip-dot" /> 8 nodes</span>
                <span className="chip"><span className="chip-dot" /> 2 agents</span>
              </div>
            </div>
          </div>

          {/* Stage card */}
          <div className="wf-stage relative bp-card p-3 md:p-4 overflow-hidden">
            <div className="flex items-center justify-between px-2 pt-1 pb-3 border-b border-ink/[0.08]">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-ink/15" />
                <span className="h-2 w-2 rounded-full bg-ink/10" />
                <span className="h-2 w-2 rounded-full bg-ink/[0.07]" />
                <span className="ml-3 mono text-[11px] text-ink/55">
                  blueprint · ar-collections-v3.flow
                </span>
              </div>
              <span className="chip"><span className="chip-dot" /> live · v2.4</span>
            </div>

            <div className="relative aspect-[850/360] mt-3 rounded-xl overflow-hidden bg-canvas-warm/30 border border-ink/[0.05]">
              <MiniWorkflow />
            </div>

            <div className="wf-meta mt-3 px-2 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              <Meta k="auto-resolve" v="82%" />
              <Meta k="first response" v="26 s" />
              <Meta k="queue depth" v="0" />
              <Meta k="human-in-loop" v="4%" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between md:flex-col md:items-start md:gap-1 border-t md:border-t-0 md:border-l border-ink/10 md:pl-4 pt-3 md:pt-0">
      <div className="mono text-[10.5px] uppercase tracking-[0.14em] text-ink/45">
        {k}
      </div>
      <div className="display-tight text-[22px] md:text-[28px]">{v}</div>
    </div>
  );
}
