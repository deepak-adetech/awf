"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "./Services";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const quotes = [
  {
    quote:
      "We&apos;d been burned twice by AI vendors before AutoWorkflows. The difference: they shipped a working pipeline in week three instead of a slide deck in month three.",
    name: "Maya Chen",
    role: "COO, Northwind Logistics",
  },
  {
    quote:
      "They sat with our AR team for two days, then rebuilt the entire collections workflow. We didn&apos;t replace the team — we promoted them.",
    name: "Daniel Okafor",
    role: "VP Finance, Pacific Group",
  },
  {
    quote:
      "Our internal copilot answers the questions our new hires used to ping the founders about. Onboarding time dropped by half.",
    name: "Sophie Lemaire",
    role: "Head of Operations, Helio Capital",
  },
  {
    quote:
      "Engineering-grade work, ops-grade pragmatism. Rare combination. They wrote tests we&apos;ll be running in five years.",
    name: "Jordan Pace",
    role: "CTO, Brookline Bio",
  },
];

export default function Testimonials() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".q-card", {
        scrollTrigger: { trigger: root.current, start: "top 75%" },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.08,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root as any} className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1320px] px-5">
        <SectionHeader
          tag="05 · The honest part"
          title={
            <>
              What our clients
              <br />
              <span className="text-ink/45">say when we&apos;re not in the room.</span>
            </>
          }
          right="We collect these quarterly. The not-so-great ones, we publish in our retro write-ups."
        />

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {quotes.map((q, i) => (
            <figure
              key={i}
              className="q-card bp-card p-7 md:p-9 relative flex flex-col"
            >
              <span className="mono text-[10.5px] text-ink/40 mb-4">
                /{String(i + 1).padStart(2, "0")} · CLIENT QUOTE
              </span>
              <blockquote
                className="text-[19px] md:text-[21px] leading-[1.45] text-ink"
                style={{ fontWeight: 350, letterSpacing: "-0.012em" }}
                dangerouslySetInnerHTML={{ __html: `&ldquo;${q.quote}&rdquo;` }}
              />
              <figcaption className="mt-6 pt-5 border-t border-ink/10 flex items-center gap-3">
                <Avatar seed={q.name} />
                <div className="leading-tight">
                  <div className="text-[13.5px]">{q.name}</div>
                  <div className="text-[12px] text-ink/55">{q.role}</div>
                </div>
                <span className="ml-auto mono text-[10.5px] text-ink/40">
                  Verified · 2025
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Avatar({ seed }: { seed: string }) {
  const initials = seed
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");
  const hue = (seed.charCodeAt(0) * 13) % 360;
  return (
    <span
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-medium text-canvas"
      style={{ background: `hsl(${hue} 30% 28%)` }}
    >
      {initials}
    </span>
  );
}
