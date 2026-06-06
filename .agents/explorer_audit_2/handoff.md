# Handoff Report: GSAP & Performance Audit of KIBO WEB

## 1. Observation
We observed the following across the KIBO WEB codebase:
- **GSAP & ScrollTrigger Memory Leaks**:
  - `src/components/Navbar.jsx:112-119`: GSAP tween created in `useEffect` with no cleanup/revert function returned on unmount.
  - `src/components/Story.jsx:26-32, 39-45`: Event-driven GSAP tweens (`gsap.to`) on mouse-move and mouse-leave without unmount cleanup.
  - `src/components/VideoPreview.jsx:19-35, 42-56`: Event-driven and state-based GSAP tweens (`gsap.to`) without unmount cleanup.
  - `src/components/AnimatedTitle.jsx:11-35`: Uses standard `useEffect` with `gsap.context` but has an empty dependency array (`[]`), ignoring the `title` prop dependency.
- **Unnecessary React Re-renders**:
  - `src/components/Navbar.jsx:31, 92-109`: `useWindowScroll()` causes `NavBar` (and all its items) to re-render on every pixel scrolled.
  - `src/components/Footer.jsx:28-57, 248`: Interval-driven clock state `systemTime` (ticks 1s), telemetry state `telemetry` (ticks 1.5s), and text input state `cliInput` (keystroke updates) trigger re-renders of the entire massive footer.
  - `src/components/Features.jsx:8-22, 46-54`: `BentoTilt` sets state on every mousemove, causing card re-renders. `BentoCard` sets cursor state on every mousemove, causing whole card re-renders.
  - Missing memoization (`React.memo`) on reusable components (`Button`, `AnimatedTitle`, `BentoCard`, `BentoTilt`) and page sections (`About`, `Story`, `Contact`).
- **Layout Thrashing & Forced Reflows**:
  - `src/components/Story.jsx:16`, `src/components/VideoPreview.jsx:12`, `src/components/Features.jsx:11-12, 48`: Call `getBoundingClientRect()` inside high-frequency mousemove event handlers, triggering forced synchronous layout reflows while elements are actively being animated.
- **Bundle & Loading Size Issues**:
  - `src/index.css:1`: Render-blocking CDN stylesheet import (`@import url("https://fonts.cdnfonts.com/css/general-sans");`).
  - No code splitting or lazy loading for below-the-fold content (`Story`, `Contact`, `Footer`).
  - All 8 high-resolution video elements are loaded and autoplayed simultaneously on mount.

## 2. Logic Chain
1. *From GSAP lack of cleanup*: Active GSAP tweens and ScrollTriggers retain references to DOM elements in their global scheduler. When components unmount, if these are not explicitly killed/reverted, the DOM elements cannot be garbage-collected, creating memory leaks.
2. *From high-frequency state updates*: Updating state on every pixel scrolled (`useWindowScroll`), every mousemove (`BentoTilt`, `BentoCard`), or every second/1.5s/keystroke in a large component (`Footer`) forces React to constantly perform virtual DOM rendering and diffing. This causes high CPU usage and frame drops.
3. *From synchronous layout queries*: Reading layout properties like `getBoundingClientRect()` on an element while it is undergoing transition forces the browser to halt script execution, recalculate styles, and perform layout reflow immediately. Doing this at 60fps causes layout thrashing and scrolling stutter.
4. *From assets and CDNs*: Loading multiple video files simultaneously consumes substantial network bandwidth and memory. Loading blocking external fonts delays paint times (LCP/FCP) and violates offline-capabilities.

## 3. Caveats
- Real-time CPU/memory profiling (using Chrome DevTools Memory/Performance tab or React Profiler) was not executed. The analysis is based on static code patterns.
- We assumed the videos are stored in public folders and can be lazy preloaded or lazy loaded using standard web APIs.

## 4. Conclusion
The KIBO WEB codebase suffers from systematic performance issues:
1. Memory leaks due to un-killed GSAP tweens in `Navbar`, `Story`, and `VideoPreview`.
2. Stuttering and CPU overhead from high-frequency React re-renders (scroll and mousemove events) and massive component state scopes (Footer).
3. Frame drops from layout thrashing caused by high-frequency `getBoundingClientRect()` calls in mousemove event handlers.
4. Performance bottlenecks due to immediate loading of all video assets and a blocking CDN font import.

The proposed fixes in `analysis.md` isolate state changes into dedicated sub-components, cache layout dimensions on mouse-enter, utilize direct DOM manipulation for transitions, and introduce lazy loading.

## 5. Verification Method
- **To inspect**: Review the detailed code locations and proposed fix snippets in `D:\Projects\KIBO WEB\.agents\explorer_audit_2\analysis.md`.
- **To verify fix efficacy**:
  1. *GSAP cleanups*: Run `npm run dev` and open the Chrome DevTools Performance/Memory tab. Trigger multiple mounts and unmounts of sections (or page navigations if implemented) and check for detached DOM elements.
  2. *Re-renders*: Use the React Developer Tools "Highlight updates when components render" checkbox. Verify that moving the mouse over Bento cards or scrolling the page does not cause flashing green borders across the entire page/components.
  3. *Layout Thrashing*: Inspect the performance recording under the Chrome DevTools Performance tab. Look for red triangles showing "Forced Reflow" warning signs in mousemove and scroll handlers.
