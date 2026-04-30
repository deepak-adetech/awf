"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  threshold?: number;
  rootMargin?: string;
  as?: "div" | "section";
};

export function SectionReveal({
  children,
  className,
  delayMs = 0,
  threshold = 0,
  rootMargin = "0px 0px 200px 0px",
  as = "div",
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight + 200) {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add("is-visible");
            observer.unobserve(node);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);

    const fallback = window.setTimeout(() => {
      node.classList.add("is-visible");
      observer.disconnect();
    }, 2000);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const style = delayMs ? { transitionDelay: `${delayMs}ms` } : undefined;
  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal-on-scroll", className)}
      style={style}
    >
      {children}
    </Tag>
  );
}
