"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Gift } from "lucide-react";
import MiniWorkflow from "./MiniWorkflow";

const titleLines: { words: string[]; accent?: string }[] = [
  { words: ["AI", "workflows"] },
  { words: ["that", "just", "work"], accent: "just" },
];

export default function Hero() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".h-word", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.06,
        delay: 0.1,
      });
      tl.from(".h-sub", { y: 14, opacity: 0, duration: 0.7 }, "-=0.5");
      tl.from(
        ".h-usp",
        { y: 10, opacity: 0, duration: 0.55 },
        "-=0.55"
      );
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

      // Drift the decorative artwork gently
      gsap.to(".h-art-1", {
        y: 14,
        rotate: 6,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".h-art-2", {
        y: -10,
        rotate: -4,
        duration: 9.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".h-art-3", {
        x: 8,
        rotate: 3,
        duration: 11,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden"
    >
      <div className="aurora" aria-hidden />
      <div className="absolute inset-0 hero-gradient-bg pointer-events-none" />

      {/* Decorative artwork — abstract curls, dotted clusters, lightning */}
      <HeroArt />

      <div className="relative mx-auto max-w-[1200px] px-5">
        <h1
          className="relative mt-8 md:mt-12 display text-center text-[56px] sm:text-[88px] md:text-[120px] lg:text-[148px] leading-[0.92]"
          style={{ fontWeight: 800, letterSpacing: "-0.045em" }}
        >
          {titleLines.map((line, li) => (
            <span key={li} className="block">
              {line.words.map((w, wi) => {
                const isAccent = w === line.accent;
                const isLastWord =
                  li === titleLines.length - 1 &&
                  wi === line.words.length - 1;
                return (
                  <span
                    key={wi}
                    className="inline-block overflow-hidden align-baseline"
                    style={isAccent ? { paddingRight: "0.18em" } : undefined}
                  >
                    <span
                      className={`h-word inline-block ${
                        isAccent
                          ? "italic font-light text-gradient-azure mr-[0.22em] pr-[0.08em]"
                          : "mr-[0.16em]"
                      }`}
                      style={isAccent ? { fontWeight: 300 } : undefined}
                    >
                      {w}
                      {isLastWord && <span className="blink-dot">.</span>}
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <p className="h-sub mx-auto mt-8 md:mt-10 max-w-[560px] text-center text-[16px] md:text-[18px] leading-[1.5] text-ink/65">
          We design, ship, and{" "}
          <span className="relative inline-block text-ink">
            run
            <span className="absolute left-0 right-0 bottom-[1px] h-[5px] bg-azure-200/70 -z-0" />
          </span>{" "}
          AI workflows for ops-led companies. Working software in 30 days.
        </p>

        <div className="h-cta mt-9 flex flex-col items-center gap-4">
          <a href="#contact" className="btn-grad">
            Claim your free workflow <ArrowUpRight size={16} />
          </a>
          <span className="h-usp inline-flex items-center gap-2 mono text-[12px] tracking-[0.04em] text-ink/65">
            <Gift size={13} className="text-azure-600" />
            <span>
              Your first workflow is{" "}
              <span className="relative inline-block text-ink font-medium">
                on us
                <span className="absolute left-0 right-0 bottom-[1px] h-[5px] bg-azure-200/70 -z-0" />
              </span>
              {" "}— no fee, no contract.
            </span>
          </span>
        </div>

        {/* Full-section workflow showcase */}
        <div className="mt-20 md:mt-28">
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

/**
 * Decorative artwork — abstract curls, dotted clusters, lightning bolts,
 * and stripe arcs scattered behind the hero. Pure SVG, pointer-events: none,
 * doesn't change the page background.
 */
function HeroArt() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Top-left zigzag lightning */}
      <svg
        className="h-art-1 absolute left-[4%] top-[14%] hidden md:block"
        width="58"
        height="110"
        viewBox="0 0 58 110"
        fill="none"
      >
        <path
          d="M 30 4 L 12 50 L 32 56 L 14 106"
          stroke="#1D1D1F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        />
      </svg>

      {/* Striped circle (top-mid-left) */}
      <svg
        className="h-art-2 absolute left-[26%] top-[18%] hidden lg:block"
        width="70"
        height="70"
        viewBox="0 0 70 70"
      >
        <defs>
          <pattern
            id="heroStripes"
            patternUnits="userSpaceOnUse"
            width="6"
            height="6"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="6" stroke="#0071E3" strokeWidth="2" />
          </pattern>
        </defs>
        <circle cx="35" cy="35" r="32" fill="url(#heroStripes)" opacity="0.7" />
      </svg>

      {/* Dotted half-circle (top-right) */}
      <svg
        className="h-art-3 absolute right-[5%] top-[20%] hidden md:block"
        width="120"
        height="120"
        viewBox="0 0 120 120"
      >
        {Array.from({ length: 11 }).map((_, row) =>
          Array.from({ length: 11 }).map((_, col) => {
            const x = col * 11 + 6;
            const y = row * 11 + 6;
            const dx = x - 60;
            const dy = y - 60;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d > 56) return null;
            const fade = Math.max(0, 1 - d / 56);
            return (
              <circle
                key={`${row}-${col}`}
                cx={x}
                cy={y}
                r="1.4"
                fill="#5E5CE6"
                opacity={0.18 + fade * 0.45}
              />
            );
          })
        )}
      </svg>

      {/* Quarter-arc (right edge, mid) */}
      <svg
        className="h-art-1 absolute right-[2%] top-[44%] hidden md:block"
        width="180"
        height="220"
        viewBox="0 0 180 220"
        fill="none"
      >
        <path
          d="M 178 2 C 100 30, 40 90, 14 218"
          stroke="#1D1D1F"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.35"
        />
      </svg>

      {/* Bottom-left arc */}
      <svg
        className="h-art-2 absolute left-[3%] bottom-[18%] hidden md:block"
        width="200"
        height="160"
        viewBox="0 0 200 160"
        fill="none"
      >
        <path
          d="M 4 158 C 70 110, 140 60, 196 4"
          stroke="#1D1D1F"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.32"
        />
      </svg>

      {/* Tiny dot cluster (bottom-mid-left) */}
      <svg
        className="h-art-3 absolute left-[34%] bottom-[14%] hidden md:block"
        width="60"
        height="60"
        viewBox="0 0 60 60"
      >
        {[
          [10, 12], [22, 8], [34, 14], [16, 24], [30, 26], [42, 22],
          [22, 38], [36, 40], [12, 46], [44, 44], [26, 52],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.6" fill="#0071E3" opacity="0.55" />
        ))}
      </svg>

      {/* Spark / sparkle (top-far-right) */}
      <svg
        className="h-art-1 absolute right-[18%] top-[8%] hidden lg:block"
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
      >
        <path
          d="M 17 3 C 17 13, 17 13, 31 17 C 17 21, 17 21, 17 31 C 17 21, 17 21, 3 17 C 17 13, 17 13, 17 3 Z"
          fill="#BF5AF2"
          opacity="0.55"
        />
      </svg>

      {/* Mini squiggle (bottom-right) */}
      <svg
        className="h-art-2 absolute right-[12%] bottom-[24%] hidden md:block"
        width="80"
        height="30"
        viewBox="0 0 80 30"
        fill="none"
      >
        <path
          d="M 2 15 C 12 2, 22 28, 32 15 S 52 2, 62 15 S 76 28, 78 15"
          stroke="#0071E3"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
