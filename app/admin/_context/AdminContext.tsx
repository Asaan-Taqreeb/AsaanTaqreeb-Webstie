"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: "client" | "vendor" | "admin";
  isActive: boolean;
  verificationStatus: "unverified" | "pending" | "verified" | "rejected";
  createdAt: string;
  identityDetails?: {
    cnic: string;
    idFrontImage: string;
    idBackImage: string;
    selfieImage: string;
    submissionDate: string;
  };
}

interface Metrics {
  totalUsers: number;
  totalVendors: number;
  totalServices: number;
  pendingApprovals: number;
  activeBanquets: number; // Treats verified vendors count
  verificationRate: number;
}

interface AdminContextProps {
  users: User[];
  vendors: User[];
  services: any[];
  metrics: Metrics;
  isLoading: boolean;
  isLoaded: boolean;
  isAuthenticated: boolean;
  adminToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithToken: (token: string) => Promise<void>;
  logout: () => void;
  loadUsers: (search?: string, isActive?: string) => Promise<void>;
  loadVendors: (search?: string, verificationStatus?: string, isActive?: string) => Promise<void>;
  loadServices: (search?: string, category?: string) => Promise<void>;
  getUserDetails: (id: string) => Promise<User>;
  updateUserStatus: (id: string, isActive: boolean) => Promise<void>;
  verifyVendorKYC: (id: string, status: "verified" | "rejected", reason?: string) => Promise<void>;
  deleteAccount: (id: string) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  loadDashboardData: () => Promise<void>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://asaantaqreeb.duckdns.org";

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [vendors, setVendors] = useState<User[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [metrics, setMetrics] = useState<Metrics>({
    totalUsers: 0,
    totalVendors: 0,
    totalServices: 0,
    pendingApprovals: 0,
    activeBanquets: 0,
    verificationRate: 0
  });

  // Logout operations
  const logout = () => {
    localStorage.removeItem("asaantaqreeb_admin_token");
    setAdminToken(null);
    setIsAuthenticated(false);
    setUsers([]);
    setVendors([]);
    setServices([]);
    setMetrics({
      totalUsers: 0,
      totalVendors: 0,
      totalServices: 0,
      pendingApprovals: 0,
      activeBanquets: 0,
      verificationRate: 0
    });
  };

  // Central Request Handler
  const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers || {});
    const token = adminToken || (typeof window !== "undefined" ? localStorage.getItem("asaantaqreeb_admin_token") : null);
    
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
      });

      if (response.status === 401) {
        logout();
        throw new Error("Session expired. Please log in again.");
      }

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || "API request failed");
      }
      return json;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Network request failed";
      throw new Error(message);
    }
  };

  // Load dashboard metrics
  const loadDashboardData = async () => {
    try {
      const [clientsRes, vendorsRes, servicesRes] = await Promise.all([
        apiFetch("/api/v1/admin/users?role=client&limit=1"),
        apiFetch("/api/v1/admin/users?role=vendor&limit=1"),
        apiFetch("/api/v1/admin/services?limit=1")
      ]);

      const totalClients = clientsRes.pagination?.totalUsers || 0;
      const totalVendors = vendorsRes.pagination?.totalUsers || 0;
      const totalServices = servicesRes.pagination?.totalServices || 0;

      setMetrics({
        totalUsers: totalClients,
        totalVendors,
        totalServices,
        pendingApprovals: 0,
        activeBanquets: 0,
        verificationRate: 0
      });
    } catch (err) {
      console.error("Failed to load dashboard metrics:", err);
    }
  };

  // Auth Operations
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await apiFetch("/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password, role: "admin" })
      });

      const token = res.data?.accessToken;
      const userRole = res.data?.user?.role;
      const userRoles = res.data?.user?.roles || [];

      if (!token) {
        throw new Error("Failed to retrieve token from login response.");
      }

      if (userRole !== "admin" && !userRoles.includes("admin")) {
        throw new Error("Access Denied: Only accounts with the admin role can access this dashboard.");
      }

      localStorage.setItem("asaantaqreeb_admin_token", token);
      setAdminToken(token);
      setIsAuthenticated(true);
    } catch (err: unknown) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithToken = async (token: string) => {
    setIsLoading(true);
    try {
      const headers = new Headers();
      headers.set("Authorization", `Bearer ${token}`);
      const testRes = await fetch(`${API_BASE_URL}/api/v1/admin/users?limit=1`, {
        headers
      });

      if (!testRes.ok) {
        throw new Error("Invalid Bearer Token. Verification request rejected by backend.");
      }

      localStorage.setItem("asaantaqreeb_admin_token", token);
      setAdminToken(token);
      setIsAuthenticated(true);
    } catch (err: unknown) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Data Fetching Operations
  const loadUsers = async (search = "", isActive = "") => {
    setIsLoading(true);
    try {
      let url = `/api/v1/admin/users?role=client&limit=100`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (isActive && isActive !== "All") url += `&isActive=${isActive === "Active" ? "true" : "false"}`;

      const res = await apiFetch(url);
      setUsers(res.data || []);
    } catch (err: unknown) {
      console.error("Failed to load clients list:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadVendors = async (search = "", verificationStatus = "", isActive = "") => {
    setIsLoading(true);
    try {
      let url = `/api/v1/admin/users?role=vendor&limit=100`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (verificationStatus && verificationStatus !== "All") url += `&verificationStatus=${verificationStatus.toLowerCase()}`;
      if (isActive && isActive !== "All") url += `&isActive=${isActive === "Active" ? "true" : "false"}`;

      const res = await apiFetch(url);
      setVendors(res.data || []);
    } catch (err: unknown) {
      console.error("Failed to load vendors list:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserDetails = async (id: string): Promise<User> => {
    try {
      const res = await apiFetch(`/api/v1/admin/users/${id}`);
      return res.data;
    } catch (err: unknown) {
      console.error(`Failed to load details for user ${id}:`, err);
      throw err;
    }
  };

  // Data Mutation Operations
  const updateUserStatus = async (id: string, isActive: boolean) => {
    setIsLoading(true);
    try {
      await apiFetch(`/api/v1/admin/users/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ isActive })
      });
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isActive } : u))
      );
      setVendors((prev) =>
        prev.map((v) => (v._id === id ? { ...v, isActive } : v))
      );
    } catch (err: unknown) {
      console.error("Failed to toggle status:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyVendorKYC = async (id: string, status: "verified" | "rejected", reason?: string) => {
    setIsLoading(true);
    try {
      const body: { status: string; rejectionReason?: string } = { status };
      if (status === "rejected" && reason) {
        body.rejectionReason = reason;
      }

      await apiFetch(`/api/v1/admin/users/${id}/verify`, {
        method: "PATCH",
        body: JSON.stringify(body)
      });
      
      setVendors((prev) =>
        prev.map((v) => (v._id === id ? { ...v, verificationStatus: status } : v))
      );
      loadDashboardData();
    } catch (err: unknown) {
      console.error("Failed to review vendor verification KYC:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loadServices = async (search = "", category = "") => {
    setIsLoading(true);
    try {
      let url = `/api/v1/admin/services?limit=100`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (category && category !== "All") url += `&category=${category}`;

      const res = await apiFetch(url);
      setServices(res.data || []);
    } catch (err: unknown) {
      console.error("Failed to load services list:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    setIsLoading(true);
    try {
      await apiFetch(`/api/v1/admin/services/${id}`, {
        method: "DELETE"
      });
      setServices((prev) => prev.filter((s) => s._id !== id));
      loadDashboardData();
    } catch (err: unknown) {
      console.error("Failed to delete vendor service:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async (id: string) => {
    setIsLoading(true);
    try {
      await apiFetch(`/api/v1/admin/users/${id}`, {
        method: "DELETE"
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setVendors((prev) => prev.filter((v) => v._id !== id));
      loadDashboardData();
    } catch (err: unknown) {
      console.error("Failed to delete user account:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Check auth status on mount
  useEffect(() => {
    const token = localStorage.getItem("asaantaqreeb_admin_token");
    setTimeout(() => {
      if (token) {
        setAdminToken(token);
        setIsAuthenticated(true);
      }
      setIsLoaded(true);
    }, 0);
  }, []);

  // Fetch initial data once authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        loadDashboardData();
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, adminToken]);

  return (
    <AdminContext.Provider
      value={{
        users,
        vendors,
        services,
        metrics,
        isLoading,
        isLoaded,
        isAuthenticated,
        adminToken,
        login,
        loginWithToken,
        logout,
        loadUsers,
        loadVendors,
        loadServices,
        getUserDetails,
        updateUserStatus,
        verifyVendorKYC,
        deleteAccount,
        deleteService,
        loadDashboardData
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
