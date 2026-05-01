import Image from "next/image";

const bullets = [
  { color: "#15B886", text: "One brain for every channel" },
  { color: "#FAA8C7", text: "Shared memory across calls, SMS, and chat" },
  { color: "#7C3AED", text: "Consistent tone, no matter where they show up" },
  { color: "#EF4444", text: "Instant responses that still feel human" },
];

export function OmniChannelSection() {
  return (
    <section className="dynamic-section-padding">
      <div className="mx-auto max-w-[1294px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left side */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#1E1E1E]">
              <Image src="/callers/section-icons/handshake.svg" alt="" width={16} height={16} />
              Omni-Channel
            </span>
            <h2 className="mt-7 text-[30px] leading-[1] font-medium tracking-[-0.06em] text-[#1E1E1E] lg:text-[56px]">
              Unify your customer wo
              <span className="text-[#7C3AED]">rk</span>
            </h2>

            <p className="mt-6 text-[16px] leading-[1.5] text-black/80 lg:text-[18px]">
              The same intelligence that handles your calls also runs your SMS, WhatsApp, and other
              messaging so every touchpoint shares context, tone, and history, giving customers
              fast, human‑feeling responses wherever they reach you while your team sees one
              continuous conversation instead of scattered threads.
            </p>

            <ul className="mt-8 space-y-5 lg:space-y-6">
              {bullets.map((b) => (
                <li key={b.text} className="flex items-center gap-4">
                  <span
                    className="size-2.5 rounded-full shrink-0"
                    style={{ background: b.color }}
                    aria-hidden
                  />
                  <span className="text-[16px] lg:text-[18px] font-medium text-[#1E1E1E]">
                    {b.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side - heart illustration */}
          <div className="relative w-full max-w-[600px] mx-auto aspect-square">
            <Image
              src="/callers/omni/heart-image.png"
              alt="Omni-channel heart"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
