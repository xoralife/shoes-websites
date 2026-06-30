"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("solemate-cookie-consent");
    if (!consent) setIsVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("solemate-cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
      <div className="max-w-7xl mx-auto bg-[#1A1A2E] text-white rounded-2xl px-6 py-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300">
          We use cookies to enhance your experience. By continuing, you agree to our use of cookies.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={accept} className="px-5 py-2 rounded-full bg-[#E94560] text-white text-sm font-medium hover:bg-[#d63851] transition-colors">
            Accept
          </button>
          <button onClick={() => setIsVisible(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
