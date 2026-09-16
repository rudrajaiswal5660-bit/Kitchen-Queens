import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// ─── Sections ─────────────────────────────────────────────────
// To reorder: move JSX elements. To remove: comment out. To add: import above.
import { HeroSection }          from "@/components/sections/HeroSection";
import { FoodWeMissSection }    from "@/components/sections/FoodWeMissSection";
import { ProblemSection }       from "@/components/sections/ProblemSection";
import { SolutionSection }      from "@/components/sections/SolutionSection";
import { HowItWorksSection }    from "@/components/sections/HowItWorksSection";
import { TargetMarketSection }  from "@/components/sections/TargetMarketSection";
import { UnitEconomicsSection } from "@/components/sections/UnitEconomicsSection";
import { WhyUsSection }         from "@/components/sections/WhyUsSection";
import { TrustSection }         from "@/components/sections/TrustSection";
import { KitchenQueenSection }  from "@/components/sections/KitchenQueenSection";
import { FinalCTASection }      from "@/components/sections/FinalCTASection";

export default function Home() {
  return (
    <>
      {/* Grain texture overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Sticky nav with scroll-progress bar */}
      <Navigation />

      <main>
        {/* 1 — Cinematic hero */}
        <HeroSection />

        {/* 2 — Emotional food nostalgia */}
        <FoodWeMissSection />

        {/* 3 — The problem */}
        <ProblemSection />

        {/* 4 — The solution journey */}
        <SolutionSection />

        {/* 5 — Interactive app demo */}
        <HowItWorksSection />

        {/* 6 — Who we serve */}
        <TargetMarketSection />

        {/* 8 — Unit economics */}
        <UnitEconomicsSection />

        {/* 9 — Competitive advantage */}
        <WhyUsSection />

        {/* 10 — Trust & quality pipeline */}
        <TrustSection />

        {/* 11 — Kitchen Queen / home cook CTA */}
        <KitchenQueenSection />

        {/* 12 — Final CTA */}
        <FinalCTASection />
      </main>

      <Footer />
    </>
  );
}
