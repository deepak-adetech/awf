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
    body: "An honest, tested architecture: the data, the systems it touches, the agents we&apos;ll deploy, the human checkpoints, the failure modes.",
    deliverable: "Workflow blueprint + risk register",
    duration: "5 days",
  },
  {
    week: "Week 2–3",
    title: "Build",
    body: "We ship to staging in week 2, then run shadow-mode against your real inbox. We tune until the agent matches your top operator&apos;s judgment.",
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

export default function Process() {
  const root = useRef<HTMLElement | null>(null);
  const line = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw the spine
      if (line.current) {
        const len = line.current.getTotalLength();
        gsap.set(line.current, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(line.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".step").forEach((el) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".step-dot").forEach((el, i) => {
        gsap.from(el, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(2)",
          delay: 0.1 + i * 0.1,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={root as any} className="relative py-28 md:py-36">
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
          right="Most engagements look the same. We compress strategy into days, not quarters, because nothing teaches you faster than a working system. Sequenced, sized, and priced flat."
        />

        <div className="relative mt-20 grid lg:grid-cols-12 gap-10">
          {/* Spine svg */}
          <svg
            className="hidden lg:block absolute left-[7.4%] top-2 h-[calc(100%-1rem)] w-12 -translate-x-1/2"
            viewBox="0 0 40 800"
            preserveAspectRatio="none"
          >
            <path
              ref={line}
              d="M 20 0 L 20 800"
              stroke="#0071E3"
              strokeWidth="1.6"
              fill="none"
            />
          </svg>

          <div className="lg:col-span-12 space-y-10">
            {steps.map((s, i) => (
              <article
                key={i}
                className="step grid lg:grid-cols-12 gap-6 lg:gap-10 items-start"
              >
                <div className="lg:col-span-2 flex lg:flex-col items-baseline lg:items-start gap-3 lg:gap-1 relative">
                  <span className="step-dot relative inline-flex items-center justify-center h-6 w-6 rounded-full bg-canvas border border-ink/15 mono text-[10px] text-ink/60 lg:absolute lg:-left-3 lg:top-2">
                    {String(i + 1).padStart(2, "0")}
                    <span className="absolute inset-0 rounded-full bg-azure-500/10" />
                  </span>
                  <span className="mono text-[11px] uppercase tracking-[0.18em] text-ink/55 lg:mt-12">
                    {s.week}
                  </span>
                </div>
                <div className="lg:col-span-6">
                  <h3 className="display-tight text-[36px] md:text-[44px]">
                    {s.title}
                  </h3>
                  <p
                    className="mt-3 text-[15px] text-ink/65 leading-[1.6] max-w-[520px]"
                    dangerouslySetInnerHTML={{ __html: s.body }}
                  />
                </div>
                <div className="lg:col-span-4">
                  <div className="bp-card p-5">
                    <div className="eyebrow">Deliverable</div>
                    <div className="mt-2 text-[14.5px] text-ink/85">
                      {s.deliverable}
                    </div>
                    <div className="mt-4 pt-4 border-t border-ink/10 flex items-center justify-between mono text-[11px] text-ink/55">
                      <span>Duration</span>
                      <span className="text-ink/85">{s.duration}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
