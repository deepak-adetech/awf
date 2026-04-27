"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type Series = number[];

function makeSeries(seed: number, len = 30): Series {
  const out: number[] = [];
  let v = 0.4 + ((seed * 13) % 30) / 100;
  for (let i = 0; i < len; i++) {
    v += (Math.sin(i * 0.4 + seed) + (Math.random() - 0.5) * 0.4) * 0.05;
    v = Math.max(0.1, Math.min(0.95, v));
    out.push(v);
  }
  return out;
}

function pathFrom(series: Series, w: number, h: number) {
  const step = w / (series.length - 1);
  return series
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - v * h}`)
    .join(" ");
}

export default function MetricsPanel() {
  const [s1, setS1] = useState<Series>(() => makeSeries(2));
  const [s2, setS2] = useState<Series>(() => makeSeries(7));
  const [resolved, setResolved] = useState(412);
  const [latency, setLatency] = useState(26);
  const [autoRate, setAutoRate] = useState(82);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setS1((p) => [...p.slice(1), Math.max(0.15, Math.min(0.95, p[p.length - 1] + (Math.random() - 0.45) * 0.1))]);
      setS2((p) => [...p.slice(1), Math.max(0.1, Math.min(0.85, p[p.length - 1] + (Math.random() - 0.55) * 0.08))]);
      setResolved((n) => n + Math.floor(Math.random() * 3));
      setLatency((n) => Math.max(18, Math.min(38, Math.round((n + (Math.random() - 0.5) * 4) * 10) / 10)));
      setAutoRate((n) => Math.max(74, Math.min(89, Math.round((n + (Math.random() - 0.5) * 1.6) * 10) / 10)));
    }, 1100);
    return () => clearInterval(id);
  }, []);

  // Pulse the latest tick of the chart
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current.querySelectorAll(".pulse-end"),
      { scale: 1.6, opacity: 0.8 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out", transformOrigin: "center" }
    );
  }, [s1, s2]);

  const W = 220;
  const H = 70;

  return (
    <div ref={ref} className="h-full p-4 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="mono text-[10.5px] uppercase tracking-[0.16em] text-ink/60">
          live · metrics
        </span>
        <span className="mono text-[10px] text-ink/40">/ 24h window</span>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-3 items-end">
        <Stat
          label="auto-resolve"
          value={`${autoRate.toFixed(1)}%`}
          delta="+1.4"
          deltaTone="ok"
        />
        <Stat
          label="median latency"
          value={`${latency.toFixed(1)}s`}
          delta="-0.8"
          deltaTone="ok"
        />
        <Stat
          label="resolved · today"
          value={String(resolved)}
          delta="+12"
          deltaTone="ok"
        />
      </div>

      <div className="mt-4 relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[80px]">
          <defs>
            <linearGradient id="metGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0D6B4E" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0D6B4E" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* baseline */}
          <line x1="0" y1={H - 8} x2={W} y2={H - 8} stroke="rgba(14,20,17,0.10)" strokeDasharray="2 4" />
          <path
            d={`${pathFrom(s1, W, H)} L ${W} ${H} L 0 ${H} Z`}
            fill="url(#metGrad)"
            opacity="0.85"
          />
          <path d={pathFrom(s1, W, H)} stroke="#0D6B4E" strokeWidth="1.6" fill="none" />
          <path d={pathFrom(s2, W, H)} stroke="rgba(14,20,17,0.45)" strokeWidth="1.1" fill="none" strokeDasharray="3 3" />
          <circle
            className="pulse-end"
            cx={W}
            cy={H - s1[s1.length - 1] * H}
            r="3"
            fill="#0D6B4E"
          />
        </svg>
      </div>

      <div className="mt-2 flex items-center gap-3 mono text-[10px] text-ink/45">
        <span className="flex items-center gap-1.5">
          <span className="h-px w-3 bg-forge-500" /> resolved
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-px w-3 bg-ink/40" style={{ borderTop: "1px dashed" }} /> queued
        </span>
        <span className="ml-auto">refresh · 1.1s</span>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  delta,
  deltaTone,
}: {
  label: string;
  value: string;
  delta: string;
  deltaTone: "ok" | "bad";
}) {
  return (
    <div>
      <div className="mono text-[10px] text-ink/50 uppercase tracking-wide">{label}</div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="display-tight text-[22px]">{value}</span>
        <span
          className={`mono text-[10.5px] ${
            deltaTone === "ok" ? "text-forge-600" : "text-signal-rust"
          }`}
        >
          {delta}
        </span>
      </div>
    </div>
  );
}
