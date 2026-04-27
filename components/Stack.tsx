"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "./Services";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const layers = [
  {
    title: "Models",
    items: ["GPT-4o / 4.7", "Claude Opus 4.7", "Gemini 2.5 Pro", "Open-source (Llama, Mistral)"],
  },
  {
    title: "Orchestration",
    items: ["Temporal", "LangGraph", "n8n / Zapier (where it makes sense)", "Custom Python services"],
  },
  {
    title: "Data + memory",
    items: ["Postgres + pgvector", "ClickHouse for telemetry", "Snowflake / BigQuery sinks", "Pinecone / Weaviate"],
  },
  {
    title: "Surfaces",
    items: ["Slack apps", "Linear / Jira", "HubSpot / Salesforce", "Custom internal tools (Retool, Next.js)"],
  },
  {
    title: "Observability",
    items: ["LangSmith", "OpenTelemetry", "Custom eval harness", "On-call rotation (PagerDuty)"],
  },
];

export default function Stack() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stack-row", {
        scrollTrigger: { trigger: root.current, start: "top 75%" },
        x: -40,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
      });
      gsap.from(".stack-pill", {
        scrollTrigger: { trigger: root.current, start: "top 70%" },
        opacity: 0,
        y: 8,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.025,
        delay: 0.2,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="stack" ref={root as any} className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[1320px] px-5">
        <SectionHeader
          tag="04 · The stack"
          title={
            <>
              Boring infrastructure,
              <br />
              <span className="text-ink/45">unboring outcomes.</span>
            </>
          }
          right="We default to your stack first, then reach for the right tool for the job. No platform lock-in, no proprietary runtime. Everything we build, you can read, fork, and own."
        />

        <div className="mt-14 bp-card overflow-hidden">
          {layers.map((l, i) => (
            <div
              key={l.title}
              className={`stack-row grid md:grid-cols-12 gap-6 px-7 md:px-9 py-7 ${
                i !== layers.length - 1 ? "border-b border-ink/10" : ""
              }`}
            >
              <div className="md:col-span-3 flex items-baseline gap-3">
                <span className="mono text-[11px] text-ink/40">L{i + 1}</span>
                <h4 className="display-tight text-[24px]">{l.title}</h4>
              </div>
              <div className="md:col-span-9 flex flex-wrap gap-2">
                {l.items.map((it) => (
                  <span
                    key={it}
                    className="stack-pill text-[12.5px] px-3.5 py-2 rounded-full border border-ink/10 hover:border-azure-500/40 hover:bg-azure-50/40 transition-colors mono"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[12.5px] text-ink/55">
          <div className="flex items-center gap-3">
            <span className="chip"><span className="chip-dot" /> SOC2 Type II in progress · Q3</span>
            <span className="chip"><span className="chip-dot" /> Self-hosted option available</span>
          </div>
          <a href="#contact" className="text-azure-600 hover:text-azure-700">
            Architecture Q&amp;A with our principal engineer →
          </a>
        </div>
      </div>
    </section>
  );
}
