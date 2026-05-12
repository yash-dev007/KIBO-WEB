"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale" | "rise-lg";
  className?: string;
}

export function Reveal({ children, delay = 0, direction = "up", className = "" }: RevealProps) {
  const getVariants = () => {
    switch (direction) {
      case "left":
        return { hidden: { opacity: 0, x: -36, y: 0, scale: 1 }, visible: { opacity: 1, x: 0, y: 0, scale: 1 } };
      case "right":
        return { hidden: { opacity: 0, x: 36, y: 0, scale: 1 }, visible: { opacity: 1, x: 0, y: 0, scale: 1 } };
      case "scale":
        return { hidden: { opacity: 0, x: 0, y: 0, scale: 0.96 }, visible: { opacity: 1, x: 0, y: 0, scale: 1 } };
      case "rise-lg":
        return { hidden: { opacity: 0, x: 0, y: 64, scale: 0.985 }, visible: { opacity: 1, x: 0, y: 0, scale: 1 } };
      case "up":
      default:
        return { hidden: { opacity: 0, x: 0, y: 28, scale: 1 }, visible: { opacity: 1, x: 0, y: 0, scale: 1 } };
    }
  };

  return (
    <motion.div
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}