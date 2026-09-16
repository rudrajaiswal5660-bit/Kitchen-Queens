"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, ChefHat, Sparkles } from "lucide-react";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextRevealLines } from "@/components/ui/TextReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useParallax } from "@/hooks/useParallax";
import { HERO } from "@/lib/constants";
import { EASE, blurIn, fadeUp, popIn, staggerContainer, viewport } from "@/lib/animations";

// ─── CSS Tiffin Fallback ──────────────────────────────────────────────────────

function TiffinFallback() {
  const tiers = [
    { food: "#F5A623", opacity: 0.85, w: 108, h: 30, r: "50%"             },
    { food: "#F0EAD6", opacity: 0.9,  w: 118, h: 28, r: "50%"             },
    { food: "#7DBE73", opacity: 0.85, w: 100, h: 30, r: "50%"             },
  ];
  return (
    <div className="flex flex-col items-center gap-1 select-none" aria-hidden="true"
      style={{ filter: "drop-shadow(0 24px 40px rgba(192,57,43,0.18))" }}>
      {/* Handle */}
      <div style={{ width: 44, height: 14, borderRadius: 7, background: "linear-gradient(135deg,#c8c8c8,#a0a0a0)", marginBottom: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.18)" }} />
      {/* Lid */}
      <div style={{ width: 140, height: 20, borderRadius: "10px 10px 4px 4px", background: "linear-gradient(135deg,#d8d8d8,#aaaaaa)", boxShadow: "0 4px 12px rgba(0,0,0,0.14)" }} />
      {/* Compartments */}
      {tiers.map(({ food, opacity, w, h, r }, i) => (
        <div key={i} style={{
          width: 148, height: 56,
          borderRadius: i === 2 ? "4px 4px 12px 12px" : 8,
          background: `linear-gradient(180deg,${["#ebebeb","#e2e2e2","#dadada"][i]},${["#d8d8d8","#d0d0d0","#c4c4c4"][i]})`,
          boxShadow: `inset 0 2px 8px rgba(0,0,0,0.07), 0 ${i===2?"8px 24px rgba(0,0,0,0.16)":"4px 12px rgba(0,0,0,0.10)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: w, height: h, borderRadius: r, background: food, opacity }} />
        </div>
      ))}
    </div>
  );
}

// ─── Dynamic 3D scene ─────────────────────────────────────────────────────────

const TiffinScene = dynamic(
  () => import("@/components/three/TiffinScene").then((m) => ({ default: m.TiffinScene })),
  { ssr: false, loading: () => <TiffinFallback /> }
);

// ─── Ambient particle (decorative) ───────────────────────────────────────────

function SpiceParticle({ size, color, style }: { size: number; color: string; style: React.CSSProperties }) {
  return (
    <div
      aria-hidden="true"
      className="floatParticle"
      style={{ position: "absolute", width: size, height: size, borderRadius: "50%", background: color, pointerEvents: "none", ...style }}
    />
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const tiffinRef = useRef<HTMLDivElement>(null);

  // Parallax: tiffin rises slightly as hero scrolls out
  const tiffinY = useParallax(tiffinRef, 50);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--color-warm-white)" }}
    >
      {/* ── Ambient background particles ─────────────────────── */}
      {!reducedMotion && (
        <>
          <SpiceParticle size={300} color="var(--color-saffron)"    style={{ top: "-100px", right: "5%",   animationDuration: "9s",  animationDelay: "0s"   }} />
          <SpiceParticle size={200} color="var(--color-brand-red)"  style={{ top: "35%",   left: "-80px",  animationDuration: "12s", animationDelay: "1.8s" }} />
          <SpiceParticle size={140} color="var(--color-turmeric)"   style={{ bottom: "12%", left: "22%",   animationDuration: "10s", animationDelay: "1.1s" }} />
          <SpiceParticle size={100} color="var(--color-leaf-green)" style={{ top: "10%",   left: "43%",   animationDuration: "14s", animationDelay: "2.4s" }} />
          <SpiceParticle size={76}  color="var(--color-brand-red)"  style={{ bottom: "28%", right: "18%",  animationDuration: "8s",  animationDelay: "0.6s" }} />
          <SpiceParticle size={54}  color="var(--color-saffron)"    style={{ top: "68%",   right: "36%",  animationDuration: "11s", animationDelay: "3.5s" }} />
        </>
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center py-28 lg:py-20 min-h-screen lg:min-h-0">

          {/* ── LEFT: Copy ─────────────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-7"
            variants={staggerContainer(0.12, 0.06)}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow label — blur-in */}
            <motion.div variants={blurIn}>
              <span
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] uppercase px-4 py-2 rounded-full"
                style={{
                  fontFamily: "var(--font-inter)",
                  background: "rgba(192,57,43,0.07)",
                  color: "var(--color-brand-red)",
                  border: "1px solid rgba(192,57,43,0.18)",
                }}
              >
                <ChefHat size={13} strokeWidth={2.2} />
                Indian Food-Tech
              </span>
            </motion.div>

            {/* Headline — word-by-word TextReveal */}
            <motion.div variants={fadeUp}>
              <TextRevealLines
                lines={HERO.headline}
                as="h1"
                stagger={0.055}
                lineDelay={0.14}
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2.6rem, 5.5vw, 4.6rem)",
                  fontWeight: 700,
                  color: "var(--color-charcoal)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.07,
                }}
              />
            </motion.div>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg leading-[1.78] max-w-[490px]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--color-charcoal)", opacity: 0.62 }}
            >
              {HERO.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 items-center">
              <MagneticButton variant="primary" onClick={() => scrollTo("how-it-works")} className="inline-flex items-center gap-2">
                {HERO.ctaPrimary}
                <ArrowRight size={16} strokeWidth={2.4} />
              </MagneticButton>
              <MagneticButton variant="secondary" onClick={() => scrollTo("kitchen-queen")}>
                {HERO.ctaSecondary}
              </MagneticButton>
            </motion.div>

            {/* Floating glass pill — spring pop */}
            <motion.div variants={popIn} className="inline-block">
              <span
                className="inline-flex items-center gap-2.5 text-sm font-medium px-5 py-2.5 rounded-full"
                style={{
                  fontFamily: "var(--font-inter)",
                  background: "rgba(255,253,249,0.75)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(192,57,43,0.16)",
                  color: "var(--color-charcoal)",
                  boxShadow: "0 2px 20px rgba(192,57,43,0.08)",
                }}
              >
                {/* Live green dot */}
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-leaf-green)", flexShrink: 0, boxShadow: "0 0 0 3px rgba(39,174,96,0.22)" }} />
                {HERO.floatingLabel}
              </span>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div variants={fadeUp} className="hidden sm:flex mt-2">
              <ScrollIndicator label={HERO.scrollLabel} />
            </motion.div>
          </motion.div>

          {/* ── RIGHT: 3D Tiffin with parallax ─────────────────── */}
          <motion.div
            ref={tiffinRef}
            className="relative flex items-center justify-center"
            initial={reducedMotion ? {} : { opacity: 0, scale: 0.88 }}
            animate={reducedMotion ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: EASE.out }}
            style={reducedMotion ? {} : { y: tiffinY }}
          >
            {/* 3D Canvas (desktop) */}
            <div className="hidden lg:block w-full" style={{ height: 540 }}>
              <TiffinScene />
            </div>
            {/* CSS fallback (mobile or while loading) */}
            <div className="lg:hidden py-10">
              <TiffinFallback />
            </div>

            {/* Rotating orbit rings for depth */}
            {!reducedMotion && (
              <>
                <motion.div
                  className="absolute hidden lg:block pointer-events-none rounded-full"
                  style={{ width: 430, height: 430, border: "1px dashed rgba(192,57,43,0.12)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute hidden lg:block pointer-events-none rounded-full"
                  style={{ width: 570, height: 570, border: "1px dashed rgba(230,126,34,0.06)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 72, repeat: Infinity, ease: "linear" }}
                />
                {/* Soft glow behind tiffin */}
                <div
                  className="absolute hidden lg:block pointer-events-none rounded-full"
                  style={{ width: 340, height: 340, background: "radial-gradient(ellipse, rgba(230,126,34,0.12) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: -1 }}
                />
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Mobile scroll indicator */}
      <div className="sm:hidden absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <ScrollIndicator label={HERO.scrollLabel} />
      </div>
    </section>
  );
}
