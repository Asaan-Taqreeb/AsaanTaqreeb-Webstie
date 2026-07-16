"use client";

import React, { useState } from "react";
import { useAdmin } from "../_context/AdminContext";
import { ShieldCheck, Eye, EyeOff, KeyRound, Terminal, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginView() {
  const { login, loginWithToken, isLoading } = useAdmin();
  
  // Tab selector: 'credentials' or 'token'
  const [activeTab, setActiveTab] = useState<"credentials" | "token">("credentials");
  
  // Credentials form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Token form state
  const [rawToken, setRawToken] = useState("");
  
  // Status state
  const [errorMsg, setErrorMsg] = useState("");

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email.trim() || !password.trim()) return;

    try {
      await login(email, password);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to log in. Please verify your credentials.";
      setErrorMsg(message);
    }
  };

  const handleTokenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!rawToken.trim()) return;

    try {
      await loginWithToken(rawToken);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid or expired Bearer Token.";
      setErrorMsg(message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-waterloo text-colonial p-4 font-sans relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pregold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pregold/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-gradient-to-br from-[#12151A] to-[#0D0F12] border border-colonial/15 rounded-3xl p-8 shadow-2xl backdrop-blur-md relative z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-16 w-16 rounded-2xl bg-pregold/15 flex items-center justify-center border border-pregold/30 text-pregold mb-4 shadow-lg shadow-pregold/5">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold font-custom text-white">Asaan Taqreeb</h2>
          <p className="text-sm text-colonial/50 mt-1.5">Administrative Control Console</p>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-2 p-1.5 bg-black/35 rounded-xl mb-6 border border-white/5">
          <button
            type="button"
            onClick={() => {
              setActiveTab("credentials");
              setErrorMsg("");
            }}
            className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "credentials"
                ? "bg-pregold text-waterloo shadow-md"
                : "text-colonial/60 hover:text-white"
            }`}
          >
            <KeyRound className="h-3.5 w-3.5" />
            Credentials
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("token");
              setErrorMsg("");
            }}
            className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "token"
                ? "bg-pregold text-waterloo shadow-md"
                : "text-colonial/60 hover:text-white"
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            Direct Token
          </button>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="flex items-start gap-2.5 p-3.5 bg-red-500/10 border border-red-500/25 rounded-xl mb-6 text-red-400 text-sm animate-fadeIn">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Forms */}
        {activeTab === "credentials" ? (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-colonial/60 mb-2">Admin Email</label>
              <input
                type="email"
                required
                disabled={isLoading}
                placeholder="admin@asaantaqreeb.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-colonial/15 focus:border-pregold/70 text-white rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-pregold/30 transition-all disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-colonial/60 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isLoading}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-colonial/15 focus:border-pregold/70 text-white rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-pregold/30 transition-all pr-10 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-colonial/40 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 py-3.5 bg-pregold hover:bg-pregold/90 text-waterloo font-bold rounded-xl text-sm shadow-lg shadow-pregold/10 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" /> Verifying Credentials...
                </>
              ) : (
                "Authenticate Account"
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-colonial/60 mb-2">
                JWT Bearer Token
              </label>
              <textarea
                required
                disabled={isLoading}
                rows={4}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={rawToken}
                onChange={(e) => setRawToken(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-colonial/15 focus:border-pregold/70 text-white rounded-xl text-xs font-mono focus:outline-none focus:ring-1 focus:ring-pregold/30 transition-all resize-none disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-3.5 bg-pregold hover:bg-pregold/90 text-waterloo font-bold rounded-xl text-sm shadow-lg shadow-pregold/10 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" /> Checking Session...
                </>
              ) : (
                "Access Dashboard with Token"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
