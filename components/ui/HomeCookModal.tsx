"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { HomeCookQuizForm } from "@/components/ui/HomeCookQuizForm";
import { EASE } from "@/lib/animations";

interface HomeCookModalProps {
  open: boolean;
  onClose: () => void;
}

export function HomeCookModal({ open, onClose }: HomeCookModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(15,15,20,0.82)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              zIndex: 9998,
            }}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Become a Home Cook application"
            initial={{ opacity: 0, y: 64, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.42, ease: EASE.out }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 560,
                maxHeight: "90vh",
                overflowY: "auto",
                background: "linear-gradient(160deg, #1e1a18 0%, #1a1210 60%, #1c1c1e 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "1.5rem",
                padding: "2rem 2rem 2.5rem",
                boxShadow: "0 24px 80px rgba(0,0,0,0.55), 0 4px 16px rgba(0,0,0,0.25)",
                position: "relative",
                pointerEvents: "auto",
              }}
            >
              {/* Header row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "1.75rem",
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    {/* Tiffin icon */}
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                      <rect x="6" y="4" width="20" height="24" rx="3" fill="#C0392B" opacity="0.25"/>
                      <rect x="6" y="4" width="20" height="24" rx="3" stroke="#C0392B" strokeWidth="1.5"/>
                      <rect x="8" y="11" width="16" height="1.5" rx="0.75" fill="#C0392B" opacity="0.6"/>
                      <rect x="8" y="17" width="16" height="1.5" rx="0.75" fill="#C0392B" opacity="0.6"/>
                      <rect x="11" y="1.5" width="10" height="3.5" rx="1.75" fill="#C0392B"/>
                      <circle cx="16" cy="8" r="1.5" fill="#E67E22"/>
                    </svg>
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--color-saffron)",
                      }}
                    >
                      Kitchen Queens
                    </span>
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "clamp(1.25rem, 3vw, 1.6rem)",
                      fontWeight: 700,
                      color: "var(--color-warm-white)",
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    Become a Home Cook
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: 13,
                      color: "rgba(255,253,249,0.45)",
                      margin: "4px 0 0 0",
                    }}
                  >
                    Just a few quick questions — takes 2 minutes
                  </p>
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  aria-label="Close"
                  style={{
                    flexShrink: 0,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.06)",
                    color: "rgba(255,253,249,0.5)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  background: "rgba(255,255,255,0.06)",
                  marginBottom: "1.75rem",
                }}
              />

              {/* The quiz form */}
              <HomeCookQuizForm onClose={onClose} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
