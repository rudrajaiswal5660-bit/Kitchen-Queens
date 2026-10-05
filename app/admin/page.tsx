"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MapPin,
  Utensils,
  Salad,
  Sun,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  ChefHat,
} from "lucide-react";

interface Submission {
  id: string;
  name: string;
  phone: string;
  email?: string;
  locality: string;
  availability: string;
  dietaryPreference: string;
  cuisines: string[];
  mealType: string;
  kitchenAddress?: string;
  specialDish?: string;
  status: "pending" | "contacted" | "approved" | "rejected";
  submittedAt: string;
  updatedAt?: string;
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/home-cook-apply");
      const data = await res.json();
      if (data.success && Array.isArray(data.submissions)) {
        setSubmissions(data.submissions);
        if (data.submissions.length > 0 && !selectedSub) {
          setSelectedSub(data.submissions[data.submissions.length - 1]);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/home-cook-apply", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmissions((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: newStatus as Submission["status"] } : s))
        );
        if (selectedSub && selectedSub.id === id) {
          setSelectedSub((prev) => (prev ? { ...prev, status: newStatus as Submission["status"] } : null));
        }
      }
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  const filtered = submissions.filter((s) => {
    const matchesSearch =
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.locality?.toLowerCase().includes(search.toLowerCase()) ||
      s.phone?.includes(search) ||
      s.cuisines?.some((c) => c.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = submissions.filter((s) => s.status === "pending").length;
  const contactedCount = submissions.filter((s) => s.status === "contacted").length;
  const approvedCount = submissions.filter((s) => s.status === "approved").length;

  return (
    <div
      className="min-h-screen text-slate-100 flex flex-col"
      style={{ background: "#111113", fontFamily: "var(--font-inter, sans-serif)" }}
    >
      {/* Top Navbar */}
      <header
        className="border-b border-white/10 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(24, 24, 27, 0.8)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white shadow-lg"
            style={{ background: "var(--color-brand-red, #C0392B)" }}
          >
            KQ
          </span>
          <div>
            <h1 className="text-base font-bold text-white leading-tight flex items-center gap-2">
              Kitchen Queens
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono font-semibold uppercase tracking-wider">
                Demo Admin DB
              </span>
            </h1>
            <p className="text-xs text-slate-400">Home Cook Submissions & Onboarding Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchSubmissions()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
          <Link
            href="/"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors"
          >
            <span>View Website</span>
            <ExternalLink size={12} />
          </Link>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="border-b border-white/10 bg-black/20 px-6 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <p className="text-xs text-slate-400 font-medium">Total Applications</p>
            <p className="text-2xl font-bold text-white mt-1">{submissions.length}</p>
          </div>
          <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
            <p className="text-xs text-amber-400 font-medium">Pending Review</p>
            <p className="text-2xl font-bold text-amber-300 mt-1">{pendingCount}</p>
          </div>
          <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
            <p className="text-xs text-blue-400 font-medium">Contacted / Interview</p>
            <p className="text-2xl font-bold text-blue-300 mt-1">{contactedCount}</p>
          </div>
          <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
            <p className="text-xs text-emerald-400 font-medium">Approved Queens</p>
            <p className="text-2xl font-bold text-emerald-300 mt-1">{approvedCount}</p>
          </div>
        </div>
      </div>

      {/* Main Content: Split Master-Detail */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Submissions List */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* Search & Filter */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, locality, phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white placeholder-slate-400 outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-slate-200 outline-none cursor-pointer"
            >
              <option value="all" className="bg-neutral-900 text-white">All Statuses</option>
              <option value="pending" className="bg-neutral-900 text-amber-400">Pending</option>
              <option value="contacted" className="bg-neutral-900 text-blue-400">Contacted</option>
              <option value="approved" className="bg-neutral-900 text-emerald-400">Approved</option>
            </select>
          </div>

          {/* List Cards */}
          <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[600px] pr-1">
            {loading ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                Loading database submissions...
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                <ChefHat size={32} className="mx-auto mb-2 text-slate-500" />
                <p className="text-sm font-semibold text-slate-300">No applications found</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Submit the form in the &quot;Become a Home Cook&quot; section on the main website to see candidates populate here in real-time.
                </p>
              </div>
            ) : (
              filtered.map((item) => {
                const isSelected = selectedSub?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSub(item)}
                    className="w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-2"
                    style={{
                      background: isSelected ? "rgba(230,126,34,0.12)" : "rgba(255,255,255,0.03)",
                      borderColor: isSelected ? "var(--color-saffron, #E67E22)" : "rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-white">{item.name}</span>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider"
                        style={{
                          background:
                            item.status === "approved"
                              ? "rgba(39,174,96,0.2)"
                              : item.status === "contacted"
                              ? "rgba(59,130,246,0.2)"
                              : "rgba(230,126,34,0.2)",
                          color:
                            item.status === "approved"
                              ? "#4ade80"
                              : item.status === "contacted"
                              ? "#60a5fa"
                              : "#fcd34d",
                        }}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin size={12} className="text-rose-400 shrink-0" />
                      <span className="truncate">{item.locality}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-white/5">
                      <span>{item.dietaryPreference || "Veg / Non-Veg"}</span>
                      <span>{new Date(item.submittedAt).toLocaleDateString()}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Selected Candidate Details */}
        <div className="lg:col-span-7">
          {selectedSub ? (
            <div
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col gap-6"
              style={{ backdropFilter: "blur(16px)" }}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-white">{selectedSub.name}</h2>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                      {selectedSub.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Submitted: {new Date(selectedSub.submittedAt).toLocaleString()}
                  </p>
                </div>

                {/* Status Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateStatus(selectedSub.id, "contacted")}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 transition-colors"
                  >
                    Mark Contacted
                  </button>
                  <button
                    onClick={() => updateStatus(selectedSub.id, "approved")}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 transition-colors"
                  >
                    Approve Queen
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Phone Number</p>
                    <a
                      href={`tel:${selectedSub.phone}`}
                      className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors"
                    >
                      {selectedSub.phone}
                    </a>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Email Address</p>
                    <p className="text-sm font-semibold text-white">
                      {selectedSub.email || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Cooking Profile */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                  Cooking & Kitchen Profile
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-400 block mb-1">Locality</span>
                    <span className="font-semibold text-white text-sm">{selectedSub.locality}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-400 block mb-1">Availability</span>
                    <span className="font-semibold text-white text-sm">{selectedSub.availability}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-400 block mb-1">Dietary Preference</span>
                    <span className="font-semibold text-white text-sm">{selectedSub.dietaryPreference}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-400 block mb-1">Meal Shifts</span>
                    <span className="font-semibold text-white text-sm">{selectedSub.mealType || "Lunch & Dinner"}</span>
                  </div>
                </div>

                {/* Cuisines */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-slate-400 block text-xs mb-2">Speciality Cuisines</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSub.cuisines?.map((c) => (
                      <span
                        key={c}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Address or extra notes */}
                {selectedSub.kitchenAddress && (
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-400 block text-xs mb-1">Kitchen / Pickup Address</span>
                    <p className="text-sm text-white">{selectedSub.kitchenAddress}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02] text-slate-500 text-sm">
              Select a candidate from the left panel to inspect their details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
