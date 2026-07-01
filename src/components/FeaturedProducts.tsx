"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import { products } from "@/data/products";

interface FeaturedProductsProps {
  initialFilter?: string | null;
  searchQuery?: string | null;
}

export default function FeaturedProducts({ initialFilter, searchQuery }: FeaturedProductsProps) {
  const [activeFilter, setActiveFilter] = useState(initialFilter || "All");

  useEffect(() => {
    if (initialFilter) {
      setActiveFilter(initialFilter);
    }
  }, [initialFilter]);

  const [sortBy, setSortBy] = useState("featured");

  let filtered = activeFilter === "All"
    ? products
    : products.filter((p) => p.category === activeFilter);

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }

  if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <section id="featured" className="py-20 bg-white dark:bg-[#1A1A2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[#E94560] font-semibold text-sm tracking-wider uppercase">Collection</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#16213E] dark:text-[#F8F9FA] mt-2">Best Sellers</h2>
          <p className="text-[#6C757D] mt-3 max-w-md mx-auto">
            Our most popular styles, loved by customers worldwide
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 mb-8">
          <ProductFilters active={activeFilter} onFilterChange={setActiveFilter} />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 rounded-xl border border-gray-200 dark:border-[#2D2D4A] bg-white dark:bg-[#1A1A2E] text-sm text-[#6C757D] dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E94560]/20">
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filtered.map((product, i) => (
            <div key={product.id} className={`animate-slide-up stagger-${i + 1}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
