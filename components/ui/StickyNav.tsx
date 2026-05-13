"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Download, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#architecture", label: "Architecture" },
  { href: "/#privacy", label: "Privacy" },
  { href: "/#install", label: "Install" },
];

export function StickyNav() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 100) {
        setIsHidden(false);
      } else if (currentY - lastY > 6) {
        setIsHidden(true);
        setMenuOpen(false);
      } else if (currentY - lastY < -6) {
        setIsHidden(false);
      }
      setLastY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b border-[var(--line)] bg-paper/90 py-[14px] backdrop-blur-md transition-transform duration-300 ease-out",
          isHidden ? "pointer-events-none -translate-y-full shadow-none" : "translate-y-0 shadow-sm"
        )}
      >
        <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-6 px-4 sm:px-6 md:px-8 lg:px-[64px]">

          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-[14px] no-underline" onClick={() => setMenuOpen(false)}>
            <div className="relative h-[44px] w-[130px] flex-shrink-0 overflow-hidden">
              <Image
                src="/assets/LOGO.svg"
                alt="KIBO Desktop"
                width={130}
                height={130}
                unoptimized
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ width: 130, height: 130 }}
                priority
              />
            </div>
            <span className="ml-1 hidden border-l border-[var(--line)] pl-[14px] font-sans text-[10px] uppercase leading-[1.3] tracking-[0.18em] text-ink-faint xl:block">
              <b className="block font-semibold text-ink">Companion N01</b>Desktop / Voice / Memory
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex list-none gap-[28px] lg:gap-[38px]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-[14px] font-medium text-ink no-underline transition-colors hover:text-coral"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-[18px] md:inline-flex">
            <Link
              href="https://github.com/yash-dev007/KIBO"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex shrink-0 items-center gap-[10px] rounded-full border border-[rgba(21,20,15,0.2)] bg-transparent px-[18px] py-[9px] font-sans text-[13px] font-medium text-ink no-underline transition-all hover:-translate-y-0.5 hover:bg-[rgba(21,20,15,0.06)] hover:shadow-[var(--shadow-sm)]"
            >
              <Download className="h-4 w-4" />
              Download
            </Link>
            <span className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-lg border border-[var(--line)]">
              <span className="h-[6px] w-[6px] animate-pulse rounded-full bg-coral" />
            </span>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--line)] bg-transparent text-ink transition-colors hover:bg-[rgba(21,20,15,0.04)] md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu panel — slides down from top */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-40 bg-paper/95 backdrop-blur-md transition-transform duration-300 ease-out md:hidden",
          menuOpen ? "translate-y-0" : "-translate-y-full"
        )}
        style={{ paddingTop: "108px" }}
      >
        <div className="flex flex-col gap-1 px-4 pb-6 pt-4 sm:px-6">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "rounded-xl px-4 py-3 font-sans text-[17px] font-semibold text-ink no-underline",
                "duration-[250ms] ease-out [transition-property:opacity,transform,color,background-color]",
                "hover:bg-[rgba(21,20,15,0.04)] hover:text-coral",
                "opacity-0 translate-y-2",
                menuOpen && "opacity-100 translate-y-0"
              )}
              style={{ transitionDelay: menuOpen ? `${i * 50 + 80}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-4 flex flex-col gap-3 border-t border-[var(--line)] pt-4">
            <Link
              href="https://github.com/yash-dev007/KIBO"
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-sans text-[14px] font-semibold text-white no-underline transition-colors hover:bg-teal"
            >
              <Download className="h-4 w-4" />
              Download KIBO
            </Link>
            <div className="flex items-center justify-center gap-2 font-sans text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              <span className="h-[6px] w-[6px] animate-pulse rounded-full bg-coral" />
              Online &amp; ready
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
