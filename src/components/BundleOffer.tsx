import { Gift, ArrowRight } from "lucide-react";

export default function BundleOffer() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#1A1A2E] to-[#0F3460]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#E94560]/20 flex items-center justify-center">
              <Gift size={28} className="text-[#E94560]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Bundle & Save</h3>
              <p className="text-gray-300 text-sm">Buy 2 pairs get 10% off. Buy 3 pairs get 20% off!</p>
            </div>
          </div>
          <a href="#featured" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#E94560] text-white font-medium text-sm hover:bg-[#d63851] transition-all duration-300 whitespace-nowrap">
            Shop Bundles
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
