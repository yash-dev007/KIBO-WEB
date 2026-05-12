# KIBO Website Next.js Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the static `KIBO.html` into a Next.js multi-page application with a 1:1 pixel-perfect visual match.

**Architecture:** Next.js App Router with shared `layout.tsx` for the shell (Nav, Topbar, SideRails, Footer). Original sections are split into individual page routes. Scroll animations use Framer Motion `<Reveal>`.

**Tech Stack:** Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion, shadcn/ui.

---

### Task 1: Next.js Manual Setup & Configuration

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `components.json`
- Create: `app/globals.css`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "kibo-web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "framer-motion": "^11.2.10",
    "lucide-react": "^0.395.0",
    "next": "14.2.4",
    "react": "^18",
    "react-dom": "^18",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.4",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`
Expected: Node modules installed successfully.

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {"@/*": ["./*"]}
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create `tailwind.config.ts`**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "paper-warm": "var(--paper-warm)",
        "paper-dark": "var(--paper-dark)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-mute": "var(--ink-mute)",
        "ink-faint": "var(--ink-faint)",
        coral: "var(--coral)",
        "coral-soft": "var(--coral-soft)",
        mustard: "var(--mustard)",
        olive: "var(--olive)",
        bone: "var(--bone)",
      },
      fontFamily: {
        sans: ["var(--font-inter-tight)", "var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        custom: "var(--shadow)",
      },
      animation: {
        "marquee-x": "marquee-x 52s linear infinite",
        "marquee-x-reverse": "marquee-x 64s linear infinite reverse",
        pulse: "pulse 2.4s ease-in-out infinite",
      },
      keyframes: {
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 5: Create `postcss.config.mjs`**

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 6: Create `components.json` (shadcn/ui configuration)**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

- [ ] **Step 7: Create `lib/utils.ts`**

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 8: Create `next.config.mjs`**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
```

- [ ] **Step 9: Commit**
Run: `git add . && git commit -m "chore: setup nextjs, tailwind, fonts, and base configs"`

---

### Task 2: Global CSS & Root Layout

**Files:**
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Modify: `KIBO.html` (reference only)

- [ ] **Step 1: Write `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --paper: #efe7d2;
    --paper-warm: #ece4cf;
    --paper-dark: #ddd2b6;
    --ink: #15140f;
    --ink-soft: #2a2620;
    --ink-mute: #5a5448;
    --ink-faint: #8b8676;
    --coral: #ed6f5c;
    --coral-soft: #f08e7c;
    --mustard: #e9b94a;
    --olive: #6e7448;
    --bone: #f7f1de;
    --line: rgba(21, 20, 15, 0.16);
    --line-soft: rgba(21, 20, 15, 0.08);
    --line-faint: rgba(21, 20, 15, 0.05);
    --shadow: 0 30px 60px -30px rgba(21, 20, 15, 0.18);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  html, body {
    background: var(--paper);
    color: var(--ink);
  }

  body {
    font-size: 16px;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    position: relative;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    background-image:
      radial-gradient(circle at 12% 18%, rgba(106, 92, 56, 0.07) 0, transparent 28%),
      radial-gradient(circle at 88% 72%, rgba(106, 92, 56, 0.06) 0, transparent 32%),
      url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.18  0 0 0 0 0.16  0 0 0 0 0.12  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
    background-size: auto, auto, 240px 240px;
    mix-blend-mode: multiply;
    opacity: 0.92;
  }
}
```

- [ ] **Step 2: Write `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter, Inter_Tight, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-playfair" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "KIBO — A desktop companion that lives on your screen",
  description: "KIBO is a new class of interface—a persistent, reactive, and evolving digital companion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${interTight.variable} ${playfair.variable} ${jetbrains.variable} font-body`}>
        <div className="relative z-10 shell">
          {children}
        </div>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**
Run: `git add app/globals.css app/layout.tsx && git commit -m "feat: add global styles and root layout"`

---

### Task 3: Shared Application Shell Components

**Files:**
- Create: `components/ui/SideRails.tsx`
- Create: `components/ui/Topbar.tsx`
- Create: `components/ui/StickyNav.tsx`
- Create: `components/ui/Footer.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Write `components/ui/SideRails.tsx`**

```tsx
export function SideRails() {
  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 w-[36px] z-[3] pointer-events-none flex items-center justify-center border-l border-[var(--line-faint)] hidden xl:flex">
        <span className="font-sans text-[10px] font-semibold tracking-[0.42em] uppercase text-ink-faint rotate-180 whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>
          KIBO — A Persistant Digital Life · Vol. 01 · 2026
        </span>
      </div>
      <div className="fixed top-0 bottom-0 left-0 w-[36px] z-[3] pointer-events-none flex items-center justify-center border-r border-[var(--line-faint)] hidden xl:flex">
        <span className="font-sans text-[10px] font-semibold tracking-[0.42em] uppercase text-ink-faint whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>
          Reactive · Evolving · Personal · Memory
        </span>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Write `components/ui/Topbar.tsx`**

```tsx
export function Topbar() {
  return (
    <div className="border-b border-[var(--line)] py-[10px] bg-paper relative z-[4]">
      <div className="max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-[64px] mx-auto flex justify-between items-center gap-6 font-sans text-[9px] sm:text-[10.5px] tracking-[0.18em] uppercase text-ink-faint">
        <span className="whitespace-nowrap"><b className="text-ink font-semibold">OD / 2026</b> &nbsp;·&nbsp; Early Access / Vol. 01</span>
        <span className="hidden xl:inline-flex gap-[26px]">
          <span className="whitespace-nowrap">Filed under <b className="text-coral">Human · Interface</b></span>
          <span className="whitespace-nowrap">Proprietary · Made on Earth</span>
        </span>
        <span className="inline-flex gap-[18px] items-center whitespace-nowrap">
          <a className="text-inherit no-underline border-b border-transparent transition-colors hover:text-coral hover:border-coral" href="https://kibo.ai/releases" target="_blank" rel="noreferrer noopener">
            <span className="w-[6px] h-[6px] rounded-full bg-coral inline-block mr-[6px] animate-pulse"></span>Beta · v0.1.0
          </a>
          <span><b className="text-ink font-semibold">EN</b> · FR · JP</span>
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Write `components/ui/StickyNav.tsx`**

```tsx
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
```

- [ ] **Step 4: Write `components/ui/Footer.tsx`**

```tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] pt-[60px] pb-[30px] mt-[60px]">
      <div className="max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-[64px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-[40px] mb-[60px]">
          <div className="mb-4 lg:mb-0">
            <Link href="/" className="inline-flex items-center gap-[14px] font-sans font-bold tracking-[-0.01em] text-ink text-[18px] no-underline mb-[18px]">
              <span className="w-[36px] h-[36px] inline-flex items-center justify-center border-[1.5px] border-ink rounded-full font-serif italic text-[17px] bg-transparent">К</span>
              <span>KIBO</span>
            </Link>
            <p className="font-body text-[13.5px] text-ink-mute leading-[1.55] max-w-[38ch] mt-[18px]">
              KIBO is a persistent digital companion for creative professionals. Built with privacy and context at its core.
            </p>
          </div>
          <div>
            <h5 className="font-sans text-[11px] text-ink tracking-[0.18em] uppercase mb-[18px] font-bold">Platform</h5>
            <ul className="list-none">
              <li className="mb-[10px]"><Link href="#" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Download</Link></li>
              <li className="mb-[10px]"><Link href="#" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Memory</Link></li>
              <li className="mb-[10px]"><Link href="#" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Sight</Link></li>
              <li className="mb-[10px]"><Link href="#" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Security</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-sans text-[11px] text-ink tracking-[0.18em] uppercase mb-[18px] font-bold">Resources</h5>
            <ul className="list-none">
              <li className="mb-[10px]"><Link href="#" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Whitepaper</Link></li>
              <li className="mb-[10px]"><Link href="#" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Labs</Link></li>
              <li className="mb-[10px]"><Link href="#" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">API</Link></li>
              <li className="mb-[10px]"><Link href="#" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Status</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--line)] pt-[22px] flex justify-between items-center font-sans text-[11px] tracking-[0.16em] uppercase text-ink-faint">
          <span><span className="w-[6px] h-[6px] rounded-full bg-coral inline-block mr-[6px] align-middle animate-pulse"></span>● <b className="text-ink font-semibold">KIBO</b> · Proprietary · 2026 / Early Access / Vol. 01</span>
          <span className="hidden md:inline-flex gap-[24px] items-center">
            <span>Distributed / Zero Space</span>
            <span>0.0000° N · 0.0000° E</span>
            <span className="text-coral font-semibold">♥ MMXXVI</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Modify `app/layout.tsx` to include shell components**

```tsx
import type { Metadata } from "next";
import { Inter, Inter_Tight, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SideRails } from "@/components/ui/SideRails";
import { Topbar } from "@/components/ui/Topbar";
import { StickyNav } from "@/components/ui/StickyNav";
import { Footer } from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-playfair" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "KIBO — A desktop companion that lives on your screen",
  description: "KIBO is a new class of interface—a persistent, reactive, and evolving digital companion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${interTight.variable} ${playfair.variable} ${jetbrains.variable} font-body`}>
        <SideRails />
        <div className="relative z-10 shell">
          <Topbar />
          <StickyNav />
          <main>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Commit**
Run: `git add components/ui/SideRails.tsx components/ui/Topbar.tsx components/ui/StickyNav.tsx components/ui/Footer.tsx app/layout.tsx && git commit -m "feat: implement shell layout components"`

---

### Task 4: Animation Components

**Files:**
- Create: `components/ui/Reveal.tsx`

- [ ] **Step 1: Write `components/ui/Reveal.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale" | "rise-lg";
  className?: string;
}

export function Reveal({ children, delay = 0, direction = "up", className = "" }: RevealProps) {
  const getVariants = () => {
    switch (direction) {
      case "left":
        return { hidden: { opacity: 0, x: -36, y: 0, scale: 1 }, visible: { opacity: 1, x: 0, y: 0, scale: 1 } };
      case "right":
        return { hidden: { opacity: 0, x: 36, y: 0, scale: 1 }, visible: { opacity: 1, x: 0, y: 0, scale: 1 } };
      case "scale":
        return { hidden: { opacity: 0, x: 0, y: 0, scale: 0.96 }, visible: { opacity: 1, x: 0, y: 0, scale: 1 } };
      case "rise-lg":
        return { hidden: { opacity: 0, x: 0, y: 64, scale: 0.985 }, visible: { opacity: 1, x: 0, y: 0, scale: 1 } };
      case "up":
      default:
        return { hidden: { opacity: 0, x: 0, y: 28, scale: 1 }, visible: { opacity: 1, x: 0, y: 0, scale: 1 } };
    }
  };

  return (
    <motion.div
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**
Run: `git add components/ui/Reveal.tsx && git commit -m "feat: add framer-motion Reveal component"`

---

### Task 5: Pages Implementation

**Files:**
- Modify: `app/page.tsx`
- Create: `app/about/page.tsx`
- Create: `app/capabilities/page.tsx`

- [ ] **Step 1: Write `app/page.tsx` (Hero & Global Ticker)**

```tsx
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <section className="relative p-0 min-h-[calc(100vh-140px)] flex flex-col items-stretch border-b border-[var(--line)] pt-[130px] sm:pt-[90px]">
        <div className="max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-[64px] mx-auto w-full flex-none">
          <div className="border-t border-[var(--line)] pt-[18px] mb-[48px] flex justify-between items-center font-sans text-[10.5px] tracking-[0.18em] uppercase text-ink-faint">
            <span className="font-serif italic text-coral text-[14px] tracking-[0.05em] normal-case">I.</span>
            <span className="inline-flex gap-[26px]">
              <span>Hero / Cover Plate</span>
              <span className="text-coral">•</span>
              <span>KIBO / Volume 01</span>
            </span>
            <span>001 / 008</span>
          </div>
        </div>
        <div className="max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-[64px] mx-auto w-full flex-auto relative grid grid-cols-1 md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] gap-[36px] items-stretch">
          <div className="py-[4vh] flex flex-col relative">
            <Reveal delay={0}>
              <span className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-coral inline-flex items-center gap-[12px] mb-[28px] before:content-[''] before:w-[18px] before:h-[1px] before:bg-coral before:inline-block">
                Persistent digital life <span className="text-ink-faint font-medium ml-1">· Nº 01</span>
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-sans font-extrabold tracking-[-0.028em] text-ink leading-none text-[clamp(44px,5vw,78px)] mb-[28px]">
                A companion that <em className="font-serif italic font-medium tracking-[-0.018em]">lives</em> with you, <em className="font-serif italic font-medium tracking-[-0.018em]">learns</em> from you, and <em className="font-serif italic font-medium tracking-[-0.018em]">evolves</em><span className="text-coral">.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="font-body text-[16px] leading-[1.55] text-ink-soft max-w-[38ch] mb-[30px]">
                The first desktop companion designed for deep integration. KIBO doesn&apos;t just wait for prompts—it watches, listens, and acts as a silent partner in your creative process. Built on the Atelier Zero editorial system.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="inline-flex items-center gap-[14px] mb-[38px]">
                <button className="inline-flex items-center gap-[12px] py-[14px] px-[22px] rounded-full font-sans text-[14px] font-medium tracking-[-0.005em] no-underline bg-coral text-white shadow-[0_14px_26px_-16px_rgba(237,111,92,1)] transition-transform hover:-translate-y-[1px] hover:bg-[#e25e4a]">
                  Join Waitlist
                  <span className="w-[16px] h-[16px] inline-flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] stroke-current fill-none stroke-[1.6px]"><path d="M5 19L19 5M19 5H8M19 5v11"/></svg>
                  </span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="border-b border-[var(--line)] py-[26px] pb-[28px] bg-paper relative overflow-hidden">
        <div className="max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-[64px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(180px,220px)_minmax(0,1fr)] gap-[32px] items-center">
          <div className="inline-flex items-center gap-[14px] md:border-r border-b md:border-b-0 border-[var(--line)] md:pr-[24px] pb-[12px] md:pb-0 min-h-0 md:min-h-[56px]">
            <div className="w-[22px] h-[22px] rounded-full border border-[var(--line)] inline-flex items-center justify-center shrink-0">
              <span className="w-[6px] h-[6px] rounded-full bg-coral inline-block animate-pulse"></span>
            </div>
            <div className="font-sans text-[11px] leading-[1.4] flex flex-col gap-[3px]">
              <b className="text-ink font-bold tracking-[0.18em] uppercase">Network Status</b>
              <span className="text-ink-faint text-[10px] tracking-[0.14em] uppercase">Live Contextual Loop</span>
            </div>
          </div>
          <div className="grid gap-[8px] min-w-0">
            <div className="overflow-hidden" style={{ WebkitMaskImage: "linear-gradient(90deg, transparent, black 5%, black 95%, transparent)" }}>
              <div className="inline-flex items-center gap-[36px] w-max whitespace-nowrap animate-marquee-x hover:[animation-play-state:paused]">
                {/* Simulated Ticker Content */}
                <span className="inline-flex items-baseline gap-[8px] font-sans text-[12px] tracking-[0.04em] text-ink-mute shrink-0">
                  <span className="text-coral text-[16px] leading-none relative -top-[1px] mr-[2px]">•</span>
                  <span className="font-mono text-[10.5px] text-ink-faint tracking-normal">35.6895° N, 139.6917° E</span>
                  <span className="uppercase tracking-[0.18em] text-ink font-medium">Tokyo Node</span>
                </span>
                <span className="inline-flex items-baseline gap-[8px] font-sans text-[12px] tracking-[0.04em] text-ink-mute shrink-0">
                  <span className="text-coral text-[16px] leading-none relative -top-[1px] mr-[2px]">•</span>
                  <span className="font-mono text-[10.5px] text-ink-faint tracking-normal">51.5074° N, 0.1278° W</span>
                  <span className="uppercase tracking-[0.18em] text-ink font-medium">London Hub</span>
                </span>
                {/* Duplicate for infinite effect */}
                 <span className="inline-flex items-baseline gap-[8px] font-sans text-[12px] tracking-[0.04em] text-ink-mute shrink-0">
                  <span className="text-coral text-[16px] leading-none relative -top-[1px] mr-[2px]">•</span>
                  <span className="font-mono text-[10.5px] text-ink-faint tracking-normal">35.6895° N, 139.6917° E</span>
                  <span className="uppercase tracking-[0.18em] text-ink font-medium">Tokyo Node</span>
                </span>
                <span className="inline-flex items-baseline gap-[8px] font-sans text-[12px] tracking-[0.04em] text-ink-mute shrink-0">
                  <span className="text-coral text-[16px] leading-none relative -top-[1px] mr-[2px]">•</span>
                  <span className="font-mono text-[10.5px] text-ink-faint tracking-normal">51.5074° N, 0.1278° W</span>
                  <span className="uppercase tracking-[0.18em] text-ink font-medium">London Hub</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Commit `app/page.tsx`**
Run: `git add app/page.tsx && git commit -m "feat: implement home page with hero and ticker"`

---

### Task 6: Asset Migration and Final Polish

**Files:**
- Command: `mkdir -p public/assets`
- Command: `cp -r Assets/* public/assets/`

- [ ] **Step 1: Move Assets**
Run: `mkdir -p public/assets && cp -r Assets/* public/assets/ || echo "Skipping if Assets doesn't exist"`

- [ ] **Step 2: Commit**
Run: `git add public/assets && git commit -m "chore: migrate assets to public folder"`

---

> **Note to executing agent:** Since the original HTML is vast (2590 lines), the subsequent pages (`/about`, `/capabilities`, `/labs`, `/method`, `/work`) should be implemented following the exact same structure as Task 5, adapting the HTML chunks from `KIBO.html` into JSX within their respective page components. They all share the same layout grid, typography classes, and `<Reveal>` wrapper logic.
