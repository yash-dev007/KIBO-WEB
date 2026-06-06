# KIBO WEB Code Audit Report — 2026-06-06

This document contains the findings of a comprehensive code audit of the KIBO WEB codebase, focusing on **React Correctness**, **Code Quality**, and **HTML/JSX Nesting** issues.

---

## Executive Summary
The code audit of the KIBO WEB codebase identified several critical React and GSAP correctness issues, including **re-running GSAP ScrollTriggers on every render** (causing memory leaks), **HTML validation violations** (nesting block-level `div` elements inside `<button>`), **redundant double renders on scroll**, and **missing animation cleanup functions**. Resolving these issues will significantly improve performance, stability, and standards compliance.

---

## Detailed Findings & Proposed Fixes

### 1. Missing useGSAP Dependency Arrays (Memory Leaks)
* **Location 1**: `src/components/Hero.jsx` (line 74-90)
* **Location 2**: `src/components/About.jsx` (line 10-27)
* **Description**: In both files, the `useGSAP` hook is used without a second argument (dependency array or config object). By default, `useGSAP` without dependencies executes on *every single render*.
  - In `Hero.jsx`, the component re-renders multiple times as the `loadedVideos` state increments (on video load). This causes the `useGSAP` effect to re-run and register multiple duplicate `ScrollTrigger` instances on `#video-frame`.
  - In `About.jsx`, a parent re-render will cause the component to recreate its timeline and ScrollTrigger.
  This leads to heavy memory leaks, scroll jittering, and overlapping animations.
* **Proposed Fix**: Add an empty dependency array `[]` (or a config object `{ dependencies: [] }`) as the second argument to ensure it only runs once on mount.

#### Before (Hero.jsx:74):
```javascript
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    // ... GSAP timeline code
  });
```

#### After (Hero.jsx:74):
```javascript
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    // ... GSAP timeline code
  }, []); // Added dependency array to run only once on mount
```

---

### 2. HTML/JSX Nesting Violation (`div` inside `button`)
* **Location**: `src/components/Navbar.jsx` (lines 204-226)
* **Description**: The audio playing indicator button contains nested `div` tags representing indicator lines:
  ```html
  <button onClick={toggleAudioIndicator} className="...">
    <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop />
    {[1, 2, 3, 4].map((bar) => (
      <div key={bar} className={clsx("indicator-line ...")} />
    ))}
  </button>
  ```
  Nesting block-level elements (`<div>`) inside an inline-interactive element like `<button>` violates W3C HTML specifications. This causes hydration warnings, accessibility validation failures, and potential rendering inconsistencies across browsers.
* **Proposed Fix**: Change the inner `div` tags to `span` tags with an `inline-block` display style. Since the button uses flexbox (`flex items-center`), changing the element type will not affect layout or styling but will align with HTML validation standards.

#### Before (Navbar.jsx:215):
```javascript
    {[1, 2, 3, 4].map((bar) => (
      <div
        key={bar}
        className={clsx("indicator-line !bg-cyan-400 group-hover:!bg-white", {
          active: isIndicatorActive,
        })}
        style={{
          animationDelay: `${bar * 0.1}s`,
        }}
      />
    ))}
```

#### After (Navbar.jsx:215):
```javascript
    {[1, 2, 3, 4].map((bar) => (
      <span
        key={bar}
        className={clsx("indicator-line inline-block !bg-cyan-400 group-hover:!bg-white", {
          active: isIndicatorActive,
        })}
        style={{
          animationDelay: `${bar * 0.1}s`,
        }}
      />
    ))}
```

---

### 3. Redundant Double Renders on Scroll
* **Location**: `src/components/Navbar.jsx` (lines 92-109)
* **Description**: The floating navbar visibility effect updates and depends on `lastScrollY` state:
  ```javascript
  const [lastScrollY, setLastScrollY] = useState(0);
  // ...
  useEffect(() => {
    // ... visibility comparison logic
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY, isMobileMenuOpen]);
  ```
  Because `lastScrollY` is part of the state and included in the dependency array, calling `setLastScrollY(currentScrollY)` updates the state, triggering an additional component render and re-running the effect. On this second run, `currentScrollY === lastScrollY`, which terminates, but still causes a duplicate render for every single scroll event.
* **Proposed Fix**: Replace the `lastScrollY` state with a mutable ref `lastScrollYRef = useRef(0)`. We can compare and update it synchronously inside the effect without triggering re-renders, and remove it from the dependency array.

#### Before (Navbar.jsx:23 & 92):
```javascript
  const [lastScrollY, setLastScrollY] = useState(0);
  // ...
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

#### After (Navbar.jsx:23 & 92):
```javascript
  const lastScrollYRef = useRef(0);
  // ...
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsNavVisible(true);
      return;
    }
    const lastScrollY = lastScrollYRef.current;
    
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav", "backdrop-blur-md", "bg-black/40", "border-cyan-500/10");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav", "backdrop-blur-md", "bg-black/40", "border-cyan-500/10");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav", "backdrop-blur-md", "bg-black/40", "border-cyan-500/10");
    }

    lastScrollYRef.current = currentScrollY;
  }, [currentScrollY, isMobileMenuOpen]); // Removed lastScrollY state dependency
```

---

### 4. Missing GSAP Animation Cleanup in Effects
* **Location 1**: `src/components/Navbar.jsx` (lines 112-119)
* **Location 2**: `src/components/VideoPreview.jsx` (lines 39-58)
* **Description**: These effects run GSAP animations (`gsap.to(...)`) in response to state changes (`isNavVisible` and `isHovering`) but do not clean them up on unmount or when dependencies change. If the component unmounts during animation, the tween will continue running and attempt to modify properties of a detached DOM element, causing memory leaks and console errors.
* **Proposed Fix**: Revert/kill the active GSAP animations. Since `@gsap/react` is already a project dependency, replacing `useEffect` with the `useGSAP` hook will automatically clean up the tweens.

#### Before (Navbar.jsx:112):
```javascript
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.25,
      ease: "power2.out"
    });
  }, [isNavVisible]);
```

#### After (Navbar.jsx:112):
```javascript
  useGSAP(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.25,
      ease: "power2.out"
    });
  }, [isNavVisible]); // useGSAP automatically handles unmount and update cleanup
```

---

### 5. Missing / Incomplete Effect Dependency Arrays
* **Location 1**: `src/components/Hero.jsx` (line 47-72)
* **Location 2**: `src/components/AnimatedTitle.jsx` (line 11-35)
* **Description**:
  - In `Hero.jsx`, `useGSAP` references `hasClicked` in its body, but only has `[currentIndex]` in dependencies. While they change in the same click handler, omitting it is a React Hooks rule violation.
  - In `AnimatedTitle.jsx`, `useEffect` animates elements based on the `title` prop but has an empty dependency array `[]`. If `title` changes dynamically, the DOM elements update, but the animation timeline is not recreated for the new elements.
* **Proposed Fix**: Include all referenced props and state variables in the dependencies.

#### Before (AnimatedTitle.jsx:11):
```javascript
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation timeline definition
    }, containerRef);

    return () => ctx.revert();
  }, []);
```

#### After (AnimatedTitle.jsx:11):
```javascript
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation timeline definition
    }, containerRef);

    return () => ctx.revert();
  }, [title]); // Added title dependency to recreate animations if title changes
```

---

### 6. Array Recreated in Render Loop
* **Location**: `src/components/Hero.jsx` (lines 19-20)
* **Description**: `videoIds` is declared as an array `[1, 4]` directly inside the `Hero` component body. This causes a new array reference to be allocated on every single render of `Hero`, which is a code quality and memory allocation concern.
* **Proposed Fix**: Move `videoIds` (and derived `totalVideos`) outside of the component scope since they are static.

#### Before (Hero.jsx:12):
```javascript
const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const videoIds = [1, 4];
  const totalVideos = videoIds.length;
  // ...
```

#### After (Hero.jsx:12):
```javascript
const videoIds = [1, 4];
const totalVideos = videoIds.length;

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  // ...
```
