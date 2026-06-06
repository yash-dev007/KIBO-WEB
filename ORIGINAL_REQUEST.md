# Original User Request

## Initial Request — 2026-06-06T15:52:06Z

Perform a comprehensive code audit of an existing React + Vite + GSAP + Tailwind CSS website for "KIBO" — a desktop AI companion product landing page. Identify all code quality issues, logic bugs, performance problems, accessibility gaps, security risks, and cross-browser compatibility issues. Fix every issue found directly in the source files.

Working directory: D:\Projects\KIBO WEB
Integrity mode: development

The project is a single-page React application with these key files:
- `src/App.jsx` — Root component composing all sections
- `src/main.jsx` — React entry point
- `src/index.css` — Global styles, Tailwind layers, custom animations
- `src/components/Hero.jsx` — Hero section with video cycling and GSAP scroll animations
- `src/components/Navbar.jsx` — Floating navbar with scroll hide/show, IntersectionObserver, audio playback, mobile drawer
- `src/components/About.jsx` — About section with GSAP clip-path animation
- `src/components/Features.jsx` — Bento grid with tilt effects and video cards
- `src/components/Story.jsx` — Floating image with 3D mouse-follow effect
- `src/components/Contact.jsx` — Contact section with animated title
- `src/components/Footer.jsx` — Interactive CLI terminal, live telemetry, system clock
- `src/components/Button.jsx` — Reusable button with hover text animation
- `src/components/AnimatedTitle.jsx` — Scroll-triggered word-by-word title animation
- `src/components/VideoPreview.jsx` — 3D parallax video preview on hover
- `index.html` — HTML entry point
- `tailwind.config.js` — Custom theme (fonts, colors)

Technology stack: React 18, Vite 6, GSAP 3 with ScrollTrigger, Tailwind CSS 3, react-use, react-icons, clsx.

## Requirements

### R1. Comprehensive Bug & Quality Audit
Audit every component file for: logic bugs (incorrect conditionals, wrong state transitions, broken user interactions), dead code (unused variables, unreachable branches, unused imports), React anti-patterns (missing cleanup in effects, stale closures, missing dependency array items, improper ref usage), invalid HTML (nesting violations, missing attributes), and any runtime errors or edge cases.

### R2. Performance Audit
Identify unnecessary re-renders, missing React memoization opportunities, GSAP animations that don't clean up on unmount (memory leaks), large bundle contributors, and any layout thrashing or forced reflows in mouse-move handlers.

### R3. Accessibility & Cross-Browser Audit
Check for missing ARIA attributes on interactive elements (buttons, links, nav), keyboard navigation gaps, missing focus management in the mobile drawer, videos missing `playsInline` for iOS Safari, and any responsive layout issues on small viewports.

### R4. Security Review
Audit uses of `dangerouslySetInnerHTML`, external link safety (`rel="noopener noreferrer"`), and any patterns that could become XSS vectors if content sources change in the future.

### R5. Fix All Issues In-Place
Every identified issue must be fixed directly in the source files. No issue should be left as a TODO comment. After all fixes, the project must build successfully with `npx vite build` and produce zero console warnings in the build output.

## Acceptance Criteria

### Build Health
- [ ] `npx vite build` completes with zero errors and zero warnings
- [ ] No unused imports remain in any component file

### React Correctness
- [ ] All `useEffect` hooks that create subscriptions, observers, or timers have proper cleanup functions
- [ ] No stale closure bugs in effect cleanup functions (refs captured before cleanup)
- [ ] All `useEffect` dependency arrays are complete and correct
- [ ] No `<div>` elements nested inside `<span>` or other inline elements

### GSAP & Animation
- [ ] All GSAP animations created in `useEffect` are reverted/killed on unmount
- [ ] ScrollTrigger instances are properly cleaned up
- [ ] No animation-related memory leaks on component unmount

### Accessibility
- [ ] All `<button>` elements have accessible labels (visible text or `aria-label`)
- [ ] The mobile navigation drawer can be closed with the Escape key
- [ ] All external links have `rel="noopener noreferrer"`

### Cross-Browser
- [ ] All autoplay `<video>` elements have both `muted` and `playsInline` attributes
- [ ] The site builds and renders without errors across modern browsers

### Audit Trail
- [ ] A summary markdown file is produced listing every issue found, its severity, the file/line, and the fix applied
