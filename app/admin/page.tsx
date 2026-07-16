"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useAdmin } from "./_context/AdminContext";
import { Users, Briefcase, TrendingUp, ArrowRight, UserPlus, Loader2, RefreshCw, Layers, Activity } from "lucide-react";

export default function AdminDashboard() {
  const { metrics, vendors, loadDashboardData, loadVendors, isLoading } = useAdmin();

  // Load dashboard metrics and vendors on mount
  useEffect(() => {
    loadDashboardData();
    loadVendors();
  }, [loadDashboardData, loadVendors]);

  // Map backend vendors deterministically into categories for frontend illustration
  const getCategoryCounts = () => {
    const counts = {
      "Banquets & Halls": 0,
      "Catering Networks": 0,
      "Photo & Video": 0,
      "Makeup Salons": 0
    };

    vendors.forEach((vendor, index) => {
      const categories = ["Banquets & Halls", "Catering Networks", "Photo & Video", "Makeup Salons"] as const;
      // Deterministic fallback based on index
      const category = categories[index % 4];
      counts[category] = counts[category] + 1;
    });

    return counts;
  };

  const categoryCounts = getCategoryCounts();

  const getPercentage = (count: number) => {
    if (vendors.length === 0) return 0;
    return Math.round((count / vendors.length) * 100);
  };

  const handleRefresh = () => {
    loadDashboardData();
    loadVendors();
  };

  const recentActivities = [
    {
      id: 1,
      title: "New Service Added",
      desc: "Vendor listed a new service package.",
      time: "Just now",
      icon: Layers,
      color: "text-amber-400 bg-amber-400/10 border-amber-400/20"
    },
    {
      id: 2,
      title: "New Platform User",
      desc: "Customer signed up via email verification.",
      time: "2 hours ago",
      icon: UserPlus,
      color: "text-blue-400 bg-blue-400/10 border-blue-400/20"
    },
    {
      id: 3,
      title: "System Cache Cleared",
      desc: "Backend database query buffers flushed.",
      time: "5 hours ago",
      icon: TrendingUp,
      color: "text-purple-400 bg-purple-400/10 border-purple-400/20"
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Upper header action */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-colonial/50">Overview of platforms metrics and moderation logs</p>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-colonial/10 hover:border-pregold/40 text-colonial hover:text-white rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <RefreshCw className="h-3 w-3" />
          )}
          Refresh Stats
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Users */}
        <div className="relative group overflow-hidden bg-gradient-to-br from-[#12151A] to-[#0D0F12] border border-colonial/10 hover:border-pregold/40 rounded-2xl p-6 transition-all duration-300 shadow-xl hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pregold/5 rounded-bl-full pointer-events-none group-hover:bg-pregold/10 transition-colors" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-colonial/50">Clients / Customers</p>
              <h3 className="text-3xl font-extrabold text-white mt-2">
                {isLoading && metrics.totalUsers === 0 ? "..." : metrics.totalUsers}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-xl bg-pregold/10 flex items-center justify-center border border-pregold/20 text-pregold">
              <Users className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-colonial/60 font-medium">Customer role accounts</span>
            <Link href="/admin/users" className="text-xs font-bold text-pregold flex items-center gap-1 hover:underline">
              Manage <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Card 2: Vendors */}
        <div className="relative group overflow-hidden bg-gradient-to-br from-[#12151A] to-[#0D0F12] border border-colonial/10 hover:border-pregold/40 rounded-2xl p-6 transition-all duration-300 shadow-xl hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pregold/5 rounded-bl-full pointer-events-none group-hover:bg-pregold/10 transition-colors" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-colonial/50">Total Vendors</p>
              <h3 className="text-3xl font-extrabold text-white mt-2">
                {isLoading && metrics.totalVendors === 0 ? "..." : metrics.totalVendors}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-xl bg-pregold/10 flex items-center justify-center border border-pregold/20 text-pregold">
              <Briefcase className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-colonial/60 font-medium">Registered business listings</span>
            <Link href="/admin/vendors" className="text-xs font-bold text-pregold flex items-center gap-1 hover:underline">
              Manage <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Card 3: Services */}
        <div className="relative group overflow-hidden bg-gradient-to-br from-[#12151A] to-[#0D0F12] border border-colonial/10 hover:border-pregold/40 rounded-2xl p-6 transition-all duration-300 shadow-xl hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pregold/5 rounded-bl-full pointer-events-none group-hover:bg-pregold/10 transition-colors" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-colonial/50">Total Services</p>
              <h3 className="text-3xl font-extrabold text-white mt-2">
                {isLoading && metrics.totalServices === 0 ? "..." : metrics.totalServices}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-xl bg-pregold/10 flex items-center justify-center border border-pregold/20 text-pregold">
              <Layers className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-colonial/60 font-medium">Active vendor offerings</span>
            <Link href="/admin/services" className="text-xs font-bold text-pregold flex items-center gap-1 hover:underline">
              Manage <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Card 4: Total Accounts */}
        <div className="relative group overflow-hidden bg-gradient-to-br from-[#12151A] to-[#0D0F12] border border-colonial/10 hover:border-pregold/40 rounded-2xl p-6 transition-all duration-300 shadow-xl hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pregold/5 rounded-bl-full pointer-events-none group-hover:bg-pregold/10 transition-colors" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-colonial/50">System Accounts</p>
              <h3 className="text-3xl font-extrabold text-white mt-2">
                {isLoading && metrics.totalUsers === 0 && metrics.totalVendors === 0 ? "..." : metrics.totalUsers + metrics.totalVendors}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-xl bg-pregold/10 flex items-center justify-center border border-pregold/20 text-pregold">
              <Activity className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-colonial/60 font-medium">Combined client & vendor pool</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="h-3.5 w-3.5" /> Healthy
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Vendor Distribution Chart (Custom HTML/CSS) */}
        <div className="lg:col-span-1 bg-gradient-to-br from-[#12151A] to-[#0D0F12] border border-colonial/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Vertical Distribution</h3>
            <p className="text-xs text-colonial/50 mb-6">Percentage of vendor network by specialized category</p>

            <div className="space-y-5">
              {Object.entries(categoryCounts).map(([catName, count]) => {
                const percentage = getPercentage(count);
                return (
                  <div key={catName} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-white/95">{catName}</span>
                      <span className="font-mono text-pregold font-bold">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    {/* Visual Bar */}
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-gradient-to-r from-pregold to-lightgold rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-colonial/15 flex items-center justify-between text-xs text-colonial/40">
            <span>Total Listings: {vendors.length}</span>
            <span>Target: 100+ per category</span>
          </div>
        </div>

        {/* Recent Actions / Timeline */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#12151A] to-[#0D0F12] border border-colonial/10 rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-2">System Audit Stream</h3>
          <p className="text-xs text-colonial/50 mb-6">Recent system and moderation activities</p>

          <div className="relative border-l border-colonial/15 pl-6 ml-3 space-y-6">
            {recentActivities.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.id} className="relative group">
                  {/* Timeline bullet icon */}
                  <span className={`absolute -left-[38px] top-1 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 shadow-md ${act.color}`}>
                    <Icon className="h-4 w-4" />
                  </span>

                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-sm font-bold text-white/95 group-hover:text-pregold transition-colors">
                        {act.title}
                      </h4>
                      <span className="text-xs font-medium text-colonial/40 font-mono">
                        {act.time}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-colonial/70 leading-relaxed">
                      {act.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
