"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import ProductCard from "./ProductCard";
import type { Product } from "@/context/CartContext";

const fallbackProducts: Product[] = [
  { id: 2, name: "Runner 3000", category: "Training", price: 109.99, originalPrice: 139.99, rating: 4.8, image: "" },
  { id: 5, name: "Trail Blazer", category: "Hiking", price: 139.99, originalPrice: 169.99, rating: 4.7, image: "" },
  { id: 7, name: "Speed Demon", category: "Running", price: 159.99, originalPrice: 199.99, rating: 4.9, image: "" },
];

export default function RecentlyViewed() {
  const [recent, setRecent] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("solemate-recently-viewed");
    setRecent(saved ? JSON.parse(saved) : fallbackProducts);
  }, []);

  if (recent.length === 0) return null;

  return (
    <section className="py-16 bg-[#F8F9FA] dark:bg-[#0F0F1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-10">
          <Clock size={20} className="text-[#E94560] dark:text-[#FF6B6B]" />
          <h2 className="text-2xl md:text-3xl font-bold text-[#16213E] dark:text-[#F8F9FA]">Recently Viewed</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recent.slice(0, 4).map((product) => (
            <div key={product.id} className="animate-fade-in-up">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
