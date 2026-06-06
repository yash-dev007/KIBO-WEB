# KIBO WEB Codebase Audit: GSAP, React Re-renders, Layout Thrashing & Performance

This report presents the findings of a comprehensive code audit of the KIBO WEB codebase, focusing specifically on GSAP animations, React re-renders, layout thrashing, and bundle/loading optimizations.

---

## 1. GSAP & ScrollTrigger Cleanups & Memory Leaks

### Findings
GSAP animations and ScrollTriggers maintain references to DOM elements in their global engine. When React components unmount, any active animations must be reverted or killed. Otherwise, the DOM nodes are kept in memory, resulting in memory leaks.

#### Issue 1.1: Missing Cleanup in `src/components/Navbar.jsx`
* **Observation**: The navbar has a GSAP transition for show/hide behavior on scroll, but no cleanup function is returned by the `useEffect` hook.
* **Location**: `src/components/Navbar.jsx:112-119`
* **Verbatim Code**:
  ```javascript
  // GSAP animation for visibility state
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.25,
      ease: "power2.out"
    });
  }, [isNavVisible]);
  ```
* **Proposed Fix**: Use the `@gsap/react` hook `useGSAP` instead of `useEffect`, or add a cleanup function to kill active tweens on the element:
  ```javascript
  useEffect(() => {
    const tween = gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.25,
      ease: "power2.out"
    });
    return () => {
      tween.kill();
    };
  }, [isNavVisible]);
  ```

#### Issue 1.2: Missing Cleanup for Mouse-Move Tweens in `src/components/Story.jsx`
* **Observation**: Mouse-move interactive 3D rotation tweens are created dynamically inside `handleMouseMove` and `handleMouseLeave`. There is no cleanup logic upon component unmount.
* **Location**: `src/components/Story.jsx:10-46`
* **Verbatim Code**:
  ```javascript
  const handleMouseMove = (e) => {
    ...
    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };
  ```
* **Proposed Fix**: Register a cleanup effect that kills all tweens on `frameRef.current` when the component unmounts:
  ```javascript
  useEffect(() => {
    return () => {
      if (frameRef.current) {
        gsap.killTweensOf(frameRef.current);
      }
    };
  }, []);
  ```

#### Issue 1.3: Missing Cleanup for Mouse-Move Tweens in `src/components/VideoPreview.jsx`
* **Observation**: GSAP animations are created on hover and mousemove events but are never killed or reverted on unmount.
* **Location**: `src/components/VideoPreview.jsx:11-58`
* **Verbatim Code**:
  ```javascript
  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    ...
    gsap.to(sectionRef.current, { ... });
    gsap.to(contentRef.current, { ... });
  };
  ```
* **Proposed Fix**: Add a cleanup function to kill tweens of `sectionRef` and `contentRef` on unmount:
  ```javascript
  useEffect(() => {
    return () => {
      gsap.killTweensOf([sectionRef.current, contentRef.current]);
    };
  }, []);
  ```

#### Issue 1.4: Missing/Incorrect Dependencies in `src/components/AnimatedTitle.jsx`
* **Observation**: The `AnimatedTitle` component uses a standard `useEffect` with `gsap.context` to trigger the word-by-word animation. The dependencies array is empty (`[]`), but it depends on the `title` prop. If the `title` changes dynamically, the animation context will not recreate, targeting obsolete or detached elements.
* **Location**: `src/components/AnimatedTitle.jsx:11-35`
* **Verbatim Code**:
  ```javascript
  useEffect(() => {
    const ctx = gsap.context(() => {
      ...
    }, containerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);
  ```
* **Proposed Fix**: Include `title` in the dependency array (or use `useGSAP` with dependency array) so the animation context is rebuilt if the title changes:
  ```javascript
  useEffect(() => {
    const ctx = gsap.context(() => {
      ...
    }, containerRef);

    return () => ctx.revert();
  }, [title]);
  ```

---

## 2. React Re-renders & Memoization Opportunities

### Findings
High-frequency events (scrolling, mouse movement, intervals) are triggering global state updates, forcing extensive virtual DOM tree diffing and unnecessary child component re-renders.

#### Issue 2.1: Re-render Storm on Scroll in `src/components/Navbar.jsx`
* **Observation**: `useWindowScroll()` updates `currentScrollY` state on *every single pixel scrolled*. This forces the entire `<NavBar>` component and all its children to re-render constantly. Furthermore, `setLastScrollY` is called inside the scroll effect, triggering an additional state update.
* **Location**: `src/components/Navbar.jsx:31, 91-109`
* **Verbatim Code**:
  ```javascript
  const { y: currentScrollY } = useWindowScroll();
  ...
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsNavVisible(true);
      return;
    }
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav", ...);
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav", ...);
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav", ...);
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY, isMobileMenuOpen]);
  ```
* **Proposed Fix**:
  1. Remove `useWindowScroll()` and the `currentScrollY` state.
  2. Implement a local passive scroll listener using a ref to store the scroll position without triggering re-renders.
  3. Only trigger a state update (`setIsNavVisible` and `isFloating`) when the visibility status actually changes.
  ```javascript
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isFloating, setIsFloating] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) return;
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setIsNavVisible(true);
        setIsFloating(false);
      } else if (currentScrollY > lastScrollYRef.current) {
        setIsNavVisible(false);
        setIsFloating(true);
      } else if (currentScrollY < lastScrollYRef.current) {
        setIsNavVisible(true);
        setIsFloating(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);
  ```

#### Issue 2.2: Continuous Clock & Telemetry Re-renders in `src/components/Footer.jsx`
* **Observation**: The `<Footer>` component contains states for a system clock (`systemTime`, updating every 1s) and system telemetry (`telemetry`, updating every 1.5s). In addition, it controls the CLI terminal input (`cliInput` state). When the user types or the clock/telemetry updates, the *entire* large `<Footer>` component (links, SVGs, grid panels, CTA blocks) is forced to re-render.
* **Location**: `src/components/Footer.jsx:21-57, 248`
* **Verbatim Code**:
  ```javascript
  const [cliInput, setCliInput] = useState("");
  const [telemetry, setTelemetry] = useState({ cpu: 0.08, ... });
  const [systemTime, setSystemTime] = useState("");
  ```
* **Proposed Fix**: Extract the dynamic widgets into small, isolated sub-components so state changes only affect the DOM nodes that actually change:
  1. **`<SystemClock>`**: Encapsulates the clock state and interval.
  2. **`<TelemetryHUD>`**: Encapsulates the telemetry state and interval.
  3. **`<TerminalShell>`**: Encapsulates the terminal logs and input text states.
  4. The parent `<Footer>` component will remain completely static and won't re-render.

#### Issue 2.3: Re-renders on MouseMove in `src/components/Features.jsx`
* **Observation**:
  - `BentoTilt` sets state `transformStyle` on every mousemove, causing the tilt card and all its contents (including high-resolution video elements) to re-render at 60fps.
  - `BentoCard` sets state `cursorPosition` on mousemove to draw a radial gradient overlay, causing the entire card to re-render.
* **Location**: `src/components/Features.jsx:8-22, 46-54`
* **Verbatim Code**:
  ```javascript
  // BentoTilt:
  const handleMouseMove = (event) => {
    ...
    setTransformStyle(newTransform);
  };

  // BentoCard:
  const handleMouseMove = (event) => {
    ...
    setCursorPosition({ x: event.clientX - rect.left, y: ... });
  };
  ```
* **Proposed Fix**:
  1. **For `BentoTilt`**: Remove `transformStyle` state. Instead, use a ref to manipulate the style of `itemRef.current` directly in the event handler:
     ```javascript
     const handleMouseMove = (event) => {
       if (!itemRef.current) return;
       // calculation ...
       itemRef.current.style.transform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
     };
     ```
  2. **For `BentoCard`**: Remove `cursorPosition` state. Set CSS variables directly on the button ref inside `handleMouseMove`:
     ```javascript
     const handleMouseMove = (event) => {
       if (!hoverButtonRef.current) return;
       const rect = hoverButtonRef.current.getBoundingClientRect();
       const x = event.clientX - rect.left;
       const y = event.clientY - rect.top;
       hoverButtonRef.current.style.setProperty("--mouse-x", `${x}px`);
       hoverButtonRef.current.style.setProperty("--mouse-y", `${y}px`);
     };
     ```
     Use the variables in CSS: `radial-gradient(100px circle at var(--mouse-x) var(--mouse-y), #656fe288, #00000026)`.

#### Issue 2.4: Missing Component Memoization (`React.memo`)
* **Observation**: Several components are pure presentation or stateless and receive identical props over time, yet they re-render when their parent does:
  - `Button` in `src/components/Button.jsx`
  - `AnimatedTitle` in `src/components/AnimatedTitle.jsx`
  - `BentoCard` and `BentoTilt` in `src/components/Features.jsx`
  - Sections (`About`, `Story`, `Contact`) in `src/App.jsx`
* **Proposed Fix**: Wrap these components in `React.memo` to skip virtual DOM rendering when props are unchanged.

---

## 3. Layout Thrashing & Forced Reflows

### Findings
Calling `getBoundingClientRect()` inside high-frequency mouse-move event handlers causes the browser to perform synchronous layout recalculations. Since the elements are being styled/transformed in the same frames, this creates layout thrashing.

#### Issue 3.1: Forced Layout on MouseMove in `src/components/Story.jsx`
* **Observation**: `getBoundingClientRect()` is called on every single pixel of mouse movement to compute the 3D rotation angles.
* **Location**: `src/components/Story.jsx:16`
* **Verbatim Code**:
  ```javascript
  const handleMouseMove = (e) => {
    ...
    const rect = element.getBoundingClientRect(); // READ
    const xPos = clientX - rect.left;
    ...
    gsap.to(element, { ... rotateX, rotateY ... }); // WRITE
  ```
* **Proposed Fix**: Cache the bounding rect of the element on `mouseenter` (when the mouse enters the image) or first move, store it in a ref `rectRef.current`, and use the cached coordinates during mousemove:
  ```javascript
  const rectRef = useRef(null);

  const handleMouseEnter = (e) => {
    rectRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (e) => {
    if (!rectRef.current) {
      rectRef.current = e.currentTarget.getBoundingClientRect();
    }
    const rect = rectRef.current;
    const xPos = e.clientX - rect.left;
    ...
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    ...
  };
  ```

#### Issue 3.2: Forced Layout on MouseMove in `src/components/VideoPreview.jsx`
* **Observation**: The bounding rect is retrieved on every mousemove, which triggers a reflow. Additionally, since the element is being translated (`x` and `y`), its bounding rect values (`left`, `top`) are shifting, causing arithmetic feedback jitter.
* **Location**: `src/components/VideoPreview.jsx:12`
* **Verbatim Code**:
  ```javascript
  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const rect = currentTarget.getBoundingClientRect();
    ...
  ```
* **Proposed Fix**: Cache the rect on mouse enter, when the container is in its rest position, preventing reflows during active translation.

#### Issue 3.3: Forced Layout on MouseMove in `src/components/Features.jsx`
* **Observation**: Both `BentoTilt` and `BentoCard` perform `getBoundingClientRect` reads on every mousemove.
* **Location**: `src/components/Features.jsx:12, 48`
* **Proposed Fix**: Cache the bounding rect in a ref on `mouseenter` (or `mouseenter` of the specific hover button) and clear it on `mouseleave`.

---

## 4. Bundle Size & Asset Loading Optimization

### Findings
The application bundles all sections and loads and plays all video assets upfront, causing high network usage, memory allocation, and CPU/GPU cycles during initialization.

#### Issue 4.1: Render-blocking External Font CDN Import
* **Observation**: The main stylesheet imports a font family from an external CDN (`fonts.cdnfonts.com`), which is a render-blocking request and hinders offline functionality.
* **Location**: `src/index.css:1`
* **Verbatim Code**:
  ```css
  @import url("https://fonts.cdnfonts.com/css/general-sans");
  ```
* **Proposed Fix**: Self-host the General Sans font family alongside the other fonts in `/fonts/`, defining local `@font-face` blocks to eliminate remote network dependencies.

#### Issue 4.2: Lack of Component-Level Code Splitting
* **Observation**: The entire landing page is loaded in a single main bundle. Components like `Story`, `Contact`, and `Footer` which are located further down the page are loaded immediately.
* **Proposed Fix**: Implement component lazy loading with `React.lazy` and `Suspense` for below-the-fold content:
  ```javascript
  import React, { Suspense } from "react";
  const Story = React.lazy(() => import("./components/Story"));
  const Contact = React.lazy(() => import("./components/Contact"));
  const Footer = React.lazy(() => import("./components/Footer"));

  function App() {
    return (
      <main className="...">
        ...
        <Suspense fallback={<div className="h-96 bg-black" />}>
          <Story />
          <Contact />
          <Footer />
        </Suspense>
      </main>
    );
  }
  ```

#### Issue 4.3: Unoptimized Video Loading & Autoplay
* **Observation**: There are 8 video elements in total (`Hero.jsx` has 3, `Features.jsx` has 5 bento-cards). All of them load and autoplay on page load, which consumes huge amounts of user bandwidth and GPU memory.
* **Proposed Fix**:
  1. Set `preload="none"` or `preload="metadata"` for videos that are not currently active (e.g. background/fallback videos).
  2. Implement video lazy-loading so that a video is only rendered/played when the parent section enters the viewport (using an `IntersectionObserver` or a scroll-based activation hook).
  3. Ensure all video assets are highly compressed (e.g., encoded with Handbrake/FFmpeg) and provided in WebM format as a fallback to minimize payload sizes.
