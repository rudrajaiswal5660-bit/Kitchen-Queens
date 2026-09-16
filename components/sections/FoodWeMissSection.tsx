"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useParallax } from "@/hooks/useParallax";
import { FOOD_WE_MISS } from "@/lib/constants";
import { TextReveal } from "@/components/ui/TextReveal";
import { blurIn, depthRise, popIn, staggerContainer, viewport } from "@/lib/animations";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FoodItem {
  readonly emoji: string;
  readonly name: string;
  readonly color: string;
}

// ─── Food Card ────────────────────────────────────────────────────────────────

function FoodCard({ item, index }: { item: FoodItem; index: number }) {
  const rotate = index % 3 === 0 ? "-2.5deg" : index % 3 === 1 ? "1.5deg" : "-1deg";
  return (
    <div
      className="flex-shrink-0 flex flex-col items-center justify-center gap-2 rounded-2xl select-none"
      style={{
        width: 178, height: 128,
        background: item.color,
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        transform: `rotate(${rotate})`,
        border: "1px solid rgba(255,255,255,0.4)",
        cursor: "default",
        transition: "transform 0.3s ease",
      }}
    >
      <span style={{ fontSize: 40, lineHeight: 1 }}>{item.emoji}</span>
      <span style={{ fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 13, color: "rgba(28,28,30,0.78)", letterSpacing: "0.01em" }}>
        {item.name}
      </span>
    </div>
  );
}

// ─── Annotation Pills ─────────────────────────────────────────────────────────

const PILL_POSITIONS: React.CSSProperties[] = [
  { top: "8%",  left:  "4%" },
  { top: "6%",  right: "6%" },
  { top: "78%", left:  "6%" },
  { top: "80%", right: "8%" },
  { top: "44%", left:  "1%" },
];

function AnnotationPill({ label, index }: { label: string; index: number }) {
  const pos = PILL_POSITIONS[index % PILL_POSITIONS.length];
  return (
    <motion.div
      className="absolute hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold select-none pointer-events-none"
      style={{
        fontFamily: "var(--font-inter)",
        background: "rgba(255,253,249,0.84)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(192,57,43,0.14)",
        color: "var(--color-charcoal)",
        boxShadow: "0 2px 14px rgba(0,0,0,0.07)",
        letterSpacing: "0.03em",
        ...pos,
      }}
      variants={popIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.12 }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-brand-red)", display: "inline-block", flexShrink: 0 }} />
      {label}
    </motion.div>
  );
}

// ─── Static Grid (reduced-motion) ─────────────────────────────────────────────

function StaticFoodGrid({ items }: { items: readonly FoodItem[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 px-6">
      {items.map((item, i) => <FoodCard key={item.name} item={item} index={i} />)}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FoodWeMissSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  // Parallax: heading drifts up subtly as user enters the section
  const headingY = useParallax(sectionRef, 30);

  return (
    <section
      id="food-we-miss"
      ref={sectionRef}
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: "var(--color-cream)" }}
    >
      {/* Floating annotation pills */}
      {FOOD_WE_MISS.annotations.map((label, i) => (
        <AnnotationPill key={label} label={label} index={i} />
      ))}

      {/* ── Statement text with parallax drift ──────────────── */}
      <motion.div
        className="max-w-5xl mx-auto px-6 text-center mb-16 sm:mb-20"
        style={reducedMotion ? {} : { y: headingY }}
      >
        {/* Line 1 — TextReveal word by word */}
        <div className="mb-2">
          <TextReveal
            text={FOOD_WE_MISS.statement[0]}
            as="h2"
            delay={0}
            stagger={0.06}
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--color-charcoal)",
              fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
            }}
          />
        </div>
        {/* Line 2 — TextReveal in brand-red, delayed */}
        <TextReveal
          text={FOOD_WE_MISS.statement[1]}
          as="h2"
          delay={0.35}
          stagger={0.07}
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--color-brand-red)",
            fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
          }}
        />
      </motion.div>

      {/* ── Marquee or Static Grid ──────────────────────────── */}
      {reducedMotion ? (
        <StaticFoodGrid items={FOOD_WE_MISS.items} />
      ) : (
        <div
          className="relative w-full overflow-hidden"
          style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}
        >
          <div className="marquee-track flex gap-6" style={{ width: "max-content" }}>
            {[...FOOD_WE_MISS.items, ...FOOD_WE_MISS.items].map((item, i) => (
              <FoodCard key={`${item.name}-${i}`} item={item} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* ── Bottom depth-rise tagline ─────────────────────── */}
      <motion.p
        variants={blurIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-16 text-center text-base font-medium max-w-md mx-auto"
        style={{ fontFamily: "var(--font-inter)", color: "var(--color-charcoal)", opacity: 0.5 }}
      >
        Every meal carries a memory. We just help you recreate it — every single day.
      </motion.p>
    </section>
  );
}
