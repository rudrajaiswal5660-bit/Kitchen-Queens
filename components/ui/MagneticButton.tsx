"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "secondary-white";
  strength?: number;
  as?: "button" | "a";
}

/**
 * MagneticButton
 * A button that subtly follows the cursor when hovered (magnetic effect).
 * Degrades gracefully when reduced-motion is preferred.
 */
export function MagneticButton({
  children,
  className = "",
  style,
  onClick,
  href,
  variant = "primary",
  strength = 0.35,
  as: Tag = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffset({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  const variantClass =
    variant === "primary"
      ? "btn-primary"
      : variant === "secondary-white"
      ? "btn-secondary btn-secondary-white"
      : "btn-secondary";

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={`${variantClass} ${className}`}
      style={style}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...(Tag === "a" && href ? { as: "a", href } : {})}
    >
      {children}
    </motion.button>
  );
}
