// ============================================================
// lib/constants.ts
// ─────────────────────────────────────────────────────────────
// ALL site content lives here. To update copy, pricing labels,
// section data etc., edit only this file.
// ============================================================

// ─── Brand ───────────────────────────────────────────────────
export const BRAND = {
  name: "Kitchen Queens",
  tagline: "Healthy, affordable, home-cooked meals delivered daily.",
} as const;

// ─── Navigation ──────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home",     href: "#hero" },
  { label: "Problem",  href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Business", href: "#business" },
  { label: "Why Us",   href: "#why-us" },
] as const;



export const NAV_CTA_PRIMARY   = "Find Your Meal";
export const NAV_CTA_SECONDARY = "Become a Home Cook";

// ─── Hero ─────────────────────────────────────────────────────
export const HERO = {
  headline: ["Real food.", "Real homes.", "Real connection."],
  subheadline:
    "Healthy, affordable, home-cooked meals delivered daily — prepared by local home cooks and made for the people who miss home.",
  ctaPrimary:   "Explore Meal Plans",
  ctaSecondary: "Become a Home Cook",
  floatingLabel: "Home-cooked • Fresh • Daily",
  scrollLabel: "Scroll to discover",
} as const;

// ─── Food We Miss ─────────────────────────────────────────────
export const FOOD_WE_MISS = {
  statement: ["Some food doesn't just fill you up.", "It takes you home."],
  items: [
    { emoji: "🍲", name: "Dal Tadka",   color: "#F5A623" },
    { emoji: "🫓", name: "Phulka",      color: "#E8D5B7" },
    { emoji: "🥗", name: "Sabzi",       color: "#7DBE73" },
    { emoji: "🍚", name: "Steamed Rice", color: "#F0EAD6" },
    { emoji: "🥒", name: "Pickles",     color: "#A8C15E" },
    { emoji: "🍛", name: "Thali",       color: "#E8A87C" },
    { emoji: "🥡", name: "Lunchbox",    color: "#C0956C" },
    { emoji: "🫕", name: "Rajma",       color: "#8B4513" },
    { emoji: "🍮", name: "Kheer",       color: "#FFF0D6" },
  ],
  annotations: [
    "Freshly cooked",
    "Made with care",
    "Just like home",
    "No shortcuts",
    "Straight from the kitchen",
  ],
} as const;

// ─── Problem ─────────────────────────────────────────────────
export const PROBLEMS = [
  {
    id: "unhealthy",
    icon: "UtensilsCrossed",
    title: "Unhealthy Commercial Food",
    description:
      "Students and young professionals often rely on restaurant food and delivery apps. Eating outside every day can mean greasy, repetitive and nutritionally unbalanced meals.",
    accent: "#C0392B",
  },
  {
    id: "expensive",
    icon: "TrendingUp",
    title: "High Recurring Expenses",
    description:
      "Daily eating out, delivery fees and surge charges quickly add up — especially for students and entry-level professionals.",
    accent: "#E67E22",
  },
  {
    id: "untapped",
    icon: "ChefHat",
    title: "Untapped Culinary Talent",
    description:
      "Millions of talented homemakers can cook incredible food but have limited opportunities to turn that skill into independent income.",
    accent: "#27AE60",
  },
] as const;

// ─── Solution Steps ───────────────────────────────────────────
export const SOLUTION_STEPS = [
  {
    step: "01",
    title: "Choose",
    description:
      "Customers choose a meal plan based on their schedule and preferences.",
    icon: "ClipboardList",
  },
  {
    step: "02",
    title: "Cook",
    description:
      "Verified local home cooks prepare fresh meals in small batches.",
    icon: "Flame",
  },
  {
    step: "03",
    title: "Deliver",
    description:
      "Meals are collected and delivered through optimized hyperlocal delivery slots.",
    icon: "Truck",
  },
  {
    step: "04",
    title: "Enjoy",
    description:
      "Customers get nutritious home-cooked food delivered to their doorstep.",
    icon: "Heart",
  },
] as const;

// ─── Meal Plans (illustrative) ────────────────────────────────
export const MEAL_PLANS = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Simple everyday meals",
    features: ["Dal + Rice", "Roti + Sabzi", "Weekday delivery"],
    highlight: false,
    note: "Illustrative plan",
  },
  {
    id: "standard",
    name: "Standard",
    tagline: "Balanced home-style meals",
    features: ["Full thali", "Lunch + Dinner", "6 days/week"],
    highlight: true,
    note: "Illustrative plan",
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Personalized meal preferences",
    features: ["Custom preferences", "Diet-aware menu", "7 days/week"],
    highlight: false,
    note: "Illustrative plan",
  },
] as const;

export const PREFERENCES = ["North Indian", "South Indian", "West Indian", "Mixed"];
export const DURATIONS   = ["Weekly trial", "Monthly", "Quarterly"];
export const MEALS       = ["Lunch", "Dinner", "Both"];

// ─── Target Market ────────────────────────────────────────────
export const TARGET_SEGMENTS = [
  {
    emoji: "🎓",
    title: "College Students",
    description: "Affordable daily meals without relying on junk food.",
    color: "#C0392B",
  },
  {
    emoji: "🏠",
    title: "Hostel & PG Residents",
    description: "A familiar meal waiting after a long day.",
    color: "#E67E22",
  },
  {
    emoji: "💼",
    title: "Working Professionals",
    description: "Nutritious food without spending hours cooking.",
    color: "#27AE60",
  },
  {
    emoji: "🧑‍🍳",
    title: "Home Cooks",
    description: "Turn culinary skills into flexible income.",
    color: "#9B59B6",
  },
] as const;

// ─── Market Opportunity ───────────────────────────────────────
export const MARKET = {
  disclaimer:
    "Figures based on supplied pitch-deck concept. Not independently verified.",
  stats: [
    { label: "College Hostellers & Migrants", value: "34M+", color: "#C0392B" },
    { label: "Indian Tiffin & Meal Market",   value: "$6.2B", color: "#E67E22" },
  ],
  tam: { label: "TAM", value: "$6.2B", description: "Total Addressable Market" },
  sam: { label: "SAM", value: "$1.8B", description: "Serviceable Addressable Market" },
  som: { label: "SOM", value: "$120M", description: "Serviceable Obtainable Market — 3-Year Target" },
  target: "5 Tier-1 & Tier-2 Tech Cities",
} as const;

// ─── Unit Economics ───────────────────────────────────────────
export const UNIT_ECONOMICS = {
  disclaimer: "Figures based on supplied pitch-deck concept.",
  aov: 120,
  breakdown: [
    { label: "Home Cook Payout", amount: 80,  color: "#27AE60",  pct: 66.7 },
    { label: "Batch Delivery",   amount: 15,  color: "#E67E22",  pct: 12.5 },
    { label: "Gross Margin",     amount: 25,  color: "#C0392B",  pct: 20.8 },
  ],
  grossMarginPct: "20.8%",
} as const;

// ─── Competitive Advantage ────────────────────────────────────
export const ADVANTAGES = [
  {
    id: "homecooked",
    icon: "Home",
    title: "Home-Cooked",
    description: "Authentic everyday meals, not restaurant replicas.",
    color: "#C0392B",
  },
  {
    id: "affordable",
    icon: "IndianRupee",
    title: "Affordable",
    description: "Designed for recurring daily consumption.",
    color: "#E67E22",
  },
  {
    id: "personalized",
    icon: "SlidersHorizontal",
    title: "Personalized",
    description: "Regional and dietary preferences honoured.",
    color: "#27AE60",
  },
  {
    id: "empowering",
    icon: "Users",
    title: "Empowering",
    description: "Creates income opportunities for homemakers.",
    color: "#9B59B6",
  },
  {
    id: "community",
    icon: "Heart",
    title: "Community",
    description: "Builds trust between cooks and customers.",
    color: "#F39C12",
  },
] as const;

export const COMPARISON_ROWS = [
  { generic: "On-demand food",     gkk: "Scheduled meal plans" },
  { generic: "Restaurants",        gkk: "Local home cooks" },
  { generic: "One-time orders",    gkk: "Recurring subscriptions" },
  { generic: "Transactional",      gkk: "Community-driven" },
] as const;

// ─── Trust & Quality ─────────────────────────────────────────
export const QUALITY_PIPELINE = [
  { step: "01", label: "Home Cook Application",  icon: "FileText",       color: "#C0392B" },
  { step: "02", label: "FSSAI Registration",     icon: "Shield",         color: "#E67E22" },
  { step: "03", label: "Hygiene Audit",          icon: "ClipboardCheck", color: "#F39C12" },
  { step: "04", label: "Sample Menu Tasting",   icon: "ChefHat",        color: "#27AE60" },
  { step: "05", label: "Packaging Training",    icon: "Package",        color: "#2980B9" },
  { step: "06", label: "Quality Monitoring",   icon: "Star",           color: "#9B59B6" },
] as const;

// ─── Kitchen Queen ────────────────────────────────────────────
export const KITCHEN_QUEEN = {
  headline: "Your kitchen can become your opportunity.",
  subheadline:
    "Turn your cooking skills into flexible, dignified income — without stepping away from your family responsibilities.",
  pillars: ["Training", "Safety", "Packaging", "Support"],
  ctaLabel: "Become a Home Cook",
} as const;

// City coordinates for the SVG India map (approximate, normalized to viewBox)
export const INDIA_CITIES: Record<string, { x: number; y: number; label: string }> = {
  Bengaluru:  { x: 215, y: 360, label: "Bengaluru" },
  Pune:       { x: 185, y: 295, label: "Pune" },
  Hyderabad:  { x: 225, y: 310, label: "Hyderabad" },
  Chennai:    { x: 240, y: 365, label: "Chennai" },
  Delhi:      { x: 210, y: 175, label: "Delhi" },
  Mumbai:     { x: 175, y: 290, label: "Mumbai" },
  Kolkata:    { x: 295, y: 240, label: "Kolkata" },
  Ahmedabad:  { x: 160, y: 230, label: "Ahmedabad" },
  Jaipur:     { x: 195, y: 200, label: "Jaipur" },
  Lucknow:    { x: 240, y: 195, label: "Lucknow" },
};

// ─── Final CTA ────────────────────────────────────────────────
export const FINAL_CTA = {
  headline: "Ready for a better everyday meal?",
  subtext: "Healthy. Affordable. Home-cooked.",
  ctaPrimary:   "Find Your Meal",
  ctaSecondary: "Become a Home Cook",
} as const;

// ─── Footer ───────────────────────────────────────────────────
export const FOOTER_LINKS = [
  { label: "Home",                href: "#hero" },
  { label: "How It Works",        href: "#solution" },
  { label: "Meal Plans",          href: "#how-it-works" },
  { label: "Become a Home Cook",  href: "#kitchen-queen" },
  { label: "About",               href: "#vision" },
  { label: "Contact",             href: "#contact" },
] as const;
