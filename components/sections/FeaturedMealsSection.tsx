"use client";

import { motion } from "framer-motion";
import { EASE, fadeUp, staggerContainer, viewport } from "@/lib/animations";

// Illustrative meal data — actual menu varies by location and home cook
const MEALS = [
  {
    emoji: "🍲",
    name: "Dal Tadka & Rice",
    category: "North Indian",
    cookLabel: "By a verified home cook",
    priceLabel: "From ₹80",
    accentColor: "#E67E22",
    bgGradient: "linear-gradient(135deg, #FFF3D6 0%, #FFE8A0 100%)",
    borderColor: "rgba(230,126,34,0.2)",
  },
  {
    emoji: "🍛",
    name: "Rajma Chawal",
    category: "North Indian",
    cookLabel: "By a verified home cook",
    priceLabel: "From ₹80",
    accentColor: "#C0392B",
    bgGradient: "linear-gradient(135deg, #FFE8E4 0%, #FFCFC8 100%)",
    borderColor: "rgba(192,57,43,0.2)",
  },
  {
    emoji: "🥘",
    name: "Aloo Sabzi & Phulka",
    category: "Home Style",
    cookLabel: "By a verified home cook",
    priceLabel: "From ₹80",
    accentColor: "#27AE60",
    bgGradient: "linear-gradient(135deg, #E8F8EE 0%, #C8F0D8 100%)",
    borderColor: "rgba(39,174,96,0.2)",
  },
] as const;

export function FeaturedMealsSection() {
  return (
    <section
      id="featured-meals"
      className="py-24 sm:py-32 overflow-hidden"
      style={{ background: "var(--color-cream-dark)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

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
              Trending now
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-bold"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.025em",
              color: "var(--color-charcoal)",
            }}
          >
            Loved by the{" "}
            <span className="gradient-text">community</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-base max-w-md mx-auto"
            style={{ fontFamily: "var(--font-inter)", color: "var(--color-charcoal)", opacity: 0.6 }}
          >
            Fresh from the kitchens of our home cooks.
          </motion.p>
        </motion.div>

        {/* Meal cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {MEALS.map((meal) => (
            <motion.article
              key={meal.name}
              variants={fadeUp}
              className="dish-card"
              style={{ cursor: "default" }}
            >
              {/* Food image area */}
              <div
                style={{
                  height: 200,
                  background: meal.bgGradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "5.5rem",
                  lineHeight: 1,
                  filter: `drop-shadow(0 8px 20px ${meal.accentColor}44)`,
                  userSelect: "none",
                  borderBottom: `1px solid ${meal.borderColor}`,
                }}
                aria-label={meal.name}
                role="img"
              >
                {meal.emoji}
              </div>

              {/* Card body */}
              <div className="p-5">
                {/* Category badge */}
                <span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
                  style={{
                    background: `${meal.accentColor}14`,
                    color: meal.accentColor,
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {meal.category}
                </span>

                {/* Meal name */}
                <h3
                  className="font-bold text-lg mb-1"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--color-charcoal)" }}
                >
                  {meal.name}
                </h3>

                {/* Cook label */}
                <p
                  className="text-sm mb-4"
                  style={{ fontFamily: "var(--font-inter)", color: "var(--color-charcoal)", opacity: 0.55 }}
                >
                  {meal.cookLabel}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span
                    className="font-bold text-base"
                    style={{ fontFamily: "var(--font-inter)", color: meal.accentColor }}
                  >
                    {meal.priceLabel}
                  </span>
                  <span
                    className="text-xs"
                    style={{ fontFamily: "var(--font-inter)", color: "var(--color-charcoal)", opacity: 0.38, fontStyle: "italic" }}
                  >
                    Illustrative
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          className="text-center text-xs mt-10"
          style={{ fontFamily: "var(--font-inter)", color: "var(--color-charcoal)", opacity: 0.38, fontStyle: "italic" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.38 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease: EASE.out }}
        >
          Illustrative meals — actual menu varies by location and home cook availability.
        </motion.p>
      </div>
    </section>
  );
}
