"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Stage = {
  title: string;
  sub: string;
  detail: string;
  bg: string;     // solid dark color
  fg: string;     // accent color on the dark bg
  tag: string;    // short label
};

const states: Stage[] = [
  {
    title: "Hour 0",
    sub: "Inbox, no one's home.",
    detail:
      "412 customer emails, 3 spreadsheets, an SLA quietly slipping. The work that everyone hates and no one owns.",
    bg: "#0F1115",
    fg: "#FF453A",
    tag: "T-0",
  },
  {
    title: "Day 3",
    sub: "Audit complete.",
    detail:
      "We've sat with two operators, mapped the actual decisions, and picked the workflow with the highest leverage.",
    bg: "#0B2545",
    fg: "#5AB6FF",
    tag: "T+3d",
  },
  {
    title: "Week 2",
    sub: "Shadow mode.",
    detail:
      "The agent reads each ticket alongside your team. We tune until its judgment matches your top operator's. Side-by-side, not above.",
    bg: "#1F1147",
    fg: "#BF5AF2",
    tag: "T+14d",
  },
  {
    title: "Week 4",
    sub: "Live in production.",
    detail:
      "82% auto-resolution. 26-second median response. Your team handles the 18% that actually requires a human.",
    bg: "#0E2B3D",
    fg: "#5DE8B6",
    tag: "T+28d",
  },
];

export default function PinnedDemo() {
  const root = useRef<HTMLElement | null>(null);
  const stage = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>(".pd-slide");
      const scenes = gsap.utils.toArray<HTMLElement>(".pd-scene");
      const ticks  = document.querySelectorAll<HTMLElement>(".pd-tick");
      const total  = slides.length;

      // Initial state — first scene visible
      gsap.set(slides[0], { autoAlpha: 1 });
      slides.slice(1).forEach((s) => gsap.set(s, { autoAlpha: 0 }));
      gsap.set(scenes[0], { autoAlpha: 1 });
      scenes.slice(1).forEach((s) => gsap.set(s, { autoAlpha: 0 }));

      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: () => `+=${total * 95}%`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(total - 1, Math.floor(self.progress * total));

          // Crossfade text slides
          slides.forEach((s, i) => {
            gsap.to(s, {
              autoAlpha: i === idx ? 1 : 0,
              y: i === idx ? 0 : 18,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
          });

          // Crossfade scenes
          scenes.forEach((s, i) => {
            gsap.to(s, {
              autoAlpha: i === idx ? 1 : 0,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
          });

          // Stage container background swap
          if (stage.current) {
            gsap.to(stage.current, {
              backgroundColor: states[idx].bg,
              duration: 0.5,
              ease: "power2.out",
            });
          }

          // Progress dots
          ticks.forEach((p, i) => {
            p.style.background =
              i <= idx ? states[idx].fg : "rgba(29,29,31,0.12)";
          });
        },
      });

      // ─── SCENE-SPECIFIC ANIMATIONS ───────────────────────────────────────

      // Scene 0 — Hour 0: chaotic email pile, counter ticks down/up, red flickers
      const dots = gsap.utils.toArray<SVGCircleElement>(".s0-dot");
      dots.forEach((d) => {
        gsap.fromTo(
          d,
          { opacity: 0, scale: 0.4 },
          {
            opacity: 0.85,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            delay: Math.random() * 1.4,
            repeat: -1,
            yoyo: true,
            repeatDelay: 0.6 + Math.random(),
            transformOrigin: "50% 50%",
          }
        );
      });
      // Counter that climbs from 0 to 412 then resets — mimicking inbox piling up
      const counterEl = document.querySelector<HTMLElement>(".s0-counter");
      if (counterEl) {
        const c = { v: 0 };
        gsap.to(c, {
          v: 412,
          duration: 4.2,
          ease: "power1.in",
          repeat: -1,
          repeatDelay: 0.4,
          onUpdate: () => {
            counterEl.textContent = String(Math.round(c.v));
          },
          onRepeat: () => {
            c.v = 0;
          },
        });
      }

      // Scene 1 — Day 3: scanning audit beam sweeping across a heatmap grid
      gsap.to(".s1-scan", {
        x: 540,
        duration: 2.4,
        repeat: -1,
        ease: "sine.inOut",
        yoyo: true,
      });
      gsap.utils.toArray<SVGRectElement>(".s1-cell").forEach((cell) => {
        gsap.to(cell, {
          opacity: 0.4 + Math.random() * 0.5,
          duration: 0.6 + Math.random() * 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 1.2,
        });
      });

      // Scene 2 — Week 2: Shadow agent. Two parallel paths tracing a ticket
      const opPkt = document.querySelector<SVGCircleElement>(".s2-op-pkt");
      const agPkt = document.querySelector<SVGCircleElement>(".s2-ag-pkt");
      const opPath = document.querySelector<SVGPathElement>(".s2-op-path");
      const agPath = document.querySelector<SVGPathElement>(".s2-ag-path");
      if (opPkt && opPath) {
        const len = opPath.getTotalLength();
        const proxy = { v: 0 };
        gsap.to(proxy, {
          v: 1,
          duration: 3.4,
          repeat: -1,
          ease: "power1.inOut",
          onUpdate: () => {
            const p = opPath.getPointAtLength(proxy.v * len);
            opPkt.setAttribute("cx", String(p.x));
            opPkt.setAttribute("cy", String(p.y));
          },
        });
      }
      if (agPkt && agPath) {
        const len = agPath.getTotalLength();
        const proxy = { v: 0 };
        gsap.to(proxy, {
          v: 1,
          duration: 3.4,
          repeat: -1,
          ease: "power1.inOut",
          delay: 0.18,
          onUpdate: () => {
            const p = agPath.getPointAtLength(proxy.v * len);
            agPkt.setAttribute("cx", String(p.x));
            agPkt.setAttribute("cy", String(p.y));
          },
        });
      }

      // Scene 3 — Week 4: live network with flowing packets and pulsing meters
      gsap.utils.toArray<SVGPathElement>(".s3-edge").forEach((path, i) => {
        const pkt = document.querySelector<SVGCircleElement>(`[data-s3pkt='${i}']`);
        if (!pkt) return;
        const len = path.getTotalLength();
        const proxy = { v: 0 };
        gsap.to(proxy, {
          v: 1,
          duration: 2.6,
          ease: "none",
          repeat: -1,
          delay: i * 0.2,
          onUpdate: () => {
            const p = path.getPointAtLength(proxy.v * len);
            pkt.setAttribute("cx", String(p.x));
            pkt.setAttribute("cy", String(p.y));
          },
        });
      });
      gsap.to(".s3-pulse", {
        scale: 1.08,
        opacity: 1,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
        transformOrigin: "50% 50%",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root as any} className="relative h-screen overflow-hidden border-y border-ink/10">
      <div className="absolute inset-0 bp-grid opacity-60 mask-edges-y" />

      <div className="relative h-full mx-auto max-w-[1320px] px-5 grid lg:grid-cols-12 gap-10 items-center">
        {/* Left — text slides */}
        <div className="lg:col-span-5">
          <div className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-ink/30" />
            <span>04 · Live · scroll to advance</span>
          </div>
          <div className="relative mt-6 min-h-[300px]">
            {states.map((s, i) => (
              <article
                key={i}
                className="pd-slide absolute inset-0"
                style={{ visibility: "visible" }}
              >
                <div className="flex items-center gap-3 mono text-[11px]" style={{ color: s.fg }}>
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: s.fg }}
                    />
                    {s.title}
                  </span>
                  <span className="text-ink/30">·</span>
                  <span className="text-ink/45">{s.tag}</span>
                </div>
                <h3 className="mt-3 display-tight text-[40px] md:text-[56px]">
                  {s.sub}
                </h3>
                <p className="mt-5 text-[15px] text-ink/65 leading-[1.6] max-w-[440px]">
                  {s.detail}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-1.5">
            {states.map((_, i) => (
              <span
                key={i}
                className="pd-tick h-1 w-12 rounded-full transition-colors"
                style={{
                  background: i === 0 ? states[0].fg : "rgba(29,29,31,0.12)",
                }}
              />
            ))}
            <span className="ml-3 mono text-[10.5px] text-ink/45">
              {states.length} states · 4 animations
            </span>
          </div>
        </div>

        {/* Right — color-changing stage with per-scene SVG animations */}
        <div className="lg:col-span-7">
          <div
            ref={stage}
            className="relative rounded-[20px] overflow-hidden border border-ink/10 transition-colors"
            style={{ background: states[0].bg, aspectRatio: "720 / 460" }}
          >
            {/* Top status strip */}
            <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-5 py-3 mono text-[10.5px] text-canvas/55">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-canvas/30" />
                <span className="h-2 w-2 rounded-full bg-canvas/20" />
                <span className="h-2 w-2 rounded-full bg-canvas/15" />
                <span className="ml-3">cabinet · live-trace · ops-12.flow</span>
              </div>
              <span>● recording</span>
            </div>

            {/* SCENE 0 — Hour 0: chaotic dots + email counter */}
            <div className="pd-scene absolute inset-0">
              <svg viewBox="0 0 720 460" className="w-full h-full">
                <defs>
                  <radialGradient id="s0Glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FF453A" stopOpacity="0.20" />
                    <stop offset="100%" stopColor="#FF453A" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <ellipse cx="360" cy="230" rx="260" ry="160" fill="url(#s0Glow)" />
                {/* 412 chaotic dots */}
                {Array.from({ length: 88 }).map((_, i) => {
                  const cx = 60 + Math.random() * 600;
                  const cy = 90 + Math.random() * 290;
                  const r = 1.4 + Math.random() * 2.2;
                  return (
                    <circle
                      key={i}
                      className="s0-dot"
                      cx={cx}
                      cy={cy}
                      r={r}
                      fill={Math.random() > 0.6 ? "#FF453A" : "#FFFFFF"}
                      opacity="0.7"
                    />
                  );
                })}
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  fontSize="84"
                  fontWeight="300"
                  fill="#FFFFFF"
                  letterSpacing="-0.04em"
                >
                  <tspan className="s0-counter">0</tspan>
                  <tspan fill="#FF453A">.</tspan>
                </text>
                <text
                  x="50%"
                  y="65%"
                  textAnchor="middle"
                  fontSize="11"
                  fill="rgba(255,255,255,0.5)"
                  fontFamily="var(--font-jetbrains)"
                  letterSpacing="2"
                >
                  EMAILS UNANSWERED · QUEUE GROWING
                </text>
              </svg>
            </div>

            {/* SCENE 1 — Day 3: scanning audit beam over heatmap */}
            <div className="pd-scene absolute inset-0">
              <svg viewBox="0 0 720 460" className="w-full h-full">
                <defs>
                  <linearGradient id="s1Beam" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#5AB6FF" stopOpacity="0" />
                    <stop offset="50%" stopColor="#5AB6FF" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#5AB6FF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Heatmap of audit findings */}
                {Array.from({ length: 9 }).map((_, row) =>
                  Array.from({ length: 16 }).map((_, col) => {
                    const intensity = Math.random();
                    return (
                      <rect
                        key={`${row}-${col}`}
                        className="s1-cell"
                        x={60 + col * 38}
                        y={80 + row * 30}
                        width="32"
                        height="24"
                        rx="4"
                        fill="#5AB6FF"
                        opacity={0.1 + intensity * 0.5}
                      />
                    );
                  })
                )}
                {/* Sweeping audit beam */}
                <rect
                  className="s1-scan"
                  x="-160"
                  y="60"
                  width="160"
                  height="320"
                  fill="url(#s1Beam)"
                />
                <text
                  x="60"
                  y="430"
                  fontSize="10"
                  fill="rgba(255,255,255,0.55)"
                  fontFamily="var(--font-jetbrains)"
                  letterSpacing="2"
                >
                  AUDIT · 144 DECISIONS MAPPED · 12 BOTTLENECKS · 1 SHORTLIST
                </text>
              </svg>
            </div>

            {/* SCENE 2 — Week 2: shadow agent. operator + agent paths in parallel */}
            <div className="pd-scene absolute inset-0">
              <svg viewBox="0 0 720 460" className="w-full h-full">
                <defs>
                  <radialGradient id="s2Glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#BF5AF2" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#BF5AF2" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <ellipse cx="360" cy="230" rx="280" ry="170" fill="url(#s2Glow)" />

                {/* Lane labels */}
                <text x="60" y="120" fontSize="10" fill="#FFFFFF" opacity="0.7" fontFamily="var(--font-jetbrains)" letterSpacing="2">
                  OPERATOR
                </text>
                <text x="60" y="320" fontSize="10" fill="#BF5AF2" fontFamily="var(--font-jetbrains)" letterSpacing="2">
                  AGENT · SHADOW
                </text>

                {/* Operator path (white) */}
                <path
                  className="s2-op-path"
                  d="M 80 160 C 200 130, 260 200, 380 170 S 540 140, 660 170"
                  stroke="#FFFFFF"
                  strokeWidth="1.6"
                  fill="none"
                  opacity="0.6"
                />
                <circle className="s2-op-pkt" r="6" fill="#FFFFFF" />

                {/* Agent path (purple, dashed) */}
                <path
                  className="s2-ag-path"
                  d="M 80 360 C 200 330, 260 400, 380 370 S 540 340, 660 370"
                  stroke="#BF5AF2"
                  strokeWidth="1.6"
                  fill="none"
                  opacity="0.85"
                  strokeDasharray="5 5"
                />
                <circle className="s2-ag-pkt" r="6" fill="#BF5AF2" />

                {/* Match indicator */}
                <line x1="80"  y1="160" x2="80"  y2="360" stroke="rgba(255,255,255,0.18)" strokeDasharray="2 4" />
                <line x1="380" y1="170" x2="380" y2="370" stroke="rgba(255,255,255,0.18)" strokeDasharray="2 4" />
                <line x1="660" y1="170" x2="660" y2="370" stroke="rgba(255,255,255,0.18)" strokeDasharray="2 4" />

                <text x="60" y="430" fontSize="10" fill="rgba(255,255,255,0.55)" fontFamily="var(--font-jetbrains)" letterSpacing="2">
                  AGREEMENT · 96.4% · TUNING ON 234 EDGE CASES
                </text>
              </svg>
            </div>

            {/* SCENE 3 — Week 4: live workflow + pulsing meters */}
            <div className="pd-scene absolute inset-0">
              <svg viewBox="0 0 720 460" className="w-full h-full">
                <defs>
                  <radialGradient id="s3Glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#5DE8B6" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#5DE8B6" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <ellipse cx="360" cy="220" rx="300" ry="180" fill="url(#s3Glow)" />

                {/* Six nodes */}
                {[
                  { x: 90,  y: 200, label: "INTAKE" },
                  { x: 250, y: 130, label: "CLASSIFY" },
                  { x: 250, y: 270, label: "EXTRACT" },
                  { x: 410, y: 200, label: "AGENT" },
                  { x: 570, y: 140, label: "CRM" },
                  { x: 570, y: 260, label: "SLACK" },
                ].map((n, i) => (
                  <g key={i} transform={`translate(${n.x}, ${n.y})`}>
                    <circle r="22" className="s3-pulse" fill="#5DE8B6" opacity="0.18" />
                    <circle r="14" fill="#FFFFFF" stroke="#5DE8B6" strokeWidth="1.6" />
                    <circle r="5" fill="#5DE8B6" />
                    <text
                      x="20"
                      y="4"
                      fontSize="9.5"
                      fill="#FFFFFF"
                      opacity="0.85"
                      fontFamily="var(--font-jetbrains)"
                      letterSpacing="1.2"
                    >
                      {n.label}
                    </text>
                  </g>
                ))}

                {/* Edges */}
                {[
                  { d: "M 112 200 C 180 200, 200 130, 228 130", i: 0 },
                  { d: "M 112 200 C 180 200, 200 270, 228 270", i: 1 },
                  { d: "M 272 130 C 340 130, 360 200, 388 200", i: 2 },
                  { d: "M 272 270 C 340 270, 360 200, 388 200", i: 3 },
                  { d: "M 432 200 C 500 200, 520 140, 548 140", i: 4 },
                  { d: "M 432 200 C 500 200, 520 260, 548 260", i: 5 },
                ].map((e, i) => (
                  <g key={i}>
                    <path
                      className="s3-edge"
                      d={e.d}
                      stroke="#5DE8B6"
                      strokeWidth="1.6"
                      fill="none"
                      opacity="0.55"
                    />
                    <circle data-s3pkt={i} r="3.5" fill="#5DE8B6" />
                  </g>
                ))}

                {/* Telemetry */}
                <g transform="translate(60, 380)">
                  <rect width="180" height="44" rx="10" fill="rgba(255,255,255,0.08)" />
                  <text x="14" y="18" fontSize="9.5" fill="#5DE8B6" fontFamily="var(--font-jetbrains)" letterSpacing="1.5">AUTO-RESOLVE</text>
                  <text x="14" y="35" fontSize="16" fill="#FFFFFF" fontWeight="500">82%</text>
                </g>
                <g transform="translate(270, 380)">
                  <rect width="180" height="44" rx="10" fill="rgba(255,255,255,0.08)" />
                  <text x="14" y="18" fontSize="9.5" fill="#5DE8B6" fontFamily="var(--font-jetbrains)" letterSpacing="1.5">FIRST RESPONSE</text>
                  <text x="14" y="35" fontSize="16" fill="#FFFFFF" fontWeight="500">26s</text>
                </g>
                <g transform="translate(480, 380)">
                  <rect width="180" height="44" rx="10" fill="rgba(255,255,255,0.08)" />
                  <text x="14" y="18" fontSize="9.5" fill="#5DE8B6" fontFamily="var(--font-jetbrains)" letterSpacing="1.5">HUMAN-IN-LOOP</text>
                  <text x="14" y="35" fontSize="16" fill="#FFFFFF" fontWeight="500">4%</text>
                </g>
              </svg>
            </div>
          </div>

          <div className="mt-3 mono text-[10.5px] text-ink/45 flex items-center justify-between">
            <span>scene · {states.length} ·  unique animations per stage</span>
            <span>scroll → advance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
