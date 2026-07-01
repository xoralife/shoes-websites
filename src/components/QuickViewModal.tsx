"use client";

import { X, ShoppingBag, Heart, Star } from "lucide-react";
import { useCart, type Product } from "@/context/CartContext";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

const sizes = ["US 7", "US 8", "US 9", "US 10", "US 11"];
const colors = ["#1A1A2E", "#E94560", "#0F3460", "#FEEFC0", "#6C757D"];

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart, toggleWishlist, wishlist } = useCart();

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[80]" onClick={onClose} />
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-end p-4">
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
          <div className="px-6 pb-6 grid md:grid-cols-2 gap-6">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
              <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                <path d="M60 140 Q50 125 55 105 Q60 85 80 80 L120 75 Q140 72 145 85 Q150 98 140 110 L130 125 Q120 140 110 145 Q90 155 75 150 Q60 145 60 140Z" fill="url(#qg-${product.id})" />
                <path d="M80 80 L90 65 Q95 58 105 60 L120 62 Q128 65 125 72 L120 78" fill="url(#qg-${product.id})" />
                <defs>
                  <linearGradient id={`qg-${product.id}`} x1="50" y1="60" x2="150" y2="150">
                    <stop offset="0%" stopColor="#E94560" />
                    <stop offset="100%" stopColor="#FF6B6B" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="space-y-4">
              <span className="text-xs font-semibold text-[#E94560] uppercase tracking-wider">{product.category}</span>
              <h2 className="text-2xl font-bold text-[#16213E]">{product.name}</h2>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-[#FEEFC0] text-[#FEEFC0]" : "text-gray-300"} />
                ))}
                <span className="text-sm text-[#6C757D] ml-2">{product.rating}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-[#16213E]">${product.price.toFixed(2)}</span>
                {product.originalPrice > product.price && (
                <span className="text-lg text-[#6C757D] line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <p className="text-sm text-[#6C757D] leading-relaxed">
                Premium quality sneakers designed for ultimate comfort and style. Features cushioned sole, breathable mesh, and durable outsole.
              </p>
              <div>
                <p className="text-sm font-semibold text-[#16213E] mb-2">Size</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button key={size} className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:border-[#E94560] hover:text-[#E94560] transition-colors">
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#16213E] mb-2">Color</p>
                <div className="flex gap-2">
                  {colors.map((color) => (
                    <button key={color} className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-[#E94560] transition-colors" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => { addToCart(product); onClose(); }} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#E94560] text-white font-medium text-sm hover:bg-[#d63851] transition-all duration-300">
                  <ShoppingBag size={16} /> Add to Cart
                </button>
                <button onClick={() => toggleWishlist(product.id)} className="px-4 py-3 rounded-xl border border-gray-200 hover:border-[#E94560] transition-colors">
                  <Heart size={18} className={isWishlisted ? "fill-[#E94560] text-[#E94560]" : "text-[#6C757D]"} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
