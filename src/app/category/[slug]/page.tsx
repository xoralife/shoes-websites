"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import Toast from "@/components/Toast";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

const categoryNames: Record<string, string> = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  sports: "Sports",
  running: "Running",
  training: "Training",
  lifestyle: "Lifestyle",
  hiking: "Hiking",
  casual: "Casual",
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const categoryName = categoryNames[slug.toLowerCase()] || slug;
  const filtered = products.filter((p) => p.category.toLowerCase() === slug.toLowerCase());

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => router.push("/")} className="flex items-center gap-2 text-[#6C757D] hover:text-[#E94560] transition-colors mb-6">
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back to Home</span>
          </button>

          <div className="mb-10">
            <span className="text-[#E94560] font-semibold text-sm tracking-wider uppercase">Category</span>
            <h1 className="text-3xl md:text-4xl font-bold text-[#16213E] mt-1">{categoryName}&apos;s Collection</h1>
            <p className="text-[#6C757D] mt-2">{filtered.length} products found</p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-xl font-bold text-[#16213E] mb-2">No Products Found</h2>
              <p className="text-[#6C757D] mb-6">No products in this category yet.</p>
              <button onClick={() => router.push("/")} className="px-8 py-3 rounded-xl bg-[#E94560] text-white font-medium text-sm hover:bg-[#d63851] transition-all">
                Browse All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
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
