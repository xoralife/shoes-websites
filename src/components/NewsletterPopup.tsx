"use client";

import { useState, useEffect } from "react";
import { X, Mail, Check } from "lucide-react";

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("solemate-popup-dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setIsVisible(true), 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const saved = JSON.parse(localStorage.getItem("solemate-subscribers") || "[]");
    saved.push({ email, date: new Date().toISOString() });
    localStorage.setItem("solemate-subscribers", JSON.stringify(saved));
    setSubscribed(true);
    setTimeout(() => {
      sessionStorage.setItem("solemate-popup-dismissed", "true");
      setIsVisible(false);
      setSubscribed(false);
    }, 2000);
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
          <button onClick={dismiss} className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:bg-[#2D2D4A] rounded-full transition-colors">
            <X size={18} />
          </button>
          {subscribed ? (
            <>
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check size={28} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-[#16213E] dark:text-[#F8F9FA] text-center mb-2">You&apos;re In!</h3>
              <p className="text-[#6C757D] dark:text-gray-400 dark:text-gray-500 text-sm text-center">Check your inbox for 20% off your first order.</p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-[#E94560]/10 flex items-center justify-center mx-auto mb-4">
                <Mail size={28} className="text-[#E94560] dark:text-[#FF6B6B]" />
              </div>
              <h3 className="text-2xl font-bold text-[#16213E] dark:text-[#F8F9FA] text-center mb-2">Get 20% Off!</h3>
              <p className="text-[#6C757D] dark:text-gray-400 dark:text-gray-500 text-sm text-center mb-6">Subscribe to get exclusive offers and 20% off your first order.</p>
              <form onSubmit={submit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2D2D4A] focus:outline-none focus:ring-2 focus:ring-[#E94560]/20 text-sm"
                />
                <button type="submit" className="w-full py-3 rounded-xl bg-[#E94560] text-white font-medium text-sm hover:bg-[#d63851] transition-all duration-300">
                  Subscribe & Get Discount
                </button>
              </form>
              <p className="text-xs text-[#6C757D] dark:text-gray-400 dark:text-gray-500 text-center mt-4">No spam, unsubscribe anytime.</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
