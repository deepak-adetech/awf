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
 * Logo: an AI sparkle mark — a bold, rounded 4-pointed star with a small
 * companion sparkle. Gradient fill, inner highlight. Reads as "AI / spark
 * of intelligence", simple and brand-feeling.
 */
function Logo() {
  return (
    <span className="relative inline-flex items-center justify-center" aria-label="AutoWorkFlow.AI">
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0A84FF" />
            <stop offset="55%" stopColor="#5E5CE6" />
            <stop offset="100%" stopColor="#BF5AF2" />
          </linearGradient>
          <radialGradient id="logoCore" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* main 4-pointed sparkle, drawn with cubic curves so the points
            taper smoothly into a soft bowed-in waist — like an "AI star" */}
        <path
          d="M 15 2
             C 15 11, 15 11, 26 14
             C 15 17, 15 17, 15 26
             C 15 17, 15 17, 4 14
             C 15 11, 15 11, 15 2 Z"
          fill="url(#logoGrad)"
        />
        {/* inner highlight on the main sparkle */}
        <path
          d="M 15 2
             C 15 11, 15 11, 26 14
             C 15 17, 15 17, 15 26
             C 15 17, 15 17, 4 14
             C 15 11, 15 11, 15 2 Z"
          fill="url(#logoCore)"
        />
        {/* small companion sparkle, top-right — gives the "AI shimmer" feel */}
        <path
          d="M 24 4
             C 24 7, 24 7, 27 8
             C 24 9, 24 9, 24 12
             C 24 9, 24 9, 21 8
             C 24 7, 24 7, 24 4 Z"
          fill="url(#logoGrad)"
          opacity="0.85"
        />
      </svg>
    </span>
  );
}
