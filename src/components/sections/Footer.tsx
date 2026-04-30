import Image from "next/image";
import Link from "next/link";
import { footerColumns, complianceLogos } from "@/lib/content";
import { BrandLogo } from "@/components/icons";

export function Footer() {
  return (
    <footer className="bg-[#7C3AED] bg-[image:linear-gradient(180deg,#fff_8%,transparent_40%)] px-6 pt-9 md:px-10 lg:px-14">
      <div className="rounded-b-[50px] bg-white pt-20 pb-12 md:pb-[88px]">
        <div className="container-callers md:!px-10 lg:!px-14">
          <div className="relative flex flex-col gap-y-12 md:flex-row md:justify-between md:gap-x-12 lg:gap-x-20 xl:gap-x-32">
            {footerColumns.map((col) => (
              <div key={col.title} className="md:max-w-[210px] flex-1">
                <h4 className="text-2xl font-medium tracking-[-0.04em] md:text-2xl lg:text-[24px] text-[#1E1E1E]">
                  {col.title}
                </h4>
                <ul className="mt-[14px] flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="inline-block text-sm font-medium tracking-normal whitespace-nowrap text-black/70 capitalize duration-300 hover:translate-x-[8px] hover:text-[#7C3AED]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-col gap-4">
              <Link
                href="#"
                className="inline-flex h-[48px] items-center justify-center gap-2.5 rounded-[12px] border-[1.4px] border-[#7C3AED] bg-white px-8 text-base font-medium tracking-[-0.01em] text-[#7C3AED] hover:bg-[#7C3AED]/5"
              >
                <Image src="/callers/icons/login.svg" alt="" width={20} height={20} className="size-5" />
                Log In
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit CometLab on LinkedIn"
                className="inline-flex size-[48px] items-center justify-center rounded-[12px] border-[1.4px] border-[#7C3AED] hover:bg-[#7C3AED]/5"
              >
                <Image src="/callers/icons/linkedin.svg" alt="" width={24} height={24} className="size-5" />
              </Link>
            </div>
          </div>

          <div className="mt-[44px] flex flex-col items-center justify-between border-t border-[#D9D9D9] pt-[44px] md:flex-row md:gap-8">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-9 lg:gap-x-[48px]">
              {complianceLogos.map((c) => (
                <Link
                  key={c.name}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.name} - View our security trust center`}
                  className="shrink-0"
                >
                  <Image
                    src={c.src}
                    alt={c.name}
                    width={c.width}
                    height={c.height}
                    className="h-[44px] md:h-[52px] w-auto object-contain"
                  />
                </Link>
              ))}
            </div>

            <div className="mt-8 md:mt-0 flex items-center gap-3 text-[#1E1E1E]/70">
              <BrandLogo className="w-[140px] text-[#1E1E1E]" />
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#D9D9D9] pt-8 md:flex-row text-sm text-black/60">
            <p>Copyright © {new Date().getFullYear()} CometLab — All rights reserved.</p>
            <div className="flex gap-5">
              <Link href="#" className="hover:text-[#7C3AED]">
                Terms of Use
              </Link>
              <Link href="#" className="hover:text-[#7C3AED]">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-[#7C3AED]">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
