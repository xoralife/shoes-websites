"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AuthPage() {
  const router = useRouter();
  const { login, signup, isLoggedIn } = useAuth();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isLoggedIn) {
    router.push("/");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (tab === "login") {
      if (login(email, password)) router.push("/");
      else setError("Invalid email or password.");
    } else {
      if (!name.trim()) { setError("Name is required."); return; }
      if (signup(name, email, password)) router.push("/");
      else setError("Email already registered. Please login.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-md mx-auto px-4">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-[#6C757D] hover:text-[#E94560] transition-colors mb-6">
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back</span>
          </button>

          <div className="bg-white rounded-3xl p-8 card-shadow">
            <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
              <button onClick={() => setTab("login")} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${tab === "login" ? "bg-white shadow-sm text-[#16213E]" : "text-[#6C757D]"}`}>Sign In</button>
              <button onClick={() => setTab("signup")} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${tab === "signup" ? "bg-white shadow-sm text-[#16213E]" : "text-[#6C757D]"}`}>Sign Up</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === "signup" && (
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6C757D]" />
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/20" />
                </div>
              )}
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6C757D]" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/20" />
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6C757D]" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/20" />
              </div>

              {error && <p className="text-[#E94560] text-sm">{error}</p>}

              <button type="submit" className="w-full py-3.5 rounded-xl bg-[#1A1A2E] text-white font-medium text-sm hover:bg-[#0F3460] transition-all duration-300">
                {tab === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
