"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const items = [
  { label: "What we build", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Results", href: "#results" },
  { label: "Stack", href: "#stack" },
  { label: "Field notes", href: "#field-notes" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-[1320px] px-5">
        <div
          className={`flex items-center justify-between rounded-full border transition-all duration-500 ${
            scrolled
              ? "border-ink/10 bg-canvas/85 backdrop-blur-xl px-3 py-2"
              : "border-transparent bg-transparent px-2 py-1"
          }`}
        >
          <a href="#" className="flex items-center gap-2.5 pl-2">
            <Logo />
            <Wordmark />
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {items.map((it) => (
              <a
                key={it.href}
                href={it.href}
                className="px-3 py-2 text-[13.5px] text-ink/70 hover:text-ink transition-colors"
              >
                {it.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 pr-1">
            <a href="#contact" className="btn-ghost hidden sm:inline-flex">
              Login
            </a>
            <a href="#contact" className="btn-primary">
              Book audit <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

/** Wordmark: AutoWorkFlow with .AI in gradient */
export function Wordmark({ size = 14.5 }: { size?: number }) {
  return (
    <span
      className="font-medium tracking-tight"
      style={{ fontSize: `${size}px`, letterSpacing: "-0.018em" }}
    >
      AutoWorkFlow<span className="text-gradient-azure font-semibold">.AI</span>
    </span>
  );
}

/**
 * Simpler, no-box logo: three rising bars connected by a flow arc.
 * Reads as a workflow / signal mark.
 */
function Logo() {
  return (
    <span className="relative inline-flex items-center justify-center" aria-label="AutoWorkFlow.AI">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#0071E3" />
            <stop offset="55%" stopColor="#5E5CE6" />
            <stop offset="100%" stopColor="#BF5AF2" />
          </linearGradient>
        </defs>
        {/* three rising bars */}
        <rect x="3"  y="14" width="3" height="7" rx="1.2" fill="url(#logoGrad)" />
        <rect x="10.5" y="9"  width="3" height="12" rx="1.2" fill="url(#logoGrad)" />
        <rect x="18" y="4"  width="3" height="17" rx="1.2" fill="url(#logoGrad)" />
        {/* connecting flow arc */}
        <path
          d="M 4.5 12 C 8 6, 13 9, 19.5 3"
          stroke="url(#logoGrad)"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
          opacity="0.55"
        />
      </svg>
    </span>
  );
}
