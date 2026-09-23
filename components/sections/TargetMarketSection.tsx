"use client";

import { motion } from "framer-motion";
import { TARGET_SEGMENTS } from "@/lib/constants";
import { EASE, fadeUp, staggerContainer, viewport } from "@/lib/animations";

type Segment = (typeof TARGET_SEGMENTS)[number];

function SegmentCard({ segment, index }: { segment: Segment; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      className="glass group flex flex-col gap-5 p-8 cursor-default"
      style={{
        borderColor: `${segment.color}25`,
        transition: "transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease",
        willChange: "transform",
      }}
      whileHover={{
        y: -6,
        borderColor: `${segment.color}50`,
        boxShadow: `0 16px 48px ${segment.color}20, 0 4px 16px rgba(28,28,30,0.08)`,
        transition: { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
      }}
    >
      {/* Emoji in coloured circle */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: `${segment.color}20`,
          border: `1.5px solid ${segment.color}35`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          flexShrink: 0,
          boxShadow: `0 4px 16px ${segment.color}18`,
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
          opacity: 0.6,
          transition: "opacity 0.22s ease",
        }}
        className="group-hover:opacity-90"
      />
    </motion.div>
  );
}

export function TargetMarketSection() {
  return (
    <section
      id="target-market"
      className="py-24 sm:py-32"
      style={{ background: "var(--color-cream-dark)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.div variants={fadeUp} className="mb-3">
            <span className="pill-badge">
              <span className="pill-dot" />
              Who We Serve
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-bold leading-[1.08] max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--color-charcoal)",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Built for people who{" "}
            <span className="gradient-text">miss home food.</span>
          </motion.h2>
        </motion.div>

        {/* 2×2 Glass card grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {TARGET_SEGMENTS.map((segment, i) => (
            <SegmentCard key={segment.title} segment={segment} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}


