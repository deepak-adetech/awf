"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type Row = {
  ts: string;
  agent: string;
  msg: string;
  badge?: "ok" | "agent" | "human" | "warn";
};

const seedRows: Row[] = [
  { ts: "14:02:11", agent: "intake", msg: "412 emails routed · queue depth 0", badge: "ok" },
  { ts: "14:02:09", agent: "agent.v3", msg: "Drafted reply · invoice #INV-7724", badge: "agent" },
  { ts: "14:02:07", agent: "review", msg: "Flagged $42k claim → ops-2", badge: "human" },
  { ts: "14:02:04", agent: "extract", msg: "Parsed PO + tax docs · 4 fields", badge: "ok" },
  { ts: "14:02:01", agent: "classify", msg: "Tier-A · billing dispute", badge: "ok" },
  { ts: "14:01:58", agent: "intake", msg: "API webhook · zendesk.com/4221", badge: "ok" },
  { ts: "14:01:55", agent: "agent.v3", msg: "Auto-resolved refund · $182.40", badge: "agent" },
  { ts: "14:01:52", agent: "crm.sync", msg: "Hubspot updated · 14 records", badge: "ok" },
  { ts: "14:01:48", agent: "review", msg: "Confidence 0.71 → human lane", badge: "warn" },
  { ts: "14:01:45", agent: "agent.v3", msg: "Outbound: vendor verification email", badge: "agent" },
];

const badgeStyles: Record<NonNullable<Row["badge"]>, string> = {
  ok: "bg-azure-500/10 text-azure-700 border-azure-500/20",
  agent: "bg-azure-700/90 text-canvas border-azure-800",
  human: "bg-signal-amber/10 text-signal-amber border-signal-amber/30",
  warn: "bg-signal-rust/10 text-signal-rust border-signal-rust/30",
};

const badgeText: Record<NonNullable<Row["badge"]>, string> = {
  ok: "ok",
  agent: "agent",
  human: "human",
  warn: "low-conf",
};

export default function ActivityFeed() {
  const [rows, setRows] = useState<Row[]>(seedRows);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRows((prev) => {
        const pool = [
          { agent: "agent.v3", msg: "Auto-resolved · ticket #" + Math.floor(8000 + Math.random() * 999), badge: "agent" as const },
          { agent: "intake", msg: "Inbound · email · " + (Math.random() > 0.5 ? "ar@" : "ops@") + "client.com", badge: "ok" as const },
          { agent: "extract", msg: "Parsed " + Math.ceil(Math.random() * 6) + " fields from invoice", badge: "ok" as const },
          { agent: "review", msg: "Confidence " + (0.6 + Math.random() * 0.3).toFixed(2) + " → human lane", badge: "warn" as const },
          { agent: "crm.sync", msg: "Hubspot · " + Math.ceil(Math.random() * 22) + " records updated", badge: "ok" as const },
          { agent: "classify", msg: "Tier-" + (Math.random() > 0.5 ? "A" : "B") + " · billing", badge: "ok" as const },
          { agent: "agent.v3", msg: "Refund draft · $" + (10 + Math.random() * 280).toFixed(2), badge: "agent" as const },
        ];
        const pick = pool[Math.floor(Math.random() * pool.length)];
        const now = new Date();
        const pad = (n: number) => String(n).padStart(2, "0");
        const ts = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
        return [{ ts, ...pick }, ...prev].slice(0, 14);
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // animate rows in
  useEffect(() => {
    if (!ref.current) return;
    const first = ref.current.firstElementChild;
    if (!first) return;
    gsap.fromTo(
      first,
      { opacity: 0, y: -10, backgroundColor: "rgba(0,113,227,0.08)" },
      {
        opacity: 1,
        y: 0,
        backgroundColor: "rgba(0,113,227,0)",
        duration: 0.7,
        ease: "power2.out",
      }
    );
  }, [rows]);

  return (
    <div className="relative h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-ink/10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-azure-500 opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-azure-500" />
          </span>
          <span className="mono text-[10.5px] uppercase tracking-[0.16em] text-ink/60">
            live · ops feed
          </span>
        </div>
        <span className="mono text-[10px] text-ink/40">last 14 events</span>
      </div>
      <div
        ref={ref}
        className="px-2 py-1 text-[11.5px] mono divide-y divide-ink/[0.06] overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 70%, transparent 100%)",
        }}
      >
        {rows.slice(0, 9).map((r, i) => (
          <div
            key={r.ts + r.msg + i}
            className="flex items-center gap-3 px-2 py-2 leading-tight"
          >
            <span className="text-ink/40 w-[68px] shrink-0">{r.ts}</span>
            <span
              className={`shrink-0 px-1.5 py-0.5 rounded-md border text-[9.5px] uppercase tracking-wide ${
                badgeStyles[r.badge ?? "ok"]
              }`}
            >
              {badgeText[r.badge ?? "ok"]}
            </span>
            <span className="text-ink/55 w-[78px] shrink-0">{r.agent}</span>
            <span className="text-ink/85 truncate">{r.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
