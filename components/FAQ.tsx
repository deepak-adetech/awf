"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";
import { SectionHeader } from "./Services";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "How is this different from hiring an in-house ML team?",
    a: "We're not trying to replace one. We ship the first three workflows fast, hand them over, and either keep operating as a partner or step away cleanly. Most clients keep us as on-call infrastructure.",
  },
  {
    q: "What does a typical engagement cost?",
    a: "Flat fee, scoped per workflow. The audit is $4,800 and credited to the first build. Builds typically run $30k–$85k depending on systems integration. Operate is monthly, sized to volume.",
  },
  {
    q: "We've been burned by an AI vendor before. How is this different?",
    a: "Three commitments: (1) we ship working software in week 3, not a deck; (2) we tie billing to operational metrics, not seat licenses; (3) every line of code is yours, in your repos, on your infra.",
  },
  {
    q: "What about data residency and security?",
    a: "We default to your cloud, your VPC, your keys. We don't train on your data and don't let our model providers either. Self-hosted models are an option for regulated workloads.",
  },
  {
    q: "Will the agents hallucinate?",
    a: "Yes, sometimes. That's why we use deterministic guardrails for anything that touches money or compliance, plus a human-review lane for low-confidence outputs. We publish accuracy weekly.",
  },
  {
    q: "Can you work with non-engineers?",
    a: "That's mostly who hires us. Ops leaders, COOs, founders. We translate between your team and our engineers — no AI jargon required.",
  },
];

export default function FAQ() {
  const root = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-row", {
        scrollTrigger: { trigger: root.current, start: "top 78%" },
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.05,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="field-notes" ref={root as any} className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[1320px] px-5">
        <SectionHeader
          tag="06 · Field notes"
          title={
            <>
              Questions we get
              <br />
              <span className="text-ink/45">from skeptical buyers.</span>
            </>
          }
          right="We track these in a shared doc. If your question isn't here, ping us and it probably will be by Friday."
        />

        <div className="mt-14 max-w-[920px] divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="faq-row">
                <button
                  className="w-full text-left flex items-center justify-between py-6 group"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="flex items-baseline gap-5">
                    <span className="mono text-[11px] text-ink/40 w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display-tight text-[20px] md:text-[24px] group-hover:text-azure-600 transition-colors">
                      {f.q}
                    </span>
                  </span>
                  <span className="ml-6 inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink/55 group-hover:border-azure-500/50 group-hover:text-azure-600 transition-colors">
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-[max-height,opacity] duration-500 ease-out"
                  style={{
                    maxHeight: isOpen ? 200 : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p
                    className="pl-14 pr-12 pb-6 text-[15px] text-ink/65 leading-[1.65] max-w-[760px]"
                    dangerouslySetInnerHTML={{ __html: f.a }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
