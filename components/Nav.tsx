"use client";

import { useEffect, useState } from "react";

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
          className={`flex items-center justify-between rounded-full transition-all duration-500 ${
            scrolled ? "nav-glass px-5 py-2" : "px-3 py-1"
          }`}
        >
          <a href="#" className="flex items-center gap-2.5">
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
 * Logo: a 3-node agent network. Two sources converge into a larger
 * output node — a stylized workflow/agent mark. Bold, geometric, no box.
 */
function Logo() {
  return (
    <span className="relative inline-flex items-center justify-center" aria-label="AutoWorkFlow.AI">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0A84FF" />
            <stop offset="55%" stopColor="#5E5CE6" />
            <stop offset="100%" stopColor="#BF5AF2" />
          </linearGradient>
          <radialGradient id="logoCore" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* edges — thin, deliberate */}
        <path
          d="M 5 6 L 19 6"
          stroke="url(#logoGrad)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M 5 6 L 12 18"
          stroke="url(#logoGrad)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M 19 6 L 12 18"
          stroke="url(#logoGrad)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.45"
        />
        {/* source nodes */}
        <circle cx="5" cy="6" r="2.6" fill="url(#logoGrad)" />
        <circle cx="19" cy="6" r="2.6" fill="url(#logoGrad)" />
        {/* output / agent node — larger, with inner highlight */}
        <circle cx="12" cy="18" r="4.4" fill="url(#logoGrad)" />
        <circle cx="12" cy="18" r="4.4" fill="url(#logoCore)" />
      </svg>
    </span>
  );
}
