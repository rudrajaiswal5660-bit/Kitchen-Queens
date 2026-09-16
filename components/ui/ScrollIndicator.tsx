"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollIndicatorProps {
  label?: string;
  className?: string;
}

/**
 * ScrollIndicator
 * Animated "Scroll to discover" indicator with bouncing arrow.
 */
export function ScrollIndicator({
  label = "Scroll to discover",
  className = "",
}: ScrollIndicatorProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`flex flex-col items-center gap-2 text-charcoal/50 select-none ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.6 }}
    >
      <span
        className="text-xs font-medium tracking-widest uppercase"
        style={{ color: "var(--color-charcoal)", opacity: 0.45, letterSpacing: "0.12em" }}
      >
        {label}
      </span>
      <motion.div
        animate={reducedMotion ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown
          size={20}
          style={{ color: "var(--color-brand-red)", opacity: 0.7 }}
          strokeWidth={2.5}
        />
      </motion.div>
    </motion.div>
  );
}
