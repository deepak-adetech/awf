import Image from "next/image";

// LEFT column — pre-call: integration logos with one chip among them
const preCallItems: Array<
  | { kind: "logo"; src: string; alt: string }
  | { kind: "chip"; label: string; iconSrc: string; tone: "blue" }
> = [
  { kind: "logo", src: "/callers/integrations/intercom.webp", alt: "Intercom" },
  { kind: "logo", src: "/callers/integrations/salesforce.svg", alt: "Salesforce" },
  { kind: "logo", src: "/callers/integrations/stripe.svg", alt: "Stripe" },
  { kind: "chip", label: "New Subscription", iconSrc: "/callers/integrations/stripe.svg", tone: "blue" },
  { kind: "logo", src: "/callers/integrations/google.svg", alt: "Google" },
  { kind: "logo", src: "/callers/integrations/shopify.svg", alt: "Shopify" },
];

const midCallActions = [
  { iconSrc: "/callers/integrations/google.svg", label: "Get Fulfillment Status", iconBg: "bg-[#22C55E]" },
  { iconSrc: "/callers/integrations/business.svg", label: "Run Query Status", iconBg: "bg-[#3B82F6]" },
  { iconSrc: "/callers/integrations/cal-com.svg", label: "Schedule a Call", iconBg: "bg-[#1E1E1E]" },
];

const analyseFields = [
  { label: "Source" },
  { label: "Sentiment" },
  { label: "Product Interest Captured", highlight: true },
  { label: "Company" },
  { label: "Key Concern" },
];

const postCallItems: Array<
  | { kind: "logo"; src: string; alt: string }
  | { kind: "chip"; label: string; iconSrc: string; tone: "green" }
> = [
  { kind: "logo", src: "/callers/integrations/intercom.webp", alt: "Intercom" },
  { kind: "logo", src: "/callers/integrations/telegram.svg", alt: "Telegram" },
  { kind: "logo", src: "/callers/integrations/hubspot.svg", alt: "HubSpot" },
  { kind: "logo", src: "/callers/integrations/whatsapp.svg", alt: "WhatsApp" },
  { kind: "logo", src: "/callers/integrations/intercom.webp", alt: "Mailchimp" },
  { kind: "chip", label: "Update Row", iconSrc: "/callers/integrations/excel.svg", tone: "green" },
];

export function HowItWorksSection() {
  return (
    <section className="dynamic-section-padding bg-[#F9F8F8] overflow-hidden">
      <div className="mx-auto max-w-[1266px] px-6">
        <div className="flex items-center justify-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-[#1E1E1E]">
            <Image src="/callers/section-icons/flow-horizontal.svg" alt="" width={16} height={16} className="size-4" />
            How It Works?
          </span>
        </div>
        <h2 className="text-center text-[32px] leading-[1.2] font-medium tracking-[-0.06em] text-[#1E1E1E] md:text-[60px]">
          Turn every signal into action
        </h2>

        {/* Visualization area */}
        <div className="relative mt-12 lg:mt-16 mx-auto w-full max-w-[1200px] hidden md:block">
          {/* Curved connecting lines */}
          <FlowLines />

          {/* Top: Brain hub centered */}
          <div className="relative z-[5] flex justify-center mb-8 lg:mb-12">
            <div
              className="rounded-[28px] bg-[#F4D8FF] p-5 shadow-[0_18px_50px_rgba(124,58,237,0.18)] flex items-center justify-center size-[110px] lg:size-[130px]"
              style={{ animation: "comet-pulse 2.4s ease-in-out infinite" }}
            >
              <BrandHubMark />
            </div>
          </div>

          {/* 4-column layout */}
          <div className="relative z-[3] grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* LEFT — Pre-Call Triggers */}
            <div className="flex flex-col gap-3">
              <Pill label="Pre-Call Triggers" tone="orange" iconColor="#F59E0B" className="self-start" />
              <div className="space-y-3 mt-3">
                {preCallItems.map((it, i) =>
                  it.kind === "logo" ? (
                    <LogoCircle key={i} src={it.src} alt={it.alt} index={i} />
                  ) : (
                    <ItemChip key={i} iconSrc={it.iconSrc} label={it.label} tone={it.tone} />
                  )
                )}
              </div>
            </div>

            {/* MID — Call/Text card + Mid-Call Actions */}
            <div className="flex flex-col gap-4">
              <CallTextCard />
              <Pill label="Mid-Call Actions" tone="purple" iconColor="#A855F7" className="self-center" />
              <div className="space-y-3">
                {midCallActions.map((a, i) => (
                  <ActionChip key={i} {...a} />
                ))}
              </div>
            </div>

            {/* ANALYSE & LABEL */}
            <div>
              <AnalyseCard />
            </div>

            {/* RIGHT — Post-Call Actions */}
            <div className="flex flex-col gap-3 items-end">
              <Pill label="Post-Call Actions" tone="green" iconColor="#10B981" className="self-end" />
              <div className="space-y-3 mt-3 w-full">
                {postCallItems.map((it, i) =>
                  it.kind === "logo" ? (
                    <LogoCircle key={i} src={it.src} alt={it.alt} align="right" index={i + 10} />
                  ) : (
                    <ItemChip key={i} iconSrc={it.iconSrc} label={it.label} tone={it.tone} />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({ label, tone, iconColor, className = "" }: { label: string; tone: "orange" | "purple" | "green"; iconColor: string; className?: string }) {
  const palette = {
    orange: { bg: "#FFF1E0", text: "#B45309", border: "#FDE2C2" },
    purple: { bg: "#F3E8FF", text: "#7E22CE", border: "#E9D5FF" },
    green: { bg: "#DCFCE7", text: "#15803D", border: "#BBF7D0" },
  }[tone];
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold whitespace-nowrap ${className}`}
      style={{ background: palette.bg, color: palette.text, borderColor: palette.border }}
    >
      <span className="size-1.5 rounded-full" style={{ background: iconColor }} aria-hidden />
      {label}
    </div>
  );
}

function LogoCircle({ src, alt, align = "left", index = 0 }: { src: string; alt: string; align?: "left" | "right"; index?: number }) {
  // Deterministic varied durations so SSR and CSR match
  const duration = (3 + ((index * 37) % 100) / 50).toFixed(2);
  return (
    <div className={align === "right" ? "flex justify-end" : ""}>
      <div
        className="size-9 lg:size-10 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden"
        style={{ animation: `comet-bob ${duration}s ease-in-out infinite alternate` }}
      >
        <Image src={src} alt={alt} width={20} height={20} className="size-5 object-contain" />
      </div>
    </div>
  );
}

function ItemChip({ iconSrc, label, tone }: { iconSrc: string; label: string; tone: "blue" | "green" }) {
  const ring = tone === "blue" ? "ring-1 ring-[#7C3AED]/15" : "ring-1 ring-[#10B981]/20";
  return (
    <div className={`flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm ${ring}`}>
      <span className="flex size-6 items-center justify-center rounded-md overflow-hidden bg-gray-50">
        <Image src={iconSrc} alt="" width={16} height={16} className="size-4 object-contain" />
      </span>
      <span className="text-xs font-medium text-[#1E1E1E] whitespace-nowrap">{label}</span>
    </div>
  );
}

function ActionChip({ iconSrc, label, iconBg }: { iconSrc: string; label: string; iconBg: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm">
      <span className={`flex size-6 items-center justify-center rounded-md overflow-hidden ${iconBg}`}>
        <Image src={iconSrc} alt="" width={14} height={14} className="size-3.5 object-contain brightness-0 invert" />
      </span>
      <span className="text-xs font-medium text-[#1E1E1E] whitespace-nowrap">{label}</span>
    </div>
  );
}

function CallTextCard() {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-md p-3 lg:p-4">
      <div className="flex gap-1.5 mb-3">
        <span className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-gray-100 py-1.5 text-xs font-semibold text-[#1E1E1E]">
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none">
            <path d="M3 5.5C3 14 10 21 18.5 21V18l-3-1-2 2c-2-1-4-3-5-5l2-2-1-3H6V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Call
        </span>
        <span className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-white border border-gray-100 py-1.5 text-xs font-medium text-[#1E1E1E]/60">
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none">
            <path d="M3 5h18v12H7l-4 4V5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Text
        </span>
      </div>
      {/* Tiny mockup grid */}
      <div className="rounded-lg border border-gray-100 bg-gray-50 p-2">
        <div className="grid grid-cols-3 gap-1.5">
          {[
            "Generating Leads",
            "Speed to Lead",
            "Customer Support",
            "Appointment Scheduling",
            "Demo Booking",
            "Renewal Calls",
          ].map((label, i) => (
            <div
              key={i}
              className="rounded bg-white border border-gray-100 px-1.5 py-1 text-[8px] text-[#1E1E1E]/65 truncate"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyseCard() {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-md p-4 lg:p-5">
      <div className="flex items-center gap-2 mb-4">
        <div
          className="size-7 rounded-md"
          style={{
            background:
              "conic-gradient(from 0deg, #F472B6, #A855F7, #3B82F6, #10B981, #F59E0B, #F472B6)",
          }}
        />
        <span className="text-sm font-semibold text-[#1E1E1E]">Analyse &amp; Label</span>
      </div>
      <ul className="space-y-1.5">
        {analyseFields.map((f) => (
          <li
            key={f.label}
            className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs ${f.highlight ? "bg-gray-100 text-[#1E1E1E] font-medium" : "text-[#1E1E1E]/80"}`}
          >
            <svg className="size-3.5 text-[#1E1E1E]/55" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5 20c0-3 3-6 7-6s7 3 7 6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            {f.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BrandHubMark() {
  return (
    <svg viewBox="0 0 80 80" className="size-[60px] lg:size-[78px]" fill="none">
      {/* Comet shape */}
      <path
        d="M14 30 L40 14 L66 30 L54 50 L40 70 L26 50 Z"
        fill="#7C3AED"
      />
      <text
        x="50%"
        y="62"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="9"
        fontWeight="700"
        fill="#7C3AED"
      >
        cometlab
      </text>
    </svg>
  );
}

function FlowLines() {
  // Curved lines from hub (top center) outward to left and right columns
  const W = 1200;
  const H = 800;
  const hubX = W / 2;
  const hubY = 100;

  // 6 endpoints on left side (column 1), 6 on right side (column 4)
  const leftEnds = Array.from({ length: 6 }).map((_, i) => ({ x: 100, y: 220 + i * 90 }));
  const rightEnds = Array.from({ length: 6 }).map((_, i) => ({ x: W - 100, y: 220 + i * 90 }));

  const left = leftEnds.map((p, i) => {
    const c1x = hubX - 150;
    const c1y = hubY + 100;
    const c2x = p.x + 100;
    const c2y = p.y - 30;
    return { id: `pre-${i}`, d: `M ${hubX} ${hubY + 50} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p.x} ${p.y}` };
  });
  const right = rightEnds.map((p, i) => {
    const c1x = hubX + 150;
    const c1y = hubY + 100;
    const c2x = p.x - 100;
    const c2y = p.y - 30;
    return { id: `post-${i}`, d: `M ${hubX} ${hubY + 50} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p.x} ${p.y}` };
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      fill="none"
    >
      <defs>
        {[...left, ...right].map((p) => (
          <path key={p.id} id={p.id} d={p.d} />
        ))}
      </defs>

      {/* Static gray base lines */}
      {[...left, ...right].map((p) => (
        <use key={`b-${p.id}`} href={`#${p.id}`} stroke="#D1D5DB" strokeWidth="1" strokeLinecap="round" fill="none" />
      ))}

      {/* Animated dots — left side (orange), right side (green) */}
      {left.map((p, i) => (
        <circle key={`d-${p.id}`} r="3" fill="#F59E0B" opacity="0.85">
          <animateMotion dur={`${(2.8 + (i % 3) * 0.6).toFixed(1)}s`} repeatCount="indefinite" begin={`${(-(i * 0.4) % 3).toFixed(1)}s`} keyPoints="0;1" keyTimes="0;1" calcMode="linear">
            <mpath href={`#${p.id}`} />
          </animateMotion>
          <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.15;0.85;1" dur={`${(2.8 + (i % 3) * 0.6).toFixed(1)}s`} repeatCount="indefinite" begin={`${(-(i * 0.4) % 3).toFixed(1)}s`} />
        </circle>
      ))}
      {right.map((p, i) => (
        <circle key={`d-${p.id}`} r="3" fill="#10B981" opacity="0.85">
          <animateMotion dur={`${(2.8 + (i % 3) * 0.6).toFixed(1)}s`} repeatCount="indefinite" begin={`${(-(i * 0.4) % 3).toFixed(1)}s`} keyPoints="0;1" keyTimes="0;1" calcMode="linear">
            <mpath href={`#${p.id}`} />
          </animateMotion>
          <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.15;0.85;1" dur={`${(2.8 + (i % 3) * 0.6).toFixed(1)}s`} repeatCount="indefinite" begin={`${(-(i * 0.4) % 3).toFixed(1)}s`} />
        </circle>
      ))}
    </svg>
  );
}
