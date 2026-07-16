"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Briefcase, ArrowLeft, Menu, X, Clock, ShieldCheck, LogOut, Layers } from "lucide-react";
import { AdminProvider, useAdmin } from "./_context/AdminContext";
import AdminLoginView from "./_components/AdminLoginView";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthenticated, isLoaded, logout } = useAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
    const updateClock = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-PK", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Vendors", href: "/admin/vendors", icon: Briefcase },
    { name: "Services", href: "/admin/services", icon: Layers }
  ];

  const getPageTitle = () => {
    if (pathname === "/admin/users") return "User Directory";
    if (pathname === "/admin/vendors") return "Vendor Management";
    if (pathname === "/admin/services") return "Service Management";
    return "System Dashboard";
  };

  const activeClass = "bg-pregold/15 text-pregold border-l-4 border-pregold font-bold";
  const inactiveClass = "text-colonial/70 hover:bg-white/5 hover:text-colonial border-l-4 border-transparent";

  // Loading skeleton screen
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-waterloo flex flex-col items-center justify-center text-pregold font-sans gap-3">
        <div className="h-10 w-10 border-2 border-pregold border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-semibold tracking-wider uppercase">Loading System Context...</span>
      </div>
    );
  }

  // Guard routing - redirect to login panel if unauthenticated
  if (!isAuthenticated) {
    return <AdminLoginView />;
  }

  return (
    <div className="flex min-h-screen bg-waterloo text-colonial font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 bg-[#0B0D11] border-r border-colonial/10 shadow-2xl z-20">
        <div className="flex h-24 items-center justify-between px-6 border-b border-colonial/10">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold font-custom tracking-wider text-pregold group-hover:text-colonial transition-colors">
              Asaan Taqreeb
            </span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-8 space-y-8">
          <div className="space-y-1">
            <span className="px-3 text-xs font-semibold uppercase tracking-wider text-colonial/45">
              Core Operations
            </span>
            <nav className="mt-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-r-xl text-base transition-all duration-200 ${
                      isActive ? activeClass : inactiveClass
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-4 border-t border-colonial/5 space-y-1">
            <span className="px-3 text-xs font-semibold uppercase tracking-wider text-colonial/45">
              Exit Panel
            </span>
            <nav className="mt-4 space-y-1">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3.5 rounded-r-xl text-base transition-all duration-200 text-colonial/70 hover:bg-white/5 hover:text-white border-l-4 border-transparent"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Website
              </Link>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-r-xl text-base transition-all duration-200 text-colonial/70 hover:bg-red-500/10 hover:text-red-400 border-l-4 border-transparent text-left cursor-pointer"
              >
                <LogOut className="h-5 w-5" />
                Log Out Session
              </button>
            </nav>
          </div>
        </div>

        <div className="p-6 border-t border-colonial/10 bg-black/20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-pregold/20 flex items-center justify-center border border-pregold/40">
              <ShieldCheck className="h-5 w-5 text-pregold" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">System Admin</h4>
              <p className="text-xs text-colonial/50">Core Moderator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Navigation Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0B0D11] border-b border-colonial/10 flex items-center justify-between px-4 z-30">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 text-colonial/80 hover:text-pregold focus:outline-none"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        <span className="text-lg font-bold font-custom text-pregold">
          Asaan Taqreeb
        </span>
        <div className="h-8 w-8 rounded-full bg-pregold/20 flex items-center justify-center border border-pregold/40">
          <span className="text-xs font-bold text-pregold">ADM</span>
        </div>
      </div>

      {/* Mobile Sidebar Slide-out Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sidebar content */}
          <nav className="fixed inset-y-0 left-0 flex flex-col w-72 max-w-xs bg-[#0B0D11] border-r border-colonial/10 shadow-2xl p-6 transition-all duration-300">
            <div className="flex items-center justify-between pb-6 border-b border-colonial/10 mb-6">
              <span className="text-xl font-bold font-custom text-pregold">
                Asaan Taqreeb
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-colonial/80 hover:text-pregold"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 space-y-8">
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-colonial/45">
                  Core Operations
                </span>
                <div className="mt-4 space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base transition-all duration-200 ${
                          isActive ? activeClass : inactiveClass
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-colonial/5 space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-colonial/45">
                  Exit Panel
                </span>
                <div className="mt-4 space-y-1">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-base text-colonial/70 hover:bg-white/5 hover:text-white"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Back to Website
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base text-colonial/70 hover:bg-red-500/10 hover:text-red-400 text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    Log Out Session
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-colonial/10 mt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-pregold/20 flex items-center justify-center border border-pregold/40">
                  <ShieldCheck className="h-5 w-5 text-pregold" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">System Admin</h4>
                  <p className="text-xs text-colonial/50">Core Moderator</p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* Main Panel Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen pt-16 lg:pt-0">
        {/* Top Bar Header */}
        <header className="h-24 bg-[#090A0C] border-b border-colonial/10 flex items-center justify-between px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {getPageTitle()}
          </h1>

          {/* Time / Clock Widget */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-colonial/5 backdrop-blur-sm">
            <Clock className="h-4 w-4 text-pregold animate-pulse" />
            <span className="text-sm font-semibold font-mono tracking-wider text-colonial/90">
              {mounted ? timeString : "--:--:--"}
            </span>
            <span className="text-[10px] uppercase font-bold text-pregold/60 border border-pregold/30 px-1.5 py-0.5 rounded ml-1.5">
              PKT
            </span>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-6 lg:p-8 bg-[#090A0C] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminProvider>
  );
}
