"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "./Services";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    week: "Week 0",
    title: "Audit",
    body: "We sit with two of your operators for half a day, map the actual work (not the org chart), and pick the workflow with the highest leverage.",
    deliverable: "Operations heatmap + 1-page recommendation",
    duration: "3 days",
  },
  {
    week: "Week 1",
    title: "Blueprint",
    body: "An honest, tested architecture: the data, the systems it touches, the agents we'll deploy, the human checkpoints, the failure modes.",
    deliverable: "Workflow blueprint + risk register",
    duration: "5 days",
  },
  {
    week: "Week 2–3",
    title: "Build",
    body: "We ship to staging in week 2, then run shadow-mode against your real inbox. We tune until the agent matches your top operator's judgment.",
    deliverable: "Production workflow on your stack",
    duration: "10 days",
  },
  {
    week: "Week 4+",
    title: "Operate",
    body: "We watch the workflow in production, publish a weekly metrics digest, and adjust. You own the system; we own the outcomes.",
    deliverable: "SLAs, dashboards, on-call",
    duration: "Ongoing",
  },
];

type P = { x: number; y: number; label: string };
const PTS: P[] = [
  { x: 90,  y: 140, label: "INBOX" },
  { x: 90,  y: 380, label: "DOCS" },
  { x: 300, y:  80, label: "CLASSIFY" },
  { x: 300, y: 240, label: "EXTRACT" },
  { x: 300, y: 420, label: "ROUTE" },
  { x: 510, y: 160, label: "AGENT" },
  { x: 510, y: 360, label: "REVIEW" },
  { x: 660, y: 260, label: "SHIPS" },
];

const EDGES: [number, number][] = [
  [0, 2], [0, 3],
  [1, 3], [1, 4],
  [2, 5], [3, 5], [3, 6], [4, 6],
  [5, 7], [6, 7],
];

const stages = [
  { num: "01", label: "Audit" },
  { num: "02", label: "Blueprint" },
  { num: "03", label: "Build" },
  { num: "04", label: "Operate" },
];

export default function Process() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".step").forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 78%" },
        });
      });

      // Initial states for the stitched diagram
      gsap.set(".pr-node",       { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });
      gsap.set(".pr-label",      { opacity: 0 });
      gsap.set(".pr-edge",       { strokeDashoffset: 600, opacity: 0 });
      gsap.set(".pr-edge-solid", { opacity: 0 });
      gsap.set(".pr-pkt",        { opacity: 0 });
      gsap.set(".pr-scan",       { opacity: 0 });
      gsap.set(".pr-meter",      { opacity: 0, y: 6 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 22%",
          end: "bottom bottom",
          scrub: 0.7,
          onUpdate: (self) => {
            const i = Math.min(3, Math.floor(self.progress * 4));
            document
              .querySelectorAll<HTMLElement>(".pr-stage")
              .forEach((d, idx) => {
                d.dataset.active = String(idx === i);
              });
          },
        },
      });

      // Phase 1: Audit
      tl.to(".pr-node",  { opacity: 0.35, scale: 1, duration: 1.2, stagger: 0.04 })
        .to(".pr-scan",  { opacity: 1, duration: 0.4 }, "<")
        .to(".pr-scan rect", { x: 720, duration: 1.6, ease: "none" }, "<")
        .to(".pr-label", { opacity: 0.55, duration: 0.6, stagger: 0.03 }, "<0.4")

        // Phase 2: Blueprint — dashed stitches draw in
        .to(".pr-edge",  { opacity: 1, strokeDashoffset: 0, duration: 1.6, stagger: 0.07, ease: "power2.out" })
        .to(".pr-scan",  { opacity: 0, duration: 0.3 }, "<")

        // Phase 3: Build — solid edges appear, nodes fully on
        .to(".pr-edge-solid", { opacity: 1, duration: 1, stagger: 0.05 })
        .to(".pr-node",  { opacity: 1, duration: 0.6 }, "<")
        .to(".pr-label", { opacity: 1, duration: 0.4 }, "<")
        .to(".pr-edge",  { opacity: 0.3, duration: 0.6 }, "<")

        // Phase 4: Operate — packets + meters
        .to(".pr-pkt",   { opacity: 1, duration: 0.4 })
        .to(".pr-meter", { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, "<");

      // Continuous packet flow along the solid edges
      gsap.utils.toArray<SVGPathElement>(".pr-edge-solid").forEach((path, i) => {
        const pkt = document.querySelector<SVGCircleElement>(`[data-prpkt='${i}']`);
        if (!pkt) return;
        const len = path.getTotalLength();
        const proxy = { v: 0 };
        gsap.to(proxy, {
          v: 1,
          duration: 3.2,
          ease: "none",
          repeat: -1,
          delay: i * 0.18,
          onUpdate: () => {
            const p = path.getPointAtLength(proxy.v * len);
            pkt.setAttribute("cx", String(p.x));
            pkt.setAttribute("cy", String(p.y));
          },
        });
      });

      // Subtle ambient node breathing
      gsap.to(".pr-node", {
        scale: 1.06,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.18, from: "random" },
        transformOrigin: "50% 50%",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={root as any} className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[1320px] px-5">
        <SectionHeader
          tag="02 · How we work"
          title={
            <>
              Four weeks
              <br />
              <span className="text-ink/45">to a workflow that runs itself.</span>
            </>
          }
          right="We compress strategy into days, not quarters. Each phase has a deliverable, a duration, and a price. Watch it stitch together as you scroll."
        />

        <div className="relative mt-14 grid lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left: scrolling step copy */}
          <div className="lg:col-span-6 space-y-12 lg:space-y-24">
            {steps.map((s, i) => (
              <article key={i} className="step relative">
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-ink text-canvas mono text-[11px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                    {s.week}
                  </span>
                </div>
                <h3 className="mt-5 display-tight text-[40px] md:text-[52px]">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15.5px] text-ink/70 leading-[1.6] max-w-[440px]">
                  {s.body}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-[12px] mono">
                  <span className="px-3 py-1.5 rounded-full border border-ink/12 text-ink/70">
                    {s.deliverable}
                  </span>
                  <span className="text-ink/40">·</span>
                  <span className="text-ink/55">{s.duration}</span>
                </div>
              </article>
            ))}
          </div>

          {/* Right: pinned stitched diagram */}
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-24">
              <div className="relative bp-card p-4 md:p-5 overflow-hidden">
                <div className="flex items-center justify-between mb-3 mono text-[10.5px] text-ink/50">
                  <span>plan · stitching · ops-engagement</span>
                  <span className="text-azure-600">● recording</span>
                </div>

                {/* Stage indicator */}
                <div className="flex items-center gap-1.5 mb-3">
                  {stages.map((s, i) => (
                    <div
                      key={i}
                      data-active={i === 0 ? "true" : "false"}
                      className="pr-stage flex-1"
                    >
                      <div className="h-[3px] w-full rounded-full bg-ink/10 overflow-hidden">
                        <div className="pr-stage-fill h-full w-full origin-left" />
                      </div>
                      <div className="mt-2 text-[10px] mono text-ink/40">
                        {s.num} · {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative aspect-[720/520] rounded-xl overflow-hidden bg-canvas-warm/40 border border-ink/[0.06]">
                  <svg
                    viewBox="0 0 720 520"
                    className="block w-full h-full"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <defs>
                      <pattern id="prGrid" width="22" height="22" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="0.85" fill="rgba(29,29,31,0.10)" />
                      </pattern>
                      <linearGradient id="prSolid" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#0071E3" stopOpacity="0.6" />
                        <stop offset="50%" stopColor="#0071E3" />
                        <stop offset="100%" stopColor="#5E5CE6" />
                      </linearGradient>
                      <radialGradient id="prGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#0071E3" stopOpacity="0.16" />
                        <stop offset="100%" stopColor="#0071E3" stopOpacity="0" />
                      </radialGradient>
                      <linearGradient id="prScan" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#0071E3" stopOpacity="0" />
                        <stop offset="50%" stopColor="#0071E3" stopOpacity="0.20" />
                        <stop offset="100%" stopColor="#0071E3" stopOpacity="0" />
                      </linearGradient>
                      <clipPath id="prClip">
                        <rect x="0" y="0" width="720" height="520" />
                      </clipPath>
                    </defs>

                    <rect width="720" height="520" fill="url(#prGrid)" opacity="0.55" />
                    <ellipse cx="360" cy="260" rx="320" ry="200" fill="url(#prGlow)" />

                    {/* Audit scan band */}
                    <g className="pr-scan" clipPath="url(#prClip)">
                      <rect x="-160" y="0" width="160" height="520" fill="url(#prScan)" />
                    </g>

                    {/* Dashed stitch edges */}
                    <g fill="none" stroke="#0071E3" strokeWidth="1.4" strokeLinecap="round">
                      {EDGES.map(([a, b], i) => {
                        const A = PTS[a], B = PTS[b];
                        const mx = (A.x + B.x) / 2;
                        const d = `M ${A.x} ${A.y} C ${mx} ${A.y}, ${mx} ${B.y}, ${B.x} ${B.y}`;
                        return (
                          <path
                            key={`e-${i}`}
                            d={d}
                            className="pr-edge"
                            strokeDasharray="6 7"
                            strokeDashoffset="600"
                            opacity="0.85"
                          />
                        );
                      })}
                    </g>

                    {/* Solid edges */}
                    <g fill="none" stroke="url(#prSolid)" strokeWidth="1.7" strokeLinecap="round">
                      {EDGES.map(([a, b], i) => {
                        const A = PTS[a], B = PTS[b];
                        const mx = (A.x + B.x) / 2;
                        const d = `M ${A.x} ${A.y} C ${mx} ${A.y}, ${mx} ${B.y}, ${B.x} ${B.y}`;
                        return <path key={`s-${i}`} d={d} className="pr-edge-solid" />;
                      })}
                    </g>

                    {/* Packets */}
                    <g>
                      {EDGES.map((_, i) => (
                        <circle
                          key={`p-${i}`}
                          data-prpkt={i}
                          className="pr-pkt"
                          r="4"
                          fill="#0071E3"
                        />
                      ))}
                    </g>

                    {/* Nodes + labels */}
                    {PTS.map((p, i) => (
                      <g key={i} transform={`translate(${p.x}, ${p.y})`}>
                        <circle r="9" className="pr-node" fill="#FFFFFF" stroke="#0071E3" strokeWidth="1.6" />
                        <circle r="3.5" className="pr-node" fill="#0071E3" />
                        <text
                          className="pr-label"
                          x="14"
                          y="4"
                          fontSize="9.5"
                          fill="#1D1D1F"
                          fontFamily="var(--font-jetbrains)"
                          letterSpacing="1.2"
                        >
                          {p.label}
                        </text>
                      </g>
                    ))}

                    {/* Operate-stage telemetry */}
                    <g className="pr-meter" transform="translate(40, 460)">
                      <rect width="200" height="36" rx="10" fill="#1D1D1F" />
                      <text x="14" y="16" fontSize="9.5" fill="#FBFBFD" fontFamily="var(--font-jetbrains)" letterSpacing="1.2">AUTO-RESOLVE</text>
                      <text x="14" y="29" fontSize="14" fill="#FBFBFD" fontWeight="500">82.4%</text>
                    </g>
                    <g className="pr-meter" transform="translate(260, 460)">
                      <rect width="200" height="36" rx="10" fill="#0057B3" />
                      <text x="14" y="16" fontSize="9.5" fill="#FBFBFD" fontFamily="var(--font-jetbrains)" letterSpacing="1.2">FIRST RESPONSE</text>
                      <text x="14" y="29" fontSize="14" fill="#FBFBFD" fontWeight="500">26 s</text>
                    </g>
                    <g className="pr-meter" transform="translate(480, 460)">
                      <rect width="200" height="36" rx="10" fill="#5E5CE6" />
                      <text x="14" y="16" fontSize="9.5" fill="#FBFBFD" fontFamily="var(--font-jetbrains)" letterSpacing="1.2">QUEUE DEPTH</text>
                      <text x="14" y="29" fontSize="14" fill="#FBFBFD" fontWeight="500">0</text>
                    </g>
                  </svg>
                </div>

                <div className="mt-3 mono text-[10.5px] text-ink/50 flex items-center justify-between">
                  <span>nodes 8 · stitches 10 · agents 1 · review 1</span>
                  <span>scroll → advance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pr-stage[data-active="true"] :global(.pr-stage-fill) {
          background: linear-gradient(90deg, #0071E3, #5E5CE6);
          animation: prFill 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .pr-stage[data-active="false"] :global(.pr-stage-fill) {
          background: transparent;
        }
        @keyframes prFill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}
