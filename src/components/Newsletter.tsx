"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  if (submitted) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-scale-in">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#16213E] dark:text-[#F8F9FA] mb-4">You&apos;re In!</h2>
          <p className="text-[#6C757D] dark:text-gray-400 dark:text-gray-500 max-w-md mx-auto">
            Thank you for subscribing! Check your inbox for exclusive offers.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#16213E] dark:text-[#F8F9FA] mb-4">
          Stay in the Loop
        </h2>
        <p className="text-[#6C757D] dark:text-gray-400 dark:text-gray-500 mb-8 max-w-md mx-auto">
          Subscribe to get special offers, free giveaways, and exclusive deals.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-5 py-3.5 rounded-xl border border-gray-200 dark:border-[#2D2D4A] focus:outline-none focus:ring-2 focus:ring-[#E94560]/20 focus:border-[#E94560] text-sm"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1A1A2E] text-white font-medium text-sm hover:bg-[#0F3460] transition-all duration-300 hover:-translate-y-0.5"
          >
            Subscribe
            <Send size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}
