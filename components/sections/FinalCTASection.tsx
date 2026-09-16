"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChefHat, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { FINAL_CTA } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import {
  springScale, blurIn, fadeUp,
  staggerContainer, staggerFast, viewport,
} from "@/lib/animations";

// ─── Trust Badges ─────────────────────────────────────────────────────────────

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "FSSAI Certified",     sub: "Verified & compliant kitchens",      bg: "rgba(16,185,129,0.08)", color: "#059669" },
  { icon: Heart,       label: "100% Home Cooked",    sub: "Prepared by neighbourhood mothers",   bg: "rgba(244,63,94,0.08)",  color: "#e11d48" },
  { icon: Sparkles,    label: "Zero Preservatives",  sub: "Wholesome fresh daily ingredients",   bg: "rgba(245,158,11,0.08)", color: "#d97706" },
] as const;

// ─── Main Component ───────────────────────────────────────────────────────────

export function FinalCTASection() {
  return (
    <section
      id="final-cta"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: "var(--color-cream)" }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-3xl"
          style={{ background: "var(--color-brand-red)", opacity: 0.045 }} />
        <div className="absolute bottom-0 right-8 w-[380px] h-[380px] rounded-full blur-2xl"
          style={{ background: "var(--color-saffron)", opacity: 0.06 }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* Eyebrow — blur in */}
        <motion.div
          variants={blurIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
          style={{ background: "rgba(192,57,43,0.08)", color: "var(--color-brand-red)", border: "1px solid rgba(192,57,43,0.18)", fontFamily: "var(--font-inter)" }}
        >
          <Sparkles className="w-4 h-4" />
          Fresh. Hygienic. Homemade.
        </motion.div>

        {/* Headline — TextReveal */}
        <div className="mb-6 flex justify-center">
          <TextReveal
            text={FINAL_CTA.headline}
            as="h2"
            stagger={0.07}
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--color-charcoal)",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          />
        </div>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: "var(--font-inter)", color: "var(--color-charcoal)", opacity: 0.68 }}
        >
          {FINAL_CTA.subtext}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={staggerContainer(0.1, 0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.div variants={fadeUp}>
            <MagneticButton href="#how-it-works" variant="primary" className="px-8 py-4 text-base font-semibold flex items-center gap-2">
              <span>{FINAL_CTA.ctaPrimary}</span>
              <ArrowRight className="w-5 h-5" />
            </MagneticButton>
          </motion.div>
          <motion.div variants={fadeUp}>
            <MagneticButton href="#kitchen-queen" variant="secondary" className="px-8 py-4 text-base font-semibold flex items-center gap-2">
              <ChefHat className="w-5 h-5" />
              <span>{FINAL_CTA.ctaSecondary}</span>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Trust badges — springScale icon pop */}
        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8"
          style={{ borderTop: "1px solid rgba(28,28,30,0.10)" }}
        >
          {TRUST_BADGES.map(({ icon: Icon, label, sub, bg, color }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="flex items-center justify-center gap-3"
            >
              {/* Spring-popping icon */}
              <motion.div
                variants={springScale}
                className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: bg }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </motion.div>
              <div className="text-left">
                <p className="font-semibold text-sm" style={{ fontFamily: "var(--font-inter)", color: "var(--color-charcoal)" }}>{label}</p>
                <p className="text-xs mt-0.5" style={{ fontFamily: "var(--font-inter)", color: "var(--color-charcoal)", opacity: 0.55 }}>{sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
