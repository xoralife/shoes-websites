"use client";

import { CheckCircle, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Toast() {
  const { isToastVisible, toastMessage, dismissToast } = useCart();

  if (!isToastVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] toast-enter">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#1A1A2E] text-white shadow-2xl border border-white/10">
        <CheckCircle size={20} className="text-green-400 shrink-0" />
        <span className="text-sm font-medium">{toastMessage}</span>
        <button onClick={dismissToast} className="ml-2 p-0.5 hover:bg-white dark:hover:bg-[#1A1A2E]/10 rounded transition-colors" aria-label="Dismiss">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
