"use client";

import { useRouter } from "next/navigation";
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import Toast from "@/components/Toast";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function WishlistPage() {
  const router = useRouter();
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0F0F1A]">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-[#6C757D] dark:text-gray-400 hover:text-[#E94560] transition-colors mb-6">
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back</span>
          </button>

          <div className="flex items-center gap-3 mb-10">
            <Heart size={28} className="text-[#E94560]" />
            <h1 className="text-2xl md:text-3xl font-bold text-[#16213E] dark:text-[#F8F9FA]">My Wishlist</h1>
            <span className="text-[#6C757D] dark:text-gray-400 text-sm">({wishlistProducts.length} items)</span>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="text-center py-20">
              <Heart size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h2 className="text-xl font-bold text-[#16213E] dark:text-[#F8F9FA] mb-2">Your Wishlist is Empty</h2>
              <p className="text-[#6C757D] dark:text-gray-400 mb-6">Save your favorite items here!</p>
              <button onClick={() => router.push("/")} className="px-8 py-3 rounded-xl bg-[#E94560] text-white font-medium text-sm hover:bg-[#d63851] transition-all">
                Explore Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistProducts.map((product) => (
                <div key={product.id} className="bg-white dark:bg-[#1A1A2E] rounded-2xl overflow-hidden card-shadow card-hover group">
                  <div className="aspect-square bg-gradient-to-br from-gray-50 dark:from-[#2D2D4A] to-gray-100 dark:to-[#1A1A2E] flex items-center justify-center p-8 cursor-pointer" onClick={() => router.push(`/product/${product.id}`)}>
                    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                      <path d="M60 140 Q50 125 55 105 Q60 85 80 80 L120 75 Q140 72 145 85 Q150 98 140 110 L130 125 Q120 140 110 145 Q90 155 75 150 Q60 145 60 140Z" fill={`url(#wl-${product.id})`} />
                      <path d="M80 80 L90 65 Q95 58 105 60 L120 62 Q128 65 125 72 L120 78" fill={`url(#wl-${product.id})`} />
                      <defs>
                        <linearGradient id={`wl-${product.id}`} x1="50" y1="60" x2="150" y2="150">
                          <stop offset="0%" stopColor="#E94560" />
                          <stop offset="100%" stopColor="#FF6B6B" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-[#16213E] dark:text-[#F8F9FA] cursor-pointer" onClick={() => router.push(`/product/${product.id}`)}>{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-[#16213E] dark:text-[#F8F9FA]">${product.price.toFixed(2)}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-[#6C757D] dark:text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => addToCart(product)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#E94560] text-white text-sm font-medium hover:bg-[#d63851] transition-all">
                        <ShoppingBag size={14} /> Add to Cart
                      </button>
                      <button onClick={() => toggleWishlist(product.id)} className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-[#2D2D4A] hover:border-[#E94560] transition-colors">
                        <Heart size={16} className="fill-[#E94560] text-[#E94560]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <MobileBottomNav />
      <CartSidebar />
      <Toast />
      <Footer />
    </div>
  );
}
