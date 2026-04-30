import Image from "next/image";
import Link from "next/link";

// Integration logo icons that "feed in" from the left
const leftLogos = [
  { src: "/callers/integrations/shopify.svg", alt: "Shopify", x: 30, y: 18 },
  { src: "/callers/integrations/intercom.webp", alt: "Intercom", x: 12, y: 38 },
  { src: "/callers/integrations/woocommerce.webp", alt: "WooCommerce", x: 22, y: 60 },
  { src: "/callers/integrations/salesforce.svg", alt: "Salesforce", x: 8, y: 80 },
  { src: "/callers/integrations/google.svg", alt: "Google", x: 24, y: 92 },
];

// Action chips and integration logos that "fan out" to the right
const rightItems: Array<
  | { kind: "logo"; src: string; alt: string; x: number; y: number }
  | { kind: "chip"; label: string; iconSrc: string; x: number; y: number }
> = [
  { kind: "logo", src: "/callers/integrations/intercom.webp", alt: "Mailchimp", x: 76, y: 16 },
  { kind: "logo", src: "/callers/integrations/monday.webp", alt: "monday", x: 72, y: 32 },
  { kind: "logo", src: "/callers/integrations/whatsapp.svg", alt: "WhatsApp", x: 78, y: 48 },
  { kind: "chip", label: "Opportunity created", iconSrc: "/callers/integrations/hubspot.svg", x: 80, y: 64 },
  { kind: "logo", src: "/callers/integrations/salesforce.svg", alt: "Salesforce", x: 70, y: 78 },
  { kind: "chip", label: "Notification Sent", iconSrc: "/callers/integrations/slack.webp", x: 82, y: 90 },
];

export function IntegrationsSection() {
  return (
    <section className="dynamic-section-padding overflow-hidden bg-[#F9F8F8]">
      <div className="mx-auto max-w-[1220px] px-6">
        <div className="flex items-center justify-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-[#1E1E1E]">
            <Image src="/callers/section-icons/connect.svg" alt="" width={16} height={16} className="size-4" />
            610+ Native Integrations
          </span>
        </div>
        <h2 className="text-center text-[32px] leading-[1.2] font-medium tracking-[-0.06em] text-[#1E1E1E] md:text-[60px]">
          Flowing across your existing systems
        </h2>
        <div className="mt-8 flex justify-center">
          <Link
            href="#"
            className="inline-flex h-[52px] items-center justify-center rounded-xl bg-[#1E1E1E] px-7 text-base font-medium text-white hover:bg-[#1E1E1E]/90"
          >
            Explore Now
            <span className="ml-2" aria-hidden>→</span>
          </Link>
        </div>

        {/* Hub-and-spoke visualization */}
        <div className="relative mt-10 lg:mt-12 mx-auto w-full max-w-[900px] aspect-[900/420]">
          <HubLines />

          {/* Left integration logos */}
          {leftLogos.map((l, i) => (
            <FloatingLogo
              key={`left-${i}`}
              src={l.src}
              alt={l.alt}
              x={l.x}
              y={l.y}
              delay={i * 0.4}
            />
          ))}

          {/* Right items: logos + chips */}
          {rightItems.map((it, i) =>
            it.kind === "logo" ? (
              <FloatingLogo
                key={`right-${i}`}
                src={it.src}
                alt={it.alt}
                x={it.x}
                y={it.y}
                delay={0.2 + i * 0.4}
              />
            ) : (
              <FloatingChip
                key={`right-${i}`}
                iconSrc={it.iconSrc}
                label={it.label}
                x={it.x}
                y={it.y}
                delay={0.2 + i * 0.4}
              />
            )
          )}

          {/* Center brand hub — translate(-50%,-50%) handled in keyframes */}
          <div
            className="absolute left-1/2 top-1/2 z-[3] rounded-[24px] bg-[#F4D8FF] shadow-[0_18px_50px_rgba(54,85,232,0.18)] flex items-center justify-center size-[100px] lg:size-[120px]"
            style={{
              animation: "hub-pulse 2.4s ease-in-out infinite",
              transform: "translate(-50%, -50%)",
            }}
          >
            <BrandHubMark />
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingLogo({
  src,
  alt,
  x,
  y,
  delay,
}: {
  src: string;
  alt: string;
  x: number;
  y: number;
  delay: number;
}) {
  return (
    <div
      className="absolute z-[2]"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        animation: `hub-bob 3.5s ease-in-out ${delay}s infinite alternate`,
      }}
    >
      <div className="size-10 lg:size-12 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden">
        <Image src={src} alt={alt} width={28} height={28} className="size-6 object-contain" />
      </div>
    </div>
  );
}

function FloatingChip({
  iconSrc,
  label,
  x,
  y,
  delay,
}: {
  iconSrc: string;
  label: string;
  x: number;
  y: number;
  delay: number;
}) {
  return (
    <div
      className="absolute z-[2]"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        animation: `hub-bob 3.5s ease-in-out ${delay}s infinite alternate`,
      }}
    >
      <div className="flex items-center gap-2 rounded-full bg-white border border-gray-100 shadow-md px-3 py-1.5 lg:px-4 lg:py-2 whitespace-nowrap">
        <span className="flex size-5 lg:size-6 items-center justify-center rounded-md bg-[#7C3AED]/10 overflow-hidden">
          <Image src={iconSrc} alt="" width={16} height={16} className="size-4 object-contain" />
        </span>
        <span className="text-xs lg:text-sm font-medium text-[#1E1E1E]">{label}</span>
      </div>
    </div>
  );
}

function BrandHubMark() {
  // A simplified brand mark: stylized "M" with AI dot
  return (
    <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
      <path
        d="M14 56 V24 L30 56 L46 24 V56"
        stroke="#7C3AED"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text
        x="54"
        y="38"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="13"
        fontWeight="700"
        fill="#7C3AED"
        opacity="0.9"
      >
        AI
      </text>
    </svg>
  );
}

/**
 * SVG curves that flow from left integration logos INTO the center hub,
 * and from the center hub OUT to the right items. Lines have moving dots
 * to suggest flow.
 */
function HubLines() {
  // viewBox-based positions match the % positions used for the floating logos.
  const W = 1200;
  const H = 640;
  const cx = W / 2;
  const cy = H / 2;

  // Left endpoints (% → px)
  const leftPts = leftLogos.map((l) => ({ x: (l.x / 100) * W, y: (l.y / 100) * H }));
  // Right endpoints
  const rightPts = rightItems.map((it) => ({ x: (it.x / 100) * W, y: (it.y / 100) * H }));

  const incoming = leftPts.map((p, i) => {
    const c1x = p.x + (cx - p.x) * 0.55;
    const c1y = p.y;
    const c2x = cx - 60;
    const c2y = cy + (p.y < cy ? -10 : 10);
    return {
      id: `in-${i}`,
      d: `M ${p.x} ${p.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${cx - 30} ${cy}`,
    };
  });

  const outgoing = rightPts.map((p, i) => {
    const c1x = cx + 60;
    const c1y = cy + (p.y < cy ? -10 : 10);
    const c2x = p.x - (p.x - cx) * 0.55;
    const c2y = p.y;
    return {
      id: `out-${i}`,
      d: `M ${cx + 30} ${cy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p.x} ${p.y}`,
    };
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
      fill="none"
    >
      <defs>
        {[...incoming, ...outgoing].map((p) => (
          <path key={p.id} id={p.id} d={p.d} />
        ))}
      </defs>

      {/* Static lines */}
      {[...incoming, ...outgoing].map((p) => (
        <use
          key={`base-${p.id}`}
          href={`#${p.id}`}
          stroke="#D1D5DB"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />
      ))}

      {/* Moving dots flowing inward and outward */}
      {[...incoming, ...outgoing].map((p, i) => (
        <circle key={`dot-${p.id}`} r="3" fill="#7C3AED" opacity="0.8">
          <animateMotion
            dur={`${(2.4 + (i % 3) * 0.6).toFixed(1)}s`}
            repeatCount="indefinite"
            begin={`${(-(i * 0.4) % 3).toFixed(1)}s`}
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="linear"
          >
            <mpath href={`#${p.id}`} />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;0.85;0.85;0"
            keyTimes="0;0.15;0.85;1"
            dur={`${(2.4 + (i % 3) * 0.6).toFixed(1)}s`}
            repeatCount="indefinite"
            begin={`${(-(i * 0.4) % 3).toFixed(1)}s`}
          />
        </circle>
      ))}
    </svg>
  );
}
