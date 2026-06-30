"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

interface BackInStockProps {
  productName: string;
}

export default function BackInStock({ productName }: BackInStockProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  if (submitted) {
    return (
      <p className="text-sm text-green-600 flex items-center gap-1">
        <Bell size={14} /> We&apos;ll notify you when {productName} is back!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        required
        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/20"
      />
      <button type="submit" className="px-4 py-2 rounded-lg bg-[#1A1A2E] text-white text-sm font-medium hover:bg-[#0F3460] transition-colors whitespace-nowrap">
        Notify Me
      </button>
    </form>
  );
}
