## 2026-06-06T16:07:45Z
You are teamwork_preview_worker.
Your working directory is D:\Projects\KIBO WEB\.agents\worker_accessibility.
Your task is to implement Accessibility, Security, and Cross-Browser layout/viewport adjustments directly in the source files.

### MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

### Required Changes:

1. **Accessibility (ARIA Labels & Attributes) in Navbar.jsx**:
   - Locate the branding logo anchor (around line 167) and add `aria-label="Kibo Home"`.
   - Locate the audio indicator toggle button (around line 204) and add `aria-label={isAudioPlaying ? "Mute Background Score" : "Play Background Score"}`.
   - Locate the mobile hamburger toggle button (around line 229) and add:
     - `aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}`
     - `aria-expanded={isMobileMenuOpen}`
     - `aria-controls="mobile-navigation-deck"`

2. **Mobile Drawer Tab Focus Leak & Visibility in Navbar.jsx**:
   - Locate the mobile menu drawer container (around line 247). Add `id="mobile-navigation-deck"` and `aria-hidden={!isMobileMenuOpen}`.
   - Update its `className` conditional: in the closed state, append `invisible` (so it has Tailwind `invisible` / `visibility: hidden` style). When `isMobileMenuOpen` is true, ensure it does NOT have `invisible` so it is visible. Specifically, change line 250:
     `isMobileMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none invisible"`

3. **Mobile Drawer Escape Key closing, Scroll Lock & Focus Trap in Navbar.jsx**:
   - Add `useRef` for the mobile menu drawer: `const mobileMenuRef = useRef(null);`. Attach it to the drawer element.
   - Implement `useEffect` hooks in `NavBar` to handle:
     - **Escape key**: Listen to `keydown` on window when `isMobileMenuOpen` is true. If `e.key === "Escape"`, call `setIsMobileMenuOpen(false)`.
     - **Scroll lock**: When `isMobileMenuOpen` is true, set `document.body.style.overflow = "hidden"`. Revert it on cleanup/close.
     - **Keyboard Focus Trap**: When `isMobileMenuOpen` is true, intercept Tab / Shift+Tab keyboard focus so it cycles strictly between the mobile drawer's focusable elements (links, etc.) and the mobile menu toggle button (which contains the close icon).

4. **Accessibility in Footer.jsx**:
   - In the `TerminalCore` subcomponent inside `Footer.jsx`:
     - Add `aria-label="Terminal Command Input"` to the `<input>` element (around line 220).
     - Add `aria-label="Clear CLI Input"` to the clear/times `<button>` (around line 229).
   - In the main `Footer` component:
     - Add `aria-label="Scroll to top of page"` to the scroll-to-top compass `<button>` (around line 463).

5. **Accessibility in Button.jsx**:
   - In `src/components/Button.jsx`, add `aria-label={title}` to the `<button>` element.

6. **Security & Correctness in AnimatedTitle.jsx**:
   - Eliminate `dangerouslySetInnerHTML` inside `AnimatedTitle.jsx` to prevent future XSS risks.
   - Create a safe parser function `parseWord` that:
     - Decodes standard HTML entities (e.g. `&#39;` to `'`, `&quot;` to `"`, `&amp;` to `&`, `&lt;` to `<`, `&gt;` to `>`).
     - Splits the word by `<b>` and `</b>` tags, mapping parts so that matched bold segments are wrapped in React `<b>` elements and other parts are rendered as normal text.
     - Replace `dangerouslySetInnerHTML={{ __html: word }}` with `{parseWord(word)}` inside the `span`.
   - Update the `useEffect` dependency array in `AnimatedTitle.jsx` to contain `[title]` (instead of `[]`) so that if the `title` prop updates, the GSAP scroll-triggered animation context is cleanly torn down and rebuilt. (Ensure `ctx.revert()` is called on cleanup, which is already there).

Validate your changes, run tests if available, record all edits, and write a summary in `handoff.md`. Send a message when complete.
