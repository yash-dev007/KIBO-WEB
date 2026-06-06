import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes, FaChevronRight } from "react-icons/fa";

// Corrected nav items matching the actual sections of the website
const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Features", id: "features" },
  { name: "Prologue", id: "story" },
  { name: "Contact", id: "contact" }
];

const NavBar = () => {
  // Audio state
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [isIndicatorActive, setIsIndicatorActive] = useState(true);
  
  // Navigation states
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();

  // Toggle audio
  const toggleAudioIndicator = (e) => {
    if (e) e.stopPropagation();
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Manage audio playback
  useEffect(() => {
    const audio = audioElementRef.current;
    if (isAudioPlaying) {
      if (audio) {
        audio.play()
          .catch((err) => {
            console.warn("Audio playback failed or was blocked by browser autoplay rules:", err);
            setIsAudioPlaying(false);
            setIsIndicatorActive(false);
          });
      }
    } else {
      if (audio) {
        audio.pause();
      }
    }

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [isAudioPlaying]);

  // Autoplay handler on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      setIsAudioPlaying((prev) => {
        if (!prev) {
          setIsIndicatorActive(true);
          return true;
        }
        return prev;
      });
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);

    return removeListeners;
  }, []);

  // Float navbar show/hide scroll listener
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
  }, [currentScrollY, isMobileMenuOpen]);

  // GSAP animation for visibility state
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

  // Intersection Observer to track active section in viewport
  useEffect(() => {
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -50% 0px",
      threshold: [0.1, 0.3, 0.5]
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Escape key closing, scroll lock, and keyboard focus trap
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        toggleButtonRef.current?.focus();
        return;
      }

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

  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  // Toggle responsive mobile menu drawer
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border border-transparent rounded-lg transition-all duration-700 sm:inset-x-6 mx-4 sm:mx-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            
            {/* Logo and Branding Link */}
            <div className="flex items-center gap-7">
              <a href="#home" className="flex items-center gap-2 group" aria-label="Kibo Home">
                <img src="/img/logo.png" alt="logo" className="w-10" />
              </a>
            </div>

            {/* Right Navigation & Audio Actions */}
            <div className="flex h-full items-center gap-6">
              
              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={index}
                      href={`#${item.id}`}
                      className={clsx(
                        "relative px-4 py-2 font-general text-xs uppercase transition-all duration-300 select-none",
                        isActive 
                          ? "text-cyan-400 font-bold tracking-wider drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" 
                          : "text-blue-50 hover:text-cyan-400/80"
                      )}
                    >
                      {item.name}
                      {/* Glowing active line indicator */}
                      <span 
                        className={clsx(
                          "absolute bottom-0 left-4 right-4 h-[2px] bg-cyan-400 transition-transform duration-300 origin-center",
                          isActive ? "scale-x-100" : "scale-x-0"
                        )} 
                      />
                    </a>
                  );
                })}
              </div>

              {/* Audio Loop Playback Trigger */}
              <button
                onClick={toggleAudioIndicator}
                className="flex items-center space-x-0.5 bg-neutral-950/40 hover:bg-neutral-900 border border-neutral-800/80 hover:border-cyan-500/20 px-3 py-2 rounded-full transition-all cursor-pointer group"
                title={isAudioPlaying ? "Mute Background Score" : "Play Background Score"}
                aria-label={isAudioPlaying ? "Mute Background Score" : "Play Background Score"}
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                />
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
              </button>

              {/* Responsive Mobile Hamburg Menu Button */}
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
                {isMobileMenuOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Responsive Cyber Mobile Drawer Menu Overlay */}
      <div
        ref={mobileMenuRef}
        id="mobile-navigation-deck"
        aria-hidden={!isMobileMenuOpen}
        className={clsx(
          "fixed inset-0 top-0 pt-24 z-40 bg-neutral-950/95 backdrop-blur-lg border-b border-neutral-900 flex flex-col justify-between p-8 md:hidden transition-all duration-500 ease-in-out transform origin-top",
          isMobileMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none invisible"
        )}
      >
        {/* Mobile Navigation List */}
        <div className="flex flex-col gap-8 mt-4">
          <div className="text-[10px] uppercase font-mono tracking-widest text-neutral-600 border-b border-neutral-900 pb-2">
            [ hyperion_system_navigation_deck ]
          </div>
          
          <div className="flex flex-col gap-6">
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={idx}
                  href={`#${item.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={clsx(
                    "group flex items-center justify-between text-2xl uppercase tracking-wider font-bold transition-all duration-300",
                    isActive ? "text-cyan-400" : "text-neutral-400 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-neutral-600 group-hover:text-cyan-400">
                      0{idx + 1} //
                    </span>
                    <span>{item.name}</span>
                  </div>
                  <FaChevronRight 
                    size={14} 
                    className={clsx(
                      "transition-transform duration-300",
                      isActive ? "text-cyan-400 translate-x-1" : "text-neutral-700 group-hover:text-white group-hover:translate-x-1"
                    )} 
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* Mobile Telemetry Footer */}
        <div className="rounded-lg border border-neutral-900 bg-black/60 p-4 font-mono text-[10px] text-neutral-500 space-y-2 mt-auto">
          <div className="flex justify-between border-b border-neutral-900 pb-1.5 text-white/80 font-bold uppercase tracking-wider">
            <span>[ SYSTEM STATS ]</span>
            <span className="text-cyan-400">ONLINE</span>
          </div>
          <div className="flex justify-between">
            <span>RAG VECTOR SYNC</span>
            <span className="text-cyan-400/80">READY (sqlite-vec)</span>
          </div>
          <div className="flex justify-between">
            <span>TTS AUDIO CORE</span>
            <span className="text-emerald-400">ACTIVE (piper-onnx)</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
