import Image from "next/image";
import { customerLogos } from "@/lib/content";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Right blue panel — sized to put phone on the white/blue boundary */}
      <div
        className="absolute top-0 right-0 z-[0] hidden h-[calc(100%-40px)] w-[24%] bg-[#7C3AED] lg:block"
        style={{ borderBottomLeftRadius: 100 }}
        aria-hidden
      />

      {/* Subtle background flowing lines */}
      <div className="absolute inset-0 z-[1] hidden lg:block pointer-events-none" aria-hidden>
        <FlowingLines />
      </div>

      <div className="relative z-[2] mx-auto max-w-[1394px] px-6 lg:px-12 xl:px-16">
        <div className="pt-[80px] pb-12 lg:pt-[100px] lg:pb-[80px]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px] items-start gap-12">
            {/* LEFT: text content — pushed up; phone stays vertically centered separately */}
            <div className="max-w-[820px] lg:pt-[40px]">
              <span className="inline-flex items-center gap-2 rounded-[10px] border border-gray-200 bg-white px-2.5 py-[3px] text-xs font-medium text-[#1E1E1E] md:rounded-full md:gap-[14px] md:px-4 md:py-2 md:text-base">
                <Image src="/callers/use-cases/b2c.svg" alt="" width={24} height={24} className="size-4 md:size-6" />
                Built for B2C Companies
              </span>

              <h1 className="mt-6 text-[40px] leading-[1.1] font-medium tracking-[-0.04em] text-[#1E1E1E] md:text-[56px] lg:text-[70px] lg:leading-[84px] lg:tracking-[-4.2px]">
                <span className="block">Customer work routed</span>
                <span className="block">right. Built on Comet.</span>
              </h1>

              <p className="mt-7 max-w-[640px] text-[16px] leading-[1.4] tracking-[-0.01em] text-black/80 lg:text-[18px]">
                CometLab sits at the front line, handling the simple questions, checks, nudges,
                and outreach across the customer lifecycle in the same way a good human would. It
                answers, qualifies, re‑engages, and routes through your existing stack in seconds,
                and only pulls your teams into the moments where their judgment and presence
                actually matter.
              </p>

            </div>

            {/* RIGHT: Phone — center is exactly on the white/blue boundary on desktop; centered & smaller on mobile */}
            <div className="relative justify-self-center lg:justify-self-end lg:-translate-x-[94px] xl:-translate-x-[114px] lg:pt-[20px] mt-8 lg:mt-0">
              <Phone />
            </div>
          </div>

          {/* Trusted-by customer logos — within the hero, just below content */}
          <div className="relative mt-6 lg:mt-6 max-w-[820px]">
            <p className="mb-3 text-sm font-medium text-[#1E1E1E]/60">
              Trusted by
            </p>
            <div className="overflow-hidden marquee-pause [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
              <div className="marquee-track gap-10 lg:gap-14 items-center">
                {[...customerLogos, ...customerLogos].map((l, i) => (
                  <div key={i} className="shrink-0 flex items-center justify-center h-10">
                    <Image
                      src={l.src}
                      alt={l.name}
                      width={l.width}
                      height={l.height}
                      className="h-7 lg:h-9 w-auto object-contain grayscale opacity-70"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Phone() {
  return (
    <div className="relative w-[200px] lg:w-[290px] drop-shadow-2xl">
      <div className="relative aspect-[260/532] rounded-[36px] lg:rounded-[48px] border-[8px] lg:border-[10px] border-[#1E1E1E] bg-white overflow-hidden">
        <div className="absolute top-2.5 lg:top-3 left-1/2 -translate-x-1/2 h-[20px] lg:h-[28px] w-[72px] lg:w-[100px] rounded-full bg-[#1E1E1E] z-[10]" />
        <div className="absolute inset-0 flex flex-col justify-center px-3 lg:px-5">
          <div className="space-y-3">
            <div className="h-[54px] w-full rounded-[14px] border border-[#E4E7E5] bg-[#FAFAFA] flex items-center px-3 gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-base leading-none">🇮🇳</span>
                <span className="text-sm font-medium text-[#1E1E1E]">+91</span>
                <svg className="size-2 text-[#1E1E1E]/50" viewBox="0 0 8 8" fill="none">
                  <path
                    d="M1 2.5L4 5.5L7 2.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-sm text-[#1E1E1E]/40 ml-1">81234 56789</div>
            </div>
            <button
              type="button"
              className="h-[54px] w-full rounded-[14px] bg-[#1E1E1E] text-white text-[15px] font-semibold flex items-center justify-center gap-2"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 5.5C3 14.06 9.94 21 18.5 21a2 2 0 0 0 2-2v-2.59a1 1 0 0 0-.79-.98l-4.66-1.04a1 1 0 0 0-.98.27l-1.7 1.7A12.06 12.06 0 0 1 6.64 9.63l1.7-1.7a1 1 0 0 0 .27-.98L7.57 2.29A1 1 0 0 0 6.59 1.5H4a2 2 0 0 0-2 2v2"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Try Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Background flowing lines — strongly curved S-curves that all funnel into the
 * phone area. Each line has a moving dot that travels FROM the left INTO the
 * phone (using SVG <animateMotion>), so the user can see data flowing in.
 */
function FlowingLines() {
  // Phone is around viewBox x≈1080, y center ≈ 380. Lines end near here.
  const targetX = 1080;
  const targetY = 380;
  const lines = Array.from({ length: 14 }).map((_, i) => {
    // Spread start points across left edge from y=40 to y=720
    const startY = 40 + i * 50;
    // Spread end points around phone (slight vertical fan around the target)
    const endY = targetY - 90 + (i % 14) * 13;
    // VERY strong curvature — exaggerated control points for visible arcs
    const distFromTarget = Math.abs(startY - targetY);
    const curveStrength = Math.min(180, distFromTarget * 0.6 + 60);
    const ctrl1X = 200;
    const ctrl1Y = startY + (startY < targetY ? curveStrength : -curveStrength);
    const ctrl2X = 800;
    const ctrl2Y = endY + (endY < targetY ? -curveStrength * 0.5 : curveStrength * 0.5);
    return {
      id: `flow-path-${i}`,
      d: `M-20 ${startY} C ${ctrl1X} ${ctrl1Y}, ${ctrl2X} ${ctrl2Y}, ${targetX} ${endY}`,
      duration: (5 + (i % 4) * 1.5).toFixed(1),
      delay: (-((i * 0.7) % 5)).toFixed(2),
    };
  });

  return (
    <svg
      viewBox="0 0 1440 800"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        {/* Strong fade — lines are nearly invisible over the text area on the
            left, gain visibility only as they approach the phone on the right. */}
        <linearGradient id="lineBaseFade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#CFCFCF" stopOpacity="0" />
          <stop offset="55%" stopColor="#C8C8C8" stopOpacity="0.05" />
          <stop offset="80%" stopColor="#B0B0B0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7F7F7F" stopOpacity="0.7" />
        </linearGradient>
        {lines.map((l) => (
          <path key={l.id} id={l.id} d={l.d} />
        ))}
      </defs>

      {/* Static curved base lines — clearly visible, all converging at phone */}
      {lines.map((l) => (
        <use
          key={`base-${l.id}`}
          href={`#${l.id}`}
          stroke="url(#lineBaseFade)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />
      ))}

      {/* Animated dots travel from the left INTO the phone. Each dot fades in
          as it moves toward the phone (matching the line fade) so dots over the
          text area on the left are nearly invisible. */}
      {lines.map((l) => (
        <circle
          key={`dot-${l.id}`}
          r="2.5"
          fill="#7C3AED"
          opacity="0"
        >
          <animateMotion
            dur={`${l.duration}s`}
            repeatCount="indefinite"
            begin={`${l.delay}s`}
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="linear"
          >
            <mpath href={`#${l.id}`} />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;0;0.2;0.85;0"
            keyTimes="0;0.55;0.75;0.95;1"
            dur={`${l.duration}s`}
            repeatCount="indefinite"
            begin={`${l.delay}s`}
          />
        </circle>
      ))}
    </svg>
  );
}
