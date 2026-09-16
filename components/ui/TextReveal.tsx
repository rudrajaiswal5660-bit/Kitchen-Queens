"use client";

// ============================================================
// components/ui/TextReveal.tsx
// ─────────────────────────────────────────────────────────────
// Word-by-word staggered reveal animation.
// Splits text into individual words, each word animates up
// through an invisible clip mask — giving a "printing press"
// or "cinema title card" effect.
//
// USAGE:
//   <TextReveal text="Some food doesn't just fill you up." as="h2" className="text-4xl" />
//   <TextReveal text="Line one" highlight="Line" /> — highlights a word in brand-red
//
// HOW TO CUSTOMISE:
//   - `delay`       — seconds before the first word reveals (default 0)
//   - `stagger`     — seconds between each word (default 0.06)
//   - `duration`    — reveal duration per word (default 0.7)
//   - `as`          — HTML element to render ("h1"|"h2"|"h3"|"p"|"span", default "span")
//   - `highlight`   — a substring to colour in brand-red
//   - `className`   — passed to the wrapper element
// ============================================================

import React from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/animations";

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  duration?: number;
  highlight?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function TextReveal({
  text,
  as: Tag = "span",
  delay = 0,
  stagger = 0.065,
  duration = 0.72,
  highlight,
  className = "",
  style,
}: TextRevealProps) {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 });

  const words = text.split(" ");

  return (
    <Tag
      // @ts-expect-error — ref type mismatch is safe here
      ref={ref}
      className={`inline ${className}`}
      style={{ ...style }}
    >
      {words.map((word, i) => {
        const isHighlighted = highlight && word.toLowerCase().includes(highlight.toLowerCase());
        return (
          <React.Fragment key={`${word}-${i}`}>
            {/* Each word is wrapped in a clip container */}
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "bottom",
                // Add a little breathing room between words
                marginRight: "0.28em",
              }}
            >
              <motion.span
                style={{
                  display: "inline-block",
                  color: isHighlighted ? "var(--color-brand-red)" : undefined,
                }}
                initial={{ y: "110%", opacity: 0 }}
                animate={
                  isInView
                    ? { y: "0%", opacity: 1 }
                    : { y: "110%", opacity: 0 }
                }
                transition={{
                  duration,
                  delay: delay + i * stagger,
                  ease: EASE.snap,
                }}
              >
                {word}
              </motion.span>
            </span>
          </React.Fragment>
        );
      })}
    </Tag>
  );
}

// ─── Multi-line version ───────────────────────────────────────────────────────
// Takes an array of strings, renders each as its own TextReveal line.
// Lines cascade with an extra delay between them.
//
// USAGE:
//   <TextRevealLines lines={["Real food.", "Real homes.", "Real connection."]} as="h1" />

interface TextRevealLinesProps {
  lines: readonly string[];
  as?: "h1" | "h2" | "h3" | "p";
  stagger?: number;
  lineDelay?: number;
  className?: string;
  style?: React.CSSProperties;
  highlight?: string;
}

export function TextRevealLines({
  lines,
  as = "h2",
  stagger = 0.055,
  lineDelay = 0.15,
  className = "",
  style,
  highlight,
}: TextRevealLinesProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {lines.map((line, li) => (
        <TextReveal
          key={line}
          text={line}
          as={as}
          delay={li * lineDelay}
          stagger={stagger}
          highlight={highlight}
          className={className}
          style={style}
        />
      ))}
    </div>
  );
}
