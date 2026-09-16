"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { UNIT_ECONOMICS } from "@/lib/constants";

// --- Pie segment helpers -------------------------------------------------------

const CX = 100;
const CY = 100;
const R  = 80;
const CIRCUMFERENCE = 2 * Math.PI * R;

interface Segment {
  label: string;
  amount: number;
  color: string;
  pct: number;
}

/** Convert a percentage arc to SVG stroke-dasharray/dashoffset values */
function segmentDash(startPct: number, spanPct: number) {
  const dash   = (spanPct / 100) * CIRCUMFERENCE;
  const offset = CIRCUMFERENCE - (startPct / 100) * CIRCUMFERENCE;
  return { strokeDasharray: `${dash} ${CIRCUMFERENCE - dash}`, strokeDashoffset: offset };
}

// --- Variants -----------------------------------------------------------------

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

// --- Animated pie segment -----------------------------------------------------

interface PieSegmentProps {
  segment: Segment;
  startPct: number;
  animated: boolean;
  reducedMotion: boolean;
  onHover: (s: Segment | null) => void;
  isHovered: boolean;
}

function PieSegment({ segment, startPct, animated, reducedMotion, onHover, isHovered }: PieSegmentProps) {
  const { strokeDasharray, strokeDashoffset } = segmentDash(startPct, segment.pct);
  const initialOffset = reducedMotion ? strokeDashoffset : CIRCUMFERENCE;

  return (
    <circle
      cx={CX}
      cy={CY}
      r={R}
      fill="none"
      stroke={segment.color}
      strokeWidth={isHovered ? 22 : 18}
      strokeDasharray={strokeDasharray}
      strokeDashoffset={animated || reducedMotion ? strokeDashoffset : initialOffset}
      strokeLinecap="round"
      style={{
        transition: reducedMotion
          ? "none"
          : animated
          ? `stroke-dashoffset 0.9s ease, stroke-width 0.2s ease, filter 0.2s ease`
          : "stroke-dashoffset 0.9s ease, stroke-width 0.2s ease",
        transformOrigin: "center",
        transform: "rotate(-90deg)",
        filter: isHovered ? `drop-shadow(0 0 8px ${segment.color}80)` : "none",
        cursor: "pointer",
      }}
      onMouseEnter={() => onHover(segment)}
      onMouseLeave={() => onHover(null)}
    />
  );
}

// --- Percentage bar -----------------------------------------------------------

interface BreakdownRowProps {
  segment: Segment;
  animated: boolean;
  reducedMotion: boolean;
  isHovered: boolean;
  onHover: (s: Segment | null) => void;
}

function BreakdownRow({ segment, animated, reducedMotion, isHovered, onHover }: BreakdownRowProps) {
  return (
    <div
      onMouseEnter={() => onHover(segment)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: "default" }}
    >
      {/* Label row */}
      <div className="mb-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: segment.color,
              flexShrink: 0,
              boxShadow: isHovered ? `0 0 6px ${segment.color}` : "none",
              transition: reducedMotion ? "none" : "box-shadow 0.2s",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 14,
              fontWeight: isHovered ? 700 : 500,
              color: "var(--color-warm-white)",
              transition: reducedMotion ? "none" : "font-weight 0.2s",
            }}
          >
            {segment.label}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 13,
              fontWeight: 600,
              color: segment.color,
            }}
          >
            ?{segment.amount}
          </span>
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 12,
              color: "rgba(255,255,255,0.45)",
            }}
          >
            {segment.pct}%
          </span>
        </div>
      </div>

      {/* Bar */}
      <div
        style={{
          height: 6,
          borderRadius: 999,
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            height: "100%",
            width: animated || reducedMotion ? `${segment.pct}%` : "0%",
            background: segment.color,
            borderRadius: 999,
            transition: reducedMotion ? "none" : "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: isHovered ? `0 0 8px ${segment.color}80` : "none",
          }}
        />
      </div>
    </div>
  );
}

// --- Main Section -------------------------------------------------------------

export function UnitEconomicsSection() {
  const reducedMotion = useReducedMotion();
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.2 });
  const [animated, setAnimated] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState<Segment | null>(null);
  const animationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (inView && !animated) {
      // Small delay so the section is visible before animation starts
      animationTimer.current = setTimeout(() => setAnimated(true), 200);
    }
    return () => {
      if (animationTimer.current) clearTimeout(animationTimer.current);
    };
  }, [inView, animated]);

  const segments = UNIT_ECONOMICS.breakdown as unknown as Segment[];

  // Compute cumulative start percentages
  let cumulative = 0;
  const startPcts = segments.map((s) => {
    const start = cumulative;
    cumulative += s.pct;
    return start;
  });

  return (
    <section
      id="unit-economics"
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
            "radial-gradient(circle at 10% 80%, rgba(39,174,96,0.06) 0%, transparent 50%), radial-gradient(circle at 90% 20%, rgba(192,57,43,0.06) 0%, transparent 50%)",
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
          Unit Economics
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
          Where every{" "}
          <em style={{ color: "var(--color-saffron)", fontStyle: "italic" }}>rupee goes.</em>
        </motion.h2>

        {/* Two-column layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-16 lg:flex-row lg:gap-20"
        >
          {/* - LEFT: Tiffin coin SVG pie ------------------- */}
          <motion.div variants={itemVariants} className="flex-shrink-0">
            <div style={{ position: "relative", width: 200, height: 200 }}>
              <svg viewBox="0 0 200 200" width={200} height={200}>
                {/* Track circle */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={R}
                  fill="none"
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth={18}
                />

                {/* Segments */}
                {segments.map((seg, i) => (
                  <PieSegment
                    key={seg.label}
                    segment={seg}
                    startPct={startPcts[i]}
                    animated={animated}
                    reducedMotion={reducedMotion}
                    onHover={setHoveredSegment}
                    isHovered={hoveredSegment?.label === seg.label}
                  />
                ))}
              </svg>

              {/* Center label */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                {hoveredSegment ? (
                  <>
                    <span
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: 22,
                        fontWeight: 700,
                        color: hoveredSegment.color,
                        lineHeight: 1,
                      }}
                    >
                      ?{hoveredSegment.amount}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: 9,
                        color: "rgba(255,255,255,0.5)",
                        textAlign: "center",
                        maxWidth: 70,
                        lineHeight: 1.3,
                        marginTop: 4,
                      }}
                    >
                      {hoveredSegment.label}
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: 28,
                        fontWeight: 700,
                        color: "var(--color-warm-white)",
                        lineHeight: 1,
                      }}
                    >
                      ?{UNIT_ECONOMICS.aov}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: 9,
                        color: "rgba(255,255,255,0.45)",
                        letterSpacing: 0.5,
                        marginTop: 4,
                      }}
                    >
                      per meal
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-col gap-1">
              {segments.map((seg) => (
                <div key={seg.label} className="flex items-center gap-2">
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: seg.color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {seg.label} ({seg.pct}%)
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* - RIGHT: Breakdown rows ------------------------ */}
          <motion.div variants={itemVariants} className="flex-1 w-full">
            {/* AOV label */}
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 11,
                fontWeight: 700,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: 1,
                marginBottom: 20,
                textTransform: "uppercase",
              }}
            >
              Average Order Value: ?{UNIT_ECONOMICS.aov} per meal
            </p>

            {/* Bars */}
            {segments.map((seg) => (
              <BreakdownRow
                key={seg.label}
                segment={seg}
                animated={animated}
                reducedMotion={reducedMotion}
                isHovered={hoveredSegment?.label === seg.label}
                onHover={setHoveredSegment}
              />
            ))}

            {/* Gross Margin callout */}
            <div
              style={{
                marginTop: 8,
                padding: "16px 20px",
                borderRadius: 14,
                border: "1px solid rgba(192,57,43,0.3)",
                background: "rgba(192,57,43,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Gross Margin
              </span>
              <span
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "var(--color-brand-red)",
                }}
              >
                {UNIT_ECONOMICS.grossMarginPct}
              </span>
            </div>

            {/* Disclaimer */}
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 11,
                color: "rgba(255,255,255,0.3)",
                fontStyle: "italic",
                marginTop: 16,
              }}
            >
              {UNIT_ECONOMICS.disclaimer}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
