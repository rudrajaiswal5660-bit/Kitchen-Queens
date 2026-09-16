"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CheckCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { GROWTH_PHASES, INDIA_CITIES } from "@/lib/constants";

const INDIA_PATH =
  "M 130,20 L 160,15 L 200,20 L 220,30 L 240,40 L 255,60 L 270,80 L 280,100 L 290,130 L 295,160 L 300,190 L 295,210 L 285,230 L 270,250 L 250,280 L 235,310 L 220,340 L 210,370 L 220,390 L 230,400 L 240,395 L 250,380 L 260,360 L 270,340 L 280,320 L 290,300 L 295,280 L 290,260 L 280,240 L 265,225 L 250,220 L 235,225 L 220,230 L 210,240 L 195,250 L 180,255 L 160,252 L 140,245 L 120,235 L 105,220 L 95,200 L 88,180 L 85,158 L 88,135 L 95,110 L 105,88 L 118,68 L 130,50 Z";

const FALLBACK_PHASES = [
  {
    label: "Phase 01",
    period: "2025–2026",
    badge: "Pilot",
    milestones: [
      "Launch in Bengaluru",
      "50 home cooks onboarded",
      "1,000 subscribers",
    ],
    cities: ["Bengaluru"],
  },
  {
    label: "Phase 02",
    period: "2026–2027",
    badge: "Growth",
    milestones: [
      "Expand to 5 cities",
      "500 home cooks",
      "50,000 subscribers",
    ],
    cities: ["Bengaluru", "Mumbai", "Hyderabad", "Pune", "Chennai"],
  },
  {
    label: "Phase 03",
    period: "2027–2028",
    badge: "Scale",
    milestones: [
      "25+ cities",
      "5,000 home cooks",
      "5 lakh subscribers",
    ],
    cities: [
      "Bengaluru",
      "Mumbai",
      "Delhi",
      "Hyderabad",
      "Pune",
      "Chennai",
      "Kolkata",
      "Ahmedabad",
    ],
  },
];

const FALLBACK_CITIES = [
  { name: "Bengaluru", x: 175, y: 295 },
  { name: "Mumbai", x: 115, y: 245 },
  { name: "Delhi", x: 170, y: 105 },
  { name: "Hyderabad", x: 185, y: 265 },
  { name: "Chennai", x: 195, y: 310 },
  { name: "Pune", x: 130, y: 255 },
  { name: "Kolkata", x: 245, y: 175 },
  { name: "Ahmedabad", x: 120, y: 175 },
];

const PHASE_COLORS = [
  "var(--color-brand-red)",
  "var(--color-saffron)",
  "var(--color-leaf-green)",
];

interface Phase {
  label: string;
  period: string;
  badge: string;
  milestones: string[];
  cities: string[];
}

interface City {
  name: string;
  x: number;
  y: number;
}

export function GrowthSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1, once: true });
  const [activePhase, setActivePhase] = useState(0);

  const phases: Phase[] =
    GROWTH_PHASES && GROWTH_PHASES.length > 0
      ? GROWTH_PHASES
      : FALLBACK_PHASES;
  const cities: City[] =
    INDIA_CITIES && INDIA_CITIES.length > 0 ? INDIA_CITIES : FALLBACK_CITIES;

  const currentPhase: Phase = phases[activePhase] ?? phases[0];
  const activeCityNames: string[] = currentPhase?.cities ?? [];
  const phaseColor: string = PHASE_COLORS[activePhase] ?? "var(--color-brand-red)";

  return (
    <section
      id="growth"
      ref={sectionRef}
      style={{ background: "var(--color-cream)" }}
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Section label */}
      <div className="max-w-6xl mx-auto text-center mb-4">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1 rounded-full"
          style={{
            color: "var(--color-brand-red)",
            background: "rgba(192,57,43,0.08)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Expansion Plan
        </motion.span>
      </div>

      {/* Headline */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--color-charcoal)",
          }}
        >
          From one neighbourhood to{" "}
          <span style={{ color: "var(--color-brand-red)" }}>
            every Indian city.
          </span>
        </motion.h2>
      </div>

      {/* Phase tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-md mx-auto flex rounded-2xl overflow-hidden mb-12"
        style={{
          background: "var(--color-warm-white)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
          padding: "4px",
          gap: "4px",
        }}
        role="tablist"
        aria-label="Growth phases"
      >
        {phases.map((phase: Phase, i: number) => (
          <button
            key={i}
            onClick={() => setActivePhase(i)}
            role="tab"
            aria-selected={activePhase === i}
            className="flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-300"
            style={{
              fontFamily: "var(--font-inter)",
              background: activePhase === i ? PHASE_COLORS[i] : "transparent",
              color: activePhase === i ? "#fff" : "var(--color-charcoal)",
              opacity: activePhase === i ? 1 : 0.55,
              border: "none",
              cursor: "pointer",
            }}
          >
            {phase.label}
          </button>
        ))}
      </motion.div>

      {/* Map + Details */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* LEFT: India Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }
          }
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center justify-center"
        >
          <div
            className="relative rounded-3xl p-6 w-full max-w-sm"
            style={{
              background: "var(--color-warm-white)",
              boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
            }}
          >
            <svg
              viewBox="70 10 240 410"
              className="w-full"
              aria-label="India map showing planned expansion cities"
              role="img"
            >
              {/* India outline */}
              <path
                d={INDIA_PATH}
                fill="rgba(192,57,43,0.08)"
                stroke="rgba(192,57,43,0.25)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              {/* Connection lines */}
              {cities
                .filter((c: City) => activeCityNames.includes(c.name))
                .map((city: City, i: number, arr: City[]) => {
                  if (i === 0) return null;
                  const prev = arr[i - 1];
                  const midX = (prev.x + city.x) / 2 + 10;
                  const midY = (prev.y + city.y) / 2 - 10;
                  const pathD = `M ${prev.x} ${prev.y} Q ${midX} ${midY} ${city.x} ${city.y}`;
                  return (
                    <motion.path
                      key={`line-${i}`}
                      d={pathD}
                      stroke={phaseColor}
                      strokeWidth="1"
                      strokeDasharray="4 3"
                      fill="none"
                      opacity={0.35}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: isInView ? 1 : 0 }}
                      transition={{
                        duration: reducedMotion ? 0 : 0.8,
                        delay: reducedMotion ? 0 : i * 0.1,
                      }}
                    />
                  );
                })}

              {/* City dots */}
              {cities.map((city: City) => {
                const isActive = activeCityNames.includes(city.name);
                return (
                  <g key={city.name}>
                    {isActive && !reducedMotion && (
                      <motion.circle
                        cx={city.x}
                        cy={city.y}
                        r={8}
                        fill="none"
                        stroke={phaseColor}
                        strokeWidth="1.5"
                        opacity={0.4}
                        className="city-pulse"
                        animate={{ r: [8, 16], opacity: [0.5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                        }}
                      />
                    )}
                    <motion.circle
                      cx={city.x}
                      cy={city.y}
                      r={isActive ? 5 : 3}
                      fill={isActive ? phaseColor : "rgba(192,57,43,0.2)"}
                      stroke={isActive ? "#fff" : "none"}
                      strokeWidth="1.5"
                      animate={{
                        r: isActive ? 5 : 3,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    {isActive && (
                      <text
                        x={city.x + 8}
                        y={city.y + 4}
                        fontSize="7"
                        fill="var(--color-charcoal)"
                        fontFamily="var(--font-inter)"
                        opacity={0.75}
                      >
                        {city.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            <p
              className="text-center text-xs mt-2"
              style={{
                color: "var(--color-charcoal)",
                opacity: 0.4,
                fontFamily: "var(--font-inter)",
              }}
            >
              Planned expansion — not to scale
            </p>
          </div>
        </motion.div>

        {/* RIGHT: Phase details */}
        <div className="flex flex-col justify-center min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: reducedMotion ? 0 : 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
              className="flex flex-col gap-6"
            >
              {/* Badge + Period */}
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className="phase-badge inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
                  style={{
                    background: phaseColor,
                    color: "#fff",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {currentPhase?.badge}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{
                    color: "var(--color-charcoal)",
                    opacity: 0.55,
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {currentPhase?.period}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(192,57,43,0.08)",
                    color: "var(--color-brand-red)",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  Planned
                </span>
              </div>

              {/* Phase heading */}
              <h3
                className="text-3xl font-bold"
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: "var(--color-charcoal)",
                }}
              >
                {currentPhase?.label}
              </h3>

              {/* Milestones */}
              <ul className="flex flex-col gap-3">
                {(currentPhase?.milestones ?? []).map(
                  (milestone: string, i: number) => (
                    <motion.li
                      key={milestone}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: reducedMotion ? 0 : 0.35,
                        delay: reducedMotion ? 0 : i * 0.1,
                      }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle
                        size={18}
                        style={{ color: phaseColor, flexShrink: 0 }}
                      />
                      <span
                        className="text-sm"
                        style={{
                          color: "var(--color-charcoal)",
                          fontFamily: "var(--font-inter)",
                          opacity: 0.8,
                        }}
                      >
                        {milestone}
                      </span>
                    </motion.li>
                  )
                )}
              </ul>

              {/* City tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {activeCityNames.map((cityName: string) => (
                  <span
                    key={cityName}
                    className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: `${phaseColor}18`,
                      color: phaseColor,
                      fontFamily: "var(--font-inter)",
                      border: `1px solid ${phaseColor}35`,
                    }}
                  >
                    <MapPin size={10} />
                    {cityName}
                  </span>
                ))}
              </div>

              {/* Disclaimer */}
              <p
                className="text-xs mt-2"
                style={{
                  color: "var(--color-charcoal)",
                  opacity: 0.4,
                  fontFamily: "var(--font-inter)",
                }}
              >
                All figures are targets. Actual expansion subject to market
                conditions and regulatory approvals.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
