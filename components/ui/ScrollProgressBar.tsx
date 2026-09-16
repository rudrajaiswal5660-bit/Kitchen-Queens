"use client";

// ============================================================
// components/ui/ScrollProgressBar.tsx
// ─────────────────────────────────────────────────────────────
// A thin, brand-coloured progress bar that fills from left→right
// as the user scrolls down the page. Fixed at the very top, under
// the navigation.
//
// USAGE — add inside Navigation.tsx or layout.tsx:
//   <ScrollProgressBar />
//
// HOW TO CUSTOMISE:
//   - `height`  — bar thickness in px (default 3)
//   - `color`   — CSS color string (default brand-red gradient)
//   - `zIndex`  — stacking order (default 9999)
// ============================================================

import { useScroll, useSpring, motion } from "framer-motion";

interface ScrollProgressBarProps {
  height?: number;
  color?: string;
  zIndex?: number;
}

export function ScrollProgressBar({
  height = 3,
  color = "linear-gradient(90deg, var(--color-brand-red) 0%, var(--color-saffron) 60%, var(--color-turmeric) 100%)",
  zIndex = 9999,
}: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll();

  // Spring-smoothed so the bar glides rather than jerks
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height,
        background: color,
        transformOrigin: "0%",
        scaleX,
        zIndex,
        pointerEvents: "none",
      }}
    />
  );
}
