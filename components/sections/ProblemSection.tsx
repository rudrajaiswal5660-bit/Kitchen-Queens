"use client";

import { motion } from "framer-motion";
import { UtensilsCrossed, TrendingUp, ChefHat, X, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { TextReveal } from "@/components/ui/TextReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PROBLEMS } from "@/lib/constants";
import {
  EASE, depthRise, blurIn, fadeUp, wipeLeft,
  staggerContainer, staggerSlow, viewport, viewportCard,
} from "@/lib/animations";

// ─── Icon Map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = { UtensilsCrossed, TrendingUp, ChefHat };
type Problem = (typeof PROBLEMS)[number];

// ─── Problem Card ─────────────────────────────────────────────────────────────

function ProblemCard({ problem }: { problem: Problem }) {
  const Icon = ICON_MAP[problem.icon] ?? ChefHat;

  return (
    // depthRise: rises up with subtle 3D X-rotation → great for cards
    <motion.div variants={depthRise} className="h-full" style={{ perspective: 800 }}>
      <TiltCard className="h-full rounded-2xl" maxTilt={10} scale={1.025}>
        <div
          className="flex flex-col gap-6 p-8 h-full rounded-2xl"
          style={{
            background: "#fff",
            border: `1px solid ${problem.accent}26`,
            boxShadow: "0 2px 24px rgba(0,0,0,0.06)",
            minHeight: 260,
          }}
        >
          {/* Icon — spring scale in */}
          <motion.div
            variants={{
              hidden:  { opacity: 0, scale: 0, rotate: -15 },
              visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 250, damping: 16, delay: 0.1 } },
            }}
            style={{ width: 56, height: 56, borderRadius: "50%", background: `${problem.accent}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          >
            <Icon size={26} style={{ color: problem.accent }} strokeWidth={1.9} />
          </motion.div>

          <h3 className="text-xl font-bold leading-snug" style={{ fontFamily: "var(--font-playfair)", color: "var(--color-charcoal)" }}>
            {problem.title}
          </h3>

          <p className="text-sm leading-relaxed flex-1" style={{ fontFamily: "var(--font-inter)", color: "var(--color-charcoal)", opacity: 0.62 }}>
            {problem.description}
          </p>

          {/* Accent bar — wipes in from left */}
          <motion.div
            variants={wipeLeft}
            style={{ height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${problem.accent} 0%, ${problem.accent}44 100%)`, marginTop: "auto" }}
          />
        </div>
      </TiltCard>
    </motion.div>
  );
}

// ─── Comparison data ──────────────────────────────────────────────────────────

const COMPARISON_ROWS = [
  { without: "Greasy restaurant meals every day",          with_: "Fresh home-cooked food daily" },
  { without: "Unpredictable delivery fees & surge prices", with_: "Predictable monthly subscription" },
  { without: "No connection to your food source",          with_: "Meals from trusted local home cooks" },
  { without: "Homemakers' skills go unused",               with_: "Homemakers earn flexible income" },
] as const;

function ComparisonRow({ without, with_, delay }: { without: string; with_: string; delay: number }) {
  return (
    <motion.div
      className="grid grid-cols-2 gap-4"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportCard}
      transition={{ duration: 0.5, delay, ease: EASE.out }}
    >
      <div className="flex items-start gap-3 px-4 py-3 rounded-xl" style={{ background: "rgba(192,57,43,0.05)", border: "1px solid rgba(192,57,43,0.10)" }}>
        <X size={15} style={{ color: "var(--color-brand-red)", flexShrink: 0, marginTop: 2 }} strokeWidth={2.5} />
        <span className="text-sm leading-snug" style={{ fontFamily: "var(--font-inter)", color: "var(--color-charcoal)", opacity: 0.72 }}>{without}</span>
      </div>
      <div className="flex items-start gap-3 px-4 py-3 rounded-xl" style={{ background: "rgba(39,174,96,0.06)", border: "1px solid rgba(39,174,96,0.14)" }}>
        <Check size={15} style={{ color: "var(--color-leaf-green)", flexShrink: 0, marginTop: 2 }} strokeWidth={2.5} />
        <span className="text-sm leading-snug" style={{ fontFamily: "var(--font-inter)", color: "var(--color-charcoal)", opacity: 0.72 }}>{with_}</span>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ProblemSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="problem" className="py-24 sm:py-32" style={{ background: "var(--color-cream)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="mb-14 max-w-2xl">
          <motion.span
            className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: "var(--font-inter)", color: "var(--color-brand-red)" }}
            initial={reducedMotion ? {} : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, ease: EASE.snap }}
          >
            The Challenge
          </motion.span>

          {/* Headline using TextReveal */}
          <TextReveal
            text="The daily meal crisis."
            as="h2"
            stagger={0.07}
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--color-charcoal)",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
            }}
          />
        </div>

        {/* ── Problem Cards — depthRise staggered ─────────────── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          variants={staggerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {PROBLEMS.map((p) => <ProblemCard key={p.id} problem={p} />)}
        </motion.div>

        {/* ── Contrast Comparison ──────────────────────────────── */}
        <motion.div
          className="rounded-3xl p-8 sm:p-10"
          style={{ background: "#fff", boxShadow: "0 2px 32px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.05)" }}
          variants={blurIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {/* Column headers */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl" style={{ fontFamily: "var(--font-inter)", background: "rgba(192,57,43,0.07)", color: "var(--color-brand-red)" }}>
              <X size={14} strokeWidth={2.5} /> Without Ghar Ka Khaana
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl" style={{ fontFamily: "var(--font-inter)", background: "rgba(39,174,96,0.08)", color: "var(--color-leaf-green)" }}>
              <Check size={14} strokeWidth={2.5} /> With Ghar Ka Khaana
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {COMPARISON_ROWS.map((row, i) => (
              <ComparisonRow key={i} without={row.without} with_={row.with_} delay={i * 0.09} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
