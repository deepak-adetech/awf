"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type Node = {
  id: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  sub?: string;
  kind?: "input" | "logic" | "ai" | "output";
};

type Edge = { from: string; to: string; bend?: number };

const nodes: Node[] = [
  { id: "intake", x: 80, y: 110, label: "Intake", sub: "Email · Form · API", kind: "input" },
  { id: "classify", x: 320, y: 60, label: "Classify", sub: "Tier + intent", kind: "logic" },
  { id: "extract", x: 320, y: 200, label: "Extract", sub: "Fields + entities", kind: "logic" },
  { id: "agent", x: 580, y: 130, label: "AI Agent", sub: "GPT-4o · tool-use", kind: "ai" },
  { id: "review", x: 580, y: 290, label: "Human review", sub: "Edge cases · 4%", kind: "logic" },
  { id: "crm", x: 850, y: 70, label: "CRM update", sub: "HubSpot", kind: "output" },
  { id: "tickets", x: 850, y: 200, label: "Ticket created", sub: "Linear", kind: "output" },
  { id: "notify", x: 850, y: 330, label: "Notify", sub: "Slack #ops", kind: "output" },
];

const edges: Edge[] = [
  { from: "intake", to: "classify" },
  { from: "intake", to: "extract" },
  { from: "classify", to: "agent" },
  { from: "extract", to: "agent" },
  { from: "agent", to: "crm" },
  { from: "agent", to: "tickets" },
  { from: "agent", to: "review" },
  { from: "review", to: "notify" },
];

const NODE_W = 168;
const NODE_H = 60;

function nodePath(a: Node, b: Node) {
  const ax = a.x + NODE_W;
  const ay = a.y + NODE_H / 2;
  const bx = b.x;
  const by = b.y + NODE_H / 2;
  const mx = (ax + bx) / 2;
  return `M ${ax} ${ay} C ${mx} ${ay}, ${mx} ${by}, ${bx} ${by}`;
}

const kindColor: Record<NonNullable<Node["kind"]>, string> = {
  input: "#0A5740",
  logic: "#0E1411",
  ai: "#0D6B4E",
  output: "#0A5740",
};

export default function WorkflowCanvas() {
  const root = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(".wf-axis", { opacity: 0.0 });
      gsap.set(".wf-edge", { strokeDashoffset: 480, opacity: 0 });
      gsap.set(".wf-node", { opacity: 0, y: 6, scale: 0.96, transformOrigin: "50% 50%" });
      gsap.set(".wf-packet", { opacity: 0 });
      gsap.set(".wf-tag", { opacity: 0, y: -2 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, delay: 0.25 });

      // 1. Axes appear
      tl.to(".wf-axis", { opacity: 1, duration: 0.6 });

      // 2. Nodes drop in, staggered
      tl.to(
        ".wf-node",
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.07 },
        "-=0.25"
      );

      // 3. Edges draw
      tl.to(
        ".wf-edge",
        { strokeDashoffset: 0, opacity: 1, duration: 0.85, stagger: 0.06 },
        "-=0.5"
      );

      // 4. Tags pop
      tl.to(".wf-tag", { opacity: 1, y: 0, duration: 0.4, stagger: 0.04 }, "-=0.4");

      // 5. Loop packets along edges
      gsap.utils.toArray<SVGPathElement>(".wf-edge").forEach((path, i) => {
        const pkt = path.parentElement?.querySelector(`[data-pkt='${i}']`) as
          | SVGCircleElement
          | null;
        if (!pkt) return;
        const len = path.getTotalLength();
        gsap.set(pkt, { opacity: 0 });
        const proxy = { v: 0 };
        gsap.to(proxy, {
          v: 1,
          duration: 2.6,
          ease: "none",
          repeat: -1,
          delay: 1.2 + i * 0.18,
          onUpdate: () => {
            const p = path.getPointAtLength(proxy.v * len);
            pkt.setAttribute("cx", String(p.x));
            pkt.setAttribute("cy", String(p.y));
          },
          onRepeat: () => {
            gsap.fromTo(pkt, { opacity: 0 }, { opacity: 1, duration: 0.2 });
          },
        });
        gsap.fromTo(pkt, { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 1.3 + i * 0.18 });
      });

      // 6. Subtle continuous drift on the whole diagram (parallax-feel)
      gsap.to(root.current, {
        y: -6,
        duration: 4.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full">
      {/* corner crosshair frame */}
      <div className="crosshair absolute inset-0">
        <i />
      </div>

      <svg
        ref={root}
        viewBox="0 0 1040 410"
        className="block w-full h-auto"
        role="img"
        aria-label="Animated AI workflow diagram"
      >
        <defs>
          <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0D6B4E" stopOpacity="0.15" />
            <stop offset="40%" stopColor="#0D6B4E" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0D6B4E" stopOpacity="0.95" />
          </linearGradient>
          <radialGradient id="pktGrad">
            <stop offset="0%" stopColor="#0D6B4E" />
            <stop offset="100%" stopColor="#0D6B4E" stopOpacity="0" />
          </radialGradient>
          <pattern id="bp" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.9" fill="rgba(14,20,17,0.10)" />
          </pattern>
        </defs>

        {/* internal grid backdrop */}
        <rect x="0" y="0" width="1040" height="410" fill="url(#bp)" opacity="0.55" />

        {/* axis ticks */}
        <g className="wf-axis" stroke="rgba(14,20,17,0.18)" strokeWidth="1">
          <line x1="0" y1="0" x2="1040" y2="0" />
          <line x1="0" y1="0" x2="0" y2="410" />
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`tx-${i}`} x1={i * 104} y1="0" x2={i * 104} y2="6" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`ty-${i}`} x1="0" y1={i * 70} x2="6" y2={i * 70} />
          ))}
        </g>

        {/* edges */}
        <g fill="none" stroke="url(#edgeGrad)" strokeWidth="1.6">
          {edges.map((e, i) => {
            const a = nodes.find((n) => n.id === e.from)!;
            const b = nodes.find((n) => n.id === e.to)!;
            const d = nodePath(a, b);
            return (
              <g key={i}>
                <path
                  d={d}
                  className="wf-edge"
                  strokeDasharray="480"
                  strokeLinecap="round"
                />
                <circle data-pkt={i} className="wf-packet" r="4.5" fill="#0D6B4E" />
              </g>
            );
          })}
        </g>

        {/* nodes */}
        {nodes.map((n) => (
          <g key={n.id} className="wf-node" transform={`translate(${n.x}, ${n.y})`}>
            <rect
              x="0"
              y="0"
              rx="10"
              width={NODE_W}
              height={NODE_H}
              fill="#FFFFFF"
              stroke="rgba(14,20,17,0.12)"
            />
            <rect x="0" y="0" rx="10" width="4" height={NODE_H} fill={kindColor[n.kind ?? "logic"]} />
            <circle cx={NODE_W - 14} cy={14} r="3.2" fill={kindColor[n.kind ?? "logic"]} />
            <text x="16" y="24" fontSize="12.5" fontWeight="500" fill="#0E1411">
              {n.label}
            </text>
            <text x="16" y="42" fontSize="10.5" fill="rgba(14,20,17,0.55)">
              {n.sub}
            </text>
          </g>
        ))}

        {/* tags */}
        <g className="wf-tag">
          <g transform="translate(80, 92)">
            <rect rx="6" width="92" height="18" fill="#0E1411" />
            <text x="10" y="13" fontSize="10" fill="#FAFAF8" letterSpacing="0.5">
              TRIGGER · API
            </text>
          </g>
        </g>
        <g className="wf-tag">
          <g transform="translate(580, 112)">
            <rect rx="6" width="74" height="18" fill="#0D6B4E" />
            <text x="10" y="13" fontSize="10" fill="#FAFAF8" letterSpacing="0.5">
              AGENT · v3
            </text>
          </g>
        </g>
        <g className="wf-tag">
          <g transform="translate(850, 52)">
            <rect rx="6" width="56" height="18" fill="#0A5740" />
            <text x="10" y="13" fontSize="10" fill="#FAFAF8" letterSpacing="0.5">
              OUTPUT
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
