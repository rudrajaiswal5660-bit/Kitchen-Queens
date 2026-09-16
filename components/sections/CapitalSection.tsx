"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CAPITAL } from "@/lib/constants";

// Donut chart constants
const RADIUS = 70;
const STROKE = 18;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CENTER = 100;

interface Segment {
  label: string;
  percentage: number;
  color: string;
  description: string;
}

interface Milestone {
  metric: string;
  description: string;
}

const FALLBACK_SEGMENTS: Segment[] = [
  {
    label: "Marketing",
    percentage: 40,
    color: "var(--color-brand-red)",
    description: "Brand building, digital acquisition, and city-launch campaigns.",
  },
  {
    label: "Product",
    percentage: 30,
    color: "var(--color-saffron)",
    description: "App development, tech infrastructure, and QA tooling.",
  },
  {
    label: "Operations",
    percentage: 30,
    color: "var(--color-leaf-green)",
    description: "Cook onboarding, packaging, logistics, and customer support.",
  },
];

const FALLBACK_MILESTONES: Milestone[] = [
  {
    metric: "₹50L",
    description: "Seed round target (Planned)",
  },
  {
    metric: "12 months",
    description: "Runway to Series A readiness (Target)",
  },
  {
    metric: "3 cities",
    description: "Coverage at end of seed deployment (Target)",
  },
];

const FALLBACK_CAPITAL = {
  investmentObjective:
    "We are raising a seed round to fund product development, cook network growth, and the first three-city launch. Capital will be deployed over 12 months to achieve Series A-ready metrics.",
  totalLabel: "Seed Round",
  segments: FALLBACK_SEGMENTS,
  milestones: FALLBACK_MILESTONES,
};

function computeSegments(segments: Segment[]): {
  segment: Segment;
  offset: number;
  dash: number;
}[] {
  let accumulated = 0;
  return segments.map((seg) => {
    const dash = (seg.percentage / 100) * CIRCUMFERENCE;
    const offset = CIRCUMFERENCE - accumulated * (CIRCUMFERENCE / 100);
    accumulated += seg.percentage;
    return { segment: seg, offset, dash };
  });
}

export function CapitalSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.15, once: true });
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  const capitalData = CAPITAL ?? FALLBACK_CAPITAL;
  const segments: Segment[] = capitalData.segments ?? FALLBACK_SEGMENTS;
  const milestones: Milestone[] = capitalData.milestones ?? FALLBACK_MILESTONES;
  const investmentObjective: string =
    capitalData.investmentObjective ?? FALLBACK_CAPITAL.investmentObjective;
  const totalLabel: string = capitalData.totalLabel ?? FALLBACK_CAPITAL.totalLabel;

  const computed = computeSegments(segments);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reducedMotion ? 0 : 0.14 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
  };

  return (
    <section
      id="capital"
      ref={sectionRef}
      style={{ background: "var(--color-cream)" }}
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 80% 50%, rgba(230,126,34,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
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
            Seed Investment
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--color-charcoal)",
          }}
        >
          Built to scale the{" "}
          <span style={{ color: "var(--color-brand-red)" }}>network.</span>
        </motion.h2>

        {/* Investment objective */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base leading-relaxed text-center max-w-2xl mx-auto mb-16"
          style={{
            color: "var(--color-charcoal)",
            opacity: 0.65,
            fontFamily: "var(--font-inter)",
          }}
        >
          {investmentObjective}
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT: Donut chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }
            }
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="relative">
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                className="drop-shadow-sm"
                role="img"
                aria-label="Capital allocation donut chart"
              >
                {/* Background circle */}
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={RADIUS}
                  fill="none"
                  stroke="rgba(0,0,0,0.06)"
                  strokeWidth={STROKE}
                />

                {/* Segments */}
                {computed.map(({ segment, offset, dash }, i) => {
                  const isHovered = hoveredSegment === i;
                  return (
                    <motion.circle
                      key={segment.label}
                      cx={CENTER}
                      cy={CENTER}
                      r={isHovered ? RADIUS + 2 : RADIUS}
                      fill="none"
                      stroke={segment.color}
                      strokeWidth={isHovered ? STROKE + 3 : STROKE}
                      strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
                      strokeDashoffset={offset}
                      strokeLinecap="butt"
                      style={{
                        transform: "rotate(-90deg)",
                        transformOrigin: "100px 100px",
                        cursor: "pointer",
                        transition: "r 0.2s, stroke-width 0.2s",
                      }}
                      initial={{ strokeDasharray: `0 ${CIRCUMFERENCE}` }}
                      animate={
                        isInView
                          ? { strokeDasharray: `${dash} ${CIRCUMFERENCE - dash}` }
                          : { strokeDasharray: `0 ${CIRCUMFERENCE}` }
                      }
                      transition={{
                        duration: reducedMotion ? 0 : 0.9,
                        delay: reducedMotion ? 0 : i * 0.25,
                        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                      }}
                      onMouseEnter={() => setHoveredSegment(i)}
                      onMouseLeave={() => setHoveredSegment(null)}
                    />
                  );
                })}

                {/* Center label */}
                <text
                  x={CENTER}
                  y={CENTER - 8}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--color-charcoal)"
                  fontFamily="var(--font-inter)"
                  opacity={0.6}
                >
                  {totalLabel}
                </text>
                <text
                  x={CENTER}
                  y={CENTER + 10}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="700"
                  fill="var(--color-charcoal)"
                  fontFamily="var(--font-playfair)"
                >
                  Seed
                </text>
              </svg>

              {/* Tooltip bubble for hovered segment */}
              {hoveredSegment !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -bottom-24 left-1/2 -translate-x-1/2 rounded-xl px-4 py-3 text-center w-52 pointer-events-none z-20"
                  style={{
                    background: "var(--color-charcoal)",
                    color: "#fff",
                    fontFamily: "var(--font-inter)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  }}
                >
                  <p
                    className="text-sm font-bold"
                    style={{ color: segments[hoveredSegment]?.color }}
                  >
                    {segments[hoveredSegment]?.label} —{" "}
                    {segments[hoveredSegment]?.percentage}%
                  </p>
                  <p className="text-xs opacity-70 mt-0.5">
                    {segments[hoveredSegment]?.description}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-3 w-full max-w-xs">
              {segments.map((seg: Segment, i: number) => (
                <button
                  key={seg.label}
                  className="flex items-center gap-3 text-left w-full rounded-xl px-4 py-3 transition-all duration-200"
                  style={{
                    background:
                      hoveredSegment === i
                        ? `${seg.color}12`
                        : "var(--color-warm-white)",
                    border: `1px solid ${hoveredSegment === i ? seg.color + "40" : "transparent"}`,
                    boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setHoveredSegment(i)}
                  onMouseLeave={() => setHoveredSegment(null)}
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ background: seg.color }}
                  />
                  <span
                    className="text-sm font-medium flex-1"
                    style={{
                      color: "var(--color-charcoal)",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {seg.label}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: seg.color, fontFamily: "var(--font-inter)" }}
                  >
                    {seg.percentage}%
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Milestone cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-6 justify-center"
          >
            {milestones.map((milestone: Milestone, i: number) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="rounded-2xl p-6 flex flex-col gap-2"
                style={{
                  background: "var(--color-warm-white)",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                  borderLeft: `4px solid ${FALLBACK_SEGMENTS[i % FALLBACK_SEGMENTS.length]?.color ?? "var(--color-brand-red)"}`,
                }}
              >
                <div
                  className="text-4xl font-bold"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    color: "var(--color-charcoal)",
                  }}
                >
                  {milestone.metric}
                </div>
                <p
                  className="text-sm"
                  style={{
                    color: "var(--color-charcoal)",
                    opacity: 0.65,
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {milestone.description}
                </p>
              </motion.div>
            ))}

            {/* Disclaimer */}
            <p
              className="text-xs mt-2"
              style={{
                color: "var(--color-charcoal)",
                opacity: 0.38,
                fontFamily: "var(--font-inter)",
                lineHeight: 1.7,
              }}
            >
              All milestones and figures are planned targets. Actual performance
              will depend on market conditions and execution.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
