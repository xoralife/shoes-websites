"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { Search, ArrowLeft, SlidersHorizontal } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import Toast from "@/components/Toast";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [sortBy, setSortBy] = useState("featured");
  const [catFilter, setCatFilter] = useState("All");

  let results = products.filter(
    (p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase())
  );

  if (catFilter !== "All") results = results.filter((p) => p.category === catFilter);

  if (sortBy === "price-asc") results.sort((a, b) => a.price - b.price);
  else if (sortBy === "price-desc") results.sort((a, b) => b.price - a.price);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => router.push("/")} className="flex items-center gap-2 text-[#6C757D] dark:text-gray-400 hover:text-[#E94560] transition-colors mb-6">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Home</span>
        </button>

        <form onSubmit={handleSearch} className="relative max-w-2xl mb-8">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6C757D]" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-[#2D2D4A] bg-white dark:bg-[#1A1A2E] text-[#16213E] dark:text-[#F8F9FA] text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/20"
            autoFocus
          />
        </form>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#16213E] dark:text-[#F8F9FA]">Search Results</h1>
            <p className="text-sm text-[#6C757D] dark:text-gray-400">{results.length} results for &ldquo;{query}&rdquo;</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setCatFilter(cat)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${catFilter === cat ? "bg-[#E94560] text-white" : "bg-gray-100 dark:bg-[#2D2D4A] text-[#6C757D]"}`}>{cat}</button>
              ))}
            </div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 rounded-xl border border-gray-200 dark:border-[#2D2D4A] bg-white dark:bg-[#1A1A2E] text-sm text-[#6C757D] focus:outline-none">
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-20">
            <Search size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h2 className="text-xl font-bold text-[#16213E] dark:text-[#F8F9FA] mb-2">No products found</h2>
            <p className="text-[#6C757D] dark:text-gray-400">Try a different search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((product) => (<ProductCard key={product.id} product={product} />))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0F0F1A]">
      <Header />
      <Suspense fallback={<div className="pt-32 text-center text-[#6C757D]">Loading...</div>}>
        <SearchContent />
      </Suspense>
      <MobileBottomNav />
      <CartSidebar />
      <Toast />
      <Footer />
    </div>
  );
}
