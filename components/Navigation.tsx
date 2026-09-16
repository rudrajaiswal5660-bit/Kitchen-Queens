"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { NAV_LINKS, NAV_CTA_PRIMARY, NAV_CTA_SECONDARY, BRAND } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const reducedMotion = useReducedMotion();

  // Track scroll position for background opacity
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section with IntersectionObserver
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Smooth scroll to section
  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <>
      {/* Scroll progress indicator */}
      <ScrollProgressBar />

      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6"
        style={{ paddingTop: "1rem", paddingBottom: "0.75rem" }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="max-w-[1400px] mx-auto flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300"
          style={{
            background: isScrolled
              ? "rgba(250,246,240,0.88)"
              : "rgba(250,246,240,0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(192,57,43,0.10)",
            boxShadow: isScrolled
              ? "0 4px 32px rgba(28,28,30,0.10)"
              : "none",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-2.5 flex-shrink-0"
            aria-label="Kitchen Queens — go to top"
          >
            {/* Tiffin icon SVG */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect x="6" y="4" width="20" height="24" rx="3" fill="#C0392B" opacity="0.15"/>
              <rect x="6" y="4" width="20" height="24" rx="3" stroke="#C0392B" strokeWidth="1.5"/>
              <rect x="8" y="11" width="16" height="1.5" rx="0.75" fill="#C0392B" opacity="0.5"/>
              <rect x="8" y="17" width="16" height="1.5" rx="0.75" fill="#C0392B" opacity="0.5"/>
              <rect x="11" y="1.5" width="10" height="3.5" rx="1.75" fill="#C0392B"/>
              <circle cx="16" cy="8" r="1.5" fill="#E67E22"/>
            </svg>
            <span
              className="font-display font-bold text-lg leading-tight hidden sm:block"
              style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-playfair)" }}
            >
              Kitchen Queens
            </span>
          </button>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 animated-link"
                  style={{
                    color: isActive ? "var(--color-brand-red)" : "var(--color-charcoal)",
                    opacity: isActive ? 1 : 0.7,
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                      style={{ background: "var(--color-brand-red)" }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollTo("#kitchen-queen")}
              className="text-sm font-semibold transition-colors duration-200 animated-link"
              style={{
                color: "var(--color-charcoal)",
                opacity: 0.7,
                fontFamily: "var(--font-inter)",
              }}
            >
              {NAV_CTA_SECONDARY}
            </button>
            <button
              onClick={() => scrollTo("#how-it-works")}
              className="btn-primary text-sm px-5 py-2.5"
            >
              {NAV_CTA_PRIMARY}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-xl transition-colors"
            style={{
              color: "var(--color-charcoal)",
              background: mobileOpen ? "rgba(192,57,43,0.08)" : "transparent",
            }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              style={{ background: "rgba(28,28,30,0.4)", backdropFilter: "blur(4px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col"
              style={{
                background: "var(--color-cream)",
                borderLeft: "1px solid rgba(192,57,43,0.1)",
                boxShadow: "-20px 0 60px rgba(28,28,30,0.15)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "rgba(192,57,43,0.1)" }}>
                <span className="font-display font-bold text-base" style={{ color: "var(--color-charcoal)" }}>
                  {BRAND.name}
                </span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={20} style={{ color: "var(--color-charcoal)" }} />
                </button>
              </div>
              {/* Drawer links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.button
                      key={link.href}
                      onClick={() => scrollTo(link.href)}
                      className="w-full text-left px-4 py-3 rounded-xl font-medium text-base transition-colors"
                      style={{
                        color: isActive ? "var(--color-brand-red)" : "var(--color-charcoal)",
                        background: isActive ? "rgba(192,57,43,0.06)" : "transparent",
                        fontFamily: "var(--font-inter)",
                      }}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}
              </nav>
              {/* Drawer CTAs */}
              <div className="px-4 pb-8 flex flex-col gap-3">
                <button
                  onClick={() => scrollTo("#kitchen-queen")}
                  className="btn-secondary w-full text-center"
                >
                  {NAV_CTA_SECONDARY}
                </button>
                <button
                  onClick={() => scrollTo("#how-it-works")}
                  className="btn-primary w-full text-center"
                >
                  {NAV_CTA_PRIMARY}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
