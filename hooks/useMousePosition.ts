"use client";
import { useState, useEffect, useRef } from "react";

export interface MousePosition {
  x: number;
  y: number;
  /** Normalized -1 to +1 relative to element center */
  normX: number;
  normY: number;
}

/**
 * useMousePosition
 * Tracks mouse position globally or relative to a ref element.
 * Returns normalized values (-1..+1) relative to element/window center.
 */
export function useMousePosition(
  elementRef?: React.RefObject<HTMLElement | null>
): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0, normX: 0, normY: 0 });
  const rafRef = useRef<number | null>(null);
  const latestRef = useRef<{ clientX: number; clientY: number } | null>(null);

  useEffect(() => {
    const update = () => {
      if (!latestRef.current) return;
      const { clientX, clientY } = latestRef.current;

      if (elementRef?.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        setPos({
          x,
          y,
          normX: ((x / rect.width) * 2 - 1),
          normY: ((y / rect.height) * 2 - 1),
        });
      } else {
        setPos({
          x: clientX,
          y: clientY,
          normX: (clientX / window.innerWidth) * 2 - 1,
          normY: (clientY / window.innerHeight) * 2 - 1,
        });
      }
    };

    const handleMove = (e: MouseEvent) => {
      latestRef.current = { clientX: e.clientX, clientY: e.clientY };
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [elementRef]);

  return pos;
}
