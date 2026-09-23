"use client";
import { BRAND, FOOTER_LINKS } from "@/lib/constants";

export function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "How It Works", href: "#solution" },
    { label: "Meal Plans", href: "#how-it-works" },
    { label: "Why Us", href: "#why-us" },
  ];

  const cookLinks = [
    { label: "Become a Home Cook", href: "#kitchen-queen" },
    { label: "Quality Standards", href: "#trust" },
    { label: "The Opportunity", href: "#kitchen-queen" },
  ];

  const companyLinks = [
    { label: "About", href: "#hero" },
    { label: "Contact", href: "#contact" },
    { label: "Business Model", href: "#business" },
  ];

  return (
    <footer
      id="contact"
      style={{
        background: "var(--color-charcoal)",
        color: "rgba(255,253,249,0.65)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              {/* Tiffin icon */}
              <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <rect x="6" y="4" width="20" height="24" rx="3" fill="#C0392B" opacity="0.2"/>
                <rect x="6" y="4" width="20" height="24" rx="3" stroke="#C0392B" strokeWidth="1.5"/>
                <rect x="8" y="11" width="16" height="1.5" rx="0.75" fill="#C0392B" opacity="0.6"/>
                <rect x="8" y="17" width="16" height="1.5" rx="0.75" fill="#C0392B" opacity="0.6"/>
                <rect x="11" y="1.5" width="10" height="3.5" rx="1.75" fill="#C0392B"/>
                <circle cx="16" cy="8" r="1.5" fill="#E67E22"/>
              </svg>
              <span
                className="font-bold text-xl"
                style={{ color: "var(--color-warm-white)", fontFamily: "var(--font-playfair)" }}
              >
                {BRAND.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ maxWidth: 260, opacity: 0.6, fontFamily: "var(--font-inter)" }}>
              {BRAND.tagline}
            </p>
            <p className="text-xs" style={{ opacity: 0.35, fontFamily: "var(--font-inter)" }}>
              Made with 🧡 for home cooks everywhere.
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase mb-5" style={{ color: "var(--color-saffron)", fontFamily: "var(--font-inter)" }}>
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "rgba(255,253,249,0.55)", fontFamily: "var(--font-inter)" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* For Home Cooks column */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase mb-5" style={{ color: "var(--color-saffron)", fontFamily: "var(--font-inter)" }}>
              For Home Cooks
            </h3>
            <ul className="flex flex-col gap-3">
              {cookLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "rgba(255,253,249,0.55)", fontFamily: "var(--font-inter)" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase mb-5" style={{ color: "var(--color-saffron)", fontFamily: "var(--font-inter)" }}>
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "rgba(255,253,249,0.55)", fontFamily: "var(--font-inter)" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className="mb-8 p-5 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p className="text-xs leading-relaxed" style={{ opacity: 0.4, fontFamily: "var(--font-inter)" }}>
            Financial projections, market figures and operational milestones presented on this website are based on the Kitchen Queens pitch-deck concept and have not been independently verified. Meal plan details and pricing are illustrative only. Regulatory compliance and FSSAI registration requirements will be addressed at the time of operational launch.
          </p>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="text-xs" style={{ opacity: 0.35, fontFamily: "var(--font-inter)" }}>
            © {new Date().getFullYear()} Kitchen Queens. All rights reserved.
          </p>
          <p className="text-xs" style={{ opacity: 0.35, fontFamily: "var(--font-inter)" }}>
            A Ghar Ka Khaana initiative by Raj Gupta
          </p>
        </div>
      </div>
    </footer>
  );
}
