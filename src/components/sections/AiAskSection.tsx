import Image from "next/image";
import Link from "next/link";

const askButtons = [
  {
    label: "Ask ChatGPT",
    iconSrc: "/callers/ai-ask/chatgpt.svg",
    href: "https://chat.openai.com/?q=What+is+CometLab",
  },
  {
    label: "Ask Claude",
    iconSrc: "/callers/ai-ask/claude.svg",
    href: "https://claude.ai/new?q=What+is+CometLab",
  },
  {
    label: "Ask Perplexity",
    iconSrc: "/callers/ai-ask/perplexity.svg",
    href: "https://www.perplexity.ai/?q=What+is+CometLab",
  },
];

export function AiAskSection() {
  return (
    <section
      className="dynamic-section-padding"
      style={
        {
          "--mobile-pt": "70px",
          "--mobile-pb": "70px",
          "--tablet-pt": "100px",
          "--tablet-pb": "100px",
          "--desktop-pt": "60px",
          "--desktop-pb": "60px",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto max-w-[1294px] px-6">
        <div className="rounded-[28px] border border-gray-100 bg-[#FAFAFA] p-8 lg:p-12 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#1E1E1E]/60">How it works?</p>
          <h2 className="mt-3 text-[30px] leading-[1] font-medium tracking-[-0.06em] text-foreground md:text-[60px] md:leading-[1.2]">
            Still not sure if CometLab is right for you?
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-base text-[#1E1E1E]/70">
            Let ChatGPT, Claude, or Perplexity do the thinking for you. Click a button and see what
            your favorite AI says about CometLab.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {askButtons.map((b) => (
              <Link
                key={b.label}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-[#1E1E1E] hover:border-[#7C3AED] hover:text-[#7C3AED]"
              >
                <Image src={b.iconSrc} alt="" width={20} height={20} className="size-5" />
                {b.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
