"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Salad,
  Utensils,
  Sun,
  User,
  Phone,
  Mail,
  Home,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  ChefHat,
} from "lucide-react";
import { EASE } from "@/lib/animations";

// ─── Quiz Options ─────────────────────────────────────────────────────────────

const LOCALITY_OPTIONS = [
  "South Delhi (Saket, Hauz Khas, GK)",
  "North Delhi (Rohini, Pitampura, Model Town)",
  "West Delhi (Dwarka, Janakpuri, Rajouri)",
  "East Delhi (Mayur Vihar, Laxmi Nagar)",
  "Gurgaon / Gurugram (DLF, Cyber City, Sohna)",
  "Noida & Greater Noida (Sector 62, 18, 137)",
  "Faridabad / Ghaziabad",
  "Other Area (Type below)",
];

const AVAILABILITY_OPTIONS = [
  { label: "Everyday", icon: "🌅", sub: "Lunch & Dinner throughout the week" },
  { label: "Weekdays only", icon: "📅", sub: "Monday to Friday daily service" },
  { label: "Weekends only", icon: "🎉", sub: "Saturday & Sunday special meals" },
  { label: "Flexible Schedule", icon: "🔄", sub: "Cook on select days as convenient" },
];

const DIETARY_OPTIONS = [
  { label: "Pure Vegetarian", emoji: "🥬", sub: "100% vegetarian kitchen" },
  { label: "Veg & Non-Veg", emoji: "🍗", sub: "Separate cookware / both dishes" },
  { label: "Vegetarian with Eggs", emoji: "🥚", sub: "Eggetarian friendly meals" },
  { label: "Jain / Sattvic", emoji: "🪷", sub: "No onion, no garlic preparations" },
  { label: "Vegan", emoji: "🌱", sub: "Dairy-free plant-based cooking" },
];

const CUISINE_OPTIONS = [
  { label: "North Indian", emoji: "🍲" },
  { label: "South Indian", emoji: "🍛" },
  { label: "Ghar Ki Thali", emoji: "🍱" },
  { label: "Bengali", emoji: "🐟" },
  { label: "Gujarati / Rajasthani", emoji: "🫓" },
  { label: "Maharashtrian", emoji: "🥘" },
  { label: "Healthy / Low-Oil", emoji: "🥗" },
  { label: "Continental / Fusion", emoji: "🥪" },
];

const MEAL_TYPE_OPTIONS = [
  { label: "Lunch only", icon: "☀️", sub: "Fresh morning preparation (11 AM – 1 PM)" },
  { label: "Dinner only", icon: "🌙", sub: "Evening hot delivery (6 PM – 8 PM)" },
  { label: "Both Lunch & Dinner", icon: "🌗", sub: "Full day home cook earning" },
  { label: "Breakfast & Tiffins", icon: "🌄", sub: "Early morning office & student boxes" },
];

// ─── Motion Animations ────────────────────────────────────────────────────────

const cardVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.38, ease: EASE.out },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -40 : 40,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.24, ease: EASE.inOut },
  }),
};

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HomeCookApplication {
  locality: string;
  customLocality: string;
  availability: string;
  dietaryPreference: string;
  cuisines: string[];
  mealType: string;
  name: string;
  phone: string;
  email: string;
  kitchenAddress: string;
  specialDish: string;
}

const INITIAL_FORM: HomeCookApplication = {
  locality: "",
  customLocality: "",
  availability: "",
  dietaryPreference: "",
  cuisines: [],
  mealType: "",
  name: "",
  phone: "",
  email: "",
  kitchenAddress: "",
  specialDish: "",
};

export function HomeCookQuizForm({ onClose }: { onClose?: () => void }) {
  // Steps:
  // 1: Locality
  // 2: Availability
  // 3: Dietary Preference
  // 4: Cuisines
  // 5: Meal Timing
  // 6: "Sounds Perfect!" Details Form
  // 7: Confirmation / Success State
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<HomeCookApplication>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submittedId, setSubmittedId] = useState("");

  const update = <K extends keyof HomeCookApplication>(field: K, val: HomeCookApplication[K]) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errorMsg) setErrorMsg("");
  };

  const toggleCuisine = (c: string) => {
    setFormData((prev) => {
      const exists = prev.cuisines.includes(c);
      return {
        ...prev,
        cuisines: exists ? prev.cuisines.filter((x) => x !== c) : [...prev.cuisines, c],
      };
    });
  };

  const canContinue = () => {
    switch (step) {
      case 1:
        return !!formData.locality && (formData.locality !== "Other Area (Type below)" || !!formData.customLocality.trim());
      case 2:
        return !!formData.availability;
      case 3:
        return !!formData.dietaryPreference;
      case 4:
        return formData.cuisines.length > 0;
      case 5:
        return !!formData.mealType;
      case 6:
        return (
          !!formData.name.trim() &&
          !!formData.phone.trim() &&
          formData.phone.replace(/\D/g, "").length >= 10
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!canContinue()) return;
    setDirection(1);
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!canContinue()) {
      setErrorMsg("Please enter your name and a valid 10-digit phone number.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        locality:
          formData.locality === "Other Area (Type below)"
            ? formData.customLocality.trim()
            : formData.locality,
        availability: formData.availability,
        dietaryPreference: formData.dietaryPreference,
        cuisines: formData.cuisines,
        mealType: formData.mealType,
        kitchenAddress: formData.kitchenAddress.trim(),
        specialDish: formData.specialDish.trim(),
      };

      const res = await fetch("/api/home-cook-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to submit application.");
      }

      setSubmittedId(data.id || `KQ-${Date.now().toString().slice(-5)}`);
      setDirection(1);
      setStep(7); // Show confirmation card
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : "Network error. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Step Renderers ─────────────────────────────────────────────────────────

  return (
    <div className="w-full">
      {/* Progress Indicator (Steps 1-6) */}
      {step <= 6 && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs mb-2">
            <span
              style={{
                fontFamily: "var(--font-inter)",
                color: step === 6 ? "var(--color-saffron)" : "rgba(255,253,249,0.5)",
                fontWeight: 600,
                letterSpacing: "0.06em",
              }}
            >
              {step === 6 ? "FINAL STEP • CONTACT DETAILS" : `QUESTION ${step} OF 5`}
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                color: "var(--color-saffron)",
                fontWeight: 700,
              }}
            >
              {Math.min(100, Math.round(((step - 1) / 5) * 100))}%
            </span>
          </div>
          <div
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, var(--color-brand-red), var(--color-saffron))",
              }}
              initial={{ width: "10%" }}
              animate={{ width: `${Math.min(100, (step / 6) * 100)}%` }}
              transition={{ duration: 0.35, ease: EASE.out }}
            />
          </div>
        </div>
      )}

      {/* Main Animated Card Screen */}
      <div className="relative min-h-[380px]">
        <AnimatePresence mode="wait" custom={direction}>
          {/* ──────────────── STEP 1: LOCALITY ──────────────── */}
          {step === 1 && (
            <motion.div
              key="step-1"
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl" style={{ background: "rgba(192,57,43,0.18)" }}>
                  <MapPin size={18} style={{ color: "var(--color-brand-red)" }} />
                </span>
                <span className="text-xs uppercase font-semibold tracking-wider text-amber-500">
                  Location Check
                </span>
              </div>

              <div>
                <h3
                  className="text-2xl sm:text-3xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--color-warm-white)" }}
                >
                  What&apos;s your locality? 📍
                </h3>
                <p className="text-sm" style={{ color: "rgba(255,253,249,0.65)" }}>
                  We connect you with subscribers right in your immediate neighborhood.
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-2 max-h-[260px] overflow-y-auto pr-1">
                {LOCALITY_OPTIONS.map((loc) => {
                  const selected = formData.locality === loc;
                  return (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => update("locality", loc)}
                      className="w-full text-left p-3.5 rounded-xl text-sm transition-all flex items-center justify-between"
                      style={{
                        background: selected ? "rgba(230,126,34,0.18)" : "rgba(255,255,255,0.04)",
                        border: selected
                          ? "1.5px solid var(--color-saffron)"
                          : "1px solid rgba(255,255,255,0.08)",
                        color: selected ? "var(--color-warm-white)" : "rgba(255,253,249,0.78)",
                      }}
                    >
                      <span className="font-medium">{loc}</span>
                      {selected && <Check size={16} style={{ color: "var(--color-saffron)" }} />}
                    </button>
                  );
                })}
              </div>

              {formData.locality === "Other Area (Type below)" && (
                <div className="mt-1">
                  <input
                    type="text"
                    placeholder="Enter your colony / sector / landmark"
                    value={formData.customLocality}
                    onChange={(e) => update("customLocality", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1.5px solid var(--color-saffron)",
                      color: "var(--color-warm-white)",
                    }}
                    autoFocus
                  />
                </div>
              )}
            </motion.div>
          )}

          {/* ──────────────── STEP 2: AVAILABILITY ──────────────── */}
          {step === 2 && (
            <motion.div
              key="step-2"
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl" style={{ background: "rgba(230,126,34,0.18)" }}>
                  <Clock size={18} style={{ color: "var(--color-saffron)" }} />
                </span>
                <span className="text-xs uppercase font-semibold tracking-wider text-amber-500">
                  Your Availability
                </span>
              </div>

              <div>
                <h3
                  className="text-2xl sm:text-3xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--color-warm-white)" }}
                >
                  How often can you be available with us? 🗓️
                </h3>
                <p className="text-sm" style={{ color: "rgba(255,253,249,0.65)" }}>
                  You control your cooking calendar. There are no mandatory minimum hours.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {AVAILABILITY_OPTIONS.map((item) => {
                  const selected = formData.availability === item.label;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => update("availability", item.label)}
                      className="text-left p-4 rounded-xl transition-all flex flex-col gap-1.5"
                      style={{
                        background: selected ? "rgba(230,126,34,0.18)" : "rgba(255,255,255,0.04)",
                        border: selected
                          ? "1.5px solid var(--color-saffron)"
                          : "1px solid rgba(255,255,255,0.08)",
                        color: selected ? "var(--color-warm-white)" : "rgba(255,253,249,0.8)",
                      }}
                    >
                      <span className="text-2xl mb-1">{item.icon}</span>
                      <span className="font-semibold text-sm">{item.label}</span>
                      <span className="text-xs opacity-60 leading-relaxed">{item.sub}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ──────────────── STEP 3: DIETARY PREFERENCE ──────────────── */}
          {step === 3 && (
            <motion.div
              key="step-3"
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl" style={{ background: "rgba(39,174,96,0.18)" }}>
                  <Salad size={18} style={{ color: "var(--color-leaf-green)" }} />
                </span>
                <span className="text-xs uppercase font-semibold tracking-wider text-green-400">
                  Kitchen Standards
                </span>
              </div>

              <div>
                <h3
                  className="text-2xl sm:text-3xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--color-warm-white)" }}
                >
                  What&apos;s your dietary preference? 🥗
                </h3>
                <p className="text-sm" style={{ color: "rgba(255,253,249,0.65)" }}>
                  Tell us what kind of meals your kitchen will prepare for subscribers.
                </p>
              </div>

              <div className="flex flex-col gap-2.5 mt-2">
                {DIETARY_OPTIONS.map((item) => {
                  const selected = formData.dietaryPreference === item.label;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => update("dietaryPreference", item.label)}
                      className="w-full text-left p-3.5 rounded-xl transition-all flex items-center justify-between"
                      style={{
                        background: selected ? "rgba(39,174,96,0.18)" : "rgba(255,255,255,0.04)",
                        border: selected
                          ? "1.5px solid var(--color-leaf-green)"
                          : "1px solid rgba(255,255,255,0.08)",
                        color: selected ? "var(--color-warm-white)" : "rgba(255,253,249,0.78)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.emoji}</span>
                        <div>
                          <p className="font-semibold text-sm leading-none m-0">{item.label}</p>
                          <p className="text-xs opacity-60 m-0 mt-1">{item.sub}</p>
                        </div>
                      </div>
                      {selected && <Check size={16} style={{ color: "var(--color-leaf-green)" }} />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ──────────────── STEP 4: CUISINES ──────────────── */}
          {step === 4 && (
            <motion.div
              key="step-4"
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl" style={{ background: "rgba(192,57,43,0.18)" }}>
                  <Utensils size={18} style={{ color: "var(--color-brand-red)" }} />
                </span>
                <span className="text-xs uppercase font-semibold tracking-wider text-rose-400">
                  Regional Specialities
                </span>
              </div>

              <div>
                <h3
                  className="text-2xl sm:text-3xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--color-warm-white)" }}
                >
                  What cuisines do you cook best? 🍲
                </h3>
                <p className="text-sm" style={{ color: "rgba(255,253,249,0.65)" }}>
                  Select all that apply — our subscribers love authentic regional tastes!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 mt-2">
                {CUISINE_OPTIONS.map((c) => {
                  const selected = formData.cuisines.includes(c.label);
                  return (
                    <button
                      key={c.label}
                      type="button"
                      onClick={() => toggleCuisine(c.label)}
                      className="p-3 rounded-xl text-left text-sm transition-all flex items-center justify-between"
                      style={{
                        background: selected ? "rgba(230,126,34,0.18)" : "rgba(255,255,255,0.04)",
                        border: selected
                          ? "1.5px solid var(--color-saffron)"
                          : "1px solid rgba(255,255,255,0.08)",
                        color: selected ? "var(--color-warm-white)" : "rgba(255,253,249,0.78)",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span>{c.emoji}</span>
                        <span className="font-medium text-xs sm:text-sm">{c.label}</span>
                      </div>
                      {selected && <Check size={14} style={{ color: "var(--color-saffron)" }} />}
                    </button>
                  );
                })}
              </div>

              {formData.cuisines.length > 0 && (
                <p className="text-xs text-amber-400 font-medium">
                  ✓ {formData.cuisines.length} cuisine{formData.cuisines.length > 1 ? "s" : ""} selected
                </p>
              )}
            </motion.div>
          )}

          {/* ──────────────── STEP 5: MEAL TYPE ──────────────── */}
          {step === 5 && (
            <motion.div
              key="step-5"
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl" style={{ background: "rgba(243,156,18,0.18)" }}>
                  <Sun size={18} style={{ color: "var(--color-turmeric)" }} />
                </span>
                <span className="text-xs uppercase font-semibold tracking-wider text-amber-400">
                  Meal Shift
                </span>
              </div>

              <div>
                <h3
                  className="text-2xl sm:text-3xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--color-warm-white)" }}
                >
                  Which meals can you prepare? ☀️
                </h3>
                <p className="text-sm" style={{ color: "rgba(255,253,249,0.65)" }}>
                  We route orders according to your cooking prep cycle.
                </p>
              </div>

              <div className="flex flex-col gap-2.5 mt-2">
                {MEAL_TYPE_OPTIONS.map((item) => {
                  const selected = formData.mealType === item.label;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => update("mealType", item.label)}
                      className="w-full text-left p-3.5 rounded-xl transition-all flex items-center justify-between"
                      style={{
                        background: selected ? "rgba(230,126,34,0.18)" : "rgba(255,255,255,0.04)",
                        border: selected
                          ? "1.5px solid var(--color-saffron)"
                          : "1px solid rgba(255,255,255,0.08)",
                        color: selected ? "var(--color-warm-white)" : "rgba(255,253,249,0.78)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        <div>
                          <p className="font-semibold text-sm leading-none m-0">{item.label}</p>
                          <p className="text-xs opacity-60 m-0 mt-1">{item.sub}</p>
                        </div>
                      </div>
                      {selected && <Check size={16} style={{ color: "var(--color-saffron)" }} />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ──────────────── STEP 6: "SOUNDS PERFECT!" DETAILS FORM ──────────────── */}
          {step === 6 && (
            <motion.div
              key="step-6"
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col gap-4"
            >
              {/* Highlight badge */}
              <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full" style={{ background: "rgba(39,174,96,0.16)", border: "1px solid rgba(39,174,96,0.28)" }}>
                <Sparkles size={14} style={{ color: "var(--color-leaf-green)" }} />
                <span className="text-xs font-semibold" style={{ color: "var(--color-leaf-green)" }}>
                  Profile Matched!
                </span>
              </div>

              <div>
                <h3
                  className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--color-warm-white)" }}
                >
                  Sounds Perfect! 🎉
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,253,249,0.75)" }}>
                  Fill up these details and our onboarding team will contact you soon enough.
                </p>
              </div>

              {/* Verified Snapshot Chips */}
              <div className="flex flex-wrap gap-1.5 p-2.5 rounded-xl text-xs" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <span className="px-2.5 py-1 rounded-md" style={{ background: "rgba(230,126,34,0.15)", color: "var(--color-saffron)" }}>
                  📍 {formData.locality === "Other Area (Type below)" ? formData.customLocality : formData.locality}
                </span>
                <span className="px-2.5 py-1 rounded-md" style={{ background: "rgba(39,174,96,0.15)", color: "var(--color-leaf-green)" }}>
                  🥗 {formData.dietaryPreference}
                </span>
                <span className="px-2.5 py-1 rounded-md" style={{ background: "rgba(192,57,43,0.15)", color: "#f87171" }}>
                  🍲 {formData.cuisines.slice(0, 2).join(", ")}{formData.cuisines.length > 2 ? ` +${formData.cuisines.length - 2}` : ""}
                </span>
              </div>

              {/* Contact Inputs */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-1">
                <div>
                  <label className="text-xs font-medium block mb-1 opacity-70">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sunita Sharma"
                      value={formData.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-colors"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "var(--color-warm-white)",
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium block mb-1 opacity-70">
                      Phone Number (WhatsApp) *
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-colors"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          color: "var(--color-warm-white)",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium block mb-1 opacity-70">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
                      <input
                        type="email"
                        placeholder="sunita@example.com"
                        value={formData.email}
                        onChange={(e) => update("email", e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-colors"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          color: "var(--color-warm-white)",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium block mb-1 opacity-70">
                    Home / Kitchen Address (Optional)
                  </label>
                  <div className="relative">
                    <Home size={16} className="absolute left-3.5 top-3 opacity-40" />
                    <input
                      type="text"
                      placeholder="Street, Flat no., Society / Landmark"
                      value={formData.kitchenAddress}
                      onChange={(e) => update("kitchenAddress", e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-colors"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "var(--color-warm-white)",
                      }}
                    />
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-400 font-medium">{errorMsg}</p>
                )}
              </form>
            </motion.div>
          )}

          {/* ──────────────── STEP 7: SUBMISSION CONFIRMATION ──────────────── */}
          {step === 7 && (
            <motion.div
              key="step-7"
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col items-center text-center gap-5 py-4"
            >
              {/* Animated checkmark circle */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--color-leaf-green), #16a34a)",
                  boxShadow: "0 8px 30px rgba(39,174,96,0.4)",
                }}
              >
                <Check size={32} color="#fff" strokeWidth={3} />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-amber-500 mb-1 block">
                  Application Submitted
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--color-warm-white)" }}
                >
                  Welcome to Kitchen Queens! 👑
                </h3>
                <p className="text-sm max-w-sm mx-auto leading-relaxed" style={{ color: "rgba(255,253,249,0.7)" }}>
                  Thank you, <strong className="text-white">{formData.name}</strong>! Your application has been logged in our chef database with reference:
                </p>
                <div
                  className="inline-block mt-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold"
                  style={{
                    background: "rgba(230,126,34,0.18)",
                    border: "1px solid var(--color-saffron)",
                    color: "var(--color-saffron)",
                  }}
                >
                  {submittedId}
                </div>
              </div>

              {/* What happens next */}
              <div
                className="w-full text-left p-4 rounded-xl flex flex-col gap-2.5 text-xs"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p className="font-semibold text-amber-400 uppercase tracking-wider mb-1">
                  What happens next:
                </p>
                <div className="flex items-center gap-2 text-white/80">
                  <span>📞</span>
                  <span>Our neighbourhood partner will call you at <strong>{formData.phone}</strong> within 24–48 hours.</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <span>🥣</span>
                  <span>A brief friendly home kitchen hygiene check & sample meal tasting.</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <span>📱</span>
                  <span>App onboarding & daily tiffin box supply provided free by Kitchen Queens.</span>
                </div>
              </div>

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 px-8 py-3 rounded-full text-sm font-semibold transition-all"
                  style={{
                    background: "var(--color-brand-red)",
                    color: "#fff",
                    boxShadow: "0 4px 20px rgba(192,57,43,0.35)",
                  }}
                >
                  Done
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons Bar (Steps 1 to 6) */}
      {step <= 6 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,253,249,0.7)",
              }}
            >
              <ArrowLeft size={15} />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <button
              type="button"
              disabled={!canContinue()}
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all"
              style={{
                background: canContinue()
                  ? "var(--color-brand-red)"
                  : "rgba(255,255,255,0.08)",
                color: canContinue() ? "#fff" : "rgba(255,253,249,0.35)",
                boxShadow: canContinue() ? "0 4px 18px rgba(192,57,43,0.35)" : "none",
                cursor: canContinue() ? "pointer" : "not-allowed",
              }}
            >
              <span>Continue</span>
              <ArrowRight size={15} />
            </button>
          ) : (
            <button
              type="button"
              disabled={submitting}
              onClick={() => handleSubmit()}
              className="flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold transition-all"
              style={{
                background: submitting
                  ? "rgba(255,255,255,0.12)"
                  : "linear-gradient(135deg, var(--color-leaf-green), #16a34a)",
                color: "#fff",
                boxShadow: submitting ? "none" : "0 4px 22px rgba(39,174,96,0.4)",
                cursor: submitting ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <span>Submit Application</span>
                  <Check size={16} />
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
