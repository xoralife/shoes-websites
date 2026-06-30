"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { id: 1, url: "", label: "Premium Sneakers Collection" },
  { id: 2, url: "", label: "Comfort Technology" },
  { id: 3, url: "", label: "Style Meets Function" },
];

export default function ImageGallery() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="aspect-[16/9] flex items-center justify-center p-12">
        <svg viewBox="0 0 200 200" className="w-40 h-40" fill="none">
          <path d="M60 140 Q50 125 55 105 Q60 85 80 80 L120 75 Q140 72 145 85 Q150 98 140 110 L130 125 Q120 140 110 145 Q90 155 75 150 Q60 145 60 140Z" fill="url(#galleryGrad)" />
          <defs>
            <linearGradient id="galleryGrad"><stop offset="0%" stopColor="#E94560" /><stop offset="100%" stopColor="#FF6B6B" /></linearGradient>
          </defs>
        </svg>
      </div>
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all">
        <ChevronRight size={20} />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-[#E94560] w-6" : "bg-gray-300"}`} onClick={() => setCurrent(i)} />
        ))}
      </div>
    </div>
  );
}
