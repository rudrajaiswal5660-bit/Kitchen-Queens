"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TARGET_SEGMENTS } from "@/lib/constants";

// --- Types --------------------------------------------------------------------

type Segment = (typeof TARGET_SEGMENTS)[number];

// --- Framer Motion Variants ---------------------------------------------------

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.66, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const headlineVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

// --- Segment Card -------------------------------------------------------------

function SegmentCard({ segment }: { segment: Segment }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group flex flex-col gap-5 p-8 rounded-2xl card-shadow bg-white cursor-default"
      style={{
        border: "1px solid rgba(0,0,0,0.055)",
        transition: "transform 0.26s ease, box-shadow 0.26s ease",
        willChange: "transform",
      }}
      whileHover={{
        y: -4,
        boxShadow:
          "0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
        transition: { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
      }}
    >
      {/* Emoji in coloured circle */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: `${segment.color}26`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 30,
          flexShrink: 0,
          boxShadow: `0 4px 16px ${segment.color}20`,
          transition: "transform 0.22s ease",
        }}
        className="group-hover:scale-110"
      >
        {segment.emoji}
      </div>

      {/* Title */}
      <h3
        className="text-xl font-bold leading-snug"
        style={{
          fontFamily: "var(--font-playfair)",
          color: "var(--color-charcoal)",
        }}
      >
        {segment.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed flex-1"
        style={{
          fontFamily: "var(--font-inter)",
          color: "var(--color-charcoal)",
          opacity: 0.62,
        }}
      >
        {segment.description}
      </p>

      {/* Bottom colour accent */}
      <div
        style={{
          height: 3,
          borderRadius: 2,
          background: `linear-gradient(90deg, ${segment.color} 0%, ${segment.color}44 100%)`,
          transition: "opacity 0.22s ease",
          opacity: 0.55,
        }}
        className="group-hover:opacity-90"
      />
    </motion.div>
  );
}

// --- Main Component -----------------------------------------------------------

export function TargetMarketSection() {
  const reducedMotion = useReducedMotion();
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="target-market"
      ref={sectionRef}
      className="py-24 sm:py-32"
      style={{ background: "var(--color-cream)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* -- Header ---------------------------------------------------- */}
        <div className="text-center mb-14 sm:mb-18">
          <motion.span
            className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: "var(--font-inter)", color: "var(--color-brand-red)" }}
            initial={reducedMotion ? {} : { opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Who We Serve
          </motion.span>

          <motion.h2
            variants={headlineVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-bold leading-[1.08] max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--color-charcoal)",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Built for people who miss home food.
          </motion.h2>
        </div>

        {/* -- 2�2 Grid -------------------------------------------------- */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {TARGET_SEGMENTS.map((segment) => (
            <SegmentCard key={segment.title} segment={segment} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
