"use client";

import { SlidersHorizontal } from "lucide-react";

interface ProductFiltersProps {
  active: string;
  onFilterChange: (filter: string) => void;
}

const categories = ["All", "Running", "Training", "Lifestyle", "Sports", "Hiking", "Casual"];

export default function ProductFilters({ active, onFilterChange }: ProductFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onFilterChange(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              active === cat
                ? "bg-[#E94560] text-white"
                : "bg-gray-100 text-[#6C757D] hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm text-[#6C757D] hover:border-[#E94560] transition-colors">
          <SlidersHorizontal size={16} />
          Filter
        </button>
        <select className="px-4 py-2 rounded-full border border-gray-200 text-sm text-[#6C757D] focus:outline-none focus:ring-2 focus:ring-[#E94560]/20 bg-white">
          <option>Sort by: Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>
    </div>
  );
}
