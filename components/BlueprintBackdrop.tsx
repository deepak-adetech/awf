"use client";

import { useEffect, useRef } from "react";

/**
 * Page-wide blueprint backdrop.
 * - Crisp dotted grid that subtly parallaxes with scroll.
 * - Soft warm glow that follows cursor.
 * - Two faint coordinate axes top-left.
 */
export default function BlueprintBackdrop() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(0, ${(-y * 0.04).toFixed(
            2
          )}px, 0)`;
        }
      });
    };
    const onMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.transform = `translate3d(${e.clientX - 280}px, ${
        e.clientY - 280
      }px, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div ref={dotRef} className="absolute -inset-[6%] bp-dots" />
      <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-canvas via-canvas/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[260px] bg-gradient-to-t from-canvas via-canvas/70 to-transparent" />
      <div
        ref={glowRef}
        className="absolute h-[560px] w-[560px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(13,107,78,0.10), rgba(250,250,248,0))",
        }}
      />
    </div>
  );
}
