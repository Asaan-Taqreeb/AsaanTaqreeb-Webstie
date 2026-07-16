"use client";

import React, { useState, useEffect } from "react";
import { useAdmin } from "../_context/AdminContext";
import { Search, Trash2, Loader2, RefreshCw, Layers } from "lucide-react";

export default function ServicesDirectory() {
  const { services, loadServices, deleteService, isLoading } = useAdmin();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Debounced API fetch trigger
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadServices(searchQuery, categoryFilter);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, categoryFilter, loadServices]);

  const handleRefresh = () => {
    loadServices(searchQuery, categoryFilter);
  };

  const handleDeleteService = async (serviceId: string, serviceName: string) => {
    if (confirm(`Are you absolutely sure you want to delete the service "${serviceName}"? This action is permanent and cannot be undone.`)) {
      try {
        await deleteService(serviceId);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to delete service.";
        alert(message);
      }
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "BANQUET_HALL":
        return "Banquet & Hall";
      case "CATERING":
        return "Catering Network";
      case "PHOTOGRAPHY":
        return "Photo & Video";
      case "PARLOR_SALON":
        return "Makeup Salon";
      default:
        return category;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Controls */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-colonial/40">
            <Search className="h-5 w-5" />
          </span>
          <input
            type="text"
            placeholder="Search services by name, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#12151A] border border-colonial/15 focus:border-pregold/70 text-white rounded-xl text-sm focus:outline-none placeholder-colonial/30 transition-all shadow-inner"
          />
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#12151A] border border-colonial/15 focus:border-pregold/70 text-colonial/80 px-4 py-3 rounded-xl text-sm focus:outline-none transition-all cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="BANQUET_HALL">Banquet & Hall</option>
            <option value="CATERING">Catering Network</option>
            <option value="PHOTOGRAPHY">Photo & Video</option>
            <option value="PARLOR_SALON">Makeup Salon</option>
          </select>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-3 bg-white/5 border border-colonial/10 hover:border-pregold/40 text-colonial hover:text-white rounded-xl transition-all cursor-pointer disabled:opacity-50"
            title="Refresh List"
          >
            <RefreshCw className={`h-4.5 w-4.5 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-gradient-to-br from-[#12151A] to-[#0D0F12] border border-colonial/10 rounded-2xl shadow-xl overflow-hidden relative">
        {isLoading && services.length === 0 && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-10">
            <Loader2 className="h-8 w-8 text-pregold animate-spin" />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-colonial/10 bg-black/25">
                <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-colonial/50">Service Profile</th>
                <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-colonial/50">Vendor User</th>
                <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-colonial/50">Location</th>
                <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-colonial/50">Listed Date</th>
                <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-colonial/50 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-colonial/5">
              {services.length > 0 ? (
                services.map((service) => {
                  const dateStr = service.createdAt
                    ? new Date(service.createdAt).toLocaleDateString("en-PK", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })
                    : "N/A";

                  return (
                    <tr key={service._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        <div className="font-bold text-white text-base">{service.basicInfo?.name}</div>
                        <div className="text-pregold font-semibold text-xs mt-0.5 flex items-center gap-1.5">
                          <Layers className="h-3 w-3" />
                          {getCategoryLabel(service.category)}
                        </div>
                      </td>
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        <div className="text-colonial/80 text-sm font-semibold">{service.user?.name || "N/A"}</div>
                        <div className="text-colonial/40 font-mono text-xs mt-0.5">{service.user?.email || ""}</div>
                      </td>
                      <td className="px-6 py-4.5 text-colonial/80 text-sm whitespace-nowrap">{service.basicInfo?.location || "N/A"}</td>
                      <td className="px-6 py-4.5 text-colonial/60 text-xs font-mono whitespace-nowrap">{dateStr}</td>
                      <td className="px-6 py-4.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2.5">
                          {/* Delete Service */}
                          <button
                            onClick={() => handleDeleteService(service._id, service.basicInfo?.name || "Unnamed Service")}
                            disabled={isLoading}
                            title="Delete Service"
                            className="p-2 rounded-lg bg-red-500/5 hover:bg-red-500/15 border border-red-500/10 hover:border-red-500/30 text-red-400 transition-all cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-colonial/40 font-medium">
                    {isLoading ? "Fetching records..." : "No services found. Try adjusting filter or search criteria."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
