"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Bell,
  MapPin,
  Star,
  Zap,
  ChevronDown,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MEAL_PLANS, PREFERENCES, DURATIONS, MEALS } from "@/lib/constants";
import { EASE } from "@/lib/animations";

// ─── Types ────────────────────────────────────────────────────────────────────

type PlanId = (typeof MEAL_PLANS)[number]["id"];

// ─── Feature highlights for the right column ──────────────────────────────────

const FEATURE_HIGHLIGHTS = [
  {
    icon: Bell,
    title: "Smart Meal Reminders",
    description: "Get notified before your meal slot so you're never hungry.",
    color: "#E67E22",
  },
  {
    icon: MapPin,
    title: "Hyperlocal Delivery",
    description: "Meals dispatched from home cooks in your own neighbourhood.",
    color: "#27AE60",
  },
  {
    icon: Star,
    title: "Preference Engine",
    description: "Regional, dietary and spice preferences remembered forever.",
    color: "#F39C12",
  },
  {
    icon: Zap,
    title: "Three-Tap Ordering",
    description: "Select plan → confirm timing → done. Meal subscriptions made simple.",
    color: "#C0392B",
  },
] as const;

// ─── Variants ─────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE.out } },
};

// ─── Phone App UI ─────────────────────────────────────────────────────────────

interface AppUIProps {
  interactive: boolean;
  reducedMotion: boolean;
}

function AppUI({ interactive, reducedMotion }: AppUIProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>("standard");
  const [selectedPref, setSelectedPref] = useState<string>(PREFERENCES[0]);
  const [selectedMeal, setSelectedMeal] = useState<string>(MEALS[0]);
  const [selectedDuration, setSelectedDuration] = useState<string>(DURATIONS[0]);
  const [prefOpen, setPrefOpen] = useState(false);

  const currentPlan = MEAL_PLANS.find((p) => p.id === selectedPlanId) ?? MEAL_PLANS[1];

  const tabTransition = reducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 380, damping: 30 };

  return (
    <div
      style={{
        fontFamily: "var(--font-inter)",
        background: "var(--color-warm-white)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: "inherit",
      }}
    >
      {/* Status bar */}
      <div
        style={{
          background: "var(--color-brand-red)",
          padding: "6px 14px 4px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#fff", fontSize: 10, fontWeight: 600, letterSpacing: 0.4 }}>
          Kitchen Queens
        </span>
        <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 9 }}>9:41 AM</span>
      </div>

      {/* Plan tabs */}
      <div
        style={{
          display: "flex",
          background: "rgba(192,57,43,0.06)",
          margin: "10px 10px 0",
          borderRadius: 10,
          padding: 3,
          gap: 2,
        }}
      >
        {MEAL_PLANS.map((plan) => {
          const active = plan.id === selectedPlanId;
          return (
            <button
              key={plan.id}
              onClick={() => interactive && setSelectedPlanId(plan.id as PlanId)}
              style={{
                flex: 1,
                padding: "5px 4px",
                borderRadius: 8,
                border: "none",
                fontSize: 10,
                fontWeight: active ? 700 : 500,
                cursor: interactive ? "pointer" : "default",
                background: active ? "var(--color-brand-red)" : "transparent",
                color: active ? "#fff" : "var(--color-charcoal)",
                transition: reducedMotion ? "none" : "all 0.2s",
                letterSpacing: 0.2,
              }}
            >
              {plan.name}
            </button>
          );
        })}
      </div>

      {/* Plan description & features */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedPlanId}
          initial={reducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? {} : { opacity: 0, y: -6 }}
          transition={tabTransition}
          style={{ flex: 1, overflow: "auto", padding: "8px 12px 0" }}
        >
          {/* Plan tagline */}
          <p style={{ fontSize: 10, color: "var(--color-saffron)", fontWeight: 600, marginBottom: 4 }}>
            {currentPlan.tagline}
          </p>

          {/* Feature list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 10 }}>
            {currentPlan.features.map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <CheckCircle2 size={11} color="var(--color-leaf-green)" />
                <span style={{ fontSize: 10.5, color: "var(--color-charcoal)" }}>{f}</span>
              </div>
            ))}
          </div>

          {/* Preference dropdown */}
          <label style={{ fontSize: 9, fontWeight: 600, color: "#888", letterSpacing: 0.5, display: "block", marginBottom: 3 }}>
            CUISINE PREFERENCE
          </label>
          <div style={{ position: "relative", marginBottom: 8 }}>
            <button
              onClick={() => interactive && setPrefOpen((v) => !v)}
              style={{
                width: "100%",
                padding: "5px 8px",
                borderRadius: 7,
                border: "1px solid rgba(192,57,43,0.25)",
                background: "#fff",
                fontSize: 10,
                textAlign: "left",
                cursor: interactive ? "pointer" : "default",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "var(--color-charcoal)",
              }}
            >
              {selectedPref}
              <ChevronDown
                size={10}
                color="var(--color-brand-red)"
                style={{
                  transform: prefOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s",
                }}
              />
            </button>
            {prefOpen && interactive && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 2px)",
                  left: 0,
                  right: 0,
                  background: "#fff",
                  border: "1px solid rgba(192,57,43,0.2)",
                  borderRadius: 7,
                  overflow: "hidden",
                  zIndex: 20,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                }}
              >
                {PREFERENCES.map((pref) => (
                  <button
                    key={pref}
                    onClick={() => {
                      setSelectedPref(pref);
                      setPrefOpen(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "5px 8px",
                      fontSize: 10,
                      border: "none",
                      background: pref === selectedPref ? "rgba(192,57,43,0.08)" : "#fff",
                      textAlign: "left",
                      cursor: "pointer",
                      color: "var(--color-charcoal)",
                      fontWeight: pref === selectedPref ? 600 : 400,
                    }}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Meal timing toggle */}
          <label style={{ fontSize: 9, fontWeight: 600, color: "#888", letterSpacing: 0.5, display: "block", marginBottom: 3 }}>
            MEAL TIMING
          </label>
          <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
            {MEALS.map((meal) => (
              <button
                key={meal}
                onClick={() => interactive && setSelectedMeal(meal)}
                style={{
                  flex: 1,
                  padding: "4px 2px",
                  borderRadius: 6,
                  border: "1px solid",
                  borderColor: selectedMeal === meal ? "var(--color-brand-red)" : "rgba(0,0,0,0.12)",
                  background: selectedMeal === meal ? "rgba(192,57,43,0.08)" : "#fff",
                  fontSize: 9.5,
                  fontWeight: selectedMeal === meal ? 700 : 400,
                  color: selectedMeal === meal ? "var(--color-brand-red)" : "#666",
                  cursor: interactive ? "pointer" : "default",
                  transition: reducedMotion ? "none" : "all 0.15s",
                }}
              >
                {meal}
              </button>
            ))}
          </div>

          {/* Duration selector */}
          <label style={{ fontSize: 9, fontWeight: 600, color: "#888", letterSpacing: 0.5, display: "block", marginBottom: 3 }}>
            DURATION
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 10 }}>
            {DURATIONS.map((d) => (
              <button
                key={d}
                onClick={() => interactive && setSelectedDuration(d)}
                style={{
                  padding: "4px 8px",
                  borderRadius: 6,
                  border: "1px solid",
                  borderColor: selectedDuration === d ? "var(--color-saffron)" : "rgba(0,0,0,0.1)",
                  background: selectedDuration === d ? "rgba(230,126,34,0.1)" : "#fff",
                  fontSize: 10,
                  fontWeight: selectedDuration === d ? 600 : 400,
                  color: selectedDuration === d ? "var(--color-saffron)" : "#666",
                  cursor: interactive ? "pointer" : "default",
                  textAlign: "left",
                  transition: reducedMotion ? "none" : "all 0.15s",
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Illustrative note */}
      <div
        style={{
          padding: "6px 12px",
          background: "rgba(0,0,0,0.03)",
          borderTop: "1px solid rgba(0,0,0,0.07)",
        }}
      >
        <p style={{ fontSize: 8, color: "#999", textAlign: "center", fontStyle: "italic", margin: 0 }}>
          Illustrative demo — actual app in development
        </p>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function HowItWorksSection() {
  const reducedMotion = useReducedMotion();
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [interactive, setInteractive] = useState(false);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      style={{ background: "var(--color-charcoal)" }}
      className="relative overflow-hidden py-24 lg:py-32"
    >
      {/* Background texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(192,57,43,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(230,126,34,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section label */}
        <motion.p
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-3 text-center text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--color-saffron)", fontFamily: "var(--font-inter)" }}
        >
          App Preview
        </motion.p>

        {/* Headline */}
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16 text-center text-4xl font-bold leading-tight lg:text-5xl"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--color-warm-white)",
          }}
        >
          Your daily meal,{" "}
          <em style={{ color: "var(--color-saffron)", fontStyle: "italic" }}>
            three taps away.
          </em>
        </motion.h2>

        {/* Two-column layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:gap-12"
        >
          {/* ─ LEFT: Phone mockup ──────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-4"
          >
            {/* Phone frame */}
            <div
              style={{
                width: 240,
                height: 500,
                borderRadius: 36,
                border: "6px solid rgba(255,255,255,0.15)",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
                background: "var(--color-warm-white)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Notch */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 80,
                  height: 20,
                  background: "var(--color-charcoal)",
                  borderRadius: "0 0 14px 14px",
                  zIndex: 10,
                }}
              />
              <div style={{ marginTop: 20, height: "calc(100% - 20px)", overflow: "hidden" }}>
                <AppUI interactive={interactive} reducedMotion={reducedMotion} />
              </div>
              {/* Bottom home bar */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: 8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 60,
                  height: 4,
                  background: "rgba(0,0,0,0.2)",
                  borderRadius: 4,
                }}
              />
            </div>

            {/* Toggle interactivity button */}
            <motion.button
              whileHover={reducedMotion ? {} : { scale: 1.04 }}
              whileTap={reducedMotion ? {} : { scale: 0.97 }}
              onClick={() => setInteractive((v) => !v)}
              style={{
                padding: "10px 24px",
                borderRadius: 999,
                border: `1.5px solid ${interactive ? "var(--color-saffron)" : "rgba(255,255,255,0.25)"}`,
                background: interactive ? "rgba(230,126,34,0.15)" : "transparent",
                color: interactive ? "var(--color-saffron)" : "rgba(255,255,255,0.6)",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "var(--font-inter)",
                transition: reducedMotion ? "none" : "all 0.2s",
                letterSpacing: 0.3,
              }}
            >
              {interactive ? "\u2713 Demo active" : "Try the demo"}
            </motion.button>

            {/* Plan illustrative note */}
            <p
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.35)",
                fontStyle: "italic",
                textAlign: "center",
                fontFamily: "var(--font-inter)",
                maxWidth: 200,
              }}
            >
              Plan prices are illustrative. Actual pricing TBD.
            </p>
          </motion.div>

          {/* ─ RIGHT: Feature highlights ───────────────────── */}
          <div className="flex flex-1 flex-col gap-6 lg:pt-6">
            {FEATURE_HIGHLIGHTS.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  variants={itemVariants}
                  custom={i}
                  className="flex gap-4 rounded-2xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {/* Icon circle */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: `${feat.color}20`,
                      border: `1px solid ${feat.color}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: feat.color,
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  {/* Text */}
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-playfair)",
                        color: "var(--color-warm-white)",
                        fontSize: 17,
                        fontWeight: 700,
                        marginBottom: 4,
                      }}
                    >
                      {feat.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        color: "rgba(255,255,255,0.55)",
                        fontSize: 13.5,
                        lineHeight: 1.6,
                      }}
                    >
                      {feat.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
