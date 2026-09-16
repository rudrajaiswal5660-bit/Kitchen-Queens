"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CountUpProps {
  /** Target value */
  to: number;
  /** Duration in ms */
  duration?: number;
  /** Prefix e.g. "$" or "₹" */
  prefix?: string;
  /** Suffix e.g. "M+" or "B" or "Cr" */
  suffix?: string;
  /** Decimal places */
  decimals?: number;
  className?: string;
}

/**
 * CountUp
 * Animates a number from 0 to `to` when it enters the viewport.
 */
export function CountUp({
  to,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: CountUpProps) {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.5, once: true });
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setValue(to);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((eased * to).toFixed(decimals)));

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [inView, to, duration, decimals, reducedMotion]);

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString("en-IN");

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
