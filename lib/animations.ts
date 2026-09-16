// ============================================================
// lib/animations.ts
// ─────────────────────────────────────────────────────────────
// ALL Framer Motion animation presets, easing curves, and
// transition configs for the site.
//
// HOW TO USE:
//   import { fadeUp, EASE, staggerContainer } from "@/lib/animations";
//   <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} />
// ============================================================

import type { Variants, Transition } from "framer-motion";

// ────────────────────────────────────────────────────────────
// 1. EASING PRESETS
// ────────────────────────────────────────────────────────────

export const EASE = {
  /** Smooth deceleration — default for most entrances */
  out:       [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  /** Snappy power-out — faster reveals, nav entrance */
  snap:      [0.22, 1,    0.36, 1   ] as [number, number, number, number],
  /** Spring overshoot — badges, icons, pills */
  spring:    [0.34, 1.56, 0.64, 1   ] as [number, number, number, number],
  /** Smooth symmetrical — state transitions */
  inOut:     [0.4,  0,    0.2,  1   ] as [number, number, number, number],
  /** Anticipation pull-back before launch */
  anticipate:[0.36, 0,    0.66, -0.56] as [number, number, number, number],
  /** Elastic overshoot — playful reveals */
  elastic:   [0.68, -0.6, 0.32, 1.6 ] as [number, number, number, number],
} as const;

// ────────────────────────────────────────────────────────────
// 2. VIEWPORT CONFIGS
// ────────────────────────────────────────────────────────────

/** Section-level: fires once when 10% enters viewport */
export const viewport = { once: true, amount: 0.10 } as const;
/** Card-level: fires once when 20% enters viewport */
export const viewportCard = { once: true, amount: 0.20 } as const;
/** Eager: fires as soon as element starts entering */
export const viewportEager = { once: true, amount: 0.05 } as const;

// ────────────────────────────────────────────────────────────
// 3. CLASSIC VARIANTS (fade-based)
// ────────────────────────────────────────────────────────────

/** Simple fade + rise */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.72, ease: EASE.out } },
};

/** Fade + rise + scale — best for cards */
export const fadeUpScale: Variants = {
  hidden:  { opacity: 0, y: 36, scale: 0.96 },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.68, ease: EASE.out } },
};

/** Fade from left */
export const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.72, ease: EASE.out } },
};

/** Fade from right */
export const fadeRight: Variants = {
  hidden:  { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.72, ease: EASE.out } },
};

/** Pop in with spring overshoot — badges, pills */
export const popIn: Variants = {
  hidden:  { opacity: 0, scale: 0.72, y: 14 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.55, ease: EASE.spring } },
};

// ────────────────────────────────────────────────────────────
// 4. CINEMATIC VARIANTS (new)
// ────────────────────────────────────────────────────────────

/**
 * CLIP REVEAL — text slides up through an invisible mask.
 * Makes text look like it's being "born" from behind a surface.
 * Best for: section headlines, hero text, big statements.
 */
export const clipReveal: Variants = {
  hidden:  { clipPath: "inset(0 0 100% 0)", y: 32, opacity: 0 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    y: 0,
    opacity: 1,
    transition: { duration: 0.85, ease: EASE.snap },
  },
};

/**
 * BLUR IN — element fades in while sharpening from blur.
 * Best for: background text, ambient labels, subtle reveals.
 */
export const blurIn: Variants = {
  hidden:  { opacity: 0, filter: "blur(12px)", y: 18 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.9, ease: EASE.out },
  },
};

/**
 * SLIDE IN FROM BOTTOM with depth — element rises from below
 * with a subtle 3D perspective tilt that flattens as it arrives.
 * Best for: cards entering in sequence, feature blocks.
 */
export const depthRise: Variants = {
  hidden:  { opacity: 0, y: 60, rotateX: 15, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.78, ease: EASE.out },
  },
};

/**
 * SPRING SCALE — element grows from nothing with elastic bounce.
 * Best for: icons, number counters, emoji, decorative elements.
 */
export const springScale: Variants = {
  hidden:  { opacity: 0, scale: 0, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 18, mass: 0.9 },
  },
};

/**
 * WIPE FROM LEFT — element's width grows from 0 to 100%.
 * Best for: divider lines, progress bars, timeline bars.
 */
export const wipeLeft: Variants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.1, ease: EASE.out },
  },
};

/**
 * FLOAT UP — subtle infinite floating for ambient elements.
 * Use with `animate` not `whileInView`.
 */
export const floatUp = (delay = 0): Variants => ({
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
  },
});

// ────────────────────────────────────────────────────────────
// 5. STAGGER CONTAINERS
// ────────────────────────────────────────────────────────────

/**
 * Staggers children animations.
 * @param stagger — seconds between each child (default 0.12)
 * @param delayChildren — initial delay before first child (default 0.05)
 */
export const staggerContainer = (stagger = 0.12, delayChildren = 0.05): Variants => ({
  hidden:  {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

/**
 * Staggers children with a fast delay — for dense lists of items.
 */
export const staggerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.02 } },
};

/**
 * Staggers children with a slow, dramatic delay — for featured rows.
 */
export const staggerSlow: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

// ────────────────────────────────────────────────────────────
// 6. DELAY HELPERS
// ────────────────────────────────────────────────────────────

/** Returns a fadeUp with a specific delay. */
export const fadeUpDelayed = (delay: number): Variants => ({
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, delay, ease: EASE.out } },
});

/** Returns a clipReveal with a specific delay. */
export const clipRevealDelayed = (delay: number): Variants => ({
  hidden:  { clipPath: "inset(0 0 100% 0)", y: 32, opacity: 0 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    y: 0,
    opacity: 1,
    transition: { duration: 0.85, delay, ease: EASE.snap },
  },
});
