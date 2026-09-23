"use client";

import { motion } from "framer-motion";
import { ClipboardList, Flame, Truck, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SOLUTION_STEPS } from "@/lib/constants";
import { EASE, fadeUp, staggerContainer, viewport } from "@/lib/animations";

// ─── Icon Map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  ClipboardList, Flame, Truck, Heart,
};

// ─── Step accent colours (cycling) ───────────────────────────────────────────

const STEP_COLORS = [
  "var(--color-brand-red)",
  "var(--color-saffron)",
  "var(--color-turmeric)",
  "var(--color-leaf-green)",
];

type Step = (typeof SOLUTION_STEPS)[number];

// ─── Ecosystem Banner (kept but not rendered) ─────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// ─── Step Card (glass card layout) ───────────────────────────────────────────

function StepCard({
  step,
  index,
  reducedMotion,
}: {
  step: Step;
  index: number;
  reducedMotion: boolean;
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3, once: false });
  const Icon = ICON_MAP[step.icon] ?? ClipboardList;
  const color = STEP_COLORS[index % STEP_COLORS.length];

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? {} : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: EASE.out, delay: index * 0.1 }}
    >
      <div
        className="glass h-full p-7 flex flex-col gap-4"
        style={{
          borderColor: inView ? `${color}35` : "rgba(192,57,43,0.08)",
          transition: reducedMotion ? "none" : "border-color 0.5s ease, box-shadow 0.5s ease",
          boxShadow: inView
            ? `0 4px 32px ${color}18, 0 1px 4px rgba(28,28,30,0.04)`
            : "0 2px 16px rgba(28,28,30,0.06)",
        }}
      >
        {/* Step number + icon row */}
        <div className="flex items-center gap-4">
          {/* Big step number */}
          <span
            className="leading-none font-bold select-none flex-shrink-0"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(3rem, 6vw, 4rem)",
              color: inView ? color : "rgba(28,28,30,0.1)",
              lineHeight: 0.9,
              transition: reducedMotion ? "none" : "color 0.5s ease",
            }}
          >
            {step.step}
          </span>

          {/* Icon circle */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: inView ? color : "rgba(28,28,30,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: reducedMotion ? "none" : "background 0.5s ease, box-shadow 0.5s ease",
              boxShadow: inView ? `0 6px 20px ${color}44` : "none",
              flexShrink: 0,
            }}
          >
            <Icon size={22} style={{ color: inView ? "#fff" : "rgba(28,28,30,0.3)" }} strokeWidth={2} />
          </div>
        </div>

        {/* Text */}
        <div>
          <h3
            className="text-xl font-bold mb-2 leading-snug"
            style={{
              fontFamily: "var(--font-playfair)",
              color: inView ? "var(--color-charcoal)" : "rgba(28,28,30,0.45)",
              transition: reducedMotion ? "none" : "color 0.5s ease",
            }}
          >
            {step.title}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{
              fontFamily: "var(--font-inter)",
              color: "var(--color-charcoal)",
              opacity: inView ? 0.65 : 0.3,
              transition: reducedMotion ? "none" : "opacity 0.5s ease",
            }}
          >
            {step.description}
          </p>
        </div>
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
      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.div variants={fadeUp} className="mb-3">
            <span className="pill-badge">
              <span className="pill-dot" />
              How It Works
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-bold"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--color-charcoal)",
              fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Kitchen Queens,{" "}
            <span className="gradient-text">Subscribed.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto mt-4"
            style={{ fontFamily: "var(--font-inter)", color: "var(--color-charcoal)", opacity: 0.62 }}
          >
            A simple way to get fresh home-cooked food while helping local home cooks earn independently.
          </motion.p>
        </motion.div>

        {/* Step cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SOLUTION_STEPS.map((step, i) => (
            <StepCard
              key={step.step}
              step={step}
              index={i}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
