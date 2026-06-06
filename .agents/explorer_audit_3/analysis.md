# KIBO WEB Codebase Audit Report
**Scope**: Accessibility, Security, and Cross-Browser/Viewport Compatibility
**Date**: 2026-06-06

---

## 1. Accessibility (ARIA & Semantics)
We identified several critical and minor accessibility gaps across interactive elements and image tags.

### A. Floating Navbar & Mobile Menu (`src/components/Navbar.jsx`)
*   **Issue 1: Logo branding link lacks an accessible name.**
    *   *Observation*: The anchor at `Navbar.jsx:167` wraps only an `<img src="/img/logo.png" alt="logo" />`. Although the image has an `alt` tag, the anchor tag itself does not have a descriptive title or `aria-label`.
    *   *Impact*: Screen readers will read "link, image logo", which is generic.
    *   *Proposed Fix*: Add `aria-label="KIBO Home"` to the anchor.
*   **Issue 2: Audio toggle indicator button lacks keyboard feedback.**
    *   *Observation*: The button at `Navbar.jsx:204` toggles the background audio. It uses a `title` attribute for tooltips but lacks `aria-label` and `aria-pressed`.
    *   *Impact*: Screen readers might ignore the `title` attribute. Without `aria-pressed`, blind or low-vision users won't know if the music state is active.
    *   *Proposed Fix*: Add `aria-label={isAudioPlaying ? "Mute Background Score" : "Play Background Score"}` and `aria-pressed={isAudioPlaying}` to the button.
*   **Issue 3: Mobile hamburger toggle button lacks state descriptions.**
    *   *Observation*: The button at `Navbar.jsx:229` has no ARIA roles or state mapping.
    *   *Impact*: Users cannot tell if clicking it opens or closes a modal/drawer.
    *   *Proposed Fix*: Add `aria-expanded={isMobileMenuOpen}`, `aria-controls="mobile-nav-drawer"`, and `aria-label={isMobileMenuOpen ? "Close main navigation menu" : "Open main navigation menu"}`.
*   **Issue 4: Mobile drawer wrapper is not semantic.**
    *   *Observation*: The drawer container at `Navbar.jsx:247` is a standard `div` with styling but lacks semantic ARIA roles.
    *   *Impact*: The browser accessibility tree does not treat it as a modal dialog.
    *   *Proposed Fix*: Add `id="mobile-nav-drawer"`, `role="dialog"`, `aria-modal="true"`, and `aria-label="Mobile Navigation Deck"`.
*   **Issue 5: Missing active states for navigation anchors.**
    *   *Observation*: Active sections are visually highlighted, but this status is not communicated to the accessibility tree.
    *   *Proposed Fix*: Add `aria-current={isActive ? "page" : undefined}` on both desktop (`Navbar.jsx:180`) and mobile (`Navbar.jsx:263`) links.

### B. Interactive Terminal & Actions (`src/components/Footer.jsx`)
*   **Issue 6: Terminal input lacks a label.**
    *   *Observation*: The input at `Footer.jsx:246` has `placeholder="Type /help..."` but lacks an associated `<label>` or `aria-label`.
    *   *Impact*: Screen readers will not describe the purpose of the input field.
    *   *Proposed Fix*: Add `aria-label="KIBO Interface Terminal Command Input"` to the input tag.
*   **Issue 7: Clear input button lacks an accessible name.**
    *   *Observation*: The button at `Footer.jsx:255` renders only a `FaTimes` close icon.
    *   *Impact*: Screen readers read "button" without indicating it clears input.
    *   *Proposed Fix*: Add `aria-label="Clear input"` to the button.
*   **Issue 8: Scroll-to-top button lacks an accessible name.**
    *   *Observation*: The button at `Footer.jsx:434` renders a `TiLocationArrow` icon and a tooltip, but lacks an `aria-label`.
    *   *Proposed Fix*: Add `aria-label="Scroll to top of page"`.
*   **Issue 9: Quick command buttons lack action descriptions.**
    *   *Observation*: Quick command pills at `Footer.jsx:267-291` lack descriptions.
    *   *Proposed Fix*: Add `aria-label="Run command /help"`, etc.

### C. Image Alt Attributes
*   **Issue 10: Ineffective alt tags.**
    *   *Observation*:
        *   `About.jsx:54`: `<img ... alt="Background" />` is decorative. Screen readers will read "Background". It should have `alt=""` or `role="presentation"`.
        *   `Contact.jsx:6`: `<img ... alt="Contact Graphic" />` is hardcoded. Since it is rendered inside a reusable `ImageClipBox` wrapper, all three graphics in the Contact section have the same alt text.
        *   `Navbar.jsx:168`: `<img ... alt="logo" />` is generic. Should be `alt="Kibo Logo"`.
        *   `Story.jsx:71`: `<img ... alt="entrance.webp" />` uses the filename. Screen readers will read "entrance dot webp".
    *   *Proposed Fixes*:
        *   Change `About.jsx` image to `alt=""` and `role="presentation"`.
        *   Pass `alt` as a prop to `ImageClipBox` in `Contact.jsx` and specify descriptive labels (e.g. `"KIBO cybernetic warrior asset"`).
        *   Change logo alt to `"KIBO Logo"`.
        *   Change `Story.jsx` image alt to `"Hyperion core system chamber entrance"`.

---

## 2. Keyboard Navigation & Mobile Drawer Gaps (`src/components/Navbar.jsx`)
We found significant accessibility barriers when navigating the mobile drawer menu via keyboard.

### A. Gaps Found
1.  **Tabbing to Invisible Links (Focus Leak):**
    *   When the mobile menu is closed, it has styling `opacity-0 scale-y-0 pointer-events-none`. Because it remains in the DOM and is not set to `display: none` or `visibility: hidden`, a keyboard user pressing Tab will still navigate through the links inside the invisible drawer. The focus indicator will disappear from view.
2.  **No Focus Trapping:**
    *   When the mobile drawer is open, a user can press Tab at the last link and focus elements in the main body (behind the menu). Focus should be trapped inside the drawer structure until it is closed.
3.  **Missing Escape Key Handler:**
    *   Keyboard users cannot close the drawer by pressing the `Escape` key, which is standard accessibility behavior for modals and drawers.
4.  **Body Scroll Leak:**
    *   When the mobile menu is open, touch movements or scroll wheel interactions can still scroll the main page contents in the background, leading to layout shifts and scroll misalignment.

### B. Proposed Fix Strategy
To resolve these issues, we propose updating `Navbar.jsx` with:
1.  **Tailwind visibility control**: Update the closed drawer style to use `invisible` (`visibility: hidden`). This automatically prevents keyboard focus on all children when the drawer is closed.
2.  **Focus Trap & Escape Key Listener**: Create a `useEffect` inside `Navbar.jsx` that listens for `keydown` events when `isMobileMenuOpen` is true, intercepts Tab key presses to cycle focus, and intercepts the Escape key to close the drawer.
3.  **Scroll Lock**: Toggle `overflow: hidden` on the document body when the drawer opens.

#### Proposed Implementation Code:
```javascript
// Add refs in NavBar component:
const drawerRef = useRef(null);
const toggleButtonRef = useRef(null);

// Effect for Keyboard trapping, Escape key, and Scroll Lock
useEffect(() => {
  if (!isMobileMenuOpen) return;

  // 1. Lock Body Scroll
  const originalStyle = window.getComputedStyle(document.body).overflow;
  document.body.style.overflow = "hidden";

  // 2. Focus trapping & Escape key logic
  const handleKeyDown = (e) => {
    // Close on Escape
    if (e.key === "Escape") {
      setIsMobileMenuOpen(false);
      toggleButtonRef.current?.focus();
      return;
    }

    // Tab trap
    if (e.key === "Tab") {
      const focusableElements = drawerRef.current?.querySelectorAll(
        'a[href], button, input, textarea, [tabindex="0"]'
      );
      if (!focusableElements) return;

      const allElements = [toggleButtonRef.current, ...focusableElements].filter(Boolean);
      const firstElement = allElements[0];
      const lastElement = allElements[allElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  
  return () => {
    document.body.style.overflow = originalStyle;
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [isMobileMenuOpen]);
```

**JSX updates in `Navbar.jsx`**:
*   *Hamburger Button (Line 229)*:
    ```jsx
    <button
      ref={toggleButtonRef}
      onClick={toggleMobileMenu}
      aria-expanded={isMobileMenuOpen}
      aria-controls="mobile-nav-drawer"
      aria-label={isMobileMenuOpen ? "Close main navigation menu" : "Open main navigation menu"}
      className={clsx(...)}
      title={isMobileMenuOpen ? "Close Navigation Deck" : "Open Navigation Deck"}
    >
    ```
*   *Drawer Wrapper (Line 247)*:
    ```jsx
    <div
      ref={drawerRef}
      id="mobile-nav-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Deck"
      className={clsx(
        "fixed inset-0 top-0 pt-24 z-40 bg-neutral-950/95 backdrop-blur-lg border-b border-neutral-900 flex flex-col justify-between p-8 md:hidden transition-all duration-500 ease-in-out transform origin-top",
        isMobileMenuOpen 
          ? "opacity-100 scale-y-100 visible" 
          : "opacity-0 scale-y-0 pointer-events-none invisible"
      )}
    >
    ```

---

## 3. Autoplay Videos (Safari & iOS Compatibility)
We audited all video tags in the repository to ensure proper attributes (`loop`, `muted`, `autoPlay`, `playsInline`) are configured. 

*   **Findings**:
    1.  `src/components/Features.jsx` (Line 61 & 180): Configured with `loop`, `muted`, `autoPlay`, and `playsInline`. (Nominal)
    2.  `src/components/Hero.jsx` (Line 142): Configured with `autoPlay`, `loop`, `muted`, and `playsInline`. (Nominal)
    3.  `src/components/Hero.jsx` (Line 117 & 131): Configured with `loop`, `muted`, and `playsInline`. Since these videos are controlled manually (hover triggers or GSAP timeline callbacks like `nextVdRef.current.play()`), they do not have `autoPlay`, but their `muted` and `playsInline` attributes are correct and required for programmatic video control on mobile Safari.
*   **Fix Strategy**: No changes needed; video attributes are fully compliant.

---

## 4. External Link Safety (rel="noopener noreferrer")
We audited all links targeting `_blank` to verify safety against reverse-tabnabbing exploits.

*   **Findings**:
    1.  `Footer.jsx` (Line 342, 377, 416) are the only anchors targeting external endpoints using `target="_blank"`.
    2.  All three links correctly include `rel="noopener noreferrer"`.
*   **Fix Strategy**: No changes needed; external link practices are fully secure.

---

## 5. Potential XSS Vectors (dangerouslySetInnerHTML)
We audited usage of raw HTML rendering APIs.

*   **Findings**:
    *   `src/components/AnimatedTitle.jsx` uses `dangerouslySetInnerHTML={{ __html: word }}` at Line 48.
    *   *Risk Assessment*: The `title` props in the codebase are currently hardcoded static strings (e.g. `"let&#39;s cr<b>e</b>ate your <br /> new favorite..."`). Because these strings are developer-defined, there is no immediate XSS vector. However, if this component is reused with dynamic API content, database values, or user inputs, this will create a vulnerability.
*   **Proposed Fix Strategy**:
    *   *Option A (Sanitization)*: Import a sanitization tool like `DOMPurify` to sanitize HTML inputs.
    *   *Option B (Safe React Parser)*: Replace `dangerouslySetInnerHTML` with a safe text parser. Since only `<b>` formatting tags are expected, we can parse them into standard React objects safely:
    ```javascript
    const renderSafeWord = (word) => {
      // Check if word contains <b> formatting tags
      const match = word.match(/^<b>(.*?)<\/b>$/);
      if (match) {
        return <b>{match[1]}</b>;
      }
      return word;
    };
    // Replace span with:
    <span key={idx} className="animated-word">
      {renderSafeWord(word)}
    </span>
    ```

---

## 6. Responsive Layout & Viewport Issues
We analyzed layouts and CSS definitions for viewport and styling fragility across different screen sizes.

### A. Body Scrollbar Jump Bug
*   **Observation**: `src/index.css` (Line 12) sets `body { width: 100dvw; overflow-x: hidden; }`.
*   **Impact**: Dynamic Viewport Width (`dvw`/`vw`) includes the width of the scrollbar. In desktop environments with non-overlay scrollbars (Windows Chrome/Firefox), this forces the body width to exceed the actual content viewport width by the scrollbar size (~15px), causing horizontal shift, content clipping, or scrollbar flickering.
*   **Proposed Fix**: Remove `width: 100dvw` from `body` in `index.css`. The body is a block element and will naturally fill 100% of the viewport width.

### B. Missing Position Context on About Image Container
*   **Observation**: In `src/components/About.jsx`, `.about-image` is absolutely positioned (`absolute top-0 left-1/2`). However, neither the parent `#clip` container nor any of the ancestor elements have a positioning context (no `relative` class).
*   **Impact**: `.about-image` positions itself relative to the document root (the body), placing the image at the top of the webpage, over the Hero section, before GSAP ScrollTrigger executes scroll wrapper calculations. This can trigger a layout flash (FOUC).
*   **Proposed Fix**: Add `relative` to the `#clip` container in `About.jsx`:
    ```jsx
    <div className="h-dvh w-full relative" id="clip">
    ```

### C. Fragile Viewport-Relative Offsets
*   **Observation**: In `src/index.css` (Line 97), `.about-subtext` uses `absolute bottom-[-85dvh]`.
*   **Impact**: On wide, short viewports (mobile landscape) or tablets, offsetting text content using viewport height units (`dvh`) relative to a dynamic text container causes overlapping or large layout gaps.
*   **Proposed Fix**: Remove absolute offsets. Use standard document flow with layout containers (flex/grid) so the subtext sits naturally below the title and scales fluidly.

### D. Overlapping Negative Margins
*   **Observation**: `src/components/Story.jsx` (Line 108) uses `-mt-80` (negative margin top 20rem) on desktop to overlay text content on the story image.
*   **Impact**: If the image takes longer to load, or the container height shrinks on specific viewports, this hardcoded negative offset causes texts to collision-overlap or clipping.
*   **Proposed Fix**: Use CSS Grid overlapping layout patterns (e.g. `grid-area: 1/1`) or safer flexbox spacers with smaller percentage-based offsets.

### E. Fragile Position Offsets
*   **Observation**: `src/components/Contact.jsx` (Line 14, 25) relies on hardcoded offsets (`-top-40 left-20`) to display overlapping cropped images.
*   **Impact**: On small screens, these absolute coordinates push elements off-screen or over core CTA controls.
*   **Proposed Fix**: Wrap illustrations in a flex/grid layout and hide background clips on mobile viewports using responsive visibility (`hidden sm:block`) to prevent overlapping text content.
