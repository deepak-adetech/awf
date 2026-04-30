"use client";

import { useState } from "react";
import Image from "next/image";

const agents = [
  {
    name: "Cassie",
    role: "(Female AI Agent)",
    image: "/callers/try-it/cassie.webp",
    bg: "bg-[#FFE6F0]",
  },
  {
    name: "Paul",
    role: "(Male AI Agent)",
    image: "/callers/try-it/paul.webp",
    bg: "bg-[#E5EAFF]",
  },
];

export function TryItSection() {
  return (
    <section className="dynamic-section-padding">
      <div className="container-callers">
        <h2 className="text-center text-[32px] leading-[1.05] font-medium tracking-[-0.04em] text-foreground md:text-[44px] lg:text-[60px] lg:tracking-[-0.06em]">
          C&apos;mon, make that call!
        </h2>
        <p className="mt-4 text-center text-base lg:text-lg text-[#1E1E1E]/70">
          Try CometLab and meet Paul or Cassie.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-[1000px] mx-auto">
          {agents.map((a) => (
            <AgentCard key={a.name} agent={a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AgentCard({ agent }: { agent: (typeof agents)[number] }) {
  const [number, setNumber] = useState("");
  return (
    <article className={`relative overflow-hidden rounded-[28px] border border-gray-100 ${agent.bg} p-7 lg:p-9`}>
      <div className="grid grid-cols-[1fr_140px] gap-6 items-start">
        <div>
          <h3 className="text-[28px] lg:text-[34px] font-medium tracking-[-0.02em] text-[#1E1E1E]">{agent.name}</h3>
          <p className="text-sm text-[#1E1E1E]/60">{agent.role}</p>

          <form onSubmit={(e) => e.preventDefault()} className="mt-5 flex flex-col gap-3">
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base font-medium text-[#1E1E1E]/70">
                +91
              </span>
              <input
                type="tel"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="81234 56789"
                className="h-[52px] w-full rounded-xl border border-white/50 bg-white pl-[57px] pr-4 text-base font-medium text-[#1E1E1E] placeholder:text-[#1E1E1E]/30 focus:border-[#7C3AED] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="h-[52px] rounded-xl bg-[#1E1E1E] text-base font-medium text-white hover:bg-[#1E1E1E]/90"
            >
              Try Now
            </button>
          </form>
        </div>
        <div className="relative h-[180px] md:h-[200px] lg:h-[260px]">
          <Image
            src={agent.image}
            alt={agent.name}
            fill
            className="object-contain object-bottom"
            sizes="140px"
          />
        </div>
      </div>
    </article>
  );
}
