import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Ghar Ka Khaana — Healthy, Affordable, Home-Cooked Meals",
  description:
    "Ghar Ka Khaana connects verified home cooks with students, hostel residents, and working professionals for daily home-cooked meal subscriptions. Healthy, affordable, and authentic.",
  keywords: [
    "home cooked food",
    "tiffin service",
    "meal subscription",
    "Indian food",
    "food startup",
    "home cooks",
    "kitchen queens",
    "affordable meals",
    "healthy food delivery",
    "Ghar Ka Khaana",
  ],
  authors: [{ name: "Raj Gupta" }],
  creator: "Ghar Ka Khaana",
  openGraph: {
    title: "Ghar Ka Khaana — Healthy, Affordable, Home-Cooked Meals",
    description:
      "Real food. Real homes. Real connection. Home-cooked meal subscriptions for students and working professionals.",
    type: "website",
    locale: "en_IN",
    siteName: "Ghar Ka Khaana",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghar Ka Khaana — Home-Cooked Meals, Delivered Daily",
    description:
      "Connecting verified home cooks with people who miss home food.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${playfairDisplay.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
