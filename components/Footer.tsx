"use client";
import { BRAND, FOOTER_LINKS } from "@/lib/constants";

export function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      style={{
        background: "var(--color-charcoal)",
        color: "rgba(255,253,249,0.7)",
        paddingTop: "4rem",
        paddingBottom: "3rem",
      }}
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <rect x="6" y="4" width="20" height="24" rx="3" fill="#C0392B" opacity="0.2"/>
                <rect x="6" y="4" width="20" height="24" rx="3" stroke="#C0392B" strokeWidth="1.5"/>
                <rect x="8" y="11" width="16" height="1.5" rx="0.75" fill="#C0392B" opacity="0.6"/>
                <rect x="8" y="17" width="16" height="1.5" rx="0.75" fill="#C0392B" opacity="0.6"/>
                <rect x="11" y="1.5" width="10" height="3.5" rx="1.75" fill="#C0392B"/>
                <circle cx="16" cy="8" r="1.5" fill="#E67E22"/>
              </svg>
              <span
                className="font-display font-bold text-xl"
                style={{ color: "var(--color-warm-white)", fontFamily: "var(--font-playfair)" }}
              >
                {BRAND.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ maxWidth: 280, opacity: 0.65 }}>
              {BRAND.tagline}
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "var(--color-saffron)", letterSpacing: "0.12em" }}>
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "rgba(255,253,249,0.6)", fontFamily: "var(--font-inter)" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer column */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "var(--color-saffron)", letterSpacing: "0.12em" }}>
              Important Note
            </h3>
            <p className="text-xs leading-relaxed" style={{ opacity: 0.5 }}>
              Financial projections, market figures and operational milestones presented on this website are based on the Kitchen Queens pitch-deck concept and have not been independently verified. Meal plan details and pricing are illustrative only.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs" style={{ opacity: 0.4 }}>
            © 2024 Kitchen Queens. All rights reserved.
          </p>
          <p className="text-xs" style={{ opacity: 0.4 }}>
            Made with care in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
