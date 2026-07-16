"use client";

import React, { useState, useEffect } from "react";
import { useAdmin } from "../_context/AdminContext";
import { Search, ShieldAlert, CheckCircle, Trash2, Loader2, RefreshCw } from "lucide-react";

export default function UserDirectory() {
  const { users, loadUsers, updateUserStatus, deleteAccount, isLoading } = useAdmin();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Debounced API fetch trigger
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadUsers(searchQuery, statusFilter);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, statusFilter, loadUsers]);

  const handleRefresh = () => {
    loadUsers(searchQuery, statusFilter);
  };

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    try {
      await updateUserStatus(userId, !currentStatus);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update user status.";
      alert(message);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (confirm(`Are you absolutely sure you want to delete client account "${userName}"? This will purge all associated logs.`)) {
      try {
        await deleteAccount(userId);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to delete user account.";
        alert(message);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-colonial/40">
            <Search className="h-5 w-5" />
          </span>
          <input
            type="text"
            placeholder="Search clients by name, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#12151A] border border-colonial/15 focus:border-pregold/70 text-white rounded-xl text-sm focus:outline-none placeholder-colonial/30 transition-all shadow-inner"
          />
        </div>

        {/* Filters & Actions */}
        <div className="flex items-center gap-3 justify-between md:justify-end">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#12151A] border border-colonial/15 focus:border-pregold/70 text-colonial/80 px-4 py-3 rounded-xl text-sm focus:outline-none transition-all cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
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

      {/* Users Table */}
      <div className="bg-gradient-to-br from-[#12151A] to-[#0D0F12] border border-colonial/10 rounded-2xl shadow-xl overflow-hidden relative">
        {isLoading && users.length === 0 && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-10">
            <Loader2 className="h-8 w-8 text-pregold animate-spin" />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-colonial/10 bg-black/25">
                <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-colonial/50">Name</th>
                <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-colonial/50">Email</th>
                <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-colonial/50">Phone Number</th>
                <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-colonial/50">Join Date</th>
                <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-colonial/50">Status</th>
                <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-colonial/50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-colonial/5">
              {users.length > 0 ? (
                users.map((user) => {
                  const dateStr = user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-PK", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })
                    : "N/A";
                  return (
                    <tr key={user._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4.5 font-bold text-white whitespace-nowrap">{user.name}</td>
                      <td className="px-6 py-4.5 text-colonial/70 font-mono text-xs">{user.email}</td>
                      <td className="px-6 py-4.5 text-colonial/80 text-sm font-mono">{user.phone || "N/A"}</td>
                      <td className="px-6 py-4.5 text-colonial/60 text-xs whitespace-nowrap">{dateStr}</td>
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                          user.isActive 
                            ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400" 
                            : "bg-red-500/10 border-red-500/25 text-red-400"
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${user.isActive ? "bg-emerald-400" : "bg-red-400"}`} />
                          {user.isActive ? "Active" : "Suspended"}
                        </span>
                      </td>
                      <td className="px-6 py-4.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2.5">
                          {/* Toggle Status */}
                          <button
                            onClick={() => handleToggleStatus(user._id, user.isActive)}
                            disabled={isLoading}
                            title={user.isActive ? "Suspend Client" : "Reactivate Client"}
                            className={`p-2 rounded-lg border transition-all cursor-pointer ${
                              user.isActive 
                                ? "bg-amber-500/5 hover:bg-amber-500/15 border-amber-500/10 hover:border-amber-500/30 text-amber-400" 
                                : "bg-emerald-500/5 hover:bg-emerald-500/15 border-emerald-500/10 hover:border-emerald-500/30 text-emerald-400"
                            }`}
                          >
                            {user.isActive ? <ShieldAlert className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                          </button>

                          {/* Delete Account */}
                          <button
                            onClick={() => handleDeleteUser(user._id, user.name)}
                            disabled={isLoading}
                            title="Delete Client"
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
                  <td colSpan={6} className="px-6 py-12 text-center text-colonial/40 font-medium">
                    {isLoading ? "Fetching records..." : "No clients found. Try adjusting filter or search criteria."}
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
