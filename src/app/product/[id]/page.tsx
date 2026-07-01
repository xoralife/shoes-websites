"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingBag, Heart, Star, ArrowLeft, Minus, Plus, Truck, Shield, RotateCcw, MessageCircle, Ruler } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getProductById, getRelatedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import Toast from "@/components/Toast";
import Footer from "@/components/Footer";
import SizeGuideModal from "@/components/SizeGuideModal";
import MobileBottomNav from "@/components/MobileBottomNav";

const sizes = ["US 7", "US 8", "US 9", "US 10", "US 11"];
const colors = ["#1A1A2E", "#E94560", "#0F3460", "#FEEFC0", "#6C757D"];

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { addToCart, toggleWishlist, wishlist, openCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(sizes[1]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [reviews, setReviews] = useState<{ name: string; rating: number; comment: string; date: string }[]>([]);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(`solemate-reviews-${id}`);
    if (saved) setReviews(JSON.parse(saved));
  }, [id]);

  const product = getProductById(Number(id));

  const addReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;
    const newReview = { name: reviewName, rating: reviewRating, comment: reviewComment, date: new Date().toISOString() };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(`solemate-reviews-${id}`, JSON.stringify(updated));
    setReviewName("");
    setReviewRating(5);
    setReviewComment("");
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#16213E] mb-4">Product Not Found</h1>
          <p className="text-[#6C757D] mb-6">The product you are looking for does not exist.</p>
          <button onClick={() => router.push("/")} className="px-6 py-3 rounded-xl bg-[#1A1A2E] text-white font-medium text-sm hover:bg-[#0F3460] transition-all">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const related = getRelatedProducts(product, 4);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      name: `${product.name} (${selectedSize}${selectedColor !== colors[0] ? ", " + selectedColor : ""})`,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => openCart(), 500);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0F0F1A]">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-[#6C757D] dark:text-gray-400 hover:text-[#E94560] transition-colors mb-6">
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back</span>
          </button>

          <div className="bg-white dark:bg-[#1A1A2E] rounded-3xl overflow-hidden card-shadow">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-16 flex items-center justify-center">
                <svg viewBox="0 0 400 400" className="w-full max-w-sm floating" fill="none">
                  <path
                    d="M120 280 Q100 250 110 210 Q120 170 160 160 L240 150 Q280 145 290 170 Q300 195 280 220 L260 250 Q240 280 220 290 Q180 310 150 300 Q120 290 120 280Z"
                    fill={`url(#detail-${product.id})`} stroke="#D1D5DB" strokeWidth="2"
                  />
                  <path
                    d="M160 160 L180 130 Q190 115 210 120 L240 125 Q255 130 250 145 L240 155"
                    fill={`url(#detail-${product.id})`} stroke="#D1D5DB" strokeWidth="2"
                  />
                  <circle cx="140" cy="270" r="20" fill="none" stroke="#D1D5DB" strokeWidth="1.5" opacity="0.5" />
                  <circle cx="260" cy="250" r="15" fill="none" stroke="#D1D5DB" strokeWidth="1.5" opacity="0.5" />
                  <defs>
                    <linearGradient id={`detail-${product.id}`} x1="100" y1="120" x2="300" y2="300">
                      <stop offset="0%" stopColor="#E94560" />
                      <stop offset="100%" stopColor="#FF6B6B" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="p-6 md:p-12 flex flex-col justify-center">
                <span className="text-xs font-semibold text-[#E94560] uppercase tracking-wider">{product.category}</span>
                <h1 className="text-2xl md:text-4xl font-bold text-[#16213E] dark:text-[#F8F9FA] mt-2">{product.name}</h1>

                <div className="flex items-center gap-1 mt-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-[#FEEFC0] text-[#FEEFC0]" : "text-gray-300"} />
                  ))}
                  <span className="text-sm text-[#6C757D] ml-2">{product.rating}</span>
                  <span className="text-sm text-[#6C757D] ml-2">(128 reviews)</span>
                </div>

                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-3xl font-bold text-[#16213E] dark:text-[#F8F9FA]">${product.price.toFixed(2)}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-[#6C757D] line-through">${product.originalPrice.toFixed(2)}</span>
                  )}
                  {product.originalPrice > product.price && (
                    <span className="text-sm font-semibold text-[#E94560]">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </div>

                <p className="text-[#6C757D] leading-relaxed mt-6">
                  Premium quality sneakers designed for ultimate comfort and style. Features cushioned sole,
                  breathable mesh upper, and durable rubber outsole. Perfect for everyday wear and athletic activities.
                </p>

                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-sm font-semibold text-[#16213E] dark:text-[#F8F9FA]">Size</p>
                    <button onClick={() => setShowSizeGuide(true)} className="text-xs text-[#E94560] hover:underline flex items-center gap-1">
                      <Ruler size={12} /> Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                          selectedSize === size
                            ? "bg-[#1A1A2E] text-white border-[#1A1A2E]"
                            : "border-gray-200 dark:border-[#2D2D4A] text-[#6C757D] dark:text-gray-400 hover:border-[#E94560] hover:text-[#E94560]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-sm font-semibold text-[#16213E] mb-3">Color</p>
                  <div className="flex gap-3">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                          selectedColor === color ? "border-[#16213E] scale-110" : "border-gray-200"
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Color ${color}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-semibold text-[#16213E] mb-3">Quantity</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                      addedToCart
                        ? "bg-green-500 text-white"
                        : "bg-[#E94560] text-white hover:bg-[#d63851] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#E94560]/25"
                    }`}
                  >
                    <ShoppingBag size={18} />
                    {addedToCart ? "Added!" : "Add to Cart"}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#1A1A2E] text-white font-medium text-sm hover:bg-[#0F3460] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    className={`px-4 py-3.5 rounded-xl border transition-all duration-300 ${
                      isWishlisted
                        ? "border-[#E94560] bg-[#E94560]/5"
                        : "border-gray-200 hover:border-[#E94560]"
                    }`}
                    aria-label="Toggle wishlist"
                  >
                    <Heart size={18} className={isWishlisted ? "fill-[#E94560] text-[#E94560]" : "text-[#6C757D]"} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
                  <div className="text-center">
                    <Truck size={20} className="mx-auto text-[#E94560] mb-1" />
                    <p className="text-xs font-medium text-[#16213E]">Free Shipping</p>
                    <p className="text-xs text-[#6C757D]">On orders over $200</p>
                  </div>
                  <div className="text-center">
                    <Shield size={20} className="mx-auto text-[#E94560] mb-1" />
                    <p className="text-xs font-medium text-[#16213E]">Secure Checkout</p>
                    <p className="text-xs text-[#6C757D]">SSL encrypted</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw size={20} className="mx-auto text-[#E94560] mb-1" />
                    <p className="text-xs font-medium text-[#16213E]">Easy Returns</p>
                    <p className="text-xs text-[#6C757D]">30-day policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-16 bg-white rounded-3xl p-6 md:p-8 card-shadow">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle size={20} className="text-[#E94560]" />
              <h2 className="text-xl md:text-2xl font-bold text-[#16213E]">Customer Reviews</h2>
              <span className="text-sm text-[#6C757D]">({reviews.length})</span>
            </div>

            <form onSubmit={addReview} className="mb-8 p-6 bg-[#F8F9FA] rounded-2xl">
              <h3 className="font-semibold text-[#16213E] text-sm mb-4">Write a Review</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" value={reviewName} onChange={(e) => setReviewName(e.target.value)} placeholder="Your Name" required className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/20" />
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setReviewRating(star)}>
                      <Star size={18} className={star <= reviewRating ? "fill-[#FEEFC0] text-[#FEEFC0]" : "text-gray-300"} />
                    </button>
                  ))}
                </div>
                <textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} placeholder="Write your review..." required className="sm:col-span-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/20 min-h-[80px]" />
              </div>
              <button type="submit" className="mt-3 px-6 py-2.5 rounded-xl bg-[#E94560] text-white text-sm font-medium hover:bg-[#d63851] transition-all">Submit Review</button>
            </form>

            {reviews.length === 0 ? (
              <p className="text-center text-[#6C757D] py-8">No reviews yet. Be the first to review!</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#F8F9FA]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-[#16213E] text-sm">{review.name}</span>
                      <span className="text-xs text-[#6C757D]">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} size={14} className={s < review.rating ? "fill-[#FEEFC0] text-[#FEEFC0]" : "text-gray-300"} />
                      ))}
                    </div>
                    <p className="text-sm text-[#6C757D]">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl md:text-3xl font-bold text-[#16213E] mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <SizeGuideModal open={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
      <MobileBottomNav />
      <CartSidebar />
      <Toast />
      <Footer />
    </div>
  );
}
