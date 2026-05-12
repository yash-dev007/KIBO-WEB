"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function StickyNav() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 100) {
        setIsHidden(false);
      } else if (currentY - lastY > 6) {
        setIsHidden(true); // scrolling down
      } else if (currentY - lastY < -6) {
        setIsHidden(false); // scrolling up
      }
      setLastY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <header className={cn(
      "py-[22px] sticky top-0 z-50 bg-paper border-b border-transparent transition-transform duration-300 ease-out",
      isHidden ? "-translate-y-full pointer-events-none shadow-none" : "translate-y-0 shadow-sm"
    )}>
      <div className="max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-[64px] mx-auto flex items-center justify-between gap-6">
        <Link href="/" className="inline-flex items-center gap-[14px] font-sans font-bold tracking-[-0.01em] text-ink text-[18px] no-underline">
          <span className="w-[36px] h-[36px] inline-flex items-center justify-center border-[1.5px] border-ink rounded-full font-serif italic text-[17px] bg-transparent">К</span>
          <span>KIBO</span>
          <span className="hidden xl:block font-sans text-[10px] tracking-[0.18em] uppercase text-ink-faint leading-[1.3] ml-1 border-l border-[var(--line)] pl-[14px]">
            <b className="block text-ink font-semibold">Companion Nº 01</b>Desktop / Memory / Life
          </span>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex gap-[28px] lg:gap-[38px] list-none">
            <li><Link href="/about" className="text-ink no-underline font-sans text-[14px] font-medium transition-colors hover:text-coral">About</Link></li>
            <li><Link href="/capabilities" className="text-ink no-underline font-sans text-[14px] font-medium transition-colors hover:text-coral">Capabilities</Link></li>
            <li><Link href="/labs" className="text-ink no-underline font-sans text-[14px] font-medium transition-colors hover:text-coral">Labs</Link></li>
            <li><Link href="/method" className="text-ink no-underline font-sans text-[14px] font-medium transition-colors hover:text-coral">Method</Link></li>
            <li><Link href="/work" className="text-ink no-underline font-sans text-[14px] font-medium transition-colors hover:text-coral">Selected Work</Link></li>
          </ul>
        </nav>
        <div className="hidden md:inline-flex items-center gap-[18px]">
          <Link href="#" className="inline-flex items-center gap-[10px] py-[9px] px-[16px] rounded-full bg-transparent border border-[rgba(21,20,15,0.2)] text-ink font-sans text-[13px] font-medium no-underline whitespace-nowrap shrink-0 hover:bg-[rgba(21,20,15,0.04)] transition-colors">Download</Link>
          <span className="w-[28px] h-[28px] rounded-full border border-[var(--line)] inline-flex items-center justify-center">
            <span className="w-[6px] h-[6px] rounded-full bg-coral"></span>
          </span>
        </div>
      </div>
    </header>
  );
}