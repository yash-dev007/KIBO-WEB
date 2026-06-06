## 2026-06-06T16:03:41Z
You are teamwork_preview_worker.
Your working directory is D:\Projects\KIBO WEB\.agents\worker_performance.
Your task is to implement React correctness, HTML validity, GSAP animation fixes, and performance improvements directly in the source files.

### MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

### Required Changes:

1. **Move Constants Out of Component Scope**:
   - In `src/components/Hero.jsx`, move `const videoIds = [1, 4];` and `const totalVideos = videoIds.length;` outside of the `Hero` component body to prevent recreation on every render.

2. **Fix GSAP hook dependencies and double triggers**:
   - In `src/components/Hero.jsx`, add a second argument configuration object `{ dependencies: [] }` or empty array to the second `useGSAP` hook (lines 74-90) to prevent duplicate ScrollTriggers on re-render.
   - In `src/components/About.jsx`, add a second argument configuration object `[]` or `{ dependencies: [] }` to the `useGSAP` hook (lines 10-27) to prevent duplicate ScrollTrigger registrations.

3. **JSX/HTML Nesting Violation**:
   - In `src/components/Navbar.jsx` (around line 215), change the `div` tags inside the indicator button `<button onClick={toggleAudioIndicator} ...>` to `span` tags with `display: inline-block` (Tailwind `inline-block`) to satisfy HTML specs.

4. **Eliminate Scroll State Redundant Re-renders**:
   - In `src/components/Navbar.jsx` (lines 23, 92-109), replace `lastScrollY` state with a React `useRef` (e.g. `lastScrollYRef = useRef(0)`). Update its value inside the scroll listener effect without calling state setters, completely removing the redundant second render on scroll.

5. **GSAP Tweens Cleanup / Memory Leaks**:
   - In `src/components/Navbar.jsx`, revert/kill the visibility tween inside the `useEffect` for `isNavVisible` by returning a cleanup function that calls `tween.kill()`.
   - In `src/components/VideoPreview.jsx`, add a `useEffect` cleanup function that calls `gsap.killTweensOf(sectionRef.current)` and `gsap.killTweensOf(contentRef.current)` on unmount.
   - In `src/components/Story.jsx`, add a `useEffect` cleanup function that calls `gsap.killTweensOf(frameRef.current)` on unmount.

6. **Layout Thrashing & Forced Reflows**:
   - In `src/components/Features.jsx` (`BentoTilt` and `BentoCard` components), `src/components/Story.jsx`, and `src/components/VideoPreview.jsx`, avoid calling `getBoundingClientRect()` inside high-frequency `onMouseMove` event handlers. Instead:
     - Keep a `rectRef = useRef(null)` to cache the bounding client rect.
     - On mouseenter or on the first move, query and store the rect: `if (!rectRef.current) rectRef.current = el.getBoundingClientRect()`.
     - Read dimensions from `rectRef.current` during subsequent mouse moves.
     - Clear the cache on mouse leave: `rectRef.current = null`.

7. **Footer Render Isolation (Performance)**:
   - In `src/components/Footer.jsx`, the intervals for clock, telemetry fluctuation, and keyboard entry cause re-rendering of the entire footer.
   - Refactor `Footer.jsx` by splitting it into smaller, isolated components (can be declared in the same file or new files) to restrict renders:
     - `TelemetryHUD`: encapsulates the telemetry state and interval, and updates a shared `telemetryRef.current`.
     - `SystemClock`: encapsulates the clock state and interval.
     - `TerminalCore`: encapsulates the terminal state (`terminalLogs`, `cliInput`) and command execution (which reads `telemetryRef.current` when `/status` is run).
     - The main `Footer` component should render these sub-components and only render once.

8. **Index.css Refactor**:
   - Remove the render-blocking external CDN import `@import url("https://fonts.cdnfonts.com/css/general-sans");` at the top of `src/index.css`.
   - Update body's CSS rule in `src/index.css` to use the local font: `font-family: "general", sans-serif;`.
   - Change `width: 100dvw;` on `body` to `width: 100%;` to prevent horizontal layout scrollbars on Windows/browsers.
   - Add `relative` class (or `@apply relative`) to `#clip` in `src/components/About.jsx` (line 50) so `.about-image` aligns correctly relative to its container.
