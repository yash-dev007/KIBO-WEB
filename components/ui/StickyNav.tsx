"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download } from "lucide-react";
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
        setIsHidden(true);
      } else if (currentY - lastY < -6) {
        setIsHidden(false);
      }
      setLastY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-transparent bg-paper py-[20px] transition-transform duration-300 ease-out",
        isHidden ? "pointer-events-none -translate-y-full shadow-none" : "translate-y-0 shadow-sm"
      )}
    >
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-6 px-4 sm:px-6 md:px-8 lg:px-[64px]">
        <Link href="/" className="inline-flex items-center gap-[14px] font-sans text-[18px] font-bold tracking-normal text-ink no-underline">
          <span className="inline-flex h-[36px] w-[36px] items-center justify-center border-[1.5px] border-ink bg-transparent font-serif text-[17px] italic">K</span>
          <span>KIBO</span>
          <span className="ml-1 hidden border-l border-[var(--line)] pl-[14px] font-sans text-[10px] uppercase leading-[1.3] tracking-[0.18em] text-ink-faint xl:block">
            <b className="block font-semibold text-ink">Companion N01</b>Desktop / Voice / Memory
          </span>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex list-none gap-[28px] lg:gap-[38px]">
            <li><Link href="/#features" className="font-sans text-[14px] font-medium text-ink no-underline transition-colors hover:text-coral">Features</Link></li>
            <li><Link href="/#architecture" className="font-sans text-[14px] font-medium text-ink no-underline transition-colors hover:text-coral">Architecture</Link></li>
            <li><Link href="/#privacy" className="font-sans text-[14px] font-medium text-ink no-underline transition-colors hover:text-coral">Privacy</Link></li>
            <li><Link href="/#install" className="font-sans text-[14px] font-medium text-ink no-underline transition-colors hover:text-coral">Install</Link></li>
          </ul>
        </nav>
        <div className="hidden items-center gap-[18px] md:inline-flex">
          <Link
            href="https://github.com/yash-dev007/KIBO"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex shrink-0 items-center gap-[10px] border border-[rgba(21,20,15,0.2)] bg-transparent px-[16px] py-[9px] font-sans text-[13px] font-medium text-ink no-underline transition-colors hover:bg-[rgba(21,20,15,0.04)]"
          >
            <Download className="h-4 w-4" />
            Download
          </Link>
          <span className="inline-flex h-[28px] w-[28px] items-center justify-center border border-[var(--line)]">
            <span className="h-[6px] w-[6px] bg-coral" />
          </span>
        </div>
      </div>
    </header>
  );
}
