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

  let filtered = activeFilter === "All"
    ? products
    : products.filter((p) => p.category === activeFilter);

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }

  return (
    <section id="featured" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[#E94560] font-semibold text-sm tracking-wider uppercase">Collection</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#16213E] mt-2">Best Sellers</h2>
          <p className="text-[#6C757D] mt-3 max-w-md mx-auto">
            Our most popular styles, loved by customers worldwide
          </p>
        </div>

        <ProductFilters active={activeFilter} onFilterChange={setActiveFilter} />
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
