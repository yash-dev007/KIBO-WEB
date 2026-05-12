# KIBO Website Next.js Conversion Design Spec

## Overview
Conversion of the static `KIBO.html` landing page into a modern Next.js multi-page application. The goal is a 1:1 pixel-perfect visual match while restructuring the architecture for Next.js App Router, Tailwind CSS, shadcn/ui, and Framer Motion.

## 1. Setup & Styling
- **Framework**: Next.js 14+ (App Router), React, TypeScript.
- **Styling**: Tailwind CSS.
- **UI Components**: shadcn/ui (initialized, used where applicable, but primarily relying on custom Tailwind for the 1:1 match).
- **Animations**: Framer Motion.
- **Tailwind Configuration**: 
  - Extend theme with exact colors from original CSS variables: `--paper`, `--paper-warm`, `--paper-dark`, `--ink`, `--ink-soft`, `--ink-mute`, `--ink-faint`, `--coral`, `--coral-soft`, `--mustard`, `--olive`, `--bone`, `--line`, `--line-soft`, `--line-faint`.
  - Extend fonts: `sans` (Inter Tight, Inter), `serif` (Playfair Display), `mono` (JetBrains Mono).
  - Include custom shadows.
- **Global CSS**: Move the paper texture background (`body::before`) and root typography resets to `app/globals.css`.

## 2. Application Shell Architecture
The `app/layout.tsx` will act as the global application shell.
- **`<SideRails />`**: Left and right fixed borders with vertical text.
- **`<Topbar />`**: Top metadata strip.
- **`<StickyNav />`**: Headroom-style sticky navigation. Links will be updated to point to Next.js routes (`/about`, `/labs`, etc.) instead of anchor IDs.
- **`<Footer />`**: Global footer at the bottom of the layout.
- **`<main>`**: Container for individual page routes.

## 3. Pages & Routing Map
The single-page sections will be distributed across the following routes:
- `app/page.tsx` (Home): `<Hero />` section and `<GlobalTicker />` (Wire) marquee.
- `app/about/page.tsx`: `<AboutManifesto />` section.
- `app/capabilities/page.tsx`: `<CapabilitiesMatrix />` and feature `<Cards />`.
- `app/labs/page.tsx`: `<ExperimentsGrid />` and filtering pills.
- `app/method/page.tsx`: `<MemoryLoopSteps />`.
- `app/work/page.tsx`: `<CaseStudies />` and testimonial elements.

## 4. Components & Animation Strategy
- **Framer Motion `<Reveal>` Component**: Replaces the original vanilla JS `IntersectionObserver` scroll-reveal logic. It will accept props for delay and direction (e.g., `left`, `right`, `scale`, `rise-lg`) and map them to Framer Motion `variants` triggered via `whileInView` with `viewport={{ once: true, margin: "-8%" }}`.
- **Marquee Animation**: The infinite scrolling wire/ticker will be implemented using Tailwind CSS keyframes (`animate-marquee` and `animate-marquee-reverse`) to maintain performance and simplicity.
- **Assets**: Images currently in `./Assets/` will be moved to the Next.js `public/assets/` directory.

## 5. Scope & Constraints
- The implementation strictly focuses on parity with the provided HTML file. No new features, pages, or functional logic outside of the UI presentation will be added.
- shadcn/ui will be configured, but standard shadcn components will only be used if they don't break the 1:1 pixel-perfect requirement. Custom Tailwind classes take precedence.
