"use client";

import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CouponInput from "./CouponInput";
import ShippingBar from "./ShippingBar";

export default function CartSidebar() {
  const { cart, isCartOpen, closeCart, removeFromCart, incrementQuantity, decrementQuantity, cartTotal, discount, discountLabel } = useCart();
  const router = useRouter();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) closeCart();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isCartOpen, closeCart]);

  return (
    <>
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] transition-opacity"
          onClick={closeCart}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-[#2D2D4A]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#1A1A2E]" />
            <h2 className="text-lg font-bold text-[#16213E] dark:text-[#F8F9FA]">Your Cart</h2>
            <span className="text-sm text-[#6C757D] dark:text-gray-400 dark:text-gray-500">({cart.length} items)</span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 dark:bg-[#2D2D4A] rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        <ShippingBar />
        <div className="flex flex-col h-[calc(100%-180px)] overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <ShoppingBag size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-[#6C757D] dark:text-gray-400 dark:text-gray-500 font-medium">Your cart is empty</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Add some products to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-[#F8F9FA] dark:bg-[#0F0F1A]">
                  <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
                      <path
                        d="M12 28 Q10 25 11 21 Q12 17 16 16 L24 15 Q28 14 29 17 Q30 20 28 22 L26 25 Q24 28 22 29 Q18 31 15 30 Q12 29 12 28Z"
                        fill={`url(#cg-${item.id})`}
                      />
                      <defs>
                        <linearGradient id={`cg-${item.id}`}>
                          <stop offset="0%" stopColor="#E94560" />
                          <stop offset="100%" stopColor="#FF6B6B" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[#16213E] dark:text-[#F8F9FA] text-sm truncate">{item.name}</h4>
                    <p className="font-semibold text-[#16213E] dark:text-[#F8F9FA] text-sm mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decrementQuantity(item.id)}
                        className="w-7 h-7 rounded-full bg-gray-200 dark:bg-[#2D2D4A] flex items-center justify-center hover:bg-gray-300 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(item.id)}
                        className="w-7 h-7 rounded-full bg-gray-200 dark:bg-[#2D2D4A] flex items-center justify-center hover:bg-gray-300 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors text-[#6C757D] dark:text-gray-400 dark:text-gray-500 hover:text-[#E94560] dark:text-[#FF6B6B]"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 dark:border-[#2D2D4A] bg-white">
            <CouponInput />
            {discount > 0 && (
              <div className="flex items-center justify-between mb-2 text-green-600 dark:text-green-400">
                <span className="font-semibold text-sm">{discountLabel}</span>
                <span className="font-medium text-sm">-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-[#16213E] dark:text-[#F8F9FA]">Total</span>
              <span className="text-xl font-bold text-[#16213E] dark:text-[#F8F9FA]">${Math.max(0, cartTotal - discount).toFixed(2)}</span>
            </div>
            <button onClick={() => { closeCart(); router.push("/checkout"); }} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#1A1A2E] text-white font-medium text-sm hover:bg-[#0F3460] transition-all duration-300">
            Proceed to Checkout <ArrowRight size={16} />
          </button>
          </div>
        )}
      </div>
    </>
  );
}
