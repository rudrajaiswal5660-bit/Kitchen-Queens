"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Thermometer,
  Package,
  Truck,
  Star,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { QUALITY_PIPELINE } from "@/lib/constants";

const FALLBACK_PIPELINE = [
  { label: "Ingredient Sourcing", icon: "ClipboardList" },
  { label: "Kitchen Hygiene Audit", icon: "ShieldCheck" },
  { label: "Temperature Control", icon: "Thermometer" },
  { label: "Tamper-proof Packaging", icon: "Package" },
  { label: "Safe Delivery", icon: "Truck" },
  { label: "Customer Feedback Loop", icon: "Star" },
];

const ICON_MAP: Record<string, LucideIcon> = {
  ClipboardList,
  ShieldCheck,
  Thermometer,
  Package,
  Truck,
  Star,
};

function AnimatedCheckmark({ visible }: { visible: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="9" stroke="var(--color-leaf-green)" strokeWidth="1.5" />
      <motion.path
        d="M5.5 10.5L8.5 13.5L14.5 7.5"
        stroke="var(--color-leaf-green)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: visible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      />
    </svg>
  );
}

export function TrustSection() {
  const reducedMotion = useReducedMotion();
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.1, once: true });

  const pipeline =
    QUALITY_PIPELINE && QUALITY_PIPELINE.length > 0
      ? QUALITY_PIPELINE
      : FALLBACK_PIPELINE;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.18,
      },
    },
  };

  const stageVariants = {
    hidden: { opacity: 0, x: -32 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="trust"
      ref={sectionRef}
      style={{ background: "var(--color-cream)" }}
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Section label */}
      <div className="max-w-4xl mx-auto text-center mb-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="pill-badge">
            <span className="pill-dot" />
            Quality Assurance
          </span>
        </motion.div>
      </div>

      {/* Headline */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-bold leading-tight"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--color-charcoal)",
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            letterSpacing: "-0.025em",
          }}
        >
          Home-cooked doesn&apos;t mean compromising on{" "}
          <span className="gradient-text">standards.</span>
        </motion.h2>
      </div>


      {/* Pipeline */}
      <div className="max-w-2xl mx-auto">
        <motion.ol
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative flex flex-col gap-0"
          aria-label="Quality pipeline stages"
        >
          {pipeline.map((stage: { label: string; icon: string }, index: number) => {
            const IconComponent = ICON_MAP[stage.icon] ?? ShieldCheck;
            const isLast = index === pipeline.length - 1;

            return (
              <motion.li
                key={index}
                variants={stageVariants}
                className="relative flex items-start gap-6"
              >
                {/* Vertical connector line */}
                {!isLast && (
                  <div
                    className="pipeline-line absolute left-[22px] top-[48px] w-[2px]"
                    style={{
                      height: "calc(100% - 8px)",
                      background:
                        "linear-gradient(to bottom, var(--color-brand-red), var(--color-saffron))",
                      opacity: 0.3,
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Left: step circle */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm z-10 relative"
                    style={{
                      background: "var(--color-brand-red)",
                      color: "#fff",
                      fontFamily: "var(--font-inter)",
                      boxShadow: "0 2px 12px rgba(192,57,43,0.25)",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Right: content card */}
                <div
                  className="glass flex-1 flex items-center justify-between px-5 py-4 mb-5"
                >

                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(192,57,43,0.08)",
                        color: "var(--color-brand-red)",
                      }}
                    >
                      <IconComponent size={20} strokeWidth={1.8} />
                    </div>
                    <span
                      className="text-base font-medium"
                      style={{
                        color: "var(--color-charcoal)",
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      {stage.label}
                    </span>
                  </div>

                  {/* Animated checkmark */}
                  <AnimatedCheckmark visible={isInView} />
                </div>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>

      {/* Disclaimer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-12 text-center text-xs max-w-xl mx-auto"
        style={{
          color: "var(--color-charcoal)",
          opacity: 0.45,
          fontFamily: "var(--font-inter)",
          lineHeight: 1.7,
        }}
      >
        Quality processes planned for operational launch. Standards subject to
        regulatory requirements.
      </motion.p>
    </section>
  );
}
