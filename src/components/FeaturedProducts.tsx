"use client";

import ProductCard from "./ProductCard";
import type { Product } from "@/context/CartContext";

const products: Product[] = [
  { id: 1, name: "Air Max Pro", category: "Running", price: 129.99, originalPrice: 159.99, rating: 4.5, image: "" },
  { id: 2, name: "Runner 3000", category: "Training", price: 109.99, originalPrice: 139.99, rating: 4.8, image: "" },
  { id: 3, name: "Classic Leather", category: "Lifestyle", price: 149.99, originalPrice: 189.99, rating: 4.3, image: "" },
  { id: 4, name: "Sport Flex", category: "Sports", price: 99.99, originalPrice: 129.99, rating: 4.6, image: "" },
  { id: 5, name: "Trail Blazer", category: "Hiking", price: 139.99, originalPrice: 169.99, rating: 4.7, image: "" },
  { id: 6, name: "Cloud Walker", category: "Casual", price: 89.99, originalPrice: 119.99, rating: 4.4, image: "" },
  { id: 7, name: "Speed Demon", category: "Running", price: 159.99, originalPrice: 199.99, rating: 4.9, image: "" },
  { id: 8, name: "Urban Street", category: "Lifestyle", price: 119.99, originalPrice: 149.99, rating: 4.2, image: "" },
];

export default function FeaturedProducts() {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, i) => (
            <div key={product.id} className={`animate-slide-up stagger-${i + 1}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
