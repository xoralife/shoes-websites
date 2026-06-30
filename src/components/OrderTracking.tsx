"use client";

import { useState } from "react";
import { Package, Search } from "lucide-react";

export default function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) setSubmitted(true);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Package size={36} className="mx-auto text-[#E94560] mb-4" />
        <h2 className="text-2xl md:text-3xl font-bold text-[#16213E] mb-3">Track Your Order</h2>
        <p className="text-[#6C757D] mb-6">Enter your order number to check the status.</p>
        {submitted ? (
          <div className="p-6 rounded-2xl bg-green-50 border border-green-200 animate-scale-in">
            <p className="text-green-700 font-medium">Order #{orderId} is on its way!</p>
            <p className="text-green-600 text-sm mt-1">Estimated delivery: 3-5 business days</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. SOLE-12345"
              required
              className="flex-1 px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E94560]/20 text-sm"
            />
            <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1A1A2E] text-white font-medium text-sm hover:bg-[#0F3460] transition-all">
              <Search size={16} /> Track
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
