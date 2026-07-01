"use client";

import { Heart, Star, ShoppingBag, Eye, Share2 } from "lucide-react";
import { useCart, type Product } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QuickViewModal from "./QuickViewModal";
import ShareModal from "./ShareModal";

interface ProductCardProps {
  product: Product;
}

const reviewCounts: Record<number, number> = {};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const router = useRouter();
  const [showQuickView, setShowQuickView] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const isWishlisted = wishlist.includes(product.id);
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock !== undefined && product.stock > 0 && product.stock <= 3;

  useEffect(() => {
    if (!reviewCounts[product.id]) {
      reviewCounts[product.id] = Math.floor(Math.random() * 200) + 20;
    }
    try {
      const saved = localStorage.getItem("solemate-recently-viewed");
      const recent: Product[] = saved ? JSON.parse(saved) : [];
      const filtered = recent.filter((p) => p.id !== product.id);
      filtered.unshift(product);
      localStorage.setItem("solemate-recently-viewed", JSON.stringify(filtered.slice(0, 8)));
    } catch {}
  }, [product.id, product]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.3;
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} size={14} className="fill-[#FEEFC0] text-[#FEEFC0]" />);
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <span key={i} className="relative">
            <Star size={14} className="text-gray-300 dark:text-gray-600" />
            <span className="absolute inset-0 overflow-hidden w-[50%]">
              <Star size={14} className="fill-[#FEEFC0] text-[#FEEFC0]" />
            </span>
          </span>
        );
      } else {
        stars.push(<Star key={i} size={14} className="text-gray-300 dark:text-gray-600" />);
      }
    }
    return stars;
  };

  return (
    <div className="group bg-white dark:bg-[#1A1A2E] rounded-2xl card-shadow overflow-hidden card-hover cursor-pointer" onClick={() => router.push(`/product/${product.id}`)}>
      <div className="relative image-zoom">
        <div className="aspect-square bg-gradient-to-br from-gray-50 dark:from-[#2D2D4A] to-gray-100 dark:to-[#1A1A2E] flex items-center justify-center p-8">
          <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
            <path
              d="M60 140 Q50 125 55 105 Q60 85 80 80 L120 75 Q140 72 145 85 Q150 98 140 110 L130 125 Q120 140 110 145 Q90 155 75 150 Q60 145 60 140Z"
              fill={`url(#pg-${product.id})`} stroke="#D1D5DB" strokeWidth="1"
            />
            <path
              d="M80 80 L90 65 Q95 58 105 60 L120 62 Q128 65 125 72 L120 78"
              fill={`url(#pg-${product.id})`} stroke="#D1D5DB" strokeWidth="1"
            />
            <defs>
              <linearGradient id={`pg-${product.id}`} x1="50" y1="60" x2="150" y2="150">
                <stop offset="0%" stopColor="#E94560" />
                <stop offset="100%" stopColor="#FF6B6B" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
            className="w-9 h-9 rounded-full bg-white/80 dark:bg-[#1A1A2E]/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white dark:hover:bg-[#1A1A2E] transition-all"
            aria-label="Toggle wishlist"
          >
            <Heart
              size={18}
              className={isWishlisted ? "fill-[#E94560] text-[#E94560] dark:text-[#FF6B6B]" : "text-[#6C757D] dark:text-gray-400 dark:text-gray-500"}
            />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setShowShare(true); }}
            className="w-9 h-9 rounded-full bg-white/80 dark:bg-[#1A1A2E]/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white dark:hover:bg-[#1A1A2E] transition-all"
            aria-label="Share product"
          >
            <Share2 size={15} className="text-[#6C757D] dark:text-gray-400 dark:text-gray-500" />
          </button>
        </div>

        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <span className="px-2.5 py-1 bg-[#1A1A2E]/80 text-white text-xs font-medium rounded-full backdrop-blur-sm">
            {product.category}
          </span>
          {isOutOfStock && (
            <span className="px-2.5 py-1 bg-gray-600 text-white text-xs font-bold rounded-full">
              Out of Stock
            </span>
          )}
          {isLowStock && !isOutOfStock && (
            <span className="px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-full animate-pulse-slow">
              Low Stock
            </span>
          )}
          {product.originalPrice > product.price && !isOutOfStock && (
            <span className="px-2.5 py-1 bg-[#E94560] text-white text-xs font-bold rounded-full">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); setShowQuickView(true); }}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 dark:bg-[#1A1A2E]/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white dark:hover:bg-[#1A1A2E] transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          aria-label="Quick view"
        >
          <Eye size={16} className="text-[#1A1A2E]" />
        </button>
      </div>

      {showQuickView && (
        <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />
      )}

      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-[#16213E] dark:text-[#F8F9FA] text-lg">{product.name}</h3>

        <div className="flex items-center gap-1">
          {renderStars(product.rating)}
          <span className="text-xs text-[#6C757D] dark:text-gray-400 dark:text-gray-500 ml-1">{product.rating}</span>
          <span className="text-xs text-[#6C757D] dark:text-gray-400 dark:text-gray-500 ml-1">({reviewCounts[product.id] || Math.floor(Math.random() * 200) + 20} reviews)</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#16213E] dark:text-[#F8F9FA]">${product.price.toFixed(2)}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-[#6C757D] dark:text-gray-400 dark:text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <div className={`flex items-center gap-2 text-xs ${isOutOfStock ? "text-red-500" : isLowStock ? "text-amber-500" : "text-green-600 dark:text-green-400"}`}>
          <span className={`w-2 h-2 rounded-full inline-block animate-pulse-slow ${isOutOfStock ? "bg-red-500" : isLowStock ? "bg-amber-500" : "bg-green-500"}`} />
          {isOutOfStock ? "Out of Stock" : isLowStock ? `Only ${product.stock} left` : "In Stock"}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); if (!isOutOfStock) addToCart(product); }}
          disabled={isOutOfStock}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white font-medium text-sm bg-[#E94560] hover:bg-[#d63851] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#E94560]/25 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          <ShoppingBag size={16} />
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>

      {showShare && (
        <ShareModal productName={product.name} productUrl={`/product/${product.id}`} open={showShare} onClose={() => setShowShare(false)} />
      )}
    </div>
  );
}
