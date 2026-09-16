"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CountUp } from "@/components/ui/CountUp";
import { FINANCIALS } from "@/lib/constants";

const FALLBACK_FINANCIALS = {
  years: [
    {
      year: "Year 1",
      subscribers: 5000,
      revenue: "₹60L",
      revenueValue: 60,
      color: "var(--color-brand-red)",
      growthNote: "Pilot phase — Bengaluru",
    },
    {
      year: "Year 2",
      subscribers: 50000,
      revenue: "₹3Cr",
      revenueValue: 300,
      color: "var(--color-saffron)",
      growthNote: "5-city expansion",
    },
    {
      year: "Year 3",
      subscribers: 500000,
      revenue: "₹18Cr",
      revenueValue: 1800,
      color: "var(--color-leaf-green)",
      growthNote: "National scale",
    },
  ],
  disclaimer:
    "All figures are projections based on market assumptions. Not a guarantee of future performance. For illustrative purposes only.",
};

interface YearData {
  year: string;
  subscribers: number;
  revenue: string;
  revenueValue: number;
  color: string;
  growthNote: string;
}

interface TooltipState {
  visible: boolean;
  index: number | null;
}

export function FinancialsSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.15, once: true });
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    index: null,
  });

  const data: typeof FALLBACK_FINANCIALS =
    FINANCIALS ?? FALLBACK_FINANCIALS;
  const years: YearData[] = data.years ?? FALLBACK_FINANCIALS.years;
  const disclaimer: string = data.disclaimer ?? FALLBACK_FINANCIALS.disclaimer;

  // Max value for proportional bar heights
  const maxValue = Math.max(...years.map((y: YearData) => y.revenueValue));
  const MAX_BAR_HEIGHT = 220; // px

  return (
    <section
      id="financials"
      ref={sectionRef}
      style={{ background: "var(--color-cream)" }}
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Subtle background texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(192,57,43,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
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
              color: "var(--color-brand-red)",
              background: "rgba(192,57,43,0.08)",
              fontFamily: "var(--font-inter)",
            }}
          >
            Financial Projections
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--color-charcoal)",
          }}
        >
          Built to{" "}
          <span style={{ color: "var(--color-brand-red)" }}>scale.</span>
        </motion.h2>

        {/* Bar chart */}
        <div
          className="flex items-end justify-center gap-8 sm:gap-12 mb-12 px-4"
          style={{ height: `${MAX_BAR_HEIGHT + 80}px` }}
          role="img"
          aria-label="Projected revenue bar chart for Year 1, Year 2, Year 3"
        >
          {years.map((yearData: YearData, index: number) => {
            const targetHeight = Math.round(
              (yearData.revenueValue / maxValue) * MAX_BAR_HEIGHT
            );
            const isHovered = tooltip.index === index;

            return (
              <div
                key={yearData.year}
                className="flex flex-col items-center gap-3 relative"
                onMouseEnter={() =>
                  setTooltip({ visible: true, index })
                }
                onMouseLeave={() =>
                  setTooltip({ visible: false, index: null })
                }
              >
                {/* Tooltip */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-28 left-1/2 -translate-x-1/2 z-20 rounded-xl px-4 py-3 text-center whitespace-nowrap pointer-events-none"
                    style={{
                      background: "var(--color-charcoal)",
                      color: "#fff",
                      fontFamily: "var(--font-inter)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                    }}
                  >
                    <p className="text-xs font-bold mb-0.5">
                      {yearData.year}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: yearData.color }}>
                      {yearData.revenue}
                    </p>
                    <p className="text-xs opacity-70">
                      {yearData.subscribers.toLocaleString("en-IN")} subscribers
                    </p>
                    {/* Arrow */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0"
                      style={{
                        borderLeft: "6px solid transparent",
                        borderRight: "6px solid transparent",
                        borderTop: `6px solid var(--color-charcoal)`,
                      }}
                    />
                  </motion.div>
                )}

                {/* Bar */}
                <div
                  className="relative flex items-end rounded-t-2xl overflow-hidden cursor-pointer"
                  style={{ width: "80px", height: `${MAX_BAR_HEIGHT}px` }}
                >
                  {/* Track */}
                  <div
                    className="absolute inset-0 rounded-t-2xl"
                    style={{ background: "rgba(0,0,0,0.05)" }}
                  />
                  {/* Animated bar */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 rounded-t-2xl"
                    style={{ background: yearData.color }}
                    initial={{ height: 0 }}
                    animate={{
                      height: isInView ? targetHeight : 0,
                      scale: isHovered ? 1.03 : 1,
                    }}
                    transition={{
                      height: {
                        duration: reducedMotion ? 0 : 0.9,
                        delay: reducedMotion ? 0 : index * 0.18,
                        ease: [0.34, 1.06, 0.64, 1],
                      },
                      scale: { duration: 0.15 },
                    }}
                  >
                    {/* Shine effect */}
                    <div
                      className="absolute top-0 left-0 right-0 h-12 rounded-t-2xl"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, transparent 100%)",
                      }}
                    />
                    {/* Revenue label inside bar */}
                    <div
                      className="absolute top-3 left-0 right-0 text-center text-xs font-bold"
                      style={{ color: "#fff", fontFamily: "var(--font-inter)" }}
                    >
                      {yearData.revenue}
                    </div>
                  </motion.div>
                </div>

                {/* Year label below bar */}
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: "var(--color-charcoal)",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {yearData.year}
                </span>
                <span
                  className="text-xs text-center max-w-[90px]"
                  style={{
                    color: "var(--color-charcoal)",
                    opacity: 0.5,
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {yearData.growthNote}
                </span>
              </div>
            );
          })}
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {years.map((yearData: YearData, index: number) => (
            <motion.div
              key={yearData.year}
              initial={{ opacity: 0, y: 24 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
              }
              transition={{
                duration: 0.5,
                delay: reducedMotion ? 0 : 0.4 + index * 0.12,
              }}
              className="rounded-2xl p-6 flex flex-col gap-2"
              style={{
                background: "var(--color-warm-white)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                borderTop: `3px solid ${yearData.color}`,
              }}
            >
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{
                  color: yearData.color,
                  fontFamily: "var(--font-inter)",
                }}
              >
                {yearData.year} — Projected
              </span>
              <div
                className="text-3xl font-bold"
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: "var(--color-charcoal)",
                }}
              >
                <CountUp
                  end={yearData.subscribers}
                  duration={reducedMotion ? 0 : 2}
                  start={isInView ? undefined : 0}
                  separator=","
                />
              </div>
              <p
                className="text-xs"
                style={{
                  color: "var(--color-charcoal)",
                  opacity: 0.55,
                  fontFamily: "var(--font-inter)",
                }}
              >
                subscribers · Revenue: {yearData.revenue}
              </p>
              <p
                className="text-xs font-medium mt-1"
                style={{
                  color: yearData.color,
                  fontFamily: "var(--font-inter)",
                }}
              >
                {yearData.growthNote}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-xs text-center max-w-2xl mx-auto"
          style={{
            color: "var(--color-charcoal)",
            opacity: 0.4,
            fontFamily: "var(--font-inter)",
            lineHeight: 1.7,
          }}
        >
          {disclaimer}
        </motion.p>
      </div>
    </section>
  );
}
