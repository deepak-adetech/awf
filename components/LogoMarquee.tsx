"use client";

const logos = [
  "Northwind Ops",
  "Helio Capital",
  "Lattice Labs",
  "Forge & Co.",
  "Pacific AR",
  "Steelyard",
  "Aperture Studios",
  "Brookline Bio",
  "Verity Health",
  "Junction House",
  "Caldera Group",
  "Aspen Logistics",
];

export default function LogoMarquee() {
  return (
    <section className="relative py-14 border-y border-ink/10">
      <div className="mx-auto max-w-[1320px] px-5">
        <div className="flex items-center justify-between mb-7">
          <div className="eyebrow">In production at</div>
          <div className="mono text-[10.5px] text-ink/40">
            12 active engagements · 4 sectors
          </div>
        </div>
        <div className="overflow-hidden mask-edges">
          <div
            className="flex gap-14 marquee-track will-change-transform"
            style={{ width: "max-content" }}
          >
            {[...logos, ...logos].map((l, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-[18px] tracking-tight text-ink/70 hover:text-ink transition-colors"
              >
                <Mark />
                <span style={{ fontWeight: 400 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Mark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className="text-azure-500">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M7 13 L11 16 L17 9" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
