# Project: KIBO WEB Audit & Implementation
# Scope: Global Audit & Bug Fixes

## Architecture
- React + Vite Single Page Application.
- Interactive animations using GSAP (GreenSock Animation Platform) and ScrollTrigger.
- Styled using Tailwind CSS.
- Responsive structure with dynamic video playback and custom interactive components.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Audit & planning | Perform static analysis and audit to locate all bugs in components. | None | DONE |
| 2 | M2: React & HTML fixes | Clean up JSX tags nesting, fix effect dependency arrays, add effect cleanup logic, eliminate stale closures, remove unused imports. | M1 | DONE |
| 3 | M3: GSAP animation fixes | Implement clean reversion/cleanup for GSAP/ScrollTrigger instances to prevent memory leaks. | M2 | DONE |
| 4 | M4: Accessibility fixes | Add appropriate ARIA labels, enable keyboard escape and trap focus for drawer component. | M2 | DONE |
| 5 | M5: Video & Cross-browser fixes | Ensure playsInline, muted, loop attributes are set; fix layout issues across viewports. | M2 | DONE |
| 6 | M6: E2E Verification & Report | Run vite build, ensure zero console errors/warnings, and compile the final Audit Trail Report. | M2, M3, M4, M5 | IN_PROGRESS (Conv: 04de675f) |

## Interface Contracts
- Standard React component properties and interfaces must be preserved.
- No breaking changes in external API contracts or structure.

## Code Layout
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
