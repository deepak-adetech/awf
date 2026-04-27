"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    code: "01",
    title: "Operations workflows",
    body: "Replace the inbox, the spreadsheet, and the swivel-chair work between them. Inbound triage, document parsing, status routing, daily reconciliations.",
    bullets: ["Inbox + ticket triage", "Document → CRM extraction", "Daily reconciliations"],
    accent: "forge",
  },
  {
    code: "02",
    title: "Revenue agents",
    body: "Lead enrichment that adds context (not noise), outbound that respects timing, and CRM hygiene that doesn't decay overnight.",
    bullets: ["Lead enrichment + scoring", "Outbound concierge agents", "CRM data hygiene"],
    accent: "forge",
  },
  {
    code: "03",
    title: "Finance & back-office",
    body: "AP/AR, vendor onboarding, invoice matching. We pair LLMs with deterministic rules so the numbers tie.",
    bullets: ["AP / AR automation", "Vendor onboarding", "Invoice ↔ PO matching"],
    accent: "forge",
  },
  {
    code: "04",
    title: "Internal copilots",
    body: "A search bar over your ops — SOPs, contracts, customer history — wired to the systems your team already uses.",
    bullets: ["Knowledge copilots", "SOP-aware agents", "Slack-native interfaces"],
    accent: "forge",
  },
];

export default function Services() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".svc-card", {
        scrollTrigger: { trigger: root.current, start: "top 75%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.08,
      });

      gsap.from(".svc-num", {
        scrollTrigger: { trigger: root.current, start: "top 78%" },
        x: -10,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.05,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={root as any} className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1320px] px-5">
        <SectionHeader
          tag="01 · What we build"
          title={
            <>
              Four shapes of work.
              <br />
              <span className="text-ink/45">All deployed, all measurable.</span>
            </>
          }
          right="We don't do AI strategy decks. Every engagement ships software that runs in production within 30 days, with explicit metrics tied to operations cost or response time."
        />

        <div className="mt-16 grid md:grid-cols-2 gap-px bg-ink/10 rounded-2xl overflow-hidden border border-ink/10">
          {services.map((s, i) => (
            <article
              key={s.code}
              className="svc-card group relative bg-canvas p-7 md:p-9 min-h-[300px] flex flex-col justify-between transition-colors hover:bg-canvas-warm"
            >
              <div className="flex items-start justify-between">
                <span className="svc-num mono text-[11px] text-ink/40">
                  /{s.code}
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-ink/30 group-hover:text-forge-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
                />
              </div>

              <div>
                <h3 className="display-tight text-[34px] md:text-[40px] mt-12">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14.5px] text-ink/65 max-w-[460px] leading-relaxed">
                  {s.body}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="text-[12px] px-3 py-1.5 rounded-full border border-ink/10 text-ink/70 mono"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* corner connector hint */}
              <span className="absolute right-4 bottom-4 mono text-[10px] text-ink/30">
                ENGAGEMENT · {String(i + 1).padStart(2, "0")} of 04
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  tag,
  title,
  right,
}: {
  tag: string;
  title: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-12 gap-10 items-end">
      <div className="lg:col-span-7">
        <div className="eyebrow flex items-center gap-3">
          <span className="h-px w-8 bg-ink/30" />
          {tag}
        </div>
        <h2 className="mt-5 display text-[44px] md:text-[64px] leading-[1]">
          {title}
        </h2>
      </div>
      {right && (
        <div className="lg:col-span-5">
          <p className="text-[15px] text-ink/65 leading-[1.6] max-w-[460px]">
            {right}
          </p>
        </div>
      )}
    </div>
  );
}
