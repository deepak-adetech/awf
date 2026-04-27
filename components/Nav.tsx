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
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const tick = () => {
      const d = new Date();
      const fmt = d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/New_York",
      });
      setTime(fmt + " ET");
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(id);
    };
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
          <a href="#" className="flex items-center gap-2 pl-2">
            <Logo />
            <span className="text-[14.5px] font-medium tracking-tight">
              AutoWorkflows
            </span>
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
            <span className="hidden lg:inline-block mono text-[11px] text-ink/50 mr-2">
              {time}
            </span>
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

function Logo() {
  return (
    <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-azure-500 text-canvas">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
        <path
          d="M4 18 L10 6 L14 14 L20 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="4" cy="18" r="1.6" fill="currentColor" />
        <circle cx="20" cy="6" r="1.6" fill="currentColor" />
      </svg>
    </span>
  );
}
