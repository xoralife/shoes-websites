"use client";

import { CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Toast() {
  const { isToastVisible, toastMessage } = useCart();

  if (!isToastVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] toast-enter">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#1A1A2E] text-white shadow-2xl border border-white/10">
        <CheckCircle size={20} className="text-green-400" />
        <span className="text-sm font-medium">{toastMessage}</span>
      </div>
    </div>
  );
}
