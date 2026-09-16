"use client";

import { motion } from "framer-motion";
import { ClipboardList, Flame, Truck, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SOLUTION_STEPS } from "@/lib/constants";
import { EASE, fadeUp, viewport } from "@/lib/animations";

// ─── Icon Map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  ClipboardList, Flame, Truck, Heart,
};

type Step = (typeof SOLUTION_STEPS)[number];

// ─── Step accent colours (cycling) ───────────────────────────────────────────

const STEP_COLORS = [
  "var(--color-brand-red)",
  "var(--color-saffron)",
  "var(--color-turmeric)",
  "var(--color-leaf-green)",
];

// ─── Ecosystem Banner ─────────────────────────────────────────────────────────

function EcosystemBanner({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div
      className="relative flex items-center justify-center gap-0 mb-20 overflow-hidden"
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-between w-full max-w-md mx-auto" style={{ height: 56 }}>
        {/* House */}
        <span className="text-4xl z-10 relative" style={{ filter: "drop-shadow(0 4px 12px rgba(192,57,43,0.22))" }}>
          🏠
        </span>

        {/* Track line */}
        <div
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 rounded-full"
          style={{
            background: "linear-gradient(90deg, var(--color-brand-red) 0%, var(--color-leaf-green) 100%)",
            opacity: 0.35, margin: "0 52px",
          }}
        />

        {/* Travelling tiffin */}
        <motion.span
          className="text-3xl absolute z-20"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          animate={reducedMotion ? {} : { x: ["0%", "220px", "0%"] }}
          transition={{
            duration: 3.8, repeat: Infinity,
            ease: EASE.inOut, repeatType: "loop",
          }}
        >
          🥡
        </motion.span>

        {/* Person */}
        <span className="text-4xl z-10 relative" style={{ filter: "drop-shadow(0 4px 12px rgba(39,174,96,0.22))" }}>
          🧑‍💻
        </span>
      </div>
    </div>
  );
}

// ─── Step Block ───────────────────────────────────────────────────────────────

function StepBlock({
  step, index, isLeft, reducedMotion,
}: {
  step: Step; index: number; isLeft: boolean; reducedMotion: boolean;
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35, once: false });
  const Icon = ICON_MAP[step.icon] ?? ClipboardList;
  const color = STEP_COLORS[index % STEP_COLORS.length];

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col lg:flex-row items-start lg:items-center gap-8 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
      initial={reducedMotion ? {} : { opacity: 0, x: isLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.72, ease: EASE.out, delay: 0.08 }}
    >
      {/* Step number + icon column */}
      <div className={`flex-shrink-0 flex flex-col items-center gap-3 ${isLeft ? "lg:items-end" : "lg:items-start"}`}>
        {/* Large step number */}
        <span
          className="leading-none font-bold select-none transition-colors duration-500"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(5rem, 10vw, 7rem)",
            color: inView ? color : "rgba(28,28,30,0.08)",
            lineHeight: 0.9,
          }}
        >
          {step.step}
        </span>

        {/* Icon circle */}
        <div
          style={{
            width: 56, height: 56, borderRadius: "50%",
            background: inView ? color : "rgba(28,28,30,0.06)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: reducedMotion ? "none" : "background 0.5s ease, transform 0.35s ease, box-shadow 0.5s ease",
            transform: inView ? "scale(1.1)" : "scale(1)",
            boxShadow: inView ? `0 8px 24px ${color}44` : "none",
          }}
        >
          <Icon size={24} style={{ color: inView ? "#fff" : "rgba(28,28,30,0.3)" }} strokeWidth={2} />
        </div>
      </div>

      {/* Text content */}
      <div className={`flex-1 max-w-sm ${isLeft ? "lg:text-left" : "lg:text-right"}`} style={{ paddingBottom: 8 }}>
        <h3
          className="text-2xl font-bold mb-3 leading-snug transition-colors duration-500"
          style={{
            fontFamily: "var(--font-playfair)",
            color: inView ? "var(--color-charcoal)" : "rgba(28,28,30,0.45)",
          }}
        >
          {step.title}
        </h3>
        <p
          className="text-base leading-relaxed transition-opacity duration-500"
          style={{
            fontFamily: "var(--font-inter)",
            color: "var(--color-charcoal)",
            opacity: inView ? 0.65 : 0.35,
          }}
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function SolutionSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="solution"
      className="py-24 sm:py-32 overflow-hidden"
      style={{ background: "var(--color-cream)" }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-12">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.span
            className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: "var(--font-inter)", color: "var(--color-brand-red)" }}
            initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, ease: EASE.snap }}
          >
            How It Works
          </motion.span>

          <motion.h2
            className="font-bold leading-[1.08] mb-5"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--color-charcoal)",
              fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
              letterSpacing: "-0.025em",
            }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ duration: 0.68, delay: 0.1, ease: EASE.out }}
          >
            Kitchen Queens, Subscribed.
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-inter)", color: "var(--color-charcoal)", opacity: 0.62 }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ duration: 0.68, delay: 0.2, ease: EASE.out }}
          >
            A simple way to get fresh home-cooked food while helping local home cooks earn independently.
          </motion.p>
        </div>

        {/* ── Ecosystem animation ─────────────────────────────────────── */}
        <EcosystemBanner reducedMotion={reducedMotion} />

        {/* ── Steps with connecting timeline ──────────────────────────── */}
        <div className="relative">
          {/* Vertical timeline line (desktop) */}
          <div
            className="absolute hidden lg:block top-0 bottom-0 left-1/2 -translate-x-1/2 w-px"
            style={{
              background: "linear-gradient(180deg, var(--color-brand-red) 0%, var(--color-saffron) 40%, var(--color-turmeric) 70%, var(--color-leaf-green) 100%)",
              opacity: 0.22,
            }}
          />

          {/* Steps */}
          <div className="flex flex-col gap-16 lg:gap-24">
            {SOLUTION_STEPS.map((step, i) => (
              <div key={step.step} className="relative lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                {/* Timeline dot (desktop) */}
                <div
                  className="absolute hidden lg:block left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                  style={{
                    background: STEP_COLORS[i % STEP_COLORS.length],
                    top: "50%", transform: "translate(-50%, -50%)",
                    boxShadow: `0 0 0 4px ${STEP_COLORS[i % STEP_COLORS.length]}28`,
                  }}
                />

                <StepBlock
                  step={step}
                  index={i}
                  isLeft={i % 2 === 0}
                  reducedMotion={reducedMotion}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
