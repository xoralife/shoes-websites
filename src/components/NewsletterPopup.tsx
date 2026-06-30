"use client";

import { useState, useEffect } from "react";
import { X, Mail } from "lucide-react";

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const dismissed = sessionStorage.getItem("solemate-popup-dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setIsVisible(true), 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      sessionStorage.setItem("solemate-popup-dismissed", "true");
      setIsVisible(false);
    }
  };

  const dismiss = () => {
    sessionStorage.setItem("solemate-popup-dismissed", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[90]" onClick={dismiss} />
      <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 animate-scale-in relative">
          <button onClick={dismiss} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={18} />
          </button>
          <div className="w-16 h-16 rounded-full bg-[#E94560]/10 flex items-center justify-center mx-auto mb-4">
            <Mail size={28} className="text-[#E94560]" />
          </div>
          <h3 className="text-2xl font-bold text-[#16213E] text-center mb-2">Get 20% Off!</h3>
          <p className="text-[#6C757D] text-sm text-center mb-6">Subscribe to get exclusive offers and 20% off your first order.</p>
          <form onSubmit={submit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E94560]/20 text-sm"
            />
            <button type="submit" className="w-full py-3 rounded-xl bg-[#E94560] text-white font-medium text-sm hover:bg-[#d63851] transition-all duration-300">
              Subscribe & Get Discount
            </button>
          </form>
          <p className="text-xs text-[#6C757D] text-center mt-4">No spam, unsubscribe anytime.</p>
        </div>
      </div>
    </>
  );
}
