"use client";

import { useState } from "react";
import { Tag } from "lucide-react";

export default function CouponInput() {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);

  const apply = () => {
    if (code.trim().toUpperCase() === "SOLE20") {
      setApplied(true);
    }
  };

  return (
    <div className="border-t border-gray-100 pt-4 mt-4">
      {applied ? (
        <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
          <Tag size={16} />
          Coupon SOLE20 applied - 20% off
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Coupon code"
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/20"
            onKeyDown={(e) => e.key === "Enter" && apply()}
          />
          <button
            onClick={apply}
            className="px-4 py-2 rounded-lg bg-gray-100 text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
