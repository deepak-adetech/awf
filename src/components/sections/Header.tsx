"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BrandLogo, ChevronDownIcon, HamburgerIcon } from "@/components/icons";
import { navUseCases, navIndustries } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-[1000] w-full px-3 pt-3 lg:px-6 lg:pt-5 transition-all duration-300"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1394px] items-center justify-between transition-all duration-300",
          scrolled
            ? "h-[60px] lg:h-[68px] rounded-full border border-white/40 bg-white/55 px-5 lg:px-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl backdrop-saturate-150"
            : "h-[64px] lg:h-[80px] px-3 lg:px-6"
        )}
      >
        <Link href="#" aria-label="CometLab Home" className="block w-[120px] lg:w-[140px] text-[#1E1E1E]">
          <BrandLogo className="w-full" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          <NavDropdown
            label="Use Cases"
            isOpen={openMenu === "uc"}
            onOpenChange={(o) => setOpenMenu(o ? "uc" : null)}
            items={navUseCases}
          />
          <NavDropdown
            label="Industry"
            isOpen={openMenu === "ind"}
            onOpenChange={(o) => setOpenMenu(o ? "ind" : null)}
            items={navIndustries}
          />
          <Link href="#" className="text-[15px] font-medium text-[#1E1E1E] hover:text-[#7C3AED]">
            Customers Stories
          </Link>
          <Link href="#" className="text-[15px] font-medium text-[#1E1E1E] hover:text-[#7C3AED]">
            Blog
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="#"
            className={cn(
              "inline-flex h-[44px] lg:h-[48px] items-center justify-center rounded-full px-5 lg:px-7 text-[15px] font-medium transition-colors",
              scrolled
                ? "bg-[#7C3AED] text-white hover:bg-[#7C3AED]/90"
                : "bg-white text-[#1E1E1E] hover:bg-white/90"
            )}
          >
            Book a Meeting
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-[#1E1E1E]"
          >
            <HamburgerIcon className="size-6" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[2000] bg-white px-6 py-6 lg:hidden overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <BrandLogo className="w-[120px] text-[#1E1E1E]" />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="size-10 rounded-full border border-gray-200 flex items-center justify-center text-2xl"
            >
              ×
            </button>
          </div>
          <div className="flex flex-col gap-6">
            <MobileGroup label="Use Cases" items={navUseCases} />
            <MobileGroup label="Industry" items={navIndustries} />
            <Link href="#" className="text-base font-medium" onClick={() => setMobileOpen(false)}>
              Customers Stories
            </Link>
            <Link href="#" className="text-base font-medium" onClick={() => setMobileOpen(false)}>
              Blog
            </Link>
            <Link
              href="#"
              className="mt-4 inline-flex h-[48px] items-center justify-center rounded-xl bg-[#7C3AED] text-base font-medium text-white"
            >
              Book a Meeting
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function NavDropdown({
  label,
  items,
  isOpen,
  onOpenChange,
}: {
  label: string;
  items: { label: string; href: string; icon: string }[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
    >
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1.5 text-[15px] font-medium text-[#1E1E1E] hover:text-[#7C3AED]",
          isOpen && "text-[#7C3AED]"
        )}
      >
        <span>{label}</span>
        <ChevronDownIcon className={cn("size-2 transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-xl min-w-[280px]">
            <ul className="flex flex-col gap-1">
              {items.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#1E1E1E]/80 hover:bg-gray-50 hover:text-[#7C3AED]"
                  >
                    <Image src={it.icon} alt="" width={16} height={16} className="size-4 shrink-0" />
                    <span>{it.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileGroup({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  return (
    <details className="border-b border-gray-100 pb-4">
      <summary className="cursor-pointer list-none flex items-center justify-between text-base font-medium">
        <span>{label}</span>
        <ChevronDownIcon className="size-3" />
      </summary>
      <ul className="mt-3 flex flex-col gap-3 pl-2">
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className="text-sm font-medium text-black/70">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
