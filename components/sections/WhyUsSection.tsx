"use client";

import {
  Home,
  IndianRupee,
  SlidersHorizontal,
  Users,
  Heart,
  Check,
  X,
  type LucideProps,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TiltCard } from "@/components/ui/TiltCard";
import { ADVANTAGES, COMPARISON_ROWS } from "@/lib/constants";
import { fadeUp, staggerContainer, viewport } from "@/lib/animations";

// --- Icon map -----------------------------------------------------------------

const ICON_MAP: Record<string, React.FC<LucideProps>> = {
  Home,
  IndianRupee,
  SlidersHorizontal,
  Users,
  Heart,
};

// --- Variants -----------------------------------------------------------------

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

// --- Main Section -------------------------------------------------------------

export function WhyUsSection() {
  const reducedMotion = useReducedMotion();
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.08 });

  return (
    <section
      id="why-us"
      ref={sectionRef}
      style={{ background: "var(--color-cream)" }}
      className="relative overflow-hidden py-24 lg:py-32"
    >
      {/* Background radial */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(230,126,34,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
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
              Competitive Edge
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-bold leading-tight"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--color-charcoal)",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Why{" "}
            <span className="gradient-text">Ghar Ka Khaana?</span>
          </motion.h2>
        </motion.div>

        {/* -- Advantage cards (3+2 layout) --------------- */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-20"
        >

          {/* First row: 3 cards */}
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-3 mb-5">
            {ADVANTAGES.slice(0, 3).map((adv) => {
              const Icon = ICON_MAP[adv.icon] ?? Heart;
              return (
                <motion.div key={adv.id} variants={itemVariants}>
                  <TiltCard
                    className="rounded-2xl bg-white p-6"
                    maxTilt={8}
                    scale={1.025}
                  >
                    {/* Icon circle */}
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: `${adv.color}1F`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 14,
                        color: adv.color,
                        border: `1px solid ${adv.color}30`,
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <h3
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: 18,
                        fontWeight: 700,
                        color: "var(--color-charcoal)",
                        marginBottom: 6,
                      }}
                    >
                      {adv.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: 13.5,
                        color: "#666",
                        lineHeight: 1.6,
                      }}
                    >
                      {adv.description}
                    </p>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>

          {/* Second row: 2 cards centred */}
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-2 lg:px-32">
            {ADVANTAGES.slice(3).map((adv) => {
              const Icon = ICON_MAP[adv.icon] ?? Heart;
              return (
                <motion.div key={adv.id} variants={itemVariants}>
                  <TiltCard
                    className="glass rounded-2xl p-6"
                    maxTilt={8}
                    scale={1.025}
                  >
                    {/* Icon circle */}
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: `${adv.color}1F`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 14,
                        color: adv.color,
                        border: `1px solid ${adv.color}30`,
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <h3
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: 18,
                        fontWeight: 700,
                        color: "var(--color-charcoal)",
                        marginBottom: 6,
                      }}
                    >
                      {adv.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: 13.5,
                        color: "#666",
                        lineHeight: 1.6,
                      }}
                    >
                      {adv.description}
                    </p>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* -- Comparison table --------------------------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="rounded-3xl overflow-hidden"
          style={{
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
          }}
        >
          {/* Table header */}
          <div className="grid grid-cols-2">
            {/* Generic aggregator header */}
            <div
              className="py-4 px-6 text-center"
              style={{
                background: "#F5F5F5",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
                borderRight: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#888",
                  letterSpacing: 0.3,
                  textTransform: "uppercase",
                }}
              >
                Generic Aggregator
              </span>
            </div>

            {/* GKK header */}
            <div
              className="py-4 px-6 text-center"
              style={{
                background: "var(--color-brand-red)",
                borderBottom: `1px solid rgba(192,57,43,0.3)`,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: 0.3,
                  textTransform: "uppercase",
                }}
              >
                Kitchen Queens
              </span>
            </div>
          </div>

          {/* Table rows */}
          {COMPARISON_ROWS.map((row, i) => {
            const isLast = i === COMPARISON_ROWS.length - 1;
            return (
              <motion.div
                key={row.generic}
                variants={tableRowVariants}
                className="grid grid-cols-2"
                style={{
                  borderBottom: isLast ? "none" : "1px solid rgba(0,0,0,0.05)",
                }}
              >
                {/* Generic column */}
                <div
                  className="flex items-center gap-3 py-4 px-6"
                  style={{
                    background: i % 2 === 0 ? "#FAFAFA" : "#F5F5F5",
                    borderRight: "1px solid rgba(0,0,0,0.07)",
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <X size={10} color="#999" strokeWidth={2.5} />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: 14,
                      color: "#999",
                    }}
                  >
                    {row.generic}
                  </span>
                </div>

                {/* GKK column */}
                <div
                  className="flex items-center gap-3 py-4 px-6"
                  style={{
                    background: i % 2 === 0 ? "#fff" : "#FFFAF8",
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "rgba(39,174,96,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Check size={10} color="#27AE60" strokeWidth={3} />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--color-charcoal)",
                    }}
                  >
                    {row.gkk}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
