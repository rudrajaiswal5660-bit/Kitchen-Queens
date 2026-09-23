"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChefHat, CheckCircle2, Clock, Star } from "lucide-react";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextRevealLines } from "@/components/ui/TextReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useParallax } from "@/hooks/useParallax";
import { HERO } from "@/lib/constants";
import { EASE, blurIn, fadeUp, popIn, staggerContainer } from "@/lib/animations";

// ─── Floating info chip ───────────────────────────────────────────────────────

function FloatChip({
  icon,
  label,
  sublabel,
  className,
  animClass,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  className?: string;
  animClass?: string;
}) {
  return (
    <div
      className={`float-card ${animClass ?? ""} ${className ?? ""}`}
      style={{
        zIndex: 10,
        minWidth: 140,
      }}
    >
      <span style={{ fontSize: 22 }}>{icon}</span>
      <div>
        <p style={{ fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 13, color: "var(--color-charcoal)", margin: 0 }}>
          {label}
        </p>
        {sublabel && (
          <p style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "var(--color-charcoal)", opacity: 0.55, margin: 0 }}>
            {sublabel}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Ambient spice particle ───────────────────────────────────────────────────

function SpiceParticle({ size, color, style }: { size: number; color: string; style: React.CSSProperties }) {
  return (
    <div
      aria-hidden="true"
      className="floatParticle"
      style={{ position: "absolute", width: size, height: size, borderRadius: "50%", background: color, pointerEvents: "none", ...style }}
    />
  );
}

// ─── Food image card (right side of hero) ─────────────────────────────────────

function FoodCard({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="relative w-full flex items-center justify-center" style={{ minHeight: 460 }}>
      {/* Main food card */}
      <div
        className="relative food-card"
        style={{
          width: "min(340px, 90vw)",
          height: 360,
          background: "linear-gradient(135deg, #FFF3D6 0%, #FFE8A8 40%, #FFD98A 100%)",
          borderRadius: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 24px 80px rgba(192,57,43,0.18), 0 4px 24px rgba(0,0,0,0.08)",
          overflow: "visible",
        }}
      >
        {/* Big food emoji */}
        <div
          style={{
            fontSize: "clamp(7rem, 14vw, 10rem)",
            lineHeight: 1,
            filter: "drop-shadow(0 16px 32px rgba(192,57,43,0.25))",
            userSelect: "none",
          }}
          aria-label="Indian home-cooked tiffin meal"
          role="img"
        >
          🍱
        </div>

        {/* Decorative ring */}
        {!reducedMotion && (
          <motion.div
            style={{
              position: "absolute",
              inset: -24,
              border: "1.5px dashed rgba(192,57,43,0.15)",
              borderRadius: "2.75rem",
              pointerEvents: "none",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Soft glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "2rem",
            background: "radial-gradient(ellipse at 50% 80%, rgba(230,126,34,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── Floating chips ──────────────────────────────────── */}
      {/* Chip 1 — Fresh & Hot */}
      <div
        className="float-anim-1"
        style={{
          position: "absolute",
          top: "6%",
          left: "-4%",
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
          padding: "0.625rem 0.875rem",
          borderRadius: "0.875rem",
          background: "rgba(255,253,249,0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(192,57,43,0.14)",
          boxShadow: "0 8px 32px rgba(28,28,30,0.12)",
          zIndex: 10,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontSize: 20 }}>🍲</span>
        <div>
          <p style={{ fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 12.5, color: "var(--color-charcoal)", margin: 0 }}>Fresh &amp; Hot</p>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "var(--color-charcoal)", opacity: 0.5, margin: 0 }}>Prepared daily</p>
        </div>
      </div>

      {/* Chip 2 — Verified Cook */}
      <div
        className="float-anim-2"
        style={{
          position: "absolute",
          bottom: "12%",
          left: "-8%",
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
          padding: "0.625rem 0.875rem",
          borderRadius: "0.875rem",
          background: "rgba(255,253,249,0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(39,174,96,0.2)",
          boxShadow: "0 8px 32px rgba(28,28,30,0.12)",
          zIndex: 10,
          whiteSpace: "nowrap",
        }}
      >
        <CheckCircle2 size={20} style={{ color: "var(--color-leaf-green)", flexShrink: 0 }} />
        <div>
          <p style={{ fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 12.5, color: "var(--color-charcoal)", margin: 0 }}>Verified Home Cook</p>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "var(--color-charcoal)", opacity: 0.5, margin: 0 }}>FSSAI compliant</p>
        </div>
      </div>

      {/* Chip 3 — Delivery */}
      <div
        className="float-anim-3"
        style={{
          position: "absolute",
          top: "12%",
          right: "-4%",
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
          padding: "0.625rem 0.875rem",
          borderRadius: "0.875rem",
          background: "rgba(255,253,249,0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(230,126,34,0.2)",
          boxShadow: "0 8px 32px rgba(28,28,30,0.12)",
          zIndex: 10,
          whiteSpace: "nowrap",
        }}
      >
        <Clock size={18} style={{ color: "var(--color-saffron)", flexShrink: 0 }} />
        <div>
          <p style={{ fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 12.5, color: "var(--color-charcoal)", margin: 0 }}>Daily Delivery</p>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "var(--color-charcoal)", opacity: 0.5, margin: 0 }}>To your doorstep</p>
        </div>
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const foodRef = useRef<HTMLDivElement>(null);
  const foodY = useParallax(foodRef, 45);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--color-warm-white)" }}
    >
      {/* ── Background ambient particles ───────────────────── */}
      {!reducedMotion && (
        <>
          <SpiceParticle size={300} color="var(--color-saffron)"    style={{ top: "-100px", right: "5%",   animationDuration: "9s",  animationDelay: "0s"   }} />
          <SpiceParticle size={200} color="var(--color-brand-red)"  style={{ top: "35%",   left: "-80px",  animationDuration: "12s", animationDelay: "1.8s" }} />
          <SpiceParticle size={140} color="var(--color-turmeric)"   style={{ bottom: "12%", left: "22%",  animationDuration: "10s", animationDelay: "1.1s" }} />
          <SpiceParticle size={100} color="var(--color-leaf-green)" style={{ top: "10%",   left: "43%",   animationDuration: "14s", animationDelay: "2.4s" }} />
          <SpiceParticle size={76}  color="var(--color-brand-red)"  style={{ bottom: "28%", right: "18%", animationDuration: "8s",  animationDelay: "0.6s" }} />
          <SpiceParticle size={54}  color="var(--color-saffron)"    style={{ top: "68%",   right: "36%", animationDuration: "11s", animationDelay: "3.5s" }} />
        </>
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center py-28 lg:py-20 min-h-screen lg:min-h-0">

          {/* ── LEFT: Copy ───────────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-7"
            variants={staggerContainer(0.12, 0.06)}
            initial="hidden"
            animate="visible"
          >
            {/* Pill eyebrow */}
            <motion.div variants={blurIn}>
              <span
                className="pill-badge"
              >
                <span className="pill-dot" />
                <ChefHat size={12} aria-hidden="true" />
                Indian Food-Tech
              </span>
            </motion.div>

            {/* Headline */}
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
                <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
              </MagneticButton>
              <MagneticButton variant="secondary" onClick={() => scrollTo("kitchen-queen")}>
                {HERO.ctaSecondary}
              </MagneticButton>
            </motion.div>

            {/* Trust pill */}
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
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-leaf-green)", flexShrink: 0, boxShadow: "0 0 0 3px rgba(39,174,96,0.22)" }} />
                {HERO.floatingLabel}
              </span>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div variants={fadeUp} className="hidden sm:flex mt-2">
              <ScrollIndicator label={HERO.scrollLabel} />
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Food card with floating chips ─────────── */}
          <motion.div
            ref={foodRef}
            className="relative flex items-center justify-center"
            initial={reducedMotion ? {} : { opacity: 0, scale: 0.88, y: 40 }}
            animate={reducedMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: EASE.out }}
            style={reducedMotion ? {} : { y: foodY }}
          >
            <FoodCard reducedMotion={reducedMotion} />
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
