"use client";

// ============================================================
// hooks/useParallax.ts
// ─────────────────────────────────────────────────────────────
// Returns a Framer Motion MotionValue that translates an element
// based on the scroll position of its container.
// Positive `strength` moves element upward on scroll (parallax rise).
// Negative `strength` moves it downward (sinks behind).
//
// USAGE:
//   const ref = useRef<HTMLDivElement>(null);
//   const y = useParallax(ref, 60); // moves up 60px as element exits
//   <motion.div ref={ref} style={{ y }}>...</motion.div>
//
// HOW TO CUSTOMISE:
//   - strength: number of pixels to travel (default 80).
//     Increase for dramatic effect, decrease for subtlety.
// ============================================================

import { useRef, useLayoutEffect } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

export function useParallax<T extends HTMLElement>(
  elementRef: React.RefObject<T | null>,
  strength = 80
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: elementRef as React.RefObject<Element>,
    offset: ["start end", "end start"],
  });

  // Map 0→1 scroll progress through element to -strength→+strength translation
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);
  return y;
}
