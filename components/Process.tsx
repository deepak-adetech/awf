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
    week: "Weeks 2–3",
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

const THEMES = [
  { bg: "#1A1208", accent: "#F59E0B" }, // Audit · amber
  { bg: "#0B1729", accent: "#3B82F6" }, // Blueprint · sapphire
  { bg: "#1A0F2E", accent: "#8B5CF6" }, // Build · violet
  { bg: "#0A1E1A", accent: "#10B981" }, // Operate · mint
];

const BP_NODES = [
  { x: 120, y: 210, label: "INTAKE" },
  { x: 290, y: 130, label: "CLASSIFY" },
  { x: 290, y: 290, label: "ROUTE" },
  { x: 470, y: 210, label: "AGENT" },
  { x: 620, y: 210, label: "OUTPUT" },
];
const BP_EDGES: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 3], [3, 4],
];

const OP_NODES = [
  { x: 100, y: 200, label: "EMAIL" },
  { x: 270, y: 130, label: "CLASSIFY" },
  { x: 270, y: 270, label: "FILTER" },
  { x: 450, y: 200, label: "AGENT" },
  { x: 610, y: 200, label: "OUTPUT" },
];
const OP_EDGES: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 3], [3, 4],
];

const BUILD_BLOCKS = [
  { y: 56,  label: "REVIEW GATE", sub: "human-in-loop · 4%" },
  { y: 140, label: "LLM ROUTER",  sub: "gpt-4o · temp 0.1" },
  { y: 224, label: "DOC PARSER",  sub: "layout + extraction" },
  { y: 308, label: "WEBHOOK",     sub: "crm · slack · sheets" },
];

export default function Process() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scenes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-scene]")
      );
      const bars = Array.from(
        document.querySelectorAll<HTMLElement>("[data-bar]")
      );

      gsap.set(scenes, { opacity: 0 });
      if (scenes[0]) gsap.set(scenes[0], { opacity: 1 });
      gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });
      if (bars[0]) gsap.set(bars[0], { scaleX: 1 });

      function activateScene(idx: number) {
        scenes.forEach((el, i) =>
          gsap.to(el, {
            opacity: i === idx ? 1 : 0,
            duration: 0.55,
            ease: "power2.inOut",
          })
        );
        bars.forEach((bar, i) =>
          gsap.to(bar, {
            scaleX: i === idx ? 1 : 0,
            duration: 0.45,
            ease: "power2.out",
          })
        );
      }

      // Cross-fade scenes based on which step is in view
      gsap.utils
        .toArray<HTMLElement>("[data-step]")
        .forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 62%",
            end: "bottom 38%",
            onEnter: () => activateScene(i),
            onEnterBack: () => activateScene(i),
          });

          gsap.from(el, {
            y: 28,
            opacity: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          });
        });

      // ── Scene 0: Audit — sweeping scan beam + flickering items ──
      const beamEl = document.querySelector<SVGRectElement>("#audit-beam");
      if (beamEl) {
        const proxy = { x: -140 };
        gsap.to(proxy, {
          x: 840,
          duration: 2.8,
          ease: "none",
          repeat: -1,
          repeatDelay: 0.6,
          onUpdate: () => beamEl.setAttribute("x", String(proxy.x)),
        });
      }
      gsap.to(".audit-item", {
        opacity: 0.92,
        duration: 0.4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: { each: 0.18, from: "random" },
      });

      // ── Scene 1: Blueprint — paths draw, nodes pop, labels fade ──
      const bpPaths = gsap.utils.toArray<SVGPathElement>(".bp-path");
      const bpNodes = gsap.utils.toArray<SVGCircleElement>(".bp-node");
      const bpLabels = gsap.utils.toArray<SVGTextElement>(".bp-label");

      const drawBlueprint = () => {
        bpPaths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
        });
        gsap.set(bpNodes, { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
        gsap.set(bpLabels, { opacity: 0 });

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.delayedCall(2.4, drawBlueprint);
          },
        });
        tl.to(bpPaths, {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.18,
          ease: "power2.out",
        })
          .to(
            bpNodes,
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              stagger: 0.1,
              ease: "back.out(2)",
            },
            "-=0.4"
          )
          .to(bpLabels, { opacity: 0.9, duration: 0.4, stagger: 0.08 }, "-=0.3");
      };
      drawBlueprint();

      // ── Scene 2: Build — blocks stack in then dissolve, loop ──
      const buildBlocks = gsap.utils.toArray<SVGGElement>(".build-block");
      const stackBuild = () => {
        gsap.set(buildBlocks, { opacity: 0, y: 60 });
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.delayedCall(2.4, () => {
              gsap.to(buildBlocks, {
                opacity: 0,
                y: -24,
                duration: 0.32,
                stagger: { each: 0.08, from: "end" },
                onComplete: () => {
                  gsap.delayedCall(0.3, stackBuild);
                },
              });
            });
          },
        });
        tl.to(buildBlocks, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.16,
          ease: "back.out(1.4)",
        });
      };
      stackBuild();

      // Build progress bar
      const buildBar = document.querySelector<SVGRectElement>("#build-progress");
      if (buildBar) {
        gsap.fromTo(
          buildBar,
          { attr: { width: 0 } },
          {
            attr: { width: 380 },
            duration: 4,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
          }
        );
      }

      // ── Scene 3: Operate — packets flow + node pulses ──
      document.querySelectorAll<SVGPathElement>(".op-path").forEach((path, i) => {
        const pkt = document.querySelector<SVGCircleElement>(`[data-oppkt="${i}"]`);
        if (!pkt) return;
        const len = path.getTotalLength();
        const proxy = { v: 0 };
        gsap.to(proxy, {
          v: 1,
          duration: 2.4 + i * 0.25,
          ease: "none",
          repeat: -1,
          delay: i * 0.35,
          onUpdate: () => {
            const p = path.getPointAtLength(proxy.v * len);
            pkt.setAttribute("cx", String(p.x));
            pkt.setAttribute("cy", String(p.y));
          },
        });
      });

      gsap.fromTo(
        ".op-pulse",
        { attr: { r: 10 }, opacity: 0.55 },
        {
          attr: { r: 22 },
          opacity: 0,
          duration: 1.4,
          ease: "power2.out",
          repeat: -1,
          stagger: { each: 0.32, from: "random" },
        }
      );
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
          right="We compress strategy into days, not quarters. Each phase has a deliverable, a duration, and a price. Scroll to watch each phase render its own way of working."
        />

        <div className="relative mt-14 grid lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left: step copy */}
          <div className="lg:col-span-6 space-y-12 lg:space-y-28">
            {steps.map((s, i) => (
              <article key={i} data-step={i} className="relative">
                <div className="flex items-center gap-4">
                  <span
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full mono text-[11px] text-white font-medium"
                    style={{ background: THEMES[i].accent }}
                  >
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
                  <span
                    className="px-3 py-1.5 rounded-full border text-ink/75"
                    style={{ borderColor: `${THEMES[i].accent}40` }}
                  >
                    {s.deliverable}
                  </span>
                  <span className="text-ink/40">·</span>
                  <span className="text-ink/55">{s.duration}</span>
                </div>
              </article>
            ))}
          </div>

          {/* Right: sticky scene panel */}
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-24">
              {/* Step indicator bars */}
              <div className="flex items-center gap-2 mb-4">
                {THEMES.map((t, i) => (
                  <div key={i} className="flex-1">
                    <div
                      className="h-[3px] rounded-full overflow-hidden"
                      style={{ background: `${t.accent}22` }}
                    >
                      <div
                        data-bar={i}
                        className="h-full rounded-full"
                        style={{
                          background: t.accent,
                          transform: i === 0 ? "scaleX(1)" : "scaleX(0)",
                          transformOrigin: "left center",
                        }}
                      />
                    </div>
                    <div className="mt-1.5 mono text-[10px] text-ink/40">
                      {String(i + 1).padStart(2, "0")} · {steps[i].title}
                    </div>
                  </div>
                ))}
              </div>

              {/* Scene container */}
              <div
                className="relative rounded-2xl overflow-hidden border border-ink/[0.06]"
                style={{ aspectRatio: "16/11" }}
              >
                {/* ─── Scene 0: AUDIT ─── */}
                <div data-scene="0" className="absolute inset-0">
                  <svg
                    viewBox="0 0 720 480"
                    className="block w-full h-full"
                    style={{ background: THEMES[0].bg }}
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <defs>
                      <linearGradient id="auditScan" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
                        <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                      </linearGradient>
                      <pattern
                        id="auditGrid"
                        width="22"
                        height="22"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="1" cy="1" r="0.7" fill="#F59E0B" opacity="0.08" />
                      </pattern>
                    </defs>
                    <rect width="720" height="480" fill="url(#auditGrid)" />

                    {[
                      { x: 50,  y: 48,  w: 150, label: "INBOX",          sub: "847 items" },
                      { x: 230, y: 60,  w: 140, label: "TICKET #2847",   sub: "open · urgent" },
                      { x: 400, y: 50,  w: 140, label: "SHEET · AP",     sub: "Nov reconcile" },
                      { x: 560, y: 62,  w: 130, label: "FORM · VENDOR",  sub: "needs review" },
                      { x: 50,  y: 160, w: 140, label: "DOC · Q4",       sub: "needs review" },
                      { x: 220, y: 170, w: 140, label: "EMAIL · URGENT", sub: "no assignee" },
                      { x: 390, y: 158, w: 130, label: "ATTACHMENT",     sub: "unread" },
                      { x: 540, y: 168, w: 150, label: "TICKET #2848",   sub: "escalated" },
                      { x: 80,  y: 268, w: 140, label: "FORM · ONBOARD", sub: "pending" },
                      { x: 250, y: 280, w: 140, label: "EMAIL · FYI",    sub: "low priority" },
                      { x: 420, y: 270, w: 140, label: "SHEET · AR",     sub: "overdue" },
                      { x: 590, y: 280, w: 100, label: "DOC",            sub: "draft" },
                    ].map((it, i) => (
                      <g
                        key={i}
                        className="audit-item"
                        opacity="0.32"
                        transform={`translate(${it.x}, ${it.y})`}
                      >
                        <rect
                          width={it.w}
                          height={42}
                          rx="5"
                          fill="#F59E0B"
                          fillOpacity="0.06"
                          stroke="#F59E0B"
                          strokeOpacity="0.3"
                          strokeWidth="0.8"
                        />
                        <text
                          x="10"
                          y="17"
                          fontSize="9"
                          fill="#F59E0B"
                          fontFamily="var(--font-jetbrains)"
                          letterSpacing="1.1"
                        >
                          {it.label}
                        </text>
                        <text
                          x="10"
                          y="31"
                          fontSize="8"
                          fill="#F59E0B"
                          fillOpacity="0.55"
                          fontFamily="var(--font-jetbrains)"
                        >
                          {it.sub}
                        </text>
                      </g>
                    ))}

                    <rect
                      id="audit-beam"
                      x="-140"
                      y="0"
                      width="140"
                      height="480"
                      fill="url(#auditScan)"
                    />

                    {/* Footer label */}
                    <g>
                      <text
                        x="36"
                        y="426"
                        fontSize="9.5"
                        fill="#F59E0B"
                        fillOpacity="0.55"
                        fontFamily="var(--font-jetbrains)"
                        letterSpacing="1.4"
                      >
                        SCANNING · 847 WORK ITEMS
                      </text>
                      <text
                        x="36"
                        y="446"
                        fontSize="8.5"
                        fill="#F59E0B"
                        fillOpacity="0.35"
                        fontFamily="var(--font-jetbrains)"
                        letterSpacing="1"
                      >
                        finding the highest-leverage workflow to automate
                      </text>
                      <text
                        x="688"
                        y="426"
                        fontSize="9"
                        fill="#F59E0B"
                        fillOpacity="0.5"
                        fontFamily="var(--font-jetbrains)"
                        letterSpacing="1.2"
                        textAnchor="end"
                      >
                        ● audit · live
                      </text>
                    </g>
                  </svg>
                </div>

                {/* ─── Scene 1: BLUEPRINT ─── */}
                <div
                  data-scene="1"
                  className="absolute inset-0"
                  style={{ opacity: 0 }}
                >
                  <svg
                    viewBox="0 0 720 480"
                    className="block w-full h-full"
                    style={{ background: THEMES[1].bg }}
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <defs>
                      <pattern
                        id="bpGridP"
                        width="24"
                        height="24"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="1" cy="1" r="0.7" fill="#3B82F6" opacity="0.13" />
                      </pattern>
                      <linearGradient id="bpStroke" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#6366F1" />
                      </linearGradient>
                    </defs>
                    <rect width="720" height="480" fill="url(#bpGridP)" />

                    {/* Cross-hairs */}
                    <g stroke="#3B82F6" strokeOpacity="0.12" strokeWidth="0.6">
                      <line x1="0" y1="80" x2="720" y2="80" strokeDasharray="2 4" />
                      <line x1="0" y1="350" x2="720" y2="350" strokeDasharray="2 4" />
                      <line x1="80" y1="0" x2="80" y2="480" strokeDasharray="2 4" />
                      <line x1="640" y1="0" x2="640" y2="480" strokeDasharray="2 4" />
                    </g>

                    {/* Edges */}
                    {BP_EDGES.map(([a, b], i) => {
                      const A = BP_NODES[a];
                      const B = BP_NODES[b];
                      const mx = (A.x + B.x) / 2;
                      return (
                        <path
                          key={i}
                          className="bp-path"
                          d={`M ${A.x} ${A.y} C ${mx} ${A.y}, ${mx} ${B.y}, ${B.x} ${B.y}`}
                          stroke="url(#bpStroke)"
                          strokeWidth="1.6"
                          strokeDasharray="5 6"
                          fill="none"
                          opacity="0.85"
                        />
                      );
                    })}

                    {/* Nodes */}
                    {BP_NODES.map((n, i) => (
                      <g key={i} transform={`translate(${n.x}, ${n.y})`}>
                        <circle
                          className="bp-node"
                          r="13"
                          fill={THEMES[1].bg}
                          stroke="#3B82F6"
                          strokeWidth="1.6"
                        />
                        <circle className="bp-node" r="4" fill="#3B82F6" />
                        <text
                          className="bp-label"
                          x="0"
                          y="-22"
                          fontSize="9"
                          fill="#93C5FD"
                          textAnchor="middle"
                          fontFamily="var(--font-jetbrains)"
                          letterSpacing="1.3"
                        >
                          {n.label}
                        </text>
                      </g>
                    ))}

                    {/* Annotations */}
                    <g opacity="0.4">
                      <text
                        x="36"
                        y="396"
                        fontSize="8.5"
                        fill="#93C5FD"
                        fontFamily="var(--font-jetbrains)"
                        letterSpacing="1"
                      >
                        SYSTEMS: CRM · INBOX · SHEETS · SLACK
                      </text>
                      <text
                        x="36"
                        y="412"
                        fontSize="8.5"
                        fill="#93C5FD"
                        fontFamily="var(--font-jetbrains)"
                        letterSpacing="1"
                      >
                        AGENTS: 2 · CHECKPOINTS: 1 · FAILURE MODES: 4
                      </text>
                      <text
                        x="36"
                        y="446"
                        fontSize="9"
                        fill="#3B82F6"
                        fontFamily="var(--font-jetbrains)"
                        letterSpacing="1.4"
                      >
                        BLUEPRINT · AR-COLLECTIONS-V3 · REV 01
                      </text>
                      <text
                        x="688"
                        y="446"
                        fontSize="9"
                        fill="#3B82F6"
                        fontFamily="var(--font-jetbrains)"
                        letterSpacing="1.2"
                        textAnchor="end"
                      >
                        ● drafting
                      </text>
                    </g>
                  </svg>
                </div>

                {/* ─── Scene 2: BUILD ─── */}
                <div
                  data-scene="2"
                  className="absolute inset-0"
                  style={{ opacity: 0 }}
                >
                  <svg
                    viewBox="0 0 720 480"
                    className="block w-full h-full"
                    style={{ background: THEMES[2].bg }}
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <defs>
                      <pattern
                        id="buildGridP"
                        width="24"
                        height="24"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="1" cy="1" r="0.7" fill="#8B5CF6" opacity="0.1" />
                      </pattern>
                      <linearGradient id="buildAccent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#BF5AF2" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                    <rect width="720" height="480" fill="url(#buildGridP)" />

                    {/* Stacking blocks */}
                    {BUILD_BLOCKS.map((b, i) => (
                      <g
                        key={i}
                        className="build-block"
                        transform={`translate(170, ${b.y})`}
                      >
                        <rect
                          width="380"
                          height="72"
                          rx="9"
                          fill="#8B5CF6"
                          fillOpacity="0.07"
                          stroke="#8B5CF6"
                          strokeOpacity="0.32"
                          strokeWidth="1"
                        />
                        <rect
                          width="4"
                          height="72"
                          rx="2"
                          fill="url(#buildAccent)"
                        />
                        <text
                          x="22"
                          y="32"
                          fontSize="13"
                          fill="#C4B5FD"
                          fontFamily="var(--font-jetbrains)"
                          letterSpacing="1.6"
                          fontWeight="600"
                        >
                          {b.label}
                        </text>
                        <text
                          x="22"
                          y="52"
                          fontSize="9.5"
                          fill="#C4B5FD"
                          fillOpacity="0.55"
                          fontFamily="var(--font-jetbrains)"
                          letterSpacing="0.5"
                        >
                          {b.sub}
                        </text>
                        {/* Status indicator */}
                        <circle cx="354" cy="36" r="6" fill="#8B5CF6" fillOpacity="0.25" />
                        <circle cx="354" cy="36" r="3" fill="#A78BFA" />
                        {/* Connector hint between blocks */}
                        {i < BUILD_BLOCKS.length - 1 && (
                          <line
                            x1="190"
                            y1="72"
                            x2="190"
                            y2="84"
                            stroke="#8B5CF6"
                            strokeOpacity="0.4"
                            strokeWidth="1"
                            strokeDasharray="2 3"
                          />
                        )}
                      </g>
                    ))}

                    {/* Progress bar */}
                    <g transform="translate(170, 408)">
                      <rect
                        width="380"
                        height="6"
                        rx="3"
                        fill="#8B5CF6"
                        fillOpacity="0.15"
                      />
                      <rect
                        id="build-progress"
                        width="0"
                        height="6"
                        rx="3"
                        fill="url(#buildAccent)"
                      />
                    </g>

                    <g>
                      <text
                        x="170"
                        y="438"
                        fontSize="9"
                        fill="#C4B5FD"
                        fillOpacity="0.55"
                        fontFamily="var(--font-jetbrains)"
                        letterSpacing="1.4"
                      >
                        ASSEMBLING · SHADOW MODE · WEEK 2/3
                      </text>
                      <text
                        x="550"
                        y="438"
                        fontSize="9"
                        fill="#C4B5FD"
                        fillOpacity="0.55"
                        fontFamily="var(--font-jetbrains)"
                        letterSpacing="1.2"
                        textAnchor="end"
                      >
                        ● building
                      </text>
                    </g>
                  </svg>
                </div>

                {/* ─── Scene 3: OPERATE ─── */}
                <div
                  data-scene="3"
                  className="absolute inset-0"
                  style={{ opacity: 0 }}
                >
                  <svg
                    viewBox="0 0 720 480"
                    className="block w-full h-full"
                    style={{ background: THEMES[3].bg }}
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <defs>
                      <pattern
                        id="opGridP"
                        width="24"
                        height="24"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="1" cy="1" r="0.7" fill="#10B981" opacity="0.1" />
                      </pattern>
                      <linearGradient id="opStroke" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#34D399" />
                      </linearGradient>
                    </defs>
                    <rect width="720" height="480" fill="url(#opGridP)" />

                    {/* Edges */}
                    {OP_EDGES.map(([a, b], i) => {
                      const A = OP_NODES[a];
                      const B = OP_NODES[b];
                      const mx = (A.x + B.x) / 2;
                      return (
                        <path
                          key={i}
                          className="op-path"
                          d={`M ${A.x} ${A.y} C ${mx} ${A.y}, ${mx} ${B.y}, ${B.x} ${B.y}`}
                          stroke="url(#opStroke)"
                          strokeWidth="1.6"
                          fill="none"
                          opacity="0.55"
                        />
                      );
                    })}

                    {/* Nodes */}
                    {OP_NODES.map((n, i) => (
                      <g key={i} transform={`translate(${n.x}, ${n.y})`}>
                        <circle
                          className="op-pulse"
                          r="10"
                          fill="#10B981"
                          opacity="0.55"
                        />
                        <circle
                          r="11"
                          fill={THEMES[3].bg}
                          stroke="#10B981"
                          strokeWidth="1.6"
                        />
                        <circle r="3.5" fill="#34D399" />
                        <text
                          x="0"
                          y="-18"
                          fontSize="8.5"
                          fill="#6EE7B7"
                          fillOpacity="0.85"
                          textAnchor="middle"
                          fontFamily="var(--font-jetbrains)"
                          letterSpacing="1.2"
                        >
                          {n.label}
                        </text>
                      </g>
                    ))}

                    {/* Packets */}
                    {OP_EDGES.map((_, i) => (
                      <circle
                        key={i}
                        data-oppkt={i}
                        r="4.5"
                        fill="#34D399"
                      />
                    ))}

                    {/* Metric tiles */}
                    {[
                      { x: 40,  label: "AUTO-RESOLVE", val: "82%" },
                      { x: 250, label: "AVG RESPONSE", val: "26 s" },
                      { x: 460, label: "QUEUE DEPTH",  val: "0" },
                    ].map((m, i) => (
                      <g key={i} transform={`translate(${m.x}, 340)`}>
                        <rect
                          width="200"
                          height="76"
                          rx="9"
                          fill="#10B981"
                          fillOpacity="0.07"
                          stroke="#10B981"
                          strokeOpacity="0.25"
                          strokeWidth="0.8"
                        />
                        <text
                          x="16"
                          y="26"
                          fontSize="9"
                          fill="#6EE7B7"
                          fillOpacity="0.6"
                          fontFamily="var(--font-jetbrains)"
                          letterSpacing="1.3"
                        >
                          {m.label}
                        </text>
                        <text
                          x="16"
                          y="60"
                          fontSize="26"
                          fill="#A7F3D0"
                          fontFamily="var(--font-jetbrains)"
                          fontWeight="600"
                        >
                          {m.val}
                        </text>
                      </g>
                    ))}

                    <g>
                      <text
                        x="36"
                        y="446"
                        fontSize="9"
                        fill="#6EE7B7"
                        fillOpacity="0.55"
                        fontFamily="var(--font-jetbrains)"
                        letterSpacing="1.4"
                      >
                        OPERATING · SLA ACTIVE · WEEKLY DIGEST
                      </text>
                      <text
                        x="688"
                        y="446"
                        fontSize="9"
                        fill="#6EE7B7"
                        fillOpacity="0.7"
                        fontFamily="var(--font-jetbrains)"
                        letterSpacing="1.2"
                        textAnchor="end"
                      >
                        ● live
                      </text>
                    </g>
                  </svg>
                </div>
              </div>

              <div className="mt-3 mono text-[10.5px] text-ink/45 flex items-center justify-between">
                <span>scroll · each phase, its own animation</span>
                <span>4 scenes · 1 outcome</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
