import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const decodeHTMLEntities = (text) => {
  if (typeof text !== "string") return text;
  return text
    .replace(/&amp;/gi, "&")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
};

const parseWord = (word) => {
  if (typeof word !== "string") return word;
  
  const parts = word.split(/(<\/?[bB]>)/);
  let isBold = false;
  
  return parts.map((part, index) => {
    if (/^<[bB]>$/.test(part)) {
      isBold = true;
      return null;
    }
    if (/^<\/[bB]>$/.test(part)) {
      isBold = false;
      return null;
    }
    
    const decoded = decodeHTMLEntities(part);
    if (isBold) {
      return <b key={index}>{decoded}</b>;
    }
    return decoded;
  }).filter(part => part !== null);
};

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.02,
        },
        0
      );
    }, containerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, [title]);

  return (
    <div ref={containerRef} className={clsx("animated-title", containerClass)}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, idx) => (
            <span key={idx} className="animated-word">
              {parseWord(word)}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
