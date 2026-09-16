"use client";
import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
}

/**
 * TiltCard
 * Wraps children in a card that tilts to follow the cursor in 3D.
 * Respects prefers-reduced-motion.
 */
export function TiltCard({
  children,
  className = "",
  maxTilt = 12,
  scale = 1.03,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  const scaleVal = useSpring(1, { stiffness: 300, damping: 30 });
  const glowX = useSpring(50, { stiffness: 300, damping: 30 });
  const glowY = useSpring(50, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rotateY.set((x - 0.5) * maxTilt * 2);
    rotateX.set((0.5 - y) * maxTilt * 2);
    glowX.set(x * 100);
    glowY.set(y * 100);
  };

  const handleMouseEnter = () => {
    if (reducedMotion) return;
    scaleVal.set(scale);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scaleVal.set(1);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden cursor-pointer ${className}`}
      style={{
        rotateX: reducedMotion ? 0 : rotateX,
        rotateY: reducedMotion ? 0 : rotateY,
        scale: reducedMotion ? 1 : scaleVal,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Specular highlight that follows cursor */}
      {isHovered && !reducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
            zIndex: 1,
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 0 }}>{children}</div>
    </motion.div>
  );
}
