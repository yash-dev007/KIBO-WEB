# Implementation Plan — Accessibility and Security Enhancements

We will modify four components:
1. `src/components/Navbar.jsx`
2. `src/components/Footer.jsx`
3. `src/components/Button.jsx`
4. `src/components/AnimatedTitle.jsx`

---

## Step 1: Navbar.jsx Edits

### Accessibility Attributes
- **Logo Anchor (around line 171)**:
  - Current:
    ```jsx
    <a href="#home" className="flex items-center gap-2 group">
    ```
  - New:
    ```jsx
    <a href="#home" className="flex items-center gap-2 group" aria-label="Kibo Home">
    ```

- **Audio Trigger Button (around line 208)**:
  - Current:
    ```jsx
    <button
      onClick={toggleAudioIndicator}
      className="flex items-center space-x-0.5 bg-neutral-950/40 hover:bg-neutral-900 border border-neutral-800/80 hover:border-cyan-500/20 px-3 py-2 rounded-full transition-all cursor-pointer group"
      title={isAudioPlaying ? "Mute Background Score" : "Play Background Score"}
    >
    ```
  - New:
    ```jsx
    <button
      onClick={toggleAudioIndicator}
      className="flex items-center space-x-0.5 bg-neutral-950/40 hover:bg-neutral-900 border border-neutral-800/80 hover:border-cyan-500/20 px-3 py-2 rounded-full transition-all cursor-pointer group"
      title={isAudioPlaying ? "Mute Background Score" : "Play Background Score"}
      aria-label={isAudioPlaying ? "Mute Background Score" : "Play Background Score"}
    >
    ```

- **Mobile Hamburg Toggle Button (around line 233)**:
  - Current:
    ```jsx
    <button
      onClick={toggleMobileMenu}
      className={clsx(
        "flex md:hidden items-center justify-center h-9 w-9 rounded-full transition-all duration-300 cursor-pointer border",
        isMobileMenuOpen
          ? "bg-cyan-950/80 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          : "bg-neutral-950/60 border-neutral-800 text-white hover:text-cyan-400 hover:border-cyan-500/30"
      )}
      title={isMobileMenuOpen ? "Close Navigation Deck" : "Open Navigation Deck"}
    >
    ```
  - New:
    ```jsx
    <button
      ref={toggleButtonRef}
      onClick={toggleMobileMenu}
      className={clsx(
        "flex md:hidden items-center justify-center h-9 w-9 rounded-full transition-all duration-300 cursor-pointer border",
        isMobileMenuOpen
          ? "bg-cyan-950/80 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          : "bg-neutral-950/60 border-neutral-800 text-white hover:text-cyan-400 hover:border-cyan-500/30"
      )}
      title={isMobileMenuOpen ? "Close Navigation Deck" : "Open Navigation Deck"}
      aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isMobileMenuOpen}
      aria-controls="mobile-navigation-deck"
    >
    ```

### Drawer Accessibility & Focus Trap
- **Mobile Menu Drawer Container (around line 251)**:
  - Current:
    ```jsx
    <div
      className={clsx(
        "fixed inset-0 top-0 pt-24 z-40 bg-neutral-950/95 backdrop-blur-lg border-b border-neutral-900 flex flex-col justify-between p-8 md:hidden transition-all duration-500 ease-in-out transform origin-top",
        isMobileMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
      )}
    >
    ```
  - New:
    ```jsx
    <div
      ref={mobileMenuRef}
      id="mobile-navigation-deck"
      aria-hidden={!isMobileMenuOpen}
      className={clsx(
        "fixed inset-0 top-0 pt-24 z-40 bg-neutral-950/95 backdrop-blur-lg border-b border-neutral-900 flex flex-col justify-between p-8 md:hidden transition-all duration-500 ease-in-out transform origin-top",
        isMobileMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none invisible"
      )}
    >
    ```

### Refs and Hooks
- Declare the new refs:
  ```jsx
  const mobileMenuRef = useRef(null);
  const toggleButtonRef = useRef(null);
  ```
- Implement `useEffect` for **Escape Key**, **Scroll Lock**, and **Keyboard Focus Trap**:
  ```jsx
  // Escape Key closing and Keyboard Focus Trap
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e) => {
      // Escape key closing
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        // Focus the toggle button when closing via Escape for better accessibility
        toggleButtonRef.current?.focus();
        return;
      }

      // Keyboard Focus Trap
      if (e.key === "Tab") {
        if (!mobileMenuRef.current || !toggleButtonRef.current) return;

        const focusableDrawerElements = Array.from(
          mobileMenuRef.current.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );

        const focusableElements = [toggleButtonRef.current, ...focusableDrawerElements];
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

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
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen]);
  ```

---

## Step 2: Footer.jsx Edits

Let's inspect `Footer.jsx` to verify exact line contents first.

---

## Step 3: Button.jsx Edits

Let's inspect `Button.jsx` to verify exact line contents first.

---

## Step 4: AnimatedTitle.jsx Edits

Let's inspect `AnimatedTitle.jsx` to verify exact line contents first.
