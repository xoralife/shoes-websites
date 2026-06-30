"use client";

import { Heart, Star, ShoppingBag, Eye } from "lucide-react";
import { useCart, type Product } from "@/context/CartContext";
import { useState } from "react";
import QuickViewModal from "./QuickViewModal";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const [showQuickView, setShowQuickView] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          className={i <= Math.floor(rating) ? "fill-[#FEEFC0] text-[#FEEFC0]" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  return (
    <div className="group bg-white rounded-2xl card-shadow overflow-hidden card-hover">
      <div className="relative image-zoom">
        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
          <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
            <path
              d="M60 140 Q50 125 55 105 Q60 85 80 80 L120 75 Q140 72 145 85 Q150 98 140 110 L130 125 Q120 140 110 145 Q90 155 75 150 Q60 145 60 140Z"
              fill="url(#productGrad)" stroke="#D1D5DB" strokeWidth="1"
            />
            <path
              d="M80 80 L90 65 Q95 58 105 60 L120 62 Q128 65 125 72 L120 78"
              fill="url(#productGrad)" stroke="#D1D5DB" strokeWidth="1"
            />
            <defs>
              <linearGradient id="productGrad" x1="50" y1="60" x2="150" y2="150">
                <stop offset="0%" stopColor="#E94560" />
                <stop offset="100%" stopColor="#FF6B6B" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all"
          aria-label="Toggle wishlist"
        >
          <Heart
            size={18}
            className={isWishlisted ? "fill-[#E94560] text-[#E94560]" : "text-[#6C757D]"}
          />
        </button>

        <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#1A1A2E]/80 text-white text-xs font-medium rounded-full backdrop-blur-sm">
          {product.category}
        </span>

        <button
          onClick={() => setShowQuickView(true)}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          aria-label="Quick view"
        >
          <Eye size={16} className="text-[#1A1A2E]" />
        </button>
      </div>

      {showQuickView && (
        <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />
      )}

      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-[#16213E] text-lg">{product.name}</h3>

        <div className="flex items-center gap-1">
          {renderStars(product.rating)}
          <span className="text-xs text-[#6C757D] ml-1">{product.rating}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#16213E]">${product.price.toFixed(2)}</span>
          <span className="text-sm text-[#6C757D] line-through">${product.originalPrice.toFixed(2)}</span>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white font-medium text-sm bg-[#E94560] hover:bg-[#d63851] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#E94560]/25"
        >
          <ShoppingBag size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
