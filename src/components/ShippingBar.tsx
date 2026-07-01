"use client";

import { Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";

const FREE_SHIPPING_THRESHOLD = 200;

export default function ShippingBar() {
  const { cartTotal } = useCart();

  if (cartTotal === 0) return null;

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const progress = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="px-6 py-3 border-b border-gray-100 dark:border-[#2D2D4A]">
      {remaining > 0 ? (
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-[#6C757D] dark:text-gray-400 dark:text-gray-500 mb-2">
            <Truck size={14} />
            Add ${remaining.toFixed(2)} more for free shipping
          </div>
          <div className="h-1.5 bg-gray-100 dark:bg-[#2D2D4A] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#E94560] to-[#FF6B6B] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-green-600 dark:text-green-400">
          <Truck size={14} />
          You qualify for free shipping!
        </div>
      )}
    </div>
  );
}
