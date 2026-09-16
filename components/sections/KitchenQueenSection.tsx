"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { KITCHEN_QUEEN } from "@/lib/constants";
import { EASE } from "@/lib/animations";

const PILLARS = [
  { label: "Training",  color: "var(--color-saffron)"    },
  { label: "Safety",    color: "var(--color-leaf-green)"  },
  { label: "Packaging", color: "var(--color-brand-red)"   },
  { label: "Support",   color: "var(--color-turmeric)"    },
];

const INCOME_STEPS = [
  {
    step: "01",
    title: "Apply & get verified",
    desc: "Quick onboarding process with a home kitchen assessment.",
  },
  {
    step: "02",
    title: "Cook for your neighbourhood",
    desc: "Receive meal orders from nearby customers on the app.",
  },
  {
    step: "03",
    title: "Earn on your schedule",
    desc: "Set your availability, cook when it suits you.",
  },
];

// ─── Variants — defined OUTSIDE the component so they are stable references ──
// Using EASE.out (typed [n,n,n,n] array) instead of ease:"easeOut" string
// to satisfy Framer Motion v13's strict Easing type.

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE.out },
  },
};

// ─── Kitchen Illustration ────────────────────────────────────────────────────

function KitchenIllustration({ reducedMotion }: { reducedMotion: boolean }) {
  // Use typed ease arrays throughout — never plain strings
  const loopTransition = {
    duration: 1.4,
    repeat: Infinity,
    ease: EASE.inOut,
  } as const;

  const flameTransition = {
    duration: 1.2,
    repeat: Infinity,
    ease: EASE.inOut,
  } as const;

  const steamTransition = (delay: number) => ({
    duration: 2.2,
    repeat: Infinity,
    ease: EASE.inOut,
    delay,
  });

  return (
    <svg
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-sm mx-auto"
      aria-label="Kitchen illustration with pot, steam, and tiffin"
      role="img"
    >
      {/* Flame glow */}
      <motion.ellipse
        cx="160" cy="220" rx="22" ry="8"
        fill="rgba(230,126,34,0.25)"
        animate={reducedMotion ? {} : { scaleX: [1, 1.1, 0.95, 1], opacity: [0.6, 1, 0.7, 0.6] }}
        transition={loopTransition}
      />
      {/* Flame outer */}
      <motion.path
        d="M152 218 Q156 200 160 210 Q164 195 160 218"
        fill="var(--color-saffron)"
        animate={reducedMotion ? {} : { scaleY: [1, 1.1, 0.92, 1], opacity: [0.9, 1, 0.85, 0.9] }}
        transition={flameTransition}
      />
      {/* Flame inner */}
      <motion.path
        d="M157 218 Q160 202 163 218"
        fill="var(--color-turmeric)"
        animate={reducedMotion ? {} : { scaleY: [1, 1.15, 0.9, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: EASE.inOut, delay: 0.2 }}
      />

      {/* Stove base */}
      <rect x="105" y="218" width="110" height="14" rx="4" fill="#4A3728" />
      <rect x="115" y="214" width="90"  height="6"  rx="2" fill="#5C4533" />

      {/* Pot body */}
      <rect x="120" y="165" width="80" height="52" rx="12" fill="#C0392B" />
      <rect x="118" y="162" width="84" height="12" rx="6"  fill="#A93226" />
      {/* Pot shine */}
      <ellipse cx="145" cy="175" rx="6" ry="3" fill="rgba(255,255,255,0.18)" />
      {/* Pot handles */}
      <rect x="107" y="170" width="14" height="7" rx="3.5" fill="#922B21" />
      <rect x="199" y="170" width="14" height="7" rx="3.5" fill="#922B21" />
      {/* Pot lid */}
      <ellipse cx="160" cy="162" rx="42" ry="8" fill="#E74C3C" />
      <ellipse cx="160" cy="160" rx="42" ry="6" fill="#CB4335" />
      <circle  cx="160" cy="155" r="6"           fill="#A93226" />

      {/* Steam wisps */}
      {!reducedMotion && (
        <>
          <motion.path
            d="M148 150 Q144 138 148 126 Q152 114 148 102"
            stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 0.7, 0] }}
            transition={steamTransition(0)}
          />
          <motion.path
            d="M160 148 Q156 134 160 120 Q164 106 160 92"
            stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 0.55, 0] }}
            transition={steamTransition(0.5)}
          />
          <motion.path
            d="M172 150 Q176 136 172 122 Q168 108 172 94"
            stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 0.5, 0] }}
            transition={steamTransition(1)}
          />
        </>
      )}

      {/* Wooden spoon */}
      <motion.g
        style={{ originX: "190px", originY: "200px" }}
        animate={reducedMotion ? {} : { rotate: [0, 6, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: EASE.inOut }}
      >
        <rect    x="186" y="130" width="8"  height="72" rx="4"  fill="#C8A97A" />
        <ellipse cx="190" cy="126" rx="11" ry="7"           fill="#D4B08A" />
        <ellipse cx="190" cy="126" rx="7"  ry="4"           fill="#C8A97A" />
      </motion.g>

      {/* Tiffin box */}
      <g transform="translate(228, 155)">
        <rect x="0" y="20" width="52" height="52" rx="6"   fill="var(--color-saffron)"  />
        <rect x="0" y="12" width="52" height="12" rx="4"   fill="var(--color-turmeric)" />
        <rect x="4" y="8"  width="44" height="6"  rx="3"   fill="#F0A500"               />
        <rect x="10" y="4" width="32" height="5"  rx="2.5" fill="var(--color-turmeric)" />
        <rect x="0" y="36" width="52" height="2"  rx="1"   fill="rgba(255,255,255,0.3)" />
        <rect x="0" y="52" width="52" height="2"  rx="1"   fill="rgba(255,255,255,0.3)" />
      </g>

      {/* Decorative dots */}
      <circle cx="80"  cy="100" r="4" fill="rgba(192,57,43,0.15)"  />
      <circle cx="68"  cy="140" r="6" fill="rgba(230,126,34,0.12)" />
      <circle cx="240" cy="100" r="5" fill="rgba(39,174,96,0.15)"  />
      <circle cx="258" cy="135" r="3" fill="rgba(243,156,18,0.18)" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function KitchenQueenSection() {
  const reducedMotion = useReducedMotion();
  // useInView creates and returns its own ref — no need to pass one in
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.1, once: true });

  const headline =
    KITCHEN_QUEEN?.headline ?? "Cook from home. Earn from the heart.";
  const subheadline =
    KITCHEN_QUEEN?.subheadline ??
    "Ghar Ka Khaana empowers home cooks — especially women — to turn their passion for cooking into a sustainable income, right from their own kitchen.";

  return (
    <section
      id="kitchen-queen"
      ref={sectionRef}
      style={{
        background:
          "linear-gradient(160deg, var(--color-cream) 0%, #FEF0E2 50%, #FDF5EC 100%)",
      }}
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Background decorative blob */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(230,126,34,0.07) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: EASE.out }}
          className="text-center mb-4"
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1 rounded-full"
            style={{
              color: "var(--color-saffron)",
              background: "rgba(230,126,34,0.1)",
              fontFamily: "var(--font-inter)",
            }}
          >
            For Home Cooks
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-5xl font-bold leading-tight"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "var(--color-brand-red)",
              }}
            >
              {headline}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg leading-relaxed max-w-lg"
              style={{
                fontFamily: "var(--font-inter)",
                color: "var(--color-charcoal)",
                opacity: 0.78,
              }}
            >
              {subheadline}
            </motion.p>

            {/* Pillar badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {PILLARS.map((pillar) => (
                <span
                  key={pillar.label}
                  className="px-4 py-2 rounded-full text-sm font-semibold"
                  style={{
                    background: pillar.color,
                    color: "#fff",
                    fontFamily: "var(--font-inter)",
                    boxShadow: `0 2px 10px ${pillar.color}40`,
                  }}
                >
                  {pillar.label}
                </span>
              ))}
            </motion.div>

            {/* Primary CTA */}
            <motion.div variants={itemVariants}>
              <MagneticButton
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base"
                style={{
                  background: "var(--color-brand-red)",
                  color: "#fff",
                  fontFamily: "var(--font-inter)",
                  boxShadow: "0 4px 20px rgba(192,57,43,0.35)",
                }}
              >
                Become a Home Cook
              </MagneticButton>
            </motion.div>

            {/* Income steps */}
            <motion.div variants={containerVariants} className="flex flex-col gap-4 mt-2">
              {INCOME_STEPS.map((s) => (
                <motion.div key={s.step} variants={itemVariants} className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      background: "rgba(192,57,43,0.1)",
                      color: "var(--color-brand-red)",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {s.step}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-inter)" }}>
                      {s.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--color-charcoal)", opacity: 0.6, fontFamily: "var(--font-inter)" }}>
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Income note */}
            <motion.p
              variants={itemVariants}
              className="text-xs"
              style={{ color: "var(--color-charcoal)", opacity: 0.4, fontFamily: "var(--font-inter)" }}
            >
              Income opportunity varies by location, demand, and meal volume.
            </motion.p>
          </motion.div>

          {/* Right: illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE.out }}
            className="flex items-center justify-center"
          >
            <div
              className="relative w-full max-w-sm rounded-3xl p-8"
              style={{
                background: "rgba(255,253,249,0.85)",
                boxShadow: "0 8px 48px rgba(192,57,43,0.08), 0 2px 8px rgba(0,0,0,0.04)",
                backdropFilter: "blur(4px)",
              }}
            >
              <KitchenIllustration reducedMotion={reducedMotion} />
              {/* Floating badge */}
              <div
                className="absolute -top-4 -right-4 px-4 py-2 rounded-full text-xs font-semibold"
                style={{
                  background: "var(--color-leaf-green)",
                  color: "#fff",
                  fontFamily: "var(--font-inter)",
                  boxShadow: "0 4px 16px rgba(39,174,96,0.3)",
                }}
              >
                🌿 Home Kitchen
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
