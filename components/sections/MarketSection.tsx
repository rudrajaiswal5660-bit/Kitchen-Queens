"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CountUp } from "@/components/ui/CountUp";
import { MARKET } from "@/lib/constants";

// ─── Dynamic 3D scene ────────────────────────────────────────────────────────

const MarketRingsScene = dynamic(
  () =>
    import("@/components/three/MarketRingsScene").then((m) => ({
      default: m.MarketRingsScene,
    })),
  { ssr: false, loading: () => <CSSRingsFallback /> }
);

// ─── CSS fallback: concentric rings ──────────────────────────────────────────

function CSSRingsFallback() {
  const rings = [
    { label: "TAM", size: 220, color: "#C0392B", border: "rgba(192,57,43,0.5)" },
    { label: "SAM", size: 150, color: "#E67E22", border: "rgba(230,126,34,0.6)" },
    { label: "SOM", size: 80,  color: "#27AE60", border: "rgba(39,174,96,0.7)"  },
  ] as const;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: 220,
        height: 220,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {rings.map((r) => (
        <div
          key={r.label}
          style={{
            position: "absolute",
            width: r.size,
            height: r.size,
            borderRadius: "50%",
            border: `2px solid ${r.border}`,
            background: `${r.color}18`,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-end",
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: r.color,
              padding: "2px 6px",
              fontFamily: "var(--font-inter)",
            }}
          >
            {r.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Variants ─────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

// ─── Info box data ────────────────────────────────────────────────────────────

const MARKET_BOXES = [
  {
    label: MARKET.tam.label,
    value: MARKET.tam.value,
    description: MARKET.tam.description,
    color: "#C0392B",
    note: "Total Addressable Market (Projected)",
  },
  {
    label: MARKET.sam.label,
    value: MARKET.sam.value,
    description: MARKET.sam.description,
    color: "#E67E22",
    note: "Serviceable Addressable Market (Projected)",
  },
  {
    label: MARKET.som.label,
    value: MARKET.som.value,
    description: MARKET.som.description,
    color: "#27AE60",
    note: "3-Year Target across 5 cities (Planned)",
  },
] as const;

// ─── Main Section ─────────────────────────────────────────────────────────────

export function MarketSection() {
  const reducedMotion = useReducedMotion();
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.1 });

  // Suppress unused variable lint
  void reducedMotion;

  return (
    <section
      id="market"
      ref={sectionRef}
      style={{ background: "var(--color-cream)" }}
      className="relative overflow-hidden py-24 lg:py-32"
    >
      {/* Subtle background radial */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(192,57,43,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section label */}
        <motion.p
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-3 text-center text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--color-brand-red)", fontFamily: "var(--font-inter)" }}
        >
          Market Opportunity
        </motion.p>

        {/* Headline */}
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 text-center text-4xl font-bold leading-tight lg:text-5xl"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--color-charcoal)",
          }}
        >
          A market that{" "}
          <em style={{ color: "var(--color-brand-red)", fontStyle: "italic" }}>
            feeds millions.
          </em>
        </motion.h2>

        {/* ── Large stat numbers ─────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16 grid grid-cols-1 gap-8 sm:grid-cols-2"
        >
          {/* Stat 1: 34M+ */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center rounded-3xl p-8 text-center"
            style={{
              background: "#fff",
              border: "1px solid rgba(192,57,43,0.12)",
              boxShadow: "0 4px 32px rgba(192,57,43,0.07)",
            }}
          >
            <span
              className="mb-2 text-6xl font-bold lg:text-7xl"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "var(--color-brand-red)",
              }}
            >
              <CountUp to={34} suffix="M+" duration={2200} />
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                color: "var(--color-charcoal)",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              {MARKET.stats[0].label}
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 11,
                color: "#999",
                marginTop: 4,
                fontStyle: "italic",
              }}
            >
              Projected figure
            </span>
          </motion.div>

          {/* Stat 2: $6.2B */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center rounded-3xl p-8 text-center"
            style={{
              background: "#fff",
              border: "1px solid rgba(230,126,34,0.12)",
              boxShadow: "0 4px 32px rgba(230,126,34,0.07)",
            }}
          >
            <span
              className="mb-2 text-6xl font-bold lg:text-7xl"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "var(--color-saffron)",
              }}
            >
              <CountUp to={6.2} prefix="$" suffix="B" decimals={1} duration={2000} />
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                color: "var(--color-charcoal)",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              {MARKET.stats[1].label}
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 11,
                color: "#999",
                marginTop: 4,
                fontStyle: "italic",
              }}
            >
              Projected figure
            </span>
          </motion.div>
        </motion.div>

        {/* ── 3D Rings ───────────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16 flex justify-center"
        >
          <div
            style={{
              width: "100%",
              maxWidth: 480,
              height: 280,
              borderRadius: 24,
              overflow: "hidden",
              background: "rgba(192,57,43,0.03)",
              border: "1px solid rgba(192,57,43,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MarketRingsScene />
          </div>
        </motion.div>

        {/* ── TAM / SAM / SOM boxes ──────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {MARKET_BOXES.map((box) => (
            <motion.div
              key={box.label}
              variants={itemVariants}
              className="rounded-2xl p-6"
              style={{
                background: "#fff",
                border: `1px solid ${box.color}25`,
                boxShadow: `0 2px 20px ${box.color}0D`,
              }}
            >
              {/* Label pill */}
              <span
                style={{
                  display: "inline-block",
                  padding: "2px 10px",
                  borderRadius: 999,
                  background: `${box.color}18`,
                  color: box.color,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 0.8,
                  fontFamily: "var(--font-inter)",
                  marginBottom: 8,
                }}
              >
                {box.label}
              </span>

              {/* Value */}
              <div
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: 32,
                  fontWeight: 700,
                  color: box.color,
                  lineHeight: 1.1,
                  marginBottom: 4,
                }}
              >
                {box.value}
              </div>

              {/* Description */}
              <div
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--color-charcoal)",
                  marginBottom: 4,
                }}
              >
                {box.description}
              </div>

              {/* Note */}
              <div
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 10.5,
                  color: "#aaa",
                  fontStyle: "italic",
                }}
              >
                {box.note}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── 3-year target city note ────────────────────── */}
        <motion.p
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-4 text-center text-sm font-semibold"
          style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-inter)" }}
        >
          3-Year Target:{" "}
          <span style={{ color: "var(--color-brand-red)" }}>{MARKET.target}</span>
        </motion.p>

        {/* ── Disclaimer ─────────────────────────────────── */}
        <motion.p
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center text-xs"
          style={{
            color: "#aaa",
            fontFamily: "var(--font-inter)",
            fontStyle: "italic",
          }}
        >
          {MARKET.disclaimer}
        </motion.p>
      </div>
    </section>
  );
}
