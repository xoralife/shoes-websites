"use client";

import { useState } from "react";
import { Tag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const COUPON_EXAMPLES = ["SOLE20", "FREESHIP", "SOLEMATE10"];

export default function CouponInput() {
  const { applyCoupon, removeCoupon, discountLabel, appliedCoupon, discount } = useCart();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const apply = () => {
    if (!code.trim()) return;
    const success = applyCoupon(code);
    if (success) { setCode(""); setError(""); }
    else setError("Invalid coupon code");
  };

  return (
    <div className="border-t border-gray-100 dark:border-[#2D2D4A] pt-4 mt-4">
      {appliedCoupon ? (
        <div className="flex items-center justify-between gap-2 text-green-600 dark:text-green-400 text-sm font-medium">
          <div className="flex items-center gap-2">
            <Tag size={16} />
            {discountLabel} applied
          </div>
          <button onClick={removeCoupon} className="p-1 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors">
            <X size={14} />
          </button>
        </div>
      ) : (
        <div>
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(""); }}
              placeholder="Coupon code"
              className="flex-1 px-3 py-2 border border-gray-200 dark:border-[#2D2D4A] bg-white dark:bg-[#1A1A2E] text-[#16213E] dark:text-[#F8F9FA] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/20"
              onKeyDown={(e) => e.key === "Enter" && apply()}
            />
            <button onClick={apply} className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-[#2D2D4A] text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#3D3D5A] transition-colors">
              Apply
            </button>
          </div>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          {discount === 0 && (
            <p className="text-xs text-[#6C757D] dark:text-gray-400 dark:text-gray-500 mt-1">Try: {COUPON_EXAMPLES.join(", ")}</p>
          )}
        </div>
      )}
    </div>
  );
}
