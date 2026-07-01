import { Quote } from "lucide-react";

export default function BrandStory() {
  return (
    <section className="py-20 bg-[#1A1A2E] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Quote size={48} className="mx-auto text-[#E94560] dark:text-[#FF6B6B]/30 mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
        <p className="text-gray-300 dark:text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
          SOLEMATE was born from a simple idea — every step matters. We craft premium sneakers that blend 
          cutting-edge comfort with timeless style. From morning commutes to weekend adventures, 
          we are here to keep you moving.
        </p>
        <div className="flex justify-center gap-12 mt-10">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#E94560] dark:text-[#FF6B6B]">50K+</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Happy Customers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#E94560] dark:text-[#FF6B6B]">200+</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Shoe Designs</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#E94560] dark:text-[#FF6B6B]">30+</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Countries</p>
          </div>
        </div>
      </div>
    </section>
  );
}
