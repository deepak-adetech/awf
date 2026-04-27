"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type Node = {
  id: string;
  x: number;
  y: number;
  label: string;
  sub?: string;
  kind: "input" | "logic" | "ai" | "output";
};
type Edge = { from: string; to: string };

const NODE_W = 140;
const NODE_H = 52;

const nodes: Node[] = [
  { id: "intake", x: 40, y: 110, label: "Intake", sub: "API · Email", kind: "input" },
  { id: "classify", x: 250, y: 50, label: "Classify", sub: "Tier + intent", kind: "logic" },
  { id: "extract", x: 250, y: 180, label: "Extract", sub: "Fields · entities", kind: "logic" },
  { id: "agent", x: 460, y: 115, label: "AI Agent v3", sub: "Tools · memory", kind: "ai" },
  { id: "review", x: 460, y: 245, label: "Review", sub: "Edge cases · 4%", kind: "logic" },
  { id: "crm", x: 670, y: 60, label: "CRM update", sub: "HubSpot", kind: "output" },
  { id: "ticket", x: 670, y: 165, label: "Ticket", sub: "Linear", kind: "output" },
  { id: "notify", x: 670, y: 270, label: "Notify", sub: "Slack #ops", kind: "output" },
];

const edges: Edge[] = [
  { from: "intake", to: "classify" },
  { from: "intake", to: "extract" },
  { from: "classify", to: "agent" },
  { from: "extract", to: "agent" },
  { from: "agent", to: "crm" },
  { from: "agent", to: "ticket" },
  { from: "agent", to: "review" },
  { from: "review", to: "notify" },
];

function nodePath(a: Node, b: Node) {
  const ax = a.x + NODE_W;
  const ay = a.y + NODE_H / 2;
  const bx = b.x;
  const by = b.y + NODE_H / 2;
  const mx = (ax + bx) / 2;
  return `M ${ax} ${ay} C ${mx} ${ay}, ${mx} ${by}, ${bx} ${by}`;
}

const kindColor: Record<Node["kind"], string> = {
  input: "#0057B3",
  logic: "#1D1D1F",
  ai: "#0071E3",
  output: "#0057B3",
};

export default function MiniWorkflow() {
  const root = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".mw-edge", { strokeDashoffset: 480, opacity: 0 });
      gsap.set(".mw-node", { opacity: 0, y: 6, scale: 0.95, transformOrigin: "50% 50%" });
      gsap.set(".mw-tag", { opacity: 0, y: -2 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, delay: 0.15 });
      tl.to(".mw-node", { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.07 });
      tl.to(
        ".mw-edge",
        { strokeDashoffset: 0, opacity: 1, duration: 0.85, stagger: 0.06 },
        "-=0.45"
      );
      tl.to(".mw-tag", { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 }, "-=0.4");

      gsap.utils.toArray<SVGPathElement>(".mw-edge").forEach((path, i) => {
        const pkt = path.parentElement?.querySelector(`[data-mwpkt='${i}']`) as
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
          delay: 1.0 + i * 0.15,
          onUpdate: () => {
            const p = path.getPointAtLength(proxy.v * len);
            pkt.setAttribute("cx", String(p.x));
            pkt.setAttribute("cy", String(p.y));
          },
          onRepeat: () => {
            gsap.fromTo(pkt, { opacity: 0 }, { opacity: 1, duration: 0.2 });
          },
        });
        gsap.fromTo(pkt, { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 1.1 + i * 0.15 });
      });

      gsap.to(root.current, {
        y: -4,
        duration: 4.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={root}
      viewBox="0 0 850 340"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="mwEdge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0071E3" stopOpacity="0.18" />
          <stop offset="40%" stopColor="#0071E3" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0071E3" stopOpacity="0.95" />
        </linearGradient>
        <pattern id="mwBg" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.85" fill="rgba(29,29,31,0.10)" />
        </pattern>
        <radialGradient id="mwGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0071E3" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0071E3" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="850" height="340" fill="url(#mwBg)" opacity="0.55" />
      <ellipse cx="460" cy="170" rx="280" ry="160" fill="url(#mwGlow)" />

      {/* edges */}
      <g fill="none" stroke="url(#mwEdge)" strokeWidth="1.6">
        {edges.map((e, i) => {
          const a = nodes.find((n) => n.id === e.from)!;
          const b = nodes.find((n) => n.id === e.to)!;
          return (
            <g key={i}>
              <path
                d={nodePath(a, b)}
                className="mw-edge"
                strokeDasharray="480"
                strokeLinecap="round"
              />
              <circle data-mwpkt={i} className="mw-packet" r="4.5" fill="#0071E3" />
            </g>
          );
        })}
      </g>

      {/* nodes */}
      {nodes.map((n) => (
        <g key={n.id} className="mw-node" transform={`translate(${n.x}, ${n.y})`}>
          <rect
            x="0"
            y="0"
            rx="9"
            width={NODE_W}
            height={NODE_H}
            fill="#FFFFFF"
            stroke="rgba(29,29,31,0.12)"
          />
          <rect x="0" y="0" rx="9" width="3.5" height={NODE_H} fill={kindColor[n.kind]} />
          <circle cx={NODE_W - 12} cy={12} r="2.6" fill={kindColor[n.kind]} />
          <text x="14" y="22" fontSize="11.5" fontWeight="500" fill="#1D1D1F">
            {n.label}
          </text>
          <text x="14" y="38" fontSize="9.5" fill="rgba(29,29,31,0.55)">
            {n.sub}
          </text>
        </g>
      ))}

      {/* floating tags */}
      <g className="mw-tag">
        <g transform="translate(40, 90)">
          <rect rx="6" width="86" height="18" fill="#1D1D1F" />
          <text x="10" y="13" fontSize="9.5" fill="#FBFBFD" letterSpacing="0.5">
            TRIGGER · API
          </text>
        </g>
      </g>
      <g className="mw-tag">
        <g transform="translate(460, 95)">
          <rect rx="6" width="68" height="18" fill="#0071E3" />
          <text x="10" y="13" fontSize="9.5" fill="#FBFBFD" letterSpacing="0.5">
            AGENT · v3
          </text>
        </g>
      </g>
      <g className="mw-tag">
        <g transform="translate(670, 40)">
          <rect rx="6" width="56" height="18" fill="#0057B3" />
          <text x="10" y="13" fontSize="9.5" fill="#FBFBFD" letterSpacing="0.5">
            OUTPUT
          </text>
        </g>
      </g>
    </svg>
  );
}
