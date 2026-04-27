"use client";

/**
 * Client logo strip. Each brand is rendered as a monochrome inline SVG
 * that picks up `currentColor`, so the whole strip tints uniformly with
 * the marquee's text color and brightens on hover.
 */

const Apple = () => (
  <svg viewBox="0 0 22 26" height="28" fill="currentColor" aria-label="Apple">
    <path d="M16.5 13.6c0-2.7 2.2-4 2.3-4-1.2-1.8-3.2-2-3.9-2.1-1.6-.2-3.2.9-4.1.9-.9 0-2.2-.9-3.6-.9-1.8 0-3.6 1.1-4.5 2.7-2 3.4-.5 8.4 1.4 11.2.9 1.3 2 2.8 3.5 2.8 1.4 0 1.9-.9 3.6-.9 1.7 0 2.2.9 3.6.9 1.5 0 2.5-1.4 3.4-2.7.6-.9 1.2-1.8 1.5-2.8-3.3-1.3-3.2-4.7-3.2-5.1zm-3-9.4c.7-.9 1.2-2.1 1.1-3.3-1 .1-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.2 1.1.1 2.3-.6 3-1.5z" />
  </svg>
);

const Amazon = () => (
  <svg viewBox="0 0 96 32" height="26" fill="currentColor" aria-label="Amazon">
    <text
      x="0"
      y="20"
      fontSize="22"
      fontWeight="700"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      letterSpacing="-0.02em"
    >
      amazon
    </text>
    <path
      d="M3 26 C 30 33, 65 33, 88 25"
      stroke="currentColor"
      strokeWidth="2.2"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M82 22 L89 25 L84 30"
      stroke="currentColor"
      strokeWidth="2.2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Microsoft = () => (
  <svg viewBox="0 0 130 28" height="24" fill="currentColor" aria-label="Microsoft">
    <rect x="0" y="2" width="11" height="11" />
    <rect x="13" y="2" width="11" height="11" />
    <rect x="0" y="15" width="11" height="11" />
    <rect x="13" y="15" width="11" height="11" />
    <text
      x="32"
      y="20"
      fontSize="18"
      fontWeight="500"
      fontFamily="'Segoe UI', system-ui, sans-serif"
      letterSpacing="-0.01em"
    >
      Microsoft
    </text>
  </svg>
);

const Mahindra = () => (
  <svg viewBox="0 0 110 28" height="24" fill="currentColor" aria-label="Mahindra">
    <path
      d="M3 22 L3 6 L9 6 L13 16 L17 6 L23 6 L23 22 L19 22 L19 11 L15 22 L11 22 L7 11 L7 22 Z"
      fill="currentColor"
    />
    <text
      x="28"
      y="20"
      fontSize="18"
      fontWeight="700"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      letterSpacing="0.02em"
    >
      MAHINDRA
    </text>
  </svg>
);

const JohnsonJohnson = () => (
  <svg viewBox="0 0 200 28" height="22" fill="currentColor" aria-label="Johnson & Johnson">
    <text
      x="0"
      y="22"
      fontSize="22"
      fontStyle="italic"
      fontWeight="400"
      fontFamily="'Times New Roman', Georgia, serif"
      letterSpacing="-0.01em"
    >
      Johnson &amp; Johnson
    </text>
  </svg>
);

const TrendMicro = () => (
  <svg viewBox="0 0 130 28" height="22" fill="currentColor" aria-label="Trend Micro">
    <circle cx="11" cy="14" r="11" fill="currentColor" />
    <path
      d="M5 11 L17 11 M11 11 L11 19"
      stroke="white"
      strokeWidth="2.4"
      strokeLinecap="round"
      style={{ mixBlendMode: "destination-out" } as any}
    />
    <text
      x="28"
      y="20"
      fontSize="16"
      fontWeight="700"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      letterSpacing="0.04em"
    >
      TREND MICRO
    </text>
  </svg>
);

const IBM = () => (
  <svg viewBox="0 0 56 28" height="22" aria-label="IBM">
    <defs>
      <pattern id="ibmStripes" width="2" height="3" patternUnits="userSpaceOnUse">
        <rect width="2" height="2" fill="currentColor" />
      </pattern>
      <mask id="ibmMask">
        <rect width="56" height="28" fill="black" />
        <text
          x="0"
          y="22"
          fontSize="22"
          fontWeight="900"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fill="white"
          letterSpacing="-0.04em"
        >
          IBM
        </text>
      </mask>
    </defs>
    <rect width="56" height="28" fill="url(#ibmStripes)" mask="url(#ibmMask)" />
  </svg>
);

const Cisco = () => (
  <svg viewBox="0 0 90 28" height="22" fill="currentColor" aria-label="Cisco">
    {[0, 4, 8, 12, 16].map((x, i) => {
      const h = i === 2 ? 22 : i === 1 || i === 3 ? 16 : 10;
      return <rect key={i} x={x} y={(28 - h) / 2} width="2" height={h} rx="1" />;
    })}
    <text
      x="26"
      y="20"
      fontSize="18"
      fontWeight="500"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      letterSpacing="0.02em"
    >
      CISCO
    </text>
  </svg>
);

const Oracle = () => (
  <svg viewBox="0 0 100 28" height="22" fill="currentColor" aria-label="Oracle">
    <ellipse cx="50" cy="14" rx="48" ry="11" stroke="currentColor" strokeWidth="2.2" fill="none" />
    <text
      x="50"
      y="20"
      fontSize="14"
      fontWeight="700"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      textAnchor="middle"
      letterSpacing="0.18em"
    >
      ORACLE
    </text>
  </svg>
);

const Accenture = () => (
  <svg viewBox="0 0 130 28" height="22" fill="currentColor" aria-label="Accenture">
    <text
      x="0"
      y="22"
      fontSize="20"
      fontWeight="500"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      letterSpacing="-0.02em"
    >
      accenture
    </text>
    <path d="M88 4 L94 8 L88 12" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Deloitte = () => (
  <svg viewBox="0 0 110 28" height="22" fill="currentColor" aria-label="Deloitte">
    <text
      x="0"
      y="22"
      fontSize="22"
      fontWeight="600"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      letterSpacing="-0.02em"
    >
      Deloitte
    </text>
    <circle cx="100" cy="20" r="3" fill="currentColor" />
  </svg>
);

const HSBC = () => (
  <svg viewBox="0 0 90 28" height="22" fill="currentColor" aria-label="HSBC">
    <polygon
      points="6,4 14,4 18,14 14,24 6,24 2,14"
      fill="currentColor"
    />
    <text
      x="26"
      y="22"
      fontSize="20"
      fontWeight="700"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      letterSpacing="0.04em"
    >
      HSBC
    </text>
  </svg>
);

const logos = [
  { name: "Apple", Logo: Apple },
  { name: "Amazon", Logo: Amazon },
  { name: "Microsoft", Logo: Microsoft },
  { name: "Mahindra", Logo: Mahindra },
  { name: "Johnson & Johnson", Logo: JohnsonJohnson },
  { name: "Trend Micro", Logo: TrendMicro },
  { name: "IBM", Logo: IBM },
  { name: "Cisco", Logo: Cisco },
  { name: "Oracle", Logo: Oracle },
  { name: "Accenture", Logo: Accenture },
  { name: "Deloitte", Logo: Deloitte },
  { name: "HSBC", Logo: HSBC },
];

export default function LogoMarquee() {
  return (
    <section className="relative py-14 border-y border-ink/10">
      <div className="mx-auto max-w-[1320px] px-5">
        <div className="flex items-center justify-between mb-7">
          <div className="eyebrow">In production at</div>
          <div className="mono text-[10.5px] text-ink/40">
            {logos.length} active engagements · 4 sectors
          </div>
        </div>
        <div className="overflow-hidden mask-edges">
          <div
            className="flex items-center gap-16 marquee-track will-change-transform"
            style={{ width: "max-content" }}
          >
            {[...logos, ...logos].map(({ name, Logo }, i) => (
              <div
                key={i}
                title={name}
                className="flex items-center text-ink/55 hover:text-ink transition-colors h-8 shrink-0"
              >
                <Logo />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
