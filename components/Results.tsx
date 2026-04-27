"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "./Services";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    industry: "B2B Healthcare SaaS",
    headline: "Replaced a 6-person triage queue with a single workflow.",
    body: "We rebuilt the inbound support pipeline with a classifier, an extraction agent, and a fallback to a 1-person reviewer. The team didn&apos;t shrink — they moved upmarket.",
    kpis: [
      { v: "82%", k: "auto-resolved tickets" },
      { v: "26s", k: "median first response" },
      { v: "4.7", k: "CSAT (was 3.9)" },
    ],
    tag: "Operations",
  },
  {
    industry: "Mid-market Logistics",
    headline: "Cleared a $4.1M AR backlog in 9 weeks.",
    body: "AR collections used to mean 3 spreadsheets and a phone. We built a workflow that drafts, sends, follows up, and escalates — with a Slack approve/reject for anything > $25k.",
    kpis: [
      { v: "$4.1M", k: "collected in Q1" },
      { v: "−71%", k: "DSO improvement" },
      { v: "12hrs", k: "weekly ops time saved" },
    ],
    tag: "Finance",
  },
  {
    industry: "Specialty Manufacturing",
    headline: "Vendor onboarding from 11 days to 28 minutes.",
    body: "We parsed contracts, validated tax + insurance docs, ran KYC against three sources, and pre-filled the ERP. Humans only saw exceptions.",
    kpis: [
      { v: "28m", k: "median onboarding" },
      { v: "0", k: "compliance escapes" },
      { v: "94%", k: "no-touch rate" },
    ],
    tag: "Back-office",
  },
];

export default function Results() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".case-card").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
          delay: i * 0.05,
        });

        // count up on KPIs
        const kpis = el.querySelectorAll<HTMLElement>("[data-count]");
        kpis.forEach((k) => {
          const target = k.getAttribute("data-count")!;
          const num = parseFloat(target.replace(/[^0-9.\-]/g, ""));
          if (Number.isNaN(num)) return;
          const prefix = target.match(/^[^0-9\-]*/)?.[0] ?? "";
          const suffix = target.match(/[^0-9.\-]*$/)?.[0] ?? "";
          const obj = { n: 0 };
          gsap.to(obj, {
            n: num,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 75%" },
            onUpdate: () => {
              const v = num % 1 === 0 ? Math.round(obj.n) : obj.n.toFixed(1);
              k.textContent = `${prefix}${v}${suffix}`;
            },
          });
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="results" ref={root as any} className="relative py-28 md:py-36 bg-canvas-warm/30">
      <div className="mx-auto max-w-[1320px] px-5">
        <SectionHeader
          tag="03 · Results in production"
          title={
            <>
              Receipts beat slides.
              <br />
              <span className="text-ink/45">A few we&apos;re cleared to share.</span>
            </>
          }
          right="We work under NDAs, but with permission, here's what shipped. Every metric below is from production telemetry, not anecdote."
        />

        <div className="mt-16 space-y-6">
          {cases.map((c, i) => (
            <article
              key={i}
              className="case-card grid lg:grid-cols-12 gap-6 lg:gap-10 bp-card p-7 md:p-10 relative"
            >
              <span className="absolute top-5 right-5 chip"><span className="chip-dot" /> {c.tag}</span>
              <div className="lg:col-span-7">
                <div className="eyebrow">{c.industry} · Case {String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-3 display-tight text-[28px] md:text-[36px] max-w-[560px]">
                  {c.headline}
                </h3>
                <p
                  className="mt-4 text-[15px] text-ink/65 leading-[1.6] max-w-[560px]"
                  dangerouslySetInnerHTML={{ __html: c.body }}
                />
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1 text-[13.5px] text-azure-600 hover:text-azure-700"
                >
                  Read the engineering write-up →
                </a>
              </div>
              <div className="lg:col-span-5 grid grid-cols-3 gap-3">
                {c.kpis.map((k) => (
                  <div key={k.k} className="border-l border-ink/10 pl-4">
                    <div
                      data-count={k.v}
                      className="display-tight text-[28px] md:text-[36px] text-azure-600"
                    >
                      {k.v}
                    </div>
                    <div className="mt-1 text-[11.5px] text-ink/55 leading-snug">
                      {k.k}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
